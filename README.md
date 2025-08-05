# 🏁 FriendsPartyServer SimRacing - Sitio Web Oficial

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-2.0.0-blue.svg)](https://github.com/rodrigoangeloni/official-web-friends-party-server-simracing)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Ffriendspartyserver.duckdns.org)](https://friendspartyserver.duckdns.org)
[![PWA](https://img.shields.io/badge/PWA-Ready-green.svg)](https://friendspartyserver.duckdns.org)

## 🎯 Descripción

Sitio web oficial de **FriendsPartyServer SimRacing**, la comunidad líder de servidores de Assetto Corsa en Sudamérica. Plataforma optimizada para SEO, performance y accesibilidad, diseñada para posicionarse como **#1 en Google** para las keywords "Servidores de Assetto Corsa" y "Sim Racing".

### 🚀 Características Principales

- 🏆 **Campeonatos Diarios** a las 21:00hs (horario Argentina)
- 🖥️ **Servidores Premium** con 99.9% uptime
- 📊 **Sistema de Rankings** y estadísticas avanzadas
- 🧮 **Calculadora de Estrategia** para combustible y neumáticos
- 🌎 **Cobertura Regional** para toda Sudamérica
- 📱 **PWA Completa** con soporte offline

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5** semántico con Schema.org
- **CSS3** con variables personalizadas
- **JavaScript ES6+** modular y optimizado
- **Tailwind CSS** para diseño responsive
- **Service Worker** para PWA

### SEO & Performance
- **Core Web Vitals** optimizados (>90 puntos)
- **Schema.org** para gaming/motorsports
- **Critical CSS** inline
- **Lazy loading** de imágenes
- **Sitemap.xml** estructurado

### Seguridad
- **Content Security Policy (CSP)**
- **Headers de seguridad HTTP**
- **Sanitización de inputs**
- **Validación robusta**

## 📁 Estructura del Proyecto

```
friendspartyserver.duckdns.org/
├── 📄 index.html                 # Página principal
├── 📄 index-optimized.html       # Versión optimizada (Nueva)
├── 🖥️ servers.html              # Lista de servidores
├── 🏆 eventos.html               # Eventos y campeonatos
├── 🧮 calculadora.html           # Calculadora de estrategia
├── 📜 reglamento.html            # Normas y reglas
├── 🌐 redes.html                 # Redes sociales
├── ℹ️ about.html                 # Acerca de
├── 📞 contact.html               # Contacto
├── ❌ 404.html                   # Página de error personalizada (Nueva)
├── 🎨 styles.css                 # Estilos personalizados (Nuevo)
├── ⚙️ calculadora.js             # Lógica mejorada (Actualizado)
├── 🔧 sw.js                      # Service Worker (Nuevo)
├── 📱 manifest.json              # Manifest PWA (Nuevo)
├── 🗺️ sitemap.xml               # Sitemap SEO (Nuevo)
├── 🤖 robots.txt                 # Configuración de bots
├── 📚 README.md                  # Este archivo
├── 📋 PLAN.md                    # Plan de mejoras
├── 📝 CHANGELOG.md               # Registro de cambios
└── ✅ TASKS.md                   # Tareas y progreso
```

## 🚀 Instalación y Configuración

### Requisitos Previos
- Servidor web (Apache, Nginx, o similar)
- HTTPS habilitado (requerido para PWA)
- Soporte para headers personalizados

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/rodrigoangeloni/official-web-friends-party-server-simracing.git
cd official-web-friends-party-server-simracing
```

2. **Configurar headers de seguridad** (Apache)
```apache
# .htaccess
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' https://i.ibb.co https://img.buymeacoffee.com data:;"
Header always set X-Frame-Options "DENY"
Header always set X-Content-Type-Options "nosniff"
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

3. **Configurar HTTPS** (requerido para Service Worker)
```bash
# Ejemplo con Let's Encrypt
certbot --apache -d friendspartyserver.duckdns.org
```

4. **Subir archivos** al servidor web

### Configuración para Desarrollo

```bash
# Servidor local con Python
python -m http.server 8000

# O con Node.js
npx http-server -p 8000 -a localhost
```

## 📊 Métricas de Performance

### Lighthouse Scores Objetivo
- **Performance**: >95
- **Accessibility**: >95  
- **Best Practices**: >95
- **SEO**: >95
- **PWA**: ✅ Completo

### Core Web Vitals
- **LCP** (Largest Contentful Paint): <2.5s
- **FID** (First Input Delay): <100ms
- **CLS** (Cumulative Layout Shift): <0.1

## 🎯 SEO Strategy

### Keywords Principales
1. **"Servidores de Assetto Corsa"** - Competencia: Media
2. **"Sim Racing Argentina"** - Competencia: Baja
3. **"Campeonatos Assetto Corsa Sudamérica"** - Long-tail

### Contenido Optimizado
- ✅ Meta descriptions únicas por página
- ✅ Schema.org para gaming/motorsports
- ✅ Títulos optimizados para SEO
- ✅ URLs semánticas
- ✅ Contenido específico por región

## 🔧 Funcionalidades Destacadas

### 🧮 Calculadora de Estrategia SimRacing
- Cálculo de combustible por vuelta
- Estrategia de neumáticos optimizada
- Simulación de paradas en boxes
- Validación robusta de inputs
- Interfaz intuitiva y responsive

### 📱 Progressive Web App (PWA)
- Instalable en dispositivos móviles
- Funcionalidad offline
- Push notifications (preparado)
- Cacheo inteligente de recursos
- Iconos adaptativos

### 🛡️ Seguridad Web
- Content Security Policy implementado
- Headers de seguridad HTTP
- Sanitización de inputs XSS
- Validación del lado cliente y servidor
- Enlaces externos seguros

## 🌐 Compatibilidad de Navegadores

| Navegador | Versión Mínima | PWA Support |
|-----------|---------------|-------------|
| Chrome    | 60+           | ✅ Completo |
| Firefox   | 55+           | ✅ Completo |
| Safari    | 11+           | ⚠️ Parcial  |
| Edge      | 79+           | ✅ Completo |

## 📈 Analytics y Tracking

### Google Analytics 4 (Preparado)
```javascript
// Eventos personalizados para SimRacing
gtag('event', 'server_join', {
  'event_category': 'engagement',
  'server_name': 'MX5 Cup',
  'event_time': '21:00'
});
```

### Métricas Específicas
- Tiempo en página por sección
- Clics en enlaces de servidores
- Uso de la calculadora
- Conversiones a Discord/eventos

## 🤝 Contribuir al Proyecto

### Reportar Bugs
1. Usar el [sistema de issues](https://github.com/rodrigoangeloni/official-web-friends-party-server-simracing/issues)
2. Incluir detalles del navegador y dispositivo
3. Adjuntar screenshots si es posible

### Enviar Mejoras
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit con mensaje descriptivo
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Guías de Desarrollo
- Seguir convenciones de HTML5 semántico
- Usar CSS BEM methodology
- JavaScript ES6+ con manejo de errores
- Comentarios en español para el equipo

## 📋 Roadmap 2025

### Q1 2025 ✅ (Completado)
- [x] Refactoring completo de seguridad
- [x] Implementación PWA
- [x] Optimización SEO avanzada
- [x] Calculadora mejorada

### Q2 2025 🚧 (En Progreso)
- [ ] Sistema de usuarios y perfiles
- [ ] API de estadísticas en tiempo real
- [ ] Integración con Discord bot
- [ ] Blog de SimRacing

### Q3 2025 📋 (Planificado)
- [ ] Streaming en vivo de eventos
- [ ] Modo oscuro/claro
- [ ] Multiidioma (EN/PT)
- [ ] Sistema de notificaciones push

### Q4 2025 🎯 (Objetivo)
- [ ] App móvil nativa
- [ ] Integración con APIs de Assetto Corsa
- [ ] Sistema de coaching online
- [ ] Marketplace de setups

## 📞 Soporte y Contacto

### Comunidad
- **Discord**: [FriendsPartyServer](https://discord.gg/friendspartyserver)
- **Website**: [friendspartyserver.duckdns.org](https://friendspartyserver.duckdns.org)
- **YouTube**: [@friendspartyserver](https://youtube.com/@friendspartyserver)

### Desarrolladores
- **GitHub Issues**: [Reportar problemas](https://github.com/rodrigoangeloni/official-web-friends-party-server-simracing/issues)
- **Email**: contacto@friendspartyserver.org
- **Telegram**: @FriendsPartyServerDev

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **Comunidad SimRacing** de Sudamérica
- **Kunos Simulazioni** por Assetto Corsa
- **Contributors** del proyecto
- **Beta testers** y early adopters

---

<div align="center">

**🏁 Made with ❤️ for the SimRacing Community 🏁**

[Website](https://friendspartyserver.duckdns.org) • [Discord](https://discord.gg/friendspartyserver) • [YouTube](https://youtube.com/@friendspartyserver)

</div>
