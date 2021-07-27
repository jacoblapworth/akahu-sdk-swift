module.exports = {
  plugins: ['stylelint-order', 'stylelint-a11y'],
  ignoreFiles: [['src/sass/_conflicts.scss', 'src/sass/tmp/*']],
  rules: {
    'a11y/media-prefers-reduced-motion': true,
    // indentation: 2, // TODO: Enable this once the repo is Prettier
    'max-line-length': 305,
    'max-nesting-depth': 3,
    'no-duplicate-selectors': true,
    'no-empty-source': true,
    'no-eol-whitespace': true,
    'no-extra-semicolons': true,
    'no-missing-end-of-source-newline': true,

    'order/properties-alphabetical-order': true,

    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
  },
};
