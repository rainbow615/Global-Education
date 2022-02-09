import api, { useAPI } from './api'

export function useOrganizations(id) {
  return useAPI(`/organizations`)
}

export function createOrganization(payload) {
  return api.post(`/organizations`, payload)
}

export function updateOrganization(id, payload) {
  return api.put(`/organizations/${id}`, payload)
}
