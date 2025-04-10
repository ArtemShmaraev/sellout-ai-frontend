import {makeAutoObservable} from "mobx";

class DesktopStore {
    constructor() {
        this._isDesktop = true
        this._styleCont = {
            marginRight: '3vw',
            marginLeft: '3vw',
        }
        this._styleMob = {
            marginRight: '0',
            marginLeft: '0',
        }
        makeAutoObservable(this)
    }
    setIsDesktop(bool) {
        this._isDesktop = bool
    }
    get isDesktop() {
        return this._isDesktop
    }
}

export const desktopStore = new DesktopStore()