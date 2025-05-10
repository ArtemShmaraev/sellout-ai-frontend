import {$host} from "@/http/index";

export async function fetchMainPage() {
    const {data} = await $host.get(`product/main_page`)
    return data
}
export async function fetchMore(page) {
    const {data} = await $host.get(`product/main_page?page=${page}`)
    return data
}
export async function fetchNavbarPhoto() {
    const {data} = await $host.get(`product/header_photo`)
    return data
}