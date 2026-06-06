import School from '../models/School.js'
import { getSchoolById } from '../services/school-service.js'

const id = new URLSearchParams(window.location.search).get('id')

if (!id) {
  window.location.href = 'school_search.php'
}

const nameEl = document.querySelector('#school-name')
const locationEl = document.querySelector('#school-location')
const descriptionEl = document.querySelector('#school-description')
const featuresEl = document.querySelector('#school-features')

const featureLabels = {
  'special-ed-team': 'Special Ed. Team',
  'speech-therapy': 'Speech Therapy',
  'sensory-room': 'Sensory Room',
  'occupational-therapy': 'Occupational Therapy'
}

const featureIcons = {
  'special-ed-team': '🧠',
  'speech-therapy': '🗣️',
  'sensory-room': '🎨',
  'occupational-therapy': '🧩'
}

async function load() {
  const data = await getSchoolById(id)
  if (!data) {
    nameEl.textContent = 'Escola não encontrada.'
    return
  }

  const school = School.fromObject(data)

  nameEl.textContent = school.name
  locationEl.textContent = `${school.district} • ${school.location}`
  descriptionEl.textContent = school.description

  featuresEl.innerHTML = (school.supportFeatures || []).map((feature) => `
    <article class="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">
      <span class="text-xl">${featureIcons[feature] || '🏫'}</span>
      <h4 class="text-xs font-bold text-willow-dark mt-2 uppercase">${featureLabels[feature] || feature}</h4>
    </article>
  `).join('')
}

load()
