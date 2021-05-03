const path = require('path');
const pkg = require('../package.json');
const autoprefixer = require('autoprefixer');
const browserlist = require('@xero/browserslist-autoprefixer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const serveStatic = require('serve-static');

const basePath = path.resolve(__dirname, '..');
const styleguidePath = path.resolve(basePath, '.styleguidist');
const outputPath = path.resolve(basePath, 'dist/docs/react');
const componentSections = require('./sections.json');
const babelConfig = require('../babel.config');

const config = {
  template: {
    favicon: '../.kss/builder/kss-assets/favicon/favicon-16x16.png',
  },
  moduleAliases: {
    '@xero/xui/react': path.resolve(basePath, 'src/react'),
  },
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
          use: {
            loader: 'babel-loader',
            options: { ...babelConfig, cacheDirectory: true },
          },
          test: /\.(j|t)sx?$/,
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'build/[name].css',
      }),
      new ForkTsCheckerWebpackPlugin(),
    ],
    resolve: {
      alias: {
        './theme': path.resolve(styleguidePath, 'components/theme'),
        'rsg-components/slots/CodeTabButton': path.resolve(
          styleguidePath,
          'components/CodeTabButton',
        ),
        'rsg-components/ComponentsList': path.resolve(styleguidePath, 'components/ComponentsList'),
        'rsg-components/ExamplePlaceholder': path.resolve(
          styleguidePath,
          'components/ExamplePlaceholder',
        ),
        'rsg-components/Heading/HeadingRenderer': path.resolve(
          styleguidePath,
          'components/HeadingRenderer',
        ),
        'rsg-components/Link': path.resolve(styleguidePath, 'components/Link'),
        'rsg-components/Logo/LogoRenderer': path.resolve(styleguidePath, 'components/LogoRenderer'),
        'rsg-components/Pathline': path.resolve(styleguidePath, 'components/Pathline'),
        'rsg-components/Playground/PlaygroundRenderer': path.resolve(
          styleguidePath,
          'components/PlaygroundRenderer',
        ),
        'rsg-components/ReactComponent/ReactComponentRenderer': path.resolve(
          styleguidePath,
          'components/ReactComponentRenderer',
        ),
        'rsg-components/Section/Section': path.resolve(styleguidePath, 'components/Section'),
        'rsg-components/StyleGuide/StyleGuideRenderer': path.resolve(
          styleguidePath,
          'components/StyleGuide',
        ),
        'rsg-components/TabButton/TabButtonRenderer': path.resolve(
          styleguidePath,
          'components/TabButtonRenderer',
        ),
        'rsg-components/TableOfContents/TableOfContentsRenderer': path.resolve(
          styleguidePath,
          'components/TableOfContents',
        ),
        'rsg-components/slots/UsageTabButton': path.resolve(
          styleguidePath,
          'components/UsageTabButton',
        ),
        'rsg-components/Wrapper/Wrapper': path.resolve(styleguidePath, 'components/Wrapper'),
      },
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
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
    let name = path.basename(componentPath).replace(/\.(j|t)sx?/g, '');
    const dir = path.dirname(componentPath).split('/').pop();

    // TODO: Normalise casing strategy between files and component directory names. Currently mismatched.
    return `import { ${name} } from '${pkg.name}/react/${dir.toLowerCase()}';`;
  },
};

module.exports = config;
