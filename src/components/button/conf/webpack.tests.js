/* global global */
/*
I needed to do this to get the react with addons file to load.  For some reason, it's expecting ReactDOM to be a global...

@dev-johnsanders 1 Dec 2016
 */
import ReactDOM from 'react-dom';
global.ReactDOM = ReactDOM;

// Replace ./src/js with the directory of your application code and
// make sure the file name regexp matches your test files.
const context = require.context('../src/', true, /__tests__\/(\w+)-test.js$/);

context.keys().forEach(context);
