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
    activityId: 'workshop-leitura-infantil',
    activityType: 'workshop',
    activityTitle: 'Leitura Infantil',
    date: '2026-05-14',
    location: 'Biblioteca Municipal da Maia'
  })

  if (!result.ok) {
    btn.disabled = false
    btn.textContent = 'Claim Free Seat'
    if (errorEl) errorEl.classList.remove('hidden')
    return
  }

  window.location.href = 'voucher_page.php'
})
