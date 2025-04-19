import {makeAutoObservable} from "mobx";

class FilterStore {
    constructor() {
        this._ref = null
        this._allFilters = {
            category: {},
            line: {},
            collab: {},
            color: {},
            size: {},
            size_table: {},
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
            price: [null, null],
            minMaxPrice: [null, null],
            is_fast_ship: {
                text: 'Мгновенная доставка',
                query: 'is_fast_ship',
                state: false,
            },
            is_sale: {
                text: 'Скидка',
                query: 'is_sale',
                state: false,
            },
        }
        this._curr_size = {}
        this._activeFilters = []
        makeAutoObservable(this)
    }
    get filters() {
        return this._allFilters
    }
    get activeFilters() {
        return this._activeFilters
    }
    deactivateFilters(d) {
        for (const key in d) {
            if (key === 'path') continue
            if (d[key] && typeof d[key] === 'object') {
                if (d[key].hasOwnProperty('state')) {
                    d[key]['state'] = false;
                } else {
                    this.deactivateFilters(d[key]);
                }
            }
        }
        this._activeFilters = [];
        this._allFilters.price[0] = this._allFilters.minMaxPrice[0];
        this._allFilters.price[1] = this._allFilters.minMaxPrice[1];
    }
    reactivateFilters(query) {
        for (const key in query) {
            if (key === 'page' || key === 'price' || key === 'ordering'
                || key === 'price_min' || key === 'price_max' || key === 'is_collab'
                || key === 'brand' || key === 'q') continue
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
        this.toggleAll(item)
        if (d.state) {
            this._activeFilters.push(item)
        } else {
            // let ind = this._activeFilters.indexOf(item)
            // this._activeFilters.splice(ind, 1)
            //Старый вариант
            this._activeFilters = this._activeFilters.filter(el => el.query !== item.query)
        }
        this.handleScrollTo()
    }
    toggleAll(item) {
        if (item.hasOwnProperty('is_all')) {
            const deactivateList = []
            const obj = this.findObj(this.filters, item.path[item.path.length - 2], item.path)
            if (item.is_all) {
                for (const key in obj) {
                    if (obj[key].hasOwnProperty('state') && !obj[key]['is_all']) {
                        obj[key]['state'] = false
                        deactivateList.push(obj[key])
                    }
                }
            }
            if (!item.is_all) {
                for (const key in obj) {
                    if (obj[key].hasOwnProperty('state') && obj[key]['is_all']) {
                        obj[key]['state'] = false
                        deactivateList.push(obj[key])
                    }
                }
            }
            for (let i = 0; i < deactivateList.length; i++) {
                this._activeFilters = this._activeFilters.filter(el => el.query !== deactivateList[i].query)
            }
        }
    }
    findObj(d, searched, path, currInd = 0) {
        if (d.hasOwnProperty(searched)) {
            return d[searched]
        } else {
            return this.findObj(d[path[currInd]], searched, path, currInd + 1)
        }
    }
   fillCat(categories) {
        this.cat_dfs(this.filters.category, categories)
   }
    cat_dfs(d, node) {
        for (let cat of node) {
            if ("children" in cat) {
                d[cat["name"]] = {};
                this.cat_dfs(d[cat["name"]], cat["children"]);
            } else {
                d[cat["name"]] = {};
                d[cat["name"]]["text"] = cat["name"];
                d[cat["name"]]["query"] = cat["eng_name"];
                d[cat["name"]]["is_all"] = cat["is_all"];
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
    fillLines(lines) {
        this.line_dfs(this.filters.line, lines)
    }
    line_dfs(d, node) {
        for (let line of node) {
            if ("children" in line) {
                d[line["name"]] = {};
                this.line_dfs(d[line["name"]], line["children"]);
            } else {
                d[line["name"]] = {};
                d[line["name"]]["text"] = line["view_name"];
                d[line["name"]]["query"] = line["full_eng_name"];
                d[line["name"]]["is_all"] = line["is_all"];
                d[line["name"]]["state"] = false;
            }
        }
    }
    get checkedLine() {
        const checkedCat = []
        for (const key in this.activeFilters) {
            if (this.activeFilters[key].path[0] === 'line') {
                checkedCat.push(this.activeFilters[key].query)
            }
        }
        return checkedCat
    }
    get collections() {
        const arr = []
        for (const key in this.filters.collab) {
            arr.push({...this.filters.collab[key]})
        }
        return arr
    }
    fillCollections(collection) {
        collection.forEach(el => {
            this.filters.collab[el.name] = {
                text: el.name,
                query: el.query_name,
                state: false
            }
        })
    }
    get checkedCollectionsQuery() {
        const arr = []
        for (const key in this.activeFilters) {
            if (this.activeFilters[key].path[0] === 'collab') {
                arr.push(this.activeFilters[key].query)
            }
        }
        return arr
    }
    fillSizes(sizes) {
        this.filters.size = {}
        sizes.forEach(sizeCategory => {
            this.filters.size[sizeCategory.filter_name] = {}
            for (const key in sizeCategory.size_rows) {
                const name = sizeCategory.size_rows[key].filter_name
                const logo = sizeCategory.size_rows[key].filter_logo
                const isMain = sizeCategory.size_rows[key].is_main
                this.filters.size[sizeCategory.filter_name][name] = {}
                sizeCategory.size_rows[key].sizes.forEach(size => {
                    this.filters.size[sizeCategory.filter_name][name][size.size] = {
                        text: size.size,
                        query: size.query[0],
                        state: false,
                        logo,
                        isMain
                    }
                })

            }
        })
    }
    getSizes(category, row) {
        const arr = []
        const sizes = this.filters.size[category][row]
        for (const key in sizes) {
            arr.push(sizes[key])
        }
        return arr.sort((a, b) => Number(a.text) - Number(b.text))
    }
    get checkedSize() {
        const checkedCat = []
        for (const key in this.activeFilters) {
            if (this.activeFilters[key].path[0] === 'size') {
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
    fillColors(colors) {
        colors.forEach(el => {
            this.filters.color[el.name] = {
                text: el.russian_name,
                query: el.name,
                hex: el.hex,
                state: false
            }
        })
    }
    get color() {
        const arr = []
        for (const key in this.filters.color) {
            arr.push({...this.filters.color[key]})
        }
        return arr
    }
    get checkedColorsQuery() {
        const checkedColors = []
        for (const key in this.activeFilters) {
            if (this.activeFilters[key].path[0] === 'color') {
                checkedColors.push(this.activeFilters[key].query)
            }
        }
        return checkedColors
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
    setMinPrice(price) {
        this._allFilters.minMaxPrice[0] = price
    }
    setMaxPrice(price) {
        this._allFilters.minMaxPrice[1] = price
    }
    get minMaxPrice() {
        return this._allFilters.minMaxPrice
    }
    get checkedSale() {
        if (this.filters.is_sale.state) {
            return [this.filters.is_sale.query]
        } else {
            return []
        }
    }
    get checkedFastShip() {
        if (this.filters.is_fast_ship.state) {
            return [this.filters.is_fast_ship.query]
        } else {
            return []
        }
    }
    setRef(ref) {
        this._ref = ref
    }
    get ref() {
        return this._ref
    }
    handleScrollTo() {
        const position = this.ref.current.offsetTop - 100;
        const currentScroll = window.scrollTop || document.documentElement.scrollTop

        if (currentScroll > position) {
            window.scrollTo({
                top: position,
                behavior: 'smooth',
            });
        }
    };
}

export const filterStore = new FilterStore()