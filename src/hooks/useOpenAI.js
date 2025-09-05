import { useState } from 'react'

export const useOpenAI = () => {
  const [isLoading, setIsLoading] = useState(false)

  const generateText = async (prompt, options = {}) => {
    setIsLoading(true)
    try {
      // Simulate OpenAI API call
      const response = await new Promise(resolve => setTimeout(() => {
        const responses = {
          'marketing': `¡Descubre nuestra increíble oferta! 🎯

• Hasta 50% de descuento en productos seleccionados
• Envío gratis en compras superiores a $50
• Oferta válida por tiempo limitado

¡No te lo pierdas! 🛍️

#OfertaEspecial #Descuentos #ComprasOnline`,
          'product': `🌟 ¡Nuevo Producto Disponible! 🌟

Experimenta la diferencia con nuestro último lanzamiento. Diseñado para maximizar tu productividad y simplificar tu vida.

✨ Características principales:
• Tecnología avanzada
• Diseño elegante
• Fácil de usar

¡Hazte con el tuyo hoy! 🚀`,
          'default': `¡Impulsa tu negocio con nuestra solución premium! 💼

Obtén resultados excepcionales con:
• Estrategias comprobadas
• Soporte expert