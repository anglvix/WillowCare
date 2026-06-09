import { getSession, isLoggedIn } from '../services/auth-service.js'
import { getOwnSchool, updateSchool } from '../services/school-service.js'
import { getWorkshopsByHost, getExcursionsByHost, createWorkshop, createExcursion } from '../services/activity-service.js'

if (!isLoggedIn()) {
  window.location.href = 'login.php'
}

const session = getSession()
if (!session || session.role !== 'school') {
  window.location.href = 'login.php'
}

const dashboardName = document.querySelector('#school-dashboard-name')
const profileForm = document.querySelector('#school-profile-form')
const activityForm = document.querySelector('#school-activity-form')
const profileStatus = document.querySelector('#school-profile-status')
const activityStatus = document.querySelector('#school-activity-status')
const activityCountEl = document.querySelector('#school-activity-count')

let school = null

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
  if (!school) return
  const [workshops, excursions] = await Promise.all([
    getWorkshopsByHost('school', school.id),
    getExcursionsByHost('school', school.id)
  ])
  const total = (workshops?.length || 0) + (excursions?.length || 0)
  if (activityCountEl) {
    activityCountEl.textContent = String(total)
  }
}

function populateProfileForm(data) {
  if (dashboardName) dashboardName.textContent = data.name || session.name
  profileForm.querySelector('#school-profile-name').value = data.name || session.name
  profileForm.querySelector('#school-profile-district').value = data.district || ''
  profileForm.querySelector('#school-profile-location').value = data.location || ''
  profileForm.querySelector('#school-profile-type').value = data.type || ''
  profileForm.querySelector('#school-profile-description').value = data.description || ''
  profileForm.querySelector('#school-profile-phone').value = data.contactPhone || ''
  profileForm.querySelector('#school-profile-email').value = data.contactEmail || ''
  profileForm.querySelector('#school-profile-address').value = data.address || ''
  profileForm.querySelector('#school-profile-features').value = (data.supportFeatures || []).join(', ')
}

async function loadDashboard() {
  try {
    school = await getOwnSchool(session)
    if (!school) {
      showStatus(profileStatus, 'Unable to load school profile.', true)
      return
    }

    populateProfileForm(school)
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
  const district = formData.get('district')?.toString().trim()
  const location = formData.get('location')?.toString().trim()
  const type = formData.get('type')?.toString().trim()
  const description = formData.get('description')?.toString().trim()
  const contactPhone = formData.get('contactPhone')?.toString().trim()
  const contactEmail = formData.get('contactEmail')?.toString().trim()
  const address = formData.get('address')?.toString().trim()
  const supportFeatures = formData.get('supportFeatures')?.toString().trim()

  const patch = {
    name,
    district,
    location,
    type,
    description,
    contactPhone,
    contactEmail,
    address,
    supportFeatures: supportFeatures ? supportFeatures.split(',').map((item) => item.trim()).filter(Boolean) : []
  }

  try {
    school = await updateSchool(school.id, patch)
    populateProfileForm(school)
    showStatus(profileStatus, 'School profile updated successfully.')
  } catch (error) {
    console.error(error)
    showStatus(profileStatus, 'Unable to update school profile.', true)
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
    hostName: school.name,
    hostType: 'school',
    hostId: school.id
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
