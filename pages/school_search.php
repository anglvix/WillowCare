<<<<<<< HEAD
<?php
$page_title = 'Willow Care - Escolas';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'school-search-view.js';
include '../includes/head.php';
?>
=======
<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Willow Care - Inclusive Schools</title>

    <script src="https://cdn.tailwindcss.com"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        willow: {
                            dark: '#465E4B',
                            mid: '#69B87B',
                            accent: '#91E6A2',
                            light: '#C2EDA6',
                            cream: '#F4F5DA'
                        }
                    }
                }
            }
        }
    </script>
</head>
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-6xl mx-auto w-full px-6 py-12 flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Filters -->
        <aside class="bg-gray-50 p-6 rounded-2xl h-fit border border-gray-100">

            <h3 class="font-bold text-sm text-gray-800 mb-4">
                Support Filters
            </h3>

<<<<<<< HEAD
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
=======
            <form class="space-y-4">

                <label class="flex items-center gap-2 text-xs text-gray-600">

                    <input
                        type="checkbox"
                        name="special_ed_team"
                        checked
                        class="text-willow-mid focus:ring-willow-mid rounded">

                    Dedicated Special Ed. Team

                </label>

                <label class="flex items-center gap-2 text-xs text-gray-600">

                    <input
                        type="checkbox"
                        name="speech_support"
                        class="text-willow-mid focus:ring-willow-mid rounded">

                    Speech Therapy Support

                </label>

                <label class="flex items-center gap-2 text-xs text-gray-600">

                    <input
                        type="checkbox"
                        name="sensory_rooms"
                        class="text-willow-mid focus:ring-willow-mid rounded">

                    Sensory Rooms

                </label>
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755

            </form>

        </aside>

<<<<<<< HEAD
        <!-- Schools - preenchido pelo school-search-view.js -->
        <section id="school-list" class="lg:col-span-2 space-y-4">
            <p class="text-sm text-gray-400">A carregar escolas...</p>
=======
        <!-- Schools -->
        <section class="lg:col-span-2 space-y-4">

            <!-- School Card -->
            <div class="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row group hover:border-willow-mid transition">

                <div class="w-full sm:w-48 h-36 bg-gray-100 shrink-0">
                    <img
                        src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80"
                        alt="Escola Básica D. Manuel II"
                        class="w-full h-full object-cover">
                </div>

                <div class="p-5 flex flex-col justify-between flex-grow">

                    <div>

                        <h4 class="font-serif font-bold text-lg text-willow-dark">
                            Escola Básica D. Manuel II
                        </h4>

                        <p class="text-xs text-gray-500 mt-1">
                            Full inclusive structural programs and speech development assistance.
                        </p>

                    </div>

                    <a
                        href="school_account.php"
                        class="text-xs font-bold text-willow-mid underline mt-4 block hover:text-willow-dark transition">

                        View Integration Profile

                    </a>

                </div>

            </div>

>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755
        </section>

    </main>

    <?php include '../includes/footer.php'; ?>
<<<<<<< HEAD
    <?php include '../includes/scripts.php'; ?>
=======
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755

</body>

</html>