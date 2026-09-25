import api from '@/services/api'

export const list = async (page = 1, order = 'id', search = null, amount = 10) => {
  const response = await api.get('/api/students', {
    params: { page, order, search: search || undefined, amount },
  })
  return response.data
}

export const find = async id => {
  const response = await api.get(`/api/students/${id}`)
  return response.data
}

export const options = async () => {
  const response = await api.get('/api/students/options')
  return response.data
}

export const create = async student => {
  const response = await api.post('/api/students', { student })
  return response.data
}

export const update = async (id, student) => {
  const response = await api.patch(`/api/students/${id}`, { student })
  return response.data
}

export const remove = async id => {
  const response = await api.delete(`/api/students/${id}`)
  return response.data
}
