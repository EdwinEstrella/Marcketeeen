import React, { useState } from 'react'
import { Wand2, Image, FileText, Download, Copy, RefreshCw } from 'lucide-react'

const AICreative = () => {
  const [activeTab, setActiveTab] = useState('copy')
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')

  const generateContent = async () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      if (activeTab === 'copy') {
        setGeneratedContent(`¡Descubre nuestra increíble oferta de verano! 🌞

• Hasta 50% de descuento en productos seleccionados
• Envío gratis en compras superiores a $50
• Oferta válida hasta el 31 de agosto

¡No te lo pierdas! 🛍️

#OfertaVerano #Descuentos #ComprasOnline`)
      } else {
        setGeneratedContent('Imagen generada con IA - Vista previa disponible')
      }
      setIsGenerating(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">IA Creativa</h1>
        <p className="text-text-secondary">Genera contenido para anuncios con inteligencia artificial</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('copy')}
          className={`px-6 py-3 border-b-2 transition-colors ${
            activeTab === 'copy'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text'
          }`}
        >
          <FileText size={20} className="inline mr-2" />
          Generar Copy
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={`px-6 py-3 border-b-2 transition-colors ${
            activeTab === 'image'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text'
          }`}
        >
          <Image size={20} className="inline mr-2" />
          Generar Imágenes
        </button>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4">
            {activeTab === 'copy' ? 'Generar Copy' : 'Generar Imágenes'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  activeTab === 'copy' 
                    ? 'Describe tu producto, oferta o idea para generar copy persuasivo...'
                    : 'Describe la imagen que deseas generar para tu anuncio...'
                }
                rows={6}
                className="w-full p-3 bg-surface border border-border rounded-lg text-text placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {activeTab === 'copy' && (
              <div className="grid grid-2 gap-3">
                <select className="p-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Tono: Persuasive</option>
                  <option>Tono: Formal</option>
                  <option>Tono: Casual</option>
                  <option>Tono: Urgente</option>
                </select>
                <select className="p-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Longitud: Media</option>
                  <option>Longitud: Corta</option>
                  <option>Longitud: Larga</option>
                </select>
              </div>
            )}

            {activeTab === 'image' && (
              <div className="grid grid-2 gap-3">
                <select className="p-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Estilo: Realista</option>
                  <option>Estilo: Ilustración</option>
                  <option>Estilo: Minimalista</option>
                  <option>Estilo: Vibrante</option>
                </select>
                <select className="p-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Formato: Cuadrado</option>
                  <option>Formato: Horizontal</option>
                  <option>Formato: Vertical</option>
                </select>
              </div>
            )}

            <button
              onClick={generateContent}
              disabled={isGenerating || !prompt}
              className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={20} className="animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Wand2 size={20} />
                  Generar con IA
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Resultado Generado</h3>
          
          {isGenerating ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : generatedContent ? (
            <div className="space-y-4">
              {activeTab === 'copy' ? (
                <div className="p-4 bg-surface/50 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
                </div>
              ) : (
                <div className="p-4 bg-surface/50 rounded-lg text-center">
                  <Image size={48} className="mx-auto mb-4 text-text-secondary" />
                  <p className="text-text-secondary">{generatedContent}</p>
                  <div className="mt-4 p-4 border-2 border-dashed border-border rounded-lg">
                    <p className="text-sm text-text-secondary">Vista previa de la imagen generada</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={copyToClipboard} className="flex-1 btn btn-secondary">
                  <Copy size={16} />
                  Copiar
                </button>
                <button className="flex-1 btn btn-secondary">
                  <Download size={16} />
                  Descargar
                </button>
                <button onClick={generateContent} className="flex-1 btn btn-secondary">
                  <RefreshCw size={16} />
                  Regenerar
                </button>
              </div>

              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <p className="text-sm text-success">
                  ✅ Listo para usar en tu campaña. Puedes editarlo o regenerarlo si no te convence.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-text-secondary">
              <Wand2 size={48} className="mx-auto mb-4 opacity-50" />
              <p>Ingresa un prompt y genera contenido con IA</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AICreative
