import axios from 'axios'
import useSWR from 'swr'
import useApiResponse from '../hooks/useApiResponse'
import { getToken } from '../utils/cookie'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = getToken()
  console.log(getToken())
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  console.log(config.headers.authorization)
  return config
})

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
