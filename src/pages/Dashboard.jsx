import React from 'react'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer,
  DollarSign,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

const Dashboard = () => {
  const stats = [
    {
      title: 'ROAS',
      value: '4.2x',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-success'
    },
    {
      title: 'Conversiones',
      value: '1,243',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Impresiones',
      value: '2.4M',
      change: '+15%',
      trend: 'up',
      icon: Eye,
      color: 'text-secondary'
    },
    {
      title: 'CTR',
      value: '2.8%',
      change: '-3%',
      trend: 'down',
      icon: MousePointer,
      color: 'text-warning'
    }
  ]

  const recentCampaigns = [
    {
      id: 1,
      name: 'Campaña Verano 2024',
      status: 'active',
      budget: '$5,000',
      spent: '$2,340',
      roas: '3.8x',
      impressions: '450K'
    },
    {
      id: 2,
      name: 'Promo Black Friday',
      status: 'paused',
      budget: '$8,000',
      spent: '$6,120',
      roas: '2.1x',
      impressions: '780K'
    },
    {
      id: 3,
      name: 'Lanzamiento Producto',
      status: 'active',
      budget: '$3,000',
      spent: '$1,890',
      roas: '5.2x',
      impressions: '210K'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-text-secondary">Resumen del rendimiento de tus campañas</p>
        </div>
        <div className="flex gap-3">
          <Link to="/campaigns" className="btn btn-primary">
            Nueva Campaña
          </Link>
          <Link to="/ai-creative" className="btn btn-secondary">
            Generar con IA
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown
          return (
            <div key={index} className="card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <div className={`flex items-center mt-2 text-sm ${stat.trend === 'up' ? 'text-success' : 'text-error'}`}>
                    <TrendIcon size={14} />
                    <span className="ml-1">{stat.change}</span>
                    <span className="ml-2">vs. semana anterior</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-surface/50 ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Campaigns */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Campañas Recientes</h3>
          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{campaign.name}</h4>
                  <p className="text-sm text-text-secondary">
                    {campaign.budget} • {campaign.impressions} impresiones
                  </p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    campaign.status === 'active' 
                      ? 'bg-success/20 text-success' 
                      : 'bg-warning/20 text-warning'
                  }`}>
                    {campaign.status === 'active' ? 'Activa' : 'Pausada'}
                  </div>
                  <p className="text-sm font-medium mt-1">ROAS: {campaign.roas}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-4">Próximas Acciones</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-surface/50 rounded-lg">
              <Calendar size={20} className="text-primary mr-3" />
              <div>
                <p className="font-medium">Revisar Campaña Verano</p>
                <p className="text-sm text-text-secondary">Mañana a las 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-surface/50 rounded-lg">
              <TrendingUp size={20} className="text-secondary mr-3" />
              <div>
                <p className="font-medium">Optimizar ROAS bajo</p>
                <p className="text-sm text-text-secondary">2 campañas necesitan atención</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-surface/50 rounded-lg">
              <DollarSign size={20} className="text-success mr-3" />
              <div>
                <p className="font-medium">Reporte Mensual</p>
                <p className="text-sm text-text-secondary">Generar para cliente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
