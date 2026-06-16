import { getSession, isLoggedIn, logout } from "../services/auth-service.js"
import { getProfile } from "../services/user-service.js"
import { getCoupons, getUserCoupons, redeemCoupon } from "../services/perks-service.js"

// Página protegida - requer login
if (!isLoggedIn()) {
  window.location.href = "login.php"
}

let session = getSession()

async function loadPerks() {
  const profile = await getProfile(session.id)
  if (!profile) return

  const coupons = await getCoupons()
  const userCoupons = await getUserCoupons(session.id)
  const starsEarned = profile.achievements ? profile.achievements.length : 0
  const starsSpent = profile.starsSpent || 0
  const starsAvailable = starsEarned - starsSpent

  const couponsGrid = document.querySelector("#coupons-grid")
  if (!couponsGrid) return

  const couponCards = coupons
    .map((coupon) => {
      const isRedeemed = userCoupons.some((c) => c.id === coupon.id)
      const canRedeem = !isRedeemed && starsAvailable >= coupon.starCost

      return `
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col items-between gap-4">
          <div>
            <h3 class="font-semibold text-lg text-willow-dark">${coupon.title}</h3>
            <p class="text-sm text-gray-600 mt-1">${coupon.description}</p>
            <div class="mt-3 text-willow-mid font-bold text-lg">${coupon.discount}</div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-willow-dark" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.595 0 9.748l8.332-1.73L12 .587z"/>
              </svg>
              <span class="font-bold text-willow-dark">${coupon.starCost}</span>
            </div>
            
            <button 
              class="redeem-coupon-btn px-4 py-2 rounded-lg font-semibold transition ${
                isRedeemed 
                  ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
                  : canRedeem 
                  ? 'bg-willow-dark text-white hover:bg-willow-mid' 
                  : 'bg-gray-200 text-gray-600 cursor-not-allowed'
              }"
              data-coupon-id="${coupon.id}"
              data-coupon-title="${coupon.title}"
              ${!canRedeem ? 'disabled' : ''}
            >
              ${isRedeemed ? 'Redeemed' : canRedeem ? 'Redeem' : 'Not enough stars'}
            </button>
          </div>
        </div>
      `
    })
    .join("")

  couponsGrid.innerHTML = `
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-serif font-bold text-willow-dark">Perks & Coupons</h2>
          <p class="text-sm text-gray-600 mt-2">Earned: <span class="font-bold text-willow-dark">${starsEarned}</span> | Spent: <span class="font-bold text-willow-mid">${starsSpent}</span></p>
        </div>
        <div class="flex items-center gap-2 bg-willow-dark text-willow-cream px-4 py-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.595 0 9.748l8.332-1.73L12 .587z"/>
          </svg>
          <span class="font-bold">${starsAvailable} Available</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${couponCards}
    </div>
  `

  // Add event listeners to redeem buttons
  document.querySelectorAll(".redeem-coupon-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault()
      const couponId = parseInt(btn.getAttribute("data-coupon-id"))
      const couponTitle = btn.getAttribute("data-coupon-title")
      
      // Show confirmation dialog
      const confirmed = confirm(`Are you sure you want to redeem "${couponTitle}"?`)
      if (!confirmed) return

      btn.disabled = true
      btn.textContent = "Redeeming..."

      const result = await redeemCoupon(couponId)
      if (result.ok) {
        btn.textContent = "Redeemed"
        btn.className = "redeem-coupon-btn px-4 py-2 rounded-lg font-semibold bg-gray-200 text-gray-600 cursor-not-allowed"
        // Reload the page to update stars
        setTimeout(() => location.reload(), 800)
      } else {
        btn.disabled = false
        btn.textContent = "Redeem"
        alert("Error: " + result.error)
      }
    })
  })
}

loadPerks()

// Logout
document.querySelector("#btn-logout")?.addEventListener("click", () => {
  logout()
  window.location.href = "index.php"
})
