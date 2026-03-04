import {$host} from "@/http/index";


export async function fetchMainPage(token, nextPage, newPage, page, selected_gender) {
    let pageParam = 'page=1'
    let nextParam
    let newParam
    const paramsArr = []
    if (page) {
        pageParam = `page=${page}`
    }
    paramsArr.push(pageParam)
    if (nextPage) {
        nextParam = 'next=true'
        paramsArr.push(nextParam)
    }
    if (newPage) {
        newParam = 'new=true'
        paramsArr.push(newParam)
    }
    if (selected_gender){
        newParam = `selected_gender=${selected_gender}`
        paramsArr.push(newParam)
    }
    const str = paramsArr.join('&')
    if (token) {
        const {data} = await $host.get(`product/main_page?${str}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return data
    } else {
        const {data} = await $host.get(`product/main_page?${str}`)
        return data
    }
}
export async function fetchMore(page) {
    const {data} = await $host.get(`product/main_page?page=${page}`)
    return data
}
export async function fetchNavbarPhoto() {
    const {data} = await $host.get(`product/header_photo`)
    return data
}

export async function fetchProductsForMainPage(query, token = '') {
    if (!token) {
        const {data} = await $host.get(`product${query}`)
        console.log(data.results)
        return data.results
    } else {
        const {data} = await $host.get(`product${query}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return data.results
    }
}