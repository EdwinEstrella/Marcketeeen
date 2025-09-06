// Polyfill completo para process
const processPolyfill = {
  env: {},
  nextTick: (callback) => setTimeout(callback, 0),
  platform: 'browser',
  versions: { 
    node: '16.0.0',
    v8: '9.4.146.24-node.21',
    uv: '1.42.0',
    zlib: '1.2.11',
    brotli: '1.0.9',
    ares: '1.18.1',
    modules: '93',
    nghttp2: '1.45.1',
    napi: '8',
    llhttp: '6.0.4',
    openssl: '1.1.1l+quic',
    cldr: '39.0',
    icu: '69.1',
    tz: '2021a',
    unicode: '13.0'
  },
  cwd: () => '/',
  hrtime: () => [performance.now() * 1000, 0],
  uptime: () => performance.now() / 1000,
  memoryUsage: () => ({
    rss: 0,
    heapTotal: 0,
    heapUsed: 0,
    external: 0,
    arrayBuffers: 0
  }),
  argv: [],
  pid: 1,
  ppid: 0,
  title: 'browser',
  arch: 'x64',
  release: {
    name: 'node',
    lts: 'Gallium'
  }
};

// Exportar para CommonJS y ES modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = processPolyfill;
} else {
  window.process = processPolyfill;
}

export default processPolyfill;
