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
export async function addToFavouriteBrands(userId, brandId, token) {
    const {data} = await $host.get(`user/favorite_brand/${userId}/${brandId}`,{
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}
export async function deleteFavouriteBrands(userId, brandId, token) {
    const {data} = await $host.delete(`user/favorite_brand/${userId}/${brandId}`,{
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}