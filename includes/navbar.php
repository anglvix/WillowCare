<header class="w-full bg-white z-50">
    <div class="max-w-6xl mx-auto h-20 px-8 flex justify-between items-center">

        <a href="index.php" class="h-9 flex items-center hover:opacity-90 transition-opacity">
            <img src="../images/willow_care.png" alt="Willow Care" class="h-10 w-auto object-contain">
        </a>

        <nav class="hidden md:flex items-center space-x-6 text-[13px] font-medium text-gray-600">
          <a href="doctor_search.php" class="hover:text-willow-dark transition">Healthcare</a>

          <div class="relative group">
            <a href="activity_lobby.php" class="hover:text-willow-dark transition flex items-center gap-1 py-4">
              Activities <span class="text-[9px] opacity-60">▼</span>
            </a>
            <div class="absolute left-0 top-full pt-3 hidden group-hover:block group-focus-within:block z-50">
              <div class="min-w-44 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg shadow-gray-200/60">
                <a href="excursions.php" class="block rounded-xl px-4 py-2 text-[13px] text-gray-600 hover:bg-willow-cream hover:text-willow-dark transition">Excursions</a>
                <a href="workshops.php" class="block rounded-xl px-4 py-2 text-[13px] text-gray-600 hover:bg-willow-cream hover:text-willow-dark transition">Workshops</a>
              </div>
            </div>
          </div>

          <a href="school_search.php" class="hover:text-willow-dark transition">Schools</a>

          <div class="relative group">
            <a href="forum.php" class="hover:text-willow-dark transition flex items-center gap-1 py-4">
              Community <span class="text-[9px] opacity-60">▼</span>
            </a>
            <div class="absolute left-0 top-full pt-3 hidden group-hover:block group-focus-within:block z-50">
              <div class="min-w-44 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg shadow-gray-200/60">
                <a href="forum.php" class="block rounded-xl px-4 py-2 text-[13px] text-gray-600 hover:bg-willow-cream hover:text-willow-dark transition">Forum</a>
                <a href="organizations.php" class="block rounded-xl px-4 py-2 text-[13px] text-gray-600 hover:bg-willow-cream hover:text-willow-dark transition">Organizations</a>
              </div>
            </div>
          </div>

          <a href="about_us.php" class="hover:text-willow-dark transition">Our Mission</a>
        </nav>

        <div id="nav-auth-area"></div>
    </div>
</header>
<script>
(function () {
  const token = localStorage.getItem('token')
  const user = token ? JSON.parse(localStorage.getItem('user') || 'null') : null
  const area = document.getElementById('nav-auth-area')
  if (token && user) {
    const name = (user.name || 'Conta').split(' ')[0]
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
    area.innerHTML =
      '<div class="flex items-center gap-3">' +
        '<a href="' + dashboardHref + '" class="border border-willow-dark/20 bg-willow-cream text-willow-dark px-4 py-1.5 rounded-full text-[12px] font-semibold hover:bg-willow-cream/80 transition">' + dashboardLabel + '</a>' +
        '<a href="account_page.php" class="border border-gray-300 text-gray-700 px-4 py-1.5 rounded-full text-[12px] font-medium hover:bg-gray-50 transition">My Account</a>' +
        '<button id="logout-btn-sync" class="border border-gray-300 text-gray-700 px-5 py-1.5 rounded-full text-[12px] font-medium hover:bg-gray-50 transition">Log out</button>' +
      '</div>'
    document.getElementById('logout-btn-sync').addEventListener('click', function () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = 'login.php'
    })
  } else {
    area.innerHTML =
      '<div class="flex items-center gap-3">' +
        '<a href="doctor_login.php" class="border border-gray-300 text-gray-700 px-5 py-1.5 rounded-full text-[12px] font-medium hover:bg-gray-50 transition">For doctors</a>' +
        '<a href="login.php" class="border border-gray-300 text-gray-700 px-5 py-1.5 rounded-full text-[12px] font-medium hover:bg-gray-50 transition">Log in</a>' +
      '</div>'
  }
})()
</script>
