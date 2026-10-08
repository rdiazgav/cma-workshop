'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import path from 'path';
import fs from 'fs-extra';
import yaml from 'yaml-js';
import childProcess from 'child_process';

const { series, watch } = gulp;
const bs = browserSync.create();

const config = yaml.load(fs.readFileSync('dev-site.yml', 'utf8'));
const outputDir = path.resolve(config.output ? config.output.dir : 'gh-pages');

function clean(done) {
  fs.removeSync(outputDir);
  done();
}

function antoraBuild(done) {
  const result = childProcess.spawnSync('npx', ['antora', '--stacktrace', 'dev-site.yml'], { stdio: 'inherit' });
  if (result.status !== 0) {
    console.error('Antora build failed');
  }
  done();
}

function serve(done) {
  bs.init({
    server: { baseDir: outputDir },
    port: 3000,
    open: false,
  });
  done();
}

function watchFiles() {
  watch('documentation/**/*', series(antoraBuild, () => bs.reload()));
}

const dev = series(clean, antoraBuild, serve, watchFiles);
const workshopSite = series(clean, antoraBuild);

export { clean, dev as default, workshopSite };
