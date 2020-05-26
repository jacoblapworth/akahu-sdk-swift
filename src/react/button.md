<div class="xui-margin-vertical">
	<a href="../section-components-controls-button.html" isDocLink>Button in the XUI Documentation</a>
</div>

## Examples

Whatever you put between the start and end tags of `XUIButton` will appear as the contents.

You can give `XUIButton` a click handler to perform actions when the button is triggered, either by clicking on it, or by pressing `space` or `enter` when it has focus.

```jsx harmony
import XUIButton from '@xero/xui/react/button';

function handleClick() {
  alert('You clicked the button!');
}

<XUIButton onClick={handleClick}>Click this button</XUIButton>;
```

### Variants

Different styles of button are available by passing different values to the `variant` prop.

```jsx harmony
import XUIButton from '@xero/xui/react/button';

import ExampleContainer from './docs/ExampleContainer';

<div>
  <div>
    <XUIButton className="xui-margin-right" variant="standard">
      Standard
    </XUIButton>
    <XUIButton className="xui-margin-right" variant="primary">
      Primary
    </XUIButton>
    <XUIButton className="xui-margin-right" variant="create">
      Create
    </XUIButton>
    <XUIButton className="xui-margin-right" variant="negative">
      Negative
    </XUIButton>
  </div>
  <div className="xui-padding-xsmall">
    <XUIButton className="xui-margin-right" variant="borderless-standard">
      Borderless Standard
    </XUIButton>
    <XUIButton className="xui-margin-right" variant="borderless-primary">
      Borderless Primary
    </XUIButton>
    <XUIButton className="xui-margin-right" variant="borderless-create">
      Borderless Create
    </XUIButton>
    <XUIButton className="xui-margin-right" variant="borderless-negative">
      Borderless Negative
    </XUIButton>
    <XUIButton className="xui-margin-right" variant="borderless-muted">
      Borderless Muted
    </XUIButton>
  </div>
  <ExampleContainer className="xui-padding-xsmall" isInverted>
    <XUIButton className="xui-margin-right" variant="borderless-inverted">
      Borderless Inverted
    </XUIButton>
  </ExampleContainer>
</div>;
```

**Note:** For a button that contains only an icon, use [`XUIIconButton`](#icon-button)

### Size

The `size` prop allows you to modify the default button size.

**Note:** _Don’t vertically stack all variants of `small` and `xsmall` buttons due to poor touch interaction potential._

```jsx harmony
import XUIButton from '@xero/xui/react/button';

<div>
  <XUIButton>Medium</XUIButton>
  <XUIButton size="small">Small</XUIButton>
  <XUIButton size="xsmall">Extra small</XUIButton>
</div>;
```

### Full Width

You can make buttons span the width of their container by setting the `fullWidth` property.

`always` will be a full-width button at any breakpoint.
`small-down` will only be a full-width button at mobile breakpoints.
`never` will never be a full-width button (this is the default).

```jsx harmony
import XUIButton from '@xero/xui/react/button';

<div>
  <div className="xui-margin-bottom">
    <XUIButton variant="primary" fullWidth="always">
      Full-width Button
    </XUIButton>
  </div>
  <div>
    <XUIButton variant="create" fullWidth="small-down">
      Mobile Full-width Button
    </XUIButton>
  </div>
</div>;
```

### Icons in buttons

Icons can add context to the text content of the button. If you want a button to only contain an icon, use [`XUIIconButton`](#icon-button).

Buttons only accept icons on one side of the text content. If you try to add icons on both sides, only the icon on the left will show. The exception is buttons using the `hasCaret` setting, which may also show an icon on the left.

```jsx harmony
import XUIButton from '@xero/xui/react/button';
import settings from '@xero/xui-icon/icons/settings';
import external from '@xero/xui-icon/icons/external';

<div>
  <div className="xui-margin-bottom">
    <XUIButton className="xui-margin-right" leftIcon={settings}>
      Left icon
    </XUIButton>
    <XUIButton className="xui-margin-right" rightIcon={external}>
      Right icon
    </XUIButton>
  </div>
  <div className="xui-margin-bottom">
    <XUIButton className="xui-margin-right" leftIcon={settings} size="small">
      Left icon
    </XUIButton>
    <XUIButton className="xui-margin-right" rightIcon={external} size="small">
      Right icon
    </XUIButton>
  </div>
  <div>
    <XUIButton className="xui-margin-right" leftIcon={settings} size="xsmall">
      Left icon
    </XUIButton>
    <XUIButton className="xui-margin-right" rightIcon={external} size="xsmall">
      Right icon
    </XUIButton>
  </div>
</div>;
```

### Dropdowns

The trigger to open a [`<DropDownToggled>`](#dropdown) is often a button. To add a caret icon to a button, add the property `hasCaret`.

Check out the [Dropdown](#dropdown) examples to see buttons being used as triggers.

```jsx harmony
import XUIButton from '@xero/xui/react/button';

<XUIButton hasCaret>Dropdown</XUIButton>;
```

### Disabled / Loading States

You can programatically disable a button by setting the `isDisabled` prop to `true`. This will prevent interaction, including preventing it gaining focus.

```jsx harmony
import XUIButton from '@xero/xui/react/button';

<div>
  <XUIButton className="xui-margin-right" isDisabled>
    Standard Button
  </XUIButton>
  <XUIButton className="xui-margin-right" variant="create" isDisabled>
    Variant Button
  </XUIButton>
  <XUIButton variant="borderless-standard" isDisabled>
    Borderless Button
  </XUIButton>
</div>;
```

The `isLoading` prop replaces the contents of the button with a loader, as well as disabling the button. You must also provide a `loadingAriaLabel`, which adds an `aria-label` to the loader for accessibility purposes.

The `retainLayout` prop modifies the internals to keep the original button size, but shows a loader instead of the content

The `minLoaderWidth` prop modifies the button by applying a 75px min width on it. Useful for short content buttons.

The supplied loader inherits the text color of the button component.

```jsx harmony
import XUIButton from '@xero/xui/react/button';

<div>
  <span className="xui-margin-right">
    <XUIButton variant="primary" isLoading loadingAriaLabel="Loading">
      This text won't be displayed, because of the loader.
    </XUIButton>
  </span>
  <span className="xui-margin-right">
    <XUIButton variant="primary" isLoading loadingAriaLabel="Loading" minLoaderWidth>
      No
    </XUIButton>
  </span>
  <span className="xui-margin-right">
    <XUIButton variant="primary" loadingAriaLabel="Loading" minLoaderWidth>
      No
    </XUIButton>
  </span>
  <XUIButton variant="primary" isLoading loadingAriaLabel="Loading" retainLayout={false}>
    This text won't be displayed, because of the loader.
  </XUIButton>
</div>;
```
