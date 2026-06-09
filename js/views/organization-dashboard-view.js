import { getSession, isLoggedIn } from '../services/auth-service.js'
import { getOwnOrganization, updateOrganization } from '../services/organization-service.js'
import { getWorkshopsByHost, getExcursionsByHost, createWorkshop, createExcursion } from '../services/activity-service.js'

if (!isLoggedIn()) {
  window.location.href = 'login.php'
}

const session = getSession()
if (!session || session.role !== 'organization') {
  window.location.href = 'login.php'
}

const dashboardName = document.querySelector('#org-dashboard-name')
const profileForm = document.querySelector('#org-profile-form')
const activityForm = document.querySelector('#org-activity-form')
const profileStatus = document.querySelector('#org-profile-status')
const activityStatus = document.querySelector('#org-activity-status')
const activityCountEl = document.querySelector('#org-activity-count')

let organization = null

function showStatus(element, message, isError = false) {
  if (!element) return
  element.textContent = message
  element.classList.remove('hidden')
  element.classList.toggle('text-red-600', isError)
  element.classList.toggle('text-emerald-600', !isError)
}

function clearStatus(element) {
  if (!element) return
  element.textContent = ''
  element.classList.add('hidden')
}

async function loadActivityCounters() {
  if (!organization) return
  const [workshops, excursions] = await Promise.all([
    getWorkshopsByHost('organization', organization.id),
    getExcursionsByHost('organization', organization.id)
  ])
  const total = (workshops?.length || 0) + (excursions?.length || 0)
  if (activityCountEl) {
    activityCountEl.textContent = String(total)
  }
}

function populateProfileForm(data) {
  if (dashboardName) dashboardName.textContent = data.name || session.name
  profileForm.querySelector('#org-profile-name').value = data.name || session.name
  profileForm.querySelector('#org-profile-initials').value = data.initials || ''
  profileForm.querySelector('#org-profile-description').value = data.description || ''
  profileForm.querySelector('#org-profile-mission').value = data.mission || ''
  profileForm.querySelector('#org-profile-services').value = (data.services || []).join(', ')
}

async function loadDashboard() {
  try {
    organization = await getOwnOrganization(session)
    if (!organization) {
      showStatus(profileStatus, 'Unable to load organization profile.', true)
      return
    }

    populateProfileForm(organization)
    await loadActivityCounters()
  } catch (error) {
    console.error(error)
    showStatus(profileStatus, 'Failed to load dashboard. Please try again.', true)
  }
}

profileForm?.addEventListener('submit', async (event) => {
  event.preventDefault()
  clearStatus(profileStatus)
  showStatus(profileStatus, 'Saving profile...', false)

  const formData = new FormData(profileForm)
  const name = formData.get('name')?.toString().trim()
  const initials = formData.get('initials')?.toString().trim()
  const description = formData.get('description')?.toString().trim()
  const mission = formData.get('mission')?.toString().trim()
  const services = formData.get('services')?.toString().trim()

  const patch = {
    name,
    initials,
    description,
    mission,
    services: services ? services.split(',').map((item) => item.trim()).filter(Boolean) : []
  }

  try {
    organization = await updateOrganization(organization.id, patch)
    populateProfileForm(organization)
    showStatus(profileStatus, 'Organization profile updated successfully.')
  } catch (error) {
    console.error(error)
    showStatus(profileStatus, 'Unable to update organization profile.', true)
  }
})

activityForm?.addEventListener('submit', async (event) => {
  event.preventDefault()
  clearStatus(activityStatus)
  showStatus(activityStatus, 'Publishing activity...', false)

  const formData = new FormData(activityForm)
  const type = formData.get('type')?.toString()
  const title = formData.get('title')?.toString().trim()
  const date = formData.get('date')?.toString()
  const location = formData.get('location')?.toString().trim()
  const description = formData.get('description')?.toString().trim()
  const category = formData.get('category')?.toString().trim()
  const ageGroup = formData.get('ageGroup')?.toString().trim()
  const sensoryFocus = formData.get('sensoryFocus')?.toString().trim()
  const image = formData.get('image')?.toString().trim()

  if (!type || !title || !date || !location || !description || !category) {
    showStatus(activityStatus, 'Please complete the required activity fields.', true)
    return
  }

  const payload = {
    title,
    date,
    location,
    description,
    image,
    hostName: organization.name,
    hostType: 'organization',
    hostId: organization.id
  }

  try {
    if (type === 'workshop') {
      await createWorkshop({
        ...payload,
        category,
        ageGroup: ageGroup || 'All ages'
      })
    } else {
      await createExcursion({
        ...payload,
        sensoryFocus: sensoryFocus || 'general'
      })
    }
    activityForm.reset()
    await loadActivityCounters()
    showStatus(activityStatus, `${type === 'workshop' ? 'Workshop' : 'Excursion'} created successfully.`)
  } catch (error) {
    console.error(error)
    showStatus(activityStatus, 'Unable to publish activity.', true)
  }
})

loadDashboard()
