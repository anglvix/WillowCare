import { getToken, getSession } from './auth-service.js'

const BASE = 'http://localhost:3001'

// AuthHeaders.
function authHeaders() {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  }
}

// Retrieve workshops from the JSON server.
export async function getWorkshops() {
  const res = await fetch(`${BASE}/workshops`)
  if (!res.ok) return []
  return res.json()
}

// Retrieve excursions from the JSON server.
export async function getExcursions() {
  const res = await fetch(`${BASE}/excursions`)
  if (!res.ok) return []
  return res.json()
}

// Retrieve workshop by id from the JSON server.
export async function getWorkshopById(id) {
  const res = await fetch(`${BASE}/workshops/${id}`)
  if (!res.ok) return null
  return res.json()
}

// Retrieve excursion by id from the JSON server.
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

// Retrieve workshops by host from the JSON server.
export async function getWorkshopsByHost(hostType, hostId) {
  const res = await fetch(`${BASE}/workshops?hostType=${encodeURIComponent(hostType)}&hostId=${encodeURIComponent(hostId)}`)
  if (!res.ok) return []
  return res.json()
}

// Retrieve excursions by host from the JSON server.
export async function getExcursionsByHost(hostType, hostId) {
  const res = await fetch(`${BASE}/excursions?hostType=${encodeURIComponent(hostType)}&hostId=${encodeURIComponent(hostId)}`)
  if (!res.ok) return []
  return res.json()
}

// Create a new workshop.
export async function createWorkshop(workshop) {
  const res = await fetch(`${BASE}/workshops`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      ...workshop,
      enrolledUsers: [],
      image: workshop.image || '',
      hostName: workshop.hostName || '',
      hostType: workshop.hostType || '',
      hostId: workshop.hostId || null
    })
  })

  if (!res.ok) {
    throw new Error('Failed to create workshop')
  }

  return res.json()
}

// Create a new excursion.
export async function createExcursion(excursion) {
  const res = await fetch(`${BASE}/excursions`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      ...excursion,
      enrolledUsers: [],
      image: excursion.image || '',
      hostName: excursion.hostName || '',
      hostType: excursion.hostType || '',
      hostId: excursion.hostId || null
    })
  })

  if (!res.ok) {
    throw new Error('Failed to create excursion')
  }

  return res.json()
}
