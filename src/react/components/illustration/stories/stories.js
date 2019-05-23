// Libs
import React from 'react';

// Components we need to test with
import XUIIllustration from '../XUIIllustration';
import { sizeClasses } from '../private/constants';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
  const size = select('Size', Object.keys(sizeClasses), 'medium');
  const height = text('Height');
  const padding = text('Padding');
  const src = text(
    'Illustration URL',
    'https://edge.xero-uat.com/illustration/scene/concierge-envelope-01/concierge-envelope-01.svg',
  );
  const alt = text('Alternative text');
  const className = text('Classes');

  return (
    <div style={{ width: '600px' }}>
      <XUIIllustration
        alt={alt}
        className={className}
        height={height}
        padding={padding}
        size={size}
        src={src}
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

    return (
      <div className="capture" style={{ width: '600px' }}>
        <XUIIllustration
          src="https://edge.xero-uat.com/illustration/scene/concierge-envelope-01/concierge-envelope-01.svg"
          {...variationMinusStoryDetails}
        />
      </div>
    );
  });
});
