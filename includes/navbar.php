<header class="w-full bg-white z-50">
    <div class="max-w-6xl mx-auto h-20 px-8 flex justify-between items-center">

        <a href="index.php" class="h-9 flex items-center hover:opacity-90 transition-opacity">
            <img src="../images/willow care2 3.jpg" alt="Willow Care" class="h-full w-auto object-contain">
        </a>

        <nav class="hidden md:flex items-center space-x-6 text-[13px] font-medium text-gray-600">
            <a href="doctor_search.php" class="hover:text-willow-dark transition">Healthcare</a>
            <a href="activity_lobby.php" class="hover:text-willow-dark transition flex items-center gap-1">Activities <span class="text-[9px] opacity-60">▼</span></a>
            <a href="school_search.php" class="hover:text-willow-dark transition">Schools</a>
            <a href="forum.php" class="hover:text-willow-dark transition flex items-center gap-1">Community <span class="text-[9px] opacity-60">▼</span></a>
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
    area.innerHTML =
      '<div class="flex items-center gap-3">' +
        '<a href="account_page.php" class="text-[12px] font-medium text-willow-dark hover:opacity-80 transition">' + name + '</a>' +
        '<button id="logout-btn-sync" class="border border-gray-300 text-gray-700 px-5 py-1.5 rounded-full text-[12px] font-medium hover:bg-gray-50 transition">Log out</button>' +
      '</div>'
    document.getElementById('logout-btn-sync').addEventListener('click', function () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = 'login.php'
    })
  } else {
    area.innerHTML =
      '<a href="login.php" class="border border-gray-300 text-gray-700 px-5 py-1.5 rounded-full text-[12px] font-medium hover:bg-gray-50 transition">Log in</a>'
  }
})()
</script>
