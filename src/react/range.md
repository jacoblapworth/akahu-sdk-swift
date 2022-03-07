<div class="xui-margin-vertical">
	<a href="../section-components-controls-range.html" isDocLink>XUIRange in the XUI Documentation</a>
</div>

XUI provides a custom range slider for consistency across platforms and visual alignment with other form elements.

## Examples

### Simple case with an onInput Console Logger

XUIRange components can be passed functions for the `onInput`.

```jsx harmony
import XUIRange from '@xero/xui/react/range';

const handleInput = event => {
  console.log('onInput - input value:', event.target.value);
};

<XUIRange defaultValue="30" label="Maximum price" max="80" onInput={handleInput} />;
```

### Using Avatars & SVGs

Left and right elements can be given any object however it is recommended to use `XUIAvatar` or `XUIIcon`.

```jsx harmony
import addition from '@xero/xui-icon/icons/addition';
import subtraction from '@xero/xui-icon/icons/subtraction';

import XUIIcon from '@xero/xui/react/icon';
import XUIRange from '@xero/xui/react/range';

<XUIRange
  label="Zoom"
  leftElement={
    <XUIIcon
      className="xui-margin-small"
      icon={subtraction}
      role="img"
      title="Decrease zoom level"
    />
  }
  rightElement={
    <XUIIcon className="xui-margin-small" icon={addition} role="img" title="Increase zoom level" />
  }
/>;
```

```jsx harmony
import XUIAvatar from '@xero/xui/react/avatar';
import XUIRange from '@xero/xui/react/range';

<XUIRange
  label="Zoom"
  leftElement={
    <XUIAvatar
      className="xui-margin-small"
      imageUrl={
        'https://i.picsum.photos/id/875/100/100.jpg?hmac=f_Pri81ET_AveaagT58xJNaG1s3j3GCI7tvgJbjeZzk'
      }
      size="xsmall"
      value="decrease"
    />
  }
  rightElement={
    <XUIAvatar
      className="xui-margin-small"
      imageUrl={
        'https://i.picsum.photos/id/875/100/100.jpg?hmac=f_Pri81ET_AveaagT58xJNaG1s3j3GCI7tvgJbjeZzk'
      }
      value="increase"
    />
  }
/>;
```

### Invalid & Disabled

Invalid and/or disabled states are useful for conveying how the Range component can be used.

```jsx harmony
import XUIRange from '@xero/xui/react/range';

<div>
  <h3>Disabled range</h3>
  <XUIRange isDisabled label="Maximum price" />
  <h3>Invalid range</h3>
  <XUIRange
    isInvalid
    label="Number of items"
    max="100"
    min="0"
    validationMessage="There are only 30 items left in stock, please select a valid amount"
  />
</div>;
```
