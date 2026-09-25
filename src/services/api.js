import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const TOKEN_KEY = 'jwt'

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
})

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const setToken = token => {
  if (token) localStorage.setItem(TOKEN_KEY, token)
}

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

const extractToken = response => {
  const authorization = response.headers?.authorization
  if (!authorization) return null
  return authorization.replace(/^Bearer\s+/i, '').trim()
}

const normalizeError = error => {
  const response = error?.response
  const data = response?.data

  const messages = Array.isArray(data?.errors)
    ? data.errors
    : data?.error
      ? [data.error]
      : data?.message
        ? [data.message]
        : []

  return {
    status: response?.status ?? 0,
    messages,
    data,
    original: error,
  }
}

api.interceptors.request.use(config => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = token
  }

  return config
})

api.interceptors.response.use(
  response => {
    const token = extractToken(response)
    if (token) setToken(token)
    return response
  },
  error => {
    const normalized = normalizeError(error)

    if (normalized.status === 401) {
      clearToken()
      window.dispatchEvent(new CustomEvent('sigoe:unauthorized'))
    }

    return Promise.reject(normalized)
  }
)

export default api
