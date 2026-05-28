<<<<<<< HEAD
<?php
$page_title = 'Willow Care - Médicos';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'doctor-search-view.js';
include '../includes/head.php';
?>
=======
<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Willow Care - Doctor Search</title>

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
                Filter Doctors
            </h3>

<<<<<<< HEAD
            <form id="filter-form" class="space-y-4">
=======
            <form class="space-y-4">
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755

                <div>
                    <label class="block text-[10px] uppercase font-bold text-gray-400 mb-1">
                        Specialty
                    </label>

                    <select
                        name="specialty"
                        class="w-full border bg-white border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-willow-mid">

<<<<<<< HEAD
                        <option value="">All Specialties</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Neurology">Neurology</option>
=======
                        <option value="pediatrics">Pediatrics</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="neurology">Neurology</option>
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755

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

<<<<<<< HEAD
        <!-- Doctors List - preenchido pelo doctor-search-view.js -->
        <section id="doctor-list" class="lg:col-span-2 space-y-4">
            <p class="text-sm text-gray-400">A carregar médicos...</p>
=======
        <!-- Doctors List -->
        <section class="lg:col-span-2 space-y-4">

            <!-- Doctor Card -->
            <div class="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex gap-4 items-center group hover:border-willow-mid transition">

                <div
                    class="w-16 h-16 rounded-full bg-cover bg-center shrink-0"
                    style="background-image: url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80');">
                </div>

                <div class="flex-grow">

                    <span class="text-[9px] font-bold text-willow-mid uppercase bg-willow-cream px-2 py-0.5 rounded">
                        Pediatric Expert
                    </span>

                    <h4 class="font-bold text-base text-gray-800 mt-1">
                        Dr. Diana Sousa
                    </h4>

                    <p class="text-xs text-gray-500">
                        Experienced consultant with 10+ years in Williams Syndrome care.
                    </p>

                </div>

                <a
                    href="doctor_area.php"
                    class="bg-willow-dark text-white text-xs px-4 py-2 rounded-xl font-medium shrink-0 hover:bg-willow-mid transition">

                    Profile

                </a>

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