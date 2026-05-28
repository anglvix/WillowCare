<<<<<<< HEAD
<?php
$page_title = 'Willow Care - Organizações';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'organizations-view.js';
include '../includes/head.php';
?>
=======
<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Willow Care - Support Organizations</title>

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

<<<<<<< HEAD
        <!-- Organizations - preenchido pelo organizations-view.js -->
        <div id="organization-list" class="space-y-4">
            <p class="text-sm text-gray-400">A carregar organizações...</p>
=======
        <!-- Organization Card -->
        <div class="bg-willow-cream/30 border border-willow-cream rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 group hover:border-willow-mid transition">

            <!-- Logo -->
            <div class="w-16 h-16 bg-willow-mid text-white rounded-full flex items-center justify-center font-bold text-xl shrink-0">

                SW

            </div>

            <!-- Content -->
            <div class="text-center sm:text-left flex-grow">

                <h3 class="font-serif font-bold text-lg text-willow-dark">
                    Somos Williams Portugal
                </h3>

                <p class="text-xs text-gray-600 mt-1">
                    Providing legal support, caregiver guidance, and cognitive workshops.
                </p>

            </div>

            <!-- Button -->
            <a
                href="organization_detail.php"
                class="bg-willow-dark text-white px-5 py-2 rounded-xl text-xs font-medium hover:bg-willow-mid transition shrink-0">

                Connect

            </a>

>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755
        </div>

    </main>

    <?php include '../includes/footer.php'; ?>
<<<<<<< HEAD
    <?php include '../includes/scripts.php'; ?>
=======
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755

</body>

</html>