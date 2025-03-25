import {$host} from "@/http/index";

export async function registration(body) {
    const {data} = await $host.post(`user/register`, body)
    console.log(data)
    //TODO delete log
    return data
}
export async function login(body) {
    const {data} = await $host.post(`user/login`, body)
    console.log(data)
    //TODO delete log
    return data
}
export async function checkAuth(token) {
    const {data} = await $host.post('user/token/verify/', token)
    return data
}
export async function refreshToken(token) {
    const {data} = await $host.post('user/token/refresh/', token)
    return data
}