<div class="xui-margin-vertical">
	<a href="../section-components-controls-textinput.html" isDocLink>Text Input in the XUI Documentation</a>
</div>

## Examples

### Text Input

Most input use cases can be solved using `XUITextInput`'s base props. Additional attributes that aren't available as base props can be passed down to the `input` via `inputProps`.

We recommend being cautious when passing down a `type` to your input using `inputProps`. Currently some types don't work well for accessibility or internationalisation. For example, setting `type="number"` will not allow users to use `,` as a decimal separator, which is the correct decimal seporator in many regions.

```js
import XUITextInput from '@xero/xui/react/textinput';

<div>
  <h3>Standard text input</h3>
  <XUITextInput fieldClassName="xui-margin-bottom" label="Contact name" />
  <h3>Standard text input with default value</h3>
  <XUITextInput defaultValue="John Smith" fieldClassName="xui-margin-bottom" label="Contact name" />
  <h3>Number input with placeholder</h3>
  <XUITextInput
    fieldClassName="xui-margin-bottom"
    label="Time taken"
    placeholder="0:00"
    type="number"
  />
  <h3>Reverse-aligned input</h3>
  <XUITextInput
    fieldClassName="xui-margin-bottom"
    isValueReverseAligned
    label="Time taken"
    placeholder="0:00"
    type="number"
  />
  <h3>Read-only text input</h3>
  <XUITextInput defaultValue="John Smith" inputProps={{ readOnly: true }} label="Contact name" />
</div>;
```

### Labels

Labels can be set on `XUITextInput` by passing a value to the `label` prop.

```jsx harmony
import XUITextInput from '@xero/xui/react/textinput';

<XUITextInput label="Contact name" />;
```

### Optional fields indicator

#### As a label

If you want to indicate that the input is an optional field, you can do so by composing the indicator within the label using our helper class `xui-textinput-label-indicator`.

```jsx harmony
import XUITextInput from '@xero/xui/react/textinput';

<XUITextInput
  label={
    <>
      Contact<span className="xui-textinput-label-indicator">(Optional)</span>
    </>
  }
/>;
```

#### As a placeholder

If you want to provide an optional field indicator without a label, you can do so by adding the `(Optional)` text into the `placeholder` prop.

```jsx harmony
import XUITextInput from '@xero/xui/react/textinput';

<XUITextInput isLabelHidden label="Contact (Optional)" placeholder="Contact (Optional)" />;
```

#### Your own custom indicator

You can use the above patterns with text other than 'Optional' such as 'Required' too. Please take care to respect the form input guidance in the [XUI Documentation](../section-components-collectinginput-forms.html)

### Validation

Validation messages and styling should be added to inputs using the `validationMessage` and `isInvalid` props. Additionally, hint messages can be passed to inputs using the `hintMessage` prop. It's best to set `isFieldLayout=true` on all inputs to ensure consistent spacing between fields.

```jsx harmony
import { useState } from 'react';
import XUITextInput from '@xero/xui/react/textinput';

const TextInputExample = () => {
  const [hasFocus, setHasFocus] = useState(false);

  const onFocus = () => {
    setHasFocus(true);
  };

  const onBlur = () => {
    setHasFocus(false);
  };

  return (
    <div>
      <h3>Text input with validation message</h3>
      <XUITextInput
        isFieldLayout
        isInvalid
        label="Bank account number"
        validationMessage="Bank account numbers must have at least 9 digits"
      />

      <h3 className="xui-padding-top">Text input with hint message</h3>
      <XUITextInput
        hintMessage="Found on the top of your IR3 statement"
        isFieldLayout
        label="IRD number"
      />

      <h3 className="xui-padding-top">Text input with hint message when focused</h3>
      <XUITextInput
        hintMessage={(hasFocus && 'Found on the top of your IR3 statement') || ''}
        isFieldLayout
        label="IRD number"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

<TextInputExample />;
```

#### Multiline Input

`XUITextInput` can be made into a multiline textarea by setting `isMultiline` to `true`. Additionally, `minRows`, `maxRows`, and `rows` may be set to set the vertical height of the input.

```jsx harmony
import XUITextInput from '@xero/xui/react/textinput';

<div>
  <h3>Multiline input which grows automatically up to 5 rows high</h3>
  <XUITextInput isFieldLayout isMultiline label="Notes" maxRows={5} minRows={2} />

  <h3>Multiline input which grows automatically without limit</h3>
  <XUITextInput isFieldLayout isMultiline label="Notes" minRows={3} />

  <h3>Multiline input with a set number of rows</h3>
  <XUITextInput isFieldLayout isMultiline label="Notes" rows={3} />
</div>;
```

