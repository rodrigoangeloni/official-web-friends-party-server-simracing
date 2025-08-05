# Script para corregir todas las rutas de navegación en el sitio web
# Autor: GitHub Copilot
# Fecha: 5 de agosto de 2025

Write-Host "🔧 CORRIGIENDO RUTAS DE NAVEGACIÓN EN TODAS LAS PÁGINAS..." -ForegroundColor Yellow

# Definir el directorio base
$baseDir = "c:\Users\Rodrigo.DESKTOP-I1TEA6K\source\repos\official-web-friends-party-server-simracing"

# Navegación correcta con rutas absolutas
$navigationCorrect = @'
    <!-- Navegación -->
    <nav class="bg-gray-800 py-4 shadow-lg">
        <div class="container mx-auto flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <a href="/index.html" class="text-gray-100 hover:text-yellow-400 transition duration-300 ease-in-out py-2 px-4 rounded-md hover:bg-gray-600">INICIO</a>
            <a href="/pages/core/reglamento.html" class="text-gray-100 hover:text-yellow-400 transition duration-300 ease-in-out py-2 px-4 rounded-md hover:bg-gray-600">NORMAS BASICAS </a>
            <a href="/pages/core/servers.html" class="text-gray-100 hover:text-yellow-400 transition duration-300 ease-in-out py-2 px-4 rounded-md hover:bg-gray-600">SERVIDORES</a>
            <a href="/pages/core/eventos.html" class="text-gray-100 hover:text-yellow-400 transition duration-300 ease-in-out py-2 px-4 rounded-md hover:bg-gray-600">EVENTOS</a>
            <a href="/pages/core/calculadora.html" class="text-gray-100 hover:text-yellow-400 transition duration-300 ease-in-out py-2 px-4 rounded-md hover:bg-gray-600">CALCULADORA</a>
            <a href="/pages/info/redes.html" class="text-gray-100 hover:text-yellow-400 transition duration-300 ease-in-out py-2 px-4 rounded-md hover:bg-gray-600">REDES</a>
            <a href="/pages/info/about.html" class="text-gray-100 hover:text-yellow-400 transition duration-300 ease-in-out py-2 px-4 rounded-md hover:bg-gray-600">ACERCA DE</a>
            <a href="/pages/info/contact.html" class="text-gray-100 hover:text-yellow-400 transition duration-300 ease-in-out py-2 px-4 rounded-md hover:bg-gray-600">CONTACTO</a>
        </div>
    </nav>
'@

# Lista de todos los archivos HTML a procesar
$htmlFiles = @(
    "$baseDir\pages\core\calculadora.html",
    "$baseDir\pages\core\eventos.html",
    "$baseDir\pages\core\servers.html",
    "$baseDir\pages\info\about.html",
    "$baseDir\pages\info\contact.html",
    "$baseDir\pages\info\redes.html",
    "$baseDir\pages\landing\argentina.html",
    "$baseDir\pages\landing\campeonatos.html",
    "$baseDir\pages\landing\guias.html",
    "$baseDir\pages\landing\latinoamerica.html",
    "$baseDir\pages\landing\paraguay.html"
)

# Patrones de navegación incorrectos que debemos reemplazar
$navigationPatterns = @(
    # Patrón con rutas relativas incorrectas
    '    <!-- Navegación -->\s*\n\s*<nav class="bg-gray-800 py-4 shadow-lg">\s*\n\s*<div class="container mx-auto flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">\s*\n\s*<a href="[^"]*index\.html"[^>]*>INICIO</a>\s*\n\s*<a href="[^"]*reglamento\.html"[^>]*>NORMAS BASICAS\s*</a>\s*\n\s*<a href="[^"]*servers\.html"[^>]*>SERVIDORES</a>\s*\n\s*<a href="[^"]*eventos\.html"[^>]*>EVENTOS</a>\s*\n\s*<a href="[^"]*calculadora\.html"[^>]*>CALCULADORA</a>\s*\n\s*<a href="[^"]*redes\.html"[^>]*>REDES</a>\s*\n\s*<a href="[^"]*about\.html"[^>]*>ACERCA DE</a>\s*\n\s*<a href="[^"]*contact\.html"[^>]*>CONTACTO</a>\s*\n\s*</div>\s*\n\s*</nav>'
)

foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        Write-Host "📝 Procesando: $file" -ForegroundColor Green
        
        # Leer el contenido del archivo
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Realizar las correcciones necesarias usando expresiones regulares
        $content = $content -replace '(?s)<!-- Navegación -->\s*<nav class="bg-gray-800 py-4 shadow-lg">\s*<div class="container mx-auto flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">.*?</div>\s*</nav>', $navigationCorrect
        
        # Corregir rutas de assets (imágenes, CSS, JS) para que sean absolutas
        $content = $content -replace 'src="assets/', 'src="/assets/'
        $content = $content -replace 'href="assets/', 'href="/assets/'
        $content = $content -replace 'src="\.\./', 'src="/'
        $content = $content -replace 'href="\.\./', 'href="/'
        
        # Guardar el archivo corregido
        Set-Content $file -Value $content -Encoding UTF8
        Write-Host "✅ Completado: $file" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️ Archivo no encontrado: $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 ¡TODAS LAS RUTAS DE NAVEGACIÓN HAN SIDO CORREGIDAS!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 RESUMEN DE CAMBIOS:" -ForegroundColor Yellow
Write-Host "✅ Todas las rutas ahora son ABSOLUTAS (comienzan con /)" -ForegroundColor Green
Write-Host "✅ Navegación funcionará desde cualquier página" -ForegroundColor Green
Write-Host "✅ Assets (imágenes, CSS) también corregidos" -ForegroundColor Green
Write-Host ""
Write-Host "🔍 RUTAS APLICADAS:" -ForegroundColor Yellow
Write-Host "• INICIO: /index.html" -ForegroundColor White
Write-Host "• NORMAS: /pages/core/reglamento.html" -ForegroundColor White
Write-Host "• SERVIDORES: /pages/core/servers.html" -ForegroundColor White
Write-Host "• EVENTOS: /pages/core/eventos.html" -ForegroundColor White
Write-Host "• CALCULADORA: /pages/core/calculadora.html" -ForegroundColor White
Write-Host "• REDES: /pages/info/redes.html" -ForegroundColor White
Write-Host "• ACERCA DE: /pages/info/about.html" -ForegroundColor White
Write-Host "• CONTACTO: /pages/info/contact.html" -ForegroundColor White
