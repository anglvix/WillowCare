<?php
if (!isset($page_title)) $page_title = 'Willow Care';
if (!isset($html_lang)) $html_lang = 'pt';

// Normalize base path for assets when pages set relative values like "../"
if (!isset($base_path) || !preg_match('/^(\/|https?:)/', $base_path)) {
    $base_path = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
    if (substr($base_path, -6) === '/pages') {
        $base_path = substr($base_path, 0, -6);
    }
    $base_path = $base_path === '' ? '/' : $base_path . '/';
}
// Cache-busting for local CSS updates
$css_version = @filemtime(__DIR__ . '/../css/style.css') ?: time();
?>
<!DOCTYPE html>
<html lang="<?php echo htmlspecialchars($html_lang, ENT_QUOTES); ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($page_title, ENT_QUOTES); ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- CSS personalizado -->
    <link rel="stylesheet" href="<?php echo $base_path; ?>css/style.css?v=<?php echo $css_version; ?>">
    <!-- Fontes Fontshare -->
    <link href="https://api.fontshare.com/v2/css?f[]=switzer@400,401,500,501,600,601,700,701,1,2&f[]=boska@500&display=swap" rel="stylesheet">
    <!-- Configuração Tailwind -->
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        serif: ['Switzer', 'sans-serif'],
                        sans: ['Switzer', 'sans-serif'],
                        gaming: ['Boska', 'sans-serif'],
                    },
                    colors: {
                        willow: {
                            dark: '#465E4B',
                            mid: '#69B87B',
                            accent: '#91E6A2',
                            light: '#C2EDA6',
                            cream: '#F4F5DA'
                        }
                    },
                    animation: {
                        'fade-in': 'fadeIn 0.6s ease-out forwards',
                    },
                    keyframes: {
                        fadeIn: {
                            '0%': { opacity: '0', transform: 'translateY(20px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' },
                        }
                    }
                }
            }
        }
    </script>
    <style>
        body { -webkit-font-smoothing: antialiased; }
        .figma-card-shape {
            clip-path: polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%, 0 16px);
        }
    </style>
</head>