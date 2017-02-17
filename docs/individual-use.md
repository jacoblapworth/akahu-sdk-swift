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
