// Polyfills completos para módulos de Node.js que el SDK de Facebook necesita

// Polyfill para util.inherits
if (typeof window !== 'undefined') {
  // Polyfill para util.inherits
  if (typeof window.util === 'undefined') {
    window.util = {};
  }
  
  if (typeof window.util.inherits === 'undefined') {
    window.util.inherits = function(ctor, superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    };
  }

  // Polyfill para otros módulos comunes de Node.js
  if (typeof window.process === 'undefined') {
    window.process = {
      env: {},
      nextTick: (callback) => setTimeout(callback, 0),
      platform: 'browser',
      versions: { node: '16.0.0' }
    };
  }

  if (typeof window.Buffer === 'undefined') {
    window.Buffer = {
      from: (str) => new TextEncoder().encode(str),
      isBuffer: () => false
    };
  }

  if (typeof window.stream === 'undefined') {
    window.stream = {};
  }

  if (typeof window.crypto === 'undefined') {
    window.crypto = {
      randomBytes: (size) => {
        const array = new Uint8Array(size);
        window.crypto.getRandomValues(array);
        return array;
      },
      getRandomValues: (array) => {
        for (let i = 0; i < array.length; i++) {
          array[i] = Math.floor(Math.random() * 256);
        }
        return array;
      }
    };
  }
}

// Exportar para uso global
export const installPolyfills = () => {
  console.log('Polyfills instalados para el SDK de Facebook');
};
