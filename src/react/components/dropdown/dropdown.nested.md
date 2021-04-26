`XUINestedDropdown` is designed as a `XUIDropdown` replacement that allows consumers to implement small, multi-step flows inside of a triggered dropdown. A quick example would be allowing the user to choose between some suggested dates and a fixed custom date like below.

```jsx harmony
import 'array.prototype.find';
import { Component } from 'react';
import {
  XUIDropdownFooter,
  XUIDropdownHeader,
  XUIDropdownPanel,
  XUIDropdownToggled,
  XUINestedDropdown
} from '@xero/xui/react/dropdown';
import XUIButton from '@xero/xui/react/button';
import XUIDatePicker from '@xero/xui/react/datepicker';
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
    id: 'week',
    text: 'Next Week',
    getDate: () => {
      const today = getToday();
      today.setDate(today.getDate() + 7);
      return today;
    }
  },
  {
    id: 'month',
    text: 'Next Month',
    getDate: () => {
      const today = getToday();
      today.setMonth(today.getMonth() + 1);
      return today;
    }
  }
];

class NestedExample extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      activePanel: 'suggestedDates',
      currentMonth: new Date(),
      selectedSuggestedDate: null,
      selectedDate: null
    };
    this.datepicker = React.createRef();
    this.ddt = React.createRef();

    this.closeDropdown = this.closeDropdown.bind(this);
    this.focusDatePicker = this.focusDatePicker.bind(this);
    this.showSuggestedDates = this.showSuggestedDates.bind(this);
    this.showMonth = this.showMonth.bind(this);
    this.selectSuggestedDate = this.selectSuggestedDate.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.selectCustomSuggestedDate = this.selectCustomSuggestedDate.bind(this);
  }

  closeDropdown() {
    this.ddt.current.closeDropdown();
  }

  focusDatePicker() {
    if (this.state.activePanel === 'customDate') {
      this.datepicker.current.focus();
    }
  }

  showSuggestedDates() {
    this.setState({
      activePanel: 'suggestedDates'
    });
  }

  showMonth(date) {
    this.setState({
      currentMonth: date
    });
  }

  selectSuggestedDate(selectedCd) {
    if (selectedCd === 'custom') {
      this.setState({
        activePanel: 'customDate'
      });
    } else {
      const cd = suggestedDates.find(suggestedDate => suggestedDate.id === selectedCd);
      this.setState({
        selectedSuggestedDate: cd.id,
        selectedDate: cd.getDate()
      });
      this.closeDropdown();
    }
  }

  selectDate(date) {
    this.setState({
      selectedSuggestedDate: 'custom',
      selectedDate: date
    });
    this.closeDropdown();
  }

  selectCustomSuggestedDate() {
    this.selectSuggestedDate('custom');
  }

  render() {
    const { activePanel, selectedDate } = this.state;
    let triggerText = 'Select a Date';
    if (selectedDate != null) {
      triggerText = formatDate(selectedDate);
    }

    const trigger = <XUIButton hasCaret>{triggerText}</XUIButton>;

    const dropdownFooter = (
      <XUIDropdownFooter
        pickItems={
          <XUIPickitem id="custom" key="custom" onClick={this.selectCustomSuggestedDate}>
            Custom Date
          </XUIPickitem>
        }
      />
    );

    const dropdown = (
      <XUINestedDropdown currentPanelId={activePanel} onPanelChange={this.focusDatePicker}>
        <XUIDropdownPanel panelId="suggestedDates" footer={dropdownFooter}>
          <XUIPicklist>
            {suggestedDates.map(cd => (
              <XUIPickitem
                key={cd.id}
                id={cd.id}
                value={cd.id}
                isSelected={this.state.selectedSuggestedDate === cd.id}
                onSelect={this.selectSuggestedDate}
              >
                {cd.text}
              </XUIPickitem>
            ))}
          </XUIPicklist>
        </XUIDropdownPanel>
        <XUIDropdownPanel
          panelId="customDate"
          header={
            <XUIDropdownHeader
              title="Example Title"
              onBackButtonClick={this.showSuggestedDates}
              onSecondaryButtonClick={this.closeDropdown}
              secondaryButtonContent="Cancel"
              backButtonAriaLabel="Back"
            />
          }
        >
          <XUIDatePicker
            ref={this.datepicker}
            displayedMonth={this.state.currentMonth}
            selectedDate={this.state.selectedDate}
            onSelectDate={this.selectDate}
          />
        </XUIDropdownPanel>
      </XUINestedDropdown>
    );
    const isPicklist = activePanel !== 'customDate';
    return (
      <XUIDropdownToggled
        ref={this.ddt}
        trigger={trigger}
        dropdown={dropdown}
        closeOnSelect={false}
        onClose={this.showSuggestedDates}
        closeOnTab={false}
        restrictToViewPort={isPicklist}
      />
    );
  }
}
<NestedExample />;
```

- Each panel must be wrapped in a `XUIDropdownPanel` and passed as children to `XUINestedDropdown`. Each panel should be given a `panelId` and the id of the currently selected panel should be passed to `XUINestedDropdown` via the `currentPanelId` prop.
- Navigation to previous steps should be handled in the `onBackButtonClick` callback in `XUIDropdownHeader`. `XUIDropdownHeader` should be passed into `XUIDropdownPanel` for panels that require one.
- `closeOnSelect={false}` should be set on `XUIDropdownToggled` to prevent closing on `Pickitem` selection. `XUIDropdownToggled.closeDropdown` should then be called in the `onSelect` callback when appropriate.
- `XUIDatePicker` should be given focus explicitly. `XUIDatePicker.focusDatePicker` should be called in `XUINestedDropdown.onPanelChange` when the datepicker panel becomes active.
