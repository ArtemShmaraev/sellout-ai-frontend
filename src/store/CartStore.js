import {makeAutoObservable} from "mobx";

class CartStore {
    constructor() {
        this._shipps = {}
        this._cart = {}
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
}

export const cartStore = new CartStore()