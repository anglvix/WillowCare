<?php
$page_title = 'Willow Care - Workshop';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'selected-workshop-view.js';
include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

<?php include '../includes/navbar.php'; ?>

<main class="max-w-5xl mx-auto w-full px-6 py-12 flex-grow grid grid-cols-1 md:grid-cols-3 gap-8">

    <div class="md:col-span-2 space-y-6">

        <!-- IMAGE (DINÂMICA) -->
        <div class="h-64 bg-gray-100 rounded-3xl overflow-hidden shadow-inner">
            <img
                id="workshop-image"
                src="https://via.placeholder.com/1000x600?text=Loading..."
                alt="Workshop image"
                class="w-full h-full object-cover">
        </div>

        <!-- INFO -->
        <div>
            <span class="text-xs bg-willow-light text-willow-dark px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Interactive Workshop
            </span>

            <h1 id="workshop-title"
                class="text-3xl font-serif font-bold text-willow-dark mt-3 mb-2">
                A carregar...
            </h1>

            <p id="workshop-meta"
                class="text-sm text-gray-700 flex items-center gap-1">
                A carregar...
            </p>

            <p id="workshop-host"
                class="text-sm text-gray-700 font-bold mt-2"></p>
        </div>

        <p id="workshop-description"
            class="text-sm text-gray-600 leading-relaxed">
            A carregar...
        </p>

    </div>

    <!-- BOOKING -->
    <div class="bg-willow-cream/40 border border-willow-cream p-6 rounded-3xl h-fit">

        <h3 class="font-bold text-gray-800 text-sm mb-4">
            Secure Workshop Slot
        </h3>

        <form id="booking-form" class="space-y-3">

            <div>
                <label class="block text-[12px] uppercase font-bold text-gray-700 mb-1">
                    Child's Age Group
                </label>

                <select
                    name="age_group"
                    required
                    class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs">

                    <option value="4-7">4 - 7 Years old</option>
                    <option value="8-12">8 - 12 Years old</option>

                </select>
            </div>

            <p id="booking-error" class="hidden text-xs text-red-500">
                Erro ao criar reserva. Tenta novamente.
            </p>

            <button
                id="book-btn"
                type="submit"
                class="w-full bg-willow-mid text-white rounded-xl py-2.5 text-xs font-semibold hover:bg-willow-dark transition">

                Claim Free Seat

            </button>

        </form>

    </div>

</main>

<?php include '../includes/footer.php'; ?>
<?php include '../includes/scripts.php'; ?>

</body>
</html>