xui-icon
========

xui-icon is a module for importing and using XUI Icons to you project. The full list of existing icons may be found [here](https://github.dev.xero.com/pages/UXE/xui-icon/).

The current implementation is similar to the process described in [css-tricks](https://css-tricks.com/svg-symbol-good-choice-icons/) where the SVG paths are added to a hidden element within the page, and all icon usages reference the SVGs in this blob. When using react, the blob is added by `XUIIcon`, so React users do not need to worry about this.

By default, each icon has its fill set to `currentColor`, so it will use the inherited font colour.

React Usage
===========
To import the module:
```js
import XUIIcon from 'xui-icon';
```

`XUIIcon`'s parameters:
 - `icon` (string, required): specifies which icon you want to use
 - `modifierClasses` (string, optional): used to specify any additional classes for styling the icon. This will mostly be used for adding size modifiers. 

For example, to add an arrow rotated to the right
```jsx
<XUIIcon icon="xui-icon-arrow" modifierClasses="xui-icon-rotate-270" />
```
Using the icons without React
=============================
This package uses Babel & Rollup to create a standard JS distributable which has a function that can be used to inject the icon blob into your project. At this point in time you are responsible for ensuring the icon blob is available in any application that you want to use icons in.
### Importing the blob in...
#### ES6
 ```js
import xuiIconBlob from 'xui-icon/dist/xuiIconBlob.js';

xuiIconBlob(document.getElementById('iconblob'));
```
#### ES5
```html
<script src="bower_components/icons/dist/xuiIconBlobES5.js"></script>
<script type="text/javascript">
	(function () { xuiIconBlobES5(document.getElementById('xui-icon-blob-holder')); })();
</script>
```
### Using the icons
The icons may be referenced using the following markup:
 ```js
 <svg class="xui-icon"> <use xlink:href="#[icon-name]" /> </svg>
 ```
