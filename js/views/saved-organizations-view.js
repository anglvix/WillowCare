import Organization from '../models/Organization.js'
import { getSession } from '../services/auth-service.js'
import { getProfile } from '../services/user-service.js'
import { getOrganizationById } from '../services/organization-service.js'

const listEl = document.querySelector('#saved-organization-list')

function renderOrgCard(org) {
  return `
    <article class="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex flex-col gap-4 md:flex-row md:items-center group hover:border-willow-mid transition">
      <div class="w-16 h-16 rounded-full bg-willow-cream text-willow-dark grid place-items-center font-bold text-xl shrink-0">
        ${org.initials || org.name[0] || 'O'}
      </div>

      <div class="flex-grow min-w-0">
        <h2 class="font-bold text-base text-gray-800 mt-1">${org.name}</h2>
        <p class="text-xs text-gray-500 mt-1">${org.contact || 'Contact not listed'}</p>
        <p class="text-[11px] text-gray-400 mt-2">${org.description || 'No description available.'}</p>
      </div>

      <a href="organization_detail.php?id=${org.id}"
        class="bg-willow-dark text-white text-xs px-4 py-2 rounded-xl font-medium shrink-0 hover:bg-willow-mid transition text-center">
        View Profile
      </a>
    </article>
  `
}

function renderList(orgs) {
  if (!orgs.length) {
    listEl.innerHTML = '<p class="text-sm text-gray-400">You have not saved any organizations yet.</p>'
    return
  }

  listEl.innerHTML = orgs.map(renderOrgCard).join('')
}

async function loadSavedOrganizations() {
  const session = getSession()
  if (!session) {
    window.location.href = 'login.php'
    return
  }

  const profile = await getProfile(session.id)
  const savedOrgIds = Array.from(new Set(profile?.savedOrganizations ?? []))

  if (!savedOrgIds.length) {
    renderList([])
    return
  }

  const organizations = (await Promise.all(savedOrgIds.map((id) => getOrganizationById(Number(id)))))
    .filter(Boolean)
    .map((org) => Organization.fromObject(org))

  renderList(organizations)
}

loadSavedOrganizations()
