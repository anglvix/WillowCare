<?php
$page_title = 'Willow Care - Caregiver Forum';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'forum-view.js';
include '../includes/head.php';
?>

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

        <!-- Forum Topics - preenchido pelo forum-view.js -->
        <section id="topic-list" class="space-y-4">
            <p class="text-sm text-gray-400">A carregar tópicos...</p>
        </section>

    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>