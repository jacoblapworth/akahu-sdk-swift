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

**Note:** For a button that contains only an icon, use [IconButton](#icon-button)

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

The `isLoading` prop replaces the contents of the button with a loader, as well as disabling the button. You must also provide a `loadingLabel`, which adds an `aria-label` to the loader for accessibility purposes. As the loading state disables the button, the loader's colour scheme will reflect this.

The `retainLayout` prop modifies the internals to keep the original button size, but shows a loader instead of the content

The `minLoaderWidth` prop modifies the button by applying a 75px min width on it. Useful for short content buttons.

```jsx harmony
import XUIButton from '@xero/xui/react/button';

<div>
  <XUIButton className="xui-margin-right-small" variant="primary" loadingLabel="Loading">
    Button with lots of text
  </XUIButton>
  <XUIButton className="xui-margin-right-small" variant="primary" isLoading loadingLabel="Loading">
    Button with lots of text
  </XUIButton>
  <XUIButton
    className="xui-margin-right-small"
    variant="primary"
    isLoading
    loadingLabel="Loading"
    retainLayout={false}
  >
    Button with lots of text
  </XUIButton>
  <XUIButton className="xui-margin-right-small" variant="standard" loadingLabel="Loading">
    OK
  </XUIButton>
  <XUIButton className="xui-margin-right-small" variant="standard" isLoading loadingLabel="Loading">
    OK
  </XUIButton>
  <XUIButton
    className="xui-margin-right-small"
    variant="primary"
    loadingLabel="Loading"
    minLoaderWidth
  >
    OK
  </XUIButton>
  <XUIButton variant="primary" isLoading loadingLabel="Loading" minLoaderWidth>
    OK
  </XUIButton>
</div>;
```
