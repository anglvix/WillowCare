<<<<<<< HEAD
<?php
$page_title = 'Willow Care - Leitura Infantil';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'selected-workshop-view.js';
include '../includes/head.php';
?>
=======
<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Willow Care - Leitura Infantil</title>

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

    <main class="max-w-5xl mx-auto w-full px-6 py-12 flex-grow grid grid-cols-1 md:grid-cols-3 gap-8">

<<<<<<< HEAD
=======
        <!-- Left Content -->
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755
        <div class="md:col-span-2 space-y-6">

            <div class="h-64 bg-gray-100 rounded-3xl overflow-hidden shadow-inner">
                <img
                    src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80"
                    alt="Leitura Infantil"
                    class="w-full h-full object-cover">
            </div>

            <div>
                <span class="text-xs bg-willow-light text-willow-dark px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    Interactive Workshop
                </span>

                <h1 class="text-3xl font-serif font-bold text-willow-dark mt-3 mb-2">
                    Leitura Infantil
                </h1>

                <p class="text-xs text-gray-400 flex items-center gap-1">
                    📍 Biblioteca Municipal da Maia |
                    📅 14 Maio 2026
                </p>
            </div>

            <p class="text-sm text-gray-600 leading-relaxed">
                Sessão estruturada por terapeutas profissionais focada no reforço cognitivo
                através de contos visuais adaptados e dinâmicas sonoras calmas.
            </p>

        </div>

<<<<<<< HEAD
=======
        <!-- Right Card -->
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755
        <div class="bg-willow-cream/40 border border-willow-cream p-6 rounded-3xl h-fit">

            <h3 class="font-bold text-gray-800 text-sm mb-4">
                Secure Workshop Slot
            </h3>

<<<<<<< HEAD
            <form id="booking-form" class="space-y-3">
=======
            <form class="space-y-3" action="voucher_page.php" method="POST">
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755

                <div>
                    <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">
                        Child's Age Group
                    </label>

                    <select
                        name="age_group"
                        required
                        class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-willow-mid">

                        <option value="4-7">
                            4 - 7 Years old
                        </option>

                        <option value="8-12">
                            8 - 12 Years old
                        </option>

                    </select>
                </div>

<<<<<<< HEAD
                <p id="booking-error" class="hidden text-xs text-red-500">
                    Erro ao criar reserva. Tenta novamente.
                </p>

                <button
                    id="book-btn"
                    type="submit"
                    class="w-full bg-willow-mid text-white rounded-xl py-2.5 text-xs font-semibold hover:bg-willow-dark transition disabled:opacity-50">
=======
                <button
                    type="submit"
                    class="w-full bg-willow-mid text-white rounded-xl py-2.5 text-xs font-semibold hover:bg-willow-dark transition">
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755

                    Claim Free Seat

                </button>

            </form>

        </div>

    </main>

    <?php include '../includes/footer.php'; ?>
<<<<<<< HEAD
    <?php include '../includes/scripts.php'; ?>

</body>

</html>
=======

</body>

</html>
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755
