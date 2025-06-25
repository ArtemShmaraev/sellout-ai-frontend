import {makeAutoObservable} from "mobx";

class DesktopStore {
    constructor() {
        this._isDesktop = true
        this._animation = true
        this._filtersOpen = false
        this._faqCnt = 0
        makeAutoObservable(this)
    }
    setIsDesktop(bool) {
        this._isDesktop = bool
    }
    get isDesktop() {
        return this._isDesktop
    }
    setAnimation(bool) {
        this._animation = bool
    }
    get animation() {
        return this._animation
    }
    setFilterOpen(bool) {
        this._filtersOpen = bool
    }
    get filtersOpen() {
        return this._filtersOpen
    }
    incrementFaqCnt() {
        this._faqCnt++
    }
    get faqCnt() {
        return this._faqCnt
    }
}

export const desktopStore = new DesktopStore()