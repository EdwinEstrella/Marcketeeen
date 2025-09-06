import React, { useState } from 'react';
import { Plus, Image, Video, Play, Pause, Edit } from 'lucide-react';

const AdManager = () => {
  const [ads, setAds] = useState([
    {
      id: 1,
      name: 'Anuncio Verano - Imagen',
      type: 'IMAGE',
      status: 'ACTIVE',
      campaign: 'Campaña Verano 2024',
      impressions: 8500,
      clicks: 240,
      spend: 1200,
      ctr: 2.82
    },
    {
      id: 2,
      name: 'Video Promocional Black Friday',
      type: 'VIDEO',
      status: 'PAUSED',
      campaign: 'Promo Black Friday',
      impressions: 6200,
      clicks: 180,
      spend: 950,
      ctr: 2.90
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const toggleAdStatus = (id) => {
    setAds(ads.map(ad =>
      ad.id === id
        ? { ...ad, status: ad.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' }
        : ad
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Anuncios</h1>
          <p className="text-text-secondary">Crea y gestiona tus anuncios de Facebook</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="btn btn-primary"
        >
          <Plus size={20} />
          Nuevo Anuncio
        </button>
      </div>

      {/* Lista de Anuncios */}
      <div className="grid gap-4">
        {ads.map((ad) => (
          <div key={ad.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className={`p-3 rounded-lg ${
                  ad.type === 'IMAGE' 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-secondary/20 text-secondary'
                }`}>
                  {ad.type === 'IMAGE' ? <Image size={24} /> : <Video size={24} />}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{ad.name}</h3>
                  <p className="text-text-secondary mb-3">{ad.campaign}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-text-secondary">Impresiones</p>
                      <p className="font-bold">{ad.impressions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Clics</p>
                      <p className="font-bold">{ad.clicks}</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">CTR</p>
                      <p className="font-bold">{ad.ctr}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Gasto</p>
                      <p className="font-bold">${(ad.spend / 100).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleAdStatus(ad.id)}
                  className={`p-2 rounded-lg ${
                    ad.status === 'ACTIVE'
                      ? 'bg-error/20 text-error hover:bg-error/30'
                      : 'bg-success/20 text-success hover:bg-success/30'
                  }`}
                >
                  {ad.status === 'ACTIVE' ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button className="p-2 text-text-secondary hover:bg-surface rounded-lg">
                  <Edit size={20} />
                </button>
              </div>
            </div>

            <div className={`mt-3 text-sm ${
              ad.status === 'ACTIVE' ? 'text-success' : 'text-text-secondary'
            }`}>
              {ad.status === 'ACTIVE' ? '✅ Anuncio activo' : '⏸️ Anuncio pausado'}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {ads.length === 0 && (
        <div className="card text-center py-12">
          <div className="text-text-secondary mb-4">
            <Image size={48} className="mx-auto opacity-50" />
          </div>
          <h3 className="text-xl font-bold mb-2">No hay anuncios creados</h3>
          <p className="text-text-secondary mb-4">
            Crea tu primer anuncio para empezar a promocionar en Facebook
          </p>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="btn btn-primary"
          >
            <Plus size={20} />
            Crear Primer Anuncio
          </button>
        </div>
      )}
    </div>
  );
};

export default AdManager;
