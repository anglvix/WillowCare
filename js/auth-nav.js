import { isLoggedIn, getSession, logout } from './services/auth-service.js'

function closeMobileMenu(mobileMenu, mobileMenuButton, mobileMenuOpenIcon, mobileMenuCloseIcon) {
  if (!mobileMenu || !mobileMenuButton) return
  mobileMenu.classList.add('hidden')
  mobileMenuButton.setAttribute('aria-expanded', 'false')
  mobileMenuOpenIcon?.classList.remove('hidden')
  mobileMenuCloseIcon?.classList.add('hidden')
}

function openMobileMenu(mobileMenu, mobileMenuButton, mobileMenuOpenIcon, mobileMenuCloseIcon) {
  if (!mobileMenu || !mobileMenuButton) return
  mobileMenu.classList.remove('hidden')
  mobileMenuButton.setAttribute('aria-expanded', 'true')
  mobileMenuOpenIcon?.classList.add('hidden')
  mobileMenuCloseIcon?.classList.remove('hidden')
}

function toggleMobileMenu(mobileMenu, mobileMenuButton, mobileMenuOpenIcon, mobileMenuCloseIcon) {
  if (!mobileMenu) return
  if (mobileMenu.classList.contains('hidden')) {
    openMobileMenu(mobileMenu, mobileMenuButton, mobileMenuOpenIcon, mobileMenuCloseIcon)
  } else {
    closeMobileMenu(mobileMenu, mobileMenuButton, mobileMenuOpenIcon, mobileMenuCloseIcon)
  }
}

function attachMobileMenuToggle(mobileMenuButton, mobileMenu, mobileMenuOpenIcon, mobileMenuCloseIcon) {
  if (!mobileMenuButton || !mobileMenu) return

  mobileMenuButton.addEventListener('click', () => toggleMobileMenu(mobileMenu, mobileMenuButton, mobileMenuOpenIcon, mobileMenuCloseIcon))

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMobileMenu(mobileMenu, mobileMenuButton, mobileMenuOpenIcon, mobileMenuCloseIcon)
    }
  })

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeMobileMenu(mobileMenu, mobileMenuButton, mobileMenuOpenIcon, mobileMenuCloseIcon))
  })
}

function renderAuthButtons(desktopAuthArea, mobileAuthArea) {
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
  const content = `
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
      <a href="${dashboardHref}" class="inline-flex items-center justify-center border border-willow-dark/20 bg-willow-cream text-willow-dark px-4 py-1.5 rounded-full text-[12px] font-semibold hover:bg-willow-cream/80 transition">${dashboardLabel}</a>
      ${showAccountName ? `<a href="account_page.php" class="text-[12px] font-medium text-willow-dark hover:opacity-80 transition">${firstName}</a>` : ''}
      <button id="logout-btn" class="inline-flex items-center justify-center border border-gray-300 text-gray-700 px-5 py-1.5 rounded-full text-[12px] font-medium hover:bg-gray-50 transition">
        Log out
      </button>
    </div>`

  if (desktopAuthArea) desktopAuthArea.innerHTML = content
  if (mobileAuthArea) mobileAuthArea.innerHTML = content
  attachLogoutHandler()
}

function renderLoginButtons(desktopAuthArea, mobileAuthArea) {
  const content = `
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
      <a href="doctor_login.php" class="inline-flex items-center justify-center border border-willow-dark/20 bg-willow-cream text-willow-dark px-4 py-1.5 rounded-full text-[12px] font-semibold hover:bg-willow-cream/80 transition">Doctor Login</a>
      <a href="login.php" class="text-[12px] font-medium text-willow-dark hover:opacity-80 transition">Log in</a>
    </div>`

  if (desktopAuthArea) desktopAuthArea.innerHTML = content
  if (mobileAuthArea) mobileAuthArea.innerHTML = content
}

function attachLogoutHandler() {
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    logout()
    window.location.href = 'login.php'
  })
}

function updateNavbar(desktopAuthArea, mobileAuthArea) {
  if (!desktopAuthArea && !mobileAuthArea) return

  if (!isLoggedIn()) {
    renderLoginButtons(desktopAuthArea, mobileAuthArea)
    return
  }

  renderAuthButtons(desktopAuthArea, mobileAuthArea)
}

function updateFooter() {
  const list = document.getElementById('footer-personal-list')
  if (!list || !isLoggedIn()) return

  list.innerHTML = '<li><a href="account_page.php" class="text-gray-200 hover:text-white transition">My Account</a></li>'
}

function initializeNavbar() {
  const mobileMenuButton = document.getElementById('mobile-menu-button')
  const mobileMenu = document.getElementById('mobile-menu')
  const mobileMenuOpenIcon = document.getElementById('mobile-menu-open-icon')
  const mobileMenuCloseIcon = document.getElementById('mobile-menu-close-icon')
  const desktopAuthArea = document.getElementById('nav-auth-area')
  const mobileAuthArea = document.getElementById('mobile-nav-auth-area')

  updateNavbar(desktopAuthArea, mobileAuthArea)
  updateFooter()
  attachMobileMenuToggle(mobileMenuButton, mobileMenu, mobileMenuOpenIcon, mobileMenuCloseIcon)
}

document.addEventListener('DOMContentLoaded', initializeNavbar)
