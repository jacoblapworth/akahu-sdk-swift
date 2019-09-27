const path = require('path');
const pkg = require('../package.json');
const autoprefixer = require('autoprefixer');
const browserlist = require('@xero/browserslist-autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const serveStatic = require('serve-static');

const basePath = path.resolve(__dirname, '..');
const styleguidePath = path.resolve(basePath, '.styleguidist');
const outputPath = path.resolve(basePath, 'dist/docs/react');
const componentSections = require('./sections.json');

const config = {
  webpackConfig: {
    devServer: {
      disableHostCheck: true,
      publicPath: 'http://localhost:6060/react/',
      before(app) {
        app.use('/', serveStatic(path.resolve('dist', 'docs')));
      },
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  autoprefixer({
                    overrideBrowserslist: browserlist,
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          use: ['file-loader'],
          test: /\.(gif|ico|jpg|jpeg|png|svg|webp)$/,
        },
        {
          exclude: [/node_modules/],
          use: [
            'babel-loader?{"cacheDirectory":true,"presets":["@babel/preset-env", "@babel/preset-react"],"plugins":[["@babel/plugin-proposal-class-properties",{"loose":true}]]}',
          ],
          test: /\.jsx?$/,
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'build/[name].css',
      }),
    ],
    resolve: {
      alias: {
        './theme': path.resolve(styleguidePath, 'components/theme'),
        'rsg-components/ComponentsList': path.resolve(styleguidePath, 'components/ComponentsList'),
        'rsg-components/ExamplePlaceholder': path.resolve(
          styleguidePath,
          'components/ExamplePlaceholder',
        ),
        'rsg-components/Link': path.resolve(styleguidePath, 'components/Link'),
        'rsg-components/StyleGuide/StyleGuideRenderer': path.resolve(
          styleguidePath,
          'components/StyleGuide',
        ),
        'rsg-components/TableOfContents/TableOfContentsRenderer': path.resolve(
          styleguidePath,
          'components/TableOfContents',
        ),
        'rsg-components/Wrapper/Wrapper': path.resolve(styleguidePath, 'components/Wrapper'),
        'rsg-components/Pathline': path.resolve(styleguidePath, 'components/Pathline'),
        'rsg-components/Playground/PlaygroundRenderer': path.resolve(
          styleguidePath,
          'components/PlaygroundRenderer',
        ),
      },
      extensions: ['.js', '.jsx', '.json'],
    },
  },
  title: 'XUI React Docs',
  theme: {
    color: {
      codeComment: '#6d6d6d',
      codePunctuation: '#999',
      codeProperty: '#905',
      codeDeleted: '#905',
      codeString: '#690',
      codeInserted: '#690',
      codeOperator: '#9a6e3a',
      codeKeyword: '#1673b1',
      codeFunction: '#DD4A68',
      codeVariable: '#e90',
    },
  },
  styleguideDir: outputPath,
  ignore: ['**/Positioning.js', '**/Constants.js', '**/TextHelpers.js', '**/__tests__/**'],
  sections: componentSections,
  getComponentPathLine(componentPath) {
    let name = path.basename(componentPath, '.js');
    const dir = path
      .dirname(componentPath)
      .split('/')
      .pop();
    const dirToLower = dir.toLowerCase(); // TODO: Normalise casing strategy between files and component directory names. Currently mismatched.

    /**
     * General rule of thumb for import component statements, if the name of the
     * component (minus the xui portion) matches the name of the directory it
     * lives in it's the default export for that component. Default exports do
     * not need the braces in their import statements so we should only add
     * these for individual ones.
     */
    if (
      name
        .toLowerCase()
        .split('xui')
        .pop() !== dirToLower.replace('-', '')
    ) {
      // TODO: Remove hyphen removal and rename select-box/ -> selectBox/
      name = `{ ${name} }`;
    }

    return `import ${name} from '${pkg.name}/react/${dirToLower}';`;
  },
};

module.exports = config;
