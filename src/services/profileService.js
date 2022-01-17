import api, { useAPI } from './api'

// Get my profile
export function useProfile() {
  return useAPI(`/me`)
}

// Update a user record
export function updateProfile(profile) {
  return api.patch(`/me`, profile)
}
