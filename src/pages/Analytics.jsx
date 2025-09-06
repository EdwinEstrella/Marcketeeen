import React from 'react';
import { BarChart3, PieChart, Download, Filter } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analítica</h1>
          <p className="text-text-secondary">Métricas y reportes de tus campañas</p>
        </div>
        <div className="flex gap-2">
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

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary">ROAS</p>
              <h3 className="text-2xl font-bold">4.2x</h3>
              <p className="text-sm text-success">+12% vs. mes anterior</p>
            </div>
            <BarChart3 size={24} className="text-primary" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary">Conversiones</p>
              <h3 className="text-2xl font-bold">1,243</h3>
              <p className="text-sm text-success">+8% vs. mes anterior</p>
            </div>
            <PieChart size={24} className="text-secondary" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary">CTR</p>
              <h3 className="text-2xl font-bold">2.8%</h3>
              <p className="text-sm text-warning">-3% vs. mes anterior</p>
            </div>
            <BarChart3 size={24} className="text-accent" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary">CPC</p>
              <h3 className="text-2xl font-bold">$0.42</h3>
              <p className="text-sm text-success">-5% vs. mes anterior</p>
            </div>
            <BarChart3 size={24} className="text-success" />
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold mb-4">ROAS por Campaña</h3>
          <div className="h-64 bg-surface/50 rounded-lg flex items-center justify-center">
            <BarChart3 size={48} className="text-text-secondary opacity-30" />
            <p className="text-text-secondary ml-2">Gráfico de ROAS</p>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-4">Distribución de Presupuesto</h3>
          <div className="h-64 bg-surface/50 rounded-lg flex items-center justify-center">
            <PieChart size={48} className="text-text-secondary opacity-30" />
            <p className="text-text-secondary ml-2">Gráfico de Torta</p>
          </div>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Rendimiento por Campaña</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">Campaña</th>
                <th className="text-left py-3 px-4">Presupuesto</th>
                <th className="text-left py-3 px-4">Gastado</th>
                <th className="text-left py-3 px-4">ROAS</th>
                <th className="text-left py-3 px-4">Conversiones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-4 px-4">Campaña Verano 2024</td>
                <td className="py-4 px-4">$5,000</td>
                <td className="py-4 px-4">$2,340</td>
                <td className="py-4 px-4 text-success">3.8x</td>
                <td className="py-4 px-4">243</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-4 px-4">Promo Black Friday</td>
                <td className="py-4 px-4">$8,000</td>
                <td className="py-4 px-4">$6,120</td>
                <td className="py-4 px-4 text-warning">2.1x</td>
                <td className="py-4 px-4">189</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
