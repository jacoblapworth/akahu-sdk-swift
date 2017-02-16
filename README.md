xui-loader
==========

[![build status](https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:XeroJS_SharedReactComponents_UxeXuiLoader)/statusIcon)](https://teamcity.dev.xero.com/viewType.html?buildTypeId=XeroJS_SharedReactComponents_UxeXuiLoader)
![](https://img.shields.io/badge/XUI-%5E9.7.0%20%7C%7C%20%5E10.19.0-blue.svg)
![](https://img.shields.io/badge/React-^0.14.2 || ^15.0.0-blue.svg)

A React UI component that creates a loading animation from the [XUI UI library](https://github.dev.xero.com/pages/UXE/xui/#10.19.0/section-loaders.html).

## Installation

```bash
$ bower install --save git@github.dev.xero.com:UXE/xui-loader.git
```

## Example
```js
import XUILoader from 'xui-loader';

<XUILoader className='optional-class' label="Loading more data"/>
```

## xui-loader prop types

### XUILoader
`className`: (string, Optional) Add additional classes to the loader wrapping div

`qaHook`: (string, Optional) Adds data-automationid attribute with qaHook contents to the loader wrapping div

`label`: (string, Optional) adds aria-label to the loader wrapping div

`defaultLayout`: (bool, Optional, Default=true) Defaults to `true`. Sets the default layout class on the loader wrapping div

`size`: (enum, Optional, Default='standard') Sets the size of the loader to be, small, standard (no class added), and large


## Testing

### Running the Unit Tests
`$ npm run test`
This simply runs the Unit Tests found in the `__tests__` directory. Reports the results in the command line using the spec reporter.

### Running the UI Tests
`$ npm run test-ui`
This script generates a html page at `test/ui/index.html` so you can view the component as well as running the unit tests.

### Generating a code coverage report
`$ npm run test-coverage`
Generates a coverage report in `build/coverage/PhantomJS/index.html`.


**This README has been automatically generated. Please mark any changes in the docs folder.**

