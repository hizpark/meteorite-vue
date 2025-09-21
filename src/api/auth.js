import request from '@/utils/request'

export const login = (credentials) => {
  return request.post('/login', credentials)
}

export const logout = () => {
  return request.post('/logout')
}
