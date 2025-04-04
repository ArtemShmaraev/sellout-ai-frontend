import {$authHost, $host} from "@/http/index";

export async function fetchCart(id, cookies) {
    const {data} = await $authHost.get(`order/cart/${id}`, {
        headers: {cookie: cookies}
    })
    return data
}
export async function addToCart(userId, productUnitId, token) {
    const {data} = await $host.post(`order/cart/${userId}/${productUnitId}`, {},{
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}
export async function removeFromCart(userId, productUnitId, token) {
    const {data} = await $host.delete(`order/cart/${userId}/${productUnitId}`,{
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}
export async function fetchProductUnits(obj) {
    const {data} = await $host.post('product_unit/list', obj)
    return data
}
export async function updateCartFromCookies(cookieStr, userId, token) {
    const unitIdArr = cookieStr.trim().split(' ').map(el => Number(el))
    const obj = {product_unit_list: unitIdArr}
    const {data} = await $host.post(`order/cart_list/${userId}`, JSON.stringify(obj), {
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}