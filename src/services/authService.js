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

export function requestResetPassword(email) {
  return api.get(`/reset/${email}`)
}

export function changePassword(payload) {
  return api.put(`/resetpassword`, payload)
}

export function whoAmI(token) {
  return api.get(`/whoami`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
}
