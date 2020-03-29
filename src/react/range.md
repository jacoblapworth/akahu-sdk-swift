<div class="xui-margin-vertical">
	<a href="../section-components-controls-range.html" isDocLink>XUIRange in the XUI Documentation</a>
</div>

XUI provides a custom range slider for consistency across platforms and visual alignment with other form elements.

## Examples

### Simple case with an onInput Console Logger

XUIRange components can be passed functions for the `onInput`.

```jsx harmony
import XUIRange from '@xero/xui/react/range';

const logValue = event => {
  console.log('value:', event.target.value);
};

<XUIRange label="Range Label" max="80" defaultValue="30" onInput={logValue} />;
```

### Using Avatars & SVGs

Left and right elements can be given any object however it is recommended to use `XUIAvatar` or `XUIIcon`.

```jsx harmony
import plus from '@xero/xui-icon/icons/plus';
import XUIAvatar from '@xero/xui/react/avatar';
import XUIIcon from '@xero/xui/react/icon';
import XUIRange from '@xero/xui/react/range';

<XUIRange
  leftElement={
    <XUIAvatar
      value="left"
      className="xui-margin-small"
      imageUrl={'https://xui.xero.com/static/xpert-avatar.png'}
    />
  }
  rightElement={<XUIIcon className="xui-margin-small" icon={plus} />}
  label="Avatars & SVGs Range Label"
/>;
```

### Invalid & Disabled

Invalid and/or disabled states are useful for conveying how the Range component can be used.

```jsx harmony
import XUIRange from '@xero/xui/react/range';

<XUIRange
  isInvalid
  validationMessage="invalid"
  isDisabled
  label="Invalid & Disabled Range Label"
/>;
```
