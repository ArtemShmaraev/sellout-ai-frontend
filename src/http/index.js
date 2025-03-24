import axios from 'axios'
const $host = axios.create({
    baseURL: 'http://62.84.118.213:8080/api/v1/'
})
const $authHost = axios.create({
    baseURL: 'http://62.84.118.213:8080/api/v1/'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

export {
    $host,
    $authHost
}