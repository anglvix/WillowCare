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
       
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="user-table-body"></tbody>
        </table>
    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>