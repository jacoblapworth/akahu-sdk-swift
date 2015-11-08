xui-loader
==========

A React UI component that create a loading animation from the [XUI UI library](https://github.dev.xero.com/pages/Style/xui/section-buttons.html).

![](example/loader5.gif)

## Installation

```bash
$ bower install --save git@github.dev.xero.com:FutureRobot/xui-loader.git
```
### XUI Loader Properties
`className`: (String, Optional) Adds a class to the loader div, this is in addition to the already specified class of 'xui-loader'
`customStyle`: (String, Optional) Adds a custom style to the loader


### Example
```js
import XUILoader from 'xui-loader';

<XUILoader />

```

### Example 2
```js
const optionalStyle = {backgroundColor: '#f1f4f5'};

React.render(
	<XUILoader className='custom-class' customStyle={optionalStyle} />
);

```
