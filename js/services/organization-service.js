const BASE = 'http://localhost:3001'

export async function getOrganizations() {
  const res = await fetch(`${BASE}/organizations`)
  if (!res.ok) return []
  return res.json()
}

export async function getOrganizationById(id) {
  const res = await fetch(`${BASE}/organizations/${id}`)
  if (!res.ok) return null
  return res.json()
}
