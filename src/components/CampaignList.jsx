import React from 'react';
import { Play, Pause, Edit, BarChart3, Calendar, DollarSign } from 'lucide-react';
import { facebookAdsService } from '../services/facebookAdsService';

const CampaignList = ({ campaigns, onCampaignUpdated }) => {
  const formatCurrency = (amount, currency = 'USD') => {
    if (!amount) return '-';
    // Facebook devuelve el amount en centavos
    const dollars = amount / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(dollars);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'PAUSED':
        return 'bg-yellow-100 text-yellow-800';
      case 'DELETED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'Activa';
      case 'PAUSED':
        return 'Pausada';
      case 'DELETED':
        return 'Eliminada';
      default:
        return status;
    }
  };

  const getObjectiveLabel = (objective) => {
    const objectives = {
      'OUTCOME_TRAFFIC': 'Tráfico',
      'OUTCOME_ENGAGEMENT': 'Interacción',
      'OUTCOME_LEADS': 'Leads',
      'OUTCOME_SALES': 'Ventas',
      'OUTCOME_AWARENESS': 'Conciencia',
      'OUTCOME_APP_INSTALLS': 'Instalaciones'
    };
    return objectives[objective] || objective;
  };

  const handleToggleStatus = async (campaignId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
      await facebookAdsService.toggleCampaignStatus(campaignId, newStatus);
      onCampaignUpdated();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      alert('Error al cambiar el estado de la campaña');
    }
  };

  if (campaigns.length === 0) {
    return (
      <div className="p-8 text-center">
        <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No hay campañas</h3>
        <p className="mt-1 text-sm text-gray-500">
          Comienza creando tu primera campaña publicitaria.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Objetivo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Presupuesto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Creación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {campaign.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {campaign.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {getObjectiveLabel(campaign.objective)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                    {getStatusLabel(campaign.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {campaign.daily_budget ? (
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                        {formatCurrency(campaign.daily_budget)}/día
                      </div>
                    ) : campaign.lifetime_budget ? (
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                        {formatCurrency(campaign.lifetime_budget)} total
                      </div>
                    ) : (
                      '-'
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                    {formatDate(campaign.created_time)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleStatus(campaign.id, campaign.status)}
                      className={`p-2 rounded-md ${
                        campaign.status === 'ACTIVE' 
                          ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                      title={campaign.status === 'ACTIVE' ? 'Pausar' : 'Activar'}
                    >
                      {campaign.status === 'ACTIVE' ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </button>
                    
                    <button className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200">
                      <Edit className="h-4 w-4" />
                    </button>
                    
                    <button className="p-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                      <BarChart3 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignList;
