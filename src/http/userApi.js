import {$authHost, $host} from "@/http/index";
import Cookies from 'js-cookie'

export async function registration(body) {
    const {data} = await $host.post(`user/register`, body)
    Cookies.set('access_token', data.access)
    Cookies.set('refresh_token', data.refresh)
    return data
}
export async function login(body) {
    const {data} = await $host.post(`user/login`, body)
    Cookies.set('access_token', data.access)
    Cookies.set('refresh_token', data.refresh)
    return data
}
export async function googleAuth(token) {
    const {data} = await $host.get(`user/auth/complete/google/?id_token=${token}`)
    Cookies.set('access_token', data.access)
    Cookies.set('refresh_token', data.refresh)
    return data
}
export async function checkAuth() {
    const {data} = await $host.post('user/token/verify/')
    return data
}
export async function refreshToken(token) {
    const {data} = await $host.post('user/token/refresh/', token)
    Cookies.set('access_token', data.access)
    return data
}
export async function fetchUserInfo(cookies, id) {
    const {data} = await $authHost.get(`user/user_info/${id}`, {
        headers: {cookie: cookies}
    })
    return data
}
export async function editUserInfo(token, userId, obj) {
    const {data} = await $host.put(`user/user_info/${userId}`, obj,{
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}
export async function fetchAddresses(cookies, id) {
    const {data} = await $authHost.get(`user/address/${id}`, {
        headers: {cookie: cookies}
    })
    return data
}
export async function addAddress(token, id, obj) {
    const {data} = await $host.post(`user/address/${id}`, obj,{
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}
export async function editAddress(token, userId, addressId, obj) {
    const {data} = await $host.put(`user/address/${userId}/${addressId}`, obj,{
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}
export async function deleteAddress(token, userId, addressId) {
    const {data} = await $host.delete(`user/address/${userId}/${addressId}`,{
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}
export async function fetchLastSeen(cookies, userId) {
    const {data} = await $authHost.get(`user/last_seen/${userId}`, {
        headers: {cookie: cookies}
    })
    return data
}
export async function addLastSeen(token, userId, productId) {
    const obj = {product_id: productId}
    const {data} = await $host.post(`user/last_seen/${userId}`, JSON.stringify(obj),{
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}
export async function getSizeTable(cookies) {
    const {data} = await $authHost.get(`user/get_size_table`, {
        headers: {cookie: cookies}
    })
    return data
}
export async function fetchSizeInfo(cookies) {
    const {data} = await $authHost.get(`user/size_info`, {
        headers: {cookie: cookies}
    })
    return data
}
export async function sendSizeInfo(token, obj) {
    const {data} = await $host.post(`user/size_info`, obj, {
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}
export async function sendPassEmail(email) {
    const {data} = await $host.get(`user/send_set_pwd/${email}`)
    return data
}
export async function changePass(uidb64, token, pass) {
    const obj = {
        password: pass
    }
    const {data} = await $host.post(`user/change_pwd/${uidb64}/${token}`, JSON.stringify(obj))
    return data
}
export async function changePassAccountPage(token, userId, oldPass, newPass) {
    const obj = {
        old_password: oldPass,
        new_password: newPass
    }
    const {data} = await $host.post(`user/change_pwd_lk/${userId}`, JSON.stringify(obj), {
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}