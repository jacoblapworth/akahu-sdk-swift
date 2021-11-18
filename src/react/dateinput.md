<div class="xui-margin-vertical">
  <!-- TODO -->
	<a href="../section-components-collectinginput-datepicker.html" isDocLink>Dateinput in the XUI Documentation</a>
</div>

`XUIDateInput` and `XUIDateRangeInput` are an experimental components for selecting dates. They combine `XUITextInput` for keyboard interaction and `XUIDatePicker` for selecting dates from a calendar.

## Examples

### Standard

Similar to `XUIDatePicker`, in order to use the standard `XUIDateInput` or `XUIDateRangeInput` component, you should use the `onSelectDate` callback to update state in your application. This callback will receive the new selected date as a parameter.

```jsx
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return (
    <XUIDateInput
      inputLabel="Start date"
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
      selectedDateValue={selectedDate}
    />
  );
};

<ExampleDateInput />;
```

### Date Ranges

Each of the two dates in `XUIDateRangeInput` are configured in its own prop `startDateInputConfig` and `endDateInputConfig` to handle the first and the second DateInput respectively.
Date range selection also takes advantage of the suggested dates array that allows users to select from predefined shortcut dates.

```jsx
import { useState } from 'react';
import { XUIDateRangeInput } from '@xero/xui/react/dateinput';

const ExampleDateRangePicker = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const onSelectStartDate = newDate => {
    setStartDate(newDate);
  };
  const onSelectEndDate = newDate => {
    setEndDate(newDate);
  };

  // Implement getting correct dates in getStartDate and getStartDate using your date handling library.
  const dateRangeInputSuggestedDates = [
    {
      id: 'monthThis',
      text: 'This Month',
      getStartDate: () => {
        return new Date();
      },
      getEndDate: () => {
        return new Date();
      }
    },
    {
      id: 'quarterThis',
      text: 'This quarter',
      getStartDate: () => {
        return new Date();
      },
      getEndDate: () => {
        return new Date();
      }
    }
  ];

  return (
    <XUIDateRangeInput
      suggestedDates={dateRangeInputSuggestedDates}
      locale="en"
      nextButtonAriaLabel="Next month"
      prevButtonAriaLabel="Previous month"
      endDateInputConfig={{
        inputLabel: 'End date',
        onSelectDate: onSelectEndDate,
        selectedDateValue: endDate
      }}
      startDateInputConfig={{
        inputLabel: 'Start date',
        onSelectDate: onSelectStartDate,
        selectedDateValue: startDate
      }}
    />
  );
};

<ExampleDateRangePicker />;
```

### Setting the default selected date

When setting initial date input values use `selectedDateDefaultValue`. Pass the same property in `startDateInputConfig` and `endDateInputConfig` props for `XUIDateRangeInput`.
When controlling changes in input values in your store, pass it as `selectedDateValue` prop. These properties all accept `Date` value type.

```jsx
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();
  const defaultValue = new Date(2021, 0, 1);

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return (
    <XUIDateInput
      inputLabel="Start date"
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
      selectedDateDefaultValue={defaultValue}
      selectedDateValue={selectedDate}
    />
  );
};

<ExampleDateInput />;
```

```jsx
import { useState } from 'react';
import { XUIDateRangeInput } from '@xero/xui/react/dateinput';

const ExampleDateRangePicker = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const onSelectStartDate = newDate => {
    setStartDate(newDate);
  };
  const onSelectEndDate = newDate => {
    setEndDate(newDate);
  };

  // Implement getting correct dates in getStartDate and getStartDate using your date handling library.
  const dateRangeInputSuggestedDates = [
    {
      id: 'monthThis',
      text: 'This Month',
      getStartDate: () => {
        return new Date();
      },
      getEndDate: () => {
        return new Date();
      }
    },
    {
      id: 'quarterThis',
      text: 'This quarter',
      getStartDate: () => {
        return new Date();
      },
      getEndDate: () => {
        return new Date();
      }
    }
  ];

  return (
    <XUIDateRangeInput
      suggestedDates={dateRangeInputSuggestedDates}
      locale="en"
      nextButtonAriaLabel="Next month"
      prevButtonAriaLabel="Previous month"
      startDateInputConfig={{
        onSelectDate: onSelectStartDate,
        selectedDateValue: startDate,
        inputLabel: 'Start date'
      }}
      endDateInputConfig={{
        onSelectDate: onSelectEndDate,
        selectedDateValue: endDate,
        inputLabel: 'End date'
      }}
    />
  );
};

<ExampleDateRangePicker />;
```

