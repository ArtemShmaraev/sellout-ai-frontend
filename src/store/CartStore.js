import {makeAutoObservable} from "mobx";

class CartStore {
    constructor() {
        this._shipps = {}
        this._cart = {}
        this._isShipChosen = true
        makeAutoObservable(this)
    }
    get cart() {
        return this._cart
    }
    get sizeId() {
        return this._sizeId
    }
    setSizeId(id) {
        this._sizeId = id
    }
    get ships() {
        return this._shipps
    }
    setShips(ships) {
        this._shipps = ships
    }
    get isShipChosen() {
        return this._isShipChosen
    }
    setIsShipChosen(bool) {
        this._isShipChosen = bool
    }
}

export const cartStore = new CartStore()