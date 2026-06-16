import School from '../models/School.js'
import { searchSchools } from '../services/school-service.js'

const listEl = document.querySelector('#school-list')
const formEl = document.querySelector('#filter-form')

const featureLabels = {
  'special-ed-team': 'Special Ed. Team',
  'speech-therapy': 'Speech Therapy',
  'sensory-room': 'Sensory Room',
  'occupational-therapy': 'Occupational Therapy'
}

// Render the featuretags.
function renderFeatureTags(features) {
  return features.map(f =>
    `<span class="text-[12px] bg-willow-cream text-willow-dark font-bold px-2 py-0.5 rounded">${featureLabels[f] ?? f}</span>`
  ).join(' ')
}

// Render the card.
function renderCard(school) {
  return `
    <div class="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row group hover:border-willow-mid transition">
      <div class="w-full sm:w-48 h-36 bg-gray-100 shrink-0 flex items-center justify-center overflow-hidden">
        ${school.avatar ? `
          <img src="${school.avatar}" alt="${school.name}" class="w-full h-36 object-cover">
        ` : `
          <span class="text-2xl font-bold text-willow-dark/30">${school.name[0]}</span>
        `}
      </div>
      <div class="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h4 class="font-serif font-bold text-lg text-willow-dark">${school.name}</h4>
          <p class="text-[14px] text-gray-700 mb-2">${school.location}, ${school.district}</p>
          <div class="flex flex-wrap gap-1 mb-2">${renderFeatureTags(school.supportFeatures)}</div>
          <p class="text-sm text-gray-500">${school.description}</p>
        </div>
        <a href="school_account.php?id=${school.id}"
          class="text-sm font-bold text-willow-mid underline mt-4 block hover:text-willow-dark transition">
          View Integration Profile
        </a>
      </div>
    </div>
  `
}

// Load data or initialize state for the page.
async function load(filters = {}) {
  const data = await searchSchools(filters)
  const schools = data.map(School.fromObject)
  if (!schools.length) {
    listEl.innerHTML = '<p class="text-sm text-gray-400">Nenhuma escola encontrada.</p>'
    return
  }
  listEl.innerHTML = schools.map(renderCard).join('')
}

formEl?.addEventListener('submit', (e) => e.preventDefault())

const districtInput = formEl?.querySelector('[name="district"]')
const checkboxes = formEl ? [...formEl.querySelectorAll('input[type="checkbox"]')] : []

// Retrieve filters from the API or state.
function getFilters() {
  const district = districtInput?.value.trim() || ''
  const features = checkboxes.filter(cb => cb.checked).map(cb => cb.name)
  return { district, features }
}

// Debounce.
function debounce(fn, wait = 300) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), wait)
  }
}

const triggerSearch = debounce(() => load(getFilters()), 300)

districtInput?.addEventListener('input', triggerSearch)
checkboxes.forEach(cb => cb.addEventListener('change', () => load(getFilters())))

load(getFilters())
