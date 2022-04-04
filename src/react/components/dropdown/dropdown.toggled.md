`XUIDropdownToggled` connects the trigger element with the dropdown, in terms of behavior and wrapping the two elements for positioning.

## Basic Use Cases

### Using with `XUIPicklist`

If you want standard `XUIPicklist` behaviour (close on select, keyboard handlers, etc) then you **must** have `XUIPicklist` as an immediate child of the `XUIDropdown`. If you are missing these features, make sure that you are correctly using the `XUIPicklist` component.

```jsx harmony
import { useState } from 'react';
import clock from '@xero/xui-icon/icons/clock';
import receipt from '@xero/xui-icon/icons/receipt';
import task from '@xero/xui-icon/icons/task';

import XUIButton from '@xero/xui/react/button';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';
import XUIIcon from '@xero/xui/react/icon';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';

const isSelected = (item, selectedIds) => item.props.id === selectedIds;

const createItems = (item, selectedId) => {
  if (Array.isArray(item)) {
    return item.map(i => createItems(i, selectedId));
  }

  const { icon, name, props } = item;

  return (
    <XUIPickitem
      {...props}
      isSelected={isSelected(item, selectedId)}
      key={props.id}
      leftElement={<XUIIcon icon={icon} />}
      value={props.id}
    >
      {name}
    </XUIPickitem>
  );
};

const dropdownItems = [
  { icon: task, name: 'Task' },
  { icon: clock, name: 'Time entry' },
  { icon: receipt, name: 'Estimated expense' },
  { icon: receipt, name: 'Expense' }
].map(({ icon, name }, id) => {
  return { props: { id }, icon, name };
});

const DropdownToggledExample = () => {
  const [selectedId, setSelectedId] = useState(null);

  const onSelect = value => {
    setSelectedId(value);
  };

  const trigger = <XUIButton hasCaret>Add</XUIButton>;

  const dropdown = (
    <XUIDropdown onSelect={onSelect}>
      <XUIPicklist>{createItems(dropdownItems, selectedId)}</XUIPicklist>
    </XUIDropdown>
  );
  return (
    <>
      <XUIDropdownToggled
        dropdown={dropdown}
        onOpen={() => console.log('onOpen')}
        trigger={trigger}
      />
    </>
  );
};

<DropdownToggledExample />;
```

### Multiselect picklist

```jsx harmony
import { useState } from 'react';
import XUIButton from '@xero/xui/react/button';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';

const items = [
  { id: 'draft', text: 'Draft' },
  { id: 'inProgress', text: 'In progress' },
  { id: 'closed', text: 'Closed' }
];

const DropdownToggledExample = () => {
  const [selected, setSelected] = useState({ draft: false, inProgress: false, closed: false });

  const onSelect = value => {
    setSelected({ ...selected, [value]: !selected[value] });
  };

  const selectedItems = items.filter(item => selected[item.id]).map(item => item.text);

  const trigger = (
    <XUIButton hasCaret>
      {selectedItems.length == 0 ? 'Project state' : selectedItems.join(', ')}
    </XUIButton>
  );
  const dropdown = (
    <XUIDropdown onSelect={onSelect}>
      <XUIPicklist>
        {items.map(item => {
          const { id, text } = item;
          return (
            <XUIPickitem id={id} isMultiselect isSelected={selected[id]} key={id} value={id}>
              {text}
            </XUIPickitem>
          );
        })}
      </XUIPicklist>
    </XUIDropdown>
  );

  return <XUIDropdownToggled closeOnSelect={false} dropdown={dropdown} trigger={trigger} />;
};

<DropdownToggledExample />;
```

#### Props required for this behaviour

- `closeOnSelect=false` -> `XUIDropdownToggled`: Allows user to select multiple items without the dropdown closing
- `isMultiselect=true` -> `Pickitem`: Renders the `Pickitem` as a checkbox

## Complex examples

Although using `XUIDropdown` with `XUIPicklist` provides the default behaviour, the API is configurable enough to handle almost any content.

### Dropdown with a date picker

```jsx harmony
import { useRef, useState } from 'react';
import XUIButton from '@xero/xui/react/button';
import XUIDatePicker from '@xero/xui/react/datepicker';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';

const today = new Date();
const months = [
  'Jan',
  'Feb',
  'March',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const formatDate = date => `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

const DropdownDatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const datepicker = useRef();
  const ddt = useRef();

  const focusDatePicker = () => datepicker.current.focus();

  const onSelectDate = day => {
    setSelectedDate(day);
    setCurrentMonth(day);
    ddt.current.closeDropdown();
  };

  const dropdown = (
    <XUIDropdown>
      <XUIDatePicker
        displayedMonth={currentMonth}
        locale="en"
        nextButtonAriaLabel="Next month"
        onSelectDate={onSelectDate}
        prevButtonAriaLabel="Previous month"
        ref={datepicker}
        selectedDate={selectedDate}
      />
    </XUIDropdown>
  );

  const trigger = (
    <XUIButton hasCaret>
      {selectedDate == null ? 'Select a date' : formatDate(selectedDate)}
    </XUIButton>
  );

  return (
    <XUIDropdownToggled
      dropdown={dropdown}
      onOpenAnimationEnd={focusDatePicker}
      ref={ddt}
      restrictToViewPort={false}
      trigger={trigger}
      useNewFocusBehaviour={true}
    />
  );
};

