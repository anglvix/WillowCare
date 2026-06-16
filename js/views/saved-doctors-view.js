import Doctor from '../models/Doctor.js'
import { getSession } from '../services/auth-service.js'
import { getProfile } from '../services/user-service.js'
import { getDoctorById } from '../services/doctor-service.js'

const listEl = document.querySelector('#saved-doctor-list')

// Render the doctorcard.
function renderDoctorCard(doctor) {
  return `
    <article class="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex flex-col gap-4 md:flex-row md:items-center group hover:border-willow-mid transition">
      <div class="w-16 h-16 rounded-full bg-cover bg-center shrink-0 bg-gray-200"
        style="${doctor.photo ? `background-image: url('${doctor.photo}')` : ''}"></div>

      <div class="flex-grow min-w-0">
        <span class="text-[9px] font-bold text-willow-mid uppercase bg-willow-cream px-2 py-0.5 rounded">${doctor.specialty}</span>
        <h2 class="font-bold text-base text-gray-800 mt-1">${doctor.name}</h2>
        <p class="text-xs text-gray-500 mt-1">${doctor.bio || 'No bio available yet.'}</p>
        <p class="text-[11px] text-gray-400 mt-2">${doctor.region || 'Region not listed'}</p>
      </div>

      <a href="doctor_area.php?id=${doctor.id}"
        class="bg-willow-dark text-white text-xs px-4 py-2 rounded-xl font-medium shrink-0 hover:bg-willow-mid transition text-center">
        View Profile
      </a>
    </article>
  `
}

// Render the list.
function renderList(doctors) {
  if (!doctors.length) {
    listEl.innerHTML = '<p class="text-sm text-gray-400">You have not saved any doctors yet.</p>'
    return
  }

  listEl.innerHTML = doctors.map(renderDoctorCard).join('')
}

// Load data or initialize state for saveddoctors.
async function loadSavedDoctors() {
  const session = getSession()

  if (!session) {
    window.location.href = 'login.php'
    return
  }

  const profile = await getProfile(session.id)
  const savedDoctorIds = Array.from(new Set(profile?.savedDoctors ?? []))

  if (!savedDoctorIds.length) {
    renderList([])
    return
  }

  const doctors = (await Promise.all(savedDoctorIds.map((id) => getDoctorById(Number(id)))))
    .filter(Boolean)
    .map((doctor) => Doctor.fromObject(doctor))

  renderList(doctors)
}

loadSavedDoctors()
