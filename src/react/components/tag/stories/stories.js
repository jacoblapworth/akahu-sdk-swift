// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';

// Components we need to test with
import XUITag, { variants, sizes } from '../XUITag';

import { variations, storiesWithVariationsKindName, storiesWithKnobsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.add('Playground', () => (
  <XUITag
    size={select('size', Object.keys(sizes), 'medium')}
    variant={select('variant', Object.keys(variants), 'standard')}
  >
    {text('value', 'Plain tag')}
  </XUITag>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

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
