const BASE = 'http://localhost:3001'

// Retrieve organizations from the JSON server.
export async function getOrganizations() {
  const res = await fetch(`${BASE}/organizations`)
  if (!res.ok) return []
  return res.json()
}

// Retrieve organization by id from the JSON server.
export async function getOrganizationById(id) {
  const res = await fetch(`${BASE}/organizations/${id}`)
  if (!res.ok) return null
  return res.json()
}

// Update an existing organization.
export async function updateOrganization(orgId, patch) {
  const res = await fetch(`${BASE}/organizations/${orgId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch)
  })

  if (!res.ok) {
    throw new Error('Failed to update organization profile')
  }

  return res.json()
}

// Create a new organization.
export async function createOrganization(org) {
  const res = await fetch(`${BASE}/organizations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...org,
      initials: org.initials || (org.name || '').slice(0, 3).toUpperCase(),
      services: org.services || [],
      ownerUserId: org.ownerUserId || null,
      contactPhone: org.contactPhone || '',
      contactEmail: org.contactEmail || '',
      address: org.address || ''
    })
  })

  if (!res.ok) {
    throw new Error('Failed to create organization profile')
  }

  return res.json()
}

// Retrieve own organization from the JSON server.
export async function getOwnOrganization(user) {
  const res = await fetch(`${BASE}/organizations`)
  if (!res.ok) return null

  const organizations = await res.json()
  let organization = organizations.find((o) => o.ownerUserId === user.id)

  if (!organization) {
    organization = organizations.find((o) =>
      o.name?.trim().toLowerCase() === user.name?.trim().toLowerCase(),
    )
    if (organization) {
      organization = await updateOrganization(organization.id, { ownerUserId: user.id })
    }
  }

  if (!organization) {
    organization = await createOrganization({
      name: user.name,
      initials: user.name?.slice(0, 3).toUpperCase(),
      description: '',
      mission: '',
      services: [],
      ownerUserId: user.id,
      contactPhone: '',
      contactEmail: '',
      address: ''
    })
  }

  return organization
}

// Retrieve organization reviews from the JSON server.
export async function getOrganizationReviews(orgId, orgName = '') {
  const idRes = await fetch(`${BASE}/reviews?subjectId=${orgId}&subjectType=organization&_sort=createdAt&_order=desc`)
  if (idRes.ok) {
    const reviews = await idRes.json()
    if (reviews.length) return reviews
  }

  if (!orgName) return []
  const nameRes = await fetch(`${BASE}/reviews?subjectName=${encodeURIComponent(orgName)}&subjectType=organization&_sort=createdAt&_order=desc`)
  if (!nameRes.ok) return []
  return nameRes.json()
}

// Create a new review.
export async function createReview(review) {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  }
  
  const res = await fetch(`${BASE}/reviews`, {
    method: 'POST',
    headers,
    body: JSON.stringify(review)
  })

  if (!res.ok) return null
  return res.json()
}
