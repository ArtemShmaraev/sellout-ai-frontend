import {makeAutoObservable} from "mobx";

class OrderStore {
    constructor() {
        this._email = ''
        this._phone = ''
        this._name = ''
        this._surname = ''
        this._patronymic = ''
        this._stage = 1
        this._shipType = null
        this._selectedAddressId = null
        this._method = null
        this._deliveryPrice = null
        this._comment = ''
        this._target = ''
        this._pvzAddress = ''
        makeAutoObservable(this)
    }
    get email() {
        return this._email
    }
    setEmail(value) {
        this._email = value
    }
    get phone() {
        return this._phone
    }
    setPhone(value) {
        this._phone = value
    }
    get name() {
        return this._name
    }
    setName(value) {
        this._name = value
    }
    get patronymic() {
        return this._patronymic
    }
    setPatronymic(value) {
        this._patronymic = value
    }
    get surname() {
        return this._surname
    }
    setSurname(value) {
        this._surname = value
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
    get method() {
        return this._method
    }
    setMethod(method) {
        this._method = method
    }
    get deliveryPrice() {
        return this._deliveryPrice
    }
    setDeliveryPrice(obj) {
        this._deliveryPrice = obj
    }
    get comment() {
        return this._comment
    }
    setComment(value) {
        this._comment = value
    }
    get target() {
        return this._target
    }
    setTarget(value) {
        this._target = value
    }
    get pvzAddress() {
        return this._pvzAddress
    }
    setPvzAddress(value) {
        this._pvzAddress = value
    }
    nextStage() {
        this._stage += 1
    }
    previousStage() {
        this._stage -= 1
    }
}

export const orderStore = new OrderStore()