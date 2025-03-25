import axios from 'axios'
import Cookies from 'js-cookie'

const $host = axios.create({
    baseURL: 'http://51.250.74.115:8080/api/v1/'
})
const $authHost = axios.create({
    baseURL: 'http://51.250.74.115:8080/api/v1/'
})

const authInterceptor = config => {
    const token = Cookies.get('access_token')
    if(token) {
        config.headers.authorization = `Bearer ${token}`
    }
    return config
}

export {
    $host,
    $authHost
}