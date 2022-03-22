import api, { useAPI } from './api'

export function useProtocols(orgId) {
  return useAPI(orgId ? `/components/${orgId}` : null)
}

export function createProtocol(payload) {
  return api.post(`/components`, payload)
}

export function updateProtocol(id, payload) {
  return api.put(`/components/${id}`, payload)
}

export function deleteProtocol(id) {
  return api.delete(`/components/${id}`)
}
