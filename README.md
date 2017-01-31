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
## Example

![](example/loader5.gif)

### XUI Loader Properties
#### `className`: (String, Optional)

Adds more classes to the loader div, this is in addition to the already specified class of 'xui-loader'

#### `qaHook`: (String, Optional)

Adds a `data-automationid` attribute to the loader for QA

#### `label`: (String, Optional, Recommended)

Adds an `aria-label` attribute to the loader.

#### `defaultLayout`: (Boolean, default = true)

Whether to use the layout class for the loader which provides spacing and centers the component. Only works with XUI 10 (can be ignored for XUI 9)

#### `size`: (Enum, Optional, default = standard)

Sets the size of the loader to be, 'small', 'standard', or 'large'.


## Using `refs=""`

This component has been built as a [stateless functional component](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions). As a result, you cannot use refs with this component.
