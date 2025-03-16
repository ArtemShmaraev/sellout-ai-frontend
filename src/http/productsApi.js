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