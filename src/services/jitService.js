import api, { useAPI } from './api'

export function useEducations(orgId) {
  return useAPI(`/jits/${orgId}`)
}

export function useEducation(id) {
  return useAPI(`jit/${id}`)
}

export function createEducation(payload) {
  return api.post(`/jit`, payload)
}

export function updateEducation(payload) {
  return api.put(`/jit`, payload)
}
