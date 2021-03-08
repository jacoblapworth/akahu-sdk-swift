// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';

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
storiesWithKnobs.add('Playground', () => {
  const isDateRangeDemo = boolean('isDateRangeInput', false);

  let singleDateProps = {
    firstInputLabel: 'Single date Date',
    closeOnSelect: true,
    onSelectDate: sampleOnSelectDateFunction,
    validationMessage: text('validationMessage', ''),
  };

  let dateRangeProps = {
    startDateInputConfig: {
      inputLabel: 'First Date',
      onInputChange: sampleOnSelectDateFunction,
    },
    endDateInputConfig: {
      inputLabel: 'Second Date',
      onInputChange: sampleOnSelectDateFunction,
    },
    convenienceDates: dateRangeInputConvenienceDates,
  };

  // Now add conditional knobs.
  if (!isDateRangeDemo) {
    singleDateProps = {
      ...singleDateProps,
      selectedDateValue: boolean('Empty default date?', true) ? null : new Date(2019, 11, 20),
      convenienceDates: boolean('Date input convenience dates', false)
        ? dateInputConvenienceDates
        : null,
      hintMessage: text('Hint Message', ''),
      isDisabled: boolean('isDisabled', false),
      isInvalid: boolean('isInvalid', false),
    };
  } else {
    dateRangeProps = {
      ...dateRangeProps,
      startDateInputConfig: {
        ...dateRangeProps.startDateInputConfig,
        hintMessage: text('Hint Message for start date', 'This is the first hint note'),
        selectedDateValue: boolean('Empty default start date?', true)
          ? null
          : new Date(2019, 11, 20),
        isDisabled: boolean('Start date disabled?', false),
        isInvalid: boolean('Start date invalid?', false),
      },
      endDateInputConfig: {
        ...dateRangeProps.endDateInputConfig,
        hintMessage: text('Hint Message for end date', 'This is the second hint note'),
        selectedDateValue: boolean('Empty default end date?', true) ? null : new Date(),
        isDisabled: boolean('End date disabled?', false),
        isInvalid: boolean('End date invalid?', false),
      },
    };
  }

  return isDateRangeDemo ? (
    <XUIDateRangeInputWIP {...dateRangeProps} />
  ) : (
    <XUIDateInputWIP {...singleDateProps} />
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const isDateRangeInput = variation.isDateRangeInput;
    const isInFixedContainer = variation.fixedContainer;
    const variationMinusStoryDetails = { ...variation };
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;

    const component = isDateRangeInput ? (
      <XUIDateRangeInputWIP {...variationMinusStoryDetails} />
    ) : (
      <XUIDateInputWIP {...variationMinusStoryDetails} />
    );

    return isInFixedContainer ? (
      <div style={{ maxWidth: '250px', overflow: 'hidden' }}>{component}</div>
    ) : (
      component
    );
  });
});
