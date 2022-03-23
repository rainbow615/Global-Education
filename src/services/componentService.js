import api, { useAPI } from './api'

export function useComponents(orgId) {
  return useAPI(orgId ? `/components/${orgId}` : null)
}

export function createComponent(payload) {
  return api.post(`/components`, payload)
}

export function updateComponent(id, payload) {
  return api.put(`/components/${id}`, payload)
}

export function deleteComponent(id) {
  return api.delete(`/components/${id}`)
}
