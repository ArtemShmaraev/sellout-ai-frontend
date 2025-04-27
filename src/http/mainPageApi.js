import {$host} from "@/http/index";

export async function fetchMainPage() {
    const {data} = await $host.get(`product/main_page`)
    return data
}