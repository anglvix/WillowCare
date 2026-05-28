import Doctor from '../models/Doctor.js'
import { searchDoctors } from '../services/doctor-service.js'

const listEl = document.querySelector('#doctor-list')
const formEl = document.querySelector('#filter-form')

function renderDoctorCard(doctor) {
  return `
    <div class="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex gap-4 items-center group hover:border-willow-mid transition">
      <div class="w-16 h-16 rounded-full bg-cover bg-center shrink-0 bg-gray-200"
        style="${doctor.photo ? `background-image: url('${doctor.photo}')` : ''}"></div>
      <div class="flex-grow">
        <span class="text-[9px] font-bold text-willow-mid uppercase bg-willow-cream px-2 py-0.5 rounded">
          ${doctor.specialty}
        </span>
        <h4 class="font-bold text-base text-gray-800 mt-1">${doctor.name}</h4>
        <p class="text-xs text-gray-500">${doctor.bio}</p>
      </div>
      <a href="doctor_area.php?id=${doctor.id}"
        class="bg-willow-dark text-white text-xs px-4 py-2 rounded-xl font-medium shrink-0 hover:bg-willow-mid transition">
        Profile
      </a>
    </div>
  `
}

function renderList(doctors) {
  if (!doctors.length) {
    listEl.innerHTML = '<p class="text-sm text-gray-400">Nenhum médico encontrado.</p>'
    return
  }
  listEl.innerHTML = doctors.map(renderDoctorCard).join('')
}

async function load(filters = {}) {
  const data = await searchDoctors(filters)
  const doctors = data.map(Doctor.fromObject)
  renderList(doctors)
}

// Filtro pelo form
formEl?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const specialty = formEl.querySelector('[name="specialty"]')?.value || ''
  const region = formEl.querySelector('[name="region"]')?.value.trim() || ''
  await load({ specialty, region })
})

// Carrega todos ao iniciar
load()
