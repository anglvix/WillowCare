<?php
$page_title = 'Willow Care - School Dashboard';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'school-dashboard-view.js';
include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-6xl mx-auto w-full px-6 py-12 flex-grow space-y-8">

        <header class="rounded-3xl border border-gray-100 bg-willow-cream/30 p-6 shadow-sm">
            <p class="text-[10px] uppercase tracking-[0.3em] text-willow-dark font-semibold">School Dashboard</p>
            <h1 class="mt-4 text-3xl font-serif font-bold text-willow-dark" id="school-dashboard-name">Loading...</h1>
            <p class="mt-2 text-sm text-gray-600">Update your school profile and publish new workshops or excursions directly from your dashboard.</p>
        </header>

        <section class="grid gap-6 lg:grid-cols-3">
            <article class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-1">
                <h2 class="text-lg font-semibold text-willow-dark mb-4">School profile</h2>

                <div class="grid gap-3 text-sm text-gray-600">
                    <div>
                        <p class="text-[11px] uppercase tracking-[0.2em] text-gray-500">Profile status</p>
                        <p id="school-profile-status" class="mt-2 text-xs text-emerald-600 hidden"></p>
                    </div>

                    <div>
                        <p class="text-[11px] uppercase tracking-[0.2em] text-gray-500">Activities published</p>
                        <p id="school-activity-count" class="mt-2 text-3xl font-bold text-willow-dark">-</p>
                    </div>
                </div>
            </article>

            <article class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                <h2 class="text-lg font-semibold text-willow-dark mb-4">Update school profile</h2>

                <form id="school-profile-form" class="grid gap-4">
                    <div class="grid gap-2">
                        <label for="school-profile-name" class="text-[11px] font-semibold text-gray-600">School name</label>
                        <input id="school-profile-name" name="name" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" required>
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2">
                        <div class="grid gap-2">
                            <label for="school-profile-district" class="text-[11px] font-semibold text-gray-600">District</label>
                            <input id="school-profile-district" name="district" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid">
                        </div>
                        <div class="grid gap-2">
                            <label for="school-profile-location" class="text-[11px] font-semibold text-gray-600">Location</label>
                            <input id="school-profile-location" name="location" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid">
                        </div>
                    </div>

                    <div class="grid gap-2">
                        <label for="school-profile-type" class="text-[11px] font-semibold text-gray-600">School type</label>
                        <input id="school-profile-type" name="type" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="e.g. Public, Private, Inclusive">
                    </div>

                    <div class="grid gap-2">
                        <label for="school-profile-description" class="text-[11px] font-semibold text-gray-600">Description</label>
                        <textarea id="school-profile-description" name="description" rows="4" class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="A short description of the school"></textarea>
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2">
                        <div class="grid gap-2">
                            <label for="school-profile-phone" class="text-[11px] font-semibold text-gray-600">Contact phone</label>
                            <input id="school-profile-phone" name="contactPhone" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="+351 912 345 678">
                        </div>
                        <div class="grid gap-2">
                            <label for="school-profile-email" class="text-[11px] font-semibold text-gray-600">Contact email</label>
                            <input id="school-profile-email" name="contactEmail" type="email" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="contact@school.pt">
                        </div>
                    </div>

                    <div class="grid gap-2">
                        <label for="school-profile-address" class="text-[11px] font-semibold text-gray-600">Address</label>
                        <input id="school-profile-address" name="address" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="Street, city, postal code">
                    </div>

                    <div class="grid gap-2">
                        <label for="school-profile-features" class="text-[11px] font-semibold text-gray-600">Support features</label>
                        <input id="school-profile-features" name="supportFeatures" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="Separate features with commas">
                    </div>

                    <button type="submit" class="inline-flex items-center justify-center rounded-xl bg-willow-dark px-5 py-3 text-sm font-semibold text-white hover:bg-willow-mid transition">Save profile</button>
                </form>
            </article>
        </section>

        <section class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 class="text-lg font-semibold text-willow-dark">Create a new activity</h2>
                    <p class="text-sm text-gray-500">Publish a workshop or excursion under your school.</p>
                </div>
                <p id="school-activity-status" class="text-sm text-emerald-600 hidden"></p>
            </div>

            <form id="school-activity-form" class="mt-6 grid gap-4">
                <div class="grid gap-2 sm:grid-cols-2">
                    <div class="grid gap-2">
                        <label for="school-activity-type" class="text-[11px] font-semibold text-gray-600">Activity type</label>
                        <select id="school-activity-type" name="type" class="select-field w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-willow-mid">
                            <option value="workshop">Workshop</option>
                            <option value="excursion">Excursion</option>
                        </select>
                    </div>
                    <div class="grid gap-2">
                        <label for="school-activity-title" class="text-[11px] font-semibold text-gray-600">Title</label>
                        <input id="school-activity-title" name="title" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" required>
                    </div>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                    <div class="grid gap-2">
                        <label for="school-activity-date" class="text-[11px] font-semibold text-gray-600">Date</label>
                        <input id="school-activity-date" name="date" type="date" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" required>
                    </div>
                    <div class="grid gap-2">
                        <label for="school-activity-location" class="text-[11px] font-semibold text-gray-600">Location</label>
                        <input id="school-activity-location" name="location" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" required>
                    </div>
                </div>

                <div class="grid gap-2">
                    <label for="school-activity-description" class="text-[11px] font-semibold text-gray-600">Description</label>
                    <textarea id="school-activity-description" name="description" rows="4" class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" required></textarea>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                    <div class="grid gap-2">
                        <label for="school-activity-category" class="text-[11px] font-semibold text-gray-600">Category</label>
                        <input id="school-activity-category" name="category" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" required>
                    </div>
                    <div class="grid gap-2">
                        <label for="school-activity-age-group" class="text-[11px] font-semibold text-gray-600">Age group</label>
                        <input id="school-activity-age-group" name="ageGroup" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="e.g. 4-8">
                    </div>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                    <div class="grid gap-2">
                        <label for="school-activity-sensory-focus" class="text-[11px] font-semibold text-gray-600">Sensory focus</label>
                        <input id="school-activity-sensory-focus" name="sensoryFocus" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="e.g. nature">
                    </div>
                    <div class="grid gap-2">
                        <label for="school-activity-image" class="text-[11px] font-semibold text-gray-600">Image URL</label>
                        <input id="school-activity-image" name="image" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="Optional image URL">
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
