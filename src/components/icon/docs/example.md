React Usage
===========

### Modules
`xui-icon` exports two modules:
 - `XUIIcon` - The main icon component which makes the whole icon suite available
 - `XUICustomIcon` - Icon component which allows individual icons to be imported.
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
<XUIIcon icon={XUIIcons.ARROW} rotation={270} title="Right arrow" desc="Arrow pointing to the right" />
```

The only difference between XUIIcon and XUICustomIcon is that XUICustomIcon accepts a `path` instead of an `icon` name.
