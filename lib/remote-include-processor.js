'use strict';

const https = require('https');
const http = require('http');
const { URL } = require('url');

module.exports.register = function register (registry) {
  registry.includeProcessor(function () {
    const self = this;
    self.handles(function (target) {
      return target.startsWith('https://') || target.startsWith('http://');
    });
    self.process(function (doc, reader, target, attrs) {
      const parsedUrl = new URL(target);
      const client = parsedUrl.protocol === 'https:' ? https : http;
      let content = '';
      const req = client.get(target, (res) => {
        res.on('data', (chunk) => { content += chunk; });
        res.on('end', () => {
          reader.pushInclude(content, target, target, 1, attrs);
        });
      });
      req.on('error', (err) => {
        console.error(`Remote include failed for ${target}: ${err.message}`);
      });
    });
  });
};
