const browsers = require('@xero/browserslist-autoprefixer');

const productionConfig = {
  presets: [
    [
      '@babel/preset-env',
      process.env.ES6_OUTPUT === 'true'
        ? {
            // These settings ensure that Babel produces ES6-spec-compliant modules rather than ES5 in commonJS.
            modules: false,
            targets: {
              esmodules: true,
            },
          }
        : {
            // These settings produce ES5 commonJS-based output that works in the browsers defined in @xero/browserslist-autoprefixer
            useBuiltIns: 'usage',
            corejs: '3',
            targets: {
              browsers,
              node: 10,
            },
          },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};

const babelConfig = {
  sourceType: 'unambiguous',
  env: {
    development: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: '3',
            targets: {
              browsers,
              node: 10,
            },
          },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
    },
    production: productionConfig,
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: '3',
            targets: {
              browsers,
              node: 10,
            },
          },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: [
        [
          'babel-plugin-transform-require-ignore',
          {
            extensions: ['.scss'],
          },
        ],
        [
          '@babel/plugin-transform-runtime',
          {
            regenerator: true,
          },
        ],
      ],
    },
  },
};

module.exports = babelConfig;
