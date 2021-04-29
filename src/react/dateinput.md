<div class="xui-margin-vertical">
  <!-- TODO -->
	<a href="../section-components-collectinginput-datepicker.html" isDocLink>Dateinput in the XUI Documentation</a>
</div>

`XUIDateInput` and `XUIDateRangeInput` are an experimental components for selecting dates. They combine `XUITextInput` for keyboard interaction and `XUIDatePicker` for selecting dates from a calendar.

## Examples

### Standard

Similar to `XUIDatePicker`, in order to use the standard `XUIDateInput` or `XUIDateRangeInput` component, you should use the `onSelectDate` callback to update state in your application. This callback will receive the new selected date as a parameter.

```jsx harmony
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return <XUIDateInput onSelectDate={onSelectDate} />;
};

<ExampleDateInput />;
```

### Date Ranges

Each of the two dates in `XUIDateRangeInput` are configured in its own prop `startDateInputConfig` and `endDateInputConfig` to handle the first and the second DateInput respectively.
Date range selection also takes advantage of the suggested dates array that allows users to select from predefined shortcut dates.

```jsx harmony
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
      endDateInputConfig={{ onSelectDate: onSelectStartDate }}
      startDateInputConfig={{ onSelectDate: onSelectEndDate }}
    />
  );
};

<ExampleDateRangePicker />;
```

### Setting the default selected date

When setting initial date input values use `selectedDateDefaultValue`. Pass the same property in `startDateInputConfig` and `endDateInputConfig` props for `XUIDateRangeInput`.
When controlling changes in input values in your store, pass it as `selectedDateValue` prop. These properties all accept `Date` value type.

```jsx harmony
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();
  const defaultValue = new Date(2021, 0, 1);

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return <XUIDateInput onSelectDate={onSelectDate} selectedDateDefaultValue={defaultValue} />;
};

<ExampleDateInput />;
```

```jsx harmony
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
      startDateInputConfig={{
        onSelectDate: onSelectEndDate,
        inputLabel: 'First label'
      }}
      endDateInputConfig={{
        onSelectDate: onSelectStartDate,
        inputLabel: 'Second label'
      }}
    />
  );
};

<ExampleDateRangePicker />;
```

### Disabled input

Pass the `isDisabled` property to disable the date input (use `startDateInputConfig` and `endDateInputConfig` props for `XUIDateRangeInput`).

```jsx harmony
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return <XUIDateInput onSelectDate={onSelectDate} isDisabled={true} />;
};

<ExampleDateInput />;
```

```jsx harmony
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
      startDateInputConfig={{
        onSelectDate: onSelectEndDate,
        isDisabled: true,
        inputLabel: 'First label'
      }}
      endDateInputConfig={{
        onSelectDate: onSelectStartDate,
        isDisabled: true,
        inputLabel: 'Second label'
      }}
    />
  );
};

<ExampleDateRangePicker />;
```

### Hints

For `XUIDateInput`, hints can be provided using the `hintMessage` prop. For `XUIDateRangeInput` hints can be provided by providing `hintMessage` properties to the `startDateInputConfig` and/or `endDateInputConfig` object props.

```jsx harmony
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return <XUIDateInput onSelectDate={onSelectDate} hintMessage="Helpful hint" />;
};

<ExampleDateInput />;
```

```jsx harmony
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
      startDateInputConfig={{
        onSelectDate: onSelectEndDate,
        hintMessage: 'Start hint text',
        inputLabel: 'Start date'
      }}
      endDateInputConfig={{
        onSelectDate: onSelectStartDate,
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

```jsx harmony
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return (
    <XUIDateInput
      onSelectDate={onSelectDate}
      validationMessage="Start error explanation"
      isInvalid={true}
    />
  );
};

<ExampleDateInput />;
```

```jsx harmony
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
      startDateInputConfig={{
        onSelectDate: onSelectEndDate,
        validationMessage: 'Start error explanation',
        isInvalid: true,
        inputLabel: 'First label'
      }}
      endDateInputConfig={{
        onSelectDate: onSelectStartDate,
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

```jsx harmony
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

  return <XUIDateInput onSelectDate={onSelectDate} suggestedDates={dateInputSuggestedDates} />;
};

<ExampleDateInput />;
```

`XUIDateInput` with suggested dates allows to control the icon displayed next to the item used to select the calendar. It is achieved by passing icon properties to `selectDateIcon`.

```jsx harmony
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
      startDateInputConfig={{
        onSelectDate: onSelectEndDate,
        inputLabel: 'First label'
      }}
      endDateInputConfig={{
        onSelectDate: onSelectStartDate,
        inputLabel: 'Second label'
      }}
    />
  );
};

<ExampleDateRangePicker />;
```

### QA hooks and locale

Both `XUIDateInput` and `XUIDateRangeInput` accept a `qaHook` property to assist you with testing your implementations.
You can set the locale by providing the `locale` prop.

### Keyboard navigation

When a date picker is opened by interacting with date input components, it can be closed using the `escape` key. When date input components are focused but a date picker is not open, it can be opened by pressing the `down` arrow key. After focusing the date picker or suggested dates dropdown the corresponding `XUIDatePicker` or `XUIPicklist` keyboard navigation can be used.

### Size variants

Date input is available in three sizes: `medium`, `small` and `xsmall`. Similar to `XUITextInput`, the size can be adjusted with the `size` property.

```jsx harmony
import { useState } from 'react';
import XUIDateInput from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return <XUIDateInput inputLabel="Small date input" onSelectDate={onSelectDate} size="small" />;
};

<ExampleDateInput />;
```

### Calendar selection range

You can limit the range of selectable dates using the `minDate` and `maxDate` props.

```jsx harmony
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
      onSelectDate={onSelectDate}
      minDate={new Date(1999, 0, 1)}
      maxDate={new Date(2000, 0, 1)}
      displayedMonth={new Date(1999, 0)}
    />
  );
};

<ExampleDateInput />;
```
