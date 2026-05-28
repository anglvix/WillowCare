<?php
$page_title = 'Willow Care - Os Meus Vouchers';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'voucher-view.js';
include '../includes/head.php';
?>

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

        <!-- Vouchers - preenchido pelo voucher-view.js -->
        <div id="voucher-list" class="space-y-4">
            <p class="text-sm text-gray-400">A carregar vouchers...</p>
        </div>

    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>