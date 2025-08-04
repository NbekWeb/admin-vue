import axios from 'axios'
// import router from '@/router'

// Umumiy axios instance
export const axiosInstance = axios.create({
   baseURL: `https://v.zesu.ru/`,
   timeout: 20000,
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
   }
})

// Auth uchun alohida instance
export const axiosAuthInstance = axios.create({
   baseURL: `https://v.zesu.ru/`,
   timeout: 20000,
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
   }
})

// Default response structure
export function getResponse_DEFAULT() {
   return {
      content: [],
      size: 10,
      page: 1,
      totalPages: 0,
      totalElements: 0,
      number: 0
   }
}

// Interceptor — axiosInstance
axiosInstance.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('token')

      if (config.url === '/auth/v1/login') {
         return config
      }

      if (config.url.includes('NO_TOKEN')) {
         config.headers.authorization = ''
      } else if (token) {
         config.headers.authorization = `Bearer ${token}`
      }

      config.url = config.url.replace('/NO_TOKEN', '')
      return config
   },
   (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
   (response) => response,
   // (error) => {
   //    if (error.response?.status === 401 || error.response?.status === 403) {
   //       localStorage.removeItem('token')
   //       router.push('/login')
   //    }
   //    return Promise.reject(error)
   // }
)

// Interceptor — axiosAuthInstance
axiosAuthInstance.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('token')

      if (config.url === '/auth/v1/login') {
         return config
      }

      if (config.url.includes('NO_TOKEN')) {
         config.headers.authorization = ''
      } else if (token) {
         config.headers.authorization = `Bearer ${token}`
      }

      config.url = config.url.replace('/NO_TOKEN', '')
      return config
   },
   (error) => Promise.reject(error)
)

axiosAuthInstance.interceptors.response.use(
   (response) => response,
   (error) => {
      // if (error.response?.status === 401 || error.response?.status === 403) {
      //    localStorage.removeItem('token')
      //    router.push('/login')
      // }
      return Promise.reject(error)
   }
)
7