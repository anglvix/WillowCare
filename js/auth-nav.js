import { isLoggedIn, getSession, logout, isAdmin } from './services/auth-service.js'

function updateNavbar() {
  const area = document.getElementById('nav-auth-area')
  if (!area || !isLoggedIn()) return

  const user = getSession()
  const firstName = user?.name?.split(' ')[0] ?? 'Conta'
  const adminLink = isAdmin()
    ? '<a href="admin.php" class="border border-willow-dark/20 bg-willow-cream text-willow-dark px-4 py-1.5 rounded-full text-[12px] font-semibold hover:bg-willow-cream/80 transition">Admin</a>'
    : ''

  area.innerHTML = `
    <div class="flex items-center gap-3">
      ${adminLink}
      <a href="account_page.php" class="text-[12px] font-medium text-willow-dark hover:opacity-80 transition">${firstName}</a>
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
