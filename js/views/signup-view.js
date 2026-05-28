import { register, isLoggedIn } from '../services/auth-service.js'

if (isLoggedIn()) {
  window.location.href = 'account_page.php'
}

const formEl = document.querySelector('#signup-form')
const errorEl = document.querySelector('#signup-error')

formEl?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = formEl.querySelector('[name="fullname"]').value.trim()
  const email = formEl.querySelector('[name="email"]').value.trim()
  const password = formEl.querySelector('[name="password"]').value

  const result = await register({ name, email, password })

  if (!result.ok) {
    if (errorEl) errorEl.textContent = 'Erro no registo. O email pode já estar em uso.'
    return
  }

  window.location.href = 'account_page.php'
})
