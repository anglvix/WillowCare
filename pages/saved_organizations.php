<?php
$page_title = 'Willow Care - Saved Organizations';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'saved-organizations-view.js';
include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-6xl mx-auto w-full px-6 py-12 flex-grow">

        <section class="mb-8">
            <p class="text-[10px] uppercase tracking-[0.25em] text-willow-mid font-semibold">My Account</p>
            <h1 class="font-serif text-3xl text-willow-dark font-bold mt-2">Saved Organizations</h1>
            <p class="text-sm text-gray-500 mt-2">These are the organizations you saved from your detail pages.</p>
        </section>

        <section id="saved-organization-list" class="space-y-4">
            <p class="text-sm text-gray-400">Loading your saved organizations...</p>
        </section>

    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>
