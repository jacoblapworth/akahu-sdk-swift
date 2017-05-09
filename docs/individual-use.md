Using the icons individually
============================

Bringing in all the icons will bloat your artifact if you only end up using a few icons. To keep your artifact lean,
you can include icons individually:

### React

Use the `XUICustomIcon` component and provide the path by importing the icon from the `icons` folder.
Please note: Webpack's tree shaking is feeble (XUIIcon is the default export so Webpack will bring it in along with all the icons) 
so you will need to import the `XUICustomIcon` module from its source location and not rely on the entry point provided by `package.json`

```js
import {XUICustomIcon} from 'xui-icon/src/XUICustomIcon';
import accessibility from 'xui-icon/icons/accessibility';

// ...
    render() {
        return <XUICustomIcon path={accessibility} rotation={180} />;    
    }
```

### Vanilla JS

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
