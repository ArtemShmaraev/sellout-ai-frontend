import {makeAutoObservable} from "mobx";

class FilterStore {
    constructor() {
        this._gender = [
            ['Мужской', 'M', false],
            ['Женский', 'F', false],
            ['Детский', 'K', false]
        ]
        this._price = [100, 1000000]
        makeAutoObservable(this)
    }
    changeGenderCheck(ind) {
        this._gender[ind][2] = !this._gender[ind][2]
    }
    get gender() {
        return this._gender
    }
    get checkedGenders() {
        const checkedGenders = []
        this.gender.forEach(el => {
            if (el[2]) {
                checkedGenders.push(el[1])
            }
        })
        return checkedGenders
    }
     getAllQuery(router) {
         const query = router.query
         let allQuery = ''
         Object.keys(query).forEach(key => {
             if (key !== 'page') {
                 if (typeof query[key] === "object") {
                     query[key].forEach(el => {
                         allQuery += `${key}=${el}&`
                     })
                 } else {
                     allQuery +=`${key}=${query[key]}&`
                 }
             }
         })
         console.log(allQuery)
         return allQuery
    }
    setPriceFrom(from) {
        this._price[0] = from
    }
    setPriceTo(to) {
        this._price[1] = to
    }
    setPriceBoth(values) {
        this._price = values
    }
    get price() {
        return this._price
    }
}

export const filterStore = new FilterStore()