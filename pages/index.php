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
            
            <div class="absolute inset-y-0 right-0 w-full md:w-2/3 pointer-events-none z-0">
                <img src="../images/banner.jpg" alt="Árvore Decorativa" class="w-full h-full object-cover object-top">
            </div>

            <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to bottom, rgba(244,245,218,0) 60%, rgba(255,255,255,1) 95%); z-index:5;"></div>
            
            <div class="max-w-6xl mx-auto w-full relative z-10 text-center md:text-left">
                <div class="max-w-xl bg-willow-cream/80 md:bg-transparent p-6 md:p-0 rounded-2xl inline-block">
                    <h1 class="text-[38px] md:text-[46px] font-serif font-bold text-willow-dark leading-[1.15] tracking-tight mb-5">
                        Because caring is<br>easier together
                    </h1>
                    <p class="text-gray-700 text-[14px] md:text-[15px] max-w-sm mx-auto md:mx-0 leading-relaxed">
                        Find specialized doctors, supportive schools, and a community that understands your journey with Williams Syndrome.
                    </p>
                </div>
            </div>
        </section>

        <section class="max-w-5xl mx-auto px-6 -mt-16 relative z-20">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <a href="doctor_search.php" class="block bg-willow-cream/40 border border-willow-cream p-1 rounded-2xl shadow-[0_8px_30px_rgba(70,94,75,0.05)] hover:shadow-md transition-shadow">
                    <div class="bg-white rounded-2xl pt-10 pb-8 px-6 text-center flex flex-col items-center h-56 justify-center">
                        <div class="mb-4 text-willow-dark">
                            <img src="../images/stethoscope.png" alt="Stethoscope" class="w-8 h-8 object-contain">
                        </div>
                        <h3 class="font-bold text-[17px] text-willow-dark mb-2">Specialized Doctors</h3>
                        <p class="text-[14px] text-gray-500 leading-normal max-w-[190px]">Filter professionals experienced with Williams Syndrome and related needs.</p>
                    </div>
                </a>
                <a href="school_search.php" class="block bg-willow-cream/40 border border-willow-cream p-1 rounded-2xl shadow-[0_8px_30px_rgba(70,94,75,0.05)] hover:shadow-md transition-shadow">
                    <div class="bg-white rounded-2xl pt-10 pb-8 px-6 text-center flex flex-col items-center h-56 justify-center">
                        <div class="mb-4 text-willow-dark">
                            <img src="../images/open-book.png" alt="Open book" class="w-8 h-8 object-contain">
                        </div>
                        <h3 class="font-bold text-[17px] text-willow-dark mb-2">Supportive Schools</h3>
                        <p class="text-[14px] text-gray-500 leading-normal max-w-[190px]">Find inclusive schools with the right support systems.</p>
                    </div>
                </a>

                <a href="forum.php" class="block bg-willow-cream/40 border border-willow-cream p-1 rounded-2xl shadow-[0_8px_30px_rgba(70,94,75,0.05)] hover:shadow-md transition-shadow">
                    <div class="bg-white rounded-2xl pt-10 pb-8 px-6 text-center flex flex-col items-center h-56 justify-center">
                        <div class="mb-4 text-willow-dark">
                            <img src="../images/hand-shake.png" alt="Handshake" class="w-8 h-8 object-contain">
                        </div>
                        <h3 class="font-bold text-[17px] text-willow-dark mb-2">Community Support</h3>
                        <p class="text-[14px] text-gray-500 leading-normal max-w-[190px]">Connect with other caregivers, associations, and events.</p>
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
            <hr class="border-transparent">
        </section>

        <section class="max-w-5xl mx-auto px-6 py-10">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-[17px] font-bold text-gray-800 tracking-tight">Upcoming Activities</h2>
                <a href="activity_lobby.php" class="border border-gray-300 text-gray-500 px-3 py-0.5 rounded-full text-[12px] hover:bg-gray-50">See more...</a>
            </div>

            <div id="upcoming-activities-grid" class="grid grid-cols-1 md:grid-cols-3 gap-5"></div>
            <hr class="border-gray-100 mt-14">
        </section>

        <section class="max-w-md mx-auto text-center px-6 py-10">
            <h2 class="text-[20px] font-bold text-gray-800 mb-2">We know it's not easy</h2>
            <p class="text-[14px] text-gray-500 mb-5 leading-relaxed">
                Caring for someone with Williams Syndrome can be overwhelming. Finding the right support shouldn't be.
            </p>
            <a href="about_us.php" class="border border-gray-400 text-gray-700 px-8 py-1.5 rounded-full text-[14px] font-semibold bg-white hover:bg-gray-50 transition">
                Our Mission
            </a>
            <hr class="border-gray-100 mt-14">
        </section>

        <section class="max-w-5xl mx-auto px-6 py-10 mb-20">
            <h2 class="text-[17px] font-bold text-gray-800 mb-6 tracking-tight">Latest Reviews</h2>
            <div id="latest-reviews-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
        </section>

    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>
</html>
