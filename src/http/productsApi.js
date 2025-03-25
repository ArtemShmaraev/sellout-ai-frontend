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
export async function updateProduct(id, body) {
    const {data} = await $host.post(`product/update/${id}`, body)
    return data
}
export async function deleteProduct(id) {
    const {data} = await $host.delete(`product/update/${id}`)
    return data
}
export async function fetchOneProduct(slug) {
    const {data} = await $host.get(`product/slug/${slug}`)
    return data
}