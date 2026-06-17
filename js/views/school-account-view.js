import School from '../models/School.js'
import { getSchoolById, createReview, getSchoolReviews } from '../services/school-service.js'
import { getProfile, saveSchool, unsaveSchool } from '../services/user-service.js'
import { getSession, isLoggedIn } from '../services/auth-service.js'

const id = new URLSearchParams(window.location.search).get('id')
const session = getSession()
let currentSchool = null
let isSchoolSaved = false

if (!id) {
  window.location.href = 'school_search.php'
}

const nameEl = document.querySelector('#school-name')
const locationEl = document.querySelector('#school-location')
const descriptionEl = document.querySelector('#school-description')
const featuresEl = document.querySelector('#school-features')
const saveButton = document.querySelector('#btn-save-school')
const reviewForm = document.querySelector('#review-form')
const reviewModal = document.querySelector('#review-modal')
const reviewsModal = document.querySelector('#reviews-modal')
const btnReviews = document.querySelector('#btn-reviews')
const btnPostReview = document.querySelector('#btn-post-review')
const bannerEl = document.querySelector('#school-banner')

const featureLabels = {
  'special-ed-team': 'Special Ed. Team',
  'speech-therapy': 'Speech Therapy',
  'sensory-room': 'Sensory Room',
  'occupational-therapy': 'Occupational Therapy'
}

// Retrieve author initials from the JSON server.
function getAuthorInitials(name) {
  if (!name) return 'AN'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join('')
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

// Update an existing savebuttonstate.
async function updateSaveButtonState(schoolId) {
  if (!saveButton) return

  if (!isLoggedIn()) {
    saveButton.textContent = 'Save School'
    saveButton.disabled = false
    saveButton.classList.remove('opacity-70', 'cursor-not-allowed')
    return
  }

  const profile = await getProfile(session.id)
  const savedSchools = Array.isArray(profile?.savedSchools) ? profile.savedSchools.map(Number) : []
  const normalizedSchoolId = Number(schoolId)
  isSchoolSaved = savedSchools.includes(normalizedSchoolId)

  if (isSchoolSaved) {
    saveButton.textContent = 'Unsave School'
  } else {
    saveButton.textContent = 'Save School'
  }
  saveButton.disabled = false
  saveButton.classList.remove('opacity-70', 'cursor-not-allowed')
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
        <div class="text-willow-dark text-sm">${'★'.repeat(Math.round(Number(review.rating || 0))) + '☆'.repeat(5 - Math.round(Number(review.rating || 0)))}</div>
      </div>
      <div class="text-[13px] text-gray-700">
        ${review.title ? `<p class="font-semibold text-willow-dark mb-2">${review.title}</p>` : ''}
        <p>${review.text}</p>
      </div>
    </div>`
}

// Load data or initialize state for schoolreviews.
async function loadSchoolReviews(school) {
  if (!school) return

  const reviews = await getSchoolReviews(school.id, school.name)
  const reviewsList = document.querySelector('#reviews-list')

  if (reviewsList) {
    reviewsList.innerHTML = reviews.length
      ? reviews.map(renderReviewCard).join('')
      : '<p class="text-gray-500">No reviews for this school yet.</p>'
  }
}

// Load data or initialize state for the page.
async function load() {
  const data = await getSchoolById(id)
  if (!data) {
    nameEl.textContent = 'Escola não encontrada.'
    return
  }

  const school = School.fromObject(data)
  currentSchool = school

  nameEl.textContent = school.name
  locationEl.textContent = `${school.district} • ${school.location}`
  descriptionEl.textContent = school.description

  featuresEl.innerHTML = (school.supportFeatures || []).map((feature) => `
    <span class="inline-flex items-center justify-center bg-willow-cream text-willow-dark border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold uppercase shadow-sm">
      ${featureLabels[feature] || feature}
    </span>
  `).join('')

  const contactEl = document.querySelector('#school-contact')
  if (contactEl && school.contact) contactEl.textContent = school.contact

  const addressEl = document.querySelector('#school-address')
  if (addressEl && school.address) addressEl.textContent = school.address

  if (bannerEl) {
    bannerEl.style.backgroundImage = school.avatar
      ? `url('${school.avatar}')`
      : `url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80')`
  }

  await updateSaveButtonState(Number(id))
  await loadSchoolReviews(school)
}

saveButton?.addEventListener('click', async () => {
  if (!isLoggedIn()) {
    window.location.href = 'login.php'
    return
  }

  saveButton.disabled = true
  const previousText = saveButton.textContent

  let result
  if (isSchoolSaved) {
    saveButton.textContent = 'Unsaving...'
    result = await unsaveSchool(Number(id))
  } else {
    saveButton.textContent = 'Saving...'
    result = await saveSchool(Number(id))
  }

  if (result.ok) {
    await updateSaveButtonState(Number(id))
  } else {
    console.error('Save school failed:', result.error)
    saveButton.textContent = previousText
    saveButton.disabled = false
  }
})

btnReviews?.addEventListener('click', () => {
  openModal(reviewsModal)
})
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

reviewForm?.addEventListener('submit', async (event) => {
  event.preventDefault()
  if (!currentSchool) return

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

  const reviewPayload = {
    subjectId: currentSchool.id,
    subjectName: currentSchool.name,
    subjectType: 'school',
    subjectPhoto: '',
    authorPhoto: anonymous ? '' : session?.avatar || '',
    rating,
    title,
    text,
    authorInitials: anonymous ? 'AN' : getAuthorInitials(session?.name),
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
  await loadSchoolReviews(currentSchool)
})

load()
