# Script para limpiar referencias a landing pages eliminadas
# Autor: GitHub Copilot
# Fecha: 5 de agosto de 2025

Write-Host "🧹 LIMPIANDO REFERENCIAS A LANDING PAGES ELIMINADAS..." -ForegroundColor Yellow

# Definir el directorio base
$baseDir = "c:\Users\Rodrigo.DESKTOP-I1TEA6K\source\repos\official-web-friends-party-server-simracing"

# Lista de todos los archivos HTML a procesar
$htmlFiles = @(
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
        
        # Eliminar cualquier referencia a landing pages
        $content = $content -replace 'href="/pages/landing/[^"]*"', 'href="/pages/core/servers.html"'
        $content = $content -replace 'href="pages/landing/[^"]*"', 'href="/pages/core/servers.html"'
        
        # Reemplazar textos específicos de landing pages
        $content = $content -replace 'Servidores Argentina', 'Ver Servidores'
        $content = $content -replace 'SimRacing Sudamérica', 'Campeonatos & Eventos'
        $content = $content -replace '🇦🇷 Servidores Argentina', '🖥️ Ver Servidores'
        $content = $content -replace '🌎 SimRacing Sudamérica', '🏆 Campeonatos & Eventos'
        $content = $content -replace '🏆 Campeonatos', '📜 Normas & Reglamento'
        
        # Actualizar footers si los tienen
        $content = $content -replace 'SimRacing premium en Sudamérica', 'SimRacing para toda Latinoamérica'
        
        # Guardar el archivo corregido
        Set-Content $file -Value $content -Encoding UTF8
        Write-Host "✅ Completado: $file" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️ Archivo no encontrado: $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 ¡TODAS LAS REFERENCIAS A LANDING PAGES HAN SIDO ELIMINADAS!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 CAMBIOS REALIZADOS:" -ForegroundColor Yellow
Write-Host "✅ Eliminadas referencias a /pages/landing/" -ForegroundColor Green
Write-Host "✅ Enlaces redirigidos a páginas principales" -ForegroundColor Green  
Write-Host "✅ Textos actualizados para reflejar enfoque unificado" -ForegroundColor Green
Write-Host ""
Write-Host "🌎 NUEVO ENFOQUE: Una sola web para toda Latinoamérica" -ForegroundColor Cyan
