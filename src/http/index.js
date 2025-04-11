import axios from 'axios'
import {parse} from "cookie";

const $host = axios.create({
    baseURL: 'http://51.250.74.115:8080/api/v1/'
})
const $authHost = axios.create({
    baseURL: 'http://51.250.74.115:8080/api/v1/'
})
const $dadata = axios.create({
    baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
})

$authHost.interceptors.request.use((config) => {
    const accessToken = parse(config.headers.cookie).access_token
    // const refreshToken = parse(config.headers.cookie).refresh_token
    if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`
        // config.refresh_token = refreshToken
    }
    return config
})
// $authHost.interceptors.response.use((config) => {
//     return config
// }, async (error) => {
//     const refreshToken = error.config.refresh_token
//     const originalRequest = error.config;
//     if (error.response.status === 401 && refreshToken) {
//         const refreshObj = JSON.stringify({refresh: refreshToken})
//         const response = await axios.post('http://51.250.74.115:8080/api/v1/user/token/refresh/', refreshObj)
//         const newAccess = response.data.access
//
//     }
// })

export {
    $host,
    $authHost,
    $dadata
}