import { login, isLoggedIn } from '../services/auth-service.js'

// Redireciona se já autenticado
if (isLoggedIn()) {
  window.location.href = 'account_page.php'
}

const formEl = document.querySelector('#login-form')
const errorEl = document.querySelector('#login-error')

formEl?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = formEl.querySelector('[name="email"]').value.trim()
  const password = formEl.querySelector('[name="password"]').value

  const result = await login({ email, password })

  if (!result.ok) {
    if (errorEl) errorEl.textContent = 'Email ou password incorrectos.'
    return
  }

  window.location.href = 'account_page.php'
})
