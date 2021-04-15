import { configure } from '@testing-library/react';

import './.jest/extend-expect';

configure({ testIdAttribute: 'data-automationid' });

/* eslint-disable jest/no-jasmine-globals */
/**
 * Shim needed to bin unnecessary requestAnimationFrame errors
 * https://github.com/facebook/jest/issues/4545#issuecomment-332762365
 */
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

configure({ testIdAttribute: 'data-automationid' });

window.scrollTo = () => {};

/* eslint-disable no-console */
const util = require('util');

// nobody cares about warnings so lets make them errors

// keep a reference to the original console methods
const consoleWarn = console.warn;
const consoleError = console.error;

function logToError(...rest) {
  const error = util.format.apply(this, rest);
  const xuiWarnings = [
    '[DEPRECATED]',
    /**
     * TODO: Remove the warning below
     *
     * react-beautiful-dnd has not updated their hooks for React 17 properly so initiating a drag
     * triggers a warning in our testing environment.
     *
     * Code that needs updating: https://github.com/atlassian/react-beautiful-dnd/blob/v13.1.0/src/view/use-droppable-publisher/use-droppable-publisher.js#L249
     * How to update it: https://reactjs.org/blog/2020/08/10/react-v17-rc.html#potential-issues
     *
     * Until then, we'll just have to ignore the error.
     */
    'changing the droppableId or type of a Droppable during a drag',
  ].find(xuiWarning => error.includes(xuiWarning));

  if (!xuiWarnings) {
    throw new Error(error);
  }
}

jasmine.getEnv().beforeEach(() => {
  // make calls to console.warn and console.error throw an error
  console.warn = logToError;
  console.error = logToError;
});

jasmine.getEnv().afterEach(() => {
  // return console.warn and console.error to default behaviour
  console.warn = consoleWarn;
  console.error = consoleError;
});
