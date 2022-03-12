import api, { useAPI } from './api'

export function useCategories(orgId) {
  return useAPI(orgId ? `/categories/${orgId}` : null)
}

export function createCategory(payload) {
  return api.post(`/categories`, payload)
}

export function updateCategory(id, payload) {
  return api.put(`/categories/${id}`, payload)
}

export function deleteCategory(id) {
  return api.delete(`/categories/${id}`)
}
