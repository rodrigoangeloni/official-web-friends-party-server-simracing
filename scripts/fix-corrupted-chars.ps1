# Script simple para corregir caracteres corruptos
# Autor: GitHub Copilot
# Fecha: 5 de agosto de 2025

Write-Host "🔧 CORRIGIENDO CARACTERES CORRUPTOS..." -ForegroundColor Yellow

$baseDir = "c:\Users\Rodrigo.DESKTOP-I1TEA6K\source\repos\official-web-friends-party-server-simracing"

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
        Write-Host "📝 Procesando: $(Split-Path $file -Leaf)" -ForegroundColor Green
        
        $content = Get-Content $file -Raw -Encoding UTF8
        $originalContent = $content
        
        # Reemplazar caracteres corruptos específicos
        $content = $content -replace "� Eventos", "🏆 Eventos"
        $content = $content -replace "� Campeonatos", "🏆 Campeonatos"  
        $content = $content -replace "� Ver Servidores", "🖥️ Ver Servidores"
        $content = $content -replace "� Normas", "📜 Normas"
        $content = $content -replace "�", "🏆"
        
        if ($content -ne $originalContent) {
            Set-Content $file -Value $content -Encoding UTF8
            Write-Host "  ✅ Archivo actualizado" -ForegroundColor Green
        } else {
            Write-Host "  ✅ Sin problemas encontrados" -ForegroundColor Green
        }
    }
}

Write-Host ""
Write-Host "🎉 ¡CORRECCIÓN COMPLETADA!" -ForegroundColor Green
