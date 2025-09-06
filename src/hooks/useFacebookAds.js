import { useState, useEffect } from 'react';
import { facebookAdsService } from '../services/facebookAdsService';

export const useFacebookAds = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sdkStatus, setSdkStatus] = useState({ isLoaded: false, mode: 'mock' });

  // Cargar cuentas publicitarias
  const loadAccounts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const accountsData = await facebookAdsService.getAdAccounts();
      setAccounts(accountsData);
      
      // Update SDK status
      setSdkStatus(facebookAdsService.getSDKStatus());
      
      // Seleccionar la primera cuenta por defecto
      if (accountsData.length > 0 && !selectedAccount) {
        await selectAccount(accountsData[0].id);
      }
      
      return accountsData;
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

  // Crear campaña
  const createCampaign = async (campaignData) => {
    setLoading(true);
    setError(null);
    
    try {
      const campaign = await facebookAdsService.createCampaign(campaignData);
      await loadCampaigns(); // Refresh the list
      return campaign;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar campaña
  const updateCampaign = async (campaignId, updates) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await facebookAdsService.updateCampaign(campaignId, updates);
      await loadCampaigns(); // Refresh the list
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cambiar estado de campaña
  const toggleCampaignStatus = async (campaignId, status) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await facebookAdsService.toggleCampaignStatus(campaignId, status);
      await loadCampaigns(); // Refresh the list
      return result;
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
    sdkStatus,
    
    // Acciones
    loadAccounts,
    selectAccount,
    loadCampaigns,
    getCampaignInsights,
    createCampaign,
    updateCampaign,
    toggleCampaignStatus,
    
    // Utilidades
    refetch: loadCampaigns
  };
};
