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
