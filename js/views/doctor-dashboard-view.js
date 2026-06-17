import { getSession, isLoggedIn } from '../services/auth-service.js'
import { getOwnDoctor, updateDoctor } from '../services/doctor-service.js'

if (!isLoggedIn()) {
  window.location.href = 'login.php'
}

const session = getSession()
if (!session || session.role !== 'doctor') {
  window.location.href = 'login.php'
}

const dashboardName = document.querySelector('#doctor-dashboard-name')
const dashboardAvatar = document.querySelector('#doctor-dashboard-avatar')
const profileForm = document.querySelector('#doctor-profile-form')
const profileStatus = document.querySelector('#doctor-profile-status')

let doctor = null

// Show the status.
function showStatus(element, message, isError = false) {
  if (!element) return
  element.textContent = message
  element.classList.remove('hidden')
  element.classList.toggle('text-red-600', isError)
  element.classList.toggle('text-emerald-600', !isError)
}

// Clear the status.
function clearStatus(element) {
  if (!element) return
  element.textContent = ''
  element.classList.add('hidden')
}

// PopulateProfileForm.
function populateProfileForm(data) {
  if (dashboardName) dashboardName.textContent = data.name || session.name
  if (dashboardAvatar) {
    if (data.photo) {
      dashboardAvatar.style.backgroundImage = `url('${data.photo}')`
    } else {
      dashboardAvatar.style.backgroundImage = ''
    }
  }
  profileForm.querySelector('#doctor-profile-name').value = data.name || session.name
  profileForm.querySelector('#doctor-profile-specialty').value = data.specialty || ''
  profileForm.querySelector('#doctor-profile-bio').value = data.bio || ''
  profileForm.querySelector('#doctor-profile-years-experience').value = data.yearsExperience || 0
  profileForm.querySelector('#doctor-profile-region').value = data.region || ''
  profileForm.querySelector('#doctor-profile-phone').value = data.contactPhone || ''
  profileForm.querySelector('#doctor-profile-email').value = data.contactEmail || ''
  profileForm.querySelector('#doctor-profile-address').value = data.address || ''
  profileForm.querySelector('#doctor-profile-highlights').value = (data.highlights || []).join(', ')
}

// Load data or initialize state for dashboard.
async function loadDashboard() {
  try {
    doctor = await getOwnDoctor(session)
    if (!doctor) {
      showStatus(profileStatus, 'Unable to load doctor profile.', true)
      return
    }

    populateProfileForm(doctor)
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
  const specialty = formData.get('specialty')?.toString().trim()
  const bio = formData.get('bio')?.toString().trim()
  const yearsExperience = parseInt(formData.get('yearsExperience')?.toString() || '0')
  const region = formData.get('region')?.toString().trim()
  const contactPhone = formData.get('contactPhone')?.toString().trim()
  const contactEmail = formData.get('contactEmail')?.toString().trim()
  const address = formData.get('address')?.toString().trim()
  const highlights = formData.get('highlights')?.toString().trim()

  if (!name || !specialty) {
    showStatus(profileStatus, 'Please fill in name and specialty.', true)
    return
  }

  const patch = {
    name,
    specialty,
    bio,
    yearsExperience,
    region,
    contactPhone,
    contactEmail,
    address,
    highlights: highlights ? highlights.split(',').map((item) => item.trim()).filter(Boolean) : []
  }

  // If a photo file was selected, read it as a data URL and include it in the patch
  const photoInput = profileForm.querySelector('#doctor-photo-file')
  if (photoInput && photoInput.files && photoInput.files.length) {
    try {
      const file = photoInput.files[0]
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
      patch.photo = dataUrl
    } catch (err) {
      console.error('Failed to read photo file', err)
    }
  }

  try {
    doctor = await updateDoctor(doctor.id, patch)
    populateProfileForm(doctor)
    showStatus(profileStatus, 'Doctor profile updated successfully.')
  } catch (error) {
    console.error(error)
    showStatus(profileStatus, 'Unable to update doctor profile.', true)
  }
})

loadDashboard()

// Photo file input UI handling
const photoFileInput = document.querySelector('#doctor-photo-file')
const photoFileNameSpan = document.querySelector('#doctor-photo-file-name')
if (photoFileInput) {
  photoFileInput.addEventListener('change', (event) => {
    const file = event.target.files?.[0]
    if (file) {
      photoFileNameSpan.textContent = file.name
    }
  })
}
