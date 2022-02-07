import api, { useAPI } from './api'

export function useUser(id) {
  return useAPI(`users/${id}`)
}

export function updateUser(id, payload) {
  return api.put(`users/${id}`, payload)
}

// export function useUsers() {
//   return useAPI(`/users`)
// }

// export function checkEmailVerificationStatus(email) {
//   return api.get(`users/verified/${email}`)
// }

// export function createUser(payload) {
//   return api.post(`users`, payload)
// }

// export function deleteUser(userId) {
//   return api.delete(`users/${userId}`)
// }
