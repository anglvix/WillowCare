import Doctor from '../models/Doctor.js'
import { getDoctorById, getDoctorReviews, createReview } from '../services/doctor-service.js'
import { getProfile, saveDoctor, unsaveDoctor } from '../services/user-service.js'
import { getSession, isLoggedIn } from '../services/auth-service.js'

const id = new URLSearchParams(location.search).get('id')
const session = getSession()
let currentDoctor = null
let isDoctorSaved = false

const reviewForm = document.querySelector('#review-form')
const reviewModal = document.querySelector('#review-modal')
const reviewsModal = document.querySelector('#reviews-modal')
const btnReviews = document.querySelector('#btn-reviews')
const btnPostReview = document.querySelector('#btn-post-review')

if (session?.role === 'doctor' && (session.approvalStatus || 'approved') === 'pending') {
  const alertBox = document.querySelector('#doctor-review-alert')
  if (alertBox) {
    alertBox.classList.remove('hidden')
  }
}

// StarsHtml.
function starsHtml(rating) {
  const value = Math.round(Math.max(0, Math.min(5, rating)))
  return '★'.repeat(value) + '☆'.repeat(5 - value)
}

// Update an existing doctorratingdisplay.
function updateDoctorRatingDisplay(average, count) {
  const starsEl = document.querySelector('#doctor-rating-stars')
  const valueEl = document.querySelector('#doctor-rating-value')
  const countEl = document.querySelector('#doctor-rating-count')

  if (starsEl) starsEl.textContent = starsHtml(average)
  if (valueEl) valueEl.textContent = count > 0 ? `${average.toFixed(1)} out of 5` : 'No rating yet'
  if (countEl) countEl.textContent = `${count} review${count === 1 ? '' : 's'}`
}

// OpenModal.
function openModal(modal) {
  if (!modal) return
  modal.classList.remove('hidden')
}

// CloseModal.
function closeModal(modal) {
  if (!modal) return
  modal.classList.add('hidden')
}

// Retrieve authorinitials from the API or state.
function getAuthorInitials(name) {
  if (!name) return 'AN'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join('')
}

// Render the reviewcard.
function renderReviewCard(review) {
  const photoAttr = review.authorPhoto
    ? `style="background-image: url('${review.authorPhoto}');"`
    : ''

  return `
    <div class="bg-willow-cream/30 p-5 rounded-2xl border border-willow-cream/30">
      <div class="flex justify-between items-start gap-3 mb-3">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-gray-200 bg-cover bg-center" ${photoAttr}></div>
          <div>
            <p class="text-sm font-bold text-willow-dark">${review.authorInitials || 'Anonymous'}</p>
            <p class="text-[11px] text-gray-500 mt-1">${review.createdAt}</p>
          </div>
        </div>
        <div class="text-willow-dark text-sm">${starsHtml(review.rating)}</div>
      </div>
      <div class="text-[13px] text-gray-700">
        ${review.title ? `<p class="font-semibold text-willow-dark mb-2">${review.title}</p>` : ''}
        <p>${review.text}</p>
      </div>
    </div>`
}

// Load data or initialize state for doctorreviews.
async function loadDoctorReviews(doctor) {
  if (!doctor) return

  const reviews = await getDoctorReviews(doctor.id, doctor.name)
  const reviewsList = document.querySelector('#reviews-list')

  if (reviewsList) {
    reviewsList.innerHTML = reviews.length
      ? reviews.map(renderReviewCard).join('')
      : '<p class="text-gray-500">No reviews for this doctor yet.</p>'
  }

  const average = reviews.length
    ? reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length
    : Number(doctor.rating || 0)

  updateDoctorRatingDisplay(average, reviews.length)
}

// Load data or initialize state for the page.
async function load() {
  if (!id) {
    document.querySelector('#doctor-profile')?.replaceWith(
      Object.assign(document.createElement('p'), { textContent: 'Médico não encontrado.', className: 'text-gray-400 text-sm' })
    )
    return
  }

  const data = await getDoctorById(id)
  if (!data) return

  const doctor = Doctor.fromObject(data)
  currentDoctor = doctor
  await updateSaveButtonState(Number(id))

  document.querySelector('#doctor-name')?.replaceWith(
    Object.assign(document.createElement('h1'), {
      id: 'doctor-name',
      className: 'text-xl font-serif font-bold text-willow-dark',
      textContent: doctor.name
    })
  )

  document.querySelector('#doctor-specialty')?.replaceWith(
    Object.assign(document.createElement('span'), {
      id: 'doctor-specialty',
      className: 'inline-block mt-3 text-[10px] bg-willow-light text-willow-dark px-3 py-1 rounded-full font-bold uppercase tracking-wide',
      textContent: doctor.specialty
    })
  )

  const bioEl = document.querySelector('#doctor-bio')
  if (bioEl) bioEl.textContent = doctor.bio

  const contactEl = document.querySelector('#doctor-contact')
  if (contactEl && doctor.contact) contactEl.textContent = doctor.contact

  const addressEl = document.querySelector('#doctor-address')
  if (addressEl && doctor.address) addressEl.textContent = doctor.address

  const highlightsEl = document.querySelector('#doctor-highlights')
  if (highlightsEl) {
    highlightsEl.innerHTML = doctor.highlights.length
      ? doctor.highlights.map(highlight => `<li>• ${highlight}</li>`).join('')
      : '<li class="text-gray-400">No highlights available.</li>'
  }

  if (doctor.photo) {
    const photoEl = document.querySelector('#doctor-photo')
    if (photoEl) photoEl.style.backgroundImage = `url('${doctor.photo}')`
  }

  await loadDoctorReviews(doctor)
}

