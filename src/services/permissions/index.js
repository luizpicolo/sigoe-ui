import api from '@/services/api'

export const current = async () => {
  const response = await api.get('/api/permissions/current')
  return response.data
}

export const find = async userId => {
  const response = await api.get(`/api/users/${userId}/permissions`)
  return response.data
}

export const update = async (userId, permissions) => {
  const response = await api.put(`/api/users/${userId}/permissions`, { permissions })
  return response.data
}

export const can = (permissionPayload, entity, action = 'can_read') => {
  if (!permissionPayload) return false
  if (permissionPayload.admin || permissionPayload.super_admin) return true

  return permissionPayload.permissions?.[entity]?.[action] === true
}
