import React, { useState } from 'react'
import { Plus, Filter, Search, Edit, Play, Pause, Trash2 } from 'lucide-react'

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Campaña Verano 2024',
      status: 'active',
      objective: 'Conversiones',
      budget: 5000,
      spent: 2340,
      impressions: 450000,
      clicks: 12600,
      roas: 3.8,
      startDate: '2024-06-01',
      endDate: '2024-08-31'
    },
    {
      id: 2,
      name: 'Promo Black Friday',
      status: 'paused',
      objective: 'Tráfico',
      budget: 8000,
      spent: 6120,
      impressions: 780000,
      clicks: 18900,
      roas: 2.1,
      startDate: '2024-11-20',
      endDate: '2024-11-30'
    },
    {
      id: 3,
      name: 'Lanzamiento Producto',
      status: 'active',
      objective: 'Conversiones',
      budget: 3000,
      spent: 1890,
      impressions: 210000,
      clicks: 8400,
      roas: 5.2,
      startDate: '2024-07-15',
      endDate: '2024-08-15'
    }
  ])

  const toggleCampaignStatus = (id) => {
    setCampaigns(campaigns.map(campaign =>
      campaign.id === id
        ? { ...campaign, status: campaign.status === 'active' ? 'paused' : 'active' }
        : campaign
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Campañas</h1>
          <p className="text-text-secondary">Crea y gestiona tus campañas de Facebook Ads</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={20} />
          Nueva Campaña
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Buscar campañas..."
              className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-text placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select className="px-4 py-2 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Todas las campañas</option>
            <option>Activas</option>
            <option>Pausadas</option>
          </select>
          <button className="btn btn-secondary">
            <Filter size={20} />
            Filtros
          </button>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">Campaña</th>
                <th className="text-left py-3 px-4">Objetivo</th>
                <th className="text-left py-3 px-4">Presupuesto</th>
                <th className="text-left py-3 px-4">ROAS</th>
                <th className="text-left py-3 px-4">Estado</th>
                <th className="text-left py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-border/50 hover:bg-surface/50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-sm text-text-secondary">
                        {campaign.impressions.toLocaleString()} impresiones
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {campaign.objective}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium">${campaign.budget.toLocaleString()}</p>
                    <p className="text-sm text-text-secondary">
                      Gastado: ${campaign.spent.toLocaleString()}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <div className={`flex items-center ${
                      campaign.roas >= 4 ? 'text-success' : campaign.roas >= 2 ? 'text-warning' : 'text-error'
                    }`}>
                      <span className="font-medium">{campaign.roas}x</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      campaign.status === 'active'
                        ? 'bg-success/20 text-success'
                        : 'bg-warning/20 text-warning'
                    }`}>
                      {campaign.status === 'active' ? 'Activa' : 'Pausada'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleCampaignStatus(campaign.id)}
                        className="p-2 hover:bg-surface rounded-lg transition-colors"
                      >
                        {campaign.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                      <button className="p-2 hover:bg-surface rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 hover:bg-surface rounded-lg transition-colors text-error">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Campaigns
