import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { facebookAdsService } from '../services/facebookAdsService';

const CampaignForm = ({ onCampaignCreated, accounts = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    objective: 'OUTCOME_TRAFFIC',
    status: 'PAUSED',
    dailyBudget: '',
    lifetimeBudget: '',
    accountId: accounts[0]?.id || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const campaignObjectives = [
    { value: 'OUTCOME_TRAFFIC', label: 'Tráfico' },
    { value: 'OUTCOME_ENGAGEMENT', label: 'Interacción' },
    { value: 'OUTCOME_LEADS', label: 'Generación de leads' },
    { value: 'OUTCOME_SALES', label: 'Ventas' },
    { value: 'OUTCOME_AWARENESS', label: 'Conciencia de marca' },
    { value: 'OUTCOME_APP_INSTALLS', label: 'Instalaciones de app' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Establecer cuenta activa
      if (formData.accountId) {
        facebookAdsService.setActiveAccount(formData.accountId);
      }

      const campaignData = {
        name: formData.name,
        objective: formData.objective,
        status: formData.status,
        ...(formData.dailyBudget && { dailyBudget: parseInt(formData.dailyBudget) * 100 }),
        ...(formData.lifetimeBudget && { lifetimeBudget: parseInt(formData.lifetimeBudget) * 100 })
      };

      const newCampaign = await facebookAdsService.createCampaign(campaignData);
      
      onCampaignCreated(newCampaign);
      
      // Reset form
      setFormData({
        name: '',
        objective: 'OUTCOME_TRAFFIC',
        status: 'PAUSED',
        dailyBudget: '',
        lifetimeBudget: '',
        accountId: accounts[0]?.id || ''
      });
      
    } catch (err) {
      setError(err.message || 'Error al crear la campaña');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Nueva Campaña</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {accounts.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuenta Publicitaria
            </label>
            <select
              name="accountId"
              value={formData.accountId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {accounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.name} ({account.id})
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de la Campaña
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Campaña de Verano 2024"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Objetivo
          </label>
          <select
            name="objective"
            value={formData.objective}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {campaignObjectives.map(obj => (
              <option key={obj.value} value={obj.value}>
                {obj.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Presupuesto Diario (USD)
            </label>
            <input
              type="number"
              name="dailyBudget"
              value={formData.dailyBudget}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="50"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Presupuesto Total (USD)
            </label>
            <input
              type="number"
              name="lifetimeBudget"
              value={formData.lifetimeBudget}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1000"
              min="1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado Inicial
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="PAUSED">Pausada</option>
            <option value="ACTIVE">Activa</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Creando...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Crear Campaña
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CampaignForm;
