// 🔧 CONFIGURACIÓN CENTRALIZADA - FRIENDSPARTYSERVER PARAGUAY
// ============================================================

const CONFIG = {
    // 📊 Analytics & Tracking
    ANALYTICS: {
        GA4_ID: 'G-L6K2C49RW0',
        MEASUREMENT_ID: '11855106304',
        STREAM_NAME: 'Friends Party Sim Racing Assetto Corsa Latino America'
    },

    // 🌐 URLs & Endpoints  
    API: {
        BASE_URL: 'https://friendspartyserver.duckdns.org',
        LIVE_TIMING: 'https://friendspartyserverpy.duckdns.org/live-timing',
        SERVER_JOIN_BASE: 'https://acstuff.ru/s/q:race/online/join',
        SUPPORT_URL: 'https://www.buymeacoffee.com/friendspartyserver'
    },

    // 🇵🇾 Configuración Regional
    REGION: {
        ORIGIN_COUNTRY: 'PY',
        ORIGIN_COUNTRY_NAME: 'Paraguay', 
        ORIGIN_CITY: 'Asunción',
        TARGET_REGION: 'Latin America',
        TIMEZONE: 'America/Asuncion',
        TIMEZONE_ABBR: 'PYT',
        CURRENCY: 'USD' // Para compatibilidad internacional
    },

    // 🏁 Información del Servidor
    SERVER: {
        NAME: 'FriendsPartyServer SimRacing Paraguay',
        SHORT_NAME: 'FPS Paraguay',
        ESTABLISHED: '2024',
        TOTAL_PILOTS: '5000+',
        PARAGUAY_PILOTS: '800+',
        COUNTRIES_COVERED: 20
    },

    // 🎮 Gaming Configuration
    GAMING: {
        PRIMARY_GAME: 'Assetto Corsa',
        SECONDARY_GAMES: ['Assetto Corsa Competizione'],
        EVENT_TIME: '21:00',
        TIMEZONE_DISPLAY: '21:00hs (Paraguay)'
    },

    // 🎨 Branding & Assets
    BRANDING: {
        LOGO_URL: '/assets/images/Logo-FriendsPartyServerSR.webp',
        FAVICON_URL: '/assets/images/favicon.ico',
        DEFAULT_OG_IMAGE: 'https://i.ibb.co/nNnx250S/00-logo-fps-transparent1.png',
        PRIMARY_COLOR: '#1F2937',
        ACCENT_COLOR: '#FBBF24'
    },

    // 📱 Social Media
    SOCIAL: {
        DISCORD: 'https://discord.gg/friendspartyserver',
        YOUTUBE: 'https://youtube.com/@friendspartyserver',
        FACEBOOK: 'https://facebook.com/friendspartyserver',
        INSTAGRAM: 'https://instagram.com/friendspartyserver',
        TWITCH: 'https://twitch.tv/friendspartyserver'
    },

    // 🔍 SEO Configuration
    SEO: {
        SITE_NAME: 'FriendsPartyServer SimRacing Paraguay',
        DEFAULT_TITLE: 'FriendsPartyServer SimRacing Paraguay - #1 Latinoamérica',
        DEFAULT_DESCRIPTION: 'Los mejores servidores de Assetto Corsa en Paraguay. Desde Asunción conectando toda Latinoamérica.',
        DEFAULT_KEYWORDS: 'Assetto Corsa, SimRacing, Paraguay, Latinoamérica, servidores, campeonatos',
        AUTHOR: 'FriendsPartyServer SimRacing Team - Asunción, Paraguay',
        PUBLISHER: 'FriendsPartyServer Paraguay'
    },

    // ⚡ Performance & Technical
    PERFORMANCE: {
        CACHE_VERSION: '2.2.0',
        CDN_ENABLED: false, // Para futuro
        LAZY_LOADING: true,
        PWA_ENABLED: true
    },

    // 🏆 Landing Pages Keywords
    KEYWORDS: {
        PARAGUAY: {
            primary: 'servidores assetto corsa paraguay',
            secondary: ['simracing paraguay', 'asuncion simracing', 'fps paraguay']
        },
        LATINOAMERICA: {
            primary: 'simracing latinoamerica', 
            secondary: ['servidores assetto corsa latino', 'campeonatos latinoamerica']
        },
        ARGENTINA: {
            primary: 'servidores assetto corsa argentina',
            secondary: ['simracing argentina', 'fps argentina']
        },
        GUIDES: {
            primary: 'guias sim racing',
            secondary: ['tutoriales assetto corsa', 'setups gratuitos']
        }
    }
};

// 🚀 Funciones de utilidad
const Utils = {
    // Obtener URL completa
    getFullUrl: (path) => `${CONFIG.API.BASE_URL}${path}`,
    
    // Formatear hora con timezone
    formatTime: (time) => `${time}hs (${CONFIG.REGION.TIMEZONE_ABBR})`,
    
    // Generar meta title
    generateTitle: (page) => `${page} | ${CONFIG.SEO.SITE_NAME}`,
    
    // Obtener configuración GA4
    getGA4Config: () => ({
        country: CONFIG.REGION.ORIGIN_COUNTRY,
        custom_map: {
            'custom_parameter_country': CONFIG.REGION.ORIGIN_COUNTRY_NAME,
            'custom_parameter_region': CONFIG.REGION.TARGET_REGION
        }
    })
};

// 🌍 Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, Utils };
} else {
    window.CONFIG = CONFIG;
    window.Utils = Utils;
}
