import Organization from '../models/Organization.js'
import { getOrganizationById } from '../services/organization-service.js'

const id = new URLSearchParams(window.location.search).get('id')

if (!id) {
  window.location.href = 'organizations.php'
}

const initialsEl = document.querySelector('#org-initials')
const nameEl = document.querySelector('#org-name')
const descriptionEl = document.querySelector('#org-description')
const missionEl = document.querySelector('#org-mission')
const servicesEl = document.querySelector('#org-services')

async function load() {
  const data = await getOrganizationById(id)
  if (!data) {
    nameEl.textContent = 'Organização não encontrada.'
    return
  }

  const org = Organization.fromObject(data)

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
}

load()