#### Side Elements

Content can be added to the side of a `XUITextInput` using the `leftElement` and `rightElement` props. It's recommended that you use the `XUITextInputSideElement` component to ensure the correct styling is applied. When using custom static side elements (e.g. icons, text, avatars), focus the input when the side element is clicked. (e.g. `<CustomElement onClick={ this.inputRef?.current?.focus() }>`)

```jsx harmony
import search from '@xero/xui-icon/icons/search';
import twitter from '@xero/xui-icon/icons/social-twitter';

import XUIAvatar from '@xero/xui/react/avatar';
import XUIButton from '@xero/xui/react/button';
import XUIIcon from '@xero/xui/react/icon';
import XUIPill from '@xero/xui/react/pill';
import XUITextInput, { XUITextInputSideElement } from '@xero/xui/react/textinput';

<div>
  <h3>Standard text inputs with side content</h3>
  <XUITextInput
    isFieldLayout
    label="Contact"
    leftElement={
      <XUITextInputSideElement type="icon">
        <XUIIcon icon={search} isBoxed />
      </XUITextInputSideElement>
    }
    placeholder="Search"
  />
  <XUITextInput
    defaultValue="Jane Smith"
    isFieldLayout
    label="Contact"
    leftElement={
      <XUITextInputSideElement type="avatar">
        <XUIAvatar size="small" value="Jane Smith" />
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    isFieldLayout
    label="Contact"
    leftElement={
      <XUITextInputSideElement type="pill">
        <XUIPill
          avatarProps={{ value: 'Jane Smith' }}
          deleteButtonLabel="Delete"
          onDeleteClick={() => {
            console.log('XUIPill - onDeleteClick');
          }}
          value="Jane Smith"
        />
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    defaultValue="Jane"
    isFieldLayout
    label="Name"
    leftElement={<XUITextInputSideElement type="text">First name:</XUITextInputSideElement>}
  />
  <XUITextInput
    isFieldLayout
    label="Contact"
    leftElement={
      <XUITextInputSideElement type="button">
        <XUIButton size="small">Clear</XUIButton>
      </XUITextInputSideElement>
    }
    placeholder="Search"
  />
  <XUITextInput
    isFieldLayout
    label="Twitter"
    leftElement={
      <XUITextInputSideElement backgroundColor="twitter" type="icon">
        <XUIIcon icon={twitter} isBoxed />
      </XUITextInputSideElement>
    }
    placeholder="@username"
  />
  <XUITextInput
    isFieldLayout
    label="Contact"
    placeholder="Search"
    rightElement={
      <XUITextInputSideElement type="button">
        <XUIButton size="small">Clear</XUIButton>
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    isFieldLayout
    label="Twitter"
    placeholder="@username"
    rightElement={
      <XUITextInputSideElement backgroundColor="twitter" type="icon">
        <XUIIcon icon={twitter} isBoxed />
      </XUITextInputSideElement>
    }
  />
</div>;
```

```jsx harmony
import attach from '@xero/xui-icon/icons/attach';
import twitter from '@xero/xui-icon/icons/social-twitter';

import XUIButton, { XUIIconButton } from '@xero/xui/react/button';
import XUIIcon from '@xero/xui/react/icon';
import XUITextInput, { XUITextInputSideElement } from '@xero/xui/react/textinput';

<div>
  <h3>Multiline text inputs with side content</h3>
  <XUITextInput
    isFieldLayout
    isMultiline
    label="Twitter"
    leftElement={
      <XUITextInputSideElement alignment="top" backgroundColor="twitter" type="icon">
        <XUIIcon icon={twitter} isBoxed />
      </XUITextInputSideElement>
    }
    placeholder="@username"
  />
  <XUITextInput
    defaultValue="jane@xero.com, john@xero.com"
    isFieldLayout
    isMultiline
    label="Emails"
    rightElement={
      <XUITextInputSideElement alignment="top" type="button">
        <XUIButton size="small">Clear</XUIButton>
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    defaultValue="jane@xero.com, john@xero.com"
    isFieldLayout
    isMultiline
    label="Emails"
    rightElement={
      <XUITextInputSideElement alignment="center" type="button">
        <XUIButton size="small">Clear</XUIButton>
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    defaultValue="jane@xero.com, john@xero.com"
    isFieldLayout
    isMultiline
    label="Emails"
    rightElement={
      <XUITextInputSideElement alignment="bottom" type="button">
        <XUIButton size="small">Clear</XUIButton>
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    isFieldLayout
    isMultiline
    label="Files"
    placeholder="Select file(s) to attach"
    rightElement={
      <XUITextInputSideElement alignment="top" type="icon">
        <XUIIconButton ariaLabel="attach" icon={attach} />
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    isFieldLayout
    isMultiline
    label="Files"
    placeholder="Select file(s) to attach"
    rightElement={
      <XUITextInputSideElement alignment="center" type="icon">
        <XUIIconButton ariaLabel="attach" icon={attach} />
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    isFieldLayout
    isMultiline
    label="Files"
    placeholder="Select file(s) to attach"
    rightElement={
      <XUITextInputSideElement alignment="bottom" type="icon">
        <XUIIconButton ariaLabel="attach" icon={attach} />
      </XUITextInputSideElement>
    }
  />
</div>;
```

