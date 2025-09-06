import React, { useState } from 'react';
import { Edit2, Trash2, Eye, BarChart2, MoreVertical } from 'lucide-react';
import { facebookAdsService } from '../services/facebookAdsService';

const CampaignList = ({ campaigns, onCampaignUpdated }) => {
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const getObjectiveColor = (objective) => {
    switch (objective) {
      case 'CONVERSIONS':
        return 'bg-purple-100 text-purple-800';
      case 'LINK_CLICKS':
        return 'bg-blue-100 text-blue-800';
      case 'REACH':
        return 'bg-orange-100 text-orange-800';
      case 'BRAND_AWARENESS':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD'
    }).format(amount);
  };

  const handleDeleteCampaign = async (campaignId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta campaña?')) {
      return;
    }

    setLoading(true);
    try {
      await facebookAdsService.deleteCampaign(campaignId);
      onCampaignUpdated();
    } catch (error) {
      console.error('Error deleting campaign:', error);
      alert('Error al eliminar la campaña: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (campaign) => {
    setLoading(true);
    try {
      const newStatus = campaign.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
      await facebookAdsService.updateCampaign(campaign.id, { status: newStatus });
      onCampaignUpdated();
    } catch (error) {
      console.error('Error updating campaign status:', error);
      alert('Error al actualizar el estado: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (campaigns.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 mb-4">
          <BarChart2 className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay campañas</h3>
        <p className="text-gray-600">Crea tu primera campaña para comenzar a publicitar.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="min-w-full">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">Nombre</div>
            <div className="col-span-2">Estado</div>
            <div className="col-span-2">Objetivo</div>
            <div className="col-span-2">Presupuesto</div>
            <div className="col-span-2">Fechas</div>
            <div className="col-span-1">Acciones</div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Nombre */}
                <div className="col-span-3">
                  <div className="font-medium text-gray-900">{campaign.name}</div>
                  <div className="text-sm text-gray-500">ID: {campaign.id}</div>
                </div>

                {/* Estado */}
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status === 'ACTIVE' ? 'Activa' : 
                     campaign.status === 'PAUSED' ? 'Pausada' : 
                     campaign.status === 'DELETED' ? 'Eliminada' : campaign.status}
                  </span>
                </div>

                {/* Objetivo */}
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getObjectiveColor(campaign.objective)}`}>
                    {campaign.objective === 'CONVERSIONS' ? 'Conversiones' :
                     campaign.objective === 'LINK_CLICKS' ? 'Clicks' :
                     campaign.objective === 'REACH' ? 'Alcance' :
                     campaign.objective === 'BRAND_AWARENESS' ? 'Branding' : campaign.objective}
                  </span>
                </div>

                {/* Presupuesto */}
                <div className="col-span-2">
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(campaign.budget, campaign.currency)}
                  </div>
                  <div className="text-xs text-gray-500">diario</div>
                </div>

                {/* Fechas */}
                <div className="col-span-2">
                  <div className="text-sm text-gray-900">
                    {new Date(campaign.start_time).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {campaign.end_time ? new Date(campaign.end_time).toLocaleDateString() : 'Sin fecha fin'}
                  </div>
                </div>

                {/* Acciones */}
                <div className="col-span-1">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleStatus(campaign)}
                      disabled={loading}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title={campaign.status === 'ACTIVE' ? 'Pausar campaña' : 'Activar campaña'}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      disabled={loading}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Eliminar campaña"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignList;
