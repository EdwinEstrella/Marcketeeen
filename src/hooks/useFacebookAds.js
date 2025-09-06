import { useState, useEffect } from 'react';
import { facebookAdsService } from '../services/facebookApi';

export const useFacebookAds = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar cuentas publicitarias
  const loadAccounts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const adAccounts = await facebookAdsService.getAdAccounts();
      setAccounts(adAccounts);
      
      // Seleccionar la primera cuenta por defecto
      if (adAccounts.length > 0 && !selectedAccount) {
        await selectAccount(adAccounts[0].id);
      }
      
      return adAccounts;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Seleccionar cuenta publicitaria
  const selectAccount = async (accountId) => {
    setLoading(true);
    setError(null);
    
    try {
      facebookAdsService.setActiveAccount(accountId);
      setSelectedAccount(accountId);
      
      // Cargar campañas de la cuenta seleccionada
      await loadCampaigns();
      
      return accountId;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cargar campañas
  const loadCampaigns = async () => {
    if (!selectedAccount) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const campaignList = await facebookAdsService.getCampaigns();
      setCampaigns(campaignList);
      return campaignList;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Crear nueva campaña
  const createCampaign = async (campaignData) => {
    setLoading(true);
    setError(null);
    
    try {
      const newCampaign = await facebookAdsService.createCampaign(campaignData);
      
      // Recargar campañas después de crear una nueva
      await loadCampaigns();
      
      return newCampaign;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cambiar estado de campaña
  const toggleCampaignStatus = async (campaignId, currentStatus) => {
    setLoading(true);
    setError(null);
    
    try {
      const newStatus = currentStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
      const result = await facebookAdsService.toggleCampaignStatus(campaignId, newStatus);
      
      // Actualizar estado local
      setCampaigns(prev => prev.map(campaign =>
        campaign.id === campaignId
          ? { ...campaign, status: newStatus }
          : campaign
      ));
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Obtener insights de campañas
  const getCampaignInsights = async (campaignIds, dateRange) => {
    setLoading(true);
    setError(null);
    
    try {
      const insights = await facebookAdsService.getCampaignInsights(campaignIds, dateRange);
      return insights;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    loadAccounts();
  }, []);

  return {
    // Estado
    accounts,
    selectedAccount,
    campaigns,
    loading,
    error,
    
    // Acciones
    loadAccounts,
    selectAccount,
    loadCampaigns,
    createCampaign,
    toggleCampaignStatus,
    getCampaignInsights,
    
    // Utilidades
    refetch: loadCampaigns
  };
};
