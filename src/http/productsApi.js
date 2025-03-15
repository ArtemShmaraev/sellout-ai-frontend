import {$host} from "@/http/index";

export async function fetchProductsPage(page) {
    const {data} = await $host.get(`product/?page=${page}`)
    return data
}