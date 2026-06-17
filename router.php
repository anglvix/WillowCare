<?php
//se o url pedido for a raiz ou index.php, redireciona para a página principal

$base_path = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
if (substr($base_path, -6) === '/pages') {
    $base_path = substr($base_path, 0, -6);
}
$base_path = $base_path === '' ? '' : $base_path;

if ($_SERVER['REQUEST_URI'] === '/' || $_SERVER['REQUEST_URI'] === '/index.php') {
    header('Location: ' . $base_path . '/pages/index.php');
    exit;
}
return false;
