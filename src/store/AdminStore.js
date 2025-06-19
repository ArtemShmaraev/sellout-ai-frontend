import {makeAutoObservable} from "mobx";

class AdminStore {
    constructor() {
        this._brands = []
        this._model = ''
        this._colorway = ''
        this._categories = []
        this._lines = []

        this.editDisabled = false
        this.submitDisabled = true
        makeAutoObservable(this)
    }
    clickEdit() {
        this.editDisabled = !this.editDisabled
    }
    clickSubmit() {
        this.submitDisabled = !this.submitDisabled
    }
    setBrand(brands) {
        const arr = []
        brands.forEach(el => {
            arr.push(
                {
                    id: el.id,
                    name: el.name,
                    state: false
                }
            )
        })
        this._brands = [...arr]
    }
    checkActiveBrands(brands) {
        this.brands.forEach(el => {
            for (let i = 0; i < brands.length; i++) {
                if (el.id === brands[i].id) {
                    el.state = true
                }
            }
        })
    }
    get brands() {
        return this._brands
    }
    setModel(model) {
        this._model = model
    }
    get model() {
        return this._model
    }
    get colorway() {
        return this._colorway
    }
    setColorway(colorway) {
        this._colorway = colorway
    }
    get categories() {
        return this._categories
    }
    setCategories(categories) {
        const arr = []
        categories.forEach(el => {
            arr.push(
                {
                    id: el.id,
                    name: el.name,
                    state: false
                }
            )
        })
        this._categories = [...arr]
    }
    checkActiveCategories(categories) {
        this.categories.forEach(el => {
            for (let i = 0; i < categories.length; i++) {
                if (el.id === categories[i].id) {
                    el.state = true
                }
            }
        })
    }
    get activeCategories() {
        const arr = []
        this.categories.forEach(el => {
            if (el.state) {
                arr.push(el.name)
            }
        })
        return arr.join(', ')
    }
    get lines() {
        return this._lines
    }
    setLines(lines) {
        const arr = []
        lines.forEach(el => {
            arr.push(
                {
                    id: el.id,
                    name: el.view_name,
                    state: false
                }
            )
        })
        this._lines = [...arr]
    }
    checkActiveLines(lines) {
        this.lines.forEach(el => {
            for (let i = 0; i < lines.length; i++) {
                if (el.id === lines[i].id) {
                    el.state = true
                }
            }
        })
    }
    get activeLines() {
        const arr = []
        this.lines.forEach(el => {
            if (el.state) {
                arr.push(el.name)
            }
        })
        return arr.join(', ')
    }
    get colors() {
        return this._colors
    }
    click(searchedArr, name) {
        searchedArr.forEach(el => {
            if (el.name === name) {
                el.state = !el.state
            }
        })
    }
    clearAll() {
        this._brands.forEach(el => el.state = false)
        this._categories.forEach(el => el.state = false)
        this._lines.forEach(el => el.state = false)
        this._model = ''
        this._colorway = ''
    }
    getAllData() {
        const d = {
            categories: [],
            lines: [],
            brands: [],
        }
        this._categories.forEach(el => {
            if (el.state) {
                d.categories.push(el.id)
            }
        })
        this._lines.forEach(el => {
            if (el.state) {
                d.lines.push(el.id)
            }
        })
        this._brands.forEach(el => {
            if (el.state) {
                d.brands.push(el.id)
            }
        })
        if (this.model) {
            d.model = this.model
        }
        if (this.colorway) {
            d.colorway = this.colorway
        }
        return JSON.stringify(d)
    }
    getAllData2() {
        const d = {
            categories: [],
            lines: [],
            brands: [],
        }
        this._categories.forEach(el => {
            if (el.state) {
                d.categories.push(el.id)
            }
        })
        this._lines.forEach(el => {
            if (el.state) {
                d.lines.push(el.id)
            }
        })
        this._brands.forEach(el => {
            if (el.state) {
                d.brands.push(el.id)
            }
        })
        const formData = new FormData()
        formData.append('categories', d.categories)
        formData.append('lines', d.lines)
        formData.append('brands', d.brands)
        if (this.model) {
            d.model = this.model
            formData.append('model', d.model)
        }
        if (this.colorway) {
            d.colorway = this.colorway
            formData.append('colorway', d.colorway)
        }
        return formData
    }
}

export const adminStore = new AdminStore()