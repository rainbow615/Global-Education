import axios from 'axios'

import api, { useAPI } from './api'

export function useProtocols(orgId) {
  return useAPI(orgId ? `/protocols/${orgId}` : null)
}

export function useProtocol(id) {
  return useAPI(id ? `protocol/${id}` : null)
}

export function createProtocol(payload) {
  return api.post(`/protocols`, payload)
}

export function updateProtocol(id, payload) {
  return api.put(`/protocols/${id}`, payload)
}

export function updateAllProtocols(requests) {
  return axios.all(requests)
}

export function deleteProtocol(id) {
  return api.delete(`/protocols/${id}`)
}
