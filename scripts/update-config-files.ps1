# Script para actualizar archivos de configuración
# FriendsPartyServer SimRacing - Actualización masiva
# Fecha: 2025-08-05

Write-Host "=== ACTUALIZANDO ARCHIVOS DE CONFIGURACIÓN ===" -ForegroundColor Green
Write-Host ""

# Variables de configuración
$fechaActual = Get-Date -Format "yyyy-MM-dd"
$domain = "https://friendspartyserver.duckdns.org"

Write-Host "🔧 Actualizando sitemap.xml..." -ForegroundColor Yellow

# Crear nuevo sitemap.xml simplificado
$sitemapContent = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
        
  <!-- Página Principal -->
  <url>
    <loc>$domain/</loc>
    <lastmod>$fechaActual</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>$domain/assets/images/Logo-FriendsPartyServerSR.webp</image:loc>
      <image:title>FriendsPartyServer SimRacing Logo</image:title>
      <image:caption>SimRacing para toda Latinoamérica desde Paraguay</image:caption>
    </image:image>
  </url>
  
  <!-- Páginas Core - Funcionalidades Principales -->
  <url>
    <loc>$domain/pages/core/servers.html</loc>
    <lastmod>$fechaActual</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>$domain/pages/core/eventos.html</loc>
    <lastmod>$fechaActual</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>$domain/pages/core/reglamento.html</loc>
    <lastmod>$fechaActual</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>$domain/pages/core/calculadora.html</loc>
    <lastmod>$fechaActual</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Páginas Info - Información del Sitio -->
  <url>
    <loc>$domain/pages/info/redes.html</loc>
    <lastmod>$fechaActual</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>$domain/pages/info/about.html</loc>
    <lastmod>$fechaActual</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>$domain/pages/info/contact.html</loc>
    <lastmod>$fechaActual</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
</urlset>
"@

$sitemapContent | Out-File -FilePath "sitemap.xml" -Encoding UTF8
Write-Host "✅ sitemap.xml actualizado" -ForegroundColor Green

Write-Host "🤖 Actualizando robots.txt..." -ForegroundColor Yellow

# Crear nuevo robots.txt
$robotsContent = @"
# Robots.txt para FriendsPartyServer SimRacing
# Optimizado para SimRacing Latinoamérica desde Paraguay

User-agent: *
Allow: /

# Permitir indexación completa de páginas principales
Allow: /pages/core/
Allow: /pages/info/
Allow: /assets/

# Bloquear archivos técnicos y privados
Disallow: /scripts/
Disallow: /config/
Disallow: /docs/
Disallow: /templates/
Disallow: /.git/
Disallow: /admin/
Disallow: /private/
Disallow: /*.log$
Disallow: /*.ps1$

# Permitir archivos importantes para PWA y SEO
Allow: /manifest.json
Allow: /sitemap.xml
Allow: /sw.js
Allow: /robots.txt

# Crawl-delay para evitar sobrecarga
Crawl-delay: 1

# Bots específicos optimizados
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot  
Allow: /
Crawl-delay: 1

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Bots de gaming y deportes motor
User-agent: SteamBot
Allow: /

User-agent: TwitchBot
Allow: /

User-agent: YoutubeBot
Allow: /

# Bloquear bots maliciosos o innecesarios
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MajesticSEO
Disallow: /

# Sitemap principal
Sitemap: $domain/sitemap.xml
"@

$robotsContent | Out-File -FilePath "robots.txt" -Encoding UTF8
Write-Host "✅ robots.txt actualizado" -ForegroundColor Green

Write-Host "📱 Verificando manifest.json..." -ForegroundColor Yellow
if (Test-Path "manifest.json") {
    Write-Host "✅ manifest.json existe y está actualizado" -ForegroundColor Green
} else {
    Write-Host "❌ manifest.json no encontrado" -ForegroundColor Red
}

Write-Host "⚙️ Verificando Service Worker..." -ForegroundColor Yellow
if (Test-Path "sw.js") {
    Write-Host "✅ sw.js existe y está actualizado" -ForegroundColor Green
} else {
    Write-Host "❌ sw.js no encontrado" -ForegroundColor Red
}

Write-Host "🚫 Verificando .gitignore..." -ForegroundColor Yellow
if (Test-Path ".gitignore") {
    Write-Host "✅ .gitignore existe" -ForegroundColor Green
} else {
    Write-Host "❌ .gitignore no encontrado" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== ACTUALIZACIÓN COMPLETADA ===" -ForegroundColor Green
Write-Host "Archivos actualizados para la nueva estructura simplificada" -ForegroundColor Cyan
Write-Host "Fecha de actualización: $fechaActual" -ForegroundColor Cyan
Write-Host ""
