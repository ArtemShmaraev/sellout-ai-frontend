import {$dadata} from "@/http/index";

export async function suggestions(str) {
    const {data} = await $dadata.post('', {"query": str}, {
        headers: {Authorization: `Token 7b8466ea8df30fc6a906c7e351e1da4160766933`},
    })
    return data
}