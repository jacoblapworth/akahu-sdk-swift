/* eslint-disable no-console */
const sassKss = require('./sass/kss');
const xuiCss = require('./xui.js');
const buildStyleguide = require('./styleguidist.js');
const buildStorybook = require('./storybook.js');
const buildKss = require('./kss.js');
const buildTokens = require('./postcss/tokens');
const buildUmd = require('./umd_webpack.js');
const buildServiceWorker = require('./serviceworker');

async function build() {
  await Promise.all([sassKss(), xuiCss()]);
  await Promise.all([
    buildStyleguide(),
    buildKss({
      skipPostCss: true,
    }),
    buildStorybook(),
    buildTokens(),
  ]);
  await buildUmd();
  await buildServiceWorker();
}

module.exports = build;
require('make-runnable/custom')({
  printOutputFrame: false,
});
