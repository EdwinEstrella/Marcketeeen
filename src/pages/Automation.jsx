import React, { useState } from 'react';
import { Plus, Trash2, Play, Pause } from 'lucide-react';

const Automation = () => {
  const [rules, setRules] = useState([
    {
      id: 1,
      name: 'Pausar CPA Alto',
      description: 'Pausar anuncio si el CPA excede $20',
      conditions: [{ metric: 'cpa', operator: '>', value: 20 }],
      actions: ['pause_ad'],
      status: 'active'
    }
  ]);

  const [showCreateRule, setShowCreateRule] = useState(false);

  const toggleRuleStatus = (id) => {
    setRules(rules.map(rule =>
      rule.id === id
        ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
        : rule
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Automatización</h1>
          <p className="text-text-secondary">Crea reglas automáticas para optimizar tus campañas</p>
        </div>
        <button 
          onClick={() => setShowCreateRule(true)}
          className="btn btn-primary"
        >
          <Plus size={20} />
          Nueva Regla
        </button>
      </div>

      {/* Rules List */}
      <div className="grid gap-4">
        {rules.map((rule) => (
          <div key={rule.id} className="card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg">{rule.name}</h3>
                <p className="text-text-secondary">{rule.description}</p>
                <div className="mt-2">
                  <span className="text-sm text-text-secondary">
                    Condición: {rule.conditions[0].metric} {rule.conditions[0].operator} ${rule.conditions[0].value}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleRuleStatus(rule.id)}
                  className={`p-2 rounded-lg ${
                    rule.status === 'active' 
                      ? 'bg-success/20 text-success' 
                      : 'bg-surface text-text-secondary'
                  }`}
                >
                  {rule.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button className="p-2 text-error hover:bg-error/10 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className={`mt-3 text-sm ${
              rule.status === 'active' ? 'text-success' : 'text-text-secondary'
            }`}>
              {rule.status === 'active' ? '✅ Regla activa' : '⏸️ Regla pausada'}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {rules.length === 0 && (
        <div className="card text-center py-12">
          <div className="text-text-secondary mb-4">
            <Play size={48} className="mx-auto opacity-50" />
          </div>
          <h3 className="text-xl font-bold mb-2">No hay reglas de automatización</h3>
          <p className="text-text-secondary mb-4">
            Crea tu primera regla para optimizar automáticamente tus campañas
          </p>
          <button className="btn btn-primary">
            <Plus size={20} />
            Crear Primera Regla
          </button>
        </div>
      )}
    </div>
  );
};

export default Automation;
