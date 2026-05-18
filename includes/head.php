<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- CSS personalizado -->
    <link rel="stylesheet" href="../css/style.css">
    <!-- Fontes Fontshare -->
    <link href="https://api.fontshare.com/v2/css?f[]=switzer@400,401,500,501,600,601,700,701,1,2&f[]=boska@500&display=swap" rel="stylesheet">
    <!-- Configuração Tailwind -->
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Switzer', 'sans-serif'],
                        gaming: ['Boska', 'sans-serif'],
                    },
                    colors: {
                        black: '#000000ff',
                        granite: '#465e4bff',
                        emerald: '#69b87bff',
                        'light-green': '#91e6a2ff',
                        'tea-green': '#c2eda6ff',
                        beige: '#f4f5daff',
                        white: '#ffffffff',
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
</head>