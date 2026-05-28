<<<<<<< HEAD
<?php
$page_title = 'Willow Care - Workshops';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'workshops-view.js';
include '../includes/head.php';
?>
<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

=======
<?php 
include '../includes/navbar.php'; 
?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Willow Care - Workshops</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = { theme: { extend: { colors: { willow: { dark: '#465E4B', mid: '#69B87B', accent: '#91E6A2', light: '#C2EDA6', cream: '#F4F5DA' } } } } }
    </script>
</head>
<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755
    <main class="max-w-6xl mx-auto w-full px-6 py-12 flex-grow">
        <div class="mb-8 flex justify-between items-end">
            <div>
                <h1 class="text-2xl font-serif font-bold text-willow-dark">Development Workshops</h1>
                <p class="text-xs text-gray-400">Creative and interactive dynamic learning groups.</p>
            </div>
            <a href="activity_lobby.php" class="text-xs text-willow-dark underline font-medium">Back to Lobby</a>
        </div>
<<<<<<< HEAD
        <div id="workshop-list" class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <p class="text-sm text-gray-400">A carregar workshops...</p>
        </div>
    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>
</html>
=======
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col justify-between">
                <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=500&q=80" class="h-40 w-full object-cover">
                <div class="p-4 flex-grow flex flex-col justify-between">
                    <div>
                        <p class="text-[10px] text-willow-dark font-bold uppercase mb-1">14/05/2026 - Maia</p>
                        <h3 class="font-bold text-sm text-gray-800 mb-2">Leitura Infantil Adaptada</h3>
                        <p class="text-xs text-gray-500 line-clamp-2 mb-4">Sessões cognitivas focadas no estímulo da fala e leitura criativa.</p>
                    </div>
                    <a href="selected_workshop.php" class="block text-center border border-willow-dark text-willow-dark py-2 rounded-xl text-xs font-semibold hover:bg-willow-cream transition">View Workshop</a>
                </div>
            </div>
        </div>
    </main>

</body>
</html>
<?php 
include '../includes/footer.php'; 
?>
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755
