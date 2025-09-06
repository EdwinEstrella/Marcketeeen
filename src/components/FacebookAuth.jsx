import React, { useState } from 'react';
import { Facebook, Loader } from 'lucide-react';

const FacebookAuth = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Implementar OAuth flow con Facebook Marketing API
    try {
      // Redirect to Facebook OAuth
      window.location.href = `/api/auth/facebook`;
    } catch (error) {
      console.error('Error connecting to Facebook:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
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
            'Conectar Cuenta'
          )}
        </button>
      </div>
    </div>
  );
};

export default FacebookAuth;
