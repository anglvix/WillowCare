<?php
$page_title = 'Willow Care - Organization';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'organization-detail-view.js';
include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="max-w-3xl mx-auto w-full px-6 py-12 flex-grow space-y-6">

        <!-- Header Card -->
        <section class="flex flex-col sm:flex-row items-center gap-4 bg-willow-dark text-white p-6 rounded-2xl shadow-sm">

            <div id="org-initials" class="w-16 h-16 bg-white text-willow-dark rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                ...
            </div>

            <div class="text-center sm:text-left">
                <h1 id="org-name" class="text-xl font-serif font-bold">
                    A carregar...
                </h1>
                <p id="org-description" class="text-xs text-white mt-1"></p>
                <div class="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
                    <button id="btn-save-org" class="bg-willow-mid text-black text-xs font-semibold px-4 py-2 rounded-xl hover:bg-willow-light transition">
                        Save Organization
                    </button>
                    <button id="btn-post-review" class="bg-willow-mid text-black text-xs font-semibold px-4 py-2 rounded-xl shadow hover:bg-willow-light transition">
                        Post Review
                    </button>
                    <button id="btn-reviews" class="bg-willow-mid text-black text-xs font-semibold px-4 py-2 rounded-xl hover:bg-willow-light transition">
                        Reviews
                    </button>
                </div>
            </div>

        </section>

        <!-- Contact & Address -->
        <section class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <h3 class="font-bold text-sm text-gray-800 mb-2">Contact</h3>
                    <p id="org-contact" class="text-xs text-gray-600">-</p>
                </div>
                <div>
                    <h3 class="font-bold text-sm text-gray-800 mb-2">Address</h3>
                    <p id="org-address" class="text-xs text-gray-600">-</p>
                </div>
            </div>
        </section>

        <!-- Services -->
        <section id="org-services" class="flex flex-wrap gap-3">
        </section>

        <!-- Mission -->
        <section class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 class="font-bold text-sm text-gray-800">Mission & Activities</h3>
            <p id="org-mission" class="text-xs text-gray-600 leading-relaxed mt-2"></p>
        </section>
    </main>
    <div id="review-modal" class="fixed inset-0 bg-black/40 hidden flex items-center justify-center p-4 z-[110]">
        <form id="review-form" class="bg-white rounded-2xl w-full max-w-lg p-6 space-y-4">
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-serif font-bold text-willow-dark">Write a review</h2>
                <button type="button" id="review-cancel" class="text-xs text-gray-500 hover:text-gray-700">Close</button>
            </div>
            <div class="grid grid-cols-1 gap-3">
                <label for="review-rating" class="text-[11px] font-bold text-gray-600">Rating</label>
                <select id="review-rating" name="rating" required class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-willow-mid">
                    <option value="">Select rating</option>
                    <option value="5">5 — Excellent</option>
                    <option value="4">4 — Very good</option>
                    <option value="3">3 — Good</option>
                    <option value="2">2 — Fair</option>
                    <option value="1">1 — Poor</option>
                </select>
                <label for="review-title" class="text-[11px] font-bold text-gray-600">Title (optional)</label>
                <input id="review-title" name="title" type="text" maxlength="80" class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-willow-mid" />
                <label for="review-content" class="text-[11px] font-bold text-gray-600">Your review</label>
                <textarea id="review-content" name="content" rows="5" maxlength="1000" required class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-willow-mid"></textarea>
                <label class="inline-flex items-center gap-2 text-sm text-gray-600">
                    <input id="review-anonymous" type="checkbox" class="form-checkbox" />
                    <span>Post anonymously</span>
                </label>
            </div>
            <p id="review-error" class="text-xs text-red-500 hidden">Please fill in all required fields.</p>
            <div class="flex justify-end gap-2">
                <button type="button" id="review-cancel-secondary" class="text-xs px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50">Cancel</button>
                <button type="submit" id="review-submit" class="bg-willow-dark text-white text-xs px-4 py-2 rounded-xl font-medium hover:bg-willow-mid transition">Publish review</button>
            </div>
        </form>
    </div>

    <div id="reviews-modal" class="fixed inset-0 bg-black/40 hidden flex items-center justify-center p-4 z-[115]">
        <div class="bg-white rounded-2xl w-full max-w-3xl p-6 space-y-4">
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-serif font-bold text-willow-dark">Organization reviews</h2>
                <button type="button" id="reviews-close" class="text-xs text-gray-500 hover:text-gray-700">Close</button>
            </div>
            <div id="reviews-list" class="space-y-4 min-h-[120px] text-sm text-gray-600">
                <p class="text-gray-500">Loading reviews…</p>
            </div>
            <div class="flex justify-end gap-2">
                <button type="button" id="reviews-close-secondary" class="text-xs px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50">Close</button>
            </div>
        </div>
    </div>
    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>
