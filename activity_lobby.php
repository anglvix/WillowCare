<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Willow Care - Activities Lobby</title>

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
        <div class="mb-10">
            <h1 class="text-3xl font-serif font-bold text-willow-dark mb-2">
                Activities & Workshops
            </h1>

            <p class="text-sm text-gray-500">
                Discover events, outdoor gatherings, and learning environments
                tailored for child development.
            </p>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

            <!-- Excursions -->
            <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition">

                <div class="h-52 bg-gray-200 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80"
                        alt="Outdoor excursions"
                        class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                </div>

                <div class="p-6">
                    <h3 class="font-serif font-bold text-xl text-willow-dark mb-2">
                        Outdoor Excursions
                    </h3>

                    <p class="text-xs text-gray-500 mb-6">
                        Group walks, field integration and sensory adaptation
                        visits to safe regional parks.
                    </p>

                    <a
                        href="excursions.php"
                        class="block text-center bg-willow-mid text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-willow-dark transition">
                        Explore Excursions
                    </a>
                </div>
            </div>

            <!-- Workshops -->
            <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition">

                <div class="h-52 bg-gray-200 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
                        alt="Developmental workshops"
                        class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                </div>

                <div class="p-6">
                    <h3 class="font-serif font-bold text-xl text-willow-dark mb-2">
                        Developmental Workshops
                    </h3>

                    <p class="text-xs text-gray-500 mb-6">
                        Music therapy, fine motor skill gaming, and cognitive
                        reading circles.
                    </p>

                    <a
                        href="workshops.php"
                        class="block text-center bg-willow-dark text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-willow-mid transition">
                        Explore Workshops
                    </a>
                </div>
            </div>

        </div>
    </main>

    <?php include '../includes/footer.php'; ?>

</body>

</html>