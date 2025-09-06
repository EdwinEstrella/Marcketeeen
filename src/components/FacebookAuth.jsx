import React, { useState } from 'react';
import { Facebook, Loader, CheckCircle } from 'lucide-react';

const FacebookAuth = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState([]);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Simular conexión OAuth con Facebook
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Agregar cuenta de prueba (simulación)
      const newAccount = {
        id: `act_${Date.now()}`,
        name: 'Mi Cuenta de Facebook Ads',
        status: 'connected',
        currency: 'USD',
        timezone: 'America/New_York'
      };
      
      setConnectedAccounts([...connectedAccounts, newAccount]);
    } catch (error) {
      console.error('Error connecting to Facebook:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = (accountId) => {
    setConnectedAccounts(connectedAccounts.filter(acc => acc.id !== accountId));
  };

  return (
    <div className="space-y-6">
      {/* Conectar Nueva Cuenta */}
      <div className="card">
        <div className="text-center">
          <Facebook size={48} className="text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Conectar con Facebook Ads</h3>
          <p className="text-text-secondary mb-6">
            Conecta tu cuenta de Facebook para gestionar campañas y analizar métricas
          </p>
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="btn btn-primary w-full"
          >
            {isConnecting ? (
              <>
                <Loader size={20} className="animate-spin mr-2" />
                Conectando...
              </>
            ) : (
              'Conectar Cuenta de Facebook'
            )}
          </button>
        </div>
      </div>

      {/* Cuentas Conectadas */}
      {connectedAccounts.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-bold mb-4">Cuentas Conectadas</h3>
          <div className="space-y-3">
            {connectedAccounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle size={20} className="text-success mr-3" />
                  <div>
                    <div className="font-medium">{account.name}</div>
                    <div className="text-sm text-text-secondary">
                      {account.currency} • {account.timezone}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDisconnect(account.id)}
                  className="text-error hover:text-error/80 text-sm"
                >
                  Desconectar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Información de Permisos */}
      <div className="card bg-primary/10 border-primary/20">
        <div className="flex items-start">
          <div className="bg-primary/20 p-2 rounded-lg mr-4">
            <Facebook size={24} className="text-primary" />
          </div>
          <div>
            <h4 className="font-bold mb-2">Permisos Requeridos</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• ads_management - Gestión de campañas publicitarias</li>
              <li>• ads_read - Lectura de datos de anuncios</li>
              <li>• business_management - Gestión de cuentas</li>
              <li>• pages_manage_ads - Gestión de anuncios de páginas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacebookAuth;
