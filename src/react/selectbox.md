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
import { useRef, useState } from 'react';
import bank from '@xero/xui-icon/icons/bank';
import XUIIcon from '@xero/xui/react/icon';
import XUISelectBox, { XUISelectBoxOption } from '@xero/xui/react/selectbox';

const banks = ['ANZ', 'ASB', 'Kiwi Bank', 'Westpac'];

const SelectBoxExample = () => {
  const [selectedBank, setSelectedBank] = useState();
  const selectBox = useRef();

  const onBankSelect = value => {
    setSelectedBank(value);
  };

  return (
    <XUISelectBox
      buttonContent={
        <span className="xui-u-flex">
          <XUIIcon icon={bank} className="xui-margin-right-xsmall" />
          {selectedBank || 'Choose a bank'}
        </span>
      }
      caretTitle="Toggle list"
      label="Bank"
      ref={selectBox}
    >
      {banks.map((bank, index) => {
        return (
          <XUISelectBoxOption
            id={bank}
            isSelected={bank === selectedBank}
            key={index + bank + 'userDefined Key'}
            onSelect={onBankSelect}
            value={bank}
          >
            {bank}
          </XUISelectBoxOption>
        );
      })}
    </XUISelectBox>
  );
};

<SelectBoxExample />;
```

### Multi Select

You can select multiple values by keeping track of an array, rather than a single value. Use the `showCheckboxes` prop to help indicate that multiple selections are supported.

```jsx harmony
import { useRef, useState } from 'react';
import XUISelectBox, { XUISelectBoxOption } from '@xero/xui/react/selectbox';

const columns = ['Account', 'Account Code', 'Account Type', 'Credit', 'Date'];

const compareValuesByLength = (a, b) => {
  // By length of stings
  if (a.length < b.length) {
    return -1;
  }
  if (a.length > b.length) {
    return 1;
  }

  // Alphabetically if comparing two strings of same length
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b, undefined, { sensitivity: 'base' });
  }

  // Otherwise compare size of numbers
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }

  // Default
  return 0;
};

const SelectBoxExample = () => {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const selectBox = useRef();

  const onColumnSelect = value => {
    if (selectedColumns.indexOf(value) > -1) {
      setSelectedColumns(selectedColumns.filter(column => column !== value));
    } else {
      setSelectedColumns(prevState => [...prevState, value]);
    }
  };

  const getButtonText = (values, placeholder) => {
    let text;
    if (values.length > 1) {
      text = values.sort(compareValuesByLength).join(', ');
    } else {
      text = values[0];
    }
    return text || placeholder;
  };

  return (
    <XUISelectBox
      buttonContent={getButtonText(selectedColumns, 'Select columns')}
      caretTitle="Toggle list"
      closeAfterSelection={false}
      isInvalid={!selectedColumns.length}
      label="Columns"
      onSelect={onColumnSelect}
      ref={selectBox}
      validationMessage="Please select at least one column"
    >
      {columns.map((column, index) => {
        return (
          <XUISelectBoxOption
            id={column}
            isSelected={selectedColumns.indexOf(column) >= 0}
            key={index + column + 'userDefined Key'}
            showCheckboxes
            value={column}
          >
            {column}
          </XUISelectBoxOption>
        );
      })}
    </XUISelectBox>
  );
};

<SelectBoxExample />;
```

### Sizes

The `size` prop allows you to change the default `XUISelectBox` size.

```jsx harmony
import { useRef, useState } from 'react';
import bank from '@xero/xui-icon/icons/bank';
import XUIIcon from '@xero/xui/react/icon';
import XUISelectBox, { XUISelectBoxOption } from '@xero/xui/react/selectbox';

const banks = ['ANZ', 'ASB', 'Kiwi Bank', 'Westpac'];

const SelectBoxExample = () => {
  const [selectedBank, setSelectedBank] = useState();
  const selectBox = useRef();

  const onBankSelect = value => {
    setSelectedBank(value);
  };

  return (
    <XUISelectBox
      buttonContent={
        <span className="xui-u-flex">
          <XUIIcon icon={bank} className="xui-margin-right-xsmall" />
          {selectedBank || 'Choose a bank'}
        </span>
      }
      caretTitle="Toggle list"
      label="Bank"
      ref={selectBox}
      size="small"
    >
      {banks.map((bank, index) => {
        return (
          <XUISelectBoxOption
            id={bank}
            isSelected={bank === selectedBank}
            key={index + bank + 'userDefined Key'}
            onSelect={onBankSelect}
            value={bank}
          >
            {bank}
          </XUISelectBoxOption>
        );
      })}
    </XUISelectBox>
  );
};

<SelectBoxExample />;
```

### Button variants

The standard button variants available in [`XUIButton`](#button) can be applied here through the `buttonVariant` prop. We recommend setting the `fullWidth` prop to `never` to prevent the select box being full width with button variants.

```jsx harmony
import { useRef, useState } from 'react';
import bank from '@xero/xui-icon/icons/bank';
import XUIIcon from '@xero/xui/react/icon';
import XUISelectBox, { XUISelectBoxOption } from '@xero/xui/react/selectbox';

const banks = ['ANZ', 'ASB', 'Kiwi Bank', 'Westpac'];

const SelectBoxExample = () => {
  const [selectedBank, setSelectedBank] = useState();
  const selectBox = useRef();

  const onBankSelect = value => {
    setSelectedBank(value);
  };

  return (
    <XUISelectBox
      buttonContent={
        <span className="xui-u-flex">
          <XUIIcon icon={bank} className="xui-margin-right-xsmall" />
          {selectedBank || 'Choose a bank'}
        </span>
      }
      buttonVariant="main"
      caretTitle="Toggle list"
      fullWidth="never"
      hintMessage="Selecting your bank helps us set up your bank feed"
      label="Bank"
      ref={selectBox}
    >
      {banks.map((bank, index) => {
        return (
          <XUISelectBoxOption
            id={bank}
            isSelected={bank === selectedBank}
            key={index + bank + 'userDefined Key'}
            onSelect={onBankSelect}
            value={bank}
          >
            {bank}
          </XUISelectBoxOption>
        );
      })}
    </XUISelectBox>
  );
};

<SelectBoxExample />;
```
