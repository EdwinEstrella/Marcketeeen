import React, { useState } from 'react'
import { Plus, Trash2, Play, Pause, Settings } from 'lucide-react'

const Automation = () => {
  const [rules, setRules] = useState([
    {
      id: 1,
      name: 'Pausar CPA Alto',
      description: 'Pausar anuncios cuando el CPA supera $50',
      status: 'active',
      conditions: [
        { metric: 'CPA', operator: '>', value: 50, duration: '24h' }
      ],
      actions: [
        { type: 'pause', target: 'ad' }
      ],
      scope: 'all_campaigns'
    },
    {
      id: 2,
      name: 'Optimizar ROAS Bajo',
      description: 'Aumentar presupuesto cuando ROAS es mayor a 5x',
      status: 'paused',
      conditions: [
        { metric: 'ROAS', operator: '>', value: 5, duration: '48h' }
      ],
      actions: [
        { type: 'increase_budget', target: 'campaign', value: 20 }
      ],
      scope: 'selected_campaigns'
    }
  ])

  const [showCreateRule, setShowCreateRule] = useState(false)
  const [newRule, setNewRule] = useState({
    name: '',
    description: '',
    conditions: [{ metric: 'CPA', operator: '>', value: '', duration: '24h' }],
    actions: [{ type: 'pause', target: 'ad' }],
    scope: 'all_campaigns'
  })

  const toggleRuleStatus = (id) => {
    setRules(rules.map(rule =>
      rule.id === id
        ? { ...rule, status: rule.status === 'active' ? 'paused' : 'active' }
        : rule
    ))
  }

  const addCondition = () => {
    setNewRule({
      ...newRule,
      conditions: [...newRule.conditions, { metric: 'CPA', operator: '>', value: '', duration: '24h' }]
    })
  }

  const removeCondition = (index) => {
    const newConditions = newRule.conditions.filter((_, i) => i !== index)
    setNewRule({ ...newRule, conditions: newConditions })
  }

  const updateCondition = (index, field, value) => {
    const newConditions = newRule.conditions.map((condition, i) =>
      i === index ? { ...condition, [field]: value } : condition
    )
    setNewRule({ ...newRule, conditions: newConditions })
  }

  const createRule = () => {
    const rule = {
      id: Date.now(),
      ...newRule,
      status: 'active'
    }
    setRules([...rules, rule])
    setShowCreateRule(false)
    setNewRule({
      name: '',
      description: '',
      conditions: [{ metric: 'CPA', operator: '>', value: '', duration: '24h' }],
      actions: [{ type: 'pause', target: 'ad' }],
      scope: 'all_campaigns'
    })
  }

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
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-medium">{rule.name}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    rule.status === 'active'
                      ? 'bg-success/20 text-success'
                      : 'bg-warning/20 text-warning'
                  }`}>
                    {rule.status === 'active' ? 'Activa' : 'Pausada'}
                  </span>
                </div>
                <p className="text-text-secondary mb-4">{rule.description}</p>
                
                <div className="grid grid-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Condiciones</h4>
                    {rule.conditions.map((condition, index) => (
                      <div key={index} className="text-sm text-text-secondary">
                        Si {condition.metric} {condition.operator} ${condition.value} por {condition.duration}
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Acciones</h4>
                    {rule.actions.map((action, index) => (
                      <div key={index} className="text-sm text-text-secondary">
                        {action.type === 'pause' && 'Pausar anuncio'}
                        {action.type === 'increase_budget' && `Aumentar presupuesto en ${action.value}%`}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleRuleStatus(rule.id)}
                  className="p-2 hover:bg-surface rounded-lg transition-colors"
                >
                  {rule.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button className="p-2 hover:bg-surface rounded-lg transition-colors">
                  <Settings size={16} />
                </button>
                <button className="p-2 hover:bg-surface rounded-lg transition-colors text-error">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Rule Modal */}
      {showCreateRule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">Crear Nueva Regla</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre de la Regla</label>
                <input
                  type="text"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  placeholder="Ej: Pausar CPA Alto"
                  className="w-full p-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descripción</label>
                <input
                  type="text"
                  value={newRule.description}
                  onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                  placeholder="Describe el propósito de esta regla"
                  className="w-full p-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Condiciones</label>
                  <button onClick={addCondition} className="text-sm text-primary">
                    + Agregar Condición
                  </button>
                </div>
                <div className="space-y-2">
                  {newRule.conditions.map((condition, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <select
                        value={condition.metric}
                        onChange={(e) => updateCondition(index, 'metric', e.target.value)}
                        className="flex-1 p-2 bg-surface border border-border rounded-lg text-text"
                      >
                        <option value="CPA">CPA</option>
                        <option value="ROAS">ROAS</option>
                        <option value="CTR">CTR</option>
                        <option value="CPC">CPC</option>
                      </select>
                      <select
                        value={condition.operator}
                        onChange={(e) => updateCondition(index, 'operator', e.target.value)}
                        className="w-20 p-2 bg-surface border border-border rounded-lg text-text"
                      >
                        <option value=">">{'>'}</option>
                        <option value="<">{'<'}</option>
                        <option value=">=">{'>='}</option>
                        <option value="<=">{'<='}</option>
                        <option value="==">==</option>
                      </select>
                      <input
                        type="number"
                        value={condition.value}
                        onChange={(e) => updateCondition(index, 'value', e.target.value)}
                        placeholder="Valor"
                        className="w-24 p-2 bg-surface border border-border rounded-lg text-text"
                      />
                      <select
                        value={condition.duration}
                        onChange={(e) => updateCondition(index, 'duration', e.target.value)}
                        className="w-24 p-2 bg-surface border border-border rounded-lg text-text"
                      >
                        <option value="1h">1 hora</option>
                        <option value="6h">6 horas</option>
                        <option value="24h">24 horas</option>
                        <option value="48h">48 horas</option>
                      </select>
                      {newRule.conditions.length > 1 && (
                        <button
                          onClick={() => removeCondition(index)}
                          className="p-2 text-error hover:bg-surface rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Acción</label>
                <select
                  value={newRule.actions[0].type}
                  onChange={(e) => setNewRule({
                    ...newRule,
                    actions: [{ type: e.target.value, target: 'ad' }]
                  })}
                  className="w-full p-3 bg-surface border border-border rounded-lg text-text"
                >
                  <option value="pause">Pausar Anuncio</option>
                  <option value="increase_budget">Aumentar Presupuesto</option>
                  <option value="decrease_budget">Reducir Presupuesto</option>
                  <option value="duplicate">Duplicar Campaña</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Alcance</label>
                <select
                  value={newRule.scope}
                  onChange={(e) => setNewRule({ ...newRule, scope: e.target.value })}
                  className="w-full p-3 bg-surface border border-border rounded-lg text-text"
                >
                  <option value="all_campaigns">Todas las Campañas</option>
                  <option value="selected_campaigns">Campañas Seleccionadas</option>
                  <option value="specific_campaign">Campaña Específica</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <button
                  onClick={createRule}
                  disabled={!newRule.name || !newRule.description}
                  className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Crear Regla
                </button>
                <button
                  onClick={() => setShowCreateRule(false)}
                  className="flex-1 btn btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Automation
