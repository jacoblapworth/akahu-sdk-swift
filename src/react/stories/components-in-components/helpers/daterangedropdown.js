import React from 'react';
import PropTypes from 'prop-types';

import XUIDropdown, { XUIDropdownToggled } from '../../../dropdown';
import XUIButton from '../../../button';
import XUIDatePicker from '../../../datepicker';

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
  'Dec',
];

const formatDate = date => `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

function minDate(d1, d2) {
  return d1 < d2 ? d1 : d2;
}

function maxDate(d1, d2) {
  return d1 > d2 ? d1 : d2;
}

export default class DropdownDateRange extends React.Component {
  state = {
    selectedRange: null,
    currentMonth: new Date(),
  };

  datepicker = React.createRef();

  ddt = React.createRef();

  focusDatePicker = () => {
    this.datepicker.current.focus();
  };

  onSelectDate = newDate => {
    this.setState(prevState => {
      const { selectedRange } = prevState;
      if (selectedRange && selectedRange.from && !selectedRange.to) {
        this.ddt.current.closeDropdown();
        return {
          selectedRange: {
            from: minDate(selectedRange.from, newDate),
            to: maxDate(selectedRange.from, newDate),
          },
        };
      }
      return {
        selectedRange: {
          from: newDate,
          to: null,
        },
      };
    });
  };

  render() {
    const { currentMonth, selectedRange } = this.state;
    const dropdown = (
      <XUIDropdown>
        <XUIDatePicker
          displayedMonth={currentMonth}
          onSelectDate={this.onSelectDate}
          ref={this.datepicker}
          selectedRange={selectedRange}
        />
      </XUIDropdown>
    );
    const trigger = (
      <XUIButton fullWidth="small-down" size={this.props.size}>
        {!selectedRange || !selectedRange.to
          ? 'Datepicker'
          : `${formatDate(selectedRange.from)} - ${formatDate(selectedRange.to)}`}
      </XUIButton>
    );
    return (
      <XUIDropdownToggled
        closeOnTab={false}
        dropdown={dropdown}
        onOpenAnimationEnd={this.focusDatePicker}
        ref={this.ddt}
        restrictToViewPort={false}
        trigger={trigger}
      />
    );
  }
}

DropdownDateRange.propTypes = {
  /**
   * Modifier for the size of the button. `medium`, `small`, or `xsmall`.
   * Buttons with `variant` set to `unstyled` will ignore the `size` property.
   */
  size: PropTypes.oneOf(['medium', 'small', 'xsmall']),
};
