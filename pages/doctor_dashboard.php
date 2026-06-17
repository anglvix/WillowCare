<?php
$page_title = 'Willow Care - Doctor Dashboard';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'doctor-dashboard-view.js';
include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-6xl mx-auto w-full px-6 py-12 flex-grow space-y-8">

        <header class="rounded-3xl border border-gray-100 bg-willow-cream/30 p-6 shadow-sm">
            <p class="text-[13px] uppercase tracking-[0.3em] text-willow-dark font-semibold">Doctor Dashboard</p>
            <div class="mt-4 flex items-center gap-4">
                <div id="doctor-dashboard-avatar" class="w-20 h-20 bg-gray-200 rounded-full bg-cover bg-center shadow-inner"></div>
                <h1 class="text-3xl font-serif font-bold text-willow-dark" id="doctor-dashboard-name">Loading...</h1>
            </div>
            <p class="mt-2 text-sm text-gray-600">Update your doctor profile, contact info, and professional highlights so caregivers can find you faster.</p>
        </header>

        <section class="grid gap-6 lg:grid-cols-3">
            <article class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-1">
                <h2 class="text-lg font-semibold text-willow-dark mb-4">Profile status</h2>
                <p id="doctor-profile-status" class="mt-2 text-sm text-emerald-600 hidden"></p>
                <div class="mt-6 text-sm text-gray-600 space-y-4">
                    <p>Use this dashboard to keep your professional details current. Your photo and highlights help caregivers choose the right specialist.</p>
                    <p>Make sure your contact email and phone are correct so new referrals can reach you quickly.</p>
                </div>
            </article>

            <article class="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                <h2 class="text-lg font-semibold text-willow-dark mb-4">Update doctor profile</h2>

                <form id="doctor-profile-form" class="grid gap-4">
                    <div class="grid gap-2">
                        <label for="doctor-profile-name" class="text-[13px] font-semibold text-gray-600">Full Name</label>
                        <input id="doctor-profile-name" name="name" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" required>
                    </div>

                    <div class="grid gap-2 sm:grid-cols-2">
                        <div class="grid gap-2">
                            <label for="doctor-profile-specialty" class="text-[13px] font-semibold text-gray-600">Specialty</label>
                            <input id="doctor-profile-specialty" name="specialty" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" required>
                        </div>
                        <div class="grid gap-2">
                            <label for="doctor-profile-years-experience" class="text-[13px] font-semibold text-gray-600">Years of experience</label>
                            <input id="doctor-profile-years-experience" name="yearsExperience" type="number" min="0" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" required>
                        </div>
                    </div>

                    <div class="grid gap-2">
                        <label for="doctor-profile-bio" class="text-[13px] font-semibold text-gray-600">Short bio</label>
                        <textarea id="doctor-profile-bio" name="bio" rows="4" class="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="Tell caregivers about your expertise"></textarea>
                    </div>

                    <div class="grid gap-2">
                        <label for="doctor-profile-highlights" class="text-[13px] font-semibold text-gray-600">Highlights</label>
                        <input id="doctor-profile-highlights" name="highlights" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="Add comma-separated highlights">
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2">
                        <div class="grid gap-2">
                            <label for="doctor-profile-region" class="text-[13px] font-semibold text-gray-600">Region</label>
                            <input id="doctor-profile-region" name="region" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid">
                        </div>
                        <div class="grid gap-2">
                            <label for="doctor-profile-address" class="text-[13px] font-semibold text-gray-600">Address</label>
                            <input id="doctor-profile-address" name="address" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid">
                        </div>
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2">
                        <div class="grid gap-2">
                            <label for="doctor-profile-phone" class="text-[13px] font-semibold text-gray-600">Contact phone</label>
                            <input id="doctor-profile-phone" name="contactPhone" type="text" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" placeholder="+351 912 345 678">
                        </div>
                        <div class="grid gap-2">
                            <label for="doctor-profile-email" class="text-[13px] font-semibold text-gray-600">Contact email</label>
                            <input id="doctor-profile-email" name="contactEmail" type="email" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-willow-mid" required>
                        </div>
                    </div>

                    <div class="space-y-1">
                        <label for="doctor-photo-file" class="text-[13px] font-semibold text-gray-600">Profile photo</label>
                        <div class="flex items-center gap-3">
                            <label for="doctor-photo-file" class="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition cursor-pointer">Choose photo</label>
                            <span id="doctor-photo-file-name" class="text-sm text-gray-500 truncate">No file selected</span>
                        </div>
                        <input id="doctor-photo-file" name="photo-file" type="file" accept="image/*" class="hidden" />
                    </div>

                    <button type="submit" class="inline-flex items-center justify-center rounded-xl bg-willow-dark px-5 py-3 text-sm font-semibold text-white hover:bg-willow-mid transition">Save profile</button>
                </form>
            </article>
        </section>

    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>
</html>
