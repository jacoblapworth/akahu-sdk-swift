<div class="xui-margin-vertical">
	<a href="../section-building-blocks-controls-button.html" isDocLink>Button in the XUI Documentation</a>
</div>

## Examples

Whatever you put between the start and end tags of `XUIButton` will appear as the contents.

You can give `XUIButton` a click handler to perform actions when the button is triggered, either by clicking on it, or by pressing `space` or `enter` when it has focus.

```jsx harmony
import XUIButton from './button';

function handleClick() {
  alert('You clicked the button!');
}

<XUIButton onClick={handleClick}>Click this button</XUIButton>;
```

### Variants

Different styles of button are available by passing different values to the `variant` prop.

```jsx harmony
import XUIButton from './button';

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

Icon buttons are supported by the `icon` and `icon-inverted` variants.

When placing `XUIIcon` alone in a button, ensure accessibility by adding a `title` prop on the `XUIIcon`, or a `title` and `aria-label` on the button itself.

If you use these together with the `size` prop, the icon button size classes will be applied.

**Note:** `icon` and `icon-inverted` variants will be **deprecated** in XUI 16. You can use `XUIIconButton` as a replacement.

```jsx harmony
import overflowIcon from '@xero/xui-icon/icons/overflow';

import XUIIcon from './icon';
import XUIButton from './button';

import ExampleContainer from './docs/ExampleContainer';

<div>
  <XUIButton variant="icon">
    <XUIIcon icon={overflowIcon} title="Dots menu" />
  </XUIButton>

  <XUIButton variant="icon" size="small">
    <XUIIcon icon={overflowIcon} title="Dots menu" />
  </XUIButton>

  <XUIButton variant="icon" size="xsmall">
    <XUIIcon icon={overflowIcon} title="Dots menu" />
  </XUIButton>

  <ExampleContainer className="xui-padding-xsmall" isInverted>
    <XUIButton variant="icon-inverted">
      <XUIIcon icon={overflowIcon} title="Dots menu" />
    </XUIButton>
    <XUIButton variant="icon-inverted" size="small">
      <XUIIcon icon={overflowIcon} title="Dots menu" />
    </XUIButton>
    <XUIButton variant="icon-inverted" size="xsmall">
      <XUIIcon icon={overflowIcon} title="Dots menu" />
    </XUIButton>
  </ExampleContainer>
</div>;
```

### Size

The `size` prop allows you to modify the default button size.

```jsx harmony
import XUIButton from './button';

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
import XUIButton from './button';

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

### Disabled / Loading States

You can programatically disable a button by setting the `isDisabled` prop to `true`. This will prevent interaction, including preventing it gaining focus.

```jsx harmony
import XUIButton from './button';

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

The `isLoading` prop replaces the contents of the button with a loader, as well as disabling the button. You must also provide a `loadingLabel`, which adds an `aria-label` to the loader for accessibility purposes.

The `retainLayout` prop modifies the internals to keep the original button size, but shows a loader instead of the content

The `minLoaderWidth` prop modifies the button by applying a 75px min width on it. Useful for short content buttons.

The supplied loader inherits the text color of the button component.

```jsx harmony
import XUIButton from './button';

<div>
  <span className="xui-margin-right">
    <XUIButton variant="primary" isLoading loadingLabel="Loading">
      This text won't be displayed, because of the loader.
    </XUIButton>
  </span>
  <span className="xui-margin-right">
    <XUIButton variant="primary" isLoading loadingLabel="Loading" minLoaderWidth>
      No
    </XUIButton>
  </span>
  <span className="xui-margin-right">
    <XUIButton variant="primary" loadingLabel="Loading" minLoaderWidth>
      No
    </XUIButton>
  </span>
  <XUIButton variant="primary" isLoading loadingLabel="Loading" retainLayout={false}>
    This text won't be displayed, because of the loader.
  </XUIButton>
</div>;
```
