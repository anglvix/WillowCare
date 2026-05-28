<?php
//se o url pedido for a raiz ou index.php, redireciona para a página principal

if ($_SERVER['REQUEST_URI'] === '/' || $_SERVER['REQUEST_URI'] === '/index.php') {
    header('Location: /pages/index.php');
    exit;
}
return false;
