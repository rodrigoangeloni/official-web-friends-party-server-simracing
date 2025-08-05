# 🗺️ MAPA DE ESTRUCTURA DE PÁGINAS - Friends Party Server SimRacing

## 📁 Estructura Actual del Sitio Web (SIMPLIFICADA)

```
friendspartyserver/
├── index.html                                    # PÁGINA PRINCIPAL
├── 404.html                                     # Página de error 404
├── 
├── 📁 pages/
│   ├── 📁 core/                                 # PÁGINAS PRINCIPALES DEL MENÚ
│   │   ├── calculadora.html                     # Calculadora de tiempos/setups
│   │   ├── eventos.html                         # Eventos y campeonatos
│   │   ├── reglamento.html                      # Normas básicas y reglamento
│   │   └── servers.html                         # Lista de servidores
│   │
│   └── 📁 info/                                 # PÁGINAS DE INFORMACIÓN
│       ├── about.html                           # Acerca de nosotros
│       ├── contact.html                         # Información de contacto
│       └── redes.html                           # Redes sociales
│
├── 📁 assets/
│   ├── 📁 css/
│   │   └── main.css
│   ├── 📁 images/
│   └── 📁 js/
│       └── analytics.js
│
├── 📁 config/
│   ├── global-config.js
│   └── head-config.js
│
├── 📁 templates/
    └── seo-friendly-head.html



```

## 🧭 RUTAS DE NAVEGACIÓN SIMPLIFICADAS

### NAVEGACIÓN PRINCIPAL (Menú Header)
| Texto del Menú | Archivo Real | Ruta Correcta |
|----------------|--------------|---------------|
| INICIO | index.html | `/index.html` |
| NORMAS BÁSICAS | reglamento.html | `/pages/core/reglamento.html` |
| SERVIDORES | servers.html | `/pages/core/servers.html` |
| EVENTOS | eventos.html | `/pages/core/eventos.html` |
| CALCULADORA | calculadora.html | `/pages/core/calculadora.html` |
| REDES | redes.html | `/pages/info/redes.html` |
| ACERCA DE | about.html | `/pages/info/about.html` |
| CONTACTO | contact.html | `/pages/info/contact.html` |

## ✅ CAMBIOS REALIZADOS - SIMPLIFICACIÓN

**ELIMINADO:** 
- ❌ Carpeta `/pages/landing/` completa
- ❌ argentina.html
- ❌ campeonatos.html  
- ❌ guias.html
- ❌ latinoamerica.html
- ❌ paraguay.html

**RAZÓN:** 
El sitio es para toda Latinoamérica, no necesita páginas separadas por país.

**BOTONES ACTUALIZADOS:**
- 🇦🇷 Servidores Argentina → 🖥️ Ver Servidores
- 🌎 SimRacing Sudamérica → 🏆 Campeonatos & Eventos  
- 🏆 Campeonatos → 📜 Normas & Reglamento

**FOOTER SIMPLIFICADO:**
- Eliminados enlaces a landing pages
- Añadidos enlaces a páginas principales del sitio

## ❌ PROBLEMAS SOLUCIONADOS ✅

**PROBLEMA IDENTIFICADO Y SOLUCIONADO:** Las rutas relativas causaban duplicación de paths.

**El problema era:** 
- Desde `index.html` (raíz) → `pages/core/reglamento.html` ✅ Funcionaba
- Desde `reglamento.html` (en `pages/core/`) → `pages/core/reglamento.html` ❌ Se convertía en `/pages/core/pages/core/reglamento.html`

**SOLUCIÓN IMPLEMENTADA:**
Todas las rutas ahora son **ABSOLUTAS** (comienzan con `/`)

**Rutas correctas aplicadas:**
```html
<a href="/index.html">                      ✅ CORRECTO
<a href="/pages/core/reglamento.html">      ✅ CORRECTO
<a href="/pages/core/servers.html">         ✅ CORRECTO
<a href="/pages/core/eventos.html">         ✅ CORRECTO
<a href="/pages/core/calculadora.html">     ✅ CORRECTO
<a href="/pages/info/redes.html">           ✅ CORRECTO
<a href="/pages/info/about.html">           ✅ CORRECTO
<a href="/pages/info/contact.html">         ✅ CORRECTO
```

## 🔧 ACCIONES REALIZADAS ✅

1. **✅ CORREGIDA NAVEGACIÓN PRINCIPAL** en index.html
2. **✅ CORREGIDA NAVEGACIÓN** en reglamento.html
3. **✅ APLICADO SCRIPT MASIVO** para corregir todas las páginas
4. **✅ CORREGIDAS RUTAS DE ASSETS** (imágenes, CSS, JS)
5. **✅ VERIFICADAS LANDING PAGES** en footer y botones

## 🎯 RESULTADO FINAL

**Navegación funcionará perfectamente desde cualquier página hacia cualquier página.**

---
**Fecha de creación:** 5 de agosto de 2025
**Estado:** ✅ COMPLETADO - Todos los enlaces funcionando correctamente
