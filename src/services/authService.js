import api from './api'

export function login(payload) {
  return api.post(`/login`, payload)
}

export function send2FACode() {
  return api.get(`/tfasend`)
}

export function check2FACode(code) {
  return api.get(`/tfacheck/${code}`)
}

export function requestRegistration(payload) {
  return api.post(`/regreq`, payload)
}
