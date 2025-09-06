// Facebook API Service with proper SDK handling and fallback
const FACEBOOK_ACCESS_TOKEN = 'EAAsZA9ZBw1ZAJcBPSWXrNaNv3uArITTRlZAPCHFZBuVY7LM4SfN2SZAnPJlGHs0UiTAqZAdFcKz8aZBbLjrmO96CeT7Dsg56BPX1HGJxKBOic9sQyfhwKGlFIdiYr7nk9OlSvvHbaRydnwAVU1rdf0RUUuyCv0ZBUuEZAYa2AK2zW6JFxMEBUhrRJpeFVaiciM92nSD26Hbm5ZC4mbX5M4J6AGcfQsK';

class FacebookAdsService {
  constructor() {
    this.account = null;
    this.sdk = null;
    this.isSDKLoaded = false;
    this.initPromise = null;
  }

  async initializeSDK() {
    if (this.isSDKLoaded) return;

    try {
      console.log('Attempting to load Facebook Business SDK...');
      
      // Dynamic import to avoid build-time issues
      const fbSDK = await import('facebook-nodejs-business-sdk');
      
      this.sdk = fbSDK;
      this.isSDKLoaded = true;
      console.log('Facebook Business SDK loaded successfully');
      
      // Initialize API
      const api = this.sdk.FacebookAdsApi.init(FACEBOOK_ACCESS_TOKEN);
      if (import.meta.env.MODE === 'development') {
        api.setDebug(true);
      }
      
      return api;
    } catch (error) {
      console.warn('Facebook SDK failed to load, using mock mode:', error.message);
      this.isSDKLoaded = true; // Mark as loaded to prevent retries
      return { mode: 'mock' };
    }
  }

  async ensureSDKLoaded() {
    if (!this.initPromise) {
      this.initPromise = this.initializeSDK();
    }
    return this.initPromise;
  }

  // Mock data for development
  getMockAccounts() {
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

  getMockCampaigns() {
    return [
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
      }
    ];
  }

  // Account methods
  async getAdAccounts() {
    await this.ensureSDKLoaded();
    
    if (!this.sdk) {
      return this.getMockAccounts();
    }

    try {
      const user = new this.sdk.User('me');
      const accounts = await user.getAdAccounts([
        this.sdk.AdAccount.Fields.id,
        this.sdk.AdAccount.Fields.name,
        this.sdk.AdAccount.Fields.account_status,
        this.sdk.AdAccount.Fields.amount_spent,
        this.sdk.AdAccount.Fields.balance,
        this.sdk.AdAccount.Fields.currency,
        this.sdk.AdAccount.Fields.timezone_name
      ]);

      return accounts;
    } catch (error) {
      console.error('Error getting accounts:', error);
      return this.getMockAccounts();
    }
  }

  setActiveAccount(accountId) {
    this.account = accountId;
  }

  // Campaign methods
  async getCampaigns(options = {}) {
    await this.ensureSDKLoaded();
    
    if (!this.sdk || !this.account) {
      return this.getMockCampaigns().slice(0, options.limit || 50);
    }

    try {
      const adAccount = new this.sdk.AdAccount(`act_${this.account}`);
      
      const fields = [
        this.sdk.Campaign.Fields.id,
        this.sdk.Campaign.Fields.name,
        this.sdk.Campaign.Fields.objective,
        this.sdk.Campaign.Fields.status,
        this.sdk.Campaign.Fields.daily_budget,
        this.sdk.Campaign.Fields.lifetime_budget,
        this.sdk.Campaign.Fields.created_time,
        this.sdk.Campaign.Fields.updated_time,
        this.sdk.Campaign.Fields.start_time,
        this.sdk.Campaign.Fields.stop_time
      ];

      const params = {
        limit: options.limit || 50,
        ...options.filters
      };

      const campaigns = await adAccount.getCampaigns(fields, params);
      return campaigns;
    } catch (error) {
      console.error('Error getting campaigns:', error);
      return this.getMockCampaigns().slice(0, options.limit || 50);
    }
  }

  async getCampaignInsights(campaignIds, dateRange = {}) {
    await this.ensureSDKLoaded();
    
    if (!this.sdk || !this.account) {
      // Mock insights
      return campaignIds.map(campaignId => ({
        campaign_id: campaignId,
        campaign_name: `Campaña ${campaignId.split('_')[1]}`,
        impressions: Math.floor(Math.random() * 20000) + 5000,
        reach: Math.floor(Math.random() * 15000) + 4000,
        clicks: Math.floor(Math.random() * 600) + 100,
        spend: (Math.random() * 2000 + 300).toFixed(2),
        ctr: (Math.random() * 5 + 1).toFixed(1),
        cpc: (Math.random() * 2 + 0.5).toFixed(2),
        conversions: Math.floor(Math.random() * 50) + 5,
        date_start: dateRange.since || '2024-01-01',
        date_stop: dateRange.until || '2024-12-31'
      }));
    }

    try {
      const adAccount = new this.sdk.AdAccount(`act_${this.account}`);
      
      const defaultDateRange = {
        since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        until: new Date().toISOString().split('T')[0]
      };

      const fields = [
        'campaign_id',
        'campaign_name',
        'impressions',
        'reach',
        'clicks',
        'spend',
        'ctr',
        'cpc',
        'cpm',
        'frequency',
        'actions',
        'conversions',
        'conversion_values'
      ];

      const params = {
        time_range: dateRange || defaultDateRange,
        level: 'campaign',
        filtering: [{ field: 'campaign.id', operator: 'IN', value: campaignIds }]
      };

      const insights = await adAccount.getInsights(fields, params);
      return insights;
    } catch (error) {
      console.error('Error getting insights:', error);
      return campaignIds.map(campaignId => ({
        campaign_id: campaignId,
        campaign_name: `Campaña ${campaignId.split('_')[1]}`,
        impressions: 0,
        reach: 0,
        clicks: 0,
        spend: '0.00',
        ctr: '0.0',
        cpc: '0.00',
        conversions: 0,
        date_start: dateRange.since || '2024-01-01',
        date_stop: dateRange.until || '2024-12-31'
      }));
    }
  }

  getSDKStatus() {
    return {
      isLoaded: this.isSDKLoaded,
      hasSDK: !!this.sdk,
      mode: this.sdk ? 'live' : 'mock'
    };
  }
}

// Export singleton instance
export const facebookAdsService = new FacebookAdsService();

// Auto-initialize
facebookAdsService.initializeSDK().catch(console.error);
