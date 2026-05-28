import { isLoggedIn } from '../services/auth-service.js'
import { getWorkshops, getExcursions } from '../services/activity-service.js'
import { getLatestReviews } from '../services/doctor-service.js'

function updateJoinCTA() {
  if (isLoggedIn()) {
    document.getElementById('join-cta')?.remove()
  }
}

// Converte YYYY-MM-DD para DD/MM/YYYY
function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

function renderActivityCard(activity) {
  const imgHtml = activity.image
    ? `<img src="${activity.image}" alt="${activity.location}" class="w-full h-full object-cover">`
    : `<div class="w-full h-full bg-willow-cream flex items-center justify-center opacity-30 text-willow-dark">
        <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
        </svg>
      </div>`

  const href = activity.type === 'workshop' ? 'workshops.php' : 'excursions.php'

  return `
    <div class="rounded-3xl overflow-hidden flex flex-col bg-white border border-gray-100 shadow-sm">
      <div class="h-40 overflow-hidden">${imgHtml}</div>
      <div class="bg-willow-mid p-4 text-white flex-grow flex flex-col justify-between">
        <div>
          <p class="text-[9px] tracking-wide opacity-90 mb-1">${formatDate(activity.date)} - ${activity.location}</p>
          <h3 class="font-bold text-[15px] mb-6">${activity.title}</h3>
        </div>
        <a href="${href}" class="text-[11px] underline font-medium opacity-90 hover:opacity-100 self-start">Learn More</a>
      </div>
    </div>`
}

async function loadUpcomingActivities() {
  const grid = document.getElementById('upcoming-activities-grid')
  if (!grid) return

  const today = new Date().toISOString().split('T')[0]
  const [workshops, excursions] = await Promise.all([getWorkshops(), getExcursions()])

  const upcoming = [
    ...workshops.map(w => ({ ...w, type: 'workshop' })),
    ...excursions.map(e => ({ ...e, type: 'excursion' }))
  ]
    .filter(a => a.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)

    console.log('Upcoming activities:', upcoming) // Debug log

  if (upcoming.length === 0) {
    grid.innerHTML = '<p class="text-gray-400 text-[12px] col-span-3 text-center py-8">No upcoming activities.</p>'
    return
  }

  grid.innerHTML = upcoming.map(renderActivityCard).join('')
}

function starsHtml(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}

function renderReviewCard(review) {
  const photoAttr = review.subjectPhoto
    ? `style="background-image: url('${review.subjectPhoto}');"`
    : ''

  return `
    <div class="bg-willow-cream/30 p-5 rounded-2xl flex flex-col justify-between border border-willow-cream/30">
      <div class="flex justify-between items-center mb-3">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-full bg-gray-200 bg-cover bg-center" ${photoAttr}></div>
          <span class="text-[12px] font-bold text-gray-900">${review.subjectName}</span>
        </div>
        <div class="text-willow-dark text-[11px]">${starsHtml(review.rating)}</div>
      </div>
      <div class="bg-willow-light p-4 rounded-xl text-[11px] text-gray-800 leading-normal flex flex-col justify-between min-h-[90px]">
        <span>${review.text}</span>
        <span class="block font-bold text-willow-dark/60 text-[10px] mt-2">${review.authorInitials}</span>
      </div>
    </div>`
}

async function loadLatestReviews() {
  const grid = document.getElementById('latest-reviews-grid')
  if (!grid) return

  const reviews = await getLatestReviews(2)
  if (reviews.length === 0) return

  grid.innerHTML = reviews.map(renderReviewCard).join('')
}

updateJoinCTA()
loadUpcomingActivities()
loadLatestReviews()
