// Polyfill completo para crypto
const cryptoPolyfill = {
  randomBytes(size) {
    const array = new Uint8Array(size);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(array);
    } else {
      // Fallback para entornos sin crypto
      for (let i = 0; i < size; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
    }
    return array;
  },

  createHash(algorithm) {
    return {
      update(data) {
        this.data = data;
        return this;
      },
      digest(encoding) {
        // Hash simulado para desarrollo
        const hash = new Uint8Array(32);
        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
          crypto.getRandomValues(hash);
        }
        
        if (encoding === 'hex') {
          return Array.from(hash).map(b => b.toString(16).padStart(2, '0')).join('');
        }
        return hash;
      }
    };
  },

  createHmac(algorithm, key) {
    return {
      update(data) {
        this.data = data;
        return this;
      },
      digest(encoding) {
        // HMAC simulado para desarrollo
        const hmac = new Uint8Array(32);
        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
          crypto.getRandomValues(hmac);
        }
        
        if (encoding === 'hex') {
          return Array.from(hmac).map(b => b.toString(16).padStart(2, '0')).join('');
        }
        return hmac;
      }
    };
  }
};

// Añadir métodos adicionales si existen en el crypto global
if (typeof crypto !== 'undefined') {
  Object.assign(cryptoPolyfill, {
    getRandomValues: crypto.getRandomValues.bind(crypto),
    subtle: crypto.subtle
  });
}

// Exportar para CommonJS y ES modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = cryptoPolyfill;
} else {
  window.crypto = { ...window.crypto, ...cryptoPolyfill };
}

export default cryptoPolyfill;
