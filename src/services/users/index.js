import api from '@/services/api'

export const list = async (page = 1, order = 'id', search = null) => {
  const response = await api.get('/api/users', {
    params: { page, order, search: search || undefined },
  })
  return response.data
}

export const find = async id => {
  const response = await api.get(`/api/users/${id}`)
  return response.data
}

export const options = async () => {
  const response = await api.get('/api/users/options')
  return response.data
}

export const create = async user => {
  const formData = new FormData()

  Object.entries(user).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(`user[${key}]`, value)
    }
  })

  const response = await api.post('/api/users', formData)
  return response.data
}

export const update = async (id, user) => {
  const response = await api.put(`/api/users/${id}`, { user })
  return response.data
}

export const changePassword = async (current_password, new_password, password_confirmation) => {
  const response = await api.put('/api/users/change_password', {
    current_password,
    new_password,
    password_confirmation,
  })
  return response.data
}

export const remove = async id => {
  const response = await api.delete(`/api/users/${id}`)
  return response.data
}