### Sizes

Inputs also have `small` and `xsmall` variants. To use these size variants with side elements, you just need to make sure the input contents have a smaller size variant added.

Note that only avatars and text side elements have `2xsmall` size variants, so are the only side element options available for the `xsmall` text inputs.

```jsx harmony
import crossSmall from '@xero/xui-icon/icons/cross-small';
import XUIAvatar from '@xero/xui/react/avatar';
import XUIButton, { XUIIconButton } from '@xero/xui/react/button';
import XUIPill from '@xero/xui/react/pill';
import XUITextInput, { XUITextInputSideElement } from '@xero/xui/react/textinput';

<div>
  <XUITextInput
    defaultValue="Jane Smith"
    fieldClassName="xui-margin-bottom"
    label="Contact"
    leftElement={
      <XUITextInputSideElement type="avatar">
        <XUIAvatar size="small" value="Jane Smith" />
      </XUITextInputSideElement>
    }
    rightElement={
      <XUITextInputSideElement type="icon">
        <XUIIconButton ariaLabel="Clear content" icon={crossSmall} />
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    defaultValue="Jane Smith"
    fieldClassName="xui-margin-bottom"
    label="Contact"
    leftElement={
      <XUITextInputSideElement type="avatar">
        <XUIAvatar size="xsmall" value="Jane Smith" />
      </XUITextInputSideElement>
    }
    rightElement={
      <XUITextInputSideElement type="icon">
        <XUIIconButton ariaLabel="Clear content" icon={crossSmall} size="small" />
      </XUITextInputSideElement>
    }
    size="small"
  />
  <XUITextInput
    defaultValue="Jane Smith"
    fieldClassName="xui-margin-bottom"
    label="Contact"
    leftElement={
      <XUITextInputSideElement type="avatar">
        <XUIAvatar size="2xsmall" value="Jane Smith" />
      </XUITextInputSideElement>
    }
    rightElement={
      <XUITextInputSideElement type="icon">
        <XUIIconButton ariaLabel="Clear content" icon={crossSmall} size="xsmall" />
      </XUITextInputSideElement>
    }
    size="xsmall"
  />
  <XUITextInput
    label="Contacts"
    leftElement={
      <XUITextInputSideElement type="pill">
        <XUIPill
          avatarProps={{ value: 'Jane Smith' }}
          deleteButtonLabel="Delete"
          onDeleteClick={() => {
            console.log('XUIPill - onDeleteClick');
          }}
          value="Jane Smith"
        />
      </XUITextInputSideElement>
    }
    rightElement={
      <XUITextInputSideElement type="button">
        <XUIButton size="small" variant="standard">
          Clear
        </XUIButton>
      </XUITextInputSideElement>
    }
  />
</div>;
```

#### Input Groups

**Note:** _Don’t vertically stack `small` and `xsmall` text inputs due to poor touch interaction potential._

```jsx harmony
import XUITextInput, { XUITextInputSideElement } from '@xero/xui/react/textinput';

<div>
  <span className="xui-text-label xui-fieldlabel-layout" id="horizontalTextInputGroup">
    Name
  </span>
  <div aria-labelledby="horizontalTextInputGroup" className="xui-textinputgroup">
    <XUITextInput
      fieldClassName="xui-column-4-of-12 xui-margin-bottom"
      isLabelHidden
      label="First name"
      leftElement={<XUITextInputSideElement type="text">First name:</XUITextInputSideElement>}
    />
    <XUITextInput
      fieldClassName="xui-column-4-of-12"
      isLabelHidden
      label="Middle name"
      leftElement={<XUITextInputSideElement type="text">Middle name:</XUITextInputSideElement>}
    />
    <XUITextInput
      fieldClassName="xui-column-4-of-12"
      isLabelHidden
      label="Last name"
      leftElement={<XUITextInputSideElement type="text">Last name:</XUITextInputSideElement>}
    />
  </div>

  <span className="xui-text-label xui-fieldlabel-layout" id="verticalTextInputGroup">
    Name
  </span>
  <div aria-labelledby="verticalTextInputGroup" className="xui-verticaltextinputgroup">
    <XUITextInput
      isLabelHidden
      label="First name"
      leftElement={<XUITextInputSideElement type="text">First name:</XUITextInputSideElement>}
    />
    <XUITextInput
      isLabelHidden
      label="Middle name"
      leftElement={<XUITextInputSideElement type="text">Middle name:</XUITextInputSideElement>}
    />
    <XUITextInput
      isLabelHidden
      label="Last name"
      leftElement={<XUITextInputSideElement type="text">Last name:</XUITextInputSideElement>}
    />
  </div>
</div>;
```

