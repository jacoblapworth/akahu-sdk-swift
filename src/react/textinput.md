<div class="xui-margin-vertical">
	<a href="../section-building-blocks-controls-textinput.html" isDocLink>Text Input in the XUI Documentation</a>
</div>

## Examples

### Text Input

Most input use cases can be solved using `XUITextInput`'s base props. Additional attributes that aren't available as base props can be passed down to the `input` via `inputProps`.

We recommend being cautious when passing down a `type` to your input using `inputProps`. Currently some types don't work well for accessibility or internationalisation. For example, setting `type="number"` will not allow users to use `,` as a decimal separator, which is the correct decimal seporator in many regions.

```js
import XUITextInput from './textinput';

<div>
  <XUITextInput
    fieldClassName="xui-margin-bottom"
    placeholder="A standard text input"
    label="input"
    isLabelHidden
  />
  <XUITextInput
    fieldClassName="xui-margin-bottom"
    qaHook="test-ui"
    defaultValue="This one has a default value"
    label="input"
    isLabelHidden
  />
  <XUITextInput
    fieldClassName="xui-margin-bottom"
    qaHook="test-ui"
    type="number"
    placeholder="A number input"
    label="input"
    isLabelHidden
  />
  <XUITextInput
    qaHook="test-ui"
    inputProps={{ readOnly: true }}
    defaultValue="A read-only value"
    label="input"
    isLabelHidden
  />
</div>;
```

### Labels

Labels can be set on `XUITextInput` by passing a value to the `label` prop.

```jsx harmony
import XUITextInput from './textinput';

<XUITextInput label="Label" />;
```

### Validation

Validation messages and styling should be added to inputs using the `validationMessage` and `isInvalid` props. Additionally, hint messages can be passed to inputs using the `hintMessage` prop. It's best to set `isFieldLayout=true` on all inputs to ensure consistent spacing between fields.

```jsx harmony
import { PureComponent } from 'react';
import XUITextInput from './textinput';

class Example extends PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      text: ''
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.setState({
      hasFocus: true
    });
  }

  onBlur() {
    this.setState({
      hasFocus: false
    });
  }

  render() {
    return (
      <div>
        <XUITextInput
          label="An invalid input"
          validationMessage="Well it's not right"
          isInvalid
          isFieldLayout
        />
        <XUITextInput
          label="Input with a hint"
          placeholder="I always have a hint"
          hintMessage="Just a good old hint"
          isFieldLayout
        />
        <XUITextInput
          label="Input that may have a hint"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          placeholder="I have a hint when I'm focused"
          hintMessage={(this.state.hasFocus && 'Just a good old hint') || ''}
          isFieldLayout
        />
      </div>
    );
  }
}

<Example />;
```

#### Multiline Input

`XUITextInput` can be made into a multiline textarea by setting `isMultiline` to `true`. Additionally, `minRows`, `maxRows`, and `rows` may be set to set the vertical height of the input.

```jsx harmony
import XUITextInput from './textinput';

<div>
  <XUITextInput
    isFieldLayout
    isMultiline
    placeholder="This input will automatically grow up to 5 rows high"
    minRows={2}
    maxRows={5}
    label="input"
    isLabelHidden
  />
  <XUITextInput
    isFieldLayout
    isMultiline
    placeholder="This input will automatically grow without limit"
    minRows={3}
    label="input"
    isLabelHidden
  />
  <XUITextInput
    isFieldLayout
    isMultiline
    placeholder="This input has a set number of rows"
    rows={3}
    label="input"
    isLabelHidden
  />
</div>;
```

#### Side Elements

Content can be added to the side of a `XUITextInput` using the `leftElement` and `rightElement` props. It's recommended that you use the `XUITextInputSideElement` component to ensure the correct styling is applied.

```jsx harmony
import linkedin from '@xero/xui-icon/icons/social-linkedin';
import facebook from '@xero/xui-icon/icons/social-facebook';
import search from '@xero/xui-icon/icons/search';
import attach from '@xero/xui-icon/icons/attach';

import XUIPill from './pill';
import XUIAvatar from './avatar';
import XUITextInput, { XUITextInputSideElement } from './textinput';
import XUIIcon from './icon';
import XUIButton, { XUIIconButton } from './button';
<div>
  <XUITextInput
    isFieldLayout
    placeholder="Search"
    leftElement={
      <XUITextInputSideElement type="icon">
        <XUIIcon isBoxed icon={search} />
      </XUITextInputSideElement>
    }
    label="input"
    isLabelHidden
  />
  <XUITextInput
    isFieldLayout
    placeholder="Avatar"
    leftElement={
      <XUITextInputSideElement type="avatar">
        <XUIAvatar value="Avatar" size="small" />
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    isFieldLayout
    placeholder="Pill"
    leftElement={
      <XUITextInputSideElement type="pill">
        <XUIPill value="Pill" avatarProps={{ value: 'Pill' }} onDeleteClick={() => {}} />
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    isFieldLayout
    placeholder="Linkedin"
    leftElement={
      <XUITextInputSideElement type="icon" backgroundColor="linkedin">
        <XUIIcon isBoxed icon={linkedin} />
      </XUITextInputSideElement>
    }
    label="input"
    isLabelHidden
  />
  <XUITextInput
    isFieldLayout
    placeholder="Facebook"
    leftElement={
      <XUITextInputSideElement type="icon" backgroundColor="facebook">
        <XUIIcon isBoxed icon={facebook} />
      </XUITextInputSideElement>
    }
    label="input"
    isLabelHidden
  />
  <XUITextInput
    isFieldLayout
    placeholder="Facebook Right"
    rightElement={
      <XUITextInputSideElement type="icon" backgroundColor="facebook">
        <XUIIcon isBoxed icon={facebook} />
      </XUITextInputSideElement>
    }
    label="input"
    isLabelHidden
  />
  <XUITextInput
    isFieldLayout
    placeholder="Placeholder text"
    leftElement={<XUITextInputSideElement type="text">Text here:</XUITextInputSideElement>}
    label="input"
    isLabelHidden
  />
  <XUITextInput
    isFieldLayout
    placeholder="Placeholder text"
    leftElement={
      <XUITextInputSideElement type="button">
        <XUIButton variant="primary" size="small">
          Left Button
        </XUIButton>
      </XUITextInputSideElement>
    }
    label="input"
    isLabelHidden
  />
  <XUITextInput
    isFieldLayout
    placeholder="Placeholder text"
    rightElement={
      <XUITextInputSideElement type="button">
        <XUIButton variant="primary" size="small">
          Submit
        </XUIButton>
      </XUITextInputSideElement>
    }
    label="input"
    isLabelHidden
  />
  <XUITextInput
    isFieldLayout
    isMultiline
    placeholder="Top aligned right content"
    rightElement={
      <XUITextInputSideElement type="button" alignment="top">
        <XUIButton variant="primary" size="small">
          Submit
        </XUIButton>
      </XUITextInputSideElement>
    }
    label="input"
    isLabelHidden
  />
  <XUITextInput
    isFieldLayout
    isMultiline
    placeholder="Center aligned right content"
    rightElement={
      <XUITextInputSideElement type="button" alignment="center">
        <XUIButton variant="primary" size="small">
          Submit
        </XUIButton>
      </XUITextInputSideElement>
    }
    label="input"
    isLabelHidden
  />
  <XUITextInput
    isFieldLayout
    isMultiline
    placeholder="Bottom aligned right content"
    rightElement={
      <XUITextInputSideElement type="button" alignment="bottom">
        <XUIButton variant="primary" size="small">
          Submit
        </XUIButton>
      </XUITextInputSideElement>
    }
    label="input"
    isLabelHidden
  />
  <XUITextInput
    isFieldLayout
    isMultiline
    placeholder="Top aligned right content"
    rightElement={
      <XUITextInputSideElement type="icon" alignment="top">
        <XUIIconButton icon={attach} ariaLabel="attach" />
      </XUITextInputSideElement>
    }
    label="input"
    isLabelHidden
  />
  <XUITextInput
    isFieldLayout
    isMultiline
    placeholder="Center aligned right content"
    rightElement={
      <XUITextInputSideElement type="icon" alignment="center">
        <XUIIconButton icon={attach} ariaLabel="attach" />
      </XUITextInputSideElement>
    }
    label="input"
    isLabelHidden
  />
  <XUITextInput
    isFieldLayout
    isMultiline
    placeholder="Bottom aligned right content"
    rightElement={
      <XUITextInputSideElement type="icon" alignment="bottom">
        <XUIIconButton icon={attach} ariaLabel="attach" />
      </XUITextInputSideElement>
    }
    label="input"
    isLabelHidden
  />
  <XUITextInput
    isFieldLayout
    isMultiline
    placeholder="Bottom aligned top-aligned content with background"
    leftElement={
      <XUITextInputSideElement type="icon" alignment="top" backgroundColor="facebook">
        <XUIIcon isBoxed icon={facebook} />
      </XUITextInputSideElement>
    }
    label="input"
    isLabelHidden
  />
</div>;
```

### Sizes

Inputs also have `small` and `xsmall` variants. To use these size variants with side elements, you just need to make sure the input contents have a smaller size variant added.

Note that only avatars and text side elements have `2xsmall` size variants, so are the only side element options available for the `xsmall` text inputs.

```jsx harmony
import closePath from '@xero/xui-icon/icons/cross';

import XUIAvatar from './avatar';
import XUIPill from './pill';
import XUIButton, { XUIIconButton } from './button';
import XUITextInput, { XUITextInputSideElement } from './textinput';

<div>
  <XUITextInput
    fieldClassName="xui-margin-bottom"
    placeholder="Medium size"
    leftElement={
      <XUITextInputSideElement type="avatar">
        <XUIAvatar value="bob" size="small" />
      </XUITextInputSideElement>
    }
    rightElement={
      <XUITextInputSideElement type="icon">
        <XUIIconButton icon={closePath} ariaLabel="Close Path" />
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    fieldClassName="xui-margin-bottom"
    placeholder="Small size"
    size="small"
    leftElement={
      <XUITextInputSideElement type="avatar">
        <XUIAvatar value="bob" size="xsmall" />
      </XUITextInputSideElement>
    }
    rightElement={
      <XUITextInputSideElement type="icon">
        <XUIIconButton icon={closePath} ariaLabel="Close Path" />
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    fieldClassName="xui-margin-bottom"
    placeholder="Extra small size"
    size="xsmall"
    leftElement={
      <XUITextInputSideElement type="avatar">
        <XUIAvatar value="bob" size="2xsmall" />
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    fieldClassName="xui-margin-bottom"
    placeholder="Medium size"
    leftElement={
      <XUITextInputSideElement type="pill">
        <XUIPill avatarProps={{ value: 'Pill' }} value="Pill" onDeleteClick={() => {}} />
      </XUITextInputSideElement>
    }
    rightElement={
      <XUITextInputSideElement type="button">
        <XUIButton size="small" variant="standard">
          Label
        </XUIButton>
      </XUITextInputSideElement>
    }
  />
  <XUITextInput
    fieldClassName="xui-margin-bottom"
    placeholder="Small size"
    size="small"
    leftElement={
      <XUITextInputSideElement type="pill">
        <XUIPill avatarProps={{ value: 'Pill' }} value="Pill" onDeleteClick={() => {}} />
      </XUITextInputSideElement>
    }
  />
</div>;
```

#### Input Groups

```jsx harmony
import XUIIcon from './icon';
import XUITextInput, { XUITextInputSideElement } from './textinput';
import facebook from '@xero/xui-icon/icons/social-facebook';

<div>
  <div className="xui-field-layout">
    <div className="xui-textinputgroup">
      <XUITextInput
        fieldClassName="xui-column-4-of-12"
        leftElement={<XUITextInputSideElement type="text">To:</XUITextInputSideElement>}
        isFieldLayout
        placeholder="placeholder"
        isInvalid
        validationMessage="invalid input"
        label="input"
        isLabelHidden
      />
      <XUITextInput
        fieldClassName="xui-column-4-of-12"
        leftElement={<XUITextInputSideElement type="text">From:</XUITextInputSideElement>}
        placeholder="placeholder"
        hintMessage="hint hint hint"
        label="input"
        isLabelHidden
      />
      <XUITextInput
        fieldClassName="xui-column-4-of-12"
        leftElement={
          <XUITextInputSideElement type="icon" backgroundColor="facebook">
            <XUIIcon isBoxed icon={facebook} />
          </XUITextInputSideElement>
        }
        placeholder="placeholder"
        label="input"
        isLabelHidden
      />
    </div>
  </div>

  <div className="xui-verticaltextinputgroup">
    <XUITextInput
      leftElement={<XUITextInputSideElement type="text">To:</XUITextInputSideElement>}
      placeholder="placeholder"
      isInvalid
      label="input"
      isLabelHidden
    />
    <XUITextInput
      leftElement={<XUITextInputSideElement type="text">From:</XUITextInputSideElement>}
      placeholder="placeholder"
      label="input"
      isLabelHidden
    />
    <XUITextInput
      leftElement={
        <XUITextInputSideElement type="icon" backgroundColor="facebook">
          <XUIIcon isBoxed icon={facebook} />
        </XUITextInputSideElement>
      }
      placeholder="placeholder"
      label="input"
      isLabelHidden
    />
  </div>
</div>;
```

#### Borderless Variants

```jsx harmony
import XUITextInput, { XUITextInputSideElement } from './textinput';

<div
  style={{
    padding: '10px',
    backgroundColor: '#f5f6f7'
  }}
>
  <XUITextInput
    leftElement={
      <XUITextInputSideElement type="text">Transparent Borderless:</XUITextInputSideElement>
    }
    isFieldLayout
    isBorderlessTransparent
    placeholder="placeholder"
    label="input"
    isLabelHidden
  />
  <XUITextInput
    leftElement={<XUITextInputSideElement type="text">Solid Borderless:</XUITextInputSideElement>}
    isBorderlessSolid
    placeholder="placeholder"
    label="input"
    isLabelHidden
  />
</div>;
```

#### Inverted Borderless Variant

```jsx harmony
import search from '@xero/xui-icon/icons/search';
import XUITextInput, { XUITextInputSideElement } from './textinput';
import XUIIcon from './icon';
import ExampleContainer from './docs/ExampleContainer';

<ExampleContainer className="xui-padding-xsmall" isInverted>
  <XUITextInput
    leftElement={
      <XUITextInputSideElement type="text">Inverted Borderless Solid:</XUITextInputSideElement>
    }
    isFieldLayout
    isBorderlessSolid
    isInverted
    placeholder="placeholder"
    label="input"
    isLabelHidden
  />
  <XUITextInput
    leftElement={
      <XUITextInputSideElement type="icon">
        <XUIIcon isBoxed icon={search} />
      </XUITextInputSideElement>
    }
    isBorderlessTransparent
    isInverted
    placeholder="inverted borderless transparent"
    label="input"
    isLabelHidden
  />
</ExampleContainer>;
```

#### Stateful Clear Button

```js
import { PureComponent } from 'react';
import clear from '@xero/xui-icon/icons/clear';
import search from '@xero/xui-icon/icons/search';

import XUITextInput, { XUITextInputSideElement } from './textinput';
import XUIIcon from './icon';
import { XUIIconButton } from './button';

class Example extends PureComponent {
  constructor(...args) {
    super(...args);

    this.onChange = this.onChange.bind(this);
    this.onClearButtonClick = this.onClearButtonClick.bind(this);

    this.state = {
      value: 'Clear me away'
    };
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  onClearButtonClick() {
    this.setState({
      value: ''
    });
  }

  render() {
    const { value } = this.state;

    const button = (
      <XUIIconButton icon={clear} ariaLabel="clear" onClick={this.onClearButtonClick} />
    );

    return (
      <XUITextInput
        leftElement={
          <XUITextInputSideElement type="icon">
            <XUIIcon isBoxed icon={search} />
          </XUITextInputSideElement>
        }
        rightElement={<XUITextInputSideElement type="icon">{button}</XUITextInputSideElement>}
        onChange={this.onChange}
        placeholder="This is a search box"
        value={value}
        label="input"
        isLabelHidden
      />
    );
  }
}

<Example />;
```
