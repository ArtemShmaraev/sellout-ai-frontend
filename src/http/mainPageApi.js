import {$host} from "@/http/index";


export async function fetchMainPage2(cookies, gender, token = "") {
    // Создаем объект конфигурации для запроса
    const config = {
        headers: {
            Cookie: cookies,  // Всегда передаем куки
        },
        withCredentials: true,  // Убедитесь, что браузер передает куки (если нужно)
    };

    // Добавляем токен в заголовок Authorization только если он передан
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    try {
        const { data } = await $host.get(`product/main_page2?gender=${gender}`, config);
        return data;
    } catch (error) {
        console.error("Error fetching main page:", error.response?.data || error.message);
        throw error;
    }
}



export async function fetchMainPage(token, nextPage, newPage, page, selected_gender) {
    let pageParam = 'page=1'
    let nextParam
    let newParam
    const paramsArr = []
    if (page) {
        pageParam = `page=${page}`
    }
    paramsArr.push(pageParam)
    if (nextPage) {
        nextParam = 'next=true'
        paramsArr.push(nextParam)
    }
    if (newPage) {
        newParam = 'new=true'
        paramsArr.push(newParam)
    }
    if (selected_gender){
        newParam = `selected_gender=${selected_gender}`
        paramsArr.push(newParam)
    }
    const str = paramsArr.join('&')
    if (token) {
        const {data} = await $host.get(`product/main_page?${str}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return data
    } else {
        const {data} = await $host.get(`product/main_page?${str}`)
        return data
    }
}

export async function fetchMore(page) {
    const {data} = await $host.get(`product/main_page?page=${page}`)
    return data
}
export async function fetchNavbarPhoto() {
    const {data} = await $host.get(`product/header_photo`)
    return data
}

export async function fetchProductsForMainPage(block_id, n, gender, token = '') {
    if (!token) {
        const {data} = await $host.get(`/product/main_page2_get_block/${block_id}${gender ? `?gender=${gender}&n=${n}` : `?n=${n}`}`)
        return data
    } else {
        const {data} = await $host.get(`/product/main_page2_get_block/${block_id}${gender ? `?gender=${gender}&n=${n}` : `?n=${n}`}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return data
    }
}