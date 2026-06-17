import { getToken, getSession, saveSessionData } from './auth-service.js'
import Voucher from '../models/Voucher.js'

const BASE = 'http://localhost:3001'

// AuthHeaders.
function authHeaders() {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  }
}

// Retrieve profile from the API or state.
export async function getProfile(userId) {
  const res = await fetch(`${BASE}/users/${userId}`, { headers: authHeaders() })
  if (!res.ok) return null
  return res.json()
}

// Retrieve vouchers from the API or state.
export async function getVouchers(userId) {
  const res = await fetch(`${BASE}/vouchers?userId=${userId}`, { headers: authHeaders() })
  if (!res.ok) return []
  return res.json()
}

// SaveDoctor.
export async function saveDoctor(doctorId) {
  const user = getSession()
  if (!user) return { ok: false, error: 'Not logged in' }

  const profile = await getProfile(user.id)
  if (!profile) return { ok: false, error: 'Unable to load profile' }

  const savedDoctors = Array.isArray(profile.savedDoctors) ? profile.savedDoctors.map(Number) : []
  const normalizedDoctorId = Number(doctorId)
  if (savedDoctors.includes(normalizedDoctorId)) {
    saveSessionData({ ...user, savedDoctors })
    return { ok: true }
  }

  const updatedSavedDoctors = Array.from(new Set([...savedDoctors, normalizedDoctorId]))
  const res = await fetch(`${BASE}/users/${user.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ savedDoctors: updatedSavedDoctors })
  })

  if (!res.ok) {
    return { ok: false, error: 'Failed to save doctor' }
  }

  const updatedProfile = await res.json()
  saveSessionData({ ...user, savedDoctors: Array.isArray(updatedProfile.savedDoctors) ? updatedProfile.savedDoctors.map(Number) : updatedSavedDoctors })
  await unlockAchievement('saved_doctor')

  return { ok: true }
}

// UnsaveDoctor.
export async function unsaveDoctor(doctorId) {
  const user = getSession()
  if (!user) return { ok: false, error: 'Not logged in' }

  const profile = await getProfile(user.id)
  if (!profile) return { ok: false, error: 'Unable to load profile' }

  const savedDoctors = Array.isArray(profile.savedDoctors) ? profile.savedDoctors.map(Number) : []
  const normalizedDoctorId = Number(doctorId)
  if (!savedDoctors.includes(normalizedDoctorId)) {
    saveSessionData({ ...user, savedDoctors })
    return { ok: true }
  }

  const updatedSavedDoctors = savedDoctors.filter(id => id !== normalizedDoctorId)
  const res = await fetch(`${BASE}/users/${user.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ savedDoctors: updatedSavedDoctors })
  })

  if (!res.ok) {
    return { ok: false, error: 'Failed to unsave doctor' }
  }

  const updatedProfile = await res.json()
  saveSessionData({ ...user, savedDoctors: Array.isArray(updatedProfile.savedDoctors) ? updatedProfile.savedDoctors.map(Number) : updatedSavedDoctors })
  return { ok: true }
}

// SaveSchool.
export async function saveSchool(schoolId) {
  const user = getSession()
  if (!user) return { ok: false, error: 'Not logged in' }

  const profile = await getProfile(user.id)
  if (!profile) return { ok: false, error: 'Unable to load profile' }

  const savedSchools = Array.isArray(profile.savedSchools) ? profile.savedSchools.map(Number) : []
  const normalizedSchoolId = Number(schoolId)
  if (savedSchools.includes(normalizedSchoolId)) {
    saveSessionData({ ...user, savedSchools })
    return { ok: true }
  }

  const updatedSavedSchools = Array.from(new Set([...savedSchools, normalizedSchoolId]))
  const res = await fetch(`${BASE}/users/${user.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ savedSchools: updatedSavedSchools })
  })

  if (!res.ok) {
    return { ok: false, error: 'Failed to save school' }
  }

  const updatedProfile = await res.json()
  saveSessionData({ ...user, savedSchools: Array.isArray(updatedProfile.savedSchools) ? updatedProfile.savedSchools.map(Number) : updatedSavedSchools })
  await unlockAchievement('saved_school')

  return { ok: true }
}

// UnsaveSchool.
export async function unsaveSchool(schoolId) {
  const user = getSession()
  if (!user) return { ok: false, error: 'Not logged in' }

  const profile = await getProfile(user.id)
  if (!profile) return { ok: false, error: 'Unable to load profile' }

  const savedSchools = Array.isArray(profile.savedSchools) ? profile.savedSchools.map(Number) : []
  const normalizedSchoolId = Number(schoolId)
  if (!savedSchools.includes(normalizedSchoolId)) {
    saveSessionData({ ...user, savedSchools })
    return { ok: true }
  }

  const updatedSavedSchools = savedSchools.filter(id => id !== normalizedSchoolId)
  const res = await fetch(`${BASE}/users/${user.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ savedSchools: updatedSavedSchools })
  })

  if (!res.ok) {
    return { ok: false, error: 'Failed to unsave school' }
  }

  const updatedProfile = await res.json()
  saveSessionData({ ...user, savedSchools: Array.isArray(updatedProfile.savedSchools) ? updatedProfile.savedSchools.map(Number) : updatedSavedSchools })
  return { ok: true }
}

// SaveOrganization.
export async function saveOrganization(orgId) {
  const user = getSession()
  if (!user) return { ok: false, error: 'Not logged in' }

  const profile = await getProfile(user.id)
  if (!profile) return { ok: false, error: 'Unable to load profile' }

  const savedOrganizations = Array.isArray(profile.savedOrganizations) ? profile.savedOrganizations.map(Number) : []
  const normalizedOrgId = Number(orgId)
  if (savedOrganizations.includes(normalizedOrgId)) {
    saveSessionData({ ...user, savedOrganizations })
    return { ok: true }
  }

  const updatedSavedOrganizations = Array.from(new Set([...savedOrganizations, normalizedOrgId]))
  const res = await fetch(`${BASE}/users/${user.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ savedOrganizations: updatedSavedOrganizations })
  })

  if (!res.ok) {
    return { ok: false, error: 'Failed to save organization' }
  }

  const updatedProfile = await res.json()
  saveSessionData({ ...user, savedOrganizations: Array.isArray(updatedProfile.savedOrganizations) ? updatedProfile.savedOrganizations.map(Number) : updatedSavedOrganizations })
  await unlockAchievement('saved_organization')

  return { ok: true }
}

// UnsaveOrganization.
export async function unsaveOrganization(orgId) {
  const user = getSession()
  if (!user) return { ok: false, error: 'Not logged in' }

  const profile = await getProfile(user.id)
  if (!profile) return { ok: false, error: 'Unable to load profile' }

  const savedOrganizations = Array.isArray(profile.savedOrganizations) ? profile.savedOrganizations.map(Number) : []
  const normalizedOrgId = Number(orgId)
  if (!savedOrganizations.includes(normalizedOrgId)) {
    saveSessionData({ ...user, savedOrganizations })
    return { ok: true }
  }

  const updatedSavedOrganizations = savedOrganizations.filter(id => id !== normalizedOrgId)
  const res = await fetch(`${BASE}/users/${user.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ savedOrganizations: updatedSavedOrganizations })
  })

  if (!res.ok) {
    return { ok: false, error: 'Failed to unsave organization' }
  }

  const updatedProfile = await res.json()
  saveSessionData({ ...user, savedOrganizations: Array.isArray(updatedProfile.savedOrganizations) ? updatedProfile.savedOrganizations.map(Number) : updatedSavedOrganizations })
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

// Create a new voucher.
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

// Update an existing profile.
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
