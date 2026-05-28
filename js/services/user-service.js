import { getToken, getSession } from './auth-service.js'
import Voucher from '../models/Voucher.js'

const BASE = 'http://localhost:3001'

function authHeaders() {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  }
}

export async function getProfile(userId) {
  const res = await fetch(`${BASE}/users/${userId}`, { headers: authHeaders() })
  if (!res.ok) return null
  return res.json()
}

export async function getVouchers(userId) {
  const res = await fetch(`${BASE}/vouchers?userId=${userId}`, { headers: authHeaders() })
  if (!res.ok) return []
  return res.json()
}

export async function saveDoctor(doctorId) {
  const user = getSession()
  if (!user) return { ok: false }

  const profile = await getProfile(user.id)
  if (!profile) return { ok: false }
  if (profile.savedDoctors.includes(doctorId)) return { ok: true }

  const res = await fetch(`${BASE}/users/${user.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ savedDoctors: [...profile.savedDoctors, doctorId] })
  })

  if (res.ok) await unlockAchievement('saved_doctor')
  return { ok: res.ok }
}

export async function saveSchool(schoolId) {
  const user = getSession()
  if (!user) return { ok: false }

  const profile = await getProfile(user.id)
  if (!profile) return { ok: false }
  if (profile.savedSchools.includes(schoolId)) return { ok: true }

  const res = await fetch(`${BASE}/users/${user.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ savedSchools: [...profile.savedSchools, schoolId] })
  })

  return { ok: res.ok }
}

// Desbloqueia conquista se ainda não existir
export async function unlockAchievement(key) {
  const user = getSession()
  if (!user) return

  const profile = await getProfile(user.id)
  if (!profile || profile.achievements.includes(key)) return

  await fetch(`${BASE}/users/${user.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ achievements: [...profile.achievements, key] })
  })
}

export async function createVoucher({ activityId, activityType, activityTitle, date, location }) {
  const user = getSession()
  if (!user) return { ok: false }

  const voucher = new Voucher(user.id, activityId, activityType, activityTitle, date, location)

  const res = await fetch(`${BASE}/vouchers`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(voucher)
  })

  if (res.ok) await unlockAchievement('first_booking')
  return { ok: res.ok }
}
