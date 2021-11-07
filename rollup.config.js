import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonJS from 'rollup-plugin-commonjs';
import license from 'rollup-plugin-license';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import sass from 'rollup-plugin-sass';

const licenseNotice = '';
const isProduction = process.env.NODE_ENV === 'production';
const minExtension = isProduction ? '.min' : '';

const config = {
  input: 'src/versionSelector/VersionSelector.js',
  plugins: [
    sass({
      output: `dist/docs/versionSelector${minExtension}.css`,
      exclude: [], // if unspecified, this plugin excludes node_modules by default, which we don't want because of XUI dropdown's custom CSS
      options: {
        outputStyle: isProduction ? 'compressed' : 'compact',
        includePaths: ['./node_modules'],
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    nodeResolve({
      browser: true,
    }),
    commonJS({
      include: ['node_modules/**'],
    }),
    babel({
      babelrc: false,
      plugins: [
        [
          '@babel/transform-react-jsx',
          {
            pragma: 'h',
          },
        ],
        '@babel/plugin-proposal-object-rest-spread',
        'transform-react-remove-prop-types',
      ],
      presets: [['@babel/env', { useBuiltIns: 'usage', modules: false }]],
      exclude: 'node_modules/**',
    }),
  ],
  external(id) {
    return id === 'react' || id === 'react-dom';
  },
  output: {
    file: `dist/docs/versionSelector${minExtension}.js`,
    format: 'iife',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
};

if (isProduction) {
  config.plugins.push(terser());
}

config.plugins.push(
  license({
    banner: licenseNotice,
  }),
);

export default config;
