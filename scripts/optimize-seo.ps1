# Script para generar páginas HTML SEO-optimized
# PowerShell script - Friends Party Server SimRacing

$baseDirectory = "c:\Users\Rodrigo.DESKTOP-I1TEA6K\source\repos\official-web-friends-party-server-simracing\official-web-friends-party-server-simracing"
$configPath = Join-Path $baseDirectory "config\head-config.js"

# Leer configuración JavaScript (simplificado)
$configContent = Get-Content $configPath -Raw

# Mapeo de páginas y sus títulos/descripciones críticas para SEO
$pagesSEO = @{
    "index.html" = @{
        title = "Friends Party Server SimRacing - Inicio"
        description = "Friends Party Server SimRacing: Los mejores servidores de Assetto Corsa en Sudamérica. Únete a nuestra comunidad latino."
    }
    "pages\core\reglamento.html" = @{
        title = "Normas Básicas - Friends Party Server"
        description = "Conoce las normas básicas y reglamento de nuestros servidores de SimRacing."
    }
    "pages\core\servers.html" = @{
        title = "Servidores - Friends Party Server"
        description = "Descubre todos nuestros servidores activos de Assetto Corsa en Sudamérica."
    }
    "pages\core\eventos.html" = @{
        title = "Eventos - Friends Party Server"
        description = "Participa en nuestros eventos y campeonatos de SimRacing."
    }
    "pages\core\calculadora.html" = @{
        title = "Calculadora SimRacing - Friends Party Server"
        description = "Calculadora de estrategia para carreras de SimRacing en Assetto Corsa."
    }
    "pages\info\redes.html" = @{
        title = "Redes Sociales - Friends Party Server"
        description = "Síguenos en nuestras redes sociales y mantente al día con la comunidad."
    }
    "pages\info\about.html" = @{
        title = "Acerca de - Friends Party Server"
        description = "Conoce más sobre Friends Party Server y nuestra comunidad de SimRacing."
    }
    "pages\info\contact.html" = @{
        title = "Contacto - Friends Party Server"
        description = "Ponte en contacto con nosotros para cualquier consulta sobre nuestros servidores."
    }
    "404.html" = @{
        title = "Página no encontrada - Friends Party Server"
        description = "La página que buscas no existe. Regresa al inicio de Friends Party Server."
    }
}

function Generate-SEOHead($pageInfo) {
    return @"
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Meta básicos críticos para SEO - Carga inmediata -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$($pageInfo.title)</title>
    <meta name="description" content="$($pageInfo.description)">
    <meta name="keywords" content="Assetto Corsa, SimRacing, Friends Party Server, servidores, carreras, Sudamérica, Latino, Argentina, Paraguay.">
    
    <!-- HEAD DINÁMICO - Completa los meta tags restantes -->
    <script src="/config/head-config.js"></script>
    <script>
        // Cargar configuración inmediatamente (sin esperar DOM)
        if (window.HeadConfig) {
            window.HeadConfig.initImmediate();
        }
    </script>
</head>
"@
}

Write-Host "🚀 Iniciando optimización SEO de archivos HTML..." -ForegroundColor Green

foreach ($file in $pagesSEO.Keys) {
    $fullPath = Join-Path $baseDirectory $file
    
    if (Test-Path $fullPath) {
        Write-Host "🔍 Procesando: $file" -ForegroundColor Yellow
        
        try {
            # Leer el contenido completo del archivo
            $content = Get-Content $fullPath -Raw -Encoding UTF8
            
            # Buscar el final del tag </head>
            $headEndIndex = $content.IndexOf("</head>")
            
            if ($headEndIndex -gt 0) {
                # Obtener el contenido después del </head>
                $bodyContent = $content.Substring($headEndIndex + 7)
                
                # Generar nuevo head SEO-optimized
                $newHead = Generate-SEOHead -pageInfo $pagesSEO[$file]
                
                # Combinar nuevo head con el contenido del body
                $newContent = $newHead + $bodyContent
                
                # Crear backup
                $backupPath = $fullPath + ".backup"
                Copy-Item $fullPath $backupPath
                
                # Escribir el archivo actualizado
                Set-Content -Path $fullPath -Value $newContent -Encoding UTF8
                
                Write-Host "✅ SEO optimizado: $file" -ForegroundColor Green
            } else {
                Write-Host "❌ No se encontró el tag </head> en: $file" -ForegroundColor Red
            }
        }
        catch {
            Write-Host "❌ Error procesando $file : $($_.Exception.Message)" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ Archivo no encontrado: $file" -ForegroundColor Red
    }
}

Write-Host "`n🎯 Optimización SEO completada!" -ForegroundColor Green
Write-Host "📊 Beneficios implementados:" -ForegroundColor Cyan
Write-Host "   ✅ Títulos críticos cargados inmediatamente" -ForegroundColor White
Write-Host "   ✅ Meta descriptions disponibles para bots" -ForegroundColor White
Write-Host "   ✅ Meta keywords incluidos" -ForegroundColor White
Write-Host "   ✅ Charset y viewport prioritarios" -ForegroundColor White
Write-Host "   ✅ Meta tags adicionales cargados dinámicamente" -ForegroundColor White
