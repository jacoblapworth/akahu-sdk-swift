// Libs
import React from 'react';

// Components we need to test with
import XUISwitch from '../XUISwitch';
import XUISwitchGroup from '../XUISwitchGroup';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import NOOP from '../../helpers/noop';

import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
  <XUISwitch
    isDisabled={boolean('isDisabled', false)}
    isLabelHidden={boolean('isLabelHidden', false)}
    isReversed={boolean('isReversed', false)}
    isInvalid={boolean('isInvalid', false)}
    validationMessage={text('validationMessage', '')}
    hintMessage={text('hintMessage', '')}
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
            <XUISwitch onChange={NOOP} isReversed isDefaultChecked>
              One option you might try
            </XUISwitch>
            <XUISwitch onChange={NOOP} isReversed isDisabled>
              Another that is not an option
            </XUISwitch>
            <XUISwitch onChange={NOOP} isReversed>
              Third option
            </XUISwitch>
            <XUISwitch onChange={NOOP} isReversed isChecked>
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
