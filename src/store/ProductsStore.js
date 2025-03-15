import {makeAutoObservable} from "mobx";

class ProductsStore {
    constructor() {
        this._products = []
        makeAutoObservable(this)
    }
    setProducts(products) {
        this._products = products
    }
    get products() {
        return this._products
    }
}

export const productStore = new ProductsStore()