#### Borderless Variants

```jsx harmony
import XUITextInput from '@xero/xui/react/textinput';

const styles = {
  backgroundColor: '#f5f6f7',
  padding: '10px'
};

<div>
  <h3>Transparent borderless</h3>
  <div style={styles}>
    <XUITextInput defaultValue="John Smith" isBorderlessTransparent label="Contact name" />
  </div>

  <h3>Solid borderless</h3>
  <div style={styles}>
    <XUITextInput defaultValue="John Smith" isBorderlessSolid label="Contact name" />
  </div>
</div>;
```

#### Inverted Borderless Variant

```jsx harmony
import XUITextInput, { XUITextInputSideElement } from '@xero/xui/react/textinput';
import ExampleContainer from './docs/ExampleContainer';

<div>
  <h3>Inverted transparent borderless</h3>
  <ExampleContainer className="xui-padding-xsmall" isInverted>
    <XUITextInput
      isBorderlessTransparent
      isInverted
      isLabelHidden
      label="Contact name"
      leftElement={<XUITextInputSideElement type="text">Contact name:</XUITextInputSideElement>}
      placeholder="John Smith"
    />
  </ExampleContainer>

  <h3>Inverted solid borderless</h3>
  <ExampleContainer className="xui-padding-xsmall" isInverted>
    <XUITextInput
      isBorderlessSolid
      isInverted
      isLabelHidden
      label="Contact name"
      leftElement={<XUITextInputSideElement type="text">Contact name:</XUITextInputSideElement>}
      placeholder="John Smith"
    />
  </ExampleContainer>
</div>;
```

#### Stateful Clear Button

```js
import { useState } from 'react';
import clear from '@xero/xui-icon/icons/clear';
import url from '@xero/xui-icon/icons/url';

import XUIIcon from '@xero/xui/react/icon';
import { XUIIconButton } from '@xero/xui/react/button';
import XUITextInput, { XUITextInputSideElement } from '@xero/xui/react/textinput';

const TextInputExample = () => {
  const [value, setValue] = useState('https://www.xero.com');

  const onChange = event => {
    setValue(event.target.value);
  };

  const onClearButtonClick = () => {
    setValue('');
  };

  const button = <XUIIconButton ariaLabel="clear" icon={clear} onClick={onClearButtonClick} />;

  return (
    <XUITextInput
      label="Website"
      leftElement={
        <XUITextInputSideElement type="icon">
          <XUIIcon icon={url} isBoxed />
        </XUITextInputSideElement>
      }
      onChange={onChange}
      placeholder="https://www.google.com"
      rightElement={<XUITextInputSideElement type="icon">{button}</XUITextInputSideElement>}
      value={value}
    />
  );
};

<TextInputExample />;
```

#### Character counter

A character counter can be added by using the `maxCharCount` prop. This counter tracks the length of characters in the input. This feature can be used with both controlled and uncontrolled usages of Text Input.

You must also add a validation message using the `characterCounterValidationMessage` prop. This validation message will show when the length of input exceeds the `maxCharCount`.

**Note**: _The character counter will display when the length of `value` is 90% of `maxCharCount` - 5 characters_

##### Controlled example

```js
import { useState } from 'react';
import XUITextInput from '@xero/xui/react/textinput';

const TextInputExample = () => {
  const [value, setValue] = useState('xero_user_20201030019');

  const onChange = event => {
    setValue(event.target.value);
  };

  return (
    <XUITextInput
      characterCounter={{
        maxCharCount: 20,
        validationMessage: 'Username should be no longer than 20 characters'
      }}
      label="Username"
      onChange={onChange}
      value={value}
    />
  );
};

<TextInputExample />;
```

##### Uncontrolled example

```js
import XUITextInput from '@xero/xui/react/textinput';

<XUITextInput
  defaultValue="xero_user_20201030019"
  characterCounter={{
    maxCharCount: 20,
    validationMessage: 'Username should be no longer than 20 characters'
  }}
  label="Username"
/>;
```
