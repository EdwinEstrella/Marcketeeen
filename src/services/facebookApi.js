import { FacebookAdsApi, AdAccount, Campaign, AdSet, Ad, AdCreative, Insights } from 'facebook-nodejs-business-sdk';

// Configurar la API de Facebook
const FACEBOOK_ACCESS_TOKEN = 'EAAsZA9ZBw1ZAJcBPSWXrNaNv3uArITTRlZAPCHFZBuVY7LM4SfN2SZAnPJlGHs0UiTAqZAdFcKz8aZBbLjrmO96CeT7Dsg56BPX1HGJxKBOic9sQyfhwKGlFIdiYr7nk9OlSvvHbaRydnwAVU1rdf0RUUuyCv0ZBUuEZAYa2AK2zW6JFxMEBUhrRJpeFVaiciM92nSD26Hbm5ZC4mbX5M4J6AGcfQsK';
const api = FacebookAdsApi.init(FACEBOOK_ACCESS_TOKEN);

// Habilitar modo debug en desarrollo
if (process.env.NODE_ENV === 'development') {
  api.setDebug(true);
}

class FacebookAdsService {
  constructor() {
    this.account = null;
  }

  // Obtener todas las cuentas publicitarias del usuario
  async getAdAccounts() {
    try {
      const user = new User('me');
      const accounts = await user.getAdAccounts([
        AdAccount.Fields.id,
        AdAccount.Fields.name,
        AdAccount.Fields.account_status,
        AdAccount.Fields.amount_spent,
        AdAccount.Fields.balance,
        AdAccount.Fields.currency,
        AdAccount.Fields.timezone_name
      ]);

      return accounts;
    } catch (error) {
      console.error('Error al obtener cuentas:', error);
      throw new Error('No se pudieron obtener las cuentas publicitarias');
    }
  }

  // Establecer cuenta publicitaria activa
  setActiveAccount(accountId) {
    this.account = new AdAccount(`act_${accountId}`);
  }

  // Obtener campañas de la cuenta
  async getCampaigns(options = {}) {
    if (!this.account) {
      throw new Error('No hay cuenta publicitaria seleccionada');
    }

    try {
      const fields = [
        Campaign.Fields.id,
        Campaign.Fields.name,
        Campaign.Fields.objective,
        Campaign.Fields.status,
        Campaign.Fields.daily_budget,
        Campaign.Fields.lifetime_budget,
        Campaign.Fields.created_time,
        Campaign.Fields.updated_time,
        Campaign.Fields.start_time,
        Campaign.Fields.stop_time
      ];

      const params = {
        limit: options.limit || 50,
        ...options.filters
      };

      const campaigns = await this.account.getCampaigns(fields, params);
      return campaigns;
    } catch (error) {
      console.error('Error al obtener campañas:', error);
      throw new Error('No se pudieron obtener las campañas');
    }
  }

  // Crear nueva campaña
  async createCampaign(campaignData) {
    if (!this.account) {
      throw new Error('No hay cuenta publicitaria seleccionada');
    }

    try {
      const campaignParams = {
        [Campaign.Fields.name]: campaignData.name,
        [Campaign.Fields.objective]: campaignData.objective,
        [Campaign.Fields.status]: campaignData.status || Campaign.Status.paused,
      };

      if (campaignData.dailyBudget) {
        campaignParams[Campaign.Fields.daily_budget] = campaignData.dailyBudget;
      }

      if (campaignData.lifetimeBudget) {
        campaignParams[Campaign.Fields.lifetime_budget] = campaignData.lifetimeBudget;
      }

      const campaign = await this.account.createCampaign([Campaign.Fields.id], campaignParams);
      return campaign;
    } catch (error) {
      console.error('Error al crear campaña:', error);
      throw new Error('No se pudo crear la campaña');
    }
  }

