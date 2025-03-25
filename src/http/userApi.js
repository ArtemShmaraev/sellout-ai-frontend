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
export async function checkAuth() {
    const {data} = await $host.post('user/token/verify/')
    return data
}
export async function refreshToken(token) {
    const {data} = await $host.post('user/token/refresh/', token)
    Cookies.set('access_token', data.access)
    return data
}