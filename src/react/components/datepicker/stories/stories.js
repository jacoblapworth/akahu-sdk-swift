// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, select, date } from '@storybook/addon-knobs';

// Components we need to test with
import XUIDatePicker from '../XUIDatePicker';
import XUIPanel from '../../panel/XUIPanel';

import NOOP from '../../helpers/noop';
import {
  storiesWithVariationsKindName,
  variations,
  wkdShort,
  customMonths,
  currentMonth0,
} from './variations';

const weekStarts = {
  0: 'Sun (0)',
  1: 'Mon (1)',
};

function minDate(d1, d2) {
  return d1 < d2 ? d1 : d2;
}

function maxDate(d1, d2) {
  return d1 > d2 ? d1 : d2;
}

class ExamplePicker extends React.Component {
  state = {
    selectedDate: null,
    selectedRange: null,
  };

  onSelectDate = newDate => {
    if (this.props.selectRange) {
      this.setState(prevState => {
        const { selectedRange } = prevState;
        if (selectedRange && selectedRange.from && !selectedRange.to) {
          return {
            selectedRange: {
              from: minDate(selectedRange.from, newDate),
              to: maxDate(selectedRange.from, newDate),
            },
            selectedDate: null,
          };
        }
        return {
          selectedRange: {
            from: newDate,
            to: null,
          },
          selectedDate: null,
        };
      });
    } else {
      this.setState({
        selectedDate: newDate,
        selectedRange: null,
      });
    }
  };

  render() {
    return (
      <XUIDatePicker
        onSelectDate={this.onSelectDate}
        selectedDate={this.state.selectedDate}
        selectedRange={this.state.selectedRange}
        {...this.props}
      />
    );
  }
}

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addParameters({ layout: 'centered' });
storiesWithKnobs.add('Playground', () => (
  <XUIPanel>
    <ExamplePicker
      dir={select('direction', ['ltr', 'rtl'])}
      displayedMonth={date('displayedMonth', '') ? new Date(date('displayedMonth', '')) : undefined}
      firstDayOfWeek={parseInt(select('firstDayOfWeek', weekStarts, '0'))}
      maxDate={date('maxDate', '') ? new Date(date('maxDate', '')) : undefined}
      minDate={date('minDate', '') ? new Date(date('minDate', '')) : undefined}
      months={
        select('months', ['standard', 'custom'], 'standard') === 'custom' ? customMonths : undefined
      }
      selectRange={boolean('select range', false)}
      showDaysInOtherMonths={boolean('showDaysInOtherMonths', false)}
      showFixedNumberOfWeeks={boolean('showFixedNumberOfWeeks', false)}
      weekdaysShort={
        select('weekdaysShort', ['standard', 'custom'], 'standard') === 'custom'
          ? wkdShort
          : undefined
      }
    />
  </XUIPanel>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;
    // Defaults for variation display;
    variationMinusStoryDetails.onSelectDate = NOOP;
    variationMinusStoryDetails.displayedMonth = currentMonth0;

    return (
      <XUIPanel>
        <XUIDatePicker {...variationMinusStoryDetails} />
      </XUIPanel>
    );
  });
});
