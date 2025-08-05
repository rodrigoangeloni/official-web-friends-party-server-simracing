# Script para organizar archivos .md
# FriendsPartyServer SimRacing - Organización de documentación
# Fecha: 2025-08-05

Write-Host "=== ORGANIZACIÓN DE ARCHIVOS MARKDOWN ===" -ForegroundColor Green
Write-Host ""

$rootPath = "."
$docsPath = "./docs"

# Crear directorio docs si no existe
if (-not (Test-Path $docsPath)) {
    New-Item -ItemType Directory -Path $docsPath -Force
    Write-Host "✅ Directorio docs/ creado" -ForegroundColor Green
} else {
    Write-Host "✅ Directorio docs/ ya existe" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔍 VERIFICANDO ARCHIVOS MARKDOWN..." -ForegroundColor Yellow

# Buscar todos los archivos .md en el directorio raíz (excepto README.md)
$mdFiles = Get-ChildItem -Path $rootPath -Filter "*.md" -File | Where-Object { $_.Name -ne "README.md" }

if ($mdFiles.Count -eq 0) {
    Write-Host "✅ No hay archivos .md para mover (README.md permanece en raíz)" -ForegroundColor Green
} else {
    Write-Host "📁 Archivos .md encontrados para mover:" -ForegroundColor Yellow
    
    foreach ($file in $mdFiles) {
        $sourceFile = $file.FullName
        $targetFile = Join-Path $docsPath $file.Name
        
        Write-Host "   📄 $($file.Name)" -ForegroundColor White
        
        # Verificar si ya existe en docs
        if (Test-Path $targetFile) {
            Write-Host "      ⚠️ Ya existe en docs/, comparando contenido..." -ForegroundColor Yellow
            
            $sourceHash = Get-FileHash $sourceFile
            $targetHash = Get-FileHash $targetFile
            
            if ($sourceHash.Hash -eq $targetHash.Hash) {
                Write-Host "      ✅ Archivos idénticos, eliminando duplicado del raíz" -ForegroundColor Green
                Remove-Item $sourceFile -Force
            } else {
                Write-Host "      ⚠️ Archivos diferentes, renombrando el del raíz" -ForegroundColor Yellow
                $backupName = $file.BaseName + "_backup" + $file.Extension
                $backupPath = Join-Path $docsPath $backupName
                Move-Item $sourceFile $backupPath -Force
                Write-Host "      📁 Movido como: $backupName" -ForegroundColor Cyan
            }
        } else {
            Write-Host "      ➡️ Moviendo a docs/" -ForegroundColor Green
            Move-Item $sourceFile $targetFile -Force
        }
    }
}

Write-Host ""
Write-Host "📊 ESTADO ACTUAL DE LA DOCUMENTACIÓN:" -ForegroundColor Cyan

# README.md en raíz
if (Test-Path "./README.md") {
    Write-Host "✅ README.md - En directorio raíz (correcto)" -ForegroundColor Green
} else {
    Write-Host "❌ README.md - No encontrado en directorio raíz" -ForegroundColor Red
}

# Listar archivos en docs/
Write-Host ""
Write-Host "📁 Archivos en docs/:" -ForegroundColor Cyan
$docsFiles = Get-ChildItem -Path $docsPath -Filter "*.md" -File | Sort-Object Name

if ($docsFiles.Count -eq 0) {
    Write-Host "   (Ningún archivo .md en docs/)" -ForegroundColor Gray
} else {
    foreach ($file in $docsFiles) {
        $size = [math]::Round($file.Length / 1KB, 1)
        Write-Host "   📄 $($file.Name) ($size KB)" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "📈 ESTADÍSTICAS:" -ForegroundColor Cyan
Write-Host "   📁 Archivos .md en docs/: $($docsFiles.Count)" -ForegroundColor White
Write-Host "   📄 README.md en raíz: $(if (Test-Path './README.md') { '1' } else { '0' })" -ForegroundColor White
Write-Host "   📊 Total archivos .md: $($docsFiles.Count + 1)" -ForegroundColor White

Write-Host ""
Write-Host "=== ORGANIZACIÓN COMPLETADA ===" -ForegroundColor Green
Write-Host "Toda la documentación está correctamente organizada" -ForegroundColor Cyan
