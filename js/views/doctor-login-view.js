import { loginDoctor, isLoggedIn } from '../services/auth-service.js'

if (isLoggedIn()) {
  window.location.href = 'account_page.php'
}

const formEl = document.querySelector('#doctor-login-form')
const errorEl = document.querySelector('#doctor-login-error')

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

  window.location.href = 'account_page.php'
})
