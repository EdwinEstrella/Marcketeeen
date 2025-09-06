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
      // Usar datos mock mientras resolvemos la compatibilidad del SDK
      const mockAccounts = [
        {
          id: 'act_123456789',
          name: 'Mi Cuenta Publicitaria',
          account_status: 1,
          amount_spent: 1500.75,
          balance: 500.25,
          currency: 'USD'
        }
      ];
      
      setAccounts(mockAccounts);
      
      // Seleccionar la primera cuenta por defecto
      if (mockAccounts.length > 0 && !selectedAccount) {
        await selectAccount(mockAccounts[0].id);
      }
      
      return mockAccounts;
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
      // Usar datos mock mientras resolvemos la compatibilidad
      const campaignList = await facebookAdsService.getCampaignsMock();
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
      const insights = await facebookAdsService.getCampaignInsightsMock(campaignIds, dateRange);
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
    getCampaignInsights,
    
    // Utilidades
    refetch: loadCampaigns
  };
};
