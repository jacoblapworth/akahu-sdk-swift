// Libs
import React from 'react';

// Components we need to test with
import XUIIllustration from '../XUIIllustration';
import { sizeClasses } from '../private/constants';

// Story book things
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { variations, storiesWithVariationsKindName } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.add('Playground', () => {
  const size = select('Size', Object.keys(sizeClasses), 'medium');
  const height = text('Height');
  const padding = text('Padding');
  const src = text(
    'Illustration URL',
    'https://edge.xero.com/illustration/scene/concierges-envelope-01/concierges-envelope-01.svg',
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
      <div style={{ maxWidth: '600px' }}>
        <XUIIllustration
          src="https://edge.xero.com/illustration/scene/concierges-envelope-01/concierges-envelope-01.svg"
          {...variationMinusStoryDetails}
        />
      </div>
    );
  });
});
