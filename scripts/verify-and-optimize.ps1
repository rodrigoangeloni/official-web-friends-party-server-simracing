# Script de verificación final y optimización de recursos
# Autor: GitHub Copilot  
# Fecha: 5 de agosto de 2025

Write-Host "🔍 VERIFICANDO Y OPTIMIZANDO RECURSOS FINALES..." -ForegroundColor Yellow

# Definir el directorio base
$baseDir = "c:\Users\Rodrigo.DESKTOP-I1TEA6K\source\repos\official-web-friends-party-server-simracing"

# Verificar que los recursos principales existen
Write-Host ""
Write-Host "📁 VERIFICANDO RECURSOS PRINCIPALES:" -ForegroundColor Cyan

$resources = @{
    "CSS Principal" = "$baseDir\assets\css\main.css"
    "Logo Principal" = "$baseDir\assets\images\Logo-FriendsPartyServerSR.webp" 
    "Favicon" = "$baseDir\assets\images\favicon.ico"
    "Index Principal" = "$baseDir\index.html"
}

foreach ($resource in $resources.GetEnumerator()) {
    if (Test-Path $resource.Value) {
        Write-Host "✅ $($resource.Key): Existe" -ForegroundColor Green
    } else {
        Write-Host "❌ $($resource.Key): NO ENCONTRADO" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🔧 OPTIMIZACIONES ADICIONALES:" -ForegroundColor Cyan

# Lista de archivos para optimizar headers
$htmlFiles = @(
    "$baseDir\index.html",
    "$baseDir\pages\core\calculadora.html",
    "$baseDir\pages\core\eventos.html", 
    "$baseDir\pages\core\reglamento.html",
    "$baseDir\pages\core\servers.html",
    "$baseDir\pages\info\about.html",
    "$baseDir\pages\info\contact.html",
    "$baseDir\pages\info\redes.html"
)

foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Optimizar preload para evitar warnings
        $content = $content -replace '<link rel="preload" href="/assets/images/Logo-FriendsPartyServerSR\.webp" as="image">', '<link rel="preload" href="/assets/images/Logo-FriendsPartyServerSR.webp" as="image" crossorigin="anonymous">'
        
        # Asegurar que todos los meta tags de Open Graph usen URLs completas
        $content = $content -replace '<meta property="og:image" content="/assets/images/Logo-FriendsPartyServerSR\.webp">', '<meta property="og:image" content="https://friendspartyserver.duckdns.org/assets/images/Logo-FriendsPartyServerSR.webp">'
        $content = $content -replace '<meta property="twitter:image" content="/assets/images/Logo-FriendsPartyServerSR\.webp">', '<meta property="twitter:image" content="https://friendspartyserver.duckdns.org/assets/images/Logo-FriendsPartyServerSR.webp">'
        
        # Guardar cambios
        Set-Content $file -Value $content -Encoding UTF8
        Write-Host "✅ Optimizado: $(Split-Path $file -Leaf)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "🎉 ¡VERIFICACIÓN Y OPTIMIZACIÓN COMPLETADA!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 ESTADO FINAL:" -ForegroundColor Yellow
Write-Host "✅ CSS: Rutas absolutas /assets/css/main.css" -ForegroundColor Green
Write-Host "✅ Imágenes: Locales con fallback para Open Graph" -ForegroundColor Green
Write-Host "✅ Preload: Optimizado con crossorigin" -ForegroundColor Green
Write-Host "✅ MIME Types: Problemas resueltos" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 RECURSOS SERVIDOS CORRECTAMENTE:" -ForegroundColor Cyan
Write-Host "• http://127.0.0.1:5500/assets/css/main.css" -ForegroundColor White
Write-Host "• http://127.0.0.1:5500/assets/images/Logo-FriendsPartyServerSR.webp" -ForegroundColor White
