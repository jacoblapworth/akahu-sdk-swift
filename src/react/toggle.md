<div class="xui-margin-vertical">
	<a href="../section-building-blocks-controls-toggle.html" isDocLink>Toggle in the XUI Documentation</a>
</div>

`XUIToggle` is a control that can behave like a radio, or like a checkbox. It supports different layout patterns for a variety of use cases.

Avoid partially disabled groups in which one of the disabled options is pre-selected. This combination has been known to cause unexpected results for keyboard navigation.

## Examples

### Checkboxes or Radios

Use the `type` prop on `XUIToggleOption`s to specify whether they should behave like checkboxes or like radios.

```jsx harmony
import XUIToggle, { XUIToggleOption } from './toggle';

const noop = () => {};
const checkboxToggle = {
  name: 'toggle-checkbox',
  onChange: noop,
  type: 'checkbox'
};

const radioToggle = {
  name: 'toggle-radio',
  onChange: noop,
  type: 'radio'
};

<div>
  <div className="xui-margin-bottom">
    <XUIToggle
      layout="fullwidth"
      label="checkbox toggle"
      isLabelHidden
      hintMessage="Select one or more values"
    >
      <XUIToggleOption {...checkboxToggle}>Checkbox</XUIToggleOption>
      <XUIToggleOption {...checkboxToggle}>Checkbox</XUIToggleOption>
      <XUIToggleOption {...checkboxToggle}>Checkbox</XUIToggleOption>
      <XUIToggleOption {...checkboxToggle}>Checkbox</XUIToggleOption>
    </XUIToggle>
  </div>
  <div>
    <XUIToggle
      layout="fullwidth"
      label="radio toggle"
      isLabelHidden
      isInvalid
      validationMessage="Select one value"
    >
      <XUIToggleOption {...radioToggle}>Radio</XUIToggleOption>
      <XUIToggleOption {...radioToggle}>Radio</XUIToggleOption>
      <XUIToggleOption {...radioToggle}>Radio</XUIToggleOption>
      <XUIToggleOption {...radioToggle}>Radio</XUIToggleOption>
    </XUIToggle>
  </div>
</div>;
```

### Inverted Color

To use a `XUIToggle` within an dark section, pass `"inverted"` to `XUIToggle`'s `color` prop.

```jsx harmony
import XUIToggle, { XUIToggleOption } from './toggle';
import ExampleContainer from './docs/ExampleContainer';

const noop = () => {};
const checkboxToggle = {
  name: 'toggle-checkbox-inverted',
  onChange: noop,
  type: 'checkbox'
};

<ExampleContainer className="xui-padding xui-color-white" isInverted>
  <XUIToggle layout="fullwidth" color="inverted" label="checkbox toggle" isLabelHidden>
    <XUIToggleOption {...checkboxToggle}>Checkbox</XUIToggleOption>
    <XUIToggleOption {...checkboxToggle}>Checkbox</XUIToggleOption>
    <XUIToggleOption {...checkboxToggle} isDisabled isChecked>
      Disabled
    </XUIToggleOption>
    <XUIToggleOption {...checkboxToggle} isDisabled>
      Disabled
    </XUIToggleOption>
  </XUIToggle>
</ExampleContainer>;
```

### Sizes

To make your toggles smaller (same size as small buttons), pass `"small"` to `XUIToggle`'s `size` prop.

```jsx harmony
import XUIToggle, { XUIToggleOption } from './toggle';

const noop = () => {};
const radioToggle = {
  name: 'toggle-radio-layout-size',
  onChange: noop,
  type: 'radio'
};

<div>
  <XUIToggle
    className="xui-margin-bottom"
    size="small"
    layout="fullwidth"
    label="radio toggle"
    isLabelHidden
  >
    <XUIToggleOption {...radioToggle}>Uno</XUIToggleOption>
    <XUIToggleOption {...radioToggle}>Dos</XUIToggleOption>
    <XUIToggleOption {...radioToggle}>Tres</XUIToggleOption>
    <XUIToggleOption {...radioToggle}>Cuatro</XUIToggleOption>
  </XUIToggle>
</div>;
```

### Other Supported Layouts

When using `XUIToggle` with text content, it's recommended to use the `fullwidth` layout.

You can also choose not to specify a layout, if the markup of your toggle content has more complicated requirements.

```jsx harmony
import XUIToggle, { XUIToggleOption } from './toggle';
import XUITextInput from './textinput';

const noop = () => {};
const checkboxToggle = {
  name: 'toggle-checkbox',
  onChange: noop,
  type: 'checkbox'
};

<form className="xui-form-layout">
  <div className="xui-field-layout">
    <XUITextInput type="url" placeholder="http://www.xero.com" label="Input" />
  </div>
  <div className="xui-field-layout">
    <XUIToggle layout="fullwidth" label="Toggle">
      <XUIToggleOption {...checkboxToggle}>Checkbox</XUIToggleOption>
      <XUIToggleOption {...checkboxToggle}>Checkbox</XUIToggleOption>
      <XUIToggleOption {...checkboxToggle}>Checkbox</XUIToggleOption>
    </XUIToggle>
  </div>
</form>;
```
