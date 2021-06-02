// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, date, number, text } from '@storybook/addon-knobs';

// Components we need to test with
import XUIDatePicker from '../XUIDatePicker';
import XUIPanel from '../../panel/XUIPanel';

import NOOP from '../../helpers/noop';
import {
  storiesWithVariationsKindName,
  variations,
  currentMonth0,
  storiesWithKnobsKindName,
} from './variations';

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
        nextButtonAriaLabel="Next month"
        onSelectDate={this.onSelectDate}
        prevButtonAriaLabel="Previous month"
        selectedDate={this.state.selectedDate}
        selectedRange={this.state.selectedRange}
        {...this.props}
      />
    );
  }
}

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.addParameters({ layout: 'centered' });
storiesWithKnobs.add('Playground', () => (
  <XUIPanel>
    <ExamplePicker
      displayedMonth={date('displayedMonth', '') ? new Date(date('displayedMonth', '')) : undefined}
      firstDayOfWeek={number('firstDayOfWeek', 0)}
      locale={text('locale', 'en')}
      maxDate={date('maxDate', '') ? new Date(date('maxDate', '')) : undefined}
      minDate={date('minDate', '') ? new Date(date('minDate', '')) : undefined}
      selectRange={boolean('select range', false)}
      showDaysInOtherMonths={boolean('showDaysInOtherMonths', false)}
      showFixedNumberOfWeeks={boolean('showFixedNumberOfWeeks', false)}
    />
  </XUIPanel>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;

    const defaultProps = {
      displayedMonth: currentMonth0,
      locale: 'en',
      nextButtonAriaLabel: 'Next month',
      onSelectDate: NOOP,
      prevButtonAriaLabel: 'Previous month',
    };

    return (
      <XUIPanel>
        <XUIDatePicker {...defaultProps} {...variationMinusStoryDetails} />
      </XUIPanel>
    );
  });
});
