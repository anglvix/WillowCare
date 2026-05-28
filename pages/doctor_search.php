<?php
$page_title = 'Willow Care - Médicos';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'doctor-search-view.js';
include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-6xl mx-auto w-full px-6 py-12 flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Filters -->
        <aside class="bg-gray-50 p-6 rounded-2xl h-fit border border-gray-100">

            <h3 class="font-bold text-sm text-gray-800 mb-4">
                Filter Doctors
            </h3>

            <form id="filter-form" class="space-y-4">

                <div>
                    <label class="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                        Specialty
                    </label>

                    <select
                        name="specialty"
                        class="w-full border bg-white border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-willow-mid">

                        <option value="">All Specialties</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Neurology">Neurology</option>

                    </select>
                </div>

                <div>
                    <label class="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                        Region
                    </label>

                    <input
                        type="text"
                        name="region"
                        placeholder="e.g. Porto"
                        class="w-full border bg-white border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-willow-mid">
                </div>

                <button
                    type="submit"
                    class="w-full bg-willow-dark text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-willow-mid transition">

                    Search Doctors

                </button>

            </form>

        </aside>

        <!-- Doctors List - preenchido pelo doctor-search-view.js -->
        <section id="doctor-list" class="lg:col-span-2 space-y-4">
            <p class="text-sm text-gray-400">A carregar médicos...</p>
        </section>

    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>