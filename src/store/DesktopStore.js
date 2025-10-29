import {makeAutoObservable} from "mobx";

class DesktopStore {
    constructor() {
        this._isDesktop = true
        this._animation = true
        this._filtersOpen = false
        this._navbarVisible = true
        this._faqCnt = 0
        this._showGenderModal = true
        makeAutoObservable(this)
    }
    setIsDesktop(bool) {
        this._isDesktop = bool
    }
    get isDesktop() {
        return this._isDesktop
    }
    setNavbarVisible(bool) {
        this._navbarVisible = bool
    }
    get navbarVisible() {
        return this._navbarVisible
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
    get showGenderModal() {
        return this._showGenderModal
    }
    setShowGenderModal(gender) {
        this._showGenderModal = gender
    }
}

export const desktopStore = new DesktopStore()