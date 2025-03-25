import {$authHost, $host} from "@/http/index";

export async function fetchWishlist(id, cookies) {
    const {data} = await $authHost.get(`wishlist/${id}`, {
        headers: {cookie: cookies}
    })
    return data
}
export async function addToWishlist(userId, productId, token) {
    const {data} = await $host.post(`wishlist/${userId}/${productId}`, {},{
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}
export async function removeFromWishlist(userId, productId, token) {
    const {data} = await $host.delete(`wishlist/${userId}/${productId}`,{
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}