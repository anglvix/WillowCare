import { isLoggedIn } from '../services/auth-service.js'
import { createVoucher } from '../services/user-service.js'
import { getExcursionById } from '../services/activity-service.js'
import Excursion from '../models/Excursion.js'

if (!isLoggedIn()) {
  window.location.href = 'login.php'
}

const form = document.querySelector('#booking-form')
const btn = document.querySelector('#book-btn')
const errorEl = document.querySelector('#booking-error')
const id = new URLSearchParams(window.location.search).get('id')

// FormatDate.
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

// Load data or initialize state for excursion.
async function loadExcursion() {
  if (!id) return
  const data = await getExcursionById(id)

  if (!data) return
  const excursion = Excursion.fromObject(data)

  document.querySelector('#excursion-title').textContent = excursion.title
  document.querySelector('#excursion-meta').textContent = ` ${excursion.location} | ${formatDate(excursion.date)}`
  document.querySelector('#excursion-description').textContent = excursion.description

  const imageEl = document.querySelector('#excursion-image')
  const imageSrc = excursion.image || data.image
  if (imageEl && imageSrc) {
    imageEl.src = imageSrc
    imageEl.alt = excursion.title || data.title || 'Activity image'
  }

  const hostEl = document.querySelector('#excursion-host')

  if (excursion.hostName && excursion.hostId) {
    const target = excursion.hostType === 'school' ? 'school_account.php' : 'organization_detail.php'
    hostEl.innerHTML = `Hosted by <a href="${target}?id=${excursion.hostId}" class="text-willow-mid underline">${excursion.hostName}</a>`
  } else {
    hostEl.textContent = 'Hosted by Willow Care'
  }
}

loadExcursion()

form?.addEventListener('submit', async (e) => {
  e.preventDefault()

  btn.disabled = true
  btn.textContent = 'A reservar...'
  if (errorEl) errorEl.classList.add('hidden')

  const data = await getExcursionById(id)
  if (!data) {
    btn.disabled = false
    btn.textContent = 'Book Ticket'
    return
  }

  const result = await createVoucher({
    activityId: data.id,
    activityType: 'excursion',
    activityTitle: data.title,
    date: data.date,
    location: data.location
  })

  if (!result.ok) {
    btn.disabled = false
    btn.textContent = 'Book Ticket'
    if (errorEl) errorEl.classList.remove('hidden')
    return
  }

  window.location.href = 'voucher_page.php'
})
