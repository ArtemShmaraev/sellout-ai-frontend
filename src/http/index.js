import axios from 'axios'
const $host = axios.create({
    baseURL: 'http://51.250.74.115:8080/api/v1/'
})
const $authHost = axios.create({
    baseURL: 'http://51.250.74.115:8080/api/v1/'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

export {
    $host,
    $authHost
}