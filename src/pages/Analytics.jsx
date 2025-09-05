import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Download, Filter, Calendar } from 'lucide-react'

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7d')

  const performanceData = [
    { date: 'Jun 1', impressions: 45000, clicks: 1200, conversions: 45, spend: 1200 },
    { date: 'Jun 2', impressions: 52000, clicks: 1450, conversions: 52, spend: 1450 },
    { date: 'Jun 3', impressions: 48000, clicks: 1300, conversions: 48, spend: 1300 },
    { date: 'Jun 4', impressions: 61000, clicks: 1800, conversions: 61, spend: 1800 },
    { date: 'Jun 5', impressions: 55000, clicks: 1600, conversions: 55, spend: 1600 },
    { date: 'Jun 6', impressions: 49000, clicks: 1350, conversions: 49, spend: 1350 },
    { date: 'Jun 7', impressions: 53000, clicks: 1500, conversions: 53, spend: 1500 }
  ]

  const campaignData = [
    { name: 'Campaña Verano', value: 45, color: '#9E7FFF' },
    { name: 'Promo Black Friday', value: 25, color: '#38bdf8' },
    { name: 'Lanzamiento Producto', value: 20, color: '#f472b6' },
    { name: 'Otras Campañas', value: 10, color: '#10b981' }
  ]

  const metrics = [
    { label: 'ROAS', value: '4.2x', change: '+12%', trend: 'up' },
    { label: 'CPA', value: '$38.50', change: '-8%', trend: 'down' },
    { label: 'CTR', value: '2.8%', change: '+5%', trend: 'up' },
    { label: 'Conversiones', value: '1,243', change: '+15%', trend: 'up' }
  ]

  const COLORS = ['#9E7FFF', '#38bdf8', '#f472b6', '#10b981', '#f59e0b']

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reporting</h1>
          <p className="text-text-secondary">Métricas y análisis de rendimiento de tus campañas</p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
            <option value="custom">Personalizado</option>
          </select>
          <button className="btn btn-secondary">
            <Filter size={20} />
            Filtros
          </button>
          <button className="btn btn-primary">
            <Download size={20} />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">{metric.label}</p>
                <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                <div className={`flex items-center mt-2 text-sm ${
                  metric.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  <span>{metric.change}</span>
                  <span className="ml-2">vs. período anterior</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${
                metric.trend === 'up' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
              }`}>
                {metric.trend === 'up' ? '↗' : '↘'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Rendimiento por Día</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" />
                <XAxis dataKey="date" stroke="#A3A3A3" />
                <YAxis stroke="#A3A3A3" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#262626', 
                    border: '1px solid #2F2F2F',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="impressions" fill="#9E7FFF" name="Impresiones" />
                <Bar dataKey="clicks" fill="#38bdf8" name="Clics" />
                <Bar dataKey="conversions" fill="#10b981" name="Conversiones" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign Distribution */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Distribución por Campaña</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={campaignData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {campaignData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#262626', 
                    border: '1px solid #2F2F2F',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ROAS Trend */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Tendencia de ROAS</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData.map((d, i) => ({ date: d.date, roas: (d.spend / d.conversions).toFixed(1) }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" />
                <XAxis dataKey="date" stroke="#A3A3A3" />
                <YAxis stroke="#A3A3A3" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#262626', 
                    border: '1px solid #2F2F2F',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="roas" stroke="#f472b6" strokeWidth={2} dot={{ fill: '#f472b6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spend vs Conversions */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Inversión vs Conversiones</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2F2F2F" />
                <XAxis dataKey="date" stroke="#A3A3A3" />
                <YAxis stroke="#A3A3A3" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#262626', 
                    border: '1px solid #2F2F2F',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="spend" fill="#f59e0b" name="Inversión ($)" />
                <Bar dataKey="conversions" fill="#10b981" name="Conversiones" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Datos Detallados</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">Fecha</th>
                <th className="text-left py-3 px-4">Impresiones</th>
                <th className="text-left py-3 px-4">Clics</th>
                <th className="text-left py-3 px-4">CTR</th>
                <th className="text-left py-3 px-4">Conversiones</th>
                <th className="text-left py-3 px-4">CPA</th>
                <th className="text-left py-3 px-4">ROAS</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((data, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-surface/50">
                  <td className="py-3 px-4">{data.date}</td>
                  <td className="py-3 px-4">{data.impressions.toLocaleString()}</td>
                  <td className="py-3 px-4">{data.clicks.toLocaleString()}</td>
                  <td className="py-3 px-4">{((data.clicks / data.impressions) * 100).toFixed(1)}%</td>
                  <td className="py-3 px-4">{data.conversions}</td>
                  <td className="py-3 px-4">${(data.spend / data.conversions).toFixed(2)}</td>
                  <td className="py-3 px-4">{((data.conversions * 100) / data.spend).toFixed(1)}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Analytics
