<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Willow Care - Somos Williams</title>

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

    <main class="max-w-3xl mx-auto w-full px-6 py-12 flex-grow space-y-6">

        <!-- Header Card -->
        <section class="flex flex-col sm:flex-row items-center gap-4 bg-willow-dark text-white p-6 rounded-2xl shadow-sm">

            <!-- Logo -->
            <div class="w-16 h-16 bg-white text-willow-dark rounded-full flex items-center justify-center font-bold text-xl shrink-0">

                SW

            </div>

            <!-- Organization Info -->
            <div class="text-center sm:text-left">

                <h1 class="text-xl font-serif font-bold">
                    Somos Williams Portugal
                </h1>

                <p class="text-xs text-willow-cream opacity-80 mt-1">
                    Associação Nacional de Apoio Familiar
                </p>

            </div>

        </section>

        <!-- Mission -->
        <section class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">

            <div>

                <h3 class="font-bold text-sm text-gray-800">
                    Mission & Activities
                </h3>

                <p class="text-xs text-gray-600 leading-relaxed mt-2">
                    Promovemos a integração social ativa através da partilha
                    de recursos médicos, workshops comunitários locais e suporte
                    à inclusão escolar.
                </p>

            </div>

        </section>

        <!-- Services -->
        <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div class="bg-willow-cream/20 border border-willow-cream rounded-2xl p-4 text-center">

                <span class="text-2xl">🏥</span>

                <h4 class="text-xs font-bold text-willow-dark mt-2 uppercase">
                    Medical Guidance
                </h4>

            </div>

            <div class="bg-willow-cream/20 border border-willow-cream rounded-2xl p-4 text-center">

                <span class="text-2xl">🎓</span>

                <h4 class="text-xs font-bold text-willow-dark mt-2 uppercase">
                    School Inclusion
                </h4>

            </div>

            <div class="bg-willow-cream/20 border border-willow-cream rounded-2xl p-4 text-center">

                <span class="text-2xl">🤝</span>

                <h4 class="text-xs font-bold text-willow-dark mt-2 uppercase">
                    Family Support
                </h4>

            </div>

        </section>

    </main>

    <?php include '../includes/footer.php'; ?>

</body>

</html>