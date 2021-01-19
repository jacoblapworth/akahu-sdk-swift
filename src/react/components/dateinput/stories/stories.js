// Libs
import React from 'react';
import dayjs from 'dayjs';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, object, text, withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

// Components we need to test with
import XUIDateInputWIP from '../XUIDateInputWIP';
import XUIDateRangeInputWIP from '../XUIDateRangeInputWIP';

import {
  dateInputConvenienceDates,
  dateRangeInputConvenienceDates,
} from './helpers/convenienceDates';

import { variations, storiesWithVariationsKindName } from './variations';

const sampleOnSelectDateFunction = date => {
  console.log('Print date', date);
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.add('Playground', () => {
  const singleDateProps = {
    firstInputLabel: 'Single date Date',
    closeOnSelect: true,
    firstHintMessage: 'This is the first hint note',
    firstSelectedDateValue: new Date(2019, 11, 20),
    onFirstSelectDate: sampleOnSelectDateFunction,
    convenienceDates: boolean('Date input convenience dates') ? dateInputConvenienceDates : null,
  };

  const dateRangeProps = {
    startDateInputConfig: {
      inputLabel: 'First Date',
      hintMessage: 'This is the first hint note',
      selectedDateValue: new Date(2019, 11, 20),
      onInputChange: sampleOnSelectDateFunction,
    },
    endDateInputConfig: {
      inputLabel: 'Second Date',
      hintMessage: 'This is the second hint note',
      selectedDateValue: new Date(),
      onInputChange: sampleOnSelectDateFunction,
    },
    convenienceDates: dateRangeInputConvenienceDates,
  };

  return boolean('isDateRangeInput', false) ? (
    <XUIDateRangeInputWIP {...dateRangeProps} />
  ) : (
    <XUIDateInputWIP {...singleDateProps} />
  );
});

// const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
// storiesWithVariations.addDecorator(centered);
