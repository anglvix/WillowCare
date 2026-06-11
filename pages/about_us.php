<?php
$page_title = 'Willow Care - Our Mission';
$html_lang = 'en';
$base_path = '../';
include '../includes/head.php';
?>

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
                Willow Care was created to bring together clinical care pathways, recreational workshops, and experience-sharing for caregivers of people diagnosed with Williams syndrome.
            </p>

            <p class="text-sm text-gray-600 leading-relaxed text-center max-w-xl mx-auto mt-4">
                Our goal is to support caregivers with practical resources, peer connections, and access to specialised care so families can navigate diagnosis and ongoing support with confidence.
            </p>

        </section>

        <div class="text-center">

            <h2 class="text-2xl font-serif font-bold text-willow-dark mt-6">
                Official sources
            </h2>

            <p class="text-xs text-gray-400 mt-2">Official resources for Williams syndrome:</p>

        </div>

        <section class="bg-willow-cream/20 border border-willow-cream rounded-3xl p-6 shadow-sm">

            <ul class="text-sm text-gray-600 leading-relaxed max-w-xl mx-auto list-disc list-inside space-y-2">
                <li><a class="text-willow-dark underline" href="https://williams-syndrome.org.uk/what-is-williams-syndrome-6-2/" target="_blank" rel="noopener noreferrer">Williams Syndrome Foundation (UK) — What is Williams syndrome?</a></li>
                <li><a class="text-willow-dark underline" href="https://eurowilliams.org/" target="_blank" rel="noopener noreferrer">EuroWilliams</a></li>
                <li><a class="text-willow-dark underline" href="https://www.zespolwilliamsa.org/" target="_blank" rel="noopener noreferrer">Polish Williams Syndrome Association</a></li>
                <li><a class="text-willow-dark underline" href="https://www.williams-syndrome.org/what-is-ws" target="_blank" rel="noopener noreferrer">Williams Syndrome Association (US) — About WS</a></li>
                <li><a class="text-willow-dark underline" href="https://medlineplus.gov/genetics/condition/williams-syndrome/" target="_blank" rel="noopener noreferrer">MedlinePlus — Williams syndrome (genetics)</a></li>
            </ul>

        </section>

    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>