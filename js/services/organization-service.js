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

export async function createOrganization(org) {
  const res = await fetch(`${BASE}/organizations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...org,
      initials: org.initials || (org.name || '').slice(0, 3).toUpperCase(),
      services: org.services || [],
      ownerUserId: org.ownerUserId || null
    })
  })

  if (!res.ok) {
    throw new Error('Failed to create organization profile')
  }

  return res.json()
}

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
      ownerUserId: user.id
    })
  }

  return organization
}
