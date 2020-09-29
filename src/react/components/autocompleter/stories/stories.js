// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, text, select, number } from '@storybook/addon-knobs';

// Components we need to test with
import peopleDataSet from '../private/people';
import DetailedListExample from './components/DetailedListExample';
import SecondarySearchExample from './components/SecondarySearchExample';

import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { variations, storiesWithVariationsKindName, fixedWidthDropdownSizes } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.add('Playground', () => {
  const userSelectedPerson = select(
    'Select a person',
    peopleDataSet.map(person => person.name),
    'Frida',
  );
  // People are picked from the list with a slice, now, so index + 1.
  const selectedPerson = peopleDataSet.findIndex(i => i.name === userSelectedPerson) + 1;

  const fullSize = boolean('Match dropdown width', true);
  const userSelectedSize = fullSize
    ? ''
    : select('Dropdown size', fixedWidthDropdownSizes, 'small');

  const containerWidth = `${number('Container width', 500)}px`;

  return (
    <div style={{ width: containerWidth }}>
      <DetailedListExample
        dropdownSize={userSelectedSize || undefined}
        hintMessage={text('hint msg', '')}
        isDisabled={boolean('Disabled', false)}
        isInputLabelHidden={boolean('Hide label', false)}
        isInvalid={boolean('Invalid', false)}
        openDrawer={boolean('Drawer open', false)}
        placeholder={text('Placeholder', '')}
        selectedPeople={selectedPerson}
        validationMessage={text('validation msg', '')}
      />
    </div>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    variationMinusStoryDetails.storyKind = undefined;
    variationMinusStoryDetails.storyTitle = undefined;
    variationMinusStoryDetails.storyType = undefined;

    if (variation.storyType === 'XUIAutocompleterSecondarySearch') {
      return <SecondarySearchExample />;
    }

    return (
      <div style={{ maxWidth: '500px' }}>
        <DetailedListExample {...variationMinusStoryDetails} />
      </div>
    );
  });
});
