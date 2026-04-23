import {makeAutoObservable, runInAction} from "mobx";
import {aiSearch} from "@/http/aiSearchApi";

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
        this._isOpen = true
    }

    close() {
        this._isOpen = false
        this._messages = []
        this._sessionId = ''
        this._loading = false
        this._error = ''
    }

    clearError() {
        this._error = ''
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
                })
                this._loading = false
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
