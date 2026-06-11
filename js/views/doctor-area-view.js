import Doctor from '../models/Doctor.js'
import { getDoctorById } from '../services/doctor-service.js'
import { getProfile, saveDoctor } from '../services/user-service.js'
import { getSession, isLoggedIn } from '../services/auth-service.js'

const id = new URLSearchParams(location.search).get('id')

const session = getSession()

if (session?.role === 'doctor' && (session.approvalStatus || 'approved') === 'pending') {
  const alertBox = document.querySelector('#doctor-review-alert')
  if (alertBox) {
    alertBox.classList.remove('hidden')
  }
}

async function load() {
  if (!id) {
    document.querySelector('#doctor-profile')?.replaceWith(
      Object.assign(document.createElement('p'), { textContent: 'Médico não encontrado.', className: 'text-gray-400 text-sm' })
    )
    return
  }

  const data = await getDoctorById(id)
  if (!data) return

  const doctor = Doctor.fromObject(data)
  await updateSaveButtonState(Number(id))

  document.querySelector('#doctor-name')?.replaceWith(
    Object.assign(document.createElement('h1'), {
      id: 'doctor-name',
      className: 'text-xl font-serif font-bold text-willow-dark',
      textContent: doctor.name
    })
  )

  document.querySelector('#doctor-specialty')?.replaceWith(
    Object.assign(document.createElement('span'), {
      id: 'doctor-specialty',
      className: 'inline-block mt-3 text-[10px] bg-willow-light text-willow-dark px-3 py-1 rounded-full font-bold uppercase tracking-wide',
      textContent: doctor.specialty
    })
  )

  const bioEl = document.querySelector('#doctor-bio')
  if (bioEl) bioEl.textContent = doctor.bio

  const contactEl = document.querySelector('#doctor-contact')
  if (contactEl && doctor.contact) contactEl.textContent = doctor.contact

  const addressEl = document.querySelector('#doctor-address')
  if (addressEl && doctor.address) addressEl.textContent = doctor.address

  const highlightsEl = document.querySelector('#doctor-highlights')
  if (highlightsEl && doctor.highlights.length) {
    highlightsEl.innerHTML = doctor.highlights.map(h => `<li>• ${h}</li>`).join('')
  }

  if (doctor.photo) {
    const photoEl = document.querySelector('#doctor-photo')
    if (photoEl) photoEl.style.backgroundImage = `url('${doctor.photo}')`
  }
}

async function updateSaveButtonState(doctorId) {
  const button = document.querySelector('#btn-save-doctor-sidebar') || document.querySelector('#btn-save-doctor')
  if (!button) return

  if (!isLoggedIn()) {
    button.textContent = 'Save Doctor'
    button.disabled = false
    button.classList.remove('opacity-70', 'cursor-not-allowed')
    return
  }

  const session = getSession()
  const profile = await getProfile(session.id)
  const savedDoctors = Array.isArray(profile?.savedDoctors) ? profile.savedDoctors : []
  if (savedDoctors.includes(doctorId)) {
    button.textContent = 'Saved'
    button.disabled = true
    button.classList.add('opacity-70', 'cursor-not-allowed')
  } else {
    button.textContent = 'Save Doctor'
    button.disabled = false
    button.classList.remove('opacity-70', 'cursor-not-allowed')
  }
}

// Guardar médico nos favoritos
const saveDoctorButton = document.querySelector('#btn-save-doctor-sidebar') || document.querySelector('#btn-save-doctor')
if (saveDoctorButton) {
  saveDoctorButton.addEventListener('click', async () => {
    if (!isLoggedIn()) {
      window.location.href = 'login.php'
      return
    }

    const result = await saveDoctor(Number(id))
    if (result.ok) {
      saveDoctorButton.textContent = 'Saved'
      saveDoctorButton.disabled = true
      saveDoctorButton.classList.add('opacity-70', 'cursor-not-allowed')
    } else {
      console.error('Save doctor failed:', result.error)
    }
  })
}

load()
