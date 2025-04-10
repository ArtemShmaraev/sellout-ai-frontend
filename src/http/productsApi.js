import {$host} from "@/http/index";

export async function fetchProductsPage(query, token = '') {
    let allQuery = ''
    Object.keys(query).forEach(key => {
        if (typeof query[key] === "object") {
            query[key].forEach(el => {
                allQuery += `${key}=${el}&`
            })
        } else {
            allQuery +=`${key}=${query[key]}&`
        }
    })
    console.log(allQuery)
    //TODO delete log
    if (!token) {
        const {data} = await $host.get(`product/products/?${allQuery}`)
        return data
    } else {
        const {data} = await $host.get(`product/products/?${allQuery}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return data
    }
}
export async function fetchFilter(filter) {
    const {data} = await $host.get(`product/${filter}`)
    return data
}
export async function fetchBrands(token = '') {
    let res
    if (token) {
        res = await $host.get(`product/brands`, {
            headers: {Authorization: `Bearer ${token}`}
        })
    } else {
        res = await $host.get(`product/brands`)
    }
    const {data} = res
    return data
}
export async function updateProduct(id, body) {
    const {data} = await $host.post(`product/update/${id}`, body)
    return data
}
export async function deleteProduct(id) {
    const {data} = await $host.delete(`product/update/${id}`)
    return data
}
export async function fetchOneProduct(slug, token = '') {
    if (!token) {
        const {data} = await $host.get(`product/slug/${slug}`)
        return data
    } else {
        const {data} = await $host.get(`product/slug/${slug}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return data
    }
}
export async function fetchPrices(id) {
    const {data} = await $host.get(`product_unit/min_price/${id}`)
    return data
}
export async function fetchShippings(productId, sizeId) {
    const {data} = await $host.get(`product_unit/delivery/${productId}/${sizeId}`)
    return data
}
export async function fetchProductsByArray(arr) {
    const obj = {products: arr}
    const {data} = await $host.post(`product/list_product`, JSON.stringify(obj))
    return data
}