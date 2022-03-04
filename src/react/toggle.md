<div class="xui-margin-vertical">
	<a href="../section-components-controls-toggle.html" isDocLink>Toggle in the XUI Documentation</a>
</div>

`XUIToggle` is a control that can behave like a radio, or like a checkbox. It supports different layout patterns for a variety of use cases.

Avoid partially disabled groups in which one of the disabled options is pre-selected. This combination has been known to cause unexpected results for keyboard navigation.

## Examples

### Checkboxes or Radios

Use the `type` prop on `XUIToggleOption`s to specify whether they should behave like checkboxes or like radios.

```jsx harmony
import XUIToggle, { XUIToggleOption } from '@xero/xui/react/toggle';

const checkboxToggle = {
  name: 'toggle-checkbox',
  onChange: () => {
    console.log('onChange');
  },
  type: 'checkbox'
};

const radioToggle = {
  name: 'toggle-radio',
  onChange: () => {
    console.log('onChange');
  },
  type: 'radio'
};

<div>
  <h3>Checkbox toggle</h3>
  <XUIToggle hintMessage="Select one or more columns" label="Columns to display" layout="fullwidth">
    <XUIToggleOption {...checkboxToggle}>Account</XUIToggleOption>
    <XUIToggleOption {...checkboxToggle}>Description</XUIToggleOption>
    <XUIToggleOption {...checkboxToggle}>Balance</XUIToggleOption>
  </XUIToggle>

  <h3>Radio toggle</h3>
  <XUIToggle isInvalid label="View mode" layout="fullwidth" validationMessage="Select a view mode">
    <XUIToggleOption {...radioToggle}>Summary view</XUIToggleOption>
    <XUIToggleOption {...radioToggle}>Table view</XUIToggleOption>
    <XUIToggleOption {...radioToggle}>List view</XUIToggleOption>
  </XUIToggle>
</div>;
```

### Inverted Color

To use a `XUIToggle` within an dark section, pass `"inverted"` to `XUIToggle`'s `color` prop.

```jsx harmony
import XUIToggle, { XUIToggleOption } from '@xero/xui/react/toggle';
import ExampleContainer from './docs/ExampleContainer';

const checkboxToggle = {
  name: 'toggle-checkbox-inverted',
  onChange: () => {
    console.log('onChange');
  },
  type: 'checkbox'
};

<ExampleContainer className="xui-padding xui-color-white" isInverted>
  <XUIToggle color="inverted" isLabelHidden label="Columns to display" layout="fullwidth">
    <XUIToggleOption {...checkboxToggle} isDefaultChecked>
      Amount
    </XUIToggleOption>
    <XUIToggleOption {...checkboxToggle}>Description</XUIToggleOption>
    <XUIToggleOption {...checkboxToggle} isChecked isDisabled>
      Balance
    </XUIToggleOption>
    <XUIToggleOption {...checkboxToggle} isDisabled>
      GST Rate
    </XUIToggleOption>
  </XUIToggle>
</ExampleContainer>;
```

### Sizes

To make your toggles smaller (same size as small buttons), pass `"small"` to `XUIToggle`'s `size` prop.

```jsx harmony
import XUIToggle, { XUIToggleOption } from '@xero/xui/react/toggle';

const radioToggle = {
  name: 'toggle-radio-layout-size',
  onChange: () => {
    console.log('onChange');
  },
  type: 'radio'
};

<XUIToggle label="View mode" layout="fullwidth" size="small">
  <XUIToggleOption {...radioToggle}>Summary view</XUIToggleOption>
  <XUIToggleOption {...radioToggle}>Table view</XUIToggleOption>
  <XUIToggleOption {...radioToggle}>List view</XUIToggleOption>
</XUIToggle>;
```

### Other Supported Layouts

When using `XUIToggle` with text content, it's recommended to use the `fullwidth` layout.

You can also choose not to specify a layout, if the markup of your toggle content has more complicated requirements.

```jsx harmony
import XUITextInput from '@xero/xui/react/textinput';
import XUIToggle, { XUIToggleOption } from '@xero/xui/react/toggle';

const radioToggle = {
  name: 'toggle-radio',
  onChange: () => {
    console.log('onChange');
  },
  type: 'radio'
};

<form className="xui-form-layout">
  <div className="xui-field-layout">
    <XUITextInput label="Name" defaultValue="John Smith" type="text" />
  </div>
  <div className="xui-field-layout">
    <XUIToggle label="Permissions" layout="fullwidth">
      <XUIToggleOption {...radioToggle} isDefaultChecked>
        Limited
      </XUIToggleOption>
      <XUIToggleOption {...radioToggle}>Standard</XUIToggleOption>
      <XUIToggleOption {...radioToggle}>Admin</XUIToggleOption>
    </XUIToggle>
  </div>
</form>;
```
