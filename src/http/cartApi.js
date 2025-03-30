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