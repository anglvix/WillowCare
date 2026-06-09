<?php
$page_title = 'Willow Care - Organization Dashboard';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'organization-dashboard-view.js';
include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-6xl mx-auto w-full px-6 py-12 flex-grow space-y-8">

        <header class="rounded-3xl border border-gray-100 bg-willow-cream/30 p-6 shadow-sm">
            <p class="text-[10px] uppercase tracking-[0.3em] text-willow-dark font-semibold">Organization Dashboard</p>
            <h1 class="mt-4 text-3xl font-serif font-bold text-willow-dark" id="org-dashboard-name">Loading...</h1>
            <p class="mt-2 text-sm text-gray-600">Edit your organization profile and publish activities for caregivers to discover.</p>
        </header>

        <section class="grid gap-6 lg:grid-cols-3">
            <article class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-1">
                <h2 class="text-lg font-semibold text-willow-dark mb-4">Organization overview</h2>

                <div class="grid gap-3 text-sm text-gray-600">
                    <div>
                        <p class="text-[11px] uppercase tracking-[0.2em] text-gray-500">Profile status</p>
                        <p id="org-profile-status" class="mt-2 text-xs text-emerald-600 hidden"></p>
                    </div>

                    <div>
                        <p class="text-[11px] uppercase tracking-[0.2em] text-gray-500">Activities published</p>
                        <p id="org-activity-count" class="mt-2 text-3xl font-bold text-willow-dark">-</p>
                    </div>
                </div>
            </article>

            <article class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                <h2 class="text-lg font-semibold text-willow-dark mb-4">Update organization profile</h2>

                <form id="org-profile-form" class="grid gap-4">
                    <div class="grid gap-2">
                        <label for="org-profile-name" class="text-[11px] font-semibold text-gray-600">Organization name</label>
                        <input id="org-profile-name" name="name" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" required>
                    </div>

                    <div class="grid gap-2 sm:grid-cols-2">
                        <div class="grid gap-2">
                            <label for="org-profile-initials" class="text-[11px] font-semibold text-gray-600">Initials</label>
                            <input id="org-profile-initials" name="initials" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid">
                        </div>
                        <div class="grid gap-2">
                            <label for="org-profile-services" class="text-[11px] font-semibold text-gray-600">Services</label>
                            <input id="org-profile-services" name="services" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="Separate services with commas">
                        </div>
                    </div>

                    <div class="grid gap-2">
                        <label for="org-profile-description" class="text-[11px] font-semibold text-gray-600">Description</label>
                        <textarea id="org-profile-description" name="description" rows="4" class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="A short description of your organization"></textarea>
                    </div>

                    <div class="grid gap-2">
                        <label for="org-profile-mission" class="text-[11px] font-semibold text-gray-600">Mission</label>
                        <textarea id="org-profile-mission" name="mission" rows="4" class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="Your organization's mission"></textarea>
                    </div>

                    <button type="submit" class="inline-flex items-center justify-center rounded-xl bg-willow-dark px-5 py-3 text-sm font-semibold text-white hover:bg-willow-mid transition">Save profile</button>
                </form>
            </article>
        </section>

        <section class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 class="text-lg font-semibold text-willow-dark">Create a new activity</h2>
                    <p class="text-sm text-gray-500">Publish a workshop or excursion as your organization.</p>
                </div>
                <p id="org-activity-status" class="text-sm text-emerald-600 hidden"></p>
            </div>

            <form id="org-activity-form" class="mt-6 grid gap-4">
                <div class="grid gap-2 sm:grid-cols-2">
                    <div class="grid gap-2">
                        <label for="org-activity-type" class="text-[11px] font-semibold text-gray-600">Activity type</label>
                        <select id="org-activity-type" name="type" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid">
                            <option value="workshop">Workshop</option>
                            <option value="excursion">Excursion</option>
                        </select>
                    </div>
                    <div class="grid gap-2">
                        <label for="org-activity-title" class="text-[11px] font-semibold text-gray-600">Title</label>
                        <input id="org-activity-title" name="title" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" required>
                    </div>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                    <div class="grid gap-2">
                        <label for="org-activity-date" class="text-[11px] font-semibold text-gray-600">Date</label>
                        <input id="org-activity-date" name="date" type="date" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" required>
                    </div>
                    <div class="grid gap-2">
                        <label for="org-activity-location" class="text-[11px] font-semibold text-gray-600">Location</label>
                        <input id="org-activity-location" name="location" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" required>
                    </div>
                </div>

                <div class="grid gap-2">
                    <label for="org-activity-description" class="text-[11px] font-semibold text-gray-600">Description</label>
                    <textarea id="org-activity-description" name="description" rows="4" class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" required></textarea>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                    <div class="grid gap-2">
                        <label for="org-activity-category" class="text-[11px] font-semibold text-gray-600">Category</label>
                        <input id="org-activity-category" name="category" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" required>
                    </div>
                    <div class="grid gap-2">
                        <label for="org-activity-age-group" class="text-[11px] font-semibold text-gray-600">Age group</label>
                        <input id="org-activity-age-group" name="ageGroup" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="e.g. 4-8">
                    </div>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                    <div class="grid gap-2">
                        <label for="org-activity-sensory-focus" class="text-[11px] font-semibold text-gray-600">Sensory focus</label>
                        <input id="org-activity-sensory-focus" name="sensoryFocus" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="e.g. nature">
                    </div>
                    <div class="grid gap-2">
                        <label for="org-activity-image" class="text-[11px] font-semibold text-gray-600">Image URL</label>
                        <input id="org-activity-image" name="image" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="Optional image URL">
                    </div>
                </div>

                <button type="submit" class="inline-flex items-center justify-center rounded-xl bg-willow-dark px-5 py-3 text-sm font-semibold text-white hover:bg-willow-mid transition">Publish activity</button>
            </form>
        </section>

    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>
