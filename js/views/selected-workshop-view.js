import { isLoggedIn } from '../services/auth-service.js'
import { createVoucher } from '../services/user-service.js'
import { getWorkshopById } from '../services/activity-service.js'
import Workshop from '../models/Workshop.js'

if (!isLoggedIn()) {
  window.location.href = 'login.php'
}

const form = document.querySelector('#booking-form')
const btn = document.querySelector('#book-btn')
const errorEl = document.querySelector('#booking-error')

const id = new URLSearchParams(window.location.search).get('id')

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

async function loadWorkshop() {
  if (!id) return

  const data = await getWorkshopById(id)
  if (!data) return

  console.log('RAW DB DATA:', data) // debug

  const workshop = Workshop.fromObject(data)

  console.log('WORKSHOP OBJECT:', workshop) // debug

  // TITLE
  document.querySelector('#workshop-title').textContent =
    workshop.title || data.title

  // META
  document.querySelector('#workshop-meta').textContent =
    ` ${workshop.location || data.location} | ${formatDate(workshop.date || data.date)}`

  // DESCRIPTION
  document.querySelector('#workshop-description').textContent =
    workshop.description || data.description

  // IMAGE (FIX DEFINITIVO)
  const imageEl = document.querySelector('#workshop-image')

  const imageSrc = workshop.image || data.image

  if (imageEl && imageSrc) {
    imageEl.src = imageSrc
    imageEl.alt = workshop.title || data.title
  }

  // HOST
  const hostEl = document.querySelector('#workshop-host')

  if (workshop.hostName && workshop.hostId) {
    const target =
      workshop.hostType === 'school'
        ? 'school_account.php'
        : 'organization_account.php'

    hostEl.innerHTML =
      `Hosted by <a href="${target}?id=${workshop.hostId}" class="text-willow-mid underline">${workshop.hostName}</a>`
  } else {
    hostEl.textContent = 'Hosted by Willow Care'
  }
}

loadWorkshop()

form?.addEventListener('submit', async (e) => {
  e.preventDefault()

  btn.disabled = true
  btn.textContent = 'A reservar...'

  if (errorEl) errorEl.classList.add('hidden')

  const data = await getWorkshopById(id)

  if (!data) {
    btn.disabled = false
    btn.textContent = 'Claim Free Seat'
    return
  }

  const result = await createVoucher({
    activityId: data.id,
    activityType: 'workshop',
    activityTitle: data.title,
    date: data.date,
    location: data.location
  })

  if (!result.ok) {
    btn.disabled = false
    btn.textContent = 'Claim Free Seat'
    if (errorEl) errorEl.classList.remove('hidden')
    return
  }

  window.location.href = 'voucher_page.php'
})