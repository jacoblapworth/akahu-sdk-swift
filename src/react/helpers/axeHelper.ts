import { configureAxe } from 'jest-axe';

const axe = configureAxe({
  globalOptions: {
    // Turns off the ding for not containing our components
    // in a landmark region – not necessary in unit tests
    // https://dequeuniversity.com/rules/axe/4.1/region
    checks: [{ id: 'region', evaluate: 'region-evaluate', enabled: false }],
    rules: [
      // TODO: Enable 'nested-interactive' and fix tests / components that violate it.
      { id: 'nested-interactive', enabled: false },
      // TODO: Enable 'aria-required-parent' and fix tests / components that violate it.
      { id: 'aria-required-parent', enabled: false },
    ],
  },
});

export default axe;