  // Actualizar campaña
  async updateCampaign(campaignId, updates) {
    try {
      const campaign = new Campaign(campaignId);
      
      const updateParams = {};
      
      if (updates.name) updateParams[Campaign.Fields.name] = updates.name;
      if (updates.status) updateParams[Campaign.Fields.status] = updates.status;
      if (updates.dailyBudget) updateParams[Campaign.Fields.daily_budget] = updates.dailyBudget;
      if (updates.lifetimeBudget) updateParams[Campaign.Fields.lifetime_budget] = updates.lifetimeBudget;

      const result = await campaign.update([], updateParams);
      return result;
    } catch (error) {
      console.error('Error al actualizar campaña:', error);
      throw new Error('No se pudo actualizar la campaña');
    }
  }

  // Obtener ad sets de una campaña
  async getAdSets(campaignId) {
    try {
      const campaign = new Campaign(campaignId);
      
      const adSets = await campaign.getAdSets([
        AdSet.Fields.id,
        AdSet.Fields.name,
        AdSet.Fields.status,
        AdSet.Fields.daily_budget,
        AdSet.Fields.lifetime_budget,
        AdSet.Fields.bid_amount,
        AdSet.Fields.billing_event,
        AdSet.Fields.optimization_goal,
        AdSet.Fields.start_time,
        AdSet.Fields.end_time
      ]);

      return adSets;
    } catch (error) {
      console.error('Error al obtener ad sets:', error);
      throw new Error('No se pudieron obtener los ad sets');
    }
  }

  // Obtener anuncios de un ad set
  async getAds(adSetId) {
    try {
      const adSet = new AdSet(adSetId);
      
      const ads = await adSet.getAds([
        Ad.Fields.id,
        Ad.Fields.name,
        Ad.Fields.status,
        Ad.Fields.created_time,
        Ad.Fields.updated_time
      ]);

      return ads;
    } catch (error) {
      console.error('Error al obtener anuncios:', error);
      throw new Error('No se pudieron obtener los anuncios');
    }
  }

  // Obtener insights de campañas
  async getCampaignInsights(campaignIds, dateRange = {}) {
    try {
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

      const insights = await this.account.getInsights(fields, params);
      return insights;
    } catch (error) {
      console.error('Error al obtener insights:', error);
      throw new Error('No se pudieron obtener los insights');
    }
  }

  // Obtener detalles de un anuncio específico
  async getAdDetails(adId) {
    try {
      const ad = new Ad(adId);
      const details = await ad.read([
        Ad.Fields.id,
        Ad.Fields.name,
        Ad.Fields.status,
        Ad.Fields.created_time,
        Ad.Fields.updated_time,
        Ad.Fields.adset_id,
        Ad.Fields.campaign_id,
        Ad.Fields.creative
      ]);

      return details;
    } catch (error) {
      console.error('Error al obtener detalles del anuncio:', error);
      throw new Error('No se pudieron obtener los detalles del anuncio');
    }
  }

  // Cambiar estado de campaña (activar/pausar)
  async toggleCampaignStatus(campaignId, status) {
    try {
      const campaign = new Campaign(campaignId);
      const result = await campaign.update([], {
        [Campaign.Fields.status]: status
      });
      return result;
    } catch (error) {
      console.error('Error al cambiar estado de campaña:', error);
      throw new Error('No se pudo cambiar el estado de la campaña');
    }
  }

  // Obtener creativos de anuncios
  async getAdCreatives(adIds) {
    try {
      const creatives = [];
      
      for (const adId of adIds) {
        const ad = new Ad(adId);
        const creative = await ad.getAdCreative([
          AdCreative.Fields.id,
          AdCreative.Fields.name,
          AdCreative.Fields.object_story_spec,
          AdCreative.Fields.image_url,
          AdCreative.Fields.body,
          AdCreative.Fields.title
        ]);
        
        creatives.push(creative);
      }

      return creatives;
    } catch (error) {
      console.error('Error al obtener creativos:', error);
      throw new Error('No se pudieron obtener los creativos');
    }
  }
}

// Instancia singleton del servicio
export const facebookAdsService = new FacebookAdsService();
