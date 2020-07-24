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

<XUIRange label="Range" max="80" defaultValue="30" onInput={logValue} />;
```

### Using Avatars & SVGs

Left and right elements can be given any object however it is recommended to use `XUIAvatar` or `XUIIcon`.

```jsx harmony
import addition from '@xero/xui-icon/icons/addition';
import subtraction from '@xero/xui-icon/icons/subtraction';
import XUIIcon from '@xero/xui/react/icon';
import XUIRange from '@xero/xui/react/range';

<XUIRange
  label="Range"
  leftElement={<XUIIcon className="xui-margin-small" icon={subtraction} />}
  rightElement={<XUIIcon className="xui-margin-small" icon={addition} />}
/>;
```

```jsx harmony
import XUIAvatar from '@xero/xui/react/avatar';
import XUIRange from '@xero/xui/react/range';

<XUIRange
  label="Range"
  leftElement={
    <XUIAvatar
      value="left"
      className="xui-margin-small"
      imageUrl={'https://xui.xero.com/static/xpert-avatar.png'}
    />
  }
  rightElement={
    <XUIAvatar
      value="left"
      className="xui-margin-small"
      imageUrl={'https://xui.xero.com/static/xpert-avatar.png'}
    />
  }
/>;
```

### Invalid & Disabled

Invalid and/or disabled states are useful for conveying how the Range component can be used.

```jsx harmony
import XUIRange from '@xero/xui/react/range';

<XUIRange
  isInvalid
  validationMessage="Validation message"
  isDisabled
  label="Invalid and disabled range"
/>;
```
