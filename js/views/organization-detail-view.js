import Organization from '../models/Organization.js'
import { getOrganizationById, createReview, getOrganizationReviews } from '../services/organization-service.js'
import { getProfile, saveOrganization, unsaveOrganization } from '../services/user-service.js'
import { getSession, isLoggedIn } from '../services/auth-service.js'

const id = new URLSearchParams(window.location.search).get('id')
const session = getSession()
let currentOrganization = null
let isOrgSaved = false

if (!id) {
  window.location.href = 'organizations.php'
}

const initialsEl = document.querySelector('#org-initials')
const nameEl = document.querySelector('#org-name')
const descriptionEl = document.querySelector('#org-description')
const missionEl = document.querySelector('#org-mission')
const servicesEl = document.querySelector('#org-services')
const saveButton = document.querySelector('#btn-save-org')
const reviewForm = document.querySelector('#review-form')
const reviewModal = document.querySelector('#review-modal')
const reviewsModal = document.querySelector('#reviews-modal')
const btnReviews = document.querySelector('#btn-reviews')
const btnPostReview = document.querySelector('#btn-post-review')

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
async function updateSaveButtonState(organizationId) {
  if (!saveButton) return

  if (!isLoggedIn()) {
    saveButton.textContent = 'Save Organization'
    saveButton.disabled = false
    saveButton.classList.remove('opacity-70', 'cursor-not-allowed')
    return
  }

  const profile = await getProfile(session.id)
  const savedOrganizations = Array.isArray(profile?.savedOrganizations) ? profile.savedOrganizations.map(Number) : []
  const normalizedOrganizationId = Number(organizationId)
  isOrgSaved = savedOrganizations.includes(normalizedOrganizationId)

  if (isOrgSaved) {
    saveButton.textContent = 'Unsave Organization'
  } else {
    saveButton.textContent = 'Save Organization'
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

// Load data or initialize state for organizationreviews.
async function loadOrganizationReviews(org) {
  if (!org) return

  const reviews = await getOrganizationReviews(org.id, org.name)
  const reviewsList = document.querySelector('#reviews-list')

  if (reviewsList) {
    reviewsList.innerHTML = reviews.length
      ? reviews.map(renderReviewCard).join('')
      : '<p class="text-gray-500">No reviews for this organization yet.</p>'
  }
}

// Load data or initialize state for the page.
async function load() {
  const data = await getOrganizationById(id)
  if (!data) {
    nameEl.textContent = 'Organização não encontrada.'
    return
  }

  const org = Organization.fromObject(data)
  currentOrganization = org

  document.title = `Willow Care - ${org.name}`
  initialsEl.textContent = org.initials
  nameEl.textContent = org.name
  descriptionEl.textContent = org.description
  missionEl.textContent = org.mission

  if (org.services.length) {
    servicesEl.innerHTML = org.services.map(s => `
      <span class="bg-willow-cream/40 border border-willow-cream text-willow-dark text-xs font-semibold px-4 py-2 rounded-full">
        ${s}
      </span>
    `).join('')
  }

  const contactEl = document.querySelector('#org-contact')
  if (contactEl && org.contact) contactEl.textContent = org.contact

  const addressEl = document.querySelector('#org-address')
  if (addressEl && org.address) addressEl.textContent = org.address

  await updateSaveButtonState(Number(id))
  await loadOrganizationReviews(org)
}

saveButton?.addEventListener('click', async () => {
  console.log('Organization save button clicked, isOrgSaved=', isOrgSaved, 'id=', id)
  if (!isLoggedIn()) {
    window.location.href = 'login.php'
    return
  }

  saveButton.disabled = true
  const previousText = saveButton.textContent

  let result
  if (isOrgSaved) {
    saveButton.textContent = 'Unsaving...'
    result = await unsaveOrganization(Number(id))
  } else {
    saveButton.textContent = 'Saving...'
    result = await saveOrganization(Number(id))
  }

  if (result.ok) {
    await updateSaveButtonState(Number(id))
  } else {
    console.error('Save organization failed:', result.error)
    saveButton.textContent = previousText
    saveButton.disabled = false
  }
})

btnReviews?.addEventListener('click', () => {
  console.log('Organization reviews button clicked')
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
  if (!currentOrganization) return

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
    subjectId: currentOrganization.id,
    subjectName: currentOrganization.name,
    subjectType: 'organization',
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
  await loadOrganizationReviews(currentOrganization)
})

load()
