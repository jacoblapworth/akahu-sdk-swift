xui-loader
==========

A React UI component that creates a loading animation from the [XUI UI library](https://github.dev.xero.com/pages/uxe/xui/#9.10.1/section-loaders.html).

## Installation

```bash
$ bower install --save git@github.dev.xero.com:UXE/xui-loader.git
```

### XUI Loader Properties
####`className`: (String, Optional)

Adds more classes to the loader div, this is in addition to the already specified class of 'xui-loader'

####`qaHook`: (String, Optional)

Adds a `data-automationid` attribute to the loader for QA

####`label`: (String, Optional, Recommended)

Adds an `aria-label` attribute to the loader.

## Example
```js
import XUILoader from 'xui-loader';

<XUILoader className='optional-class' label="Loading more data"/>
```

## Using `refs=""`

This component has been built as a [stateless functional component](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions). As a result, you cannot use refs with this component.
