<?php
$page_title = 'Willow Care - Perfil Médico';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'doctor-area-view.js';
include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-4xl mx-auto w-full px-6 py-12 flex-grow grid grid-cols-1 md:grid-cols-3 gap-8">

        <!-- Doctor Sidebar -->
        <aside class="text-center space-y-4">

            <!-- Profile Image -->
            <div
                class="w-32 h-32 bg-gray-100 rounded-full mx-auto bg-cover bg-center shadow-sm border border-gray-200"
                style="background-image: url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80');">
            </div>

            <!-- Basic Info -->
            <div>

                <h1 id="doctor-name" class="text-xl font-serif font-bold text-willow-dark">-</h1>

                <p class="text-xs text-gray-400 mt-1">Specialist</p>

                <span id="doctor-specialty" class="inline-block mt-3 text-[10px] bg-willow-light text-willow-dark px-3 py-1 rounded-full font-bold uppercase tracking-wide">
                    -
                </span>

            </div>

        </aside>

        <!-- Main Content -->
        <section class="md:col-span-2 space-y-6">

            <!-- Expertise -->
            <div class="bg-willow-cream/30 border border-willow-cream/50 p-5 rounded-2xl">

                <h3 class="font-bold text-sm text-willow-dark mb-2">
                    Clinical Expertise & Background
                </h3>

                <p id="doctor-bio" class="text-xs text-gray-600 leading-relaxed">-</p>

            </div>

            <!-- Experience -->
            <div class="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">

                <h3 class="font-bold text-sm text-willow-dark mb-3">
                    Professional Highlights
                </h3>

                <ul id="doctor-highlights" class="space-y-2 text-xs text-gray-600">
                    <li class="text-gray-400">A carregar...</li>
                </ul>

            </div>

            <!-- CTA -->
            <div class="flex flex-wrap gap-3">

                <button
                    class="bg-willow-mid text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow hover:bg-willow-dark transition">

                    Request Teleconsultation

                </button>

                <button id="btn-save-doctor"
                    class="border border-willow-mid text-willow-dark text-xs font-semibold px-6 py-2.5 rounded-xl hover:bg-willow-cream transition">
                    Save Doctor
                </button>

            </div>

        </section>

    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>