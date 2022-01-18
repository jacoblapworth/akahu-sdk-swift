<div class="xui-margin-vertical">
	<a href="../section-components-collectinginput-forms.html#components-collectinginput-forms-3-3" isDocLink>Control Group in the XUI documentation</a>
</div>

Control groups are used to gather multiple controls into a single, connected row or column. Wrapping controls in additional elements is _not recommended_, as it is likely to prevent the grid layout from working correctly.

## Examples

### Basic control group

```jsx harmony
import XUIControlGroup from '@xero/xui/react/controlgroup';
import { XUITextInput, XUITextInputSideElement } from '@xero/xui/react/textinput';

<XUIControlGroup label="Full name">
  <XUITextInput
    leftElement={
      <XUITextInputSideElement alignment="center" type="text">
        First:
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    leftElement={
      <XUITextInputSideElement alignment="center" type="text">
        Middle:
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    leftElement={
      <XUITextInputSideElement alignment="center" type="text">
        Last:
      </XUITextInputSideElement>
    }
  />
</XUIControlGroup>;
```

### Additional options

XUIControlGroup uses CSS grid to manage the width of items within, so implementers can control the entire group by styling in the format of `grid-template-columns`. XUIControlGroup also accepts `swapAtBreakpoint` and `isLockedVertical` props to handle whether the group renders as a row or a column.

```jsx harmony
import XUIControlGroup from '@xero/xui/react/controlgroup';
import { XUITextInput, XUITextInputSideElement } from '@xero/xui/react/textinput';

const resizeStyles = {
  maxWidth: '100%',
  overflow: 'hidden',
  paddingRight: '20px',
  resize: 'horizontal'
};

<div style={resizeStyles}>
  <XUIControlGroup
    label="Full name"
    swapAtBreakpoint="small"
    columnWidths="minmax(100px, 2fr) minmax(80px, 1fr) minmax(100px, 2fr)"
  >
    <XUITextInput
      leftElement={
        <XUITextInputSideElement alignment="center" type="text">
          First:
        </XUITextInputSideElement>
      }
    />
    <XUITextInput
      leftElement={
        <XUITextInputSideElement alignment="center" type="text">
          Middle:
        </XUITextInputSideElement>
      }
    />
    <XUITextInput
      leftElement={
        <XUITextInputSideElement alignment="center" type="text">
          Last:
        </XUITextInputSideElement>
      }
    />
  </XUIControlGroup>
</div>;
```

### Supported controls

XUIControlGroup currently supports: XUITextInput, XUIDateInput, XUIAutocompleter, XUISelectBox, XUIButton, XUIButtonGroup, XUISplitButton.
