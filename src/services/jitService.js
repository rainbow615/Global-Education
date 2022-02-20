import api, { useAPI } from './api'

export function useEducations(orgId) {
  return useAPI(`/jits/${orgId}`)
}

export function useEducation(id) {
  return useAPI(id ? `jit/${id}` : null)
}

export function createEducation(payload) {
  return api.post(`/jit`, payload)
}

export function updateEducation(id, payload) {
  return api.put(`/jit/${id}`, payload)
}
