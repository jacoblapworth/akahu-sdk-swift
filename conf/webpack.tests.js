require('core-js/es5');
require('es6-shim');

import 'babel-core/external-helpers.js';

// Replace ./src/js with the directory of your application code and
// make sure the file name regexp matches your test files.
var context = require.context('../src/', true, /-test\.js$/);
context.keys().forEach(context);