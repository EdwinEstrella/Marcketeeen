import React, { useState } from 'react';
import { Wand2, Image, Download } from 'lucide-react';

const AICreative = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');

  const generateCopy = async () => {
    setIsGenerating(true);
    try {
      // Integrar con OpenAI API
      const response = await fetch('/api/ai/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      setGeneratedCopy(data.copy);
    } catch (error) {
      console.error('Error generating copy:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImage = async () => {
    // Integrar con DALL-E 3 API
    console.log('Generating image with prompt:', imagePrompt);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">IA Creativa</h1>
        <p className="text-text-secondary">Genera copy y creatividades con Inteligencia Artificial</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Generador de Copy */}
        <div className="card">
          <div className="flex items-center mb-4">
            <Wand2 size={24} className="text-primary mr-2" />
            <h3 className="text-xl font-bold">Generador de Copy</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Describe tu producto o idea:</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ej: Anuncio para un nuevo café orgánico premium..."
                className="w-full p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary"
                rows={4}
              />
            </div>
            
            <button
              onClick={generateCopy}
              disabled={!prompt || isGenerating}
              className="btn btn-primary w-full"
            >
              {isGenerating ? 'Generando...' : 'Generar Copy'}
            </button>

            {generatedCopy && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Copy Generado:</label>
                <div className="p-4 bg-surface/50 rounded-lg border border-border">
                  <p className="text-foreground">{generatedCopy}</p>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="btn btn-secondary">
                    <Download size={16} />
                    Copiar
                  </button>
                  <button className="btn btn-primary">Usar en Anuncio</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Generador de Imágenes */}
        <div className="card">
          <div className="flex items-center mb-4">
            <Image size={24} className="text-secondary mr-2" />
            <h3 className="text-xl font-bold">Generador de Imágenes</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Describe la imagen:</label>
              <textarea
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                placeholder="Ej: Taza de café artesanal con granos tostados, estilo minimalista..."
                className="w-full p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary"
                rows={4}
              />
            </div>
            
            <button
              onClick={generateImage}
              disabled={!imagePrompt}
              className="btn btn-secondary w-full"
            >
              Generar Imagen
            </button>

            {generatedImage && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Imagen Generada:</label>
                <div className="bg-surface/50 rounded-lg border border-border p-4">
                  <img 
                    src={generatedImage} 
                    alt="Generated" 
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="btn btn-secondary">
                    <Download size={16} />
                    Descargar
                  </button>
                  <button className="btn btn-primary">Usar en Anuncio</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICreative;