### Disabled input

Pass the `isDisabled` property to disable the date input (use `startDateInputConfig` and `endDateInputConfig` props for `XUIDateRangeInput`).

```jsx
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return (
    <XUIDateInput
      inputLabel="Start date"
      isDisabled={true}
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
      selectedDateValue={selectedDate}
    />
  );
};

<ExampleDateInput />;
```

```jsx
import { useState } from 'react';
import { XUIDateRangeInput } from '@xero/xui/react/dateinput';

const ExampleDateRangePicker = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const onSelectStartDate = newDate => {
    setStartDate(newDate);
  };
  const onSelectEndDate = newDate => {
    setEndDate(newDate);
  };

  // Implement getting correct dates in getStartDate and getStartDate using your date handling library.
  const dateRangeInputSuggestedDates = [
    {
      id: 'monthThis',
      text: 'This Month',
      getStartDate: () => {
        return new Date();
      },
      getEndDate: () => {
        return new Date();
      }
    },
    {
      id: 'quarterThis',
      text: 'This quarter',
      getStartDate: () => {
        return new Date();
      },
      getEndDate: () => {
        return new Date();
      }
    }
  ];

  return (
    <XUIDateRangeInput
      suggestedDates={dateRangeInputSuggestedDates}
      locale="en"
      nextButtonAriaLabel="Next month"
      prevButtonAriaLabel="Previous month"
      startDateInputConfig={{
        onSelectDate: onSelectStartDate,
        selectedDateValue: startDate,
        isDisabled: true,
        inputLabel: 'Start date'
      }}
      endDateInputConfig={{
        onSelectDate: onSelectEndDate,
        selectedDateValue: endDate,
        isDisabled: true,
        inputLabel: 'End date'
      }}
    />
  );
};

<ExampleDateRangePicker />;
```

### Hints

For `XUIDateInput`, hints can be provided using the `hintMessage` prop. For `XUIDateRangeInput` hints can be provided by providing `hintMessage` properties to the `startDateInputConfig` and/or `endDateInputConfig` object props.

```jsx
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return (
    <XUIDateInput
      hintMessage="Helpful hint"
      inputLabel="Start date"
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
      selectedDateValue={selectedDate}
    />
  );
};

<ExampleDateInput />;
```

```jsx
import { useState } from 'react';
import { XUIDateRangeInput } from '@xero/xui/react/dateinput';

const ExampleDateRangePicker = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const onSelectStartDate = newDate => {
    setStartDate(newDate);
  };
  const onSelectEndDate = newDate => {
    setEndDate(newDate);
  };

  // Implement getting correct dates in getStartDate and getStartDate using your date handling library.
  const dateRangeInputSuggestedDates = [
    {
      id: 'monthThis',
      text: 'This Month',
      getStartDate: () => {
        return new Date();
      },
      getEndDate: () => {
        return new Date();
      }
    },
    {
      id: 'quarterThis',
      text: 'This quarter',
      getStartDate: () => {
        return new Date();
      },
      getEndDate: () => {
        return new Date();
      }
    }
  ];

  return (
    <XUIDateRangeInput
      suggestedDates={dateRangeInputSuggestedDates}
      locale="en"
      nextButtonAriaLabel="Next month"
      prevButtonAriaLabel="Previous month"
      startDateInputConfig={{
        onSelectDate: onSelectStartDate,
        selectedDateValue: startDate,
        hintMessage: 'Start hint text',
        inputLabel: 'Start date'
      }}
      endDateInputConfig={{
        onSelectDate: onSelectEndDate,
        selectedDateValue: endDate,
        hintMessage: 'End hint text',
        inputLabel: 'End date'
      }}
    />
  );
};

<ExampleDateRangePicker />;
```

### Validation

To control validation use the `validationMessage` and `isInvalid` props for `XUIDateInput`. For `XUIDateRangeInput` use the same names but as an object property passed in `startDateInputConfig` and `endDateInputConfig` props.

```jsx
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return (
    <XUIDateInput
      locale="en"
      inputLabel="Start date"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      selectedDateValue={selectedDate}
      prevButtonAriaLabel="Previous month"
      validationMessage="Start error explanation"
      isInvalid={true}
    />
  );
};

<ExampleDateInput />;
```

```jsx
import { useState } from 'react';
import { XUIDateRangeInput } from '@xero/xui/react/dateinput';

const ExampleDateRangePicker = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const onSelectStartDate = newDate => {
    setStartDate(newDate);
  };
  const onSelectEndDate = newDate => {
    setEndDate(newDate);
  };

  // Implement getting correct dates in getStartDate and getStartDate using your date handling library.
  const dateRangeInputSuggestedDates = [
    {
      id: 'monthThis',
      text: 'This Month',
      getStartDate: () => {
        return new Date();
      },
      getEndDate: () => {
        return new Date();
      }
    },
    {
      id: 'quarterThis',
      text: 'This quarter',
      getStartDate: () => {
        return new Date();
      },
      getEndDate: () => {
        return new Date();
      }
    }
  ];

  return (
    <XUIDateRangeInput
      suggestedDates={dateRangeInputSuggestedDates}
      locale="en"
      nextButtonAriaLabel="Next month"
      prevButtonAriaLabel="Previous month"
      startDateInputConfig={{
        onSelectDate: onSelectStartDate,
        selectedDateValue: startDate,
        validationMessage: 'Start error explanation',
        isInvalid: true,
        inputLabel: 'First label'
      }}
      endDateInputConfig={{
        onSelectDate: onSelectEndDate,
        selectedDateValue: endDate,
        validationMessage: 'End error explanation',
        isInvalid: true,
        inputLabel: 'Second label'
      }}
    />
  );
};

<ExampleDateRangePicker />;
```

### Suggested dates

Suggested dates are quick selection options for users, and they are passed using `suggestedDates` prop. It is optional for `XUIDateInput` but required for `XUIDateRangeInput`.
The `suggestedDates` property is an array of objects with the following structure.

```markup
// Object structure for DateInput.
{
  getDate: Function,
  id: String,
  text: String,
}
```

```markup
// Object structure for DateRangeInput.
{
  getEndDate: Function,
  getStartDate: Function,
  id: String,
  text: String,
}
```

```jsx
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  // Implement getting correct dates in getStartDate and getStartDate using your date handling library.
  const dateInputSuggestedDates = [
    {
      id: 'monthThis',
      text: 'This Month',
      getDate: () => {
        return new Date();
      }
    },
    {
      id: 'quarterThis',
      text: 'This quarter',
      getDate: () => {
        return new Date();
      }
    }
  ];

  return (
    <XUIDateInput
      inputLabel="Start date"
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
      suggestedDates={dateInputSuggestedDates}
      selectedDateValue={selectedDate}
    />
  );
};

<ExampleDateInput />;
```

`XUIDateInput` with suggested dates allows to control the icon displayed next to the item used to select the calendar. It is achieved by passing icon properties to `selectDateIcon`.

```jsx
import { useState } from 'react';
import { XUIDateRangeInput } from '@xero/xui/react/dateinput';

const ExampleDateRangePicker = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const onSelectStartDate = newDate => {
    setStartDate(newDate);
  };
  const onSelectEndDate = newDate => {
    setEndDate(newDate);
  };

  // Implement getting correct dates in getStartDate and getStartDate using your date handling library.
  const dateRangeInputSuggestedDates = [
    {
      id: 'monthThis',
      text: 'This Month',
      getStartDate: () => {
        return new Date();
      },
      getEndDate: () => {
        return new Date();
      }
    },
    {
      id: 'quarterThis',
      text: 'This quarter',
      getStartDate: () => {
        return new Date();
      },
      getEndDate: () => {
        return new Date();
      }
    }
  ];

  return (
    <XUIDateRangeInput
      suggestedDates={dateRangeInputSuggestedDates}
      locale="en"
      nextButtonAriaLabel="Next month"
      prevButtonAriaLabel="Previous month"
      startDateInputConfig={{
        onSelectDate: onSelectStartDate,
        selectedDateValue: startDate,
        inputLabel: 'Start date'
      }}
      endDateInputConfig={{
        onSelectDate: onSelectEndDate,
        selectedDateValue: endDate,
        inputLabel: 'End date'
      }}
    />
  );
};

<ExampleDateRangePicker />;
```

### Localisation

A `locale` string is required. This can be either the language only, like `en`, or language and region, like `fr-CA`.

### QA hooks and locale

Both `XUIDateInput` and `XUIDateRangeInput` accept a `qaHook` property to assist you with testing your implementations.
You can set the locale by providing the `locale` prop.

### Keyboard navigation

When a date picker is opened by interacting with date input components, it can be closed using the `escape` key. When date input components are focused but a date picker is not open, it can be opened by pressing the `down` arrow key. After focusing the date picker or suggested dates dropdown the corresponding `XUIDatePicker` or `XUIPicklist` keyboard navigation can be used.

### Shortcuts

`XUIDateInput` supports the use of Xero's [date entry shortcuts](https://central.xero.com/s/article/Tips-and-shortcuts#Dateentryshortcuts). To enable due-date specific shortcuts, e.g. `*12`, use the `isDueDate` prop.

### Size variants

Date input is available in three sizes: `medium`, `small` and `xsmall`. Similar to `XUITextInput`, the size can be adjusted with the `size` property.

```jsx
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return (
    <XUIDateInput
      inputLabel="Small date input"
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
      selectedDateValue={selectedDate}
      size="small"
    />
  );
};

<ExampleDateInput />;
```

### Calendar selection range

You can limit the range of selectable dates using the `minDate` and `maxDate` props.

```jsx
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return (
    <XUIDateInput
      displayedMonth={new Date(1999, 0)}
      inputLabel="Start date"
      locale="en"
      maxDate={new Date(2000, 0, 1)}
      minDate={new Date(1999, 0, 1)}
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
      selectedDateValue={selectedDate}
    />
  );
};

<ExampleDateInput />;
```

### Running a custom function when an Invalid Date is entered

You can add your own callback function to execute when an invalid date is entered. This can be handy when you want to add some conditional logic to run when an input is invalid.

For instance as seen in the example below, you are able to stop a user from submitting a form until a correct date is provided.

```jsx
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';
import XUIButton from '@xero/xui/react/button';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [isInvalidState, setIsInvalidState] = useState(true);
  const [validationMessage, setValidationMessage] = useState('Set error message');

  const onSelectDate = newDate => {
    setIsInvalidState(false);
    setSelectedDate(newDate);
  };

  const onError = invalidString => {
    setValidationMessage(`${invalidString} is not a valid date input`);
    setIsInvalidState(true);
  };

  return (
    <div>
      <div className="xui-margin-bottom">
        <XUIDateInput
          displayedMonth={new Date(2021, 0)}
          inputLabel="Start date"
          locale="en"
          nextButtonAriaLabel="Next month"
          onSelectDate={onSelectDate}
          prevButtonAriaLabel="Previous month"
          selectedDateValue={selectedDate}
          isInvalid={isInvalidState}
          onValidationFailed={onError}
          validationMessage={validationMessage}
        />
      </div>
      <XUIButton isDisabled={isInvalidState}>Submit</XUIButton>
    </div>
  );
};

<ExampleDateInput />;
```

### Custom Invalid Date

You are able to manually specify when an input is invalid by using the `isInvalid` prop. This allows you to use custom logic to determine when an input is considered invalid.

For instance in the example below,

```jsx
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [isInvalidState, setIsInvalidState] = useState(false);
  const [validationMessage, setValidationMessage] = useState('Set error message');

  const onSelectDate = newDate => {
    if (newDate.getFullYear() === 2021) {
      setIsInvalidState(true);
      setValidationMessage(`Please provide a date that is not in 2021`);
    }
    setSelectedDate(newDate);
  };

  return (
    <XUIDateInput
      displayedMonth={new Date(2021, 0)}
      inputLabel="Start date"
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
      selectedDateValue={selectedDate}
      isInvalid={isInvalidState}
      validationMessage={validationMessage}
    />
  );
};

<ExampleDateInput />;
```

Empty inputs by default are considered as valid inputs. However you can use `isInvalid` to change this behaviour:

```jsx
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [isInvalidState, setIsInvalidState] = useState(false);
  const [validationMessage, setValidationMessage] = useState('You must enter a date');

  const onSelectDate = newDate => {
    if (newDate === null) {
      setIsInvalidState(true);
    } else {
      setIsInvalidState(false);
    }
    setSelectedDate(newDate);
  };

  return (
    <XUIDateInput
      displayedMonth={new Date(2021, 0)}
      inputLabel="Date input requiring an input"
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
      selectedDateValue={selectedDate}
      isInvalid={isInvalidState}
      validationMessage={validationMessage}
    />
  );
};

<ExampleDateInput />;
```
