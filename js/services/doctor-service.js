import { getToken } from './auth-service.js'

const BASE = 'http://localhost:3001'

// AuthHeaders.
function authHeaders() {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  }
}

// Retrieve doctors from the JSON server.
export async function getDoctors() {
  const res = await fetch(`${BASE}/doctors`)
  if (!res.ok) return []
  return res.json()
}

// Retrieve doctor by id from the JSON server.
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

// Retrieve latestreviews from the API or state.
export async function getLatestReviews(limit = 2) {
  const res = await fetch(`${BASE}/reviews?_sort=createdAt&_order=desc&_limit=${limit}`)
  if (!res.ok) return []
  return res.json()
}

// Retrieve doctor reviews from the JSON server.
export async function getDoctorReviews(doctorId, doctorName = '') {
  const idRes = await fetch(`${BASE}/reviews?subjectId=${doctorId}&subjectType=doctor&_sort=createdAt&_order=desc`)
  if (idRes.ok) {
    const reviews = await idRes.json()
    if (reviews.length) return reviews
  }

  if (!doctorName) return []
  const nameRes = await fetch(`${BASE}/reviews?subjectName=${encodeURIComponent(doctorName)}&subjectType=doctor&_sort=createdAt&_order=desc`)
  if (!nameRes.ok) return []
  return nameRes.json()
}

// Create a new review.
export async function createReview(review) {
  const res = await fetch(`${BASE}/reviews`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(review)
  })

  if (!res.ok) return null
  return res.json()
}

// Retrieve own doctor from the JSON server.
export async function getOwnDoctor(user) {
  const res = await fetch(`${BASE}/doctors`)
  if (!res.ok) return null

  const doctors = await res.json()
  let doctor = doctors.find((d) => d.userId === user.id)

  if (!doctor) {
    doctor = doctors.find((d) =>
      d.name?.trim().toLowerCase() === user.name?.trim().toLowerCase(),
    )
    if (doctor) {
      doctor = await updateDoctor(doctor.id, { userId: user.id })
    }
  }

  if (!doctor) {
    doctor = await createDoctor({
      name: user.name,
      email: user.email,
      specialty: user.specialty || '',
      bio: '',
      region: user.address || '',
      yearsExperience: 0,
      userId: user.id,
      photo: '',
      contactPhone: user.phone || '',
      contactEmail: user.email,
      address: user.address || '',
      highlights: []
    })
  }

  return doctor
}

// Update an existing doctor.
export async function updateDoctor(doctorId, patch) {
  const res = await fetch(`${BASE}/doctors/${doctorId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch)
  })

  if (!res.ok) {
    throw new Error('Failed to update doctor profile')
  }

  return res.json()
}

// Create a new doctor.
export async function createDoctor(doctor) {
  const res = await fetch(`${BASE}/doctors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...doctor,
      photo: doctor.photo || '',
      contactPhone: doctor.contactPhone || '',
      contactEmail: doctor.contactEmail || '',
      address: doctor.address || '',
      highlights: doctor.highlights || [],
      rating: 0,
      userId: doctor.userId || null
    })
  })

  if (!res.ok) {
    throw new Error('Failed to create doctor profile')
  }

  return res.json()
}
