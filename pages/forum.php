<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Willow Care - Caregiver Forum</title>

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

        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

            <div>

                <h1 class="text-2xl font-serif font-bold text-willow-dark">
                    Community Forum
                </h1>

                <p class="text-xs text-gray-400 mt-1">
                    Connect with caregivers, specialists, and support communities.
                </p>

            </div>

            <button
                class="bg-willow-dark text-white text-xs px-4 py-2 rounded-xl font-medium hover:bg-willow-mid transition">

                New Topic

            </button>

        </div>

        <!-- Forum Topics -->
        <section class="space-y-4">

            <!-- Topic Card -->
            <article class="border border-gray-100 p-5 rounded-2xl bg-white shadow-sm hover:border-willow-mid transition">

                <span class="text-[9px] bg-willow-light text-willow-dark font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                    Healthcare Chat
                </span>

                <h3 class="font-bold text-base text-gray-800 mt-2 hover:text-willow-dark cursor-pointer transition">

                    Recommendations for Speech Therapists in Porto?

                </h3>

                <p class="text-xs text-gray-500 mt-1 line-clamp-1">
                    Olá a todos, procurava recomendações de profissionais
                    com experiência clínica dedicada...
                </p>

                <div class="flex justify-between items-center mt-4 text-[10px] text-gray-400">

                    <span>
                        By Maria Silva • 2 hours ago
                    </span>

                    <span>
                        💬 5 replies
                    </span>

                </div>

            </article>

            <!-- Topic Card -->
            <article class="border border-gray-100 p-5 rounded-2xl bg-white shadow-sm hover:border-willow-mid transition">

                <span class="text-[9px] bg-willow-cream text-willow-dark font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                    School Inclusion
                </span>

                <h3 class="font-bold text-base text-gray-800 mt-2 hover:text-willow-dark cursor-pointer transition">

                    Best schools with sensory support programs?

                </h3>

                <p class="text-xs text-gray-500 mt-1 line-clamp-1">
                    Estamos a procurar escolas inclusivas na zona norte com
                    apoio cognitivo estruturado...
                </p>

                <div class="flex justify-between items-center mt-4 text-[10px] text-gray-400">

                    <span>
                        By João Pereira • 5 hours ago
                    </span>

                    <span>
                        💬 8 replies
                    </span>

                </div>

            </article>

        </section>

    </main>

    <?php include '../includes/footer.php'; ?>

</body>

</html>