'use strict';
var proxy = require('http-proxy-middleware');
var fallback = require('connect-history-api-fallback');
var log = require('connect-logger');


var apiProxy = proxy('/api', {
    target: 'http://localhost:3030',
    changeOrigin: true
});

/*
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 */
module.exports = {
  injectChanges: false, // workaround for Angular 2 styleUrls loading
  files: ['./**/*.{html,htm,css,js}'],
  watchOptions: {
    ignored: 'node_modules'
  },
  server: {
    baseDir: './',
    middleware: [
      log({ format: '%date %status %method %url' }),
      apiProxy,
      fallback({
        index: '/index.html',
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'] // systemjs workaround
      })
    ]
  }
};
