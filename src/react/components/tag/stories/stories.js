// Libs
import React from 'react';

// Components we need to test with
import XUITag, { variants, sizes } from '../XUITag';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
  <XUITag
    size={select('size', Object.keys(sizes), 'medium')}
    variant={select('variant', Object.keys(variants), 'standard')}
  >
    {text('value', 'Plain tag')}
  </XUITag>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  const { storyTitle, storyKind, ...props } = variation;
  const isTruncated = storyTitle.endsWith('truncated');

  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    variationMinusStoryDetails.storyKind = undefined;
    variationMinusStoryDetails.storyTitle = undefined;

    return isTruncated ? (
      <div style={{ width: '100px' }}>
        <XUITag {...variationMinusStoryDetails} />
      </div>
    ) : (
      <XUITag {...variationMinusStoryDetails} />
    );
  });
});
