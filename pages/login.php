<<<<<<< HEAD
<?php
$page_title = 'Willow Care - Login';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'login-view.js';
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
    <title>Willow Care - Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = { theme: { extend: { colors: { willow: { dark: '#465E4B', mid: '#69B87B', accent: '#91E6A2', light: '#C2EDA6', cream: '#F4F5DA' } } } } }
    </script>
</head>
<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755
    <main class="flex-grow flex items-center justify-center py-12 px-6 bg-gray-50">
        <div class="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
            <div class="p-10 flex flex-col justify-center">
                <h2 class="text-2xl font-serif font-bold text-willow-dark mb-2">Welcome Back</h2>
                <p class="text-xs text-gray-400 mb-8">Login to access your personal dashboard.</p>
<<<<<<< HEAD
                <form id="login-form" class="space-y-4">
                    <div>
                        <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                        <input type="email" name="email" required class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-willow-mid" placeholder="your@email.com">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Password</label>
                        <input type="password" name="password" required class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-willow-mid" placeholder="••••••••">
                    </div>
                    <p id="login-error" class="text-xs text-red-500 hidden"></p>
=======
                <form class="space-y-4" action="account_page.php" method="POST">
                    <div>
                        <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                        <input type="email" required class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-willow-mid" placeholder="your@email.com">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Password</label>
                        <input type="password" required class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-willow-mid" placeholder="••••••••">
                    </div>
                    <div class="flex justify-between items-center text-[11px] pt-2">
                        <label class="flex items-center gap-2 text-gray-500 cursor-pointer"><input type="checkbox" class="rounded text-willow-mid focus:ring-willow-mid"> Remember me</label>
                        <a href="#" class="text-willow-dark font-medium hover:underline">Forgot password?</a>
                    </div>
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755
                    <button type="submit" class="w-full bg-willow-dark text-white rounded-xl py-3 text-sm font-medium hover:bg-willow-dark/90 transition mt-4 shadow-md">Log In</button>
                </form>
                <p class="text-xs text-center text-gray-500 mt-8">Don't have an account? <a href="signup.php" class="text-willow-mid font-bold hover:underline">Sign up</a></p>
            </div>
            <div class="bg-willow-accent/40 hidden md:flex flex-col justify-center items-center p-12 text-center relative">
                <div class="relative z-10">
                    <span class="text-3xl font-serif font-bold text-willow-dark block mb-2">W</span>
                    <h3 class="text-lg font-bold text-willow-dark mb-3">Connecting Caregivers</h3>
                    <p class="text-xs text-gray-600 leading-relaxed max-w-xs">Join a dedicated space built to support families dealing with Williams Syndrome.</p>
                </div>
            </div>
        </div>
    </main>

<<<<<<< HEAD
    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>
</html>
=======
</body>
</html>
<?php 
include '../includes/footer.php'; 
?>
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755
