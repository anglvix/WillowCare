<?php
$page_title = 'Willow Care - Perks & Coupons';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'perks-view.js';
include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-5xl mx-auto w-full px-6 py-12 flex-grow">

        <!-- Coupons Grid - populated by perks-view.js -->
        <div id="coupons-grid" class="space-y-8">
            <div class="text-center">
                <p class="text-gray-600">Loading perks...</p>
            </div>
        </div>

    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>
