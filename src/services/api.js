import axios from 'axios'
import useSWR from 'swr'
import { notification } from 'antd'

import useApiResponse from '../hooks/useApiResponse'
import { getUser } from '../utils/cookie'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const { token, user_id } = getUser()

  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }

  if (user_id) {
    config.headers['User-Id'] = user_id
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error.response)
    if (error.response?.status === 401 && error.response?.data === 'Unauthorized') {
      notification.error({
        message: 'Unauthorized',
        description: 'Your session expired. You need to login again.',
      })

      window.stop()
    }

    return Promise.reject(error.response)
  }
)

export default api

export function getCacheKey(url, params) {
  const cacheKey = [url]
  if (params) {
    cacheKey.push(JSON.stringify(params))
  }
  // cacheKey.push(getToken())
  return cacheKey
}

export function useAPI(url, params, config) {
  const { data, mutate } = useSWR(getCacheKey(url, params), async () => {
    const { data } = await api.get(url, { params, ...config })
    data.isLoading = false
    return data
  })

  const cachedResponse = useApiResponse(data)

  return {
    data: cachedResponse || { isLoading: true },
    mutate,
  }
}
