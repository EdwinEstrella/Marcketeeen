// Paleta de colores centralizada para toda la aplicación
// Basada en las variables CSS definidas en index.css

export const COLORS = {
  // Colores principales
  primary: {
    DEFAULT: 'var(--primary)',
    light: 'rgba(158, 127, 255, 0.8)',
    dark: 'rgba(158, 127, 255, 0.6)',
    gradient: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)'
  },
  
  secondary: {
    DEFAULT: 'var(--secondary)',
    light: 'rgba(56, 189, 248, 0.8)',
    dark: 'rgba(56, 189, 248, 0.6)',
    gradient: 'linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)'
  },
  
  accent: {
    DEFAULT: 'var(--accent)',
    light: 'rgba(244, 114, 182, 0.8)',
    dark: 'rgba(244, 114, 182, 0.6)'
  },
  
  // Fondos y superficies
  background: {
    DEFAULT: 'var(--background)',
    card: 'var(--surface)',
    popover: 'var(--popover)'
  },
  
  surface: {
    DEFAULT: 'var(--surface)',
    light: 'rgba(30, 41, 59, 0.8)',
    dark: 'rgba(30, 41, 59, 0.6)'
  },
  
  // Texto
  text: {
    primary: 'var(--text)',
    secondary: 'var(--text-secondary)',
    muted: 'var(--muted-foreground)'
  },
  
  // Estados y feedback
  success: {
    DEFAULT: 'var(--success)',
    light: 'rgba(16, 185, 129, 0.2)',
    dark: 'rgba(16, 185, 129, 0.8)'
  },
  
  warning: {
    DEFAULT: 'var(--warning)',
    light: 'rgba(245, 158, 11, 0.2)',
    dark: 'rgba(245, 158, 11, 0.8)'
  },
  
  error: {
    DEFAULT: 'var(--error)',
    light: 'rgba(239, 68, 68, 0.2)',
    dark: 'rgba(239, 68, 68, 0.8)'
  },
  
  // Bordes e inputs
  border: {
    DEFAULT: 'var(--border)',
    input: 'var(--input)',
    focus: 'var(--ring)'
  },
  
  // Utilidades
  overlay: 'rgba(15, 23, 42, 0.8)',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  
  // Gradientes predefinidos
  gradients: {
    primary: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
    secondary: 'linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)',
    accent: 'linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)',
    surface: 'linear-gradient(135deg, var(--surface) 0%, rgba(30, 41, 59, 0.8) 100%)'
  },
  
  // Sombras y efectos
  shadows: {
    DEFAULT: 'var(--shadow)',
    glow: 'var(--glow)',
    card: '0 4px 20px rgba(0, 0, 0, 0.15)',
    button: '0 2px 10px rgba(0, 0, 0, 0.1)'
  }
}

// Funciones utilitarias para colores
export const colorUtils = {
  // Obtener color con opacidad
  withOpacity: (color, opacity) => {
    if (color.includes('var(')) {
      return color.replace(')', `, ${opacity})`).replace('(', 'a(')
    }
    return color
  },
  
  // Convertir a rgba si es un color CSS variable
  toRgba: (color, opacity = 1) => {
    const colorMap = {
      'var(--primary)': '158, 127, 255',
      'var(--secondary)': '56, 189, 248',
      'var(--accent)': '244, 114, 182',
      'var(--background)': '15, 23, 42',
      'var(--surface)': '30, 41, 59',
      'var(--text)': '248, 250, 252',
      'var(--text-secondary)': '203, 213, 225',
      'var(--border)': '51, 65, 85',
      'var(--success)': '16, 185, 129',
      'var(--warning)': '245, 158, 11',
      'var(--error)': '239, 68, 68'
    }
    
    return colorMap[color] ? `rgba(${colorMap[color]}, ${opacity})` : color
  }
}

// Exportar por defecto para fácil importación
export default COLORS
