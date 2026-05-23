<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Willow Care - My Activity Vouchers</title>

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

    <main class="max-w-3xl mx-auto w-full px-6 py-12 flex-grow">

        <!-- Header -->
        <div class="mb-6">

            <h1 class="text-2xl font-serif font-bold text-willow-dark">
                Your Activity Vouchers
            </h1>

            <p class="text-xs text-gray-400 mt-1">
                Access and manage your confirmed activity bookings.
            </p>

        </div>

        <!-- Voucher Card -->
        <div class="bg-willow-cream/10 border-2 border-dashed border-willow-mid rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">

            <!-- Left Content -->
            <div>

                <span class="text-[9px] bg-willow-dark text-white font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                    Active Booking
                </span>

                <h3 class="font-serif font-bold text-lg text-willow-dark mt-2">
                    Passeio em Valongo
                </h3>

                <p class="text-xs text-gray-500 mt-1">
                    📅 14 Maio 2026 |
                    👤 Holder: Anna Martina
                </p>

            </div>

            <!-- Voucher Code -->
            <div class="text-center border-t sm:border-t-0 sm:border-l border-gray-200 pt-4 sm:pt-0 sm:pl-6 shrink-0">

                <span class="text-xs font-mono bg-gray-100 px-3 py-1.5 rounded text-gray-700 block font-bold tracking-widest">
                    WLC-993A7X
                </span>

                <p class="text-[9px] text-gray-400 mt-1">
                    Show code upon arrival
                </p>

            </div>

        </div>

    </main>

    <?php include '../includes/footer.php'; ?>

</body>

</html>