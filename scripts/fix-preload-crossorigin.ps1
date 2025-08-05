# Script para corregir problemas de preload crossorigin
# Autor: GitHub Copilot
# Fecha: 5 de agosto de 2025

Write-Host "🔧 CORRIGIENDO PROBLEMAS DE PRELOAD CROSSORIGIN..." -ForegroundColor Yellow

# Definir el directorio base
$baseDir = "c:\Users\Rodrigo.DESKTOP-I1TEA6K\source\repos\official-web-friends-party-server-simracing"

# Lista de todos los archivos HTML a procesar
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
        Write-Host "📝 Procesando: $file" -ForegroundColor Green
        
        # Leer el contenido del archivo
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # CORREGIR PRELOAD DE IMÁGENES LOCALES
        Write-Host "  🖼️ Corrigiendo preload de imágenes..." -ForegroundColor Cyan
        
        # Para imágenes locales, NO usar crossorigin
        $content = $content -replace '<link rel="preload" href="/assets/images/Logo-FriendsPartyServerSR\.webp" as="image" crossorigin="anonymous">', '<link rel="preload" href="/assets/images/Logo-FriendsPartyServerSR.webp" as="image">'
        
        # Asegurar que las imágenes en el HTML no tengan crossorigin innecesario
        $content = $content -replace '<img([^>]*) src="/assets/images/([^"]*)"([^>]*) crossorigin="anonymous"([^>]*)>', '<img$1 src="/assets/images/$2"$3$4>'
        
        # OPTIMIZAR PRELOAD EN GENERAL
        Write-Host "  ⚡ Optimizando preload general..." -ForegroundColor Cyan
        
        # Asegurar orden correcto de preload (CSS antes que imágenes para mejor performance)
        $preloadCSS = '<link rel="preload" href="/assets/css/main.css" as="style">'
        $preloadImage = '<link rel="preload" href="/assets/images/Logo-FriendsPartyServerSR.webp" as="image">'
        
        # Si ambos preloads existen, asegurar orden correcto
        if ($content -match $preloadCSS -and $content -match $preloadImage) {
            # Remover ambos preloads existentes
            $content = $content -replace '<link rel="preload" href="/assets/css/main\.css" as="style">', ''
            $content = $content -replace '<link rel="preload" href="/assets/images/Logo-FriendsPartyServerSR\.webp" as="image"[^>]*>', ''
            
            # Agregar preloads en el orden correcto donde estaban los comentarios de precarga
            $content = $content -replace '<!-- Precarga de recursos -->', "<!-- Precarga de recursos -->`n    $preloadCSS`n    $preloadImage"
        }
        
        # Limpiar líneas vacías múltiples
        $content = $content -replace '\n\s*\n\s*\n', "`n`n"
        
        # Guardar el archivo corregido
        Set-Content $file -Value $content -Encoding UTF8
        Write-Host "  ✅ Completado: $file" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️ Archivo no encontrado: $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 ¡PROBLEMAS DE PRELOAD CROSSORIGIN CORREGIDOS!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 CAMBIOS REALIZADOS:" -ForegroundColor Yellow
Write-Host "✅ Eliminado crossorigin innecesario de imágenes locales" -ForegroundColor Green
Write-Host "✅ Preload optimizado para mejor performance" -ForegroundColor Green  
Write-Host "✅ Orden de preload mejorado (CSS antes que imágenes)" -ForegroundColor Green
Write-Host ""
Write-Host "🔧 EXPLICACIÓN DEL PROBLEMA:" -ForegroundColor Yellow
Write-Host "• crossorigin='anonymous' en preload != modo de carga de imagen" -ForegroundColor White
Write-Host "• Para recursos locales, crossorigin no es necesario" -ForegroundColor White
Write-Host "• El navegador ahora puede usar el preload correctamente" -ForegroundColor White
