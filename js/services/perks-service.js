import { getToken, getSession, saveSessionData } from './auth-service.js'

const BASE = 'http://localhost:3001'

// AuthHeaders.
function authHeaders() {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  }
}

// Get all available coupons
export async function getCoupons() {
  const res = await fetch(`${BASE}/coupons`, { headers: authHeaders() })
  if (!res.ok) return []
  return res.json()
}

// Get user's redeemed coupons
export async function getUserCoupons(userId) {
  const res = await fetch(`${BASE}/users/${userId}`, { headers: authHeaders() })
  if (!res.ok) return []
  const user = await res.json()
  return user.redeemedCoupons || []
}

// Redeem a coupon (user spends stars)
export async function redeemCoupon(couponId) {
  const user = getSession()
  if (!user) return { ok: false, error: 'Not logged in' }

  // Fetch the coupon and user profile
  const coupon = await fetch(`${BASE}/coupons/${couponId}`, { headers: authHeaders() })
    .then(res => res.ok ? res.json() : null)
  
  if (!coupon) return { ok: false, error: 'Coupon not found' }

  const profileRes = await fetch(`${BASE}/users/${user.id}`, { headers: authHeaders() })
  if (!profileRes.ok) return { ok: false, error: 'Unable to load profile' }
  const profile = await profileRes.json()

  // Calculate stars earned and spent
  const starsEarned = profile.achievements ? profile.achievements.length : 0
  const starsSpent = profile.starsSpent || 0
  const starsAvailable = starsEarned - starsSpent

  // Check if user has enough stars
  if (starsAvailable < coupon.starCost) {
    return { ok: false, error: 'Not enough stars' }
  }

  // Add coupon to redeemed coupons
  const redeemedCoupons = profile.redeemedCoupons || []
  if (redeemedCoupons.find(c => c.id === couponId)) {
    return { ok: false, error: 'Coupon already redeemed' }
  }

  const updatedCoupons = [...redeemedCoupons, coupon]
  const updatedStarsSpent = starsSpent + coupon.starCost

  // Update user with redeemed coupon and spent stars
  const updateRes = await fetch(`${BASE}/users/${user.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ redeemedCoupons: updatedCoupons, starsSpent: updatedStarsSpent })
  })

  if (!updateRes.ok) {
    return { ok: false, error: 'Failed to redeem coupon' }
  }

  const updatedProfile = await updateRes.json()
  saveSessionData({ ...user, redeemedCoupons: updatedProfile.redeemedCoupons, starsSpent: updatedProfile.starsSpent })

  return { ok: true, coupon }
}
