import {makeAutoObservable} from "mobx";

class ProductsStore {
    constructor() {
        this._sizeChosen = false
        this._shipChosen = false
        this._shipps = []
        this._addToCartText = 'Добавить в корзину'
        makeAutoObservable(this)
    }
    clearAll() {
        this._sizeChosen = false
        this._shipChosen = false
        this._shipps = []
        this._addToCartText = 'Добавить в корзину'
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
    get text() {
        return this._addToCartText
    }
    setText(arr, id) {
        if (arr.includes(String(id))) {
            this._addToCartText = 'Уже в корзине'
        } else {
            this._addToCartText = 'Добавить в корзину'
        }
    }
}

export const productStore = new ProductsStore()