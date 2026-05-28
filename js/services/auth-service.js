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

export function isLoggedIn() {
  return !!getToken()
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export async function register({ name, email, password }) {
  const res = await fetch(`${BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role: 'caregiver', savedDoctors: [], savedSchools: [], achievements: ['registered'] })
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
    return { ok: false, error: 'Credenciais inválidas' }
  }

  const data = await res.json()
  saveSession(data.accessToken, data.user)
  return { ok: true, user: data.user }
}
