<?php
$page_title = 'Willow Care - Workshops';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'workshops-view.js';
include '../includes/head.php';
?>
<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-6xl mx-auto w-full px-6 py-12 flex-grow">
        <div class="mb-8 flex justify-between items-end">
            <div>
                <h1 class="text-2xl font-serif font-bold text-willow-dark">Development Workshops</h1>
                <p class="text-xs text-gray-400">Creative and interactive dynamic learning groups.</p>
            </div>
            <a href="activity_lobby.php" class="text-xs text-willow-dark underline font-medium">Back to Lobby</a>
        </div>
        <div id="workshop-list" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <p class="text-sm text-gray-400">A carregar workshops...</p>
        </div>
    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>
</html>