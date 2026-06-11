<?php
$authScriptVersion = '';
$authFilePath = __DIR__ . '/../js/auth-nav.js';
if (file_exists($authFilePath)) {
    $authScriptVersion = '?v=' . filemtime($authFilePath);
}
$viewScriptVersion = '';
if (isset($page_script)) {
    $viewFilePath = __DIR__ . '/../js/views/' . $page_script;
    if (file_exists($viewFilePath)) {
        $viewScriptVersion = '?v=' . filemtime($viewFilePath);
    }
}
?>
<script type="module" src="<?php echo isset($base_path) ? $base_path : '../'; ?>js/auth-nav.js<?php echo $authScriptVersion; ?>"></script>
<?php if (isset($page_script)): ?>
<script type="module" src="<?php echo isset($base_path) ? $base_path : '../'; ?>js/views/<?php echo htmlspecialchars($page_script, ENT_QUOTES); ?><?php echo $viewScriptVersion; ?>"></script>
<?php endif; ?>
