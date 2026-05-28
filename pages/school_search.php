<?php
$page_title = 'Willow Care - Escolas';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'school-search-view.js';
include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-6xl mx-auto w-full px-6 py-12 flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Filters -->
        <aside class="bg-gray-50 p-6 rounded-2xl h-fit border border-gray-100">

            <h3 class="font-bold text-sm text-gray-800 mb-4">
                Support Filters
            </h3>

            <form id="filter-form" class="space-y-4">

                <div>
                    <label class="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                        District
                    </label>
                    <input
                        type="text"
                        name="district"
                        placeholder="e.g. Porto"
                        class="w-full border bg-white border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-willow-mid">
                </div>

                <div>
                    <p class="text-[10px] uppercase font-bold text-gray-400 mb-2">Support Features</p>

                    <label class="flex items-center gap-2 text-xs text-gray-600">
                        <input
                            type="checkbox"
                            name="special-ed-team"
                            class="text-willow-mid focus:ring-willow-mid rounded">
                        Dedicated Special Ed. Team
                    </label>

                    <label class="flex items-center gap-2 text-xs text-gray-600 mt-2">
                        <input
                            type="checkbox"
                            name="speech-therapy"
                            class="text-willow-mid focus:ring-willow-mid rounded">
                        Speech Therapy Support
                    </label>

                    <label class="flex items-center gap-2 text-xs text-gray-600 mt-2">
                        <input
                            type="checkbox"
                            name="sensory-room"
                            class="text-willow-mid focus:ring-willow-mid rounded">
                        Sensory Rooms
                    </label>

                    <label class="flex items-center gap-2 text-xs text-gray-600 mt-2">
                        <input
                            type="checkbox"
                            name="occupational-therapy"
                            class="text-willow-mid focus:ring-willow-mid rounded">
                        Occupational Therapy
                    </label>
                </div>

                <button
                    type="submit"
                    class="w-full bg-willow-dark text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-willow-mid transition">
                    Search Schools
                </button>

            </form>

        </aside>

        <!-- Schools - preenchido pelo school-search-view.js -->
        <section id="school-list" class="lg:col-span-2 space-y-4">
            <p class="text-sm text-gray-400">A carregar escolas...</p>
        </section>

    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>