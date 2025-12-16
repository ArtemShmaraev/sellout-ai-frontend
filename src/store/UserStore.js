import {makeAutoObservable} from "mobx";

class UserStore {
    constructor() {
        this._isLogged = false
        this._id = null
        this._username = ''
        this._firstName = ''
        this._lastName = ''
        this._address = ''
        this._post = ''
        this._gender = ''
        this._accessToken = ''
        makeAutoObservable(this)
    }

    get isLogged() {
        return this._isLogged
    }
    setIsLogged(bool) {
        return this._isLogged = bool
    }
    get id() {
        return this._id
    }
    setId(id) {
        this._id = id
    }
    get username() {
        return this._username
    }
    setUsername(username) {
        this._username = username
    }
    get firstName() {
        return this._firstName
    }
    setFirstName(firstName) {
        this._firstName = firstName
    }
    get lastName() {
        return this._lastName
    }
    setLastName(lastName) {
        this._lastName = lastName
    }
    get address() {
        return this._address
    }
    setAddress(address) {
        this._address = address
    }
    get post() {
        return this._post
    }
    setPost(post) {
        this._post = post
    }
    get gender() {
        return this._gender
    }
    setGender(gender) {
        this._gender = gender
    }
    get accessToken() {
        return this._accessToken
    }
    setAccessToken(token) {
        this._accessToken = token
    }
}

export const userStore = new UserStore()