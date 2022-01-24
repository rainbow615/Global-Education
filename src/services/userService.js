import api, { useAPI } from './api'

export function useUsers() {
  return useAPI(`/users`)
}

export function useUser(email) {
  return useAPI(`users/${email}`)
}

export function checkEmailVerificationStatus(email) {
  return api.get(`users/verified/${email}`)
}

export function createUser(payload) {
  return api.post(`users`, payload)
}

export function updateUser(email, payload) {
  return api.put(`users/${email}`, payload)
}

export function deleteUser(userId) {
  return api.delete(`users/${userId}`)
}
