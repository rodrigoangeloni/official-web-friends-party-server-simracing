# Script para gestión segura de configuraciones Analytics
# FriendsPartyServer SimRacing - Seguridad de configuración
# Fecha: 2025-08-05

Write-Host "=== CONFIGURACIÓN SEGURA DE ANALYTICS ===" -ForegroundColor Green
Write-Host ""

# Verificar si existe archivo de configuración
if (Test-Path ".env") {
    Write-Host "✅ Archivo .env encontrado" -ForegroundColor Green
    
    # Leer configuración del archivo .env
    $envContent = Get-Content ".env"
    $config = @{}
    
    foreach ($line in $envContent) {
        if ($line -match "^([^#][^=]+)=(.*)$") {
            $config[$matches[1]] = $matches[2]
        }
    }
    
    if ($config.ContainsKey("GA4_ID") -and $config["GA4_ID"] -ne "") {
        Write-Host "✅ GA4_ID configurado correctamente" -ForegroundColor Green
    } else {
        Write-Host "⚠️ GA4_ID no encontrado en .env" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️ Archivo .env no encontrado" -ForegroundColor Yellow
    Write-Host "🔧 Copiando .env.example a .env..." -ForegroundColor Yellow
    
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✅ Archivo .env creado desde .env.example" -ForegroundColor Green
        Write-Host "📝 Edita el archivo .env con tus configuraciones reales" -ForegroundColor Cyan
    } else {
        Write-Host "❌ .env.example no encontrado" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🔍 VERIFICANDO ARCHIVOS DE CONFIGURACIÓN..." -ForegroundColor Yellow

# Verificar configuración centralizada
if (Test-Path "config/head-config.js") {
    $configContent = Get-Content "config/head-config.js" -Raw
    
    if ($configContent -match "CONFIG\.ANALYTICS\.GA4_ID") {
        Write-Host "✅ head-config.js usa configuración centralizada" -ForegroundColor Green
    } else {
        Write-Host "⚠️ head-config.js podría tener IDs hardcodeados" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ config/head-config.js no encontrado" -ForegroundColor Red
}

# Verificar analytics.js
if (Test-Path "assets/js/analytics.js") {
    $analyticsContent = Get-Content "assets/js/analytics.js" -Raw
    
    if ($analyticsContent -match "CONFIG\.ANALYTICS\.GA4_ID") {
        Write-Host "✅ analytics.js usa configuración centralizada" -ForegroundColor Green
    } else {
        Write-Host "⚠️ analytics.js podría tener IDs hardcodeados" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ assets/js/analytics.js no encontrado" -ForegroundColor Red
}

Write-Host ""
Write-Host "🛡️ VERIFICANDO SEGURIDAD..." -ForegroundColor Yellow

# Buscar posibles IDs expuestos en archivos HTML
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" -Recurse
$exposedIds = @()

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match "G-[A-Z0-9]{10}") {
        $exposedIds += $file.FullName
    }
}

if ($exposedIds.Count -gt 0) {
    Write-Host "⚠️ IDs de Analytics encontrados en archivos HTML:" -ForegroundColor Yellow
    foreach ($file in $exposedIds) {
        Write-Host "   - $file" -ForegroundColor Yellow
    }
    Write-Host "💡 Considera mover estos IDs a configuración centralizada" -ForegroundColor Cyan
} else {
    Write-Host "✅ No se encontraron IDs expuestos en archivos HTML" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 RECOMENDACIONES DE SEGURIDAD:" -ForegroundColor Cyan
Write-Host "1. Usar variables de entorno (.env) para IDs sensibles" -ForegroundColor White
Write-Host "2. Agregar .env al .gitignore para evitar commit accidental" -ForegroundColor White
Write-Host "3. Usar configuración centralizada (config/head-config.js)" -ForegroundColor White
Write-Host "4. Implementar fallbacks para casos de falla" -ForegroundColor White

Write-Host ""
Write-Host "=== VERIFICACIÓN COMPLETADA ===" -ForegroundColor Green
