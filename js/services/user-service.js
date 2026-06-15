import { getToken, getSession, saveSessionData } from './auth-service.js'
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
  if (!user) return { ok: false, error: 'Not logged in' }

  const profile = await getProfile(user.id)
  if (!profile) return { ok: false, error: 'Unable to load profile' }

  const savedDoctors = Array.isArray(profile.savedDoctors) ? profile.savedDoctors : []
  if (savedDoctors.includes(doctorId)) {
    saveSessionData({ ...user, savedDoctors })
    return { ok: true }
  }

  const updatedSavedDoctors = Array.from(new Set([...savedDoctors, doctorId]))
  const res = await fetch(`${BASE}/users/${user.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ savedDoctors: updatedSavedDoctors })
  })

  if (!res.ok) {
    return { ok: false, error: 'Failed to save doctor' }
  }

  const updatedProfile = await res.json()
  saveSessionData({ ...user, savedDoctors: updatedProfile.savedDoctors ?? updatedSavedDoctors })
  await unlockAchievement('saved_doctor')

  return { ok: true }
}

export async function unsaveDoctor(doctorId) {
  const user = getSession()
  if (!user) return { ok: false, error: 'Not logged in' }

  const profile = await getProfile(user.id)
  if (!profile) return { ok: false, error: 'Unable to load profile' }

  const savedDoctors = Array.isArray(profile.savedDoctors) ? profile.savedDoctors : []
  if (!savedDoctors.includes(doctorId)) {
    saveSessionData({ ...user, savedDoctors })
    return { ok: true }
  }

  const updatedSavedDoctors = savedDoctors.filter(id => id !== doctorId)
  const res = await fetch(`${BASE}/users/${user.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ savedDoctors: updatedSavedDoctors })
  })

  if (!res.ok) {
    return { ok: false, error: 'Failed to unsave doctor' }
  }

  const updatedProfile = await res.json()
  saveSessionData({ ...user, savedDoctors: updatedProfile.savedDoctors ?? updatedSavedDoctors })
  return { ok: true }
}

export async function saveSchool(schoolId) {
  const user = getSession()
  if (!user) return { ok: false, error: 'Not logged in' }

  const profile = await getProfile(user.id)
  if (!profile) return { ok: false, error: 'Unable to load profile' }

  const savedSchools = Array.isArray(profile.savedSchools) ? profile.savedSchools : []
  if (savedSchools.includes(schoolId)) {
    saveSessionData({ ...user, savedSchools })
    return { ok: true }
  }

  const updatedSavedSchools = Array.from(new Set([...savedSchools, schoolId]))
  const res = await fetch(`${BASE}/users/${user.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ savedSchools: updatedSavedSchools })
  })

  if (!res.ok) {
    return { ok: false, error: 'Failed to save school' }
  }

  const updatedProfile = await res.json()
  saveSessionData({ ...user, savedSchools: updatedProfile.savedSchools ?? updatedSavedSchools })
  await unlockAchievement('saved_school')

  return { ok: true }
}

export async function unsaveSchool(schoolId) {
  const user = getSession()
  if (!user) return { ok: false, error: 'Not logged in' }

  const profile = await getProfile(user.id)
  if (!profile) return { ok: false, error: 'Unable to load profile' }

  const savedSchools = Array.isArray(profile.savedSchools) ? profile.savedSchools : []
  if (!savedSchools.includes(schoolId)) {
    saveSessionData({ ...user, savedSchools })
    return { ok: true }
  }

  const updatedSavedSchools = savedSchools.filter(id => id !== schoolId)
  const res = await fetch(`${BASE}/users/${user.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ savedSchools: updatedSavedSchools })
  })

  if (!res.ok) {
    return { ok: false, error: 'Failed to unsave school' }
  }

  const updatedProfile = await res.json()
  saveSessionData({ ...user, savedSchools: updatedProfile.savedSchools ?? updatedSavedSchools })
  return { ok: true }
}

export async function saveOrganization(orgId) {
  const user = getSession()
  if (!user) return { ok: false, error: 'Not logged in' }

  const profile = await getProfile(user.id)
  if (!profile) return { ok: false, error: 'Unable to load profile' }

  const savedOrganizations = Array.isArray(profile.savedOrganizations) ? profile.savedOrganizations : []
  if (savedOrganizations.includes(orgId)) {
    saveSessionData({ ...user, savedOrganizations })
    return { ok: true }
  }

  const updatedSavedOrganizations = Array.from(new Set([...savedOrganizations, orgId]))
  const res = await fetch(`${BASE}/users/${user.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ savedOrganizations: updatedSavedOrganizations })
  })

  if (!res.ok) {
    return { ok: false, error: 'Failed to save organization' }
  }

  const updatedProfile = await res.json()
  saveSessionData({ ...user, savedOrganizations: updatedProfile.savedOrganizations ?? updatedSavedOrganizations })
  await unlockAchievement('saved_organization')

  return { ok: true }
}

export async function unsaveOrganization(orgId) {
  const user = getSession()
  if (!user) return { ok: false, error: 'Not logged in' }

  const profile = await getProfile(user.id)
  if (!profile) return { ok: false, error: 'Unable to load profile' }

  const savedOrganizations = Array.isArray(profile.savedOrganizations) ? profile.savedOrganizations : []
  if (!savedOrganizations.includes(orgId)) {
    saveSessionData({ ...user, savedOrganizations })
    return { ok: true }
  }

  const updatedSavedOrganizations = savedOrganizations.filter(id => id !== orgId)
  const res = await fetch(`${BASE}/users/${user.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ savedOrganizations: updatedSavedOrganizations })
  })

  if (!res.ok) {
    return { ok: false, error: 'Failed to unsave organization' }
  }

  const updatedProfile = await res.json()
  saveSessionData({ ...user, savedOrganizations: updatedProfile.savedOrganizations ?? updatedSavedOrganizations })
  return { ok: true }
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

export async function updateProfile(userId, patch) {
  const res = await fetch(`${BASE}/users/${userId}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(patch)
  })

  if (!res.ok) {
    throw new Error('Failed to update profile')
  }

  return res.json()
}
