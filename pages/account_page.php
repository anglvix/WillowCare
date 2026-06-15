<?php
$page_title = 'Willow Care - My Account';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'account-view.js';
include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-4xl mx-auto w-full px-6 py-12 flex-grow grid grid-cols-1 md:grid-cols-3 gap-8">

        <!-- Profile Sidebar -->
        <aside class="text-center bg-gray-50 p-6 rounded-2xl h-fit border border-gray-100 shadow-sm">

            <!-- Avatar -->
            <div
                id="profile-avatar"
                class="w-24 h-24 bg-gray-300 rounded-full mx-auto bg-cover bg-center shadow-inner"
                style="background-image: url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');">
            </div>

            <!-- User Info -->
            <h2 id="user-name" class="text-lg font-serif font-bold text-willow-dark mt-4">
                -
            </h2>

            <p id="user-role-badge" class="text-[10px] bg-willow-light text-willow-dark px-2 py-0.5 rounded-full inline-block mt-1 font-semibold uppercase">
                Family Member
            </p>

            <!-- Navigation -->
            <div class="mt-6 space-y-2 text-xs text-left">

                <a
                    href="voucher_page.php"
                    class="block bg-white p-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:border-willow-mid hover:text-willow-dark transition">

                    My Vouchers / Bookings

                </a>

                <a
                    href="saved_doctors.php"
                    class="block bg-white p-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:border-willow-mid hover:text-willow-dark transition">

                    Saved Doctors

                </a>

                <a
                    href="saved_schools.php"
                    class="block bg-white p-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:border-willow-mid hover:text-willow-dark transition">

                    Saved Schools

                </a>

                <a
                    href="saved_organizations.php"
                    class="block bg-white p-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:border-willow-mid hover:text-willow-dark transition">

                    Saved Organizations

                </a>

                <button
                    id="open-settings-button"
                    type="button"
                    class="w-full text-left bg-white p-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:border-willow-mid hover:text-willow-dark transition">

                    Account Settings

                </button>

            </div>

        </aside>

        <!-- Dashboard -->
        <section class="md:col-span-2 space-y-6">

            <div>
                <h3 class="font-serif font-bold text-xl text-willow-dark">
                    Dashboard Overview
                </h3>

                <p class="text-xs text-gray-400 mt-1">
                    Monitor your activity and saved healthcare resources.
                </p>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div class="border border-gray-100 p-5 rounded-xl shadow-sm text-center bg-white">
                    <span id="stat-bookings" class="text-2xl font-bold text-willow-dark">-</span>
                    <p class="text-[10px] text-gray-400 mt-1 uppercase font-bold">Booked Events</p>
                </div>

                <div class="border border-gray-100 p-5 rounded-xl shadow-sm text-center bg-white">
                    <span id="stat-doctors" class="text-2xl font-bold text-willow-mid">-</span>
                    <p class="text-[10px] text-gray-400 mt-1 uppercase font-bold">Saved Doctors</p>
                </div>

                <div class="border border-gray-100 p-5 rounded-xl shadow-sm text-center bg-white">
                    <span id="stat-schools" class="text-2xl font-bold text-willow-mid">-</span>
                    <p class="text-[10px] text-gray-400 mt-1 uppercase font-bold">Saved Schools</p>
                </div>

                <div class="border border-gray-100 p-5 rounded-xl shadow-sm text-center bg-white">
                    <span id="stat-organizations" class="text-2xl font-bold text-willow-mid">-</span>
                    <p class="text-[10px] text-gray-400 mt-1 uppercase font-bold">Saved Organizations</p>
                </div>

            </div>

            <!-- Conquistas - preenchidas pelo account-view.js -->
            <div class="bg-willow-cream/20 border border-willow-cream rounded-2xl p-5">
                <h4 class="font-semibold text-sm text-willow-dark mb-3">Conquistas</h4>
                <ul id="achievements-list" class="space-y-2 text-xs text-gray-600">
                    <li class="text-gray-400">A carregar...</li>
                </ul>
            </div>

        </section>

    </main>

    <div id="account-settings-overlay" class="hidden fixed inset-0 bg-black/40 z-[100]"></div>
    <div id="account-settings-modal" class="fixed inset-0 hidden items-center justify-center p-4 z-[100]">
        <form id="account-settings-form" class="bg-white rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl border border-gray-200">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-lg font-serif font-bold text-willow-dark">Account settings</h2>
                    <p class="text-sm text-gray-500 mt-1">Edit your personal information and password.</p>
                </div>
                <button id="close-settings-button" type="button" class="text-xs text-gray-500 hover:text-gray-700">Close</button>
            </div>

            <div class="space-y-1">
                <label for="settings-name" class="text-[11px] font-bold text-gray-600">Full name</label>
                <input id="settings-name" name="name" type="text" class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-willow-mid" />
            </div>

            <div class="space-y-1">
                <label for="settings-email" class="text-[11px] font-bold text-gray-600">Email address</label>
                <input id="settings-email" name="email" type="email" class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-willow-mid" />
            </div>

            <div class="space-y-1">
                <label for="settings-phone" class="text-[11px] font-bold text-gray-600">Phone</label>
                <input id="settings-phone" name="phone" type="text" class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-willow-mid" placeholder="+351 912 345 678" />
            </div>

            <div class="space-y-1">
                <label for="settings-address" class="text-[11px] font-bold text-gray-600">Address</label>
                <input id="settings-address" name="address" type="text" class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-willow-mid" placeholder="Street, city, postal code" />
            </div>

            <div class="space-y-1">
                <label for="avatar-file" class="text-[11px] font-bold text-gray-600">Profile photo</label>
                <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                    <label for="avatar-file" class="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition cursor-pointer">
                        Choose photo
                    </label>
                    <span id="avatar-file-name" class="text-sm text-gray-500 truncate">No file selected</span>
                </div>
                <input id="avatar-file" name="avatar-file" type="file" accept="image/*" class="hidden" />
                <button type="button" id="avatar-upload-button" class="mt-2 w-full rounded-xl bg-willow-dark px-3 py-2 text-[11px] font-semibold text-white hover:bg-willow-mid transition">
                    Upload photo
                </button>
                <p id="avatar-status" class="hidden text-[11px] text-gray-500"></p>
            </div>

            <div class="space-y-1">
                <label for="settings-password" class="text-[11px] font-bold text-gray-600">New password</label>
                <input id="settings-password" name="password" type="password" placeholder="Leave blank to keep current password" class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-willow-mid" />
            </div>

            <p id="settings-status" class="text-xs text-gray-600"></p>

            <div class="flex justify-end gap-2">
                <button id="cancel-settings-button" type="button" class="text-xs px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50">Cancel</button>
                <button type="submit" class="bg-willow-dark text-white text-xs px-4 py-2 rounded-xl font-medium hover:bg-willow-mid transition">Save changes</button>
            </div>
        </form>
    </div>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>