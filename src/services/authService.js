import api from './api'

export function login(payload) {
  return api.post(`/login`, payload)
}

export function validateToken() {
  return api.get(`/users/valid`)
}
