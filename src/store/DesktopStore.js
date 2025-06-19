import {makeAutoObservable} from "mobx";

class DesktopStore {
    constructor() {
        this._isDesktop = true
        this._animation = true
        this._filtersOpen = false
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
}

export const desktopStore = new DesktopStore()