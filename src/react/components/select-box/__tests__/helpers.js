//* **REMOVING THIS WHEN https://github.dev.xero.com/ReactLabs/react-test-helpers is finalised***//

// then utility pattern
export const then = (callback, timeout) => {
  setTimeout(callback, timeout > 0 ? timeout : 0);
  return { then };
};

// waitFor utility pattern
const waitsInProgress = [];

export const waitFor = (test, message, done, timeLeft = 100) => {
  waitsInProgress.push(
    setTimeout(() => {
      if (timeLeft <= 0) {
        // eslint-disable-next-line no-console
        console.warn(message);
        done();
        // eslint-disable-next-line jest/expect-expect
      } else if (test()) {
        done();
      } else {
        waitFor(test, message, done, timeLeft - 10);
      }
    }, 10),
  );
};

// optionally call this in the beforeEach to ensure rogue tests are not still waiting
waitFor.clear = () => waitsInProgress.map(clearTimeout);
