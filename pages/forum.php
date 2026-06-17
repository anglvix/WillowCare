<?php
$page_title = 'Willow Care - Caregiver Forum';
$html_lang = 'en';
$base_path = '../';
$page_script = 'forum-view.js';
include '../includes/head.php';
?>

<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>


    <main class="max-w-4xl mx-auto w-full px-6 py-12 flex-grow space-y-6">

        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

            <div>

                <h1 class="text-2xl font-serif font-bold text-willow-dark">
                    Community Forum
                </h1>

                <p class="text-sm text-gray-700 mt-1">
                    Connect with caregivers, specialists, and support communities.
                </p>

            </div>

            <div class="flex items-center gap-2">
                <select id="category-filter"
                    class="select-field text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-700 bg-white focus:outline-none focus:border-willow-mid">
                    <option value="all">All categories</option>
                    <option value="Caregiving">Caregiving</option>
                    <option value="Support">Support</option>
                    <option value="Health">Health</option>
                    <option value="Community">Community</option>
                </select>
                <button
                    id="btn-new-topic"
                    class="bg-willow-dark text-white text-sm px-4 py-2 rounded-xl font-medium hover:bg-willow-mid transition">

                    New Topic

                </button>
            </div>

        </div>

        <!-- Forum Topics - filled by forum-view.js -->
        <section id="topic-list" class="space-y-4">
            <p class="text-sm text-gray-700">Loading topics...</p>
        </section>

        <section class="pt-8 pb-4">
            <div class="max-w-4xl mx-auto rounded-[2rem] border border-willow-cream bg-willow-cream/40 p-1 shadow-[0_8px_30px_rgba(70,94,75,0.06)]">
                <div class="rounded-[1.75rem] bg-white px-6 py-10 sm:px-10 sm:py-12 text-center relative overflow-hidden">
                    <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-willow-light via-willow-mid to-willow-accent"></div>
                    <p class="text-[11px] font-bold uppercase tracking-[0.25em] text-willow-mid">Need more help?</p>
                    <h2 class="mt-4 text-3xl sm:text-4xl font-serif font-bold text-willow-dark leading-tight">
                        Contact an organization
                    </h2>
                    <p class="mt-3 max-w-2xl mx-auto text-sm sm:text-[15px] text-gray-500 leading-relaxed">
                        If you need more guidance, connect with groups and associations that can point you toward support, answers, and next steps.
                    </p>
                    <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a href="organizations.php" class="inline-flex items-center justify-center rounded-full bg-willow-dark px-7 py-3 text-sm font-semibold text-white transition hover:bg-willow-mid">
                            Explore organizations
                        </a>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <!-- New Topic Modal -->
    <div id="topic-modal" class="fixed inset-0 bg-black/40 hidden items-center justify-center p-4 z-[100]">
        <form id="topic-form" class="bg-white rounded-2xl w-full max-w-lg p-6 space-y-4">
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-serif font-bold text-willow-dark">New topic</h2>
                <button type="button" id="topic-cancel" class="text-sm text-gray-700 hover:text-gray-700">Close</button>
            </div>

            <div class="space-y-1">
                <label class="text-[13px] font-bold text-gray-600">Title</label>
                <input name="title" type="text" maxlength="80" required
                    class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-willow-mid" />
            </div>

            <div class="space-y-1">
                <label class="text-[13px] font-bold text-gray-600">Category</label>
                <select name="category" required
                    class="select-field w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-willow-mid">
                    <option value="Caregiving">Caregiving</option>
                    <option value="Support">Support</option>
                    <option value="Health">Health</option>
                    <option value="Community">Community</option>
                </select>
            </div>

            <div class="space-y-1">
                <label class="text-[13px] font-bold text-gray-600">Content</label>
                <textarea name="content" rows="4" maxlength="400" required
                    class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-willow-mid"></textarea>
            </div>

            <p id="topic-error" class="text-sm text-red-500 hidden">Something went wrong. Please try again.</p>

            <div class="flex justify-end gap-2">
                <button type="button" id="topic-cancel-secondary"
                    class="text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50">Cancel</button>
                <button type="submit" id="topic-submit"
                    class="bg-willow-dark text-white text-xs px-4 py-2 rounded-xl font-medium hover:bg-willow-mid transition">Publish</button>
            </div>
        </form>
    </div>

    <!-- Replies Modal -->
    <div id="reply-modal" class="fixed inset-0 bg-black/40 hidden items-center justify-center p-4 z-[100]">
        <div class="bg-white rounded-2xl w-full max-w-xl p-6 space-y-4">
            <div class="flex items-start justify-between gap-4">
                <div>
                    <h2 class="text-lg font-serif font-bold text-willow-dark">Replies</h2>
                    <p id="reply-topic-title" class="text-sm text-gray-700 mt-1"></p>
                </div>
                <button type="button" id="reply-close" class="text-sm text-gray-500 hover:text-gray-700">Close</button>
            </div>

            <div id="reply-list" class="space-y-3 max-h-[45vh] overflow-y-auto"></div>

            <form id="reply-form" class="space-y-3">
                <div class="space-y-1">
                    <label class="text-[13px] font-bold text-gray-600">Add a reply</label>
                    <textarea id="reply-content" rows="3" maxlength="300" required
                        class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-willow-mid"></textarea>
                </div>

                <p id="reply-error" class="text-sm text-red-500 hidden">Unable to post reply. Please try again.</p>

                <div class="flex justify-end gap-2">
                    <button type="button" id="reply-cancel"
                        class="text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50">Cancel</button>
                    <button type="submit" id="reply-submit"
                        class="bg-willow-dark text-white text-xs px-4 py-2 rounded-xl font-medium hover:bg-willow-mid transition">Reply</button>
                </div>
            </form>
        </div>
    </div>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>

</html>