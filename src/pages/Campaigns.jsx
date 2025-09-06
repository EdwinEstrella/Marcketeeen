import React, { useState, useEffect } from 'react';
import { Plus, Filter, Search, Calendar } from 'lucide-react';
import CampaignForm from '../components/CampaignForm';
import CampaignList from '../components/CampaignList';
import { facebookAdsService } from '../services/facebookAdsService';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAccounts();
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      loadCampaigns();
    }
  }, [selectedAccount]);

  const loadAccounts = async () => {
    try {
      const accountsData = await facebookAdsService.getAdAccounts();
      setAccounts(accountsData);
      if (accountsData.length > 0) {
        setSelectedAccount(accountsData[0].id);
      }
    } catch (err) {
      setError('Error al cargar las cuentas: ' + err.message);
    }
  };

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      facebookAdsService.setActiveAccount(selectedAccount);
      const campaignsData = await facebookAdsService.getCampaigns();
      setCampaigns(campaignsData);
    } catch (err) {
      setError('Error al cargar las campañas: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCampaignCreated = (newCampaign) => {
    setCampaigns(prev => [newCampaign, ...prev]);
    setShowCreateForm(false);
  };

  const handleAccountChange = (accountId) => {
    setSelectedAccount(accountId);
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campañas</h1>
          <p className="text-gray-600 mt-2">Gestiona tus campañas publicitarias de Facebook</p>
        </div>
        
        <button
          onClick={() => setShowCreateForm(true)}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nueva Campaña
        </button>
      </div>

      {/* Selector de cuenta */}
      {accounts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar Cuenta Publicitaria
          </label>
          <select
            value={selectedAccount}
            onChange={(e) => handleAccountChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {accounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.name} - {account.currency} (Saldo: {account.balance})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Formulario de creación */}
      {showCreateForm && (
        <CampaignForm
          onCampaignCreated={handleCampaignCreated}
          accounts={accounts}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {/* Lista de campañas */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Campañas {selectedAccount && `(Cuenta: ${accounts.find(a => a.id === selectedAccount)?.name})`}
            </h2>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar campañas..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <Filter className="h-4 w-4 text-gray-600" />
              </button>
              
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <Calendar className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Cargando campañas...</p>
          </div>
        ) : (
          <CampaignList campaigns={campaigns} onCampaignUpdated={loadCampaigns} />
        )}
      </div>
    </div>
  );
};

export default Campaigns;
