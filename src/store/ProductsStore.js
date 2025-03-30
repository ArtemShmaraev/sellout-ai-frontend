import {makeAutoObservable} from "mobx";

class ProductsStore {
    constructor() {
        this._sizeChosen = false
        this._shipChosen = false
        this._shipps = []
        makeAutoObservable(this)
    }
    clearAll() {
        this._sizeChosen = false
        this._shipChosen = false
        this._shipps = []
    }
    setSizeChosen(bool) {
        this._sizeChosen = bool
        this._shipChosen = false
    }
    get sizeChosen() {
        return this._sizeChosen
    }
    setShipChosen(value) {
        this._shipChosen = value
    }
    get shipChosen() {
        return this._shipChosen
    }
    setShipps(arr) {
        this._shipps = arr
    }
    get shipps() {
        return this._shipps
    }
}

export const productStore = new ProductsStore()