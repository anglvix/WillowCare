import { register, isLoggedIn } from '../services/auth-service.js'

if (isLoggedIn()) {
  window.location.href = 'account_page.php'
}

const formEl = document.querySelector('#signup-form')
const errorEl = document.querySelector('#signup-error')

// Handle account signup form submission.
formEl?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = formEl.querySelector('[name="fullname"]').value.trim()
  const email = formEl.querySelector('[name="email"]').value.trim()
  const password = formEl.querySelector('[name="password"]').value
  const role = formEl.querySelector('[name="role"]')?.value || 'caregiver'

  const result = await register({ name, email, password, role })

  if (!result.ok) {
    if (errorEl) {
      const errorMsg = result.error?.message || result.error || 'Erro no registo. O email pode já estar em uso.'
      errorEl.textContent = errorMsg
    }
    return
  }

  // Redirect depending on role
  if (role === 'organization') {
    window.location.href = 'organization_dashboard.php'
  } else if (role === 'school') {
    window.location.href = 'school_dashboard.php'
  } else {
    window.location.href = 'account_page.php'
  }
})
