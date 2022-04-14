// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { dateKnob } from '../../../../../.storybook/helpers';

// Components we need to test with
import XUIDateInput from '../XUIDateInput';
import XUIDateRangeInput from '../XUIDateRangeInput';

import { flattenedIconList, flattenedIconMap } from '../../helpers/icons';
import { dateInputSuggestedDates, dateRangeInputSuggestedDates } from './helpers/suggestedDates';

import {
  dateInputStoriesWithKnobsKindName,
  dateInputStoriesWithVariationsKindName,
  dateInputVariations,
  dateRangeInputStoriesWithKnobsKindName,
  dateRangeInputStoriesWithVariationsKindName,
  dateRangeInputVariations,
} from './variations';

const inputSizes = ['xsmall', 'small', 'medium'];

const dateInputStoriesWithKnobs = storiesOf(dateInputStoriesWithKnobsKindName, module);
dateInputStoriesWithKnobs.add('Playground', () => {
  const storybookProps = {
    suggestedDates: boolean('Has suggested dates', false) ? dateInputSuggestedDates : null,
  };

  const reactProps = {
    closeOnSelect: boolean('closeOnSelect', undefined),
    displayedMonth: dateKnob('displayedMonth', new Date(2022, 1, 1)),
    hintMessage: text('hintMessage', ''),
    inputLabel: text('inputLabel', 'Issue date'),
    isDisabled: boolean('isDisabled', false),
    isDueDate: boolean('isDueDate', undefined),
    isInvalid: boolean('isInvalid', false),
    locale: text('locale', 'en-NZ'),
    maxDate: dateKnob('maxDate', new Date(2099, 11, 31)),
    minDate: dateKnob('minDate', new Date(0)),
    nextButtonAriaLabel: text('nextButtonAriaLabel', 'Next month'),
    prevButtonAriaLabel: text('prevButtonAriaLabel', 'Previous month'),
    selectDateIcon: flattenedIconMap[select('selectDateIcon', flattenedIconList, 'date-start')],
    selectDateLabel: text('selectDateLabel', 'Select date'),
    selectedDateDefaultValue: dateKnob('selectedDateDefaultValue', new Date(2022, 1, 2)),
    selectedDateValue: dateKnob('selectedDateValue', new Date(2022, 1, 2)),
    size: select('size', inputSizes, 'medium'),
    validationMessage: text('validationMessage', 'Issue date cannot be in the past'),
  };

  const dateInputProps = {
    ...storybookProps,
    ...reactProps,
  };

  const PlaygroundDateInput = props => {
    const [selectedDate, setSelectedDate] = React.useState();

    const onSelectDate = newDate => {
      setSelectedDate(newDate);
    };

    return <XUIDateInput {...props} onSelectDate={onSelectDate} selectedDateValue={selectedDate} />;
  };

  return <PlaygroundDateInput {...dateInputProps} />;
});

