// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, number, text } from '@storybook/addon-knobs';
import { dateKnob } from '../../../../../.storybook/helpers';

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

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.addParameters({ layout: 'centered' });
storiesWithKnobs.add('Playground', () => {
  const storybookProps = {
    selectRange: boolean('Select date range', false),
  };

  const reactProps = {
    displayedMonth: dateKnob('displayedMonth', new Date(2022, 1, 1)),
    firstDayOfWeek: number('firstDayOfWeek', 0),
    locale: text('locale', 'en-NZ'),
    maxDate: dateKnob('maxDate', new Date(2099, 11, 31)),
    minDate: dateKnob('minDate', new Date(0)),
    nextButtonAriaLabel: text('nextButtonAriaLabel', 'Next month'),
    prevButtonAriaLabel: text('prevButtonAriaLabel', 'Previous month'),
    selectedDate: dateKnob('selectedDate', new Date(2022, 1, 2)),
    selectedRange: {},
    showDaysInOtherMonths: boolean('showDaysInOtherMonths', true),
    showFixedNumberOfWeeks: boolean('showFixedNumberOfWeeks', false),
  };

  const PlaygroundDatePicker = props => {
    const [selectedDate, setSelectedDate] = React.useState(reactProps.selectedDate);
    const [selectedRange, setSelectedRange] = React.useState(reactProps.selectedRange);

    const onSelectDate = newDate => {
      if (storybookProps.selectRange) {
        setSelectedDate(null);

        if (selectedRange && selectedRange.from && !selectedRange.to) {
          setSelectedRange({
            from: minDate(selectedRange.from, newDate),
            to: maxDate(selectedRange.from, newDate),
          });
        } else {
          setSelectedRange({ from: newDate, to: null });
        }
      } else {
        setSelectedDate(newDate);
        setSelectedRange(null);
      }
    };

    return (
      <XUIDatePicker
        {...props}
        onSelectDate={onSelectDate}
        selectedDate={selectedDate}
        selectedRange={selectedRange}
      />
    );
  };

  return (
    <XUIPanel>
      <PlaygroundDatePicker {...reactProps} />
    </XUIPanel>
  );
});

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
