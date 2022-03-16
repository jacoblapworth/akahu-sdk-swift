// eslint-disable-next-line import/no-extraneous-dependencies
const restrictedGlobals = require('eslint-restricted-globals');

module.exports = {
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.d.ts', '.js', '.jsx'],
      },
    },
  },
  root: true,
  env: {
    'jest/globals': true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'jest',
    'prettier',
    'react-hooks',
    'simple-import-sort',
    '@typescript-eslint',
    'typescript-sort-keys',
  ],
  extends: [
    '@xero/eslint-config-xero-react',
    'plugin:jest/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
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
    'react/jsx-sort-default-props': [2],
    'react/jsx-sort-props': [2, {}],
    'react/sort-prop-types': [2],
    'react/prefer-stateless-function': 0, // Worth disabling while PureComponent is more performant (the override of this rule for PureComponent doesn't work)
    'react/require-default-props': 0, // We would need to add default `qaHook` and `children` props for most components
    'react/sort-comp': 0, // TODO: Either remove class fields or implement this rule once they're supported
    'react/no-did-mount-set-state': 0,
    // TODO: Decide whether or not we want to turn any of the below options on. They came in during an ESLint update so I turned them all off for now. Each of these could still be turned off for special use-cases if needed.
    'import/extensions': 'off', // 113 instances
    'jest/no-export': 'off', // 1 instance
    'jest/no-test-callback': 'off', // 1 instance
    'jest/valid-title': 'off',
    'jsx-a11y/label-has-associated-control': 'off', // 1 instance - rule may be too simple for implementation in XUIControlWrapperInline
    'no-use-before-define': 'off',
    'react/jsx-one-expression-per-line': 'off', // 42 instances - conflicts with prettier too much (and does weird things for inline variables in divs)
    'react/jsx-props-no-spreading': 'off', // 245 instances - this will be a ton of work, and may cause problems depending on what consumer props need to be passed through
    'react/jsx-wrap-multilines': 'off', // 38 instances - conflicts with prettier, minimal benefit for the inconvenience
    'react/state-in-constructor': 'off', // 29 instances - an older pattern, no real benefits
    'react/static-property-placement': 'off',
    'react/destructuring-assignment': 'off', // 188 instances - forces destructuring when accessing a single prop/state variable
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'typescript-sort-keys/interface': 2,
    'typescript-sort-keys/string-enum': 2,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['axeHelper.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
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
        'import/no-extraneous-dependencies': 'off',
        'jest/no-commented-out-tests': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'no-alert': 'off',
        'no-console': 'off',
        'no-param-reassign': 'off',
        'no-script-url': 'off',
        'no-shadow': 'off',
        'no-unused-vars': 'off',
        'prefer-destructuring': 'off',
        'react/jsx-no-bind': 'off',
        'react/no-array-index-key': 'off',
        'react/no-multi-comp': 'off',
        'react/no-unused-prop-types': 'off',
        'react/no-unused-state': 'off',
        'react/prop-types': 'off',
      },
    },
    {
      files: '**/*.js',
      rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/class-name-casing': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/no-array-constructor': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-misused-new': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/prefer-namespace-keyword': 'off',
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/type-annotation-spacing': 'off',
        'import/named': 'off',
        // TODO: Decide whether or not we want to turn any of the below options on. They came in during an ESLint update so I turned them all off for now. Each of these could still be turned off for special use-cases if needed.
        'simple-import-sort/imports': 'off',
        'simple-import-sort/exports': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
};
