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

  if (errorEl) {
    errorEl.textContent = ''
    errorEl.classList.add('hidden')
  }

  try {
    const result = await login({ email, password })

    if (!result.ok) {
      if (errorEl) {
        errorEl.textContent = result.error || 'Email ou password incorrectos.'
        errorEl.classList.remove('hidden')
      }
      return
    }

    if (result.user?.role === 'admin') {
      window.location.href = 'admin.php'
      return
    }

    if (result.user?.role === 'doctor') {
      window.location.href = 'doctor_area.php'
      return
    }

    window.location.href = 'account_page.php'
  } catch (err) {
    if (errorEl) {
      errorEl.textContent = 'Não foi possível ligar ao servidor. Inicia o backend primeiro.'
      errorEl.classList.remove('hidden')
    }
  }
})
