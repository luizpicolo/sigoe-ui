import api from '@/services/api'

export const list = async (page = 1, order = 'id', search = null, amount = 10) => {
  const response = await api.get('/api/incidents', {
    params: { page, order, search: search || undefined, amount },
  })
  return response.data
}

export const options = async () => {
  const response = await api.get('/api/incidents/options')
  return response.data
}

export const find = async id => {
  const response = await api.get(`/api/incidents/${id}`)
  return response.data
}

export const create = async incident => {
  const response = await api.post('/api/incidents', { incident })
  return response.data
}

export const update = async (id, incident) => {
  const response = await api.put(`/api/incidents/${id}`, { incident })
  return response.data
}

export const remove = async id => {
  const response = await api.delete(`/api/incidents/${id}`)
  return response.data
}
