import {makeAutoObservable} from "mobx";

class OrderStore {
    constructor() {
        this._stage = 1
        this._shipType = null
        this._selectedAddressId = null
        makeAutoObservable(this)
    }
    get stage() {
        return this._stage
    }
    get shipType() {
        return this._shipType
    }
    setShipType(type) {
        this._shipType = type
    }
    get selectedAddressId() {
        return this._selectedAddressId
    }
    setSelectedAddressId(id) {
        this._selectedAddressId = id
    }
    nextStage() {
        this._stage += 1
    }
    previousStage() {
        this._stage -= 1
    }
}

export const orderStore = new OrderStore()