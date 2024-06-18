import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage"

import { isTokenExpired, verify } from 'jsonwebtoken'

const apiInstance = axios.create({
    baseURL: 'https://newsfu.xyz'
})

apiInstance.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
        try {
            config.headers.Authorization = 'Bearer ' + token
        } catch (error) {
            await AsyncStorage.removeItem('token')
        }
    }
    return config
})

export default apiInstance

