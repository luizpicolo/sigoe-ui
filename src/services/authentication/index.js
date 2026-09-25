import api, { clearToken, setToken } from '@/services/api'

export const login = async (username, password) => {
  const response = await api.post('/api/auth/login', {
    user: { username, password },
  })

  const authorization = response.headers?.authorization
  if (authorization) {
    setToken(authorization.replace(/^Bearer\s+/i, '').trim())
  }

  return response.data
}

export const isTokenValid = async () => {
  if (!localStorage.getItem('jwt')) return false

  try {
    await api.get('/api/users/validation')
    return true
  } catch {
    clearToken()
    return false
  }
}

export const logout = async () => {
  try {
    await api.delete('/api/auth/logout')
  } finally {
    clearToken()
  }

  return true
}
