// 📊 ANALYTICS CENTRALIZADO - FRIENDSPARTYSERVER PARAGUAY
// ======================================================

// Inicializar Google Analytics 4
function initializeGA4() {
    // Cargar gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.ANALYTICS.GA4_ID}`;
    document.head.appendChild(script);

    // Configurar dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', CONFIG.ANALYTICS.GA4_ID, Utils.getGA4Config());
}

// 🇵🇾 Eventos específicos Paraguay
const ParaguayEvents = {
    // Vista de contenido Paraguay
    paraguayContentView: (page) => {
        gtag('event', 'paraguay_content_view', {
            event_category: 'Content Engagement',
            event_label: 'Paraguay Landing Page', 
            custom_parameter_country: CONFIG.REGION.ORIGIN_COUNTRY_NAME,
            custom_parameter_page: page
        });
    },

    // Interacción Latinoamérica
    latinAmericaEngagement: (page) => {
        gtag('event', 'latin_america_engagement', {
            event_category: 'Content Engagement',
            event_label: 'Latin America Landing Page',
            custom_parameter_country: CONFIG.REGION.ORIGIN_COUNTRY_NAME,
            custom_parameter_page: page
        });
    },

    // Click unirse al servidor
    serverJoinClick: (serverInfo) => {
        gtag('event', 'server_join_click', {
            event_category: 'Server Interaction',
            event_label: 'Join Server Button',
            custom_parameter_country: CONFIG.REGION.ORIGIN_COUNTRY_NAME,
            server_type: serverInfo.type || 'main',
            server_location: serverInfo.location || 'paraguay'
        });
    }
};

// 📚 Eventos educativos (Guías)
const EducationalEvents = {
    // Vista de guías
    guidesContentView: (page) => {
        gtag('event', 'guides_content_view', {
            event_category: 'Educational Content',
            event_label: 'SimRacing Guides Page',
            custom_parameter_country: CONFIG.REGION.ORIGIN_COUNTRY_NAME,
            custom_parameter_page: page
        });
    },

    // Descarga de setups
    setupDownload: (setupName) => {
        gtag('event', 'download_setup', {
            event_category: 'Content Download',
            event_label: setupName,
            custom_parameter_country: CONFIG.REGION.ORIGIN_COUNTRY_NAME
        });
    }
};

// 🏆 Eventos de campeonatos
const ChampionshipEvents = {
    // Vista de campeonatos
    championshipContentView: (page) => {
        gtag('event', 'championship_content_view', {
            event_category: 'Competition Content', 
            event_label: 'Championships Landing Page',
            custom_parameter_country: CONFIG.REGION.ORIGIN_COUNTRY_NAME,
            custom_parameter_page: page
        });
    },

    // Registro en campeonato
    championshipRegistration: (championshipName) => {
        gtag('event', 'championship_registration', {
            event_category: 'Competition Engagement',
            event_label: championshipName,
            custom_parameter_country: CONFIG.REGION.ORIGIN_COUNTRY_NAME
        });
    }
};

// 📝 Eventos de formularios
const FormEvents = {
    // Envío formulario contacto
    contactFormSubmit: (formType) => {
        gtag('event', 'contact_form_submit', {
            event_category: 'Form Interaction',
            event_label: formType,
            custom_parameter_country: CONFIG.REGION.ORIGIN_COUNTRY_NAME
        });
    }
};

// 🔧 Eventos técnicos
const TechnicalEvents = {
    // Error de página
    pageError: (errorType, page) => {
        gtag('event', 'page_error', {
            event_category: 'Technical Issues',
            event_label: errorType,
            custom_parameter_page: page,
            custom_parameter_country: CONFIG.REGION.ORIGIN_COUNTRY_NAME
        });
    },

    // Performance metrics
    performanceMetric: (metric, value) => {
        gtag('event', 'performance_metric', {
            event_category: 'Performance',
            event_label: metric,
            value: Math.round(value),
            custom_parameter_country: CONFIG.REGION.ORIGIN_COUNTRY_NAME
        });
    }
};

// 🚀 Auto-inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar GA4
    initializeGA4();
    
    // Detectar página actual y enviar evento correspondiente
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('paraguay')) {
        ParaguayEvents.paraguayContentView(currentPage);
    } else if (currentPage.includes('latinoamerica')) {
        ParaguayEvents.latinAmericaEngagement(currentPage);
    } else if (currentPage.includes('guias')) {
        EducationalEvents.guidesContentView(currentPage);
    } else if (currentPage.includes('campeonatos')) {
        ChampionshipEvents.championshipContentView(currentPage);
    }
});

// 🌍 Exportar eventos para uso global
window.Analytics = {
    ParaguayEvents,
    EducationalEvents, 
    ChampionshipEvents,
    FormEvents,
    TechnicalEvents
};
