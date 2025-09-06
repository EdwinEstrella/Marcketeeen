// Simplified service that uses the compatible API wrapper
import { facebookAdsService } from './facebookApi.js';

class FacebookAdsServiceWrapper {
  constructor() {
    this.service = facebookAdsService;
  }

  async getAdAccounts() {
    return this.service.getAdAccounts();
  }

  setActiveAccount(accountId) {
    this.service.setActiveAccount(accountId);
  }

  async getCampaigns(options = {}) {
    return this.service.getCampaigns(options);
  }

  async getCampaignInsights(campaignIds, dateRange = {}) {
    return this.service.getCampaignInsights(campaignIds, dateRange);
  }

  async createCampaign(campaignData) {
    // Mock implementation for development
    console.log('Creating campaign (mock):', campaignData);
    
    const mockCampaign = {
      id: `campaign_${Math.random().toString(36).substr(2, 9)}`,
      name: campaignData.name,
      objective: campaignData.objective,
      status: campaignData.status || 'PAUSED',
      daily_budget: campaignData.dailyBudget || 0,
      lifetime_budget: campaignData.lifetimeBudget || 0,
      created_time: new Date().toISOString(),
      updated_time: new Date().toISOString()
    };
    
    return mockCampaign;
  }

  async updateCampaign(campaignId, updates) {
    // Mock implementation
    console.log('Updating campaign (mock):', campaignId, updates);
    return { success: true, id: campaignId, ...updates };
  }

  async toggleCampaignStatus(campaignId, status) {
    // Mock implementation
    console.log('Toggling campaign status (mock):', campaignId, status);
    return { success: true, id: campaignId, status };
  }

  getSDKStatus() {
    return this.service.getSDKStatus();
  }
}

// Export singleton instance
export const facebookAdsService = new FacebookAdsServiceWrapper();
