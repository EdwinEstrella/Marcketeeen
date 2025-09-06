import React, { useState } from 'react';
import { Plus, Filter, BarChart3, Target, DollarSign, Calendar } from 'lucide-react';

const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Campaña Verano 2024',
      objective: 'CONVERSIONS',
      status: 'ACTIVE',
      dailyBudget: 5000,
      spent: 2340,
      impressions: 12500,
      clicks: 350,
      conversions: 24
    },
    {
      id: 2,
      name: 'Promo Black Friday',
      objective: 'TRAFFIC',
      status: 'PAUSED',
      dailyBudget: 8000,
      spent: 6120,
      impressions: 18700,
      clicks: 420,
      conversions: 18
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    objective: 'CONVERSIONS',
    dailyBudget: '',
    status: 'PAUSED'
  });

  const campaignObjectives = [
    { value: 'CONVERSIONS', label: 'Conversiones', icon: Target },
    { value: 'TRAFFIC', label: 'Tráfico', icon: BarChart3 },
    { value: 'REACH', label: 'Alcance', icon: BarChart3 },
    { value: 'ENGAGEMENT', label: 'Interacción', icon: BarChart3 },
    { value: 'LEAD_GENERATION', label: 'Generación de Leads', icon: Target }
  ];

  const handleCreateCampaign = () => {
    const campaign = {
      id: Date.now(),
      ...newCampaign,
      dailyBudget: parseInt(newCampaign.dailyBudget),
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0
    };
    
    setCampaigns([...campaigns, campaign]);
    setNewCampaign({
      name: '',
      objective: 'CONVERSIONS',
      dailyBudget: '',
      status: 'PAUSED'
    });
    setShowCreateForm(false);
  };

  const toggleCampaignStatus = (id) => {
    setCampaigns(campaigns.map(campaign =>
      campaign.id === id
        ? { ...campaign, status: campaign.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' }
        : campaign
    ));
  };

  const getObjectiveIcon = (objective) => {
    const obj = campaignObjectives.find(o => o.value === objective);
    return obj ? obj.icon : BarChart3;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Campañas</h1>
          <p className="text-text-secondary">Crea y gestiona tus campañas de Facebook Ads</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary">
            <Filter size={20} />
            Filtros
          </button>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="btn btn-primary"
          >
            <Plus size={20} />
            Nueva Campaña
          </button>
        </div>
      </div>

      {/* Formulario de Creación */}
      {showCreateForm && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Crear Nueva Campaña</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre de la Campaña</label>
              <input
                type="text"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                placeholder="Ej: Campaña Verano 2024"
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Objetivo</label>
              <select
                value={newCampaign.objective}
                onChange={(e) => setNewCampaign({...newCampaign, objective: e.target.value})}
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
              >
                {campaignObjectives.map((obj) => (
                  <option key={obj.value} value={obj.value}>
                    {obj.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Presupuesto Diario ($)</label>
              <input
                type="number"
                value={newCampaign.dailyBudget}
                onChange={(e) => setNewCampaign({...newCampaign, dailyBudget: e.target.value})}
                placeholder="5000"
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Estado Inicial</label>
              <select
                value={newCampaign.status}
                onChange={(e) => setNewCampaign({...newCampaign, status: e.target.value})}
                className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="PAUSED">Pausada</option>
                <option value="ACTIVE">Activa</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={handleCreateCampaign}
              disabled={!newCampaign.name || !newCampaign.dailyBudget}
              className="btn btn-primary"
            >
              Crear Campaña
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de Campañas */}
      <div className="grid gap-4">
        {campaigns.map((campaign) => {
          const ObjectiveIcon = getObjectiveIcon(campaign.objective);
          const ctr = campaign.impressions > 0 ? (campaign.clicks / campaign.impressions * 100).toFixed(2) : 0;
          const cpc = campaign.clicks > 0 ? (campaign.spent / campaign.clicks / 100).toFixed(2) : 0;
          
          return (
            <div key={campaign.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      campaign.status === 'ACTIVE' 
                        ? 'bg-success/20 text-success' 
                        : 'bg-surface text-text-secondary'
                    }`}>
                      <ObjectiveIcon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{campaign.name}</h3>
                      <p className="text-text-secondary">
                        {campaignObjectives.find(o => o.value === campaign.objective)?.label}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-text-secondary">Presupuesto</p>
                      <p className="font-bold">${(campaign.dailyBudget / 100).toFixed(2)}/día</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Gastado</p>
                      <p className="font-bold">${(campaign.spent / 100).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">CTR</p>
                      <p className="font-bold">{ctr}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">CPC</p>
                      <p className="font-bold">${cpc}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleCampaignStatus(campaign.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      campaign.status === 'ACTIVE'
                        ? 'bg-error/20 text-error hover:bg-error/30'
                        : 'bg-success/20 text-success hover:bg-success/30'
                    }`}
                  >
                    {campaign.status === 'ACTIVE' ? 'Pausar' : 'Activar'}
                  </button>
                  <button className="p-2 text-text-secondary hover:bg-surface rounded-lg">
                    <BarChart3 size={20} />
                  </button>
                </div>
              </div>

              <div className={`mt-3 text-sm ${
                campaign.status === 'ACTIVE' ? 'text-success' : 'text-text-secondary'
              }`}>
                {campaign.status === 'ACTIVE' ? '✅ Campaña activa' : '⏸️ Campaña pausada'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {campaigns.length === 0 && !showCreateForm && (
        <div className="card text-center py-12">
          <div className="text-text-secondary mb-4">
            <Target size={48} className="mx-auto opacity-50" />
          </div>
          <h3 className="text-xl font-bold mb-2">No hay campañas creadas</h3>
          <p className="text-text-secondary mb-4">
            Crea tu primera campaña de Facebook Ads para empezar
          </p>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="btn btn-primary"
          >
            <Plus size={20} />
            Crear Primera Campaña
          </button>
        </div>
      )}
    </div>
  );
};

export default CampaignManager;