const dateRangeInputStoriesWithKnobs = storiesOf(dateRangeInputStoriesWithKnobsKindName, module);
dateRangeInputStoriesWithKnobs.add('Playground', () => {
  const dateInputReactPropsGroupId = 'Props';
  const groupConfigReactPropsGroupId = 'groupConfig';
  const startDateReactPropsGroupId = 'startDateInputConfig';
  const endDateReactPropsGroupId = 'endDateInputConfig';

  const storybookProps = {
    suggestedDates: boolean('Has suggested dates', false, dateInputReactPropsGroupId)
      ? dateRangeInputSuggestedDates
      : null,
  };

  const dateInputReactProps = {
    closeOnSelect: boolean('closeOnSelect', undefined, dateInputReactPropsGroupId),
    locale: text('locale', 'en-NZ', dateInputReactPropsGroupId),
    nextButtonAriaLabel: text('nextButtonAriaLabel', 'Next month', dateInputReactPropsGroupId),
    prevButtonAriaLabel: text('prevButtonAriaLabel', 'Previous month', dateInputReactPropsGroupId),
    size: select('size', inputSizes, 'medium', dateInputReactPropsGroupId),
  };

  const groupConfigReactProps = {
    groupLabel: text('groupLabel', 'Project dates', groupConfigReactPropsGroupId),
    hintMessage: text('hintMessage', '', groupConfigReactPropsGroupId),
    isDisabled: boolean('isDisabled', false, groupConfigReactPropsGroupId),
    isGroupLabelHidden: boolean('isGroupLabelHidden', true, groupConfigReactPropsGroupId),
    isInvalid: boolean('isInvalid', false, groupConfigReactPropsGroupId),
    validationMessage: text(
      'validationMessage',
      'Project must have a valid start and end date',
      groupConfigReactPropsGroupId,
    ),
  };

  const startDateReactProps = {
    displayedMonth: dateKnob('displayedMonth', new Date(2022, 1, 1), startDateReactPropsGroupId),
    hintMessage: text('hintMessage', '', startDateReactPropsGroupId),
    inputLabel: text('inputLabel', 'Start date', startDateReactPropsGroupId),
    isDisabled: boolean('isDisabled', false, startDateReactPropsGroupId),
    isDueDate: boolean('isDueDate', false, startDateReactPropsGroupId),
    isInvalid: boolean('isInvalid', false, startDateReactPropsGroupId),
    isLabelHidden: boolean('isLabelHidden', false, startDateReactPropsGroupId),
    maxDate: dateKnob('maxDate', new Date(2099, 11, 31), startDateReactPropsGroupId),
    minDate: dateKnob('minDate', new Date(0), startDateReactPropsGroupId),
    selectedDateDefaultValue: dateKnob(
      'selectedDateValue',
      new Date(2022, 1, 2),
      startDateReactPropsGroupId,
    ),
    selectedDateValue: dateKnob(
      'selectedDateValue',
      new Date(2022, 1, 2),
      startDateReactPropsGroupId,
    ),
    validationMessage: text(
      'validationMessage',
      'Please enter a valid date',
      startDateReactPropsGroupId,
    ),
  };

  const endDateReactProps = {
    displayedMonth: dateKnob('displayedMonth', new Date(2022, 1, 1), endDateReactPropsGroupId),
    hintMessage: text('hintMessage', '', endDateReactPropsGroupId),
    inputLabel: text('inputLabel', 'End date', endDateReactPropsGroupId),
    isDisabled: boolean('isDisabled', false, endDateReactPropsGroupId),
    isDueDate: boolean('isDueDate', false, endDateReactPropsGroupId),
    isInvalid: boolean('isInvalid', false, endDateReactPropsGroupId),
    isLabelHidden: boolean('isLabelHidden', false, endDateReactPropsGroupId),
    maxDate: dateKnob('maxDate', new Date(2099, 11, 31), endDateReactPropsGroupId),
    minDate: dateKnob('minDate', new Date(0), endDateReactPropsGroupId),
    selectedDateDefaultValue: dateKnob(
      'selectedDateValue',
      new Date(2022, 1, 9),
      endDateReactPropsGroupId,
    ),
    selectedDateValue: dateKnob(
      'selectedDateValue',
      new Date(2022, 1, 9),
      endDateReactPropsGroupId,
    ),
    validationMessage: text(
      'validationMessage',
      'Please enter a valid date',
      endDateReactPropsGroupId,
    ),
  };

  const dateRangeInputProps = {
    ...storybookProps,
    ...dateInputReactProps,
    groupConfig: groupConfigReactProps,
    startDateInputConfig: startDateReactProps,
    endDateInputConfig: endDateReactProps,
  };

  const PlaygroundDateRangeInput = props => {
    const [selectedEndDate, setSelectedEndDate] = React.useState();
    const [selectedStartDate, setSelectedStartDate] = React.useState();

    const onSelectEndDate = newDate => {
      setSelectedEndDate(newDate);
    };

    const onSelectStartDate = newDate => {
      setSelectedStartDate(newDate);
    };

    return (
      <XUIDateRangeInput
        {...props}
        endDateInputConfig={{
          ...props.endDateInputConfig,
          onSelectDate: onSelectEndDate,
          selectedDateValue: selectedEndDate,
        }}
        startDateInputConfig={{
          ...props.startDateInputConfig,
          onSelectDate: onSelectStartDate,
          selectedDateValue: selectedStartDate,
        }}
      />
    );
  };

  return <PlaygroundDateRangeInput {...dateRangeInputProps} />;
});

const dateInputStoriesWithVariations = storiesOf(dateInputStoriesWithVariationsKindName, module);
dateInputVariations.forEach(variation => {
  dateInputStoriesWithVariations.add(variation.storyTitle, () => {
    const { isDropdownHidden } = variation;
    const variationMinusStoryDetails = { ...variation };

    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;

    return (
      <XUIDateInput
        _isDropdownHidden={isDropdownHidden}
        inputLabel="Start date"
        locale="en-NZ"
        nextButtonAriaLabel="Next month"
        prevButtonAriaLabel="Previous month"
        {...variationMinusStoryDetails}
      />
    );
  });
});

const dateRangeInputStoriesWithVariations = storiesOf(
  dateRangeInputStoriesWithVariationsKindName,
  module,
);
dateRangeInputVariations.forEach(variation => {
  dateRangeInputStoriesWithVariations.add(variation.storyTitle, () => {
    const { isDropdownHidden, isInFixedContainer } = variation;
    const variationMinusStoryDetails = { ...variation };

    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;

    const component = (
      <XUIDateRangeInput
        _isSuggestedDatesDropdownHidden={isDropdownHidden}
        endDateInputConfig={{
          inputLabel: 'End date',
        }}
        locale="en-NZ"
        nextButtonAriaLabel="Next month"
        prevButtonAriaLabel="Previous month"
        startDateInputConfig={{
          inputLabel: 'Start date',
        }}
        {...variationMinusStoryDetails}
      />
    );

    return isInFixedContainer ? (
      <div style={{ maxWidth: '250px', overflow: 'hidden' }}>{component}</div>
    ) : (
      component
    );
  });
});
