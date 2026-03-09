import {$host} from "@/http/index";
import collabs_filter_data from '@/static/jsons/collabs.json'
import tree_cat_filter_data from '@/static/jsons/tree_cat.json'
import tree_line_filter_data from '@/static/jsons/tree_line.json'
import colors_filter_data from '@/static/jsons/colors.json'
import materials_filter_data from '@/static/jsons/materials.json'


export async function fetchProductsPageFooterText(query) {
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
    const {data} = await $host.get(`product/products_footer_text/?${allQuery}`)
    return data
}

export async function fetchProductsPageHeaderText(query) {
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
    const {data} = await $host.get(`product/products_header_text/?${allQuery}`)
    return data
}
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
export async function fetchPagesCnt(query, token = '') {
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
    // console.log(`product/products_count?${allQuery}`)
    //TODO log
    if (!token) {
        const {data} = await $host.get(`product/products_count?${allQuery}`)
        return data
    } else {
        const {data} = await $host.get(`product/products_count?${allQuery}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return data
    }
}
export async function fetchFilter(filter) {
    if (filter==="colors"){
        return colors_filter_data
    }
    if (filter==="tree_cat"){
        return tree_cat_filter_data
    }
    if (filter==="tree_line"){
        return tree_line_filter_data
    }
    if (filter==="materials"){
        return materials_filter_data
    }
    if (filter==="collabs"){
        return collabs_filter_data
    }

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
export async function searchBrands(q, token = '') {
    let res
    if (token) {
        res = await $host.get(`product/search_brands?q=${q}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
    } else {
        res = await $host.get(`product/search_brands?q=${q}`)
    }
    const {data} = res
    return data
}
export async function fetchSizes(query, token = '') {
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
    if (!token) {
        const {data} = await $host.get(`product/size_table?${allQuery}`)
        return data
    } else {
        const {data} = await $host.get(`product/size_table?${allQuery}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return data
    }
}
export async function updateProduct(id, body) {
    const {data} = await $host.post(`product/update/${id}`, body)
    return data
}
export async function deleteProduct(id) {
    const {data} = await $host.delete(`product/update/${id}`)
    return data
}
export async function deletePhoto(productId, photoId) {
    const {data} = await $host.get(`product/add_photo_black_list/${productId}/${photoId}`)
    return data
}
export async function fetchOneProduct(slug, token = '', ip = "") {
    // Создаем объект с параметрами
    const params = { ip };

    if (!token) {
        const { data } = await $host.get(`product/slug/${slug}`, {
            params,
            // Устанавливаем заголовок X-Forwarded-For
            headers: {
                'X-Forwarded-For': ip // Передаем IP-адрес в заголовке X-Forwarded-For
            }
        });
        return data;
    } else {
        const { data } = await $host.get(`product/slug/${slug}`, {
            params,
            // Устанавливаем заголовок X-Forwarded-For и Authorization
            headers: {
                'X-Forwarded-For': ip, // Передаем IP-адрес в заголовке X-Forwarded-For
                'Authorization': `Bearer ${token}`
            }
        });
        return data;
    }
}

export async function fetchOneProductFull(slug, token = '', ip = "") {
    // Создаем объект с параметрами
    const params = { ip };

    if (!token) {
        const { data } = await $host.get(`product/slug_full/${slug}`, {
            params,
            // Устанавливаем заголовок X-Forwarded-For
            headers: {
                'X-Forwarded-For': ip // Передаем IP-адрес в заголовке X-Forwarded-For
            }
        });
        return data;
    } else {
        const { data } = await $host.get(`product/slug_full/${slug}`, {
            params,
            // Устанавливаем заголовок X-Forwarded-For и Authorization
            headers: {
                'X-Forwarded-For': ip, // Передаем IP-адрес в заголовке X-Forwarded-For
                'Authorization': `Bearer ${token}`
            }
        });
        return data;
    }
}

export async function updateOneProduct(slug, token = '') {
    if (!token) {
        const {data} = await $host.get(`product/slug/${slug}?is_update=true`)
        return data
    } else {
        const {data} = await $host.get(`product/slug/${slug}?is_update=true`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return data
    }
}
export async function fetchPrices(id, token = '') {
    if (token) {
        const {data} = await $host.get(`product_unit/min_price/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return data
    } else {
        const {data} = await $host.get(`product_unit/min_price/${id}`)
        return data
    }
}
export async function fetchShippings(productId, sizeId, token = '') {
    const obj = {view_size: sizeId}
    if (token) {
        const {data} = await $host.post(`product_unit/delivery/${productId}`, JSON.stringify(obj), {
            headers: {Authorization: `Bearer ${token}`}
        })
        return data
    } else {
        const {data} = await $host.post(`product_unit/delivery/${productId}`, JSON.stringify(obj))
        return data
    }
}
export async function fetchProductsByArray(arr, token = '') {
    const obj = {products: arr}
    if (token) {
        const {data} = await $host.post(`product/list_product`, JSON.stringify(obj), {
            headers: {Authorization: `Bearer ${token}`}
        })
        return data
    } else {
        const {data} = await $host.post(`product/list_product`, JSON.stringify(obj))
        return data
    }
}
export async function fetchSimilarProducts(productId, token = '') {
    if (token) {
        const {data} = await $host.get(`product/similar/${productId}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return data
    } else {
        const {data} = await $host.get(`product/similar/${productId}`)
        return data
    }
}
export async function suggestSearch(qStr, token = '') {

    if (token) {
        const {data} = await $host.get(`product/suggest_search?q=${qStr}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return data
    } else {
        const {data} = await $host.get(`product/suggest_search?q=${qStr}`)
        return data
    }
}
export async function addFilterSearch(qStr) {
    const {data} = await $host.get(`product/add_filter_search?q=${qStr}`)
    return data
}
export async function buyout(formDataObj) {
    const {data} = await $host.post(`product/ransom_request`, formDataObj)
    return data
}