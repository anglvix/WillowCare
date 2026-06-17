import { isLoggedIn, getSession, logout } from './services/auth-service.js'

const mobileMenuStates = {
  admin: { href: 'admin.php', label: 'Admin Dashboard' },
  doctor: { href: 'doctor_dashboard.php', label: 'Doctor Dashboard' },
  school: { href: 'school_dashboard.php', label: 'School Dashboard' },
  organization: { href: 'organization_dashboard.php', label: 'Organization Dashboard' },
  caregiver: { href: 'account_page.php', label: 'My Account' }
}

function setMobileMenuState(mobileMenu, mobileMenuButton, isOpen, mobileMenuOpenIcon, mobileMenuCloseIcon) {
  if (!mobileMenu || !mobileMenuButton) return
  mobileMenu.classList.toggle('hidden', !isOpen)
  mobileMenuButton.setAttribute('aria-expanded', String(isOpen))
  mobileMenuOpenIcon?.classList.toggle('hidden', isOpen)
  mobileMenuCloseIcon?.classList.toggle('hidden', !isOpen)
}

function openMobileMenu(mobileMenu, mobileMenuButton, mobileMenuOpenIcon, mobileMenuCloseIcon) {
  setMobileMenuState(mobileMenu, mobileMenuButton, true, mobileMenuOpenIcon, mobileMenuCloseIcon)
}

function closeMobileMenu(mobileMenu, mobileMenuButton, mobileMenuOpenIcon, mobileMenuCloseIcon) {
  setMobileMenuState(mobileMenu, mobileMenuButton, false, mobileMenuOpenIcon, mobileMenuCloseIcon)
}

function toggleMobileMenu(mobileMenu, mobileMenuButton, mobileMenuOpenIcon, mobileMenuCloseIcon) {
  if (!mobileMenu) return
  const isClosed = mobileMenu.classList.contains('hidden')
  setMobileMenuState(
    mobileMenu,
    mobileMenuButton,
    isClosed,
    mobileMenuOpenIcon,
    mobileMenuCloseIcon
  )
}

// Attach event listeners for mobilemenutoggle.
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

// Render the authbuttons.
function renderAuthButtons(desktopAuthArea, mobileAuthArea) {
  const user = getSession()
  const firstName = user?.name?.split(' ')[0] ?? 'Conta'
  const dashboard = mobileMenuStates[user?.role] ?? mobileMenuStates.caregiver
  const showAccountName = user?.role !== 'caregiver'
  const content = `
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
      <a href="${dashboard.href}" class="inline-flex items-center justify-center border border-willow-dark/20 bg-willow-cream text-willow-dark px-4 py-1.5 rounded-full text-[12px] font-semibold hover:bg-willow-cream/80 transition">${dashboard.label}</a>
      ${showAccountName ? `<a href="account_page.php" class="text-[12px] font-medium text-willow-dark hover:opacity-80 transition">${firstName}</a>` : ''}
      <button id="logout-btn" class="inline-flex items-center justify-center border border-gray-300 text-gray-700 px-5 py-1.5 rounded-full text-[12px] font-medium hover:bg-gray-50 transition">
        Log out
      </button>
    </div>`

  if (desktopAuthArea) desktopAuthArea.innerHTML = content
  if (mobileAuthArea) mobileAuthArea.innerHTML = content
  attachLogoutHandler()
}

// Render the loginbuttons.
function renderLoginButtons(desktopAuthArea, mobileAuthArea) {
  const content = `
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
      <a href="doctor_login.php" class="inline-flex items-center justify-center border border-willow-dark/20 bg-willow-cream text-willow-dark px-4 py-1.5 rounded-full text-[12px] font-semibold hover:bg-willow-cream/80 transition">Doctor Login</a>
      <a href="login.php" class="text-[12px] font-medium text-willow-dark hover:opacity-80 transition">Log in</a>
    </div>`

  if (desktopAuthArea) desktopAuthArea.innerHTML = content
  if (mobileAuthArea) mobileAuthArea.innerHTML = content
}

// Attach event listeners for logouthandler.
function attachLogoutHandler() {
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    logout()
    window.location.href = 'login.php'
  })
}

// Update an existing navbar.
function updateNavbar(desktopAuthArea, mobileAuthArea) {
  if (!desktopAuthArea && !mobileAuthArea) return

  if (!isLoggedIn()) {
    renderLoginButtons(desktopAuthArea, mobileAuthArea)
    return
  }

  renderAuthButtons(desktopAuthArea, mobileAuthArea)
}

// Update an existing footer.
function updateFooter() {
  const list = document.getElementById('footer-personal-list')
  if (!list || !isLoggedIn()) return

  list.innerHTML = '<li><a href="account_page.php" class="text-gray-200 hover:text-white transition">My Account</a></li>'
}

// Initialize the navbar.
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
