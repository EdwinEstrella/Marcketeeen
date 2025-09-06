// Polyfill completo para Buffer
class BufferPolyfill extends Uint8Array {
  static from(value, encoding = 'utf8') {
    if (typeof value === 'string') {
      const encoder = new TextEncoder();
      return encoder.encode(value);
    } else if (Array.isArray(value)) {
      return new Uint8Array(value);
    } else if (value instanceof ArrayBuffer) {
      return new Uint8Array(value);
    }
    return new Uint8Array(0);
  }

  static alloc(size, fill = 0, encoding = 'utf8') {
    const buffer = new Uint8Array(size);
    if (fill !== 0) {
      if (typeof fill === 'string') {
        const encoder = new TextEncoder();
        const fillBytes = encoder.encode(fill);
        for (let i = 0; i < size; i++) {
          buffer[i] = fillBytes[i % fillBytes.length];
        }
      } else {
        buffer.fill(fill);
      }
    }
    return buffer;
  }

  static isBuffer(obj) {
    return obj instanceof Uint8Array;
  }

  toString(encoding = 'utf8') {
    const decoder = new TextDecoder(encoding);
    return decoder.decode(this);
  }
}

// Exportar para CommonJS y ES modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BufferPolyfill;
} else {
  window.Buffer = BufferPolyfill;
}

export default BufferPolyfill;
