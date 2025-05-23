import {$host} from "@/http/index";

export async function fetchDeliveryInfo(obj, token) {
    const {data} = await $host.post(`order/delivery_info`, JSON.stringify(obj), {
        headers: {Authorization: `Bearer ${token}`}
    })
    return data
}