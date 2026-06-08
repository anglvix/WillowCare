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

        <section class="mt-10 grid gap-6 lg:grid-cols-2">
            <article class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 class="text-xl font-semibold text-willow-dark mb-4">Add a new school</h2>
                <form id="school-form" class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-gray-600">School name</label>
                        <input name="school-name" type="text" class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm" required>
                    </div>
                    <div class="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label class="block text-xs font-semibold text-gray-600">District</label>
                            <input name="school-district" type="text" class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm" required>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-600">Location</label>
                            <input name="school-location" type="text" class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm" required>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-600">School type</label>
                        <input name="school-type" type="text" class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm" placeholder="e.g. Inclusive School">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-600">Description</label>
                        <textarea name="school-description" rows="4" class="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm" placeholder="A short description of the school"></textarea>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-600">Support features</label>
                        <input name="school-features" type="text" class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm" placeholder="Separate features with commas">
                    </div>
                    <div>
                        <div id="school-form-status" class="text-sm text-emerald-600 hidden"></div>
                        <button type="submit" class="mt-3 inline-flex items-center rounded-xl bg-willow-dark px-5 py-3 text-sm font-semibold text-white hover:bg-willow-mid transition">Create School</button>
                    </div>
                </form>
            </article>

            <article class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 class="text-xl font-semibold text-willow-dark mb-4">Add a new activity</h2>
                <form id="activity-form" class="space-y-4">
                    <div>
                        <label class="block text-xs font-semibold text-gray-600">Activity type</label>
                        <select name="activity-type" class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm">
                            <option value="workshop">Workshop</option>
                            <option value="excursion">Excursion</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-600">Title</label>
                        <input name="activity-title" type="text" class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm" required>
                    </div>
                    <div class="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label class="block text-xs font-semibold text-gray-600">Date</label>
                            <input name="activity-date" type="date" class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm" required>
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-600">Location</label>
                            <input name="activity-location" type="text" class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm" required>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-600">Description</label>
                        <textarea name="activity-description" rows="4" class="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm" required></textarea>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-600">Category</label>
                        <input name="activity-category" type="text" class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm" required placeholder="e.g. Interactive Workshop">
                    </div>
                    <div class="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label class="block text-xs font-semibold text-gray-600">Age group</label>
                            <input name="activity-age-group" type="text" class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm" placeholder="e.g. 4-8">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-600">Sensory focus</label>
                            <input name="activity-sensory-focus" type="text" class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm" placeholder="e.g. nature">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-600">Image URL</label>
                        <input name="activity-image" type="text" class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm" placeholder="Optional image URL">
                    </div>
                    <div class="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label class="block text-xs font-semibold text-gray-600">Host name</label>
                            <input name="activity-host-name" type="text" class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm" placeholder="Optional host">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-600">Host type</label>
                            <select name="activity-host-type" class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm">
                                <option value="">None</option>
                                <option value="school">School</option>
                                <option value="organization">Organization</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-600">Host ID</label>
                        <input name="activity-host-id" type="number" class="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm" placeholder="Optional host ID">
                    </div>
                    <div>
                        <div id="activity-form-status" class="text-sm text-emerald-600 hidden"></div>
                        <button type="submit" class="mt-3 inline-flex items-center rounded-xl bg-willow-dark px-5 py-3 text-sm font-semibold text-white hover:bg-willow-mid transition">Create Activity</button>
                    </div>
                </form>
            </article>
        </section>
    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>