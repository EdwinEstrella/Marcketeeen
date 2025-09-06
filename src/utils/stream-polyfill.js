// Polyfills básicos para stream (solo las interfaces necesarias)
class Readable {
  constructor(options = {}) {
    this._readableState = {
      objectMode: !!options.objectMode,
      highWaterMark: options.highWaterMark || 16384,
      buffer: [],
      length: 0,
      pipes: null,
      flowing: null,
      ended: false,
      endEmitted: false,
      reading: false
    };
  }

  pipe(dest, options) {
    // Implementación simplificada
    return dest;
  }

  read(size) {
    return null;
  }

  push(chunk, encoding) {
    return true;
  }
}

class Writable {
  constructor(options = {}) {
    this._writableState = {
      objectMode: !!options.objectMode,
      highWaterMark: options.highWaterMark || 16384,
      buffer: [],
      length: 0,
      writing: false,
      ended: false,
      finished: false
    };
  }

  write(chunk, encoding, cb) {
    return true;
  }

  end(chunk, encoding, cb) {
    return this;
  }
}

class Duplex extends Readable {
  constructor(options = {}) {
    super(options);
  }

  write(chunk, encoding, cb) {
    return true;
  }

  end(chunk, encoding, cb) {
    return this;
  }
}

class Transform extends Duplex {
  constructor(options = {}) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    callback(null, chunk);
  }
}

const streamPolyfill = {
  Readable,
  Writable,
  Duplex,
  Transform,
  Stream: Readable,
  PassThrough: Transform
};

// Exportar para CommonJS y ES modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = streamPolyfill;
} else {
  window.stream = streamPolyfill;
}

export default streamPolyfill;
