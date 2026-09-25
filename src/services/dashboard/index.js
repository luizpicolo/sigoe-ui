import api from '@/services/api'

export const get = async () => {
  const response = await api.get('/api/dashboard')
  return response.data
}
