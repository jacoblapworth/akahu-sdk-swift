**Note:** This component is still considered beta, and it's API may change before it is officially released.

`NestedDropDown` is designed as a `DropDown` replacement that allows consumers to implement small, multi-step flows inside of a triggered dropdown. A quick example would be allowing the user to choose between some convenience dates and a fixed custom date like below.

```jsx harmony
import 'array.prototype.find';
import { Component } from 'react';
import {
  DropDownToggled,
  DropDownHeader,
  DropDownFooter,
  NestedDropDown,
  DropDownPanel
} from '@xero/xui/react/dropdown';
import XUIButton from '@xero/xui/react/button';
import XUIDatePicker from '@xero/xui/react/datepicker';
import Picklist, { Pickitem } from '@xero/xui/react/picklist';

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

const convenienceDates = [
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
      activePanel: 'convenienceDates',
      currentMonth: new Date(),
      selectedConvenienceDate: null,
      selectedDate: null
    };
    this.datepicker = React.createRef();
    this.ddt = React.createRef();

    this.closeDropDown = this.closeDropDown.bind(this);
    this.focusDatePicker = this.focusDatePicker.bind(this);
    this.showConvenienceDates = this.showConvenienceDates.bind(this);
    this.showMonth = this.showMonth.bind(this);
    this.selectConvenienceDate = this.selectConvenienceDate.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.selectCustomConvenience = this.selectCustomConvenience.bind(this);
  }

  closeDropDown() {
    this.ddt.current.closeDropDown();
  }

  focusDatePicker() {
    if (this.state.activePanel === 'customDate') {
      this.datepicker.current.focus();
    }
  }

  showConvenienceDates() {
    this.setState({
      activePanel: 'convenienceDates'
    });
  }

  showMonth(date) {
    this.setState({
      currentMonth: date
    });
  }

  selectConvenienceDate(selectedCd) {
    if (selectedCd === 'custom') {
      this.setState({
        activePanel: 'customDate'
      });
    } else {
      const cd = convenienceDates.find(convenienceDate => convenienceDate.id === selectedCd);
      this.setState({
        selectedConvenienceDate: cd.id,
        selectedDate: cd.getDate()
      });
      this.closeDropDown();
    }
  }

  selectDate(date) {
    this.setState({
      selectedConvenienceDate: 'custom',
      selectedDate: date
    });
    this.closeDropDown();
  }

  selectCustomConvenience() {
    this.selectConvenienceDate('custom');
  }

  render() {
    const { activePanel, selectedDate } = this.state;
    let triggerText = 'Select a Date';
    if (selectedDate != null) {
      triggerText = formatDate(selectedDate);
    }

    const trigger = <XUIButton hasCaret>{triggerText}</XUIButton>;

    const dropdownFooter = (
      <DropDownFooter
        pickItems={
          <Pickitem id="custom" key="custom" onClick={this.selectCustomConvenience}>
            Custom Date
          </Pickitem>
        }
      />
    );

    const dropdown = (
      <NestedDropDown currentPanelId={activePanel} onPanelChange={this.focusDatePicker}>
        <DropDownPanel panelId="convenienceDates" footer={dropdownFooter}>
          <Picklist>
            {convenienceDates.map(cd => (
              <Pickitem
                key={cd.id}
                id={cd.id}
                value={cd.id}
                isSelected={this.state.selectedConvenienceDate === cd.id}
                onSelect={this.selectConvenienceDate}
              >
                {cd.text}
              </Pickitem>
            ))}
          </Picklist>
        </DropDownPanel>
        <DropDownPanel
          panelId="customDate"
          header={
            <DropDownHeader
              title="Example Title"
              onBackButtonClick={this.showConvenienceDates}
              onSecondaryButtonClick={this.closeDropDown}
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
        </DropDownPanel>
      </NestedDropDown>
    );
    const isPicklist = activePanel !== 'customDate';
    return (
      <DropDownToggled
        ref={this.ddt}
        trigger={trigger}
        dropdown={dropdown}
        closeOnSelect={false}
        onClose={this.showConvenienceDates}
        closeOnTab={false}
        restrictToViewPort={isPicklist}
      />
    );
  }
}
<NestedExample />;
```

- Each panel must be wrapped in a `DropDownPanel` and passed as children to `NestedDropDown`. Each panel should be given a `panelId` and the id of the currently selected panel should be passed to `NestedDropDown` via the `currentPanelId` prop.
- Navigation to previous steps should be handled in the `onBackButtonClick` callback in `DropDownHeader`. `DropDownHeader` should be passed into `DropDownPanel` for panels that require one.
- `closeOnSelect={false}` should be set on `DropDownToggled` to prevent closing on `Pickitem` selection. `DropDownToggled.closeDropDown` should then be called in the `onSelect` callback when appropriate.
- `XUIDatePicker` should be given focus explicitly. `XUIDatePicker.focusDatePicker` should be called in `NestedDropDown.onPanelChange` when the datepicker panel becomes active.
