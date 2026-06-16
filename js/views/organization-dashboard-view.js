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
const dashboardAvatar = document.querySelector('#org-dashboard-avatar')
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
  if (dashboardAvatar) {
    if (data.avatar) {
      dashboardAvatar.style.backgroundImage = `url('${data.avatar}')`
    } else {
      dashboardAvatar.style.backgroundImage = ''
    }
  }
  profileForm.querySelector('#org-profile-name').value = data.name || session.name
  profileForm.querySelector('#org-profile-initials').value = data.initials || ''
  profileForm.querySelector('#org-profile-description').value = data.description || ''
  profileForm.querySelector('#org-profile-mission').value = data.mission || ''
  profileForm.querySelector('#org-profile-phone').value = data.contactPhone || ''
  profileForm.querySelector('#org-profile-email').value = data.contactEmail || ''
  profileForm.querySelector('#org-profile-address').value = data.address || ''
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
  const contactPhone = formData.get('contactPhone')?.toString().trim()
  const contactEmail = formData.get('contactEmail')?.toString().trim()
  const address = formData.get('address')?.toString().trim()
  const services = formData.get('services')?.toString().trim()

  const patch = {
    name,
    initials,
    description,
    mission,
    contactPhone,
    contactEmail,
    address,
    services: services ? services.split(',').map((item) => item.trim()).filter(Boolean) : []
  }

  // If an avatar file was selected, read it as a data URL and include it in the patch
  const avatarInput = profileForm.querySelector('#org-avatar-file')
  if (avatarInput && avatarInput.files && avatarInput.files.length) {
    try {
      const file = avatarInput.files[0]
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
      patch.avatar = dataUrl
    } catch (err) {
      console.error('Failed to read avatar file', err)
    }
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

// Avatar file input UI handling
const avatarFileInput = document.querySelector('#org-avatar-file')
const avatarFileName = document.querySelector('#org-avatar-file-name')
const avatarStatus = document.querySelector('#org-avatar-status')

if (avatarFileInput) {
  avatarFileInput.addEventListener('change', () => {
    const file = avatarFileInput.files && avatarFileInput.files[0]
    if (file) {
      if (avatarFileName) avatarFileName.textContent = file.name
      // preview immediately
      const reader = new FileReader()
      reader.onload = () => {
        if (dashboardAvatar) dashboardAvatar.style.backgroundImage = `url('${reader.result}')`
      }
      reader.readAsDataURL(file)
      if (avatarStatus) {
        avatarStatus.textContent = ''
        avatarStatus.classList.add('hidden')
      }
    } else {
      if (avatarFileName) avatarFileName.textContent = 'No file selected'
      if (dashboardAvatar) dashboardAvatar.style.backgroundImage = ''
    }
  })
}
