<header class="w-full bg-white z-50">
    <div class="max-w-6xl mx-auto h-20 px-4 sm:px-6 md:px-8 flex items-center justify-between">

        <a href="index.php" class="h-9 flex items-center hover:opacity-90 transition-opacity">
            <img src="../images/willow_care.png" alt="Willow Care" class="h-10 w-auto object-contain">
        </a>

        <button id="mobile-menu-button" type="button" aria-label="Toggle navigation menu" aria-expanded="false" class="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-willow-dark">
            <svg id="mobile-menu-open-icon" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" /></svg>
            <svg id="mobile-menu-close-icon" class="hidden h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <nav id="desktop-nav" class="hidden md:flex items-center space-x-6 text-[14px] font-medium text-gray-700">
          <a href="doctor_search.php" class="hover:text-willow-dark transition">Healthcare</a>

          <div class="relative group">
            <a href="activity_lobby.php" class="hover:text-willow-dark transition flex items-center gap-1 py-4">
              Activities <span class="text-[13px] opacity-90">▼</span>
            </a>
            <div class="absolute left-0 top-full pt-3 hidden group-hover:block group-focus-within:block z-50">
              <div class="min-w-44 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg shadow-gray-200/60">
                <a href="excursions.php" class="block rounded-xl px-4 py-2 text-[14px] text-gray-600 hover:bg-willow-cream hover:text-willow-dark transition">Excursions</a>
                <a href="workshops.php" class="block rounded-xl px-4 py-2 text-[14px] text-gray-600 hover:bg-willow-cream hover:text-willow-dark transition">Workshops</a>
              </div>
            </div>
          </div>

          <a href="school_search.php" class="hover:text-willow-dark transition">Schools</a>

          <div class="relative group">
            <a href="forum.php" class="hover:text-willow-dark transition flex items-center gap-1 py-4">
              Community <span class="text-[13px] opacity-90">▼</span>
            </a>
            <div class="absolute left-0 top-full pt-3 hidden group-hover:block group-focus-within:block z-50">
              <div class="min-w-44 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg shadow-gray-200/60">
                <a href="forum.php" class="block rounded-xl px-4 py-2 text-[14px] text-gray-600 hover:bg-willow-cream hover:text-willow-dark transition">Forum</a>
                <a href="organizations.php" class="block rounded-xl px-4 py-2 text-[14px] text-gray-600 hover:bg-willow-cream hover:text-willow-dark transition">Organizations</a>
              </div>
            </div>
          </div>

          <a href="about_us.php" class="hover:text-willow-dark transition">Our Mission</a>
        </nav>

        <div id="nav-auth-area" class="hidden md:flex">
          <div class="flex items-center gap-3">
            <a href="doctor_login.php" class="border border-willow-dark/20 bg-willow-cream text-willow-dark px-4 py-1.5 rounded-full text-[12px] font-semibold hover:bg-willow-cream/80 transition">Doctor Login</a>
            <a href="login.php" class="text-[12px] font-medium text-willow-dark hover:opacity-80 transition">Log in</a>
          </div>
        </div>
    </div>

    <div id="mobile-menu" class="hidden md:hidden border-t border-gray-200 bg-white/95 px-6 pb-6 pt-4 shadow-xl backdrop-blur-sm">
        <div class="space-y-1 text-sm text-gray-700">
            <a href="doctor_search.php" class="block rounded-2xl px-4 py-3 hover:bg-willow-cream/70 transition">Healthcare</a>

            <div class="rounded-2xl border border-gray-100 bg-white p-4">
                <h3 class="text-gray-900 font-semibold mb-2">Activities</h3>
                <a href="activity_lobby.php" class="block rounded-xl px-3 py-2 text-gray-600 hover:bg-willow-cream/70 transition">All Activities</a>
                <a href="excursions.php" class="block rounded-xl px-3 py-2 text-gray-600 hover:bg-willow-cream/70 transition">Excursions</a>
                <a href="workshops.php" class="block rounded-xl px-3 py-2 text-gray-600 hover:bg-willow-cream/70 transition">Workshops</a>
            </div>

            <a href="school_search.php" class="block rounded-2xl px-4 py-3 hover:bg-willow-cream/70 transition">Schools</a>

            <div class="rounded-2xl border border-gray-100 bg-white p-4">
                <h3 class="text-gray-900 font-semibold mb-2">Community</h3>
                <a href="forum.php" class="block rounded-xl px-3 py-2 text-gray-600 hover:bg-willow-cream/70 transition">Forum</a>
                <a href="organizations.php" class="block rounded-xl px-3 py-2 text-gray-600 hover:bg-willow-cream/70 transition">Organizations</a>
            </div>

            <a href="about_us.php" class="block rounded-2xl px-4 py-3 hover:bg-willow-cream/70 transition">Our Mission</a>
        </div>

        <div id="mobile-nav-auth-area" class="mt-5">
          <div class="flex flex-col gap-3">
            <a href="doctor_login.php" class="inline-flex items-center justify-center border border-willow-dark/20 bg-willow-cream text-willow-dark px-4 py-1.5 rounded-full text-[12px] font-semibold hover:bg-willow-cream/80 transition">Doctor Login</a>
            <a href="login.php" class="text-[12px] font-medium text-willow-dark hover:opacity-80 transition">Log in</a>
          </div>
        </div>
    </div>
</header>
