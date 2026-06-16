<?php
$page_title = 'Willow Care - Doctor Login';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'doctor-login-view.js';
include '../includes/head.php';
?>
<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="flex-grow flex items-center justify-center py-12 px-6 bg-gray-50">
        <div class="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
            <div class="p-10 flex flex-col justify-center">
                <h2 class="text-2xl font-serif font-bold text-willow-dark mb-2">Doctor Login</h2>
                <p class="text-sm text-gray-700 mb-8">Secure access for medical professionals. Log in with your doctor account.</p>
                <form id="doctor-login-form" class="space-y-4">
                    <div>
                        <label class="block text-[13px] font-bold text-gray-600">Email Address</label>
                        <input type="email" name="email" required class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-willow-mid" placeholder="doctor@email.com">
                    </div>
                    <div>
                        <label class="block text-[13px] font-bold text-gray-600">Password</label>
                        <input type="password" name="password" required class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-willow-mid" placeholder="••••••••">
                    </div>
                    <p id="doctor-login-error" class="text-sm text-red-500 hidden"></p>
                    <button type="submit" class="w-full bg-willow-dark text-white rounded-xl py-3 text-sm font-medium hover:bg-willow-dark/90 transition mt-4 shadow-md">Doctor Log In</button>
                </form>
                <p class="text-sm text-center text-gray-500 mt-8">New here? <a href="doctor_signup.php" class="text-willow-mid font-bold hover:underline">Create a doctor account</a></p>
            </div>
            <div class="bg-willow-accent/40 hidden md:flex flex-col justify-center items-center p-12 text-center relative">
                <div class="relative z-10">
                    <span class="text-3xl font-serif font-bold text-willow-dark block mb-2">Doctor Portal</span>
                    <h3 class="text-lg font-bold text-willow-dark mb-3">Verified professionals only</h3>
                    <p class="text-sm text-gray-600 leading-relaxed max-w-xs">Use this login page if you are a certified doctor and want to join Willow Care as a medical professional.</p>
                </div>
            </div>
        </div>
    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>
</html>
