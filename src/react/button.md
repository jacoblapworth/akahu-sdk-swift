<div class="xui-margin-vertical">
	<a href="../section-components-controls-button.html" isDocLink>Button in the XUI Documentation</a>
</div>

## Examples

Whatever you put between the start and end tags of `XUIButton` will appear as the contents.

You can give `XUIButton` a click handler to perform actions when the button is triggered, either by clicking on it, or by pressing `space` or `enter` when it has focus.

```jsx harmony
import XUIButton from '@xero/xui/react/button';

function handleClick() {
  console.log('onClick');
}

<XUIButton onClick={handleClick}>Cancel</XUIButton>;
```

### Variants

Different styles of button are available by passing different values to the `variant` prop.

```jsx harmony
import XUIButton from '@xero/xui/react/button';

import ExampleContainer from './docs/ExampleContainer';

<div>
  <h3>Regular buttons</h3>
  <ExampleContainer>
    <XUIButton className="xui-margin-right-small" variant="main">
      Submit
    </XUIButton>
    <XUIButton className="xui-margin-right-small" variant="create">
      Create
    </XUIButton>
    <XUIButton className="xui-margin-right-small" variant="negative">
      Delete
    </XUIButton>
    <XUIButton variant="standard">Cancel</XUIButton>
  </ExampleContainer>

  <h3>Borderless buttons</h3>
  <ExampleContainer>
    <XUIButton className="xui-margin-right-small" variant="borderless-main">
      Submit
    </XUIButton>
    <XUIButton className="xui-margin-right-small" variant="borderless-create">
      Create
    </XUIButton>
    <XUIButton className="xui-margin-right-small" variant="borderless-negative">
      Delete
    </XUIButton>
    <XUIButton className="xui-margin-right-small" variant="borderless-standard">
      Cancel
    </XUIButton>
    <XUIButton variant="borderless-muted">Back</XUIButton>
  </ExampleContainer>

  <h3>Inverted buttons</h3>
  <ExampleContainer isInverted>
    <XUIButton className="xui-margin-right-small" isInverted variant="main">
      Submit
    </XUIButton>
    <XUIButton className="xui-margin-right-small" isInverted variant="create">
      Create
    </XUIButton>
    <XUIButton className="xui-margin-right-small" isInverted variant="negative">
      Delete
    </XUIButton>
    <XUIButton className="xui-margin-right-small" isInverted variant="standard">
      Cancel
    </XUIButton>
    <XUIButton variant="borderless-inverted">Back</XUIButton>
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
  <XUIButton className="xui-margin-right-small">Cancel</XUIButton>
  <XUIButton className="xui-margin-right-small" size="small">
    Cancel
  </XUIButton>
  <XUIButton size="xsmall">Cancel</XUIButton>
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
  <h3>Full-width always</h3>
  <XUIButton fullWidth="always" variant="main">
    Submit
  </XUIButton>
  <h3>Full-width at small breakpoint</h3>
  <XUIButton fullWidth="small-down" variant="main">
    Submit
  </XUIButton>
</div>;
```

### Icons in buttons

Icons can add context to the text content of the button. If you want a button to only contain an icon, use [`XUIIconButton`](#icon-button).

Buttons only accept icons on one side of the text content. If you try to add icons on both sides, only the icon on the left will show. The exception is buttons using the `hasCaret` setting, which may also show an icon on the left.

```jsx harmony
import external from '@xero/xui-icon/icons/external';
import settings from '@xero/xui-icon/icons/settings';

import XUIButton from '@xero/xui/react/button';

<div>
  <XUIButton className="xui-margin-right" leftIcon={settings}>
    Settings
  </XUIButton>
  <XUIButton rightIcon={external}>View invoice</XUIButton>
</div>;
```

### Dropdowns

The trigger to open a [`<XUIDropdownToggled>`](#dropdown) is often a button. To add a caret icon to a button, add the property `hasCaret`.

Check out the [Dropdown](#dropdown) examples to see buttons being used as triggers.

```jsx harmony
import XUIButton from '@xero/xui/react/button';

<XUIButton hasCaret>Country</XUIButton>;
```

### Disabled / Loading States

You can programatically disable a button by setting the `isDisabled` prop to `true`. This will prevent interaction, including preventing it gaining focus.

```jsx harmony
import XUIButton from '@xero/xui/react/button';

<div>
  <XUIButton className="xui-margin-right-small" isDisabled variant="borderless-standard">
    Previous step
  </XUIButton>
  <XUIButton className="xui-margin-right-small" isDisabled>
    Cancel
  </XUIButton>
  <XUIButton isDisabled variant="main">
    Submit
  </XUIButton>
</div>;
```

The `isLoading` prop replaces the contents of the button with a loader, as well as disabling the button. You must also provide a `loadingAriaLabel`, which adds an `aria-label` to the loader for accessibility purposes. As the loading state disables the button, the loader's colour scheme will reflect this.

The `retainLayout` prop modifies the internals to keep the original button size, but shows a loader instead of the content

The `hasMinLoaderWidth` prop modifies the button by applying a 75px min width on it. Useful for short content buttons.

```jsx harmony
import XUIButton from '@xero/xui/react/button';

<div>
  <h3>Retains layout</h3>
  <XUIButton className="xui-margin-right-small" loadingAriaLabel="Loading" variant="main">
    Submit purchase order
  </XUIButton>
  <XUIButton className="xui-margin-right-small" isLoading loadingAriaLabel="Loading" variant="main">
    Submit purchase order
  </XUIButton>
  <XUIButton className="xui-margin-right-small" loadingAriaLabel="Loading" variant="main">
    OK
  </XUIButton>
  <XUIButton isLoading loadingAriaLabel="Loading" variant="main">
    OK
  </XUIButton>

  <h3>Does not retain layout</h3>
  <XUIButton
    className="xui-margin-right-small"
    loadingAriaLabel="Loading"
    retainLayout={false}
    variant="main"
  >
    Submit purchase order
  </XUIButton>
  <XUIButton
    className="xui-margin-right-small"
    isLoading
    loadingAriaLabel="Loading"
    retainLayout={false}
    variant="main"
  >
    Submit purchase order
  </XUIButton>
  <XUIButton
    className="xui-margin-right-small"
    loadingAriaLabel="Loading"
    retainLayout={false}
    variant="main"
  >
    OK
  </XUIButton>
  <XUIButton isLoading loadingAriaLabel="Loading" retainLayout={false} variant="main">
    OK
  </XUIButton>

  <h3>Has min loader width</h3>
  <XUIButton
    className="xui-margin-right-small"
    hasMinLoaderWidth
    loadingAriaLabel="Loading"
    variant="main"
  >
    OK
  </XUIButton>
  <XUIButton hasMinLoaderWidth isLoading loadingAriaLabel="Loading" variant="main">
    OK
  </XUIButton>
</div>;
```
