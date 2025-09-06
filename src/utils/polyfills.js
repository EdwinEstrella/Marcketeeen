// Polyfills centralizados - ahora solo para util específicamente
export const installPolyfills = () => {
  console.log('Polyfills instalados para Node.js modules');
};

// Exportar util específicamente para CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    inherits: window.util?.inherits || function(ctor, superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
}
