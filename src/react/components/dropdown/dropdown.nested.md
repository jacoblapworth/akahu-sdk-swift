`XUINestedDropdown` is designed as a `XUIDropdown` replacement that allows consumers to implement small, multi-step flows inside of a triggered dropdown. A quick example would be allowing the user to choose between some suggested dates and a fixed custom date like below.

```jsx harmony
import { useRef, useState } from 'react';
import XUIButton from '@xero/xui/react/button';
import XUIDatePicker from '@xero/xui/react/datepicker';
import {
  XUIDropdownFooter,
  XUIDropdownHeader,
  XUIDropdownPanel,
  XUIDropdownToggled,
  XUINestedDropdown
} from '@xero/xui/react/dropdown';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';

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

function getToday() {
  const today = new Date();
  today.setUTCHours(0);
  today.setUTCMinutes(0);
  today.setUTCSeconds(0);
  today.setUTCMilliseconds(0);
  return today;
}

const suggestedDates = [
  {
    id: 'today',
    getDate: () => {
      const today = getToday();
      today.setDate(today.getDate());
      return today;
    },
    text: 'Today'
  },
  {
    id: 'tomorrow',
    getDate: () => {
      const today = getToday();
      today.setDate(today.getDate() + 1);
      return today;
    },
    text: 'Tomorrow'
  }
];

const NestedDropdownExample = () => {
  const [activePanel, setActivePanel] = useState('suggestedDates');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedSuggestedDate, setSelectedSuggestedDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const datepicker = useRef();
  const ddt = useRef();

  const closeDropdown = () => ddt.current.closeDropdown();

  const focusDatePicker = () => {
    if (activePanel === 'customDate') {
      datepicker.current.focus();
    }
  };

  const showSuggestedDates = () => {
    setActivePanel('suggestedDates');
  };

  const showMonth = date => setCurrentMonth(date);

  const selectSuggestedDate = selectedValue => {
    if (selectedValue === 'custom') {
      setActivePanel('customDate');
    } else {
      const selectedDate = suggestedDates.find(suggestedDate => suggestedDate.id === selectedValue);
      setSelectedSuggestedDate(selectedDate.id);
      setSelectedDate(selectedDate.getDate());
      closeDropdown();
    }
  };

  const selectDate = date => {
    setSelectedSuggestedDate('custom');
    setSelectedDate(date);
    closeDropdown();
  };

  const selectCustomSuggestedDate = () => {
    selectSuggestedDate('custom');
  };

  const triggerText = selectedDate === null ? 'Issue date' : formatDate(selectedDate);

  const trigger = <XUIButton hasCaret>{triggerText}</XUIButton>;

  const dropdownFooter = (
    <XUIDropdownFooter
      pickItems={
        <XUIPickitem id="custom" key="custom" onClick={selectCustomSuggestedDate}>
          Pick another date
        </XUIPickitem>
      }
    />
  );

  const dropdown = (
    <XUINestedDropdown currentPanelId={activePanel} onPanelChange={focusDatePicker}>
      <XUIDropdownPanel footer={dropdownFooter} panelId="suggestedDates">
        <XUIPicklist>
          {suggestedDates.map(cd => {
            const { id, text } = cd;

            return (
              <XUIPickitem
                id={id}
                isSelected={selectedSuggestedDate === id}
                key={id}
                onSelect={selectSuggestedDate}
                value={id}
              >
                {text}
              </XUIPickitem>
            );
          })}
        </XUIPicklist>
      </XUIDropdownPanel>
      <XUIDropdownPanel
        header={
          <XUIDropdownHeader
            backButtonAriaLabel="Back"
            onBackButtonClick={showSuggestedDates}
            onSecondaryButtonClick={closeDropdown}
            secondaryButtonContent="Cancel"
            title="Suggested Dates"
          />
        }
        panelId="customDate"
      >
        <XUIDatePicker
          displayedMonth={currentMonth}
          locale="en"
          nextButtonAriaLabel="Next month"
          onSelectDate={selectDate}
          prevButtonAriaLabel="Previous month"
          ref={datepicker}
          selectedDate={selectedDate}
        />
      </XUIDropdownPanel>
    </XUINestedDropdown>
  );

  const isPicklist = activePanel !== 'customDate';

  return (
    <XUIDropdownToggled
      closeOnSelect={false}
      closeOnTab={false}
      dropdown={dropdown}
      onClose={showSuggestedDates}
      ref={ddt}
      restrictToViewPort={isPicklist}
      trigger={trigger}
    />
  );
};

<NestedDropdownExample />;
```

- Each panel must be wrapped in a `XUIDropdownPanel` and passed as children to `XUINestedDropdown`. Each panel should be given a `panelId` and the id of the currently selected panel should be passed to `XUINestedDropdown` via the `currentPanelId` prop.
- Navigation to previous steps should be handled in the `onBackButtonClick` callback in `XUIDropdownHeader`. `XUIDropdownHeader` should be passed into `XUIDropdownPanel` for panels that require one.
- `closeOnSelect={false}` should be set on `XUIDropdownToggled` to prevent closing on `Pickitem` selection. `XUIDropdownToggled.closeDropdown` should then be called in the `onSelect` callback when appropriate.
- `XUIDatePicker` should be given focus explicitly. `XUIDatePicker.focusDatePicker` should be called in `XUINestedDropdown.onPanelChange` when the datepicker panel becomes active.
