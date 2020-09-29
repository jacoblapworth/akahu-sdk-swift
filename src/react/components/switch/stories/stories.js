// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import NOOP from '../../helpers/noop';

// Components we need to test with
import XUISwitchGroup from '../XUISwitchGroup';
import XUISwitch from '../XUISwitch';

import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.add('Playground', () => (
  <XUISwitch
    hintMessage={text('hintMessage', '')}
    isDisabled={boolean('isDisabled', false)}
    isInvalid={boolean('isInvalid', false)}
    isLabelHidden={boolean('isLabelHidden', false)}
    isReversed={boolean('isReversed', false)}
    validationMessage={text('validationMessage', '')}
  >
    {text('label text', 'Sample switch label')}
  </XUISwitch>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    const { isGroup, groupProps } = variation;
    variationMinusStoryDetails.storyKind = undefined;
    variationMinusStoryDetails.storyTitle = undefined;
    variationMinusStoryDetails.onChange = NOOP;
    if (isGroup) {
      return (
        <div style={{ maxWidth: '600px' }}>
          <XUISwitchGroup {...groupProps}>
            <XUISwitch isDefaultChecked isReversed onChange={NOOP}>
              One option you might try
            </XUISwitch>
            <XUISwitch isDisabled isReversed onChange={NOOP}>
              Another that is not an option
            </XUISwitch>
            <XUISwitch isReversed onChange={NOOP}>
              Third option
            </XUISwitch>
            <XUISwitch isChecked isReversed onChange={NOOP}>
              Yet another switch option, but this one is a good deal longer and may potetially wrap
              to a new line
            </XUISwitch>
          </XUISwitchGroup>
        </div>
      );
    }

    return (
      <XUISwitch {...variationMinusStoryDetails}>
        {variationMinusStoryDetails.labelText || `Sample switch label`}
      </XUISwitch>
    );
  });
});
