import Doctor from '../models/Doctor.js'
import { getDoctorById, createReview, getReviewsByDoctorId } from '../services/doctor-service.js'
import { saveDoctor } from '../services/user-service.js'
import { getSession, isLoggedIn } from '../services/auth-service.js'

const id = new URLSearchParams(location.search).get('id')
const session = getSession()
const reviewButton = document.querySelector('#btn-reviews')
const postReviewButton = document.querySelector('#btn-post-review')
const doctorReviewsPanel = document.querySelector('#doctor-reviews-panel')
const doctorReviewsList = document.querySelector('#doctor-reviews-list')
const reviewModal = document.querySelector('#review-modal')
const reviewForm = document.querySelector('#review-form')
const reviewCancel = document.querySelector('#review-cancel')
const reviewCancelSecondary = document.querySelector('#review-cancel-secondary')
const reviewError = document.querySelector('#review-error')
const reviewSubmitButton = document.querySelector('#review-submit')

if (session?.role === 'doctor' && (session.approvalStatus || 'approved') === 'pending') {
  const alertBox = document.querySelector('#doctor-review-alert')
  if (alertBox) {
    alertBox.classList.remove('hidden')
  }
}

function toggleReviewPanel() {
  if (!doctorReviewsPanel) return
  const isHidden = doctorReviewsPanel.classList.contains('hidden')
  doctorReviewsPanel.classList.toggle('hidden', !isHidden)
}

function openReviewModal() {
  if (!isLoggedIn()) {
    window.location.href = 'login.php'
    return
  }
  if (!reviewModal || !reviewForm) return
  reviewForm.reset()
  reviewError?.classList.add('hidden')
  reviewModal.classList.remove('hidden')
  reviewModal.classList.add('flex')
  document.body.classList.add('overflow-hidden')
}

function closeReviewModal() {
  if (!reviewModal) return
  reviewModal.classList.add('hidden')
  reviewModal.classList.remove('flex')
  document.body.classList.remove('overflow-hidden')
}

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
  if (highlightsEl && doctor.highlights.length) {
    highlightsEl.innerHTML = doctor.highlights.map(h => `<li>• ${h}</li>`).join('')
  }

  if (doctor.photo) {
    const photoEl = document.querySelector('#doctor-photo')
    if (photoEl) photoEl.style.backgroundImage = `url('${doctor.photo}')`
  }

  if (doctorReviewsPanel) reviewButton?.classList.remove('hidden')
  return doctor
}

async function loadDoctorReviews() {
  if (!id) return
  const reviews = await getReviewsByDoctorId(id)
  if (!doctorReviewsList) return

  if (!reviews.length) {
    doctorReviewsList.innerHTML = '<p class="text-gray-400">No reviews yet. Click "Post review" to add the first one.</p>'
    return
  }

  doctorReviewsList.innerHTML = reviews.map(review => `
    <article class="border border-gray-100 rounded-2xl p-4 bg-willow-cream/50">
      <div class="flex items-center justify-between gap-3">
        <div>
          <div class="text-[12px] font-bold text-gray-800">${review.subjectName}</div>
          <div class="text-[11px] text-gray-600 mt-1">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
        </div>
        <span class="text-[10px] text-gray-500">${new Date(review.createdAt).toLocaleDateString()}</span>
      </div>
      ${review.title ? `<h4 class="font-semibold text-sm text-gray-800 mt-3">${review.title}</h4>` : ''}
      <p class="text-sm text-gray-600 mt-2">${review.text}</p>
      <div class="text-[10px] text-gray-500 mt-3">${review.authorInitials || 'Anonymous'}</div>
    </article>
  `).join('')
}

function getAuthorInitials(fullName) {
  if (!fullName) return 'AN'
  return fullName
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

postReviewButton?.addEventListener('click', openReviewModal)
reviewButton?.addEventListener('click', toggleReviewPanel)
reviewCancel?.addEventListener('click', closeReviewModal)
reviewCancelSecondary?.addEventListener('click', closeReviewModal)
reviewModal?.addEventListener('click', (event) => {
  if (event.target === reviewModal) closeReviewModal()
})

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return
  if (reviewModal && !reviewModal.classList.contains('hidden')) {
    closeReviewModal()
  }
})

reviewForm?.addEventListener('submit', async (event) => {
  event.preventDefault()
  if (!id || !reviewForm || !reviewSubmitButton) return

  const rating = Number(reviewForm.querySelector('[name="rating"]').value)
  const title = reviewForm.querySelector('[name="title"]').value.trim()
  const content = reviewForm.querySelector('[name="content"]').value.trim()
  const anonymous = reviewForm.querySelector('#review-anonymous').checked

  if (!rating || !content) {
    reviewError?.classList.remove('hidden')
    return
  }

  if (!isLoggedIn()) {
    window.location.href = 'login.php'
    return
  }

  const result = await getDoctorById(id)
  const doctor = result ? Doctor.fromObject(result) : null
  if (!doctor) {
    reviewError?.classList.remove('hidden')
    return
  }

  reviewSubmitButton.disabled = true
  reviewSubmitButton.textContent = 'Posting...'
  reviewError?.classList.add('hidden')

  const reviewData = {
    subjectId: Number(id),
    subjectName: doctor.name,
    subjectPhoto: doctor.photo || '',
    rating,
    title,
    text: content,
    authorInitials: anonymous ? 'Anonymous' : getAuthorInitials(session?.name),
    createdAt: new Date().toISOString()
  }

  const response = await createReview(reviewData)
  reviewSubmitButton.disabled = false
  reviewSubmitButton.textContent = 'Publish review'

  if (!response.ok) {
    reviewError?.classList.remove('hidden')
    return
  }

  closeReviewModal()
  await loadDoctorReviews()
  if (doctorReviewsPanel?.classList.contains('hidden')) {
    doctorReviewsPanel.classList.remove('hidden')
  }
})

// Guardar médico nos favoritos
document.querySelector('#btn-save-doctor')?.addEventListener('click', async () => {
  if (!isLoggedIn()) {
    window.location.href = 'login.php'
    return
  }
  const result = await saveDoctor(Number(id))
  if (result.ok) {
    const btn = document.querySelector('#btn-save-doctor')
    if (btn) btn.textContent = 'Guardado ✓'
  }
})

load()
loadDoctorReviews()
