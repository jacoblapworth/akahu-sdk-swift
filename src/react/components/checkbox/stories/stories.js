// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';

// Components we need to test with
import XUICheckboxGroup from '../XUICheckboxGroup';
import XUICheckbox from '../XUICheckbox';

import { variations, storiesWithVariationsKindName, storiesWithKnobsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.addParameters({ layout: 'centered' });
storiesWithKnobs.add('Playground', () => (
  <XUICheckbox
    hintMessage={text('hintMessage', '')}
    isDisabled={boolean('isDisabled', false)}
    isIndeterminate={boolean('isIndeterminate', false)}
    isInvalid={boolean('isInvalid', false)}
    isLabelHidden={boolean('isLabelHidden', false)}
    isReversed={boolean('isReversed', false)}
    size={select('size', ['medium', 'small', 'xsmall'], 'medium')}
    validationMessage={text('validationMessage', '')}
    value={text('value', '')}
  >
    {text('label text', 'Test checkbox')}
  </XUICheckbox>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const { isGroup, isReversed, isSeries, groupProps } = variation;
    const label = typeof variation.labelText === 'string' ? variation.labelText : 'Test radio';

    // Remove story-specific properties
    const checkboxProps = {
      ...variation,
      storyKind: undefined,
      storyTitle: undefined,
      isGroup: undefined,
      label: undefined,
    };

    if (isGroup) {
      return (
        <div style={{ maxWidth: '600px' }}>
          <XUICheckboxGroup {...groupProps}>
            <XUICheckbox isDefaultChecked isReversed={isReversed}>
              Kakapo
            </XUICheckbox>
            <XUICheckbox isReversed={isReversed}>Weka</XUICheckbox>
            <XUICheckbox isDisabled isReversed={isReversed}>
              Kea
            </XUICheckbox>
            <XUICheckbox isReversed={isReversed}>
              Yet another option, but this one is a good deal longer and may potentially wrap to a
              new line
            </XUICheckbox>
          </XUICheckboxGroup>
        </div>
      );
    }

    if (isSeries) {
      return (
        <div>
          <XUICheckbox isReversed={isReversed}>Kakapo</XUICheckbox>
          <XUICheckbox isDefaultChecked isReversed={isReversed}>
            Kea
          </XUICheckbox>
          <XUICheckbox isReversed={isReversed}>
            Yet another option, but this one is a good deal longer and may potentially wrap to a new
            line
          </XUICheckbox>
        </div>
      );
    }

    return <XUICheckbox {...checkboxProps}>{label}</XUICheckbox>;
  });
});
