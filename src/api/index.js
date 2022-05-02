import axios from 'axios'
import { BASE_URL } from '../util/constants'

const axiosInstance = axios.create({baseURL: BASE_URL})


export const getBestCard = (body) => {
    return axiosInstance.post('/cards/recommend', body)
}

export const getCards = (body) => {
    return axiosInstance.get('/cards')
}

export const getCategories = (body) => {
    return axiosInstance.get('/categories')
}

export const patchUser = (body) => {
    return axiosInstance.patch('/cards', body)
}

export const postCheckout = (body) => {
    return axiosInstance.post('/checkout', body)

}

export const postCustomer = (body) => {
    return axiosInstance.post('/customer', body)
}