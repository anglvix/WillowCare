<?php
$page_title = 'Willow Care - Passeio em Valongo';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'selected-activity-view.js';
include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

<?php include '../includes/navbar.php'; ?>

<main class="max-w-5xl mx-auto w-full px-6 py-12 flex-grow grid grid-cols-1 md:grid-cols-3 gap-8">

    <div class="md:col-span-2 space-y-6">

        <div class="h-64 bg-gray-100 rounded-3xl overflow-hidden shadow-inner">
            <img
                src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=80"
                class="w-full h-full object-cover"
                alt="Passeio em Valongo"
            >
        </div>

        <div>
            <span class="text-xs bg-willow-cream text-willow-dark px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Excursion Plan
            </span>

            <h1 class="text-3xl font-serif font-bold text-willow-dark mt-3 mb-2">
                Passeio em Valongo
            </h1>

            <p class="text-xs text-gray-400 flex items-center gap-1">
                📍 Valongo Nature Trails, Porto |
                📅 14 Maio 2026
            </p>
        </div>

        <p class="text-sm text-gray-600 leading-relaxed">
            Este passeio ao ar livre foi desenhado especificamente para proporcionar
            estímulo sensorial adaptado e socialização segura de forma calma e estruturada.
        </p>

    </div>

    <div class="bg-willow-cream/40 border border-willow-cream p-6 rounded-3xl h-fit">

        <h3 class="font-bold text-gray-800 text-sm mb-4">
            Register Attendance
        </h3>

        <form id="booking-form" class="space-y-3">

            <div>
                <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">
                    Caregiver Name
                </label>

                <input
                    type="text"
                    name="caregiver_name"
                    required
                    class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-willow-mid"
                    placeholder="Anna Martina"
                >
            </div>

            <div>
                <label class="block text-[10px] uppercase font-bold text-gray-500 mb-1">
                    Number of Attendees
                </label>

                <input
                    type="number"
                    name="attendees"
                    required
                    min="1"
                    max="5"
                    value="2"
                    class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-willow-mid"
                >
            </div>

            <p id="booking-error" class="hidden text-xs text-red-500">
                Erro ao criar reserva. Tenta novamente.
            </p>

            <button
                id="book-btn"
                type="submit"
                class="w-full bg-willow-dark text-white rounded-xl py-2.5 text-xs font-semibold hover:bg-willow-mid transition disabled:opacity-50"
            >
                Book Ticket
            </button>

        </form>

    </div>

</main>

<?php include '../includes/footer.php'; ?>
<?php include '../includes/scripts.php'; ?>

</body>
</html>
