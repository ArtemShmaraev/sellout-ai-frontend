import {makeAutoObservable} from "mobx";
import cn from "classnames";
import Cookies from "js-cookie";
import sizes from '@/static/jsons/size_table.json'
class FilterStore {
    constructor() {
        this._ref = null
        this._pageRef = null
        this._allFilters = {
            q: {
                text: '',
                query: '',
                state: false,
            },
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
            material: {},
            price: ['0', '1000000'],
            minMaxPrice: ['0', '1000000'],
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
        this._collabQ = ''
        this._lineQ = ''
        this._activeFilters = []
        makeAutoObservable(this)
    }
    setQ(value) {
        this.filters.q.text = 'Поиск: ' + value
        // this.filters.q.query = value
        this.filters.q.state = true
    }
    toggleQ(bool) {
        this.filters.q.state = bool
    }
    get QActive() {
        if (this.filters.q.state === true) {
            return [this.filters.q]
        }
        return []
    }
    get collabQ() {
        return this._collabQ
    }
    setCollabQ(val) {
        this._collabQ = val
    }
    get lineQ() {
        return this._lineQ
    }
    setLineQ(val) {
        this._lineQ = val
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

        this._activeFilters = []
    }
    reactivateFilters(query){ {
        if (!query.hasOwnProperty('gender'))
        {
            const selectedGender = Cookies.get('selected_gender');
            if (selectedGender === 'M' || selectedGender === 'F') {
                query['gender'] = selectedGender
            }
        }
        for (const key in query) {
            if (key === 'page' || key === 'price' || key === 'ordering'
                || key === 'price_min' || key === 'price_max' || key === 'is_collab'
                || key === 'brand' || key === 'new' || key === 'recommendations' || key === 'adminka'
                || key === 'category_id' || key === 'category_name' || key === 'level1_category_id'
                || key === 'level2_category_id' || key === 'title') continue
            if (key === 'q') {
                this.setQ(query[key])
                this._activeFilters.push(this.filters.q)
                continue
            }

            if (Array.isArray(query[key])) {
                query[key].forEach(el => {
                    if (key in this.filters){
                        this.dfsActivate(this.filters[key], el)
                    }

                })
            } else {
                if (key in this.filters){
                    this.dfsActivate(this.filters[key], query[key])
                }

            }
        }
        this.dfsPath(this.filters, [])
        this._activeFilters = this._activeFilters.filter((obj, index) => {
            return this._activeFilters.findIndex((o) => {
                return JSON.stringify(o) === JSON.stringify(obj);
            }) === index;
        });
    }}

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
        if (item.path[0] === 'collab') {
            const deactivateList = []
            const obj = this.filters.collab
            for (const key in obj) {
                if (item.is_all) {
                    if (!obj[key].is_all) {
                        obj[key].state = false
                        deactivateList.push(obj[key])
                    }
                } else {
                    if (obj[key].is_all) {
                        obj[key].state = false
                        deactivateList.push(obj[key])
                        break
                    }
                }
            }
            for (let i = 0; i < deactivateList.length; i++) {
                this._activeFilters = this._activeFilters.filter(el => el.query !== deactivateList[i].query)
            }
        } else {
            this.toggleAll2(item)
        }
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
        // console.log(item.path)
        // console.log(item.text)
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
    toggleAll2(item) {
        let isAll
        let currObj = this.filters
        if (!item.hasOwnProperty('is_all')) {
            return null
        } else {
            isAll = item.is_all
        }
        const deactivateList = []
        if (isAll && item.state) {
            for (let i = item.path.length-2; i > 0; i--) {
                const {path} = item
                for (let j = 0; j < i; j++) {
                    currObj = currObj[path[j]]
                }
                for (const key in currObj) {
                    if (currObj[key].is_all && currObj[key].query !== item.query) {
                        currObj[key].state = false
                        deactivateList.push(currObj[key])
                    }
                }
            }

            currObj = this.filters
            for (let j = 0; j < item.path.length-1; j++) {
                currObj = currObj[item.path[j]]
            }
            this.deactivateFiltersBelow(currObj, item.query)
        }
        if (!isAll && item.state) {
            item.path.forEach(el => {
                currObj = currObj[el]
                for (const key in currObj) {
                    if (currObj[key].hasOwnProperty('is_all') && currObj[key].is_all) {
                        currObj[key].state = false
                        deactivateList.push(currObj[key])
                    }
                }
            })
        }
        // this.deactivateFiltersBelow(parentObj)
        for (let i = 0; i < deactivateList.length; i++) {
            this._activeFilters = this._activeFilters.filter(el => el.query !== deactivateList[i].query)
        }
    }
    deactivateFiltersBelow(d, query) {
        for (const key in d) {
            if (key === 'path') {
                // console.log('skip')
                continue
            }
            if (d[key].hasOwnProperty('state')) {
                if (d[key].query !== query) {
                    d[key].state = false
                    this._activeFilters = this._activeFilters.filter(el => el.query !== d[key].query)
                }
            } else {
                this.deactivateFiltersBelow(d[key], query)
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
        this.filters.line = {}
        this.line_dfs(this.filters.line, lines)
    }
    line_dfs(d, node, isShow = true) {
        for (let line of node) {
            if ("children" in line) {
                let show = true
                if ('is_show' in line && !line.is_show) {
                    show = false
                }
                d[line["name"]] = {};
                this.line_dfs(d[line["name"]], line["children"], show);
            } else {
                d[line["name"]] = {};
                d[line["name"]]["text"] = line["view_name"];
                d[line["name"]]["query"] = line["full_eng_name"];
                d[line["name"]]["is_all"] = line["is_all"];
                d[line["name"]]["state"] = false;
                if (line.hasOwnProperty('is_show')) {
                    d[line["name"]]["is_show"] = line["is_show"];
                } else {
                    d[line["name"]]["is_show"] = isShow;
                }
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
        this.filters.collab = {}
        collection.forEach(el => {
            this.filters.collab[el.name] = {
                text: el.name,
                query: el.query_name,
                state: false,
                is_all: el.is_all,
                is_show: el.is_show
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
    fillSizes(size_tables_name) {
        this.filters.size = {}
        sizes.forEach(sizeCategory => {
            if (size_tables_name.includes(sizeCategory.name)){
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
                            viewName: size.view_name_in_line,
                            state: false,
                            logo,
                            isMain
                        }
                    })



                }

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
        const arr = [];

        for (const key in this.filters.gender) {
            arr.push({ ...this.filters.gender[key] });
        }

        // Добавляем selected_gender, если он не включен в фильтры
        // if (arr.length === 0) {
        //     const selectedGender = Cookies.get('selected_gender');
        //     if (selectedGender) {
        //         arr.push({ value: selectedGender, label: selectedGender });
        //     }
        // }

        return arr;
    }

    get checkedGendersQuery() {
        const checkedGenders = [];

        for (const key in this.activeFilters) {
            if (this.activeFilters[key].path[0] === 'gender') {
                checkedGenders.push(this.activeFilters[key].query);
            }
        }



        // Добавляем selected_gender, если он не включен в активные фильтры
        if (checkedGenders.length === 0) {

            const selectedGender = Cookies.get('selected_gender');
            if (selectedGender === 'M' || selectedGender === 'F') {
                checkedGenders.push(selectedGender);
            }
        }

        return checkedGenders;
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
    get materials() {
        const arr = []
        for (const key in this.filters.material) {
            arr.push({...this.filters.material[key]})
        }
        return arr
    }
    fillMaterials(materials) {
        this.filters.material = {}
        materials.forEach(el => {
            this.filters.material[el.name] = {
                text: el.name,
                query: el.eng_name,
                state: false,
                is_all: el.is_all,
            }
        })
    }
    get checkedMaterials() {
        const arr = []
        for (const key in this.activeFilters) {
            if (this.activeFilters[key].path[0] === 'material') {
                arr.push(this.activeFilters[key].query)
            }
        }
        return arr
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
    setPageRef(ref) {
        this._pageRef = ref
    }
    get pageRef() {
        return this._pageRef
    }
    handleScrollTo() {
        const position = this.ref.current.offsetTop - 225;
        const currentScroll = window.scrollTop || document.documentElement.scrollTop

        if (currentScroll > position) {
            window.scrollTo({
                top: position,
                behavior: 'smooth',
                duration: 1000,
            });
        }
    };
}

export const filterStore = new FilterStore()