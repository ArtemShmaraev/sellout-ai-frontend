import {$host} from "@/http/index";

export async function registration(body) {
    const {data} = await $host.post(`user/register`, body)
    return data
}
export async function login(body) {
    const {data} = await $host.post(`user/login`, body)
    return data
}