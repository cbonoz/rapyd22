import axios from 'axios'
import { BASE_URL } from '../util/constants'

const axiosInstance = axios.create({baseURL: BASE_URL})


export const createPaymentSubscription = () => {

}

export const createWallet = () => {

}

export const postCustomer = (body) => {
    return axiosInstance.post('/customer', body)
}