import { isLoggedIn } from '../services/auth-service.js'
import { getWorkshops, getExcursions } from '../services/activity-service.js'
import { getLatestReviews } from '../services/doctor-service.js'

// Update an existing joincta.
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

// Render the activitycard.
function renderActivityCard(activity) {
  const href = activity.type === 'workshop' ? `selected_workshop.php?id=${activity.id}` : `selected_activity.php?id=${activity.id}`
  const imgSrc = activity.image || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=500&q=80'

  return `
    <div class="border border-willow-cream rounded-2xl overflow-hidden shadow-sm bg-willow-cream/30 flex flex-col justify-between">
      <img src="${imgSrc}" alt="${activity.title}" class="h-40 w-full object-cover">
      <div class="p-4 flex-grow flex flex-col justify-between">
        <div>
          <p class="text-[12px] text-willow-mid font-bold uppercase mb-1">${formatDate(activity.date)} - ${activity.location}</p>
          <h3 class="font-bold text-sm text-gray-800 mb-2">${activity.title}</h3>
          ${activity.description ? `<p class="text-sm text-gray-700 line-clamp-2 mb-4">${activity.description}</p>` : ''}
        </div>
        <a href="${href}" class="block text-center border border-willow-mid text-willow-dark py-2 rounded-xl text-sm font-semibold hover:bg-willow-cream transition">
          View Event
        </a>
      </div>
    </div>`
}

// Load data or initialize state for upcomingactivities.
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

  if (upcoming.length === 0) {
    grid.innerHTML = '<p class="text-gray-400 text-[12px] col-span-3 text-center py-8">No upcoming activities.</p>'
    return
  }

  grid.innerHTML = upcoming.map(renderActivityCard).join('')
}

// StarsHtml.
function starsHtml(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}

// Render the reviewcard.
function renderReviewCard(review) {
  return `
    <div class="bg-willow-cream/30 p-5 rounded-2xl flex flex-col justify-between border border-willow-cream/30">
      <div class="flex justify-between items-center mb-3">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-full bg-willow-mid/20 flex items-center justify-center text-[12px] font-bold text-willow-dark">${review.authorInitials}</div>
          <div>
            <p class="text-[12px] text-gray-500">Reviewed ${review.subjectType}</p>
            <p class="text-[14px] font-bold text-gray-900">${review.subjectName}</p>
          </div>
        </div>
        <div class="text-willow-dark text-[14px]">${starsHtml(review.rating)}</div>
      </div>
      <div class="bg-willow-light p-4 rounded-xl text-[14px] text-gray-800 leading-normal min-h-[90px] flex flex-col justify-between">
        <span>${review.text}</span>
      </div>
    </div>`
}

// Load data or initialize state for latestreviews.
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
