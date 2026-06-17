import { loginDoctor, isLoggedIn, getSession } from '../services/auth-service.js'

if (isLoggedIn()) {
  const session = getSession()
  window.location.href = session?.role === 'doctor' ? 'doctor_dashboard.php' : 'account_page.php'
}

const formEl = document.querySelector('#doctor-login-form')
const errorEl = document.querySelector('#doctor-login-error')

// Handle doctor login form submission.
formEl?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = formEl.querySelector('[name="email"]').value.trim()
  const password = formEl.querySelector('[name="password"]').value

  const result = await loginDoctor({ email, password })

  if (!result.ok) {
    if (errorEl) {
      errorEl.textContent = result.error || 'Email ou password incorretos.'
      errorEl.classList.remove('hidden')
    }
    return
  }

  if (result.pending) {
    window.alert('Your doctor account is still under review by the admin team. You will be able to use the full doctor portal once it is approved.')
  }

  window.location.href = 'doctor_dashboard.php'
})
