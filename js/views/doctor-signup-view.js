import { register, isLoggedIn } from '../services/auth-service.js'

if (isLoggedIn()) {
  window.location.href = 'account_page.php'
}

const formEl = document.querySelector('#doctor-signup-form')
const errorEl = document.querySelector('#doctor-signup-error')
const certInput = document.querySelector('[name="certification"]')
const previewImg = document.querySelector('#cert-preview')

const readFileAsDataURL = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(reader.result)
  reader.onerror = () => reject(reader.error)
  reader.readAsDataURL(file)
})

certInput?.addEventListener('change', async (event) => {
  const file = event.target.files?.[0]
  if (file && file.type.startsWith('image/')) {
    const dataUrl = await readFileAsDataURL(file)
    previewImg.src = dataUrl
    previewImg.classList.remove('hidden')
  } else {
    previewImg.src = ''
    previewImg.classList.add('hidden')
  }
})

formEl?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = formEl.querySelector('[name="fullname"]').value.trim()
  const email = formEl.querySelector('[name="email"]').value.trim()
  const password = formEl.querySelector('[name="password"]').value
  const specialty = formEl.querySelector('[name="specialty"]').value.trim()
  const certificationFile = formEl.querySelector('[name="certification"]').files?.[0]

  let certification = null
  if (certificationFile) {
    certification = await readFileAsDataURL(certificationFile)
  }

  const result = await register({
    name,
    email,
    password,
    role: 'doctor',
    specialty,
    certification
  })

  if (!result.ok) {
    if (errorEl) {
      errorEl.textContent = 'Erro no registo. O email pode já estar em uso.'
    }
    return
  }

  window.location.href = 'account_page.php'
})
