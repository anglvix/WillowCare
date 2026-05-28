<?php
$page_title = 'Willow Care - My Account';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'account-view.js';
include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-4xl mx-auto w-full px-6 py-12 flex-grow grid grid-cols-1 md:grid-cols-3 gap-8">

        <!-- Profile Sidebar -->
        <aside class="text-center bg-gray-50 p-6 rounded-2xl h-fit border border-gray-100 shadow-sm">

            <!-- Avatar -->
            <div
                class="w-24 h-24 bg-gray-300 rounded-full mx-auto bg-cover bg-center shadow-inner"
                style="background-image: url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');">
            </div>

            <!-- User Info -->
            <h2 id="user-name" class="text-lg font-serif font-bold text-willow-dark mt-4">
                -
            </h2>

            <p class="text-[10px] bg-willow-light text-willow-dark px-2 py-0.5 rounded-full inline-block mt-1 font-semibold uppercase">
                Family Member
            </p>

            <!-- Navigation -->
            <div class="mt-6 space-y-2 text-xs text-left">

                <a
                    href="voucher_page.php"
                    class="block bg-white p-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:border-willow-mid hover:text-willow-dark transition">

                    🎟️ My Vouchers / Bookings

                </a>

                <a
                    href="doctor_search.php"
                    class="block bg-white p-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:border-willow-mid hover:text-willow-dark transition">

                    👨‍⚕️ Saved Doctors

                </a>

                <a
                    href="#"
                    class="block bg-white p-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:border-willow-mid hover:text-willow-dark transition">

                    ⚙️ Account Settings

                </a>

            </div>

        </aside>

        <!-- Dashboard -->
        <section class="md:col-span-2 space-y-6">

            <div>
                <h3 class="font-serif font-bold text-xl text-willow-dark">
                    Dashboard Overview
                </h3>

                <p class="text-xs text-gray-400 mt-1">
                    Monitor your activity and saved healthcare resources.
                </p>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div class="border border-gray-100 p-5 rounded-xl shadow-sm text-center bg-white">
                    <span id="stat-bookings" class="text-2xl font-bold text-willow-dark">-</span>
                    <p class="text-[10px] text-gray-400 mt-1 uppercase font-bold">Booked Events</p>
                </div>

                <div class="border border-gray-100 p-5 rounded-xl shadow-sm text-center bg-white">
                    <span id="stat-doctors" class="text-2xl font-bold text-willow-mid">-</span>
                    <p class="text-[10px] text-gray-400 mt-1 uppercase font-bold">Saved Doctors</p>
                </div>

            </div>

            <!-- Conquistas - preenchidas pelo account-view.js -->
            <div class="bg-willow-cream/20 border border-willow-cream rounded-2xl p-5">
                <h4 class="font-semibold text-sm text-willow-dark mb-3">Conquistas</h4>
                <ul id="achievements-list" class="space-y-2 text-xs text-gray-600">
                    <li class="text-gray-400">A carregar...</li>
                </ul>
            </div>

        </section>

    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>