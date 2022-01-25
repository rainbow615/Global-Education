import axios from 'axios'
import useSWR from 'swr'
import useApiResponse from '../hooks/useApiResponse'
import { getUser, getToken } from '../utils/cookie'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const { token, user_id } = getUser()
  console.log(token, user_id)

  if (token && user_id) {
    config.headers.authorization = `Bearer ${token}`
    config.headers['User-id'] = user_id
  }
  console.log(config.headers.authorization)
  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

export default api

export function getCacheKey(url, params) {
  const cacheKey = [url]
  if (params) {
    cacheKey.push(JSON.stringify(params))
  }
  cacheKey.push(getToken())
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
