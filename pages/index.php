<?php
// O index.php inicia aqui.
$page_title = 'Willow Care - Landing Page';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'index-view.js';
include '../includes/head.php';
?>
<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="flex-grow">
        
        <section class="relative bg-willow-cream overflow-hidden pt-24 pb-44 px-6 min-h-[420px] flex items-center">
            
            <div class="absolute inset-y-0 right-0 w-full md:w-1/2 pointer-events-none z-0">
                <img src="../images/banner 1.png" alt="Árvore Decorativa" class="w-full h-full object-cover object-right-top">
            </div>
            
            <div class="max-w-6xl mx-auto w-full relative z-10 text-center md:text-left">
                <div class="max-w-xl bg-willow-cream/80 md:bg-transparent p-6 md:p-0 rounded-2xl inline-block">
                    <h1 class="text-[38px] md:text-[46px] font-serif font-bold text-willow-dark leading-[1.15] tracking-tight mb-5">
                        Because caring is<br>easier together
                    </h1>
                    <p class="text-gray-700 text-[12px] md:text-[13px] max-w-sm mx-auto md:mx-0 leading-relaxed">
                        Find specialized doctors, supportive schools, and a community that understands your journey with Williams Syndrome.
                    </p>
                </div>
            </div>
        </section>

        <section class="max-w-5xl mx-auto px-6 -mt-20 relative z-20">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <a href="doctor_search.php" class="block bg-willow-cream/40 border border-willow-cream p-1 rounded-2xl shadow-[0_8px_30px_rgba(70,94,75,0.05)] hover:shadow-md transition-shadow">
                    <div class="bg-white figma-card-shape pt-10 pb-8 px-6 text-center flex flex-col items-center">
                        <div class="mb-4 text-willow-dark">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.3" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 14.25l6-6m4.5-3.5A2.25 2.25 0 1113.5 9.25M6 14.25a3 3 0 100-6 3 3 0 0 0 0 6zm0 0v6m0-6h6m6-3.5V21" />
                            </svg>
                        </div>
                        <h3 class="font-bold text-[15px] text-willow-dark mb-2">Specialized Doctors</h3>
                        <p class="text-[11px] text-gray-500 leading-normal max-w-[190px]">Filter professionals experienced with Williams Syndrome and related needs.</p>
                    </div>
                </a>

                <a href="school_search.php" class="block bg-willow-cream/40 border border-willow-cream p-1 rounded-2xl shadow-[0_8px_30px_rgba(70,94,75,0.05)] hover:shadow-md transition-shadow">
                    <div class="bg-white figma-card-shape pt-10 pb-8 px-6 text-center flex flex-col items-center">
                        <div class="mb-4 text-willow-dark">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.3" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21V10.5m0 0L7.5 13.5m4.5-3l4.5 3M3 13.5h18M5.25 13.5v7.5m13.5-7.5v7.5M2 9.5l10-6 10 6" />
                            </svg>
                        </div>
                        <h3 class="font-bold text-[15px] text-willow-dark mb-2">Supportive Schools</h3>
                        <p class="text-[11px] text-gray-500 leading-normal max-w-[190px]">Find inclusive schools with the right support systems.</p>
                    </div>
                </a>

                <a href="forum.php" class="block bg-willow-cream/40 border border-willow-cream p-1 rounded-2xl shadow-[0_8px_30px_rgba(70,94,75,0.05)] hover:shadow-md transition-shadow">
                    <div class="bg-white figma-card-shape pt-10 pb-8 px-6 text-center flex flex-col items-center">
                        <div class="mb-4 text-willow-dark">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.3" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.336 9.336 0 002.668-.135m-1.958-3.166a4.8 4.8 0 00-.696-2.138m-1.589-2.141a3 3 0 11-4.5 0M6.613 14.6a4.115 4.115 0 00-.182 1.935m4.894-1.438a3.41" />
                            </svg>
                        </div>
                        <h3 class="font-bold text-[15px] text-willow-dark mb-2">Community Support</h3>
                        <p class="text-[11px] text-gray-500 leading-normal max-w-[190px]">Connect with other caregivers, associations, and events.</p>
                    </div>
                </a>
            </div>

            <div id="join-cta" class="text-center mt-12 mb-14">
                <h4 class="font-bold text-[14px] text-gray-900 mb-0.5">Start finding the right support today</h4>
                <p class="text-[11px] text-gray-400 mb-4">Because the right help makes all the difference.</p>
                <a href="signup.php" class="border border-gray-400 text-gray-700 px-8 py-1.5 rounded-full text-[11px] font-semibold bg-white hover:bg-gray-50 transition">
                    Join us
                </a>
            </div>
            <hr class="border-gray-100">
        </section>

        <section class="max-w-5xl mx-auto px-6 py-10">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-[15px] font-bold text-gray-800 tracking-tight">Upcoming Activities</h2>
                <a href="activity_lobby.php" class="border border-gray-300 text-gray-500 px-3 py-0.5 rounded-full text-[10px] hover:bg-gray-50">See more...</a>
            </div>

            <div id="upcoming-activities-grid" class="grid grid-cols-1 md:grid-cols-3 gap-5"></div>
            <hr class="border-gray-100 mt-14">
        </section>

        <section class="max-w-md mx-auto text-center px-6 py-10">
            <h2 class="text-[15px] font-bold text-gray-800 mb-2">We know it's not easy</h2>
            <p class="text-[11px] text-gray-500 mb-5 leading-relaxed">
                Caring for someone with Williams Syndrome can be overwhelming.<br>Finding the right support shouldn't be.
            </p>
            <a href="about_us.php" class="border border-gray-400 text-gray-700 px-8 py-1.5 rounded-full text-[11px] font-semibold bg-white hover:bg-gray-50 transition">
                Our Mission
            </a>
            <hr class="border-gray-100 mt-14">
        </section>

        <section class="max-w-5xl mx-auto px-6 py-10 mb-20">
            <h2 class="text-[15px] font-bold text-gray-800 mb-6 tracking-tight">Latest Reviews</h2>
            <div id="latest-reviews-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
        </section>

    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>
</html>
