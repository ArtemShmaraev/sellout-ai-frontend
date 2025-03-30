import {makeAutoObservable} from "mobx";

class ProductsStore {
    constructor() {
        this._sizeChosen = false
        this._shipChosen = false
        makeAutoObservable(this)
    }
    clearAll() {
        this._sizeChosen = false
        this._shipChosen = false
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
}

export const productStore = new ProductsStore()