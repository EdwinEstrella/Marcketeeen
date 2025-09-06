import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer,
  DollarSign,
  Calendar,
  ArrowUp,
  ArrowDown,
  Loader
} from 'lucide-react';
import { useFacebookAds } from '../hooks/useFacebookAds';
import AccountSelector from '../components/AccountSelector';

const Dashboard = () => {
  const { 
    accounts, 
    selectedAccount, 
    campaigns, 
    loading, 
    error,
    selectAccount,
    getCampaignInsights 
  } = useFacebookAds();

  const [insights, setInsights] = useState([]);
  const [overallMetrics, setOverallMetrics] = useState(null);

  // Cargar insights cuando cambien las campañas
  useEffect(() => {
    if (campaigns.length > 0 && selectedAccount) {
      loadInsights();
    }
  }, [campaigns, selectedAccount]);

  const loadInsights = async () => {
    try {
      const campaignIds = campaigns.map(campaign => campaign.id);
      const insightsData = await getCampaignInsights(campaignIds);
      setInsights(insightsData);

      // Calcular métricas generales
      const totalSpend = insightsData.reduce((sum, insight) => sum + (parseFloat(insight.spend) || 0), 0);
      const totalImpressions = insightsData.reduce((sum, insight) => sum + (parseInt(insight.impressions) || 0), 0);
      const totalClicks = insightsData.reduce((sum, insight) => sum + (parseInt(insight.clicks) || 0), 0);
      const totalConversions = insightsData.reduce((sum, insight) => sum + (parseInt(insight.conversions) || 0), 0);

      const overallCtr = totalImpressions > 0 ? (totalClicks / totalImpressions * 100) : 0;
      const overallCpc = totalClicks > 0 ? (totalSpend / totalClicks) : 0;
      const overallRoas = totalSpend > 0 ? (totalConversions * 100 / totalSpend) : 0; // Simulación de ROAS

      setOverallMetrics({
        spend: totalSpend,
        impressions: totalImpressions,
        clicks: totalClicks,
        conversions: totalConversions,
        ctr: overallCtr,
        cpc: overallCpc,
        roas: overallRoas
      });
    } catch (err) {
      console.error('Error loading insights:', err);
    }
  };

  const stats = overallMetrics ? [
    {
      title: 'ROAS',
      value: `${overallMetrics.roas.toFixed(1)}x`,
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-success'
    },
    {
      title: 'Conversiones',
      value: overallMetrics.conversions.toLocaleString(),
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Impresiones',
      value: `${(overallMetrics.impressions / 1000).toFixed(1)}K`,
      change: '+15%',
      trend: 'up',
      icon: Eye,
      color: 'text-secondary'
    },
    {
      title: 'CTR',
      value: `${overallMetrics.ctr.toFixed(2)}%`,
      change: '-3%',
      trend: 'down',
      icon: MousePointer,
      color: 'text-warning'
    }
  ] : [];

  if (loading && !accounts.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-text-secondary">Resumen del rendimiento de tus campañas</p>
        </div>
        <div className="flex gap-3">
          <Link to="/campaigns" className="btn-primary">
            Nueva Campaña
          </Link>
        </div>
      </div>

      {/* Selector de Cuenta */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4">Seleccionar Cuenta Publicitaria</h3>
        <AccountSelector
          accounts={accounts}
          selectedAccount={selectedAccount}
          onSelectAccount={selectAccount}
          loading={loading}
        />
      </div>

      {error && (
        <div className="card bg-error/20 border-error/30">
          <p className="text-error">{error}</p>
        </div>
      )}

      {/* Stats Grid */}
      {overallMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown
            return (
              <div key={index} className="card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1 text-foreground">{stat.value}</h3>
                    <div className={`flex items-center mt-2 text-sm ${stat.trend === 'up' ? 'text-success' : 'text-error'}`}>
                      <TrendIcon size={14} />
                      <span className="ml-1">{stat.change}</span>
                      <span className="ml-2 text-text-secondary">vs. semana anterior</span>
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
      )}

      {/* Campañas Recientes */}
      {campaigns.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4 text-foreground">Campañas Activas</h3>
          <div className="space-y-4">
            {campaigns.slice(0, 5).map((campaign) => {
              const campaignInsights = insights.find(insight => insight.campaign_id === campaign.id);
              
              return (
                <div key={campaign.id} className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{campaign.name}</h4>
                    <p className="text-sm text-text-secondary">
                      {campaign.objective} • ${(campaign.daily_budget / 100).toFixed(2)}/día
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      campaign.status === 'ACTIVE' 
                        ? 'bg-success/20 text-success' 
                        : 'bg-warning/20 text-warning'
                    }`}>
                      {campaign.status === 'ACTIVE' ? 'Activa' : 'Pausada'}
                    </div>
                    {campaignInsights && (
                      <p className="text-sm font-medium mt-1 text-foreground">
                        Gasto: ${(parseFloat(campaignInsights.spend) / 100).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {campaigns.length === 0 && selectedAccount && (
        <div className="card text-center py-12">
          <div className="text-text-secondary mb-4">
            <TrendingUp size={48} className="mx-auto opacity-50" />
          </div>
          <h3 className="text-xl font-bold mb-2">No hay campañas en esta cuenta</h3>
          <p className="text-text-secondary mb-4">
            Crea tu primera campaña para empezar a ver métricas
          </p>
          <Link to="/campaigns" className="btn btn-primary">
            Crear Primera Campaña
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
