<div class="w-full block bg-white leading-[0] relative -mt-1 select-none pointer-events-none">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" class="w-full h-auto">
        <path fill="#91E6A2" opacity="0.5" d="M0,74C90,54,180,54,270,74C360,94,450,94,540,74C630,54,720,54,810,74C900,94,990,94,1080,74C1170,54,1260,54,1350,74L1440,86L1440,160L0,160Z"></path>
        <path fill="#69B87B" opacity="0.6" d="M0,102C90,82,180,82,270,102C360,122,450,122,540,102C630,82,720,82,810,102C900,122,990,122,1080,102C1170,82,1260,82,1350,102L1440,114L1440,160L0,160Z"></path>
        <path fill="#465E4B" d="M0,130C90,110,180,110,270,130C360,150,450,150,540,130C630,110,720,110,810,130C900,150,990,150,1080,130C1170,110,1260,110,1350,130L1440,142L1440,160L0,160Z"></path>
    </svg>
</div>

<footer class="bg-willow-dark text-white pt-8 pb-14 px-8 w-full relative">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        <div>
            <a href="index.php" class="inline-flex items-center hover:opacity-90 -ml-1">
                <img src="../images/footer_logo.png" alt="Willow Care" class="h-14 w-auto" />
            </a>
            <p class="text-[14px] text-white">© 2025 - 2026</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-8 text-[13px]">
            <div>
                <h4 class="font-bold text-white uppercase tracking-wider text-[12px] mb-2 opacity-100">Personal Page</h4>
                <ul id="footer-personal-list"><li><a href="login.php" class="text-gray-200 hover:text-white transition">Log in</a></li></ul>
                <ul id="footer-personal-list"><li><a href="doctor_login.php" class="text-gray-200 hover:text-white transition">Doctor Log in</a></li></ul>
            <script>
            (function () {
              const token = localStorage.getItem('token')
              if (token) {
                document.getElementById('footer-personal-list').innerHTML =
                  '<li><a href="account_page.php" class="text-gray-200 hover:text-white transition">My Account</a></li>'
              }
            })()
            </script>
            </div>
            <div>
                <h4 class="font-bold text-white uppercase tracking-wider text-[12px] mb-2 opacity-100">Search</h4>
                <ul class="space-y-1">
                    <li><a href="doctor_search.php" class="text-gray-200 hover:text-white transition">Doctors</a></li>
                    <li><a href="school_search.php" class="text-gray-200 hover:text-white transition">Schools</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold text-white uppercase tracking-wider text-[12px] mb-2 opacity-100">Resources</h4>
                <ul class="space-y-1">
                    <li><a href="activity_lobby.php" class="text-gray-200 hover:text-white transition">Activities</a></li>
                    <li><a href="forum.php" class="text-gray-200 hover:text-white transition">Community</a></li>
                    <li><a href="organizations.php" class="text-gray-200 hover:text-white transition">Organizations</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold text-white uppercase tracking-wider text-[12px] mb-2 opacity-100">WillowCare</h4>
                <ul><li><a href="about_us.php" class="text-gray-200 hover:text-white transition">Our Mission</a></li></ul>
            </div>
        </div>
    </div>
</footer>
