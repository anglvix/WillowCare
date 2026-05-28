import { getToken, getSession } from './auth-service.js'

const BASE = 'http://localhost:3001'

function authHeaders() {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  }
}

export async function getWorkshops() {
  const res = await fetch(`${BASE}/workshops`)
  if (!res.ok) return []
  return res.json()
}

export async function getExcursions() {
  const res = await fetch(`${BASE}/excursions`)
  if (!res.ok) return []
  return res.json()
}

export async function getWorkshopById(id) {
  const res = await fetch(`${BASE}/workshops/${id}`)
  if (!res.ok) return null
  return res.json()
}

export async function getExcursionById(id) {
  const res = await fetch(`${BASE}/excursions/${id}`)
  if (!res.ok) return null
  return res.json()
}

// Inscreve o utilizador actual na actividade (adiciona userId ao enrolledUsers)
export async function enroll(activityType, activityId) {
  const user = getSession()
  if (!user) return { ok: false, error: 'Não autenticado' }

  const endpoint = activityType === 'workshop' ? 'workshops' : 'excursions'
  const res = await fetch(`${BASE}/${endpoint}/${activityId}`)
  if (!res.ok) return { ok: false }

  const activity = await res.json()
  if (activity.enrolledUsers.includes(user.id)) {
    return { ok: false, error: 'Já inscrito' }
  }

  const updated = await fetch(`${BASE}/${endpoint}/${activityId}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ enrolledUsers: [...activity.enrolledUsers, user.id] })
  })

  return { ok: updated.ok }
}
