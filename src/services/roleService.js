import api, { useAPI } from './api'

export function useRoles() {
  return useAPI(`/roles`)
}

export function createRole(payload) {
  return api.post(`roles`, payload)
}

export function updateRole(roleId, payload) {
  return api.put(`roles/${roleId}`, payload)
}
