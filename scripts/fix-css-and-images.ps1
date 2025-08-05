# Script para corregir problemas de CSS, imágenes y recursos
# Autor: GitHub Copilot
# Fecha: 5 de agosto de 2025

Write-Host "🔧 CORRIGIENDO PROBLEMAS DE CSS E IMÁGENES..." -ForegroundColor Yellow

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
        
        # 1. CORREGIR RUTAS DE CSS
        Write-Host "  🎨 Corrigiendo rutas de CSS..." -ForegroundColor Cyan
        
        # Reemplazar cualquier referencia incorrecta de CSS
        $content = $content -replace 'href="styles\.css"', 'href="/assets/css/main.css"'
        $content = $content -replace 'href="\.\.\/styles\.css"', 'href="/assets/css/main.css"'
        $content = $content -replace 'href="\.\.\/\.\.\/styles\.css"', 'href="/assets/css/main.css"'
        $content = $content -replace 'href="pages/info/styles\.css"', 'href="/assets/css/main.css"'
        $content = $content -replace 'href="pages/core/styles\.css"', 'href="/assets/css/main.css"'
        
        # 2. CORREGIR IMÁGENES REMOTAS A LOCALES
        Write-Host "  🖼️ Cambiando imágenes remotas a locales..." -ForegroundColor Cyan
        
        # Cambiar la imagen remota del logo a local
        $content = $content -replace 'https://i\.ibb\.co/nNnx250S/00-logo-fps-transparent1\.png', '/assets/images/Logo-FriendsPartyServerSR.webp'
        
        # 3. CORREGIR PRELOAD DE RECURSOS
        Write-Host "  ⚡ Corrigiendo preload de recursos..." -ForegroundColor Cyan
        
        # Actualizar preload para usar recursos locales
        $content = $content -replace '<link rel="preload" href="https://i\.ibb\.co/nNnx250S/00-logo-fps-transparent1\.png" as="image">', '<link rel="preload" href="/assets/images/Logo-FriendsPartyServerSR.webp" as="image">'
        $content = $content -replace '<link rel="preload" href="styles\.css" as="style">', '<link rel="preload" href="/assets/css/main.css" as="style">'
        
        # 4. CORREGIR META TAGS CON IMÁGENES REMOTAS
        Write-Host "  📊 Actualizando meta tags..." -ForegroundColor Cyan
        
        # Mantener una imagen remota para Open Graph (por compatibilidad con redes sociales)
        # pero asegurar que también haya una versión local como fallback
        $content = $content -replace '<meta property="og:image" content="https://i\.ibb\.co/nNnx250S/00-logo-fps-transparent1\.png">', '<meta property="og:image" content="https://friendspartyserver.duckdns.org/assets/images/Logo-FriendsPartyServerSR.webp">'
        
        # 5. LIMPIAR CUALQUIER REFERENCIA CSS RESIDUAL
        Write-Host "  🧹 Limpiando referencias CSS residuales..." -ForegroundColor Cyan
        
        # Asegurar que todos los CSS apunten al archivo correcto
        $content = $content -replace '<link rel="stylesheet" href="[^"]*styles\.css[^"]*">', '<link rel="stylesheet" href="/assets/css/main.css">'
        
        # Guardar el archivo corregido
        Set-Content $file -Value $content -Encoding UTF8
        Write-Host "  ✅ Completado: $file" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️ Archivo no encontrado: $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 ¡TODOS LOS PROBLEMAS DE CSS E IMÁGENES HAN SIDO CORREGIDOS!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 CAMBIOS REALIZADOS:" -ForegroundColor Yellow
Write-Host "✅ Todas las rutas CSS apuntan a /assets/css/main.css" -ForegroundColor Green
Write-Host "✅ Imágenes cambiadas de remotas a locales" -ForegroundColor Green  
Write-Host "✅ Preload de recursos corregido" -ForegroundColor Green
Write-Host "✅ Meta tags actualizados con URLs absolutas" -ForegroundColor Green
Write-Host ""
Write-Host "🔧 SOLUCIONES APLICADAS:" -ForegroundColor Yellow
Write-Host "• CSS: Rutas absolutas a /assets/css/main.css" -ForegroundColor White
Write-Host "• Imágenes: Logo local /assets/images/Logo-FriendsPartyServerSR.webp" -ForegroundColor White
Write-Host "• Preload: Recursos locales optimizados" -ForegroundColor White
Write-Host "• Meta: Open Graph con URLs completas" -ForegroundColor White
