<<<<<<< HEAD
<?php
$page_title = 'Willow Care - Sign Up';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'signup-view.js';
include '../includes/head.php';
?>
=======
<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Willow Care - Sign Up</title>

    <script src="https://cdn.tailwindcss.com"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        willow: {
                            dark: '#465E4B',
                            mid: '#69B87B',
                            accent: '#91E6A2',
                            light: '#C2EDA6',
                            cream: '#F4F5DA'
                        }
                    }
                }
            }
        }
    </script>
</head>
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="flex-grow flex items-center justify-center py-12 px-6 bg-gray-50">
        <div class="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[550px]">

            <!-- Left Side -->
            <div class="bg-willow-dark hidden md:flex flex-col justify-center items-center p-12 text-center text-white">
                <h3 class="text-2xl font-serif font-bold mb-4">
                    Start your journey with us.
                </h3>

                <p class="text-xs text-gray-300 leading-relaxed max-w-xs">
                    Access custom healthcare recommendations, community groups,
                    and adaptive learning workflows.
                </p>
            </div>

            <!-- Form -->
            <div class="p-10 flex flex-col justify-center">

                <h2 class="text-xl font-serif font-bold text-willow-dark mb-1">
                    Create Account
                </h2>

                <p class="text-xs text-gray-400 mb-6">
                    Join our supportive network today.
                </p>

<<<<<<< HEAD
                <p id="signup-error" class="text-xs text-red-500"></p>
                <form id="signup-form" class="space-y-3">
=======
                <form class="space-y-3" action="login.php" method="POST">
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755

                    <div>
                        <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullname"
                            required
                            class="w-full border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-willow-mid"
                            placeholder="John Doe">
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            required
                            class="w-full border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-willow-mid"
                            placeholder="john@example.com">
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            required
                            class="w-full border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-willow-mid"
                            placeholder="••••••••">
                    </div>

                    <div class="flex items-start gap-2 pt-1 text-[11px] text-gray-500">
                        <input
                            type="checkbox"
                            required
                            class="mt-0.5 rounded text-willow-mid focus:ring-willow-mid">

                        <span>I agree to the Terms of Service.</span>
                    </div>

                    <button
                        type="submit"
                        class="w-full bg-willow-mid text-white rounded-xl py-2.5 text-xs font-semibold hover:bg-willow-dark transition mt-3">
                        Register
                    </button>

                </form>
            </div>
        </div>
    </main>

    <?php include '../includes/footer.php'; ?>
<<<<<<< HEAD
    <?php include '../includes/scripts.php'; ?>
=======
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755

</body>
</html>