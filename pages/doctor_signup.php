<?php
$page_title = 'Willow Care - Doctor Sign Up';
$html_lang = 'pt';
$base_path = '../';
$page_script = 'doctor-signup-view.js';
include '../includes/head.php';
?>
<body class="bg-white font-sans antialiased text-gray-900 min-h-screen flex flex-col">

    <?php include '../includes/navbar.php'; ?>

    <main class="flex-grow flex items-center justify-center py-12 px-6 bg-gray-50">
        <div class="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[650px]">
            <div class="bg-willow-dark hidden md:flex flex-col justify-center items-center p-12 text-center text-white">
                <h3 class="text-2xl font-serif font-bold mb-4">Register as a doctor</h3>
                <p class="text-sm text-gray-300 leading-relaxed max-w-xs">Submit your professional details and upload verified proof of your degree or medical certification.</p>
            </div>

            <div class="p-10 flex flex-col justify-center">
                <h2 class="text-xl font-serif font-bold text-willow-dark mb-1">Doctor Account</h2>
                <p class="text-sm text-gray-600 mb-6">Provide your information and certification to join the Willow Care medical community.</p>
                <p id="doctor-signup-error" class="text-sm text-red-500"></p>
                <form id="doctor-signup-form" class="space-y-4">
                    <div>
                        <label class="block text-[13px] font-bold text-gray-600">Full Name</label>
                        <input type="text" name="fullname" required class="w-full border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-willow-mid" placeholder="Dr. Ana Castro">
                    </div>
                    <div>
                        <label class="block text-[13px] font-bold text-gray-600">Email Address</label>
                        <input type="email" name="email" required class="w-full border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-willow-mid" placeholder="ana@clinic.com">
                    </div>
                    <div>
                        <label class="block text-[13px] font-bold text-gray-600">Password</label>
                        <input type="password" name="password" required class="w-full border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-willow-mid" placeholder="••••••••">
                    </div>
                    <div>
                        <label class="block text-[13px] font-bold text-gray-600">Phone</label>
                        <input type="text" name="phone" class="w-full border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-willow-mid" placeholder="+351 912 345 678">
                    </div>
                    <div>
                        <label class="block text-[13px] font-bold text-gray-600">Address</label>
                        <input type="text" name="address" class="w-full border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-willow-mid" placeholder="Street, city, postal code">
                    </div>
                    <div>
                        <label class="block text-[13px] font-bold text-gray-600">Specialty</label>
                        <input type="text" name="specialty" class="w-full border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-willow-mid" placeholder="Pediatrics, Cardiology, Neurology">
                    </div>
                    <div>
                        <label class="block text-[13px] font-bold text-gray-600">Proof of Degree / Certification</label>
                        <input type="file" name="certification" accept="image/*" class="w-full text-[13px] text-gray-600" />
                        <p class="text-[13px] text-gray-400 mt-2">Upload an image of your license, diploma, or other official certification.</p>
                    </div>
                    <div class="space-y-2">
                        <img id="cert-preview" class="hidden w-full rounded-2xl border border-gray-200 object-cover max-h-48" alt="Certification preview">
                    </div>
                    <button type="submit" class="w-full bg-willow-mid text-white rounded-xl py-2.5 text-xs font-semibold hover:bg-willow-dark transition mt-3">Create Doctor Account</button>
                </form>
            </div>
        </div>
    </main>

    <?php include '../includes/footer.php'; ?>
    <?php include '../includes/scripts.php'; ?>

</body>
</html>
