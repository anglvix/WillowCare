<<<<<<< HEAD
<?php
$page_title = 'Willow Care - Our Mission';
$html_lang = 'pt';
$base_path = '../';
include '../includes/head.php';
?>
=======
<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Willow Care - Our Mission</title>

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

    <main class="max-w-3xl mx-auto w-full px-6 py-12 flex-grow space-y-8">

        <!-- Header -->
        <div class="text-center">

            <h1 class="text-3xl font-serif font-bold text-willow-dark">
                Our Mission
            </h1>

            <p class="text-xs text-gray-400 mt-2">
                Connecting families, specialized healthcare, and inclusive ecosystems.
            </p>

        </div>

        <!-- Mission Content -->
        <section class="bg-willow-cream/20 border border-willow-cream rounded-3xl p-8 shadow-sm">

            <p class="text-sm text-gray-600 leading-relaxed text-center max-w-xl mx-auto">
                O Willow Care nasceu da necessidade de centralizar caminhos clínicos,
                workshops lúdicos e partilha de experiências para cuidadores de pessoas
                diagnosticadas com a Síndrome de Williams.
            </p>

        </section>

    </main>

    <?php include '../includes/footer.php'; ?>
<<<<<<< HEAD
    <?php include '../includes/scripts.php'; ?>
=======
>>>>>>> 68b4539efca11b6061c9f23b27fb10070d972755

</body>

</html>