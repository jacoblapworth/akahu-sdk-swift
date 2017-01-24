xui-icon
========
[![build status](https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:XeroJS_SharedReactComponents_UxeXuiIcon)/statusIcon)](https://teamcity.dev.xero.com/viewType.html?buildTypeId=XeroJS_XuiIcon)
![](https://img.shields.io/badge/XUI-^10.0.0-blue.svg)
![](https://img.shields.io/badge/React-^0.14.2 || ^15.0.0-blue.svg)

xui-icon is a module for importing and using XUI Icons to you project. The full list of existing icons may be found [here](https://github.dev.xero.com/pages/UXE/xui-icon/).

The icons can be consumed in 3 ways:
* Using the `XUIIcon` module as a React component. Use this for React-based single page apps.
* Using the ES5 artifact available on edge.xero.com. Use this for non-React-based single page apps.
* The SVG path of each individual icon can be imported from the `icon` folder. Use this for apps that are shared across various pages (e.g. the header)

The main implementation is similar to the process described in [css-tricks](https://css-tricks.com/svg-symbol-good-choice-icons/) where the SVG paths are added to a hidden element within the page, and all icon usages reference the SVGs in this blob. When using react, the blob is added by `XUIIcon`, so React users do not need to worry about this.

By default, each icon has its fill set to `currentColor`, so it will use the inherited font colour.

React Usage
===========
### Modules
`xui-icon` exports two modules:
 - `XUIIcon` - The main icon component
 - `XUIIcons` - Object containing names for all of the icons provided.

### Usage
```js
import XUIIcon, { XUIIcons } from 'xui-icon';
```

`XUIIcon`'s parameters:
 - `icon` (string, required): specifies which icon you want to use
  - Either a `XUIIcons` property, or by explicitly naming the icon. (`XUIIcons.ARROW_SMALL` or `'arrow-small'`)
 - `className` (string, optional): used to specify any additional classes for styling the icon. This will mostly be used for adding size modifiers.
 - `size` (['large','xlarge'], optional): specifies a size modifier
 - `title` (string, optional): sets a title to be read by screen readers
 - `desc` (string, optional): sets a description to be read by screen readers
 - `role` (string, optional): sets a role for screen reader compatibility, defaults to `presentation`
 - `rotation` ([90,180,270], optional): specifies a rotation modifier of `90`, `180`, or `270` degrees clockwise. Can be a string or a number.
 - `color` (['standard','red','green','blue','white'], optional): Specifies a color modifier class
 - `inline` (boolean, optional): whether the inline class modifier should be added

For example, to add an arrow rotated to the right
```jsx
<XUIIcon icon="arrow" rotation={270} title="Right arrow" desc="Arrow pointing to the right" />
```

Using the icons without React
=============================
This package uses Babel & Rollup to create ES5 and Common JS distributables which, when imported, will add the icon blob to your page.

## Using the icons
The icons may be referenced using the following markup:
 ```js
 <svg class="xui-icon"> <use xlink:href="#xui-icon-[icon name]" /> </svg>
 ```
## Importing the icons
### Via CDN

The ES5 icon blob is available via edge.xero.com and can be included directly into any page:
```html
<script src="https://edge.xero.com/style/xui-icon/4.1.0/xuiIconBlobES5.js"></script>
```

### Via the Bower component
#### ES6
 ```js
import xuiIconBlob from 'xui-icon/dist/xuiIconBlob.js';
xuiIconBlob();
```
#### ES5
```html
<script src="xui-icon/dist/xuiIconBlobES5.js"></script>
```

Using the icons individually
============================

You can import individual icon paths from the `icons` directory and use the `createSVGElement` utility function to render them to the DOM if you're not using a library like React.
Other options that can be used to set attributes on the SVG element are `viewBox` and `class`.

```js
import menu from 'xui-icon/icons/menu';
import createSVGElement from 'xui-icon/src/createSVGElement';

const svg = createSVGElement({
	path: menu
});
document.body.appendChild(svg);
```
