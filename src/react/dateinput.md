<div class="xui-margin-vertical">
  <!-- TODO -->
	<a href="../section-components-collectinginput-datepicker.html" isDocLink>Dateinput in the XUI Documentation</a>
</div>

`XUIDateInputWIP` and `XUIDateRangeInputWIP` are an experimental components for selecting dates. They combine `XUITextInput` for keyboard interaction and `XUIDatePicker` for selecting dates from a calendar.

## Examples

### Standard

Similar to `XUIDatePicker`, in order to use the standard `XUIDateInputWIP` or `XUIDateRangeInputWIP` component, you should use the `onSelectDate` callback to update state in your application. This callback will receive the new selected date as a parameter.

```jsx harmony
import { useState } from 'react';
import XUIDateInputWIP from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return (
    <XUIDateInputWIP
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
    />
  );
};

<ExampleDateInput />;
```

### Date Ranges

Each of the two dates in `XUIDateRangeInputWIP` are configured in its own prop `startDateInputConfig` and `endDateInputConfig` to handle the first and the second DateInput respectively.
Date range selection also takes advantage of the convenience dates array that allows users to select from predefined shortcut dates.

```jsx harmony
import { useState } from 'react';
import { XUIDateRangeInputWIP } from '@xero/xui/react/dateinput';

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
  const dateRangeInputConvenienceDates = [
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
    <XUIDateRangeInputWIP
      convenienceDates={dateRangeInputConvenienceDates}
      locale="en"
      nextButtonAriaLabel="Next month"
      prevButtonAriaLabel="Previous month"
      endDateInputConfig={{ onSelectDate: onSelectStartDate }}
      startDateInputConfig={{ onSelectDate: onSelectEndDate }}
    />
  );
};

<ExampleDateRangePicker />;
```

### Setting the default selected date

When setting initial date input values use `selectedDateDefaultValue`. Pass the same property in `startDateInputConfig` and `endDateInputConfig` props for `XUIDateRangeInputWIP`.
When controlling changes in input values in your store, pass it as `selectedDateValue` prop. These properties all accept `Date` value type.

```jsx harmony
import { useState } from 'react';
import XUIDateInputWIP from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();
  const defaultValue = new Date(2021, 0, 1);

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return <XUIDateInputWIP onSelectDate={onSelectDate} selectedDateDefaultValue={defaultValue} />;
};

<ExampleDateInput />;
```

```jsx harmony
import { useState } from 'react';
import { XUIDateRangeInputWIP } from '@xero/xui/react/dateinput';

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
  const dateRangeInputConvenienceDates = [
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
    <XUIDateRangeInputWIP
      convenienceDates={dateRangeInputConvenienceDates}
      locale="en"
      nextButtonAriaLabel="Next month"
      prevButtonAriaLabel="Previous month"
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

Pass the `isDisabled` property to disable the date input (use `startDateInputConfig` and `endDateInputConfig` props for `XUIDateRangeInputWIP`).

```jsx harmony
import { useState } from 'react';
import XUIDateInputWIP from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return (
    <XUIDateInputWIP
      isDisabled={true}
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
    />
  );
};

<ExampleDateInput />;
```

```jsx harmony
import { useState } from 'react';
import { XUIDateRangeInputWIP } from '@xero/xui/react/dateinput';

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
  const dateRangeInputConvenienceDates = [
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
    <XUIDateRangeInputWIP
      convenienceDates={dateRangeInputConvenienceDates}
      locale="en"
      nextButtonAriaLabel="Next month"
      prevButtonAriaLabel="Previous month"
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

For `XUIDateInputWIP`, hints can be provided using the `hintMessage` prop. For `XUIDateRangeInputWIP` hints can be provided by providing `hintMessage` properties to the `startDateInputConfig` and/or `endDateInputConfig` object props.

```jsx harmony
import { useState } from 'react';
import XUIDateInputWIP from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return (
    <XUIDateInputWIP
      hintMessage="Helpful hint"
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
    />
  );
};

<ExampleDateInput />;
```

```jsx harmony
import { useState } from 'react';
import { XUIDateRangeInputWIP } from '@xero/xui/react/dateinput';

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
  const dateRangeInputConvenienceDates = [
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
    <XUIDateRangeInputWIP
      convenienceDates={dateRangeInputConvenienceDates}
      locale="en"
      nextButtonAriaLabel="Next month"
      prevButtonAriaLabel="Previous month"
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

To control validation use the `validationMessage` and `isInvalid` props for `XUIDateInputWIP`. For `XUIDateRangeInputWIP` use the same names but as an object property passed in `startDateInputConfig` and `endDateInputConfig` props.

```jsx harmony
import { useState } from 'react';
import XUIDateInputWIP from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  return (
    <XUIDateInputWIP
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
      validationMessage="Start error explanation"
      isInvalid={true}
    />
  );
};

<ExampleDateInput />;
```

```jsx harmony
import { useState } from 'react';
import { XUIDateRangeInputWIP } from '@xero/xui/react/dateinput';

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
  const dateRangeInputConvenienceDates = [
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
    <XUIDateRangeInputWIP
      convenienceDates={dateRangeInputConvenienceDates}
      locale="en"
      nextButtonAriaLabel="Next month"
      prevButtonAriaLabel="Previous month"
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

### Convenience dates

Convenience dates are quick selection options for users, and they are passed using `convenienceDates` prop. It is optional for `XUIDateInputWIP` but required for `XUIDateRangeInputWIP`.
The `convenienceDates` property is an array of objects with the following structure.

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
import XUIDateInputWIP from '@xero/xui/react/dateinput';

const ExampleDateInput = () => {
  const [selectedDate, setSelectedDate] = useState();

  const onSelectDate = newDate => {
    setSelectedDate(newDate);
  };

  // Implement getting correct dates in getStartDate and getStartDate using your date handling library.
  const dateInputConvenienceDates = [
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
    <XUIDateInputWIP
      convenienceDates={dateInputConvenienceDates}
      locale="en"
      nextButtonAriaLabel="Next month"
      onSelectDate={onSelectDate}
      prevButtonAriaLabel="Previous month"
    />
  );
};

<ExampleDateInput />;
```

```jsx harmony
import { useState } from 'react';
import { XUIDateRangeInputWIP } from '@xero/xui/react/dateinput';

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
  const dateRangeInputConvenienceDates = [
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
    <XUIDateRangeInputWIP
      convenienceDates={dateRangeInputConvenienceDates}
      locale="en"
      nextButtonAriaLabel="Next month"
      prevButtonAriaLabel="Previous month"
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

### Localisation

A `locale` string is required. This can be either the language only, like `en`, or language and region, like `fr-CA`.

### QA hooks and locale

Both `XUIDateInputWIP` and `XUIDateRangeInputWIP` accept a `qaHook` property to assist you with testing your implementations.

### Keyboard navigation

When a date picker is opened by interacting with date input components, it can be closed using the `escape` key. When date input components are focused but a date picker is not open, it can be opened by pressing the `down` arrow key. Further keyboard support is under investigation.
