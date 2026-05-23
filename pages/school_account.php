<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Willow Care - School Integration Profile</title>

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

    <main class="max-w-4xl mx-auto w-full px-6 py-12 flex-grow space-y-6">

        <!-- Banner Image -->
        <div class="h-48 rounded-3xl bg-gray-100 overflow-hidden shadow-inner">

            <img
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80"
                alt="Escola Básica D. Manuel II"
                class="w-full h-full object-cover">

        </div>

        <!-- School Header -->
        <div>

            <span class="text-[9px] font-bold bg-willow-cream text-willow-dark px-2 py-0.5 rounded uppercase tracking-wide">
                Public Institution
            </span>

            <h1 class="text-2xl font-serif font-bold text-willow-dark mt-2">
                Escola Básica D. Manuel II
            </h1>

            <p class="text-xs text-gray-400 mt-1">
                Porto District • Inclusive Educational Program
            </p>

        </div>

        <hr class="border-gray-100">

        <!-- Infrastructure -->
        <section class="max-w-xl bg-willow-cream/20 border border-willow-cream rounded-2xl p-5">

            <h3 class="font-bold text-sm text-gray-800 mb-2">
                Special Education Infrastructure
            </h3>

            <p class="text-xs text-gray-600 leading-relaxed">
                A escola dispõe de salas multissensoriais estruturadas e equipas
                fixas formadas em apoio cognitivo individualizado.
            </p>

        </section>

        <!-- Features -->
        <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div class="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">

                <span class="text-xl">🧠</span>

                <h4 class="text-xs font-bold text-willow-dark mt-2 uppercase">
                    Cognitive Support
                </h4>

            </div>

            <div class="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">

                <span class="text-xl">🎨</span>

                <h4 class="text-xs font-bold text-willow-dark mt-2 uppercase">
                    Sensory Rooms
                </h4>

            </div>

            <div class="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">

                <span class="text-xl">👩‍🏫</span>

                <h4 class="text-xs font-bold text-willow-dark mt-2 uppercase">
                    Specialized Staff
                </h4>

            </div>

        </section>

    </main>

    <?php include '../includes/footer.php'; ?>

</body>

</html>