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

            <div
                class="w-32 h-32 bg-gray-100 rounded-full mx-auto bg-cover bg-center shadow-sm border border-gray-200"
                style="background-image: url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80');">
            </div>

            <div id="doctor-review-alert"
                class="hidden rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-[11px] text-amber-800 shadow-sm">
                Your doctor account is still under admin review. Once approved, the full doctor portal will become active.
            </div>

            <div>

                <h1 id="doctor-name" class="text-xl font-serif font-bold text-willow-dark">-</h1>

                <p class="text-xs text-gray-400 mt-1">Specialist</p>

                <span id="doctor-specialty"
                    class="inline-block mt-3 text-[10px] bg-willow-light text-willow-dark px-3 py-1 rounded-full font-bold uppercase tracking-wide">
                    -
                </span>


                <div class="mt-4 flex flex-col items-center gap-3">

                    <button
                        id="btn-teleconsult"
                        class="bg-willow-mid text-white text-xs font-semibold px-4 py-2 rounded-xl shadow hover:bg-willow-dark transition">
                        Request Teleconsultation
                    </button>

                    <button id="btn-save-doctor-sidebar"
                        class="border border-willow-mid text-willow-dark text-xs font-semibold px-4 py-2 rounded-xl hover:bg-willow-cream transition">
                        Save Doctor
                    </button>

                </div>

            </div>

        </aside>

        <!-- Main Content -->
        <section class="md:col-span-2 space-y-6">

            <div class="bg-willow-cream/30 border border-willow-cream/50 p-5 rounded-2xl">

                <h3 class="font-bold text-sm text-willow-dark mb-2">
                    Clinical Expertise & Background
                </h3>

                <p id="doctor-bio" class="text-xs text-gray-600 leading-relaxed">-</p>

            </div>

            <div class="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">

                <h3 class="font-bold text-sm text-willow-dark mb-3">
                    Professional Highlights
                </h3>

                <ul id="doctor-highlights" class="space-y-2 text-xs text-gray-600">
                    <li class="text-gray-400">A carregar...</li>
                </ul>

            </div>

            <div class="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm space-y-4">

                <div>
                    <h3 class="font-bold text-sm text-willow-dark mb-2">Contact</h3>
                    <p id="doctor-contact" class="text-xs text-gray-600">-</p>
                </div>

                <div>
                    <h3 class="font-bold text-sm text-willow-dark mb-2">Address</h3>
                    <p id="doctor-address" class="text-xs text-gray-600">-</p>
                </div>

            </div>

            <div class="flex flex-wrap gap-3">

                <button
                    class="bg-willow-mid text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow hover:bg-willow-dark transition">
                    Request Teleconsultation
                </button>

                <button id="btn-save-doctor"
                    class="border border-willow-mid text-willow-dark text-xs font-semibold px-6 py-2.5 rounded-xl hover:bg-willow-cream transition">
                    Save Doctor
                </button>

                <button id="btn-post-review"
                    class="bg-willow-mid text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow hover:bg-willow-dark transition">
                    Post review
                </button>

            </div>

        </section>

    </main>

    <!-- Review Modal -->
    <div id="topic-modal"
        class="fixed inset-0 bg-black/40 hidden items-center justify-center p-4 z-[100]">

        <form id="topic-form"
            class="bg-white rounded-2xl w-full max-w-lg p-6 space-y-4">

            <div class="flex items-center justify-between">

                <h2 class="text-lg font-serif font-bold text-willow-dark">
                    New topic
                </h2>

                <button type="button"
                    id="topic-cancel"
                    class="text-xs text-gray-500 hover:text-gray-700">
                    Close
                </button>

            </div>

            <div class="space-y-1">

                <label for="topic-title"
                    class="text-[11px] font-bold text-gray-600">
                    Stars
                </label>

                <input id="topic-title"
                    name="title"
                    type="text"
                    maxlength="80"
                    required
                    class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-willow-mid">

            </div>

            <div class="space-y-1">

                <label for="topic-content"
                    class="text-[11px] font-bold text-gray-600">
                    Review text
                </label>

                <textarea id="topic-content"
                    name="content"
                    rows="4"
                    maxlength="400"
                    required
                    class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-willow-mid"></textarea>

            </div>

            <p id="topic-error"
                class="text-xs text-red-500 hidden">
                Something went wrong. Please try again.
            </p>

            <div class="flex justify-end gap-2">

                <button type="button"
                    id="topic-cancel-secondary"
                    class="text-xs px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50">
                    Cancel
                </button>

                <button type="submit"
                    id="topic-submit"
                    class="bg-willow-dark text-white text-xs px-4 py-2 rounded-xl font-medium hover:bg-willow-mid transition">
                    Publish
                </button>

            </div>

        </form>

    </div>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>