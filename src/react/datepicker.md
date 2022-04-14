<div class="xui-margin-vertical">
	<a href="../section-components-collectinginput-datepicker.html" isDocLink>Datepicker in the XUI Documentation</a>
</div>

For information about what to consider when using a `XUIDatePicker` within a `XUIDropdown` component, check the [dropdown documentation](#dropdown).

**Note:** This component is a wrapper around the [OSS component, `react-day-picker`](http://react-day-picker.js.org/)

## Examples

### Standard

To use a standard `XUIDatePicker`, you should use the `onSelectDate` callback to update state in your application. This callback will receive the new selected date as a parameter.

```jsx harmony
import { useState } from 'react';
import XUIDatePicker from '@xero/xui/react/datepicker';

const DatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return (
    <XUIDatePicker
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
      selectedDate={selectedDate}
    />
  );
};

<div className="xui-panel xui-dropdown-medium">
  <DatePickerExample />
</div>;
```

### Date Ranges

To enable date range selection, handle the date selection events in `onSelectDate`, and pass the selected range to `XUIDatePicker` using the `selectedRange` prop.

```jsx harmony
import { useState } from 'react';
import XUIDatePicker from '@xero/xui/react/datepicker';

function minDate(d1, d2) {
  return d1 < d2 ? d1 : d2;
}

function maxDate(d1, d2) {
  return d1 > d2 ? d1 : d2;
}

const DatePickerExample = () => {
  const [selectedRange, setSelectedRange] = useState(null);

  onSelectDate = newDate => {
    setSelectedRange(prevState => {
      if (prevState && prevState.from && !prevState.to) {
        return {
          from: minDate(prevState.from, newDate),
          to: maxDate(prevState.from, newDate)
        };
      }
      return {
        from: newDate,
        to: null
      };
    });
  };

  return (
    <XUIDatePicker
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
      selectedRange={selectedRange}
    />
  );
};

<div className="xui-panel xui-dropdown-medium">
  <DatePickerExample />
</div>;
```

### Disabled Dates

To disable selection of certain dates, pass a callback to `isDateDisabled`. It should take a date as an argument and return true if it's disabled. Below is an example that only allows the selection of dates within a week of today's date.

```jsx harmony
import { useState } from 'react';
import XUIDatePicker from '@xero/xui/react/datepicker';

const startDisabledDate = new Date();
startDisabledDate.setDate(startDisabledDate.getDate() - 7);
const endDisabledDate = new Date();
endDisabledDate.setDate(endDisabledDate.getDate() + 8);

const inRange = (d1, d2, targetD) => targetD < d1 || targetD > d2;

const DatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  const isDateDisabled = day => {
    return inRange(startDisabledDate, endDisabledDate, day);
  };

  return (
    <XUIDatePicker
      isDateDisabled={isDateDisabled}
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
      selectedDate={selectedDate}
    />
  );
};

<div className="xui-panel xui-dropdown-medium">
  <DatePickerExample />
</div>;
```

### Fixed Number of Weeks

To keep `XUIDatePicker`'s height consistent, you can set `showFixedNumberOfWeeks` to true. This will display 6 week rows no matter how many are in the displayed month.

```jsx harmony
import { useState } from 'react';
import XUIDatePicker from '@xero/xui/react/datepicker';

const DatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return (
    <XUIDatePicker
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
      selectedDate={selectedDate}
      showFixedNumberOfWeeks
    />
  );
};

<div className="xui-panel xui-dropdown-medium">
  <DatePickerExample />
</div>;
```

### Localisation

A `locale` string is required. This can be either the language only, like `en`, or language and region, like `fr-CA`. `XUIDatePicker` will automatically set the text direction and first day of the week based on the provided locale.

```jsx harmony
import { useState } from 'react';
import XUIDatePicker from '@xero/xui/react/datepicker';

const DatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return (
    <XUIDatePicker
      locale="ar"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
      selectedDate={selectedDate}
    />
  );
};

<div className="xui-panel xui-dropdown-medium">
  <DatePickerExample />
</div>;
```

### Inside a dropdown

```jsx harmony
import { useRef, useState } from 'react';
import XUIButton from '@xero/xui/react/button';
import XUIDatePicker from '@xero/xui/react/datepicker';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';

const DatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const ddt = useRef();
  const datepicker = useRef();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
    closeDropdown();
  };

  const closeDropdown = () => {
    ddt.current.closeDropdown();
  };

  const focusDatePicker = () => {
    datepicker.current.focus();
  };

  const trigger = <XUIButton>Issue date</XUIButton>;

  const dropdown = (
    <XUIDropdown>
      <XUIDatePicker
        locale="en"
        nextButtonAriaLabel="Next month"
        onSelectDate={onSelectDate}
        prevButtonAriaLabel="Previous month"
        ref={datepicker}
        selectedDate={selectedDate}
      />
    </XUIDropdown>
  );

  return (
    <XUIDropdownToggled
      closeOnTab={false}
      dropdown={dropdown}
      onOpenAnimationEnd={focusDatePicker}
      ref={ddt}
      trigger={trigger}
    />
  );
};
<DatePickerExample />;
```
