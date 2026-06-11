import { getToken } from './auth-service.js'

const BASE = 'http://localhost:3001'

function authHeaders() {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  }
}

export async function getDoctors() {
  const res = await fetch(`${BASE}/doctors`)
  if (!res.ok) return []
  return res.json()
}

export async function getDoctorById(id) {
  const res = await fetch(`${BASE}/doctors/${id}`)
  if (!res.ok) return null
  return res.json()
}

// specialty filtrado no servidor (exact match); region filtrado client-side (case-insensitive)
export async function searchDoctors({ specialty, region } = {}) {
  const params = new URLSearchParams()
  if (specialty) params.set('specialty', specialty)
  const res = await fetch(`${BASE}/doctors?${params}`)
  if (!res.ok) return []
  const data = await res.json()
  if (!region) return data
  const q = region.toLowerCase()
  return data.filter(d => d.region.toLowerCase().includes(q))
}

export async function getLatestReviews(limit = 2) {
  const res = await fetch(`${BASE}/reviews?_sort=createdAt&_order=desc&_limit=${limit}`)
  if (!res.ok) return []
  return res.json()
}
