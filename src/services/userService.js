import api, { useAPI } from './api'

export function useUser(id) {
  return useAPI(`users/${id}`)
}

export function updateUser(id, payload) {
  return api.put(`users/${id}`, payload)
}

export function useUsersList() {
  return useAPI(`users`)
}
