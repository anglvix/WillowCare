const BASE = 'http://localhost:3001'

// Guarda sessão em localStorage após login/register
function saveSession(token, user) {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export function getToken() {
  return localStorage.getItem('token')
}

export function getSession() {
  const raw = localStorage.getItem('user')
  return raw ? JSON.parse(raw) : null
}

export function saveSessionData(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function isLoggedIn() {
  return !!getToken()
}

export function isAdmin() {
  const user = getSession()
  return user?.role === 'admin'
}

export function getRoleLabel(role) {
  const labels = {
    admin: 'Admin',
    doctor: 'Doctor',
    caregiver: 'Caregiver',
    school: 'School',
    organization: 'Organization'
  }

  return labels[role] || 'User'
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export async function register({ name, email, password, role = 'caregiver', specialty, certification, phone, address }) {
  const payload = {
    name,
    email,
    password,
    role,
    phone: phone || '',
    address: address || ''
  }

  if (role === 'doctor') {
    payload.specialty = specialty || ''
    if (certification) payload.certification = certification
    payload.approvalStatus = 'pending'
    payload.savedDoctors = []
    payload.savedSchools = []
    payload.savedOrganizations = []
    payload.achievements = ['registered']
  } else {
    payload.savedDoctors = []
    payload.savedSchools = []
    payload.savedOrganizations = []
    payload.achievements = ['registered']
  }

  const res = await fetch(`${BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    const err = await res.json()
    return { ok: false, error: err }
  }

  const data = await res.json()
  saveSession(data.accessToken, data.user)
  return { ok: true, user: data.user }
}

export async function login({ email, password }) {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    return { ok: false, error: 'Email or password is incorrect. Please try again.' }
  }

  const data = await res.json()
  saveSession(data.accessToken, data.user)
  return { ok: true, user: data.user }
}

export async function loginDoctor({ email, password }) {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    return { ok: false, error: 'Email or password is incorrect. Please try again.' }
  }

  const data = await res.json()
  if (data.user.role !== 'doctor') {
    return { ok: false, error: 'This area is only for doctors. Please use the regular login or create a doctor account.' }
  }

  if ((data.user.approvalStatus || 'approved') === 'pending') {
    return { ok: false, error: 'Your doctor account is still under admin review. Please wait for approval before logging in.' }
  }

  saveSession(data.accessToken, data.user)
  return { ok: true, user: data.user }
}
