import Doctor from '../models/Doctor.js'
import { getDoctorById } from '../services/doctor-service.js'
import { saveDoctor } from '../services/user-service.js'
import { isLoggedIn } from '../services/auth-service.js'

const id = new URLSearchParams(location.search).get('id')

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

  const highlightsEl = document.querySelector('#doctor-highlights')
  if (highlightsEl && doctor.highlights.length) {
    highlightsEl.innerHTML = doctor.highlights.map(h => `<li>• ${h}</li>`).join('')
  }

  if (doctor.photo) {
    const photoEl = document.querySelector('#doctor-photo')
    if (photoEl) photoEl.style.backgroundImage = `url('${doctor.photo}')`
  }
}

// Guardar médico nos favoritos
document.querySelector('#btn-save-doctor')?.addEventListener('click', async () => {
  if (!isLoggedIn()) {
    window.location.href = 'login.php'
    return
  }
  const result = await saveDoctor(Number(id))
  if (result.ok) {
    const btn = document.querySelector('#btn-save-doctor')
    if (btn) btn.textContent = 'Guardado ✓'
  }
})

load()
