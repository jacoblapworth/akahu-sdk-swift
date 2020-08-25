// Libs
import React from 'react';

// Components we need to test with
import XUIRolloverCheckbox from '../rolloverCheckbox';
import XUIAvatar from '../../avatar/XUIAvatar';
// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.add('Playground', () => {
  const sizedAvatar = (
    <XUIAvatar
      size={select(
        'size of the rollover target',
        ['xlarge', 'large', 'medium', 'small', 'xsmall', '2xsmall'],
        'medium',
      )}
      value="abc"
    />
  );
  return (
    <XUIRolloverCheckbox
      checkboxSize={select('size of the checkbox', ['medium', 'small', 'xsmall'], 'medium')}
      isCheckboxHidden={boolean('checkbox hidden', true)}
      isDisabled={boolean('disabled', false)}
      label="Rollover checkbox"
      rolloverComponent={sizedAvatar}
    />
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    variationMinusStoryDetails.storyKind = undefined;
    variationMinusStoryDetails.storyTitle = undefined;
    variationMinusStoryDetails.label = 'Rollover checkbox';

    if (variationMinusStoryDetails.altRollover === 'big') {
      delete variationMinusStoryDetails.altRollover;
      variationMinusStoryDetails.rolloverComponent = (
        <div style={{ width: '40px', height: '70px', backgroundColor: 'blue' }} />
      );
    } else if (variationMinusStoryDetails.altRollover === 'small') {
      delete variationMinusStoryDetails.altRollover;
      variationMinusStoryDetails.rolloverComponent = <XUIAvatar size="2xsmall" value="abc" />;
    } else {
      variationMinusStoryDetails.rolloverComponent = <XUIAvatar value="abc" />;
    }

    return <XUIRolloverCheckbox {...variationMinusStoryDetails} />;
  });
});
