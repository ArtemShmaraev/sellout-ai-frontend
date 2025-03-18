import {makeAutoObservable} from "mobx";

class FilterStore {
    constructor() {
        this._allFilters = {
            category: {},
            gender: {
                M: {
                    text: 'Мужской',
                    query: 'M',
                    state: false
                },
                F: {
                    text: 'Женский',
                    query: 'F',
                    state: false
                },
                K: {
                    text: 'Детский',
                    query: 'K',
                    state: false
                },
            },
            price: [100, 1000000]
        }
        this._activeFilters = []
        makeAutoObservable(this)
    }
    get filters() {
        return this._allFilters
    }
    get activeFilters() {
        return this._activeFilters
    }
    reactivateFilters(query) {
        for (const key in query) {
            if (key === 'page' || key === 'price') continue
            if (Array.isArray(query[key])) {
                query[key].forEach(el => {
                    this.dfsActivate(this.filters[key], el)
                })
            } else {
                this.dfsActivate(this.filters[key], query[key])
            }
        }
        this.dfsPath(this.filters, [])
        this._activeFilters = this._activeFilters.filter((obj, index) => {
            return this._activeFilters.findIndex((o) => {
                return JSON.stringify(o) === JSON.stringify(obj);
            }) === index;
        });
    }
    dfsActivate(d, queryValue) {
        if (!d.hasOwnProperty('query')) {
            for (const key in d) {
                this.dfsActivate(d[key], queryValue)
            }
        } else {
            if (d.query === queryValue) {
                if (!d.state) {
                    d.state = true
                    this._activeFilters.push(d)
                }
            }
        }
    }
    dfsPath(d, path) {
        for (const key in d) {
            if (key === 'price') continue
            if (typeof d[key] === 'object') {
                path.push(key)
                this.dfsPath(d[key], path)
                path.pop()
            } else {
                d.path = path
            }
        }
    }
    toggleFilter(item) {
        let d = this.filters
        item.path.forEach(key => {
            d = d[key]
        })
        d.state = !d.state
        if (d.state) {
            this._activeFilters = [...this._activeFilters, item]
        } else {
            let ind = this._activeFilters.indexOf(item)
            this._activeFilters.splice(ind, 1)
        }
    }
   fillCat(categories) {
        this.cat_dfs(this.filters.category, categories)
   }
    cat_dfs(d, node) {
        for (let cat of node) {
            if ("subcategories" in cat) {
                d[cat["name"]] = {};
                this.cat_dfs(d[cat["name"]], cat["subcategories"]);
            } else {
                d[cat["name"]] = {};
                d[cat["name"]]["text"] = cat["name"];
                d[cat["name"]]["query"] = cat["name"];
                d[cat["name"]]["state"] = false;
            }
        }
    }
    get checkedCategory() {
        const checkedCat = []
        for (const key in this.activeFilters) {
            if (this.activeFilters[key].path[0] === 'category') {
                checkedCat.push(this.activeFilters[key].query)
            }
        }
        return checkedCat
    }
    get gender() {
        const arr = []
        for (const key in this.filters.gender) {
            arr.push({...this.filters.gender[key]})
        }
        return arr
    }
    get checkedGendersQuery() {
        const checkedGenders = []
        for (const key in this.activeFilters) {
            if (this.activeFilters[key].path[0] === 'gender') {
                checkedGenders.push(this.activeFilters[key].query)
            }
        }
        return checkedGenders
    }
    setPriceFrom(from) {
        this._allFilters.price[0] = from
    }
    setPriceTo(to) {
        this._allFilters.price[1] = to
    }
    setPriceBoth(values) {
        this._allFilters.price = values
    }
    get price() {
        return this._allFilters.price
    }
}

export const filterStore = new FilterStore()