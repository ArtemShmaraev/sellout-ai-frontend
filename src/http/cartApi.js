import {$authHost, $host} from "@/http/index";

export async function fetchCart(id, cookies) {
    const {data} = await $authHost.get(`order/cart/${id}`, {
        headers: {cookie: cookies}
    })
    return data
}
export async function fetchCart2(id, token) {
    const {data} = await $host.get(`order/cart/${id}`, {
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}
export async function updateCart2(id, token) {
    const {data} = await $host.get(`order/cart/${id}?is_update=true`, {
        headers: {Authorization: `Bearer ${token}`}
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
export async function updateProductUnit(userId, productUnitId, newProductUnitId, token) {
    const {data} = await $host.put(`order/cart/${userId}/${productUnitId}/${newProductUnitId}`,{
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}
export async function fetchProductUnits(obj, token) {
    if (!token) {
        const {data} = await $host.post('product_unit/list', obj)
        return data
    } else {
        const {data} = await $host.post('product_unit/list', obj, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return data
    }
}
export async function updateCartFromCookies(cookieStr, userId, token) {
    const unitIdArr = cookieStr.trim().split(' ').filter(el => el !== '' && el !== ' ')
    const obj = {product_unit_list: unitIdArr}
    if (!cookieStr) {
        obj.product_unit_list = []
    }
    const {data} = await $host.post(`order/cart_list/${userId}`, JSON.stringify(obj), {
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}
export async function fetchCartPrice(cartArr, promoStr) {
    const obj = {
        product_unit_list: cartArr,
        promo: promoStr
    }
    const {data} = await $host.post(`product_unit/total_amount_list`, JSON.stringify(obj))
    return data
}
export async function promoAuth(promoStr, userId, token) {
    const obj = {
        promo: promoStr
    }
    const {data} = await $host.post(`promo/check/${userId}`, JSON.stringify(obj), {
            headers: {Authorization: `Bearer ${token}`}
        }
    )
    return data
}
export async function promoUnauth(promoStr, cartArr) {
    const obj = {
        product_unit_list: cartArr,
        promo: promoStr
    }
    const {data} = await $host.post(`promo/anon_check`, JSON.stringify(obj))
    return data
}
export async function useBonuses(bonusesVal, token) {
    const obj = {
        bonus: bonusesVal
    }
    const {data} = await $host.post(`order/cart/use_bonus`, JSON.stringify(obj), {
            headers: {Authorization: `Bearer ${token}`}
        }
    )
    return data
}