<DropdownDatePickerExample />;
```

As mentioned, the above example is not using dropdown with its optimised use case so we need to manually handle some interactions. See the key points below for more details.

#### Props required for this behaviour

- `restrictToViewPort=false` -> `XUIDropdownToggled`: Ensure that the user is never required to scroll the contents of the date picker. Scrolling is fine for lists. But scrolling a date picker is a bad user experience. This means that the date picker might hang off the edge of the screen or slightly cover the button, but this is preferable to having to scroll inside of the dropdown.
- `onOpenAnimationEnd=function` -> `XUIDropdownToggled`: This function should call `XUIDatePicker.focus` as focus is required to enable keyboard navigation on the datepicker.
- `onSelectDate` -> `XUIDatePicker`: This function should call `XUIDropdownToggled.closeDropdown` manually close the dropdown when appropriate.

### Dropdown with Text Input Trigger

It is highly recommended that you use [`Autocompleter`](#autocompleter) to implement this pattern if it fits your use case. It handles these customisations by default.

```jsx harmony
import { useRef, useState } from 'react';
import {
  boldMatch,
  decorateSubStr,
  XUIAutocompleterEmptyState
} from '@xero/xui/react/autocompleter';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';
import XUITextInput from '@xero/xui/react/textinput';

const items = [
  '090 - Business Bank Account',
  '091 - Business Savings Account',
  '200 - Sales',
  '260 - Other Revenue',
  '270 - Interest Income',
  '300 - Purchases',
  '310 - Cost of Goods Sold',
  '400 - Advertising',
  '404 - Bank Fees',
  '408 - Cleaning',
  '412 - Consulting & Accounting',
  '420 - Entertainment',
  '424 - Entertainment - Non deductible',
  '425 - Freight & Courier',
  '429 - General Expenses',
  '433 - Insurance',
  '437 - Interest Expense',
  '441 - Legal Expenses',
  '445 - Light, Power, Heating',
  '449 - Motor Vehicle Expenses',
  '453 - Office Expenses',
  '461 - Printing & Stationery',
  '469 - Rent',
  '473 - Repairs and Maintenance',
  '477 - Salaries',
  '478 - KiwiSaver Employer Contributions'
].map((text, id) => {
  return { id, text };
});

const DropdownInputExample = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);

  const dropdownRef = useRef();
  const ddt = useRef();

  const onInputChange = event => {
    const invalidInput = !!event.target.value.match(/[\!\.\^%&#]/);
    if (invalidInput) {
      ddt.current.closeDropdown();
    }

    setInputValue(event.target.value);
    setIsInvalid(invalidInput);
  };

  const onInputKeyDown = event => {
    if (ddt.current.isDropdownOpen() && dropdownRef.current != null) {
      dropdownRef.current.onKeyDown(event);
    } else {
      ddt.current.openDropdown();
    }
  };

  const onSelect = value => {
    setInputValue(items.find(item => item.id === value).text);
    setSelectedId(value);
  };

  const onHighlightChange = item => {
    setHighlightedId(item.props.id);
  };

  const trigger = (
    <XUITextInput
      inputProps={{
        'aria-autocomplete': 'list',
        'aria-activedescendant': highlightedId
      }}
      isInvalid={isInvalid}
      label="Account"
      onChange={onInputChange}
      onKeyDown={onInputKeyDown}
      placeholder="Select account"
      validationMessage="Special characters are not allowed"
      value={inputValue}
    />
  );

  let visibleItems;
  if (inputValue === '' || (selectedId != null && items[selectedId].text === inputValue)) {
    visibleItems = items;
  } else {
    const matcher = new RegExp(inputValue, 'i');
    visibleItems = items.filter(item => matcher.test(item.text));
  }

  let pickItems;
  if (visibleItems.length === 0) {
    pickItems = <XUIAutocompleterEmptyState>No accounts found</XUIAutocompleterEmptyState>;
  } else {
    pickItems = visibleItems.map(item => (
      <XUIPickitem key={item.id} id={item.id} value={item.id} isSelected={selectedId === item.id}>
        <span>{decorateSubStr(item.text, inputValue, boldMatch)}</span>
      </XUIPickitem>
    ));
  }

  const dropdown = (
    <XUIDropdown
      hasKeyboardEvents={false}
      ref={dropdownRef}
      hasFixedWidth
      onHighlightChange={onHighlightChange}
      onSelect={onSelect}
      size="medium"
    >
      <XUIPicklist>{pickItems}</XUIPicklist>
    </XUIDropdown>
  );

  return (
    <XUIDropdownToggled dropdown={dropdown} ref={ddt} trigger={trigger} triggerClickAction="none" />
  );
};

<DropdownInputExample />;
```

#### Props required for this behaviour

- `triggerClickAction="none"/"open"` -> `XUIDropdownToggled`: By default trigger clicks will toggle open state. When using with an input, click should only open the dropdown or do nothing.
- `hasKeyboardEvents=false` -> `XUIDropdown`: Required to keep focus on the input while typing.
- `restrictFocus=false` -> `XUIDropdown`: Required to keep focus on the input while typing.
- `onKeyDown=function` -> `XUITextInput`:
  - If `triggerClickAction="none"`, you should open the dropdown here by calling `XUIDropdownToggled.openDropdown`.
  - `keydown` events should be passed down to `XUIDropdown.onKeyDown` to default `XUIDropdown` keyboard navigation such as closing on `esc`, `XUIPicklist` navigation etc.

#### Validation with dropdown triggers

Since the input triggering the dropdown could potentially be invalid (eg., the input includes forbidden characters), you may wish to close the dropdown panel at validation time, to ensure any messaging is visible to the user. This is included in the above example, in the `onInputChange` handler.

### Inline display

We've added the ability for `XUIDropdown` to position the `XUIDropdownPanel` inline with your content, for improved accessibility and to resolve a few tough positioning scenarios, like dropdowns in a scrolling modal, or preferring to align the dropdown to the right of the trigger. To use this, set `isLegacyDisplay` to false on `XUIDropdownToggled` and see the accompanying related props.
