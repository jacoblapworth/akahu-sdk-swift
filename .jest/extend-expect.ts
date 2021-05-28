import '@testing-library/jest-dom/extend-expect';

import { getConfig } from '@testing-library/react';

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toHaveTestId(testId: string): R;
    }
  }
}

expect.extend({
  toHaveTestId(element: HTMLElement, testId: string) {
    const actualTestId = element.getAttribute(getConfig().testIdAttribute);
    const pass = element.getAttribute(getConfig().testIdAttribute) === testId;
    const message = () => {
      if (pass) {
        return undefined;
      }

      return (
        `${this.utils.matcherHint('toHaveTestId', 'HTMLElement', testId)}\n\n` +
        `Expected: ${this.utils.printExpected(testId)}\n` +
        `Received: ${this.utils.printReceived(actualTestId)}`
      );
    };

    return { actual: actualTestId, message, pass };
  },
});
