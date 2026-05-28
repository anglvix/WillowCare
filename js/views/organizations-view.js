import Organization from '../models/Organization.js'
import { getOrganizations } from '../services/organization-service.js'

const listEl = document.querySelector('#organization-list')

function renderCard(org) {
  return `
    <div class="bg-willow-cream/30 border border-willow-cream rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 group hover:border-willow-mid transition">
      <div class="w-16 h-16 bg-willow-mid text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0">
        ${org.initials}
      </div>
      <div class="text-center sm:text-left flex-grow">
        <h3 class="font-serif font-bold text-lg text-willow-dark">${org.name}</h3>
        <p class="text-xs text-gray-600 mt-1">${org.description}</p>
      </div>
      <a href="organization_detail.php?id=${org.id}"
        class="bg-willow-dark text-white px-5 py-2 rounded-xl text-xs font-medium hover:bg-willow-mid transition shrink-0">
        Connect
      </a>
    </div>
  `
}

async function load() {
  const data = await getOrganizations()
  const orgs = data.map(Organization.fromObject)
  if (!orgs.length) {
    listEl.innerHTML = '<p class="text-sm text-gray-400">Sem organizações disponíveis.</p>'
    return
  }
  listEl.innerHTML = orgs.map(renderCard).join('')
}

load()
