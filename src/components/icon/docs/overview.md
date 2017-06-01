xui-icon
========
[![build status](https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:XeroJS_SharedReactComponents_UxeXuiIcon)/statusIcon)](https://teamcity.dev.xero.com/viewType.html?buildTypeId=XeroJS_XuiIcon)
![](https://img.shields.io/badge/XUI-^10.0.0-blue.svg)
![](https://img.shields.io/badge/React-^0.14.2 || ^15.0.0-blue.svg)

xui-icon is a module for importing and using XUI Icons to you project. The full list of existing icons may be found [here](https://github.dev.xero.com/pages/UXE/xui-icon/test/ui/).

The icons can be consumed in 3 ways:
* Using the `XUIIcon` module as a React component. Use this for React-based single page apps.
* Using the ES5 artifact available on edge.xero.com. Use this for non-React-based single page apps.
* The SVG path of each individual icon can be imported from the `icon` folder. Use this for apps that are shared across various pages (e.g. the header)

The main implementation is similar to the process described in [css-tricks](https://css-tricks.com/svg-symbol-good-choice-icons/) where the SVG paths are added to a hidden element within the page, and all icon usages reference the SVGs in this blob. When using react, the blob is added by `XUIIcon`, so React users do not need to worry about this.

By default, each icon has its fill set to `currentColor`, so it will use the inherited font colour.
