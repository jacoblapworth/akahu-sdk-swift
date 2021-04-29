// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';

// Components we need to test with
import XUIDateInput from '../XUIDateInput';
import XUIDateRangeInput from '../XUIDateRangeInput';

import { dateInputSuggestedDates, dateRangeInputSuggestedDates } from './helpers/suggestedDates';

import { variations, storiesWithVariationsKindName } from './variations';

const sampleOnSelectDateFunction = date => {
  console.log('Print date', date);
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.add('Playground', () => {
  const isDateRangeDemo = boolean('isDateRangeInput', false);

  let singleDateProps = {
    closeOnSelect: true,
    onSelectDate: sampleOnSelectDateFunction,
    validationMessage: text('validationMessage', ''),
  };

  let dateRangeProps = {
    startDateInputConfig: {
      onInputChange: sampleOnSelectDateFunction,
    },
    endDateInputConfig: {
      onInputChange: sampleOnSelectDateFunction,
    },
    suggestedDates: dateRangeInputSuggestedDates,
  };

  // Now add conditional knobs.
  if (!isDateRangeDemo) {
    singleDateProps = {
      ...singleDateProps,
      selectedDateValue: boolean('Empty default date?', true) ? null : new Date(2019, 11, 20),
      suggestedDates: boolean('Date input suggested dates', false) ? dateInputSuggestedDates : null,
      hintMessage: text('Hint Message', ''),
      isDisabled: boolean('isDisabled', false),
      isInvalid: boolean('isInvalid', false),
    };
  } else {
    const showLabels = select(
      'Which labels visible?',
      ['group', 'individual', 'both'],
      'individual',
    );
    dateRangeProps = {
      ...dateRangeProps,
      groupConfig: {
        hintMessage: text('Hint message for group', ''),
        groupLabel: text('Group label', 'Dates of travel'),
        isGroupLabelHidden: showLabels === 'individual',
        isDisabled: boolean('Group disabled?', false),
        isInvalid: boolean('Group invalid?', false),
        validationMessage: text('Validation message for group', ''),
      },
      startDateInputConfig: {
        ...dateRangeProps.startDateInputConfig,
        hintMessage: text('Hint Message for first date', ''),
        inputLabel: text('First label', 'Departure'),
        isLabelHidden: showLabels === 'group',
        selectedDateValue: boolean('Empty default first date?', true)
          ? null
          : new Date(2019, 11, 20),
        isDisabled: boolean('First date disabled?', false),
        isInvalid: boolean('First date invalid?', false),
        validationMessage: text('Validation message for first', ''),
      },
      endDateInputConfig: {
        ...dateRangeProps.endDateInputConfig,
        hintMessage: text('Hint Message for second date', ''),
        inputLabel: text('Second label', 'Return'),
        isLabelHidden: showLabels === 'group',
        selectedDateValue: boolean('Empty default second date?', true) ? null : new Date(),
        isDisabled: boolean('Second date disabled?', false),
        isInvalid: boolean('Second date invalid?', false),
        validationMessage: text('Validation message for second', ''),
      },
    };
  }

  return isDateRangeDemo ? (
    <XUIDateRangeInput {...dateRangeProps} />
  ) : (
    <XUIDateInput {...singleDateProps} />
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
      <XUIDateRangeInput {...variationMinusStoryDetails} />
    ) : (
      <XUIDateInput {...variationMinusStoryDetails} />
    );

    return isInFixedContainer ? (
      <div style={{ maxWidth: '250px', overflow: 'hidden' }}>{component}</div>
    ) : (
      component
    );
  });
});