// Update an existing savebuttonstate.
async function updateSaveButtonState(doctorId) {
  const button = document.querySelector('#btn-save-doctor-sidebar') || document.querySelector('#btn-save-doctor')
  if (!button) return

  if (!isLoggedIn()) {
    button.textContent = 'Save Doctor'
    button.disabled = false
    button.classList.remove('opacity-70', 'cursor-not-allowed')
    return
  }

  const sessionData = getSession()
  const profile = await getProfile(sessionData.id)
  const savedDoctors = Array.isArray(profile?.savedDoctors) ? profile.savedDoctors : []
  isDoctorSaved = savedDoctors.includes(doctorId)

  if (isDoctorSaved) {
    button.textContent = 'Unsave Doctor'
    button.disabled = false
    button.classList.remove('opacity-70', 'cursor-not-allowed')
  } else {
    button.textContent = 'Save Doctor'
    button.disabled = false
    button.classList.remove('opacity-70', 'cursor-not-allowed')
  }
}

// Handle reviewsubmit.
async function handleReviewSubmit(event) {
  event.preventDefault()
  if (!currentDoctor || !reviewForm) return

  const ratingEl = document.querySelector('#review-rating')
  const titleEl = document.querySelector('#review-title')
  const contentEl = document.querySelector('#review-content')
  const anonymousEl = document.querySelector('#review-anonymous')
  const errorEl = document.querySelector('#review-error')

  if (!ratingEl || !contentEl || !errorEl) return

  const rating = Number(ratingEl.value)
  const text = contentEl.value.trim()
  const title = titleEl?.value.trim() || ''
  const anonymous = anonymousEl?.checked || false

  if (!rating || !text) {
    errorEl.textContent = 'Please fill in all required fields.'
    errorEl.classList.remove('hidden')
    return
  }

  const user = getSession()
  if (!user) {
    window.location.href = 'login.php'
    return
  }

  const reviewPayload = {
    subjectId: currentDoctor.id,
    subjectName: currentDoctor.name,
    subjectType: 'doctor',
    subjectPhoto: currentDoctor.photo || '',
    authorPhoto: anonymous ? '' : user.avatar || '',
    rating,
    title,
    text,
    authorInitials: anonymous ? 'AN' : getAuthorInitials(user.name),
    createdAt: new Date().toISOString().split('T')[0]
  }

  const created = await createReview(reviewPayload)
  if (!created) {
    errorEl.textContent = 'Unable to post review. Please try again.'
    errorEl.classList.remove('hidden')
    return
  }

  errorEl.classList.add('hidden')
  reviewForm.reset()
  closeModal(reviewModal)
  await loadDoctorReviews(currentDoctor)
}

btnReviews?.addEventListener('click', () => openModal(reviewsModal))

btnPostReview?.addEventListener('click', () => {
  if (!isLoggedIn()) {
    window.location.href = 'login.php'
    return
  }
  openModal(reviewModal)
})

Array.from(document.querySelectorAll('#review-cancel, #review-cancel-secondary, #reviews-close, #reviews-close-secondary')).forEach(button => {
  button?.addEventListener('click', () => {
    closeModal(reviewModal)
    closeModal(reviewsModal)
  })
})

reviewForm?.addEventListener('submit', handleReviewSubmit)

const saveDoctorButton = document.querySelector('#btn-save-doctor-sidebar') || document.querySelector('#btn-save-doctor')
if (saveDoctorButton) {
  saveDoctorButton.addEventListener('click', async () => {
    if (!isLoggedIn()) {
      window.location.href = 'login.php'
      return
    }

    let result
    if (isDoctorSaved) {
      result = await unsaveDoctor(Number(id))
    } else {
      result = await saveDoctor(Number(id))
    }

    if (result.ok) {
      await updateSaveButtonState(Number(id))
    } else {
      console.error('Save doctor failed:', result.error)
    }
  })
}

load()
