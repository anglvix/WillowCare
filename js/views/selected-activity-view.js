import { isLoggedIn } from '../services/auth-service.js'
import { createVoucher } from '../services/user-service.js'

if (!isLoggedIn()) {
  window.location.href = 'login.php'
}

const form = document.querySelector('#booking-form')
const btn = document.querySelector('#book-btn')
const errorEl = document.querySelector('#booking-error')

form?.addEventListener('submit', async (e) => {
  e.preventDefault()

  btn.disabled = true
  btn.textContent = 'A reservar...'
  if (errorEl) errorEl.classList.add('hidden')

  const result = await createVoucher({
    activityId: 'excursion-valongo',
    activityType: 'excursion',
    activityTitle: 'Passeio em Valongo',
    date: '2026-05-14',
    location: 'Valongo Nature Trails, Porto'
  })

  if (!result.ok) {
    btn.disabled = false
    btn.textContent = 'Book Ticket'
    if (errorEl) errorEl.classList.remove('hidden')
    return
  }

  window.location.href = 'voucher_page.php'
})
