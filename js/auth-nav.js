import { isLoggedIn, getSession, logout, isAdmin } from './services/auth-service.js'

function updateNavbar() {
  const area = document.getElementById('nav-auth-area')
  if (!area) return

  if (!isLoggedIn()) {
    area.innerHTML = `
      <div class="flex items-center gap-3">
        <a href="doctor_login.php" class="border border-willow-dark/20 bg-willow-cream text-willow-dark px-4 py-1.5 rounded-full text-[12px] font-semibold hover:bg-willow-cream/80 transition">Doctor Login</a>
        <a href="login.php" class="text-[12px] font-medium text-willow-dark hover:opacity-80 transition">Log in</a>
      </div>`
    return
  }

  const existingContent = area.innerHTML.trim()
  if (existingContent) {
    document.getElementById('logout-btn')?.addEventListener('click', () => {
      logout()
      window.location.href = 'login.php'
    })
    document.getElementById('logout-btn-sync')?.addEventListener('click', () => {
      logout()
      window.location.href = 'login.php'
    })
    return
  }

  const user = getSession()
  const firstName = user?.name?.split(' ')[0] ?? 'Conta'
  const dashboardHref = user.role === 'admin'
    ? 'admin.php'
    : user.role === 'school'
      ? 'school_dashboard.php'
      : user.role === 'organization'
        ? 'organization_dashboard.php'
        : 'account_page.php'
  const dashboardLabel = user.role === 'admin'
    ? 'Admin Dashboard'
    : user.role === 'school'
      ? 'School Dashboard'
      : user.role === 'organization'
        ? 'Organization Dashboard'
        : 'My Account'
  const showAccountName = user.role !== 'caregiver'

  area.innerHTML = `
    <div class="flex items-center gap-3">
      <a href="${dashboardHref}" class="border border-willow-dark/20 bg-willow-cream text-willow-dark px-4 py-1.5 rounded-full text-[12px] font-semibold hover:bg-willow-cream/80 transition">${dashboardLabel}</a>
      ${showAccountName ? `<a href="account_page.php" class="text-[12px] font-medium text-willow-dark hover:opacity-80 transition">${firstName}</a>` : ''}
      <button id="logout-btn" class="border border-gray-300 text-gray-700 px-5 py-1.5 rounded-full text-[12px] font-medium hover:bg-gray-50 transition">
        Log out
      </button>
    </div>`

  document.getElementById('logout-btn')?.addEventListener('click', () => {
    logout()
    window.location.href = 'login.php'
  })
}

function updateFooter() {
  const list = document.getElementById('footer-personal-list')
  if (!list || !isLoggedIn()) return

  list.innerHTML = '<li><a href="account_page.php" class="text-gray-200 hover:text-white transition">My Account</a></li>'
}

updateNavbar()
updateFooter()
