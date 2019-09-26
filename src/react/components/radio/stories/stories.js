// Libs
import React from 'react';

// Components we need to test with
import XUIRadio from '../XUIRadio';
import XUIRadioGroup from '../XUIRadioGroup';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { storiesWithVariationsKindName, variations } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
  <XUIRadio
    hintMessage={text('hintMessage', '')}
    isChecked={boolean('isChecked', false)}
    isDisabled={boolean('isDisabled', false)}
    isInvalid={boolean('invalid', false)}
    isLabelHidden={boolean('isLabelHidden', false)}
    isReversed={boolean('isReversed', false)}
    size={select('size', ['medium', 'small', 'xsmall'], 'medium')}
    validationMessage={text('validationMessage', '')}
  >
    {text('label text', 'Test radio')}
  </XUIRadio>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const { isGroup, isSeries, groupProps } = variation;
    const label = typeof variation.labelText === 'string' ? variation.labelText : 'Test radio';

    // Remove story-specific properties
    const radioProps = {
      ...variation,
      storyKind: undefined,
      storyTitle: undefined,
      isGroup: undefined,
      label: undefined,
    };

    if (isGroup) {
      return (
        <XUIRadioGroup {...groupProps}>
          <XUIRadio isDefaultChecked key="r0-1" name="rg0">
            Medium radio label goes here
          </XUIRadio>
          <XUIRadio key="r0-2" name="rg0">
            Longish radio label goes here, but this one really goes on and on and on and on
          </XUIRadio>
          <XUIRadio key="r0-3" name="rg0">
            <span>Third</span>
          </XUIRadio>
        </XUIRadioGroup>
      );
    }
    if (isSeries) {
      return (
        <div aria-label="r1" role="radiogroup">
          <XUIRadio key="r1-1" name="rg1">
            Medium radio label goes here
          </XUIRadio>
          <XUIRadio isDefaultChecked key="r1-2" name="rg1">
            Longish radio label goes here, but this one really goes on and on and on and on
          </XUIRadio>
          <XUIRadio key="r1-3" name="rg1">
            Third
          </XUIRadio>
        </div>
      );
    }
    return <XUIRadio {...radioProps}>{label}</XUIRadio>;
  });
});
