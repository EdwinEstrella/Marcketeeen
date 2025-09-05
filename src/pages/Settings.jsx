import React, { useState } from 'react'
import { Save, Trash2, Key, User, Bell, Shield, Download, Upload } from 'lucide-react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account')
  const [settings, setSettings] = useState({
    account: {
      companyName: 'Agencia Digital',
      email: 'admin@agencia.com',
      timezone: 'America/Mexico_City',
      currency: 'USD'
    },
    notifications: {
      emailAlerts: true,
      performanceReports: true,
      budgetAlerts: true,
      ruleTriggers: true
    },
    integrations: {
      facebookConnected: true,
      openaiConnected: false
    }
  })

  const updateSetting = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }))
  }

  const tabs = [
    { id: 'account', label: 'Cuenta', icon: User },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'integrations', label: 'Integraciones', icon: Key },
    { id: 'security', label: 'Seguridad', icon: Shield }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-text-secondary">Gestiona la configuración de tu cuenta y preferencias</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:text-text hover:bg-surface/50'
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="card">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Configuración de Cuenta</h3>
                
                <div className="grid grid-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre de la Empresa</label>
                    <input
                      type="text"
                      value={settings.account.companyName}
                      onChange={(e) => updateSetting('account', 'companyName', e.target.value)}
                      className="w-full p-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={settings.account.email}
                      onChange={(e) => updateSetting('account', 'email', e.target.value)}
                      className="w-full p-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Zona Horaria</label>
                    <select
                      value={settings.account.timezone}
                      onChange={(e) => updateSetting('account', 'timezone', e.target.value)}
                      className="w-full p-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="America/Mexico_City">Ciudad de México (UTC-6)</option>
                      <option value="America/New_York">Nueva York (UTC-5)</option>
                      <option value="America/Los_Angeles">Los Ángeles (UTC-8)</option>
                      <option value="Europe/Madrid">Madrid (UTC+1)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Moneda</label>
                    <select
                      value={settings.account.currency}
                      onChange={(e) => updateSetting('account', 'currency', e.target.value)}
                      className="w-full p-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="MXN">MXN ($)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <button className="btn btn-primary">
                    <Save size={20} />
                    Guardar Cambios
                  </button>
                  <button className="btn btn-secondary">
                    <Download size={20} />
                    Exportar Datos
                  </button>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Preferencias de Notificaciones</h3>
                
                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
                      <div>
                        <p className="font-medium">
                          {key === 'emailAlerts' && 'Alertas por Email'}
                          {key === 'performanceReports' && 'Reportes de Rendimiento'}
                          {key === 'budgetAlerts' && 'Alertas de Presupuesto'}
                          {key === 'ruleTriggers' && 'Activación de Reglas'}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {key === 'emailAlerts' && 'Recibir alertas importantes por email'}
                          {key === 'performanceReports' && 'Reportes diarios de rendimiento'}
                          {key === 'budgetAlerts' && 'Alertas cuando el presupuesto está por agotarse'}
                          {key === 'ruleTriggers' && 'Notificaciones cuando las reglas se activan'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => updateSetting('notifications', key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <button className="btn btn-primary">
                  <Save size={20} />
                  Guardar Preferencias
                </button>
              </div>
            )}

            {/* Integrations */}
            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Integraciones</h3>
                
                <div className="space-y-4">
                  {/* Facebook Integration */}
                  <div className="p-4 bg-surface/50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">f</span>
                        </div>
                        <div>
                          <p className="font-medium">Facebook Marketing API</p>
                          <p className="text-sm text-text-secondary">
                            {settings.integrations.facebookConnected ? 'Conectado' : 'No conectado'}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        settings.integrations.facebookConnected
                          ? 'bg-success/20 text-success'
                          : 'bg-warning/20 text-warning'
                      }`}>
                        {settings.integrations.facebookConnected ? 'Conectado' : 'Desconectado'}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mb-4">
                      Conecta tu cuenta de Facebook Ads para gestionar campañas, audiencias y métricas.
                    </p>
                    <button className={`btn ${settings.integrations.facebookConnected ? 'btn-secondary' : 'btn-primary'}`}>
                      {settings.integrations.facebookConnected ? 'Reconectar' : 'Conectar Facebook'}
                    </button>
                  </div>

                  {/* OpenAI Integration */}
                  <div className="p-4 bg-surface/50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">AI</span>
                        </div>
                        <div>
                          <p className="font-medium">OpenAI API</p>
                          <p className="text-sm text-text-secondary">
                            {settings.integrations.openaiConnected ? 'Conectado' : 'No conectado'}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        settings.integrations.openaiConnected
                          ? 'bg-success/20 text-success'
                          : 'bg-warning/20 text-warning'
                      }`}>
                        {settings.integrations.openaiConnected ? 'Conectado' : 'Desconectado'}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mb-4">
                      Conecta con OpenAI para generar copy e imágenes con IA para tus anuncios.
                    </p>
                    <button className={`btn ${settings.integrations.openaiConnected ? 'btn-secondary' : 'btn-primary'}`}>
                      {settings.integrations.openaiConnected ? 'Reconectar' : 'Conectar OpenAI'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Seguridad</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-surface/50 rounded-lg">
                    <h4 className="font-medium mb-2">Cambiar Contraseña</h4>
                    <p className="text-sm text-text-secondary mb-4">
                      Actualiza tu contraseña regularmente para mantener tu cuenta segura.
                    </p>
                    <button className="btn btn-primary">
                      Cambiar Contraseña
                    </button>
                  </div>

                  <div className="p-4 bg-surface/50 rounded-lg">
                    <h4 className="font-medium mb-2">Autenticación de Dos Factores</h4>
                    <p className="text-sm text-text-secondary mb-4">
                      Añade una capa adicional de seguridad a tu cuenta con 2FA.
                    </p>
                    <button className="btn btn-secondary">
                      Configurar 2FA
                    </button>
                  </div>

                  <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
                    <h4 className="font-medium mb-2 text-error">Zona de Peligro</h4>
                    <p className="text-smtext-error mb-4">
                      Estas acciones no se pueden deshacer. Por favor, procede con cuidado.
                    </p>
                    <button className="btn bg-error text-white hover:bg-error/90">
                      <Trash2 size={16} />
                      Eliminar Cuenta
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
