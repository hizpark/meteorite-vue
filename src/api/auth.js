// src/api/auth.js
import apiClient from '@/api/index'

export const login = (credentials) => {
  return apiClient.post('/login', credentials)
}

export const logout = () => {
  return apiClient.post('/logout')
}
