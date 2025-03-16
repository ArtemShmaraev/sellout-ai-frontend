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
    fillCategories(categories) {
        categories.forEach(el => this.dfsCategory(el, this.filters.category))
        console.log(this.filters.category)
    }
    dfsCategory(node, level) {
        if (node.hasOwnProperty('subcategories')) {
            node.subcategories.forEach(el => {
                console.log(el.name)
                level[node.name] = this.dfsCategory(el, level[el.name])
            })
        }
        return {
            text: node.name,
            state: false
        }
   }
   fillCat(categories) {
        this.cat_dfs(this.filters.category, categories)
        console.log(this.filters.category)
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
                d[cat["name"]]["status"] = false;
            }
        }
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
    setActiveFilters() {
        const activeFilters = []

        this.gender.forEach(el => {
            if (el[2]) {
                activeFilters.push(el)
            }
        })

        this._activeFilters = activeFilters
    }
    removeActiveFilter(filter) {
        const type = filter[3][0]
        const position = filter[3][1]
        this._allFilters[type][position][2] = false
        this.setActiveFilters()
    }

}

export const filterStore = new FilterStore()