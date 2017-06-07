//***REMOVING THIS WHEN https://github.dev.xero.com/ReactLabs/react-test-helpers is finalised***//

//then utility pattern
export const then = (callback, timeout)  => {
  setTimeout(callback, timeout > 0 ? timeout : 0);
  return {then: then};
};


//waitFpr utility pattern
const waitsInProgress = [];

export const waitFor = (test, message, done, timeLeft) => {
  timeLeft = timeLeft === undefined ? 100 : timeLeft;
  waitsInProgress.push(setTimeout(() => {
    if (timeLeft <= 0) {
      console.warn(message);
      done();
    } else if (test()) {
      done();
    } else {
      waitFor(test, message, done, timeLeft - 10);
    }
  }, 10));
};

waitFor.clear = () => waitsInProgress.map(clearTimeout); //optionally call this in the beforeEach to ensure rogue tests are not still waiting
