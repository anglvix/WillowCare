<script type="module" src="<?php echo isset($base_path) ? $base_path : '../'; ?>js/auth-nav.js"></script>
<?php if (isset($page_script)): ?>
<script type="module" src="<?php echo isset($base_path) ? $base_path : '../'; ?>js/views/<?php echo htmlspecialchars($page_script, ENT_QUOTES); ?>"></script>
<?php endif; ?>
