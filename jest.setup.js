import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-automationid' });

/* eslint-disable jest/no-jasmine-globals */
/**
 * Shim needed to bin unnecessary requestAnimationFrame errors
 * https://github.com/facebook/jest/issues/4545#issuecomment-332762365
 */
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

window.scrollTo = () => {};

/* eslint-disable no-console */
const util = require('util');

// nobody cares about warnings so lets make them errors

// keep a reference to the original console methods
const consoleWarn = console.warn;
const consoleError = console.error;

function logToError(...rest) {
  const error = util.format.apply(this, rest);
  const xuiWarnings = /\[DEPRECATED\]/.test(error);

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
