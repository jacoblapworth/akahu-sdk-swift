const browsers = require('@xero/browserslist-autoprefixer');

const classPropertiesPlugin = [
  '@babel/plugin-proposal-class-properties',
  {
    loose: true,
  },
];

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
            },
          },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [classPropertiesPlugin],
};

const babelConfig = {
  sourceType: 'unambiguous',
  env: {
    development: {
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      plugins: [classPropertiesPlugin],
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
        classPropertiesPlugin,
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
