import { boolean, object, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { flattenedIconList, flattenedIconMap } from '../../helpers/icons';
import XUICheckbox from '../XUICheckbox';
import XUICheckboxGroup from '../XUICheckboxGroup';
import XUICheckboxRangeSelector from '../XUICheckboxRangeSelector';
import { addVariations } from './util';
import {
  checkboxGroupStoriesWithKnobsKindName,
  checkboxGroupStoriesWithVariationsKindName,
  checkboxGroupVarations,
  checkboxRangeSelectorStoriesWithKnobsKindName,
  checkboxStoriesWithKnobsKindName,
  checkboxStoriesWithVariationsKindName,
  checkboxVariations,
} from './variations';

// Playgrounds
const checkboxStoriesWithKnobs = storiesOf(checkboxStoriesWithKnobsKindName, module);
checkboxStoriesWithKnobs.addParameters({ layout: 'centered' });
checkboxStoriesWithKnobs.add('Playground', () => {
  const isChecked = boolean('isChecked', false);
  const size = select('size', ['', 'medium', 'small', 'xsmall'], '');
  return (
    <XUICheckbox
      hintMessage={text('hintMessage', '')}
      iconMain={flattenedIconMap[select('iconMain', ['', ...flattenedIconList])]}
      inputProps={object('inputProps', {})}
      isChecked={isChecked || undefined}
      isDisabled={boolean('isDisabled', false)}
      isInvalid={boolean('isInvalid', false)}
      isLabelHidden={boolean('isLabelHidden', false)}
      isReversed={boolean('isReversed', false)}
      size={size === '' ? undefined : size}
      validationMessage={text('validationMessage', 'Cannot retrieve project name')}
    >
      {text('Checkbox content', 'Use project name')}
    </XUICheckbox>
  );
});

const checkboxGroupStoriesWithKnobs = storiesOf(checkboxGroupStoriesWithKnobsKindName, module);
checkboxGroupStoriesWithKnobs.addParameters({ layout: 'centered' });
checkboxGroupStoriesWithKnobs.add('Playground', () => (
  <XUICheckboxGroup
    hintMessage={text('hintMessage', 'Select which items should be included on the quote')}
    isInvalid={boolean('isInvalid', false)}
    isLabelHidden={boolean('isLabelHidden', false)}
    label={text('label', 'Confirm items to quote')}
    validationMessage={text('validationMessage', 'Select 1 or more items')}
  >
    <XUICheckbox>Tasks</XUICheckbox>
    <XUICheckbox>Annual Financial Statements Preparation</XUICheckbox>
    <XUICheckbox isDisabled>Tax Return Preparation</XUICheckbox>
  </XUICheckboxGroup>
));

const checkboxRangeSelectorStoriesWithKnobs = storiesOf(
  checkboxRangeSelectorStoriesWithKnobsKindName,
  module,
);
checkboxRangeSelectorStoriesWithKnobs.addParameters({ layout: 'centered' });
checkboxRangeSelectorStoriesWithKnobs.add('Playground', () => {
  const [selectedItems, setSelectedItems] = React.useState([false, false, false]);

  const toggleCheckbox = index => {
    setSelectedItems(previousState => {
      const newSelectedItems = [...previousState];
      newSelectedItems[index] = !selectedItems[index];
      return newSelectedItems;
    });
  };

  const toggleAll = () => {
    const newCheckedState = !selectedItems.every(item => item);

    setSelectedItems([newCheckedState, newCheckedState, newCheckedState]);
  };

  return (
    <XUICheckboxRangeSelector>
      <XUICheckboxGroup>
        <XUICheckbox
          excludeFromRangeSelection
          isChecked={selectedItems.every(item => item)}
          isIndeterminate={
            !selectedItems.every(item => item) && selectedItems.filter(item => item).length > 0
          }
          onChange={toggleAll}
        >
          All
        </XUICheckbox>
        <XUICheckbox isChecked={selectedItems[0]} onChange={() => toggleCheckbox(0)}>
          Invoice number
        </XUICheckbox>
        <XUICheckbox isChecked={selectedItems[1]} onChange={() => toggleCheckbox(1)}>
          Reference
        </XUICheckbox>
        <XUICheckbox isChecked={selectedItems[2]} onChange={() => toggleCheckbox(2)}>
          Due date
        </XUICheckbox>
      </XUICheckboxGroup>
    </XUICheckboxRangeSelector>
  );
});

// Variations
const checkboxStoriesWithVariations = storiesOf(checkboxStoriesWithVariationsKindName, module);
addVariations(checkboxVariations, checkboxStoriesWithVariations);

const checkboxGroupStoriesWithVariations = storiesOf(
  checkboxGroupStoriesWithVariationsKindName,
  module,
);
addVariations(checkboxGroupVarations, checkboxGroupStoriesWithVariations);
