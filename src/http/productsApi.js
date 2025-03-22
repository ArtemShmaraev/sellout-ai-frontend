import {$host} from "@/http/index";

export async function fetchProductsPage(query) {
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
    const {data} = await $host.get(`product/products/?${allQuery}`)
    return data
}
export async function fetchFilter(filter) {
    const {data} = await $host.get(`product/${filter}`)
    return data
}
export async function updateProduct(id, body) {
    const {data} = await $host.put(`product/update/${id}`, body)
    return data
}
export async function deleteProduct(id) {
    const {data} = await $host.delete(`product/update/${id}`)
    return data
}