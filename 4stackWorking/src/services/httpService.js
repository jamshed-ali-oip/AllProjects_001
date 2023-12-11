import axios from 'axios'

// ** Config
import authConfig from '../configs/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/', // local
  // baseURL: 'http://3.91.218.114/api/v1', // live
  timeout: 500000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
// instance.interceptors.request.use(function (config) {
//   // const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
//   const storedToken = AsyncStorage.getItem(authConfig.storageTokenKeyName)

//   return {
//     ...config,
//     headers: {
//       authorization: storedToken ? `Bearer ${storedToken}` : null
//     }
//   }
// })

// const responseBody = (response: any) => response.data;

// const requests = {
//   get: (url: any, body?: any, headers?: any) => instance.get(url, body).then(responseBody),

//   post: (url: string, body: any) => instance.post(url, body).then(responseBody),

//   put: (url: any, body: any, headers: any) => instance.put(url, body).then(responseBody),

//   patch: (url: any, body: any) => instance.patch(url, body).then(responseBody),

//   delete: (url: any) => instance.delete(url).then(responseBody),
// };

export default instance
