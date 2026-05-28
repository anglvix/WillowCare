<?php
$page_title = 'Willow Care - Organization';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'organization-detail-view.js';
include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-3xl mx-auto w-full px-6 py-12 flex-grow space-y-6">

        <!-- Header Card -->
        <section class="flex flex-col sm:flex-row items-center gap-4 bg-willow-dark text-white p-6 rounded-2xl shadow-sm">

            <div id="org-initials" class="w-16 h-16 bg-white text-willow-dark rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                ...
            </div>

            <div class="text-center sm:text-left">
                <h1 id="org-name" class="text-xl font-serif font-bold">
                    A carregar...
                </h1>
                <p id="org-description" class="text-xs text-willow-cream opacity-80 mt-1"></p>
            </div>

        </section>

        <!-- Mission -->
        <section class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 class="font-bold text-sm text-gray-800">Mission & Activities</h3>
            <p id="org-mission" class="text-xs text-gray-600 leading-relaxed mt-2"></p>
        </section>

        <!-- Services -->
        <section id="org-services" class="flex flex-wrap gap-3">
        </section>

    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>
