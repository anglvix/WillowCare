<?php
$page_title = 'Willow Care - Admin Dashboard';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'admin-view.js';

include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-6xl mx-auto w-full px-6 py-12 flex-grow">

        <!-- Header -->
        <div class="mb-10">
            <h1 class="text-3xl font-serif font-bold text-willow-dark mb-2">
                Admin Dashboard
            </h1>

            <p class="text-sm text-gray-500">
                Manage user accounts and permissions.
            </p>
        </div>
       
        <section class="mb-8 rounded-3xl border border-amber-100 bg-amber-50 p-6 shadow-sm">
            <p class="text-[10px] uppercase tracking-[0.25em] text-amber-700 font-semibold">Doctor review queue</p>
            <h2 class="mt-2 text-xl font-serif font-bold text-willow-dark">Pending doctor applications</h2>
            <p class="mt-2 text-sm text-gray-600">Review each doctor's submitted information and certification image, then accept the account when ready.</p>
            <div id="pending-doctors-list" class="mt-5 space-y-4"></div>
        </section>

        <div class="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-white">
            <table class="min-w-full text-left text-sm">
                <thead class="bg-gray-50 text-[10px] uppercase tracking-[0.25em] text-gray-500">
                    <tr>
                        <th class="px-4 py-3">ID</th>
                        <th class="px-4 py-3">Name</th>
                        <th class="px-4 py-3">Email</th>
                        <th class="px-4 py-3">Role</th>
                        <th class="px-4 py-3">Specialty</th>
                        <th class="px-4 py-3">Status</th>
                        <th class="px-4 py-3">Certification</th>
                        <th class="px-4 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody id="user-table-body" class="divide-y divide-gray-100"></tbody>
            </table>
        </div>
    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>