<div class="xui-margin-vertical">
	<a href="../section-components-controls-select.html" isDocLink>Select Box in the XUI Documentation</a>
</div>

`XUISelectBox` is an opinionated component which wraps [`XUIDropdown`](#dropdown) and [`XUIDropdownToggled`](#dropdowntoggled). It's designed as a simple alternative to using an HTML `<select />`. If you need more fine-grained control or other behaviour you should use the suite of [`XUIDropdown`](#dropdown) components directly.

### Related Components

- [Dropdown](#dropdown)
- [Autocompleter](#autocompleter)

## Examples

### Single Select

In the following example, the `buttonContent` of `XUISelectBox` is being set to value of the selected item in the example's state.

```jsx harmony
import { Component } from 'react';
import bank from '@xero/xui-icon/icons/bank';
import XUIIcon from '@xero/xui/react/icon';
import XUISelectBox, { XUISelectBoxOption, TextHelpers } from '@xero/xui/react/selectbox';

const banks = ['ANZ', 'ASB', 'Kiwi Bank', 'Westpac'];

class SelectBoxExample extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      selectedBank: banks[2]
    };

    this.onBankSelect = this.onBankSelect.bind(this);
    this.selectOne = React.createRef();
  }

  onBankSelect(value) {
    this.setState({
      selectedBank: value
    });
  }

  render() {
    const MiniApp = this;

    return (
      <XUISelectBox
        ref={this.selectOne}
        name="selectOne"
        label="Select a Bank"
        buttonContent={
          <span className="xui-u-flex">
            <XUIIcon icon={bank} className="xui-margin-right-xsmall" />
            {TextHelpers.getText(MiniApp.state.selectedBank, 'Choose a Bank')}
          </span>
        }
        isTextTruncated={false}
        caretTitle="Toggle list"
      >
        {banks.map((opt, idx) => {
          return (
            <XUISelectBoxOption
              id={opt}
              isSelected={opt === MiniApp.state.selectedBank}
              key={idx + opt + 'userDefined Key'}
              onSelect={MiniApp.onBankSelect}
              value={opt}
            >
              {opt}
            </XUISelectBoxOption>
          );
        })}
      </XUISelectBox>
    );
  }
}

<SelectBoxExample />;
```

### Multi Select

You can select multiple values by keeping track of an array, rather than a single value. Use the `showCheckboxes` prop to help indicate that multiple selections are supported.

```jsx harmony
import { Component } from 'react';
import XUISelectBox, { XUISelectBoxOption, TextHelpers } from '@xero/xui/react/selectbox';

const boats = ['Waka', 'Pontoon', 'Sailboat', 'Schooner', 'Dingy'];

class MiniApp extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      selectedBoats: []
    };
    this.onBoatSelect = this.onBoatSelect.bind(this);
    this.isMultiSelect = React.createRef();
  }
  onBoatSelect(value) {
    if (this.state.selectedBoats.indexOf(value) > -1) {
      this.setState({
        selectedBoats: this.state.selectedBoats.filter(boat => boat !== value)
      });
    } else {
      this.setState({
        selectedBoats: [...this.state.selectedBoats, value]
      });
    }
  }

  render() {
    const MiniApp = this;
    return (
      <XUISelectBox
        buttonContent={TextHelpers.getText(MiniApp.state.selectedBoats, 'Choose a few boats')}
        closeAfterSelection={false}
        label="Select Several Boats"
        name="isMultiselect"
        onSelect={MiniApp.onBoatSelect}
        ref={this.isMultiselect}
        isInvalid={!MiniApp.state.selectedBoats.length}
        validationMessage="Please select at least one boat"
        caretTitle="Toggle list"
      >
        {boats.map((opt, idx) => {
          return (
            <XUISelectBoxOption
              id={opt}
              isSelected={MiniApp.state.selectedBoats.indexOf(opt) >= 0}
              key={idx + opt + 'userDefined Key'}
              showCheckboxes
              value={opt}
            >
              {opt}
            </XUISelectBoxOption>
          );
        })}
      </XUISelectBox>
    );
  }
}

<MiniApp />;
```

### Sizes

The `size` prop allows you to change the default `XUISelectBox` size.

```jsx harmony
import { Component } from 'react';
import XUISelectBox, { XUISelectBoxOption, TextHelpers } from '@xero/xui/react/selectbox';
import XUIIcon from '@xero/xui/react/icon';
import bank from '@xero/xui-icon/icons/bank';

const banks = ['ANZ', 'ASB', 'Kiwi Bank', 'Westpac'];

class MiniApp extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      selectedBank: banks[2]
    };

    this.onBankSelect = this.onBankSelect.bind(this);

    this.selectOne = React.createRef();
  }

  onBankSelect(value) {
    this.setState({
      selectedBank: value
    });
  }

  render() {
    const MiniApp = this;

    return (
      <XUISelectBox
        buttonContent={
          <span className="xui-u-flex">
            <XUIIcon icon={bank} className="xui-margin-right-xsmall" />
            {TextHelpers.getText(MiniApp.state.selectedBank, 'Choose a Bank')}
          </span>
        }
        isTextTruncated={false}
        label="Select a Bank"
        name="selectOne"
        ref={this.selectOne}
        size="small"
        caretTitle="Toggle list"
      >
        {banks.map((opt, idx) => {
          return (
            <XUISelectBoxOption
              id={opt}
              isSelected={opt === MiniApp.state.selectedBank}
              key={idx + opt + 'userDefined Key'}
              onSelect={MiniApp.onBankSelect}
              value={opt}
            >
              {opt}
            </XUISelectBoxOption>
          );
        })}
      </XUISelectBox>
    );
  }
}

<MiniApp />;
```

### Button variants

The standard button variants available in [`XUIButton`](#button) can be applied here through the `buttonVariant` prop. We recommend setting the `fullWidth` prop to `never` to prevent the select box being full width with button variants.

```jsx harmony
import { Component } from 'react';
import XUISelectBox, { XUISelectBoxOption, TextHelpers } from '@xero/xui/react/selectbox';
import XUIIcon from '@xero/xui/react/icon';
import bank from '@xero/xui-icon/icons/bank';

const banks = ['ANZ', 'ASB', 'Kiwi Bank', 'Westpac'];

class MiniApp extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      selectedBank: banks[2]
    };

    this.onBankSelect = this.onBankSelect.bind(this);
    this.selectOne = React.createRef();
  }

  onBankSelect(value) {
    this.setState({
      selectedBank: value
    });
  }

  render() {
    const MiniApp = this;

    return (
      <XUISelectBox
        buttonContent={
          <span className="xui-u-flex">
            <XUIIcon icon={bank} className="xui-margin-right-xsmall" />
            {TextHelpers.getText(MiniApp.state.selectedBank, 'Choose a Bank')}
          </span>
        }
        buttonVariant="primary"
        isTextTruncated={false}
        label="Select a Bank"
        name="selectOne"
        ref={this.selectOne}
        fullWidth="never"
        hintMessage="Selecting your bank helps us set up your bank feed"
        caretTitle="Toggle list"
      >
        {banks.map((opt, idx) => {
          return (
            <XUISelectBoxOption
              id={opt}
              isSelected={opt === MiniApp.state.selectedBank}
              key={idx + opt + 'userDefined Key'}
              onSelect={MiniApp.onBankSelect}
              value={opt}
            >
              {opt}
            </XUISelectBoxOption>
          );
        })}
      </XUISelectBox>
    );
  }
}

<MiniApp />;
```
