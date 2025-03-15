import axios from 'axios'
const $host = axios.create({
    baseURL: 'http://62.84.118.213:8080/api/v1'
})

export {
    $host
}