import {$host} from "@/http/index";

function normalizeProduct(p) {
    if (!p) return p
    const bucket = Array.isArray(p.bucket_link)
        ? p.bucket_link.map((b) => ({...b, url: b.url || b.photo}))
        : p.bucket_link
    const final = p.price && p.price.final_price
    return {
        ...p,
        bucket_link: bucket,
        min_price: p.min_price != null ? p.min_price : final,
    }
}

export async function aiSearch(query, sessionId = '') {
    const body = {query}
    if (sessionId) body.session_id = sessionId
    const {data} = await $host.post('product/ai_search', body)
    if (data && Array.isArray(data.products)) {
        data.products = data.products.map(normalizeProduct)
    }
    return data
}
