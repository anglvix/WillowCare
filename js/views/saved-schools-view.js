import School from '../models/School.js'
import { getSession } from '../services/auth-service.js'
import { getProfile } from '../services/user-service.js'
import { getSchoolById } from '../services/school-service.js'

const listEl = document.querySelector('#saved-school-list')

function renderSchoolCard(school) {
  return `
    <article class="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex flex-col gap-4 md:flex-row md:items-center group hover:border-willow-mid transition">
      <div class="w-16 h-16 rounded-full shrink-0 overflow-hidden flex items-center justify-center">
        ${school.avatar ? `
          <img src="${school.avatar}" alt="${school.name}" class="w-16 h-16 object-cover">
        ` : `
          <div class="w-16 h-16 rounded-full bg-willow-cream text-willow-dark grid place-items-center font-bold text-xl">${school.name[0] || 'S'}</div>
        `}
      </div>

      <div class="flex-grow min-w-0">
        <h2 class="font-bold text-base text-gray-800 mt-1">${school.name}</h2>
        <p class="text-xs text-gray-500 mt-1">${school.location || 'Location not listed'} · ${school.district || 'District not listed'}</p>
        <p class="text-[11px] text-gray-400 mt-2">${school.description || 'No description available.'}</p>
      </div>

      <a href="school_account.php?id=${school.id}"
        class="bg-willow-dark text-white text-xs px-4 py-2 rounded-xl font-medium shrink-0 hover:bg-willow-mid transition text-center">
        View Profile
      </a>
    </article>
  `
}

function renderList(schools) {
  if (!schools.length) {
    listEl.innerHTML = '<p class="text-sm text-gray-400">You have not saved any schools yet.</p>'
    return
  }

  listEl.innerHTML = schools.map(renderSchoolCard).join('')
}

async function loadSavedSchools() {
  const session = getSession()
  if (!session) {
    window.location.href = 'login.php'
    return
  }

  const profile = await getProfile(session.id)
  const savedSchoolIds = Array.from(new Set(profile?.savedSchools ?? []))

  if (!savedSchoolIds.length) {
    renderList([])
    return
  }

  const schools = (await Promise.all(savedSchoolIds.map((id) => getSchoolById(Number(id)))))
    .filter(Boolean)
    .map((school) => School.fromObject(school))

  renderList(schools)
}

loadSavedSchools()
