# xui-textarea

[![build status](https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:XeroJS_SharedReactComponents_UxeXuiTextarea)/statusIcon)](https://teamcity.dev.xero.com/viewType.html?buildTypeId=XeroJS_SharedReactComponents_UxeXuiTextarea)
![](https://img.shields.io/badge/XUI-^10.17.1-blue.svg)
![](https://img.shields.io/badge/React-^15.3.1-blue.svg)

A React text area which provides basic XUI styling, autosizing (within a min/max number of rows), and a counter which shows characters remaining (if maximum number of characters is set).

## Auto-resize

This component provides an auto-resizing capability. This behaviour is enabled whenever `minRows` and/or `maxRows` is set to a value other than 0. To disable this behaviour, either exclude these props or set them to 0.

If `minRows` or `maxRows` is not set, the css property for `min-height` or `max-height` will be used in their place. Otherwise `min-height` and `max-height` will be overriden.
