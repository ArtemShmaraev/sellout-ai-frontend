import {makeAutoObservable} from "mobx";

class OrderStore {
    constructor() {
        this._stage = 1
        makeAutoObservable(this)
    }
    get stage() {
        return this._stage
    }
    nextStage() {
        this._stage += 1
    }
    previousStage() {
        this._stage -= 1
    }
}

export const orderStore = new OrderStore()