// Libs
import React from 'react';

// Components we need to test with
import XUICapsule from '../XUICapsule';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { storiesWithVariationsKindName, variations } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
  const isInteractive = boolean('is interactive', false);
  const interactiveOnClick = () => {};
  const href = isInteractive ? text('href', 'https://www.xero.com') : null;

  return (
    <XUICapsule
      isValid={boolean('is valid', true)}
      href={href}
      onClick={isInteractive ? interactiveOnClick : null}
    >
      Capsule
    </XUICapsule>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;
    delete variationMinusStoryDetails.value;

    return <XUICapsule {...variationMinusStoryDetails}>{variation.value}</XUICapsule>;
  });
});
