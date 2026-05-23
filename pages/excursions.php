<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Willow Care - Excursions</title>

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

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-6xl mx-auto w-full px-6 py-12 flex-grow">

        <!-- Header -->
        <div class="mb-8 flex justify-between items-end">
            <div>
                <h1 class="text-2xl font-serif font-bold text-willow-dark">
                    Upcoming Excursions
                </h1>

                <p class="text-xs text-gray-400">
                    Outdoor socialization meetups.
                </p>
            </div>

            <a
                href="activity_lobby.php"
                class="text-xs text-willow-dark underline font-medium">
                Back to Lobby
            </a>
        </div>

        <!-- Excursions Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <!-- Card -->
            <div class="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col justify-between">

                <img
                    src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=500&q=80"
                    alt="Passeio em Valongo"
                    class="h-40 w-full object-cover">

                <div class="p-4 flex-grow flex flex-col justify-between">

                    <div>
                        <p class="text-[10px] text-willow-mid font-bold uppercase mb-1">
                            14/05/2026 - Valongo
                        </p>

                        <h3 class="font-bold text-sm text-gray-800 mb-2">
                            Passeio em Valongo
                        </h3>

                        <p class="text-xs text-gray-500 mb-4">
                            Exploração guiada pelos caminhos sensoriais naturais
                            da serra.
                        </p>
                    </div>

                    <a
                        href="selected_activity.php"
                        class="block text-center border border-willow-mid text-willow-dark py-2 rounded-xl text-xs font-semibold hover:bg-willow-cream transition">
                        View Event
                    </a>

                </div>
            </div>

        </div>
    </main>

    <?php include '../includes/footer.php'; ?>

</body>

</html>