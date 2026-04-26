import {makeAutoObservable, runInAction} from "mobx";
import {aiSearch} from "@/http/aiSearchApi";

const STORAGE_KEY = 'sellout_ai_search'
const TTL_MS = 30 * 60 * 1000

class AiSearchStore {
    constructor() {
        this._messages = []
        this._sessionId = ''
        this._loading = false
        this._error = ''
        this._isOpen = false
        makeAutoObservable(this)
    }

    get messages() { return this._messages }
    get sessionId() { return this._sessionId }
    get loading() { return this._loading }
    get error() { return this._error }
    get isOpen() { return this._isOpen }
    get isEmpty() { return this._messages.length === 0 }

    open() {
        this._restoreFromStorage()
        this._isOpen = true
    }

    close() {
        this._isOpen = false
        this._loading = false
        this._error = ''
    }

    resetChat() {
        this._messages = []
        this._sessionId = ''
        this._loading = false
        this._error = ''
        if (typeof window !== 'undefined') {
            try { localStorage.removeItem(STORAGE_KEY) } catch (e) {}
        }
    }

    clearError() {
        this._error = ''
    }

    _persist() {
        if (typeof window === 'undefined') return
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                sessionId: this._sessionId,
                messages: this._messages,
                timestamp: Date.now(),
            }))
        } catch (e) {}
    }

    _restoreFromStorage() {
        if (typeof window === 'undefined') return
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (!raw) return
            const data = JSON.parse(raw)
            if (!data || typeof data.timestamp !== 'number') return
            if (Date.now() - data.timestamp > TTL_MS) {
                localStorage.removeItem(STORAGE_KEY)
                return
            }
            this._sessionId = data.sessionId || ''
            this._messages = Array.isArray(data.messages) ? data.messages : []
        } catch (e) {
            try { localStorage.removeItem(STORAGE_KEY) } catch (_) {}
        }
    }

    async send(query) {
        const q = (query || '').trim()
        if (!q || this._loading) return
        this._messages.push({role: 'user', content: q})
        this._loading = true
        this._error = ''
        try {
            const res = await aiSearch(q, this._sessionId)
            runInAction(() => {
                this._sessionId = res.session_id || this._sessionId
                this._messages.push({
                    role: 'assistant',
                    content: res.explanation || '',
                    products: Array.isArray(res.products) ? res.products : [],
                    count: typeof res.count === 'number' ? res.count : 0,
                    suggestions: Array.isArray(res.suggestions) ? res.suggestions : [],
                })
                this._loading = false
                this._persist()
            })
        } catch (e) {
            runInAction(() => {
                this._loading = false
                const status = e && e.response && e.response.status
                this._error = status === 502
                    ? 'Сервис временно недоступен, попробуйте позже'
                    : 'Что-то пошло не так. Попробуйте ещё раз.'
            })
        }
    }
}

export const aiSearchStore = new AiSearchStore()
