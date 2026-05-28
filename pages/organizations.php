<?php
$page_title = 'Willow Care - Organizações';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'organizations-view.js';
include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-4xl mx-auto w-full px-6 py-12 flex-grow">

        <!-- Header -->
        <div class="text-center mb-10">

            <h1 class="text-2xl font-serif font-bold text-willow-dark">
                Associations & Support Groups
            </h1>

            <p class="text-xs text-gray-500 mt-2">
                Connect directly with national communities.
            </p>

        </div>

        <!-- Organizations - preenchido pelo organizations-view.js -->
        <div id="organization-list" class="space-y-4">
            <p class="text-sm text-gray-400">A carregar organizações...</p>
        </div>

    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>