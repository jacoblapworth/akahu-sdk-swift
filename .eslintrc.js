const restrictedGlobals = require('eslint-restricted-globals');

module.exports = {
  root: true,
  env: {
    'jest/globals': true,
    node: true,
  },
  parser: 'babel-eslint',
  plugins: ['jest', 'prettier'],
  extends: [
    '@xero/eslint-config-xero-react',
    'plugin:jest/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  rules: {
    'arrow-parens': [1, 'as-needed'],
    'comma-dangle': 1,
    'filenames/match-exported': 0, // TODO: Investigate fix. Our react/* files don't match the export names (i.e. tag.js exports XUITag)
    indent: [0], // Prettier handles indentation
    'jest/no-disabled-tests': 0,
    'jsx-a11y/label-has-for': [
      2,
      {
        allowChildren: true,
      },
    ],
    'no-console': 'warn',
    'no-restricted-globals': [2, ...restrictedGlobals],
    'no-return-assign': 0, // This rule breaks ref functions
    'no-unused-expressions': 0,
    'prefer-destructuring': [
      2,
      {
        object: true,
        array: false, // TODO: Review if we want this. Results in `[firstItem] = array` syntax, which seems odd
      },
    ],
    'prettier/prettier': 'error',
    'react/forbid-prop-types': 0, // TODO: Investigate removing this and defining shapes for all props
    'react/jsx-curly-newline': 'off', // Prettier handles formatting
    'react/jsx-filename-extension': 0,
    'react/jsx-indent': [0], // Prettier handles indentation
    'react/jsx-indent-props': [0], // Prettier handles indentation
    'react/jsx-sort-props': [2, {}],
    'react/prefer-stateless-function': 0, // Worth disabling while PureComponent is more performant (the override of this rule for PureComponent doesn't work)
    'react/require-default-props': 0, // We would need to add default `qaHook` and `children` props for most components
    'react/sort-comp': 0, // TODO: Either remove class fields or implement this rule once they're supported
    'react/no-did-mount-set-state': 0,
    // TODO: Decide whether or not we want to turn any of the below options on. They came in during an ESLint update so I turned them all off for now. Each of these could still be turned off for special use-cases if needed.
    'import/no-useless-path-segments': 'off', // 10 instances
    'import/order': 'off', // 104 instances
    'jsx-a11y/label-has-associated-control': 'off', // 1 instance
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 'off', // 1 instance
    'lines-between-class-members': 'off', // 39 instances
    'max-classes-per-file': 'off', // 6 instances
    'no-else-return': 'off', // 7 instances
    'react/destructuring-assignment': 'off', // 188 instances
    'react/jsx-fragments': 'off', // 17 instances
    'react/jsx-one-expression-per-line': 'off', // 42 instances
    'react/jsx-props-no-spreading': 'off', // 245 instances
    'react/jsx-wrap-multilines': 'off', // 38 instances
    'react/no-access-state-in-setstate': 'off', // 3 instances
    'react/state-in-constructor': 'off', // 29 instances
    'react/static-property-placement': 'off', // 3 instances
  },
  overrides: [
    {
      files: ['**/scripts/**/*.js', 'babel.config.js', 'webpack.umd.config.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/no-dynamic-require': 'off',
      },
    },
    {
      files: ['**/stories/**', '.styleguidist/**'],
      /**
       * Feel free to turn any of these back on by removing the rule from the
       * object below, just make sure you update all of the stories to adhere
       * to that rule.
       */
      rules: {
        'consistent-return': 'off',
        'import/first': 'off',
        'import/named': 'off',
        'import/no-extraneous-dependencies': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'no-alert': 'off',
        'no-console': 'off',
        'no-param-reassign': 'off',
        'no-script-url': 'off',
        'no-shadow': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'prefer-destructuring': 'off',
        'react/jsx-no-bind': 'off',
        'react/no-array-index-key': 'off',
        'react/no-multi-comp': 'off',
        'react/no-unused-prop-types': 'off',
        'react/no-unused-state': 'off',
        'react/prop-types': 'off',
      },
    },
  ],
};
