// Importar polyfills primero - ruta corregida
import '../utils/polyfills';

// Polyfills para módulos de Node.js
if (typeof global === 'undefined') {
  window.global = window;
}

if (typeof process === 'undefined') {
  window.process = { 
    env: {},
    nextTick: (callback) => setTimeout(callback, 0),
    platform: 'browser'
  };
}

// Configuración simplificada para evitar problemas de compatibilidad
const FACEBOOK_ACCESS_TOKEN = 'EAAsZA9ZBw1ZAJcBPSWXrNaNv3uArITTRlZAPCHFZBuVY7LM4SfN2SZAnPJlGHs0UiTAqZAdFcKz8aZBbLjrmO96CeT7Dsg56BPX1HGJxKBOic9sQyfhwKGlFIdiYr7nk9OlSvvHbaRydnwAVU1rdf0RUUuyCv0ZBUuEZAYa2AK2zW6JFxMEBUhrRJpeFVaiciM92nSD26Hbm5ZC4mbX5M4J6AGcfQsK';

class FacebookAdsService {
  constructor() {
    this.account = null;
    this.isSDKLoaded = false;
    this.initPromise = null;
  }

  async initializeSDK() {
    try {
      console.log('Inicializando SDK de Facebook...');
      
      // Verificar si estamos en el navegador
      if (typeof window === 'undefined') {
        throw new Error('SDK solo compatible con navegador');
      }

      // Intentar cargar el SDK de forma segura
      let fbSDK;
      try {
        fbSDK = await import('facebook-nodejs-business-sdk');
        console.log('SDK cargado exitosamente');
      } catch (importError) {
        console.warn('No se pudo cargar el SDK completo, usando modo mock', importError);
        this.isSDKLoaded = true;
        return { mode: 'mock' };
      }

      const { FacebookAdsApi, AdAccount, Campaign, AdSet, Ad, AdCreative, Insights } = fbSDK;
      
      // Configurar la API
      const api = FacebookAdsApi.init(FACEBOOK_ACCESS_TOKEN);
      
      if (import.meta.env.MODE === 'development') {
        api.setDebug(true);
      }
      
      this.FacebookAdsApi = FacebookAdsApi;
      this.AdAccount = AdAccount;
      this.Campaign = Campaign;
      this.AdSet = AdSet;
      this.Ad = Ad;
      this.AdCreative = AdCreative;
      this.Insights = Insights;
      
      this.isSDKLoaded = true;
      console.log('SDK de Facebook inicializado correctamente');
      
      return api;
    } catch (error) {
      console.error('Error en initializeSDK:', error);
      // No lanzar error, permitir que la aplicación continúe en modo mock
      this.isSDKLoaded = true;
      return { mode: 'mock' };
    }
  }

  async ensureSDKLoaded() {
    if (!this.isSDKLoaded) {
      if (!this.initPromise) {
        this.initPromise = this.initializeSDK();
      }
      await this.initPromise;
    }
  }

  // Métodos mock para desarrollo
  async getAdAccounts() {
    await this.ensureSDKLoaded();
    
    // Datos mock para desarrollo
    return [
      {
        id: 'act_123456789',
        name: 'Mi Cuenta Publicitaria Principal',
        account_status: 1,
        amount_spent: 2875.50,
        balance: 1250.75,
        currency: 'USD',
        timezone_name: 'America/New_York'
      },
      {
        id: 'act_987654321',
        name: 'Cuenta de Testeo',
        account_status: 1,
        amount_spent: 450.25,
        balance: 2000.00,
        currency: 'USD',
        timezone_name: 'America/Los_Angeles'
      }
    ];
  }

  setActiveAccount(accountId) {
    this.account = accountId;
    console.log(`Cuenta activa establecida: ${accountId}`);
  }

  async getCampaigns(options = {}) {
    await this.ensureSDKLoaded();
    
    // Datos mock para desarrollo
    const mockCampaigns = [
      {
        id: 'campaign_001',
        name: 'Campaña de Verano 2024 - Conversiones',
        objective: 'CONVERSIONS',
        status: 'ACTIVE',
        daily_budget: 150.00,
        lifetime_budget: 4500.00,
        created_time: '2024-05-15T10:00:00Z',
        updated_time: '2024-06-20T14:30:00Z',
        start_time: '2024-06-01T00:00:00Z',
        stop_time: '2024-08-31T23:59:59Z'
      },
      {
        id: 'campaign_002',
        name: 'Black Friday - Tráfico al Sitio',
        objective: 'LINK_CLICKS',
        status: 'PAUSED',
        daily_budget: 200.00,
        lifetime_budget: 6000.00,
        created_time: '2024-10-01T09:15:00Z',
        updated_time: '2024-10-15T16:45:00Z',
        start_time: '2024-11-20T00:00:00Z',
        stop_time: '2024-11-30T23:59:59Z'
      },
      {
        id: 'campaign_003',
        name: 'Brand Awareness Q4',
        objective: 'BRAND_AWARENESS',
        status: 'ACTIVE',
        daily_budget: 75.00,
        lifetime_budget: 2250.00,
        created_time: '2024-09-01T08:00:00Z',
        updated_time: '2024-09-15T11:20:00Z',
        start_time: '2024-10-01T00:00:00Z',
        stop_time: '2024-12-31T23:59:59Z'
      }
    ];

    return mockCampaigns.slice(0, options.limit || 50);
  }

  async getCampaignInsights(campaignIds, dateRange = {}) {
    await this.ensureSDKLoaded();
    
    // Datos mock para insights
    return campaignIds.map(campaignId => {
      const baseData = {
        campaign_id: campaignId,
        campaign_name: `Campaña ${campaignId.split('_')[1]}`,
        impressions: Math.floor(Math.random() * 20000) + 5000,
        reach: Math.floor(Math.random() * 15000) + 4000,
        clicks: Math.floor(Math.random() * 600) + 100,
        spend: (Math.random() * 2000 + 300).toFixed(2),
        ctr: (Math.random() * 5 + 1).toFixed(1),
        cpc: (Math.random() * 2 + 0.5).toFixed(2),
        conversions: Math.floor(Math.random() * 50) + 5
      };
      
      return {
        ...baseData,
        date_start: dateRange.since || '2024-01-01',
        date_stop: dateRange.until || '2024-12-31'
      };
    });
  }

  // Método para verificar el estado del SDK
  getSDKStatus() {
    return {
      isLoaded: this.isSDKLoaded,
      mode: this.FacebookAdsApi ? 'live' : 'mock'
    };
  }
}

// Instancia singleton del servicio
export const facebookAdsService = new FacebookAdsService();

// Inicializar automáticamente al cargar el módulo
facebookAdsService.initializeSDK().catch(console.error);
