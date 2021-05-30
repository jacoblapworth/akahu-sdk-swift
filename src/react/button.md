<div class="xui-margin-vertical">
	<a href="../section-components-controls-button.html" isDocLink>Button in the XUI Documentation</a>
</div>

## Examples

Whatever you put between the start and end tags of `XUIButton` will appear as the contents.

You can give `XUIButton` a click handler to perform actions when the button is triggered, either by clicking on it, or by pressing `space` or `enter` when it has focus.

```jsx harmony
import XUIButton from '@xero/xui/react/button';

function handleClick() {
  alert('You have clicked a button');
}

<XUIButton onClick={handleClick}>Action</XUIButton>;
```

### Variants

Different styles of button are available by passing different values to the `variant` prop.

```jsx harmony
import XUIButton from '@xero/xui/react/button';

import ExampleContainer from './docs/ExampleContainer';

<div>
  <h3>Regular buttons</h3>
  <div className="xui-padding-small">
    <XUIButton className="xui-margin-right-small" variant="primary">
      Primary
    </XUIButton>
    <XUIButton className="xui-margin-right-small" variant="create">
      Create
    </XUIButton>
    <XUIButton className="xui-margin-right-small" variant="negative">
      Negative
    </XUIButton>
    <XUIButton className="xui-margin-right-small" variant="standard">
      Standard
    </XUIButton>
  </div>
  <h3>Regular buttons</h3>
  <div className="xui-padding-small">
    <XUIButton className="xui-margin-right-small" variant="borderless-standard">
      Borderless standard
    </XUIButton>
    <XUIButton className="xui-margin-right-small" variant="borderless-primary">
      Borderless primary
    </XUIButton>
    <XUIButton className="xui-margin-right-small" variant="borderless-create">
      Borderless create
    </XUIButton>
    <XUIButton className="xui-margin-right-small" variant="borderless-negative">
      Borderless negative
    </XUIButton>
    <XUIButton className="xui-margin-right-small" variant="borderless-muted">
      Borderless muted
    </XUIButton>
  </div>
  <h3>Inverted buttons</h3>
  <ExampleContainer className="xui-padding-xsmall" isInverted>
    <XUIButton className="xui-margin-right-small" isInverted variant="primary">
      Primary inverted
    </XUIButton>
    <XUIButton className="xui-margin-right-small" isInverted variant="create">
      Create inverted
    </XUIButton>
    <XUIButton className="xui-margin-right-small" isInverted variant="negative">
      Negative inverted
    </XUIButton>
    <XUIButton className="xui-margin-right-small" isInverted variant="standard">
      Standard inverted
    </XUIButton>
    <XUIButton className="xui-margin-right-small" variant="borderless-inverted">
      Borderless inverted
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
  <XUIButton className="xui-margin-right-small">Medium</XUIButton>
  <XUIButton className="xui-margin-right-small" size="small">
    Small
  </XUIButton>
  <XUIButton size="xsmall">Xsmall</XUIButton>
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
      Full-width
    </XUIButton>
  </div>
  <div>
    <XUIButton variant="primary" fullWidth="small-down">
      Full-width at small breakpoint
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

The trigger to open a [`<XUIDropdownToggled>`](#dropdown) is often a button. To add a caret icon to a button, add the property `hasCaret`.

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
  <XUIButton className="xui-margin-right-small" variant="create" isDisabled>
    Disabled button
  </XUIButton>
  <XUIButton className="xui-margin-right-small" isDisabled>
    Disabled button
  </XUIButton>
  <XUIButton variant="borderless-standard" isDisabled>
    Disabled button
  </XUIButton>
</div>;
```

The `isLoading` prop replaces the contents of the button with a loader, as well as disabling the button. You must also provide a `loadingAriaLabel`, which adds an `aria-label` to the loader for accessibility purposes. As the loading state disables the button, the loader's colour scheme will reflect this.

The `retainLayout` prop modifies the internals to keep the original button size, but shows a loader instead of the content

The `hasMinLoaderWidth` prop modifies the button by applying a 75px min width on it. Useful for short content buttons.

```jsx harmony
import XUIButton from '@xero/xui/react/button';

<div>
  <XUIButton className="xui-margin-right-small" variant="primary" loadingAriaLabel="Loading">
    Button with lots of text
  </XUIButton>
  <XUIButton
    className="xui-margin-right-small"
    variant="primary"
    isLoading
    loadingAriaLabel="Loading"
  >
    Button with lots of text
  </XUIButton>
  <XUIButton
    className="xui-margin-right-small"
    variant="primary"
    isLoading
    loadingAriaLabel="Loading"
    retainLayout={false}
  >
    Button with lots of text
  </XUIButton>
  <XUIButton className="xui-margin-right-small" variant="standard" loadingAriaLabel="Loading">
    OK
  </XUIButton>
  <XUIButton
    className="xui-margin-right-small"
    variant="standard"
    isLoading
    loadingAriaLabel="Loading"
  >
    OK
  </XUIButton>
  <XUIButton
    className="xui-margin-right-small"
    variant="primary"
    loadingAriaLabel="Loading"
    hasMinLoaderWidth
  >
    OK
  </XUIButton>
  <XUIButton variant="primary" isLoading loadingAriaLabel="Loading" hasMinLoaderWidth>
    OK
  </XUIButton>
</div>;
```
