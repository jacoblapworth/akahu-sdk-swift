// Libs
import React from 'react';

// Components we need to test with
import XUICheckbox from '../XUICheckbox';
import XUICheckboxGroup from '../XUICheckboxGroup';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
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
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const { isGroup, isReversed, groupProps } = variation;
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
              Yet another option, but this one is a good deal longer and may potetially wrap to a
              new line
            </XUICheckbox>
          </XUICheckboxGroup>
        </div>
      );
    }

    return <XUICheckbox {...checkboxProps}>{label}</XUICheckbox>;
  });
});
