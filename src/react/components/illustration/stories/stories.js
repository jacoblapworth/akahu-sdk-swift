import { object, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';
import { sizeClasses } from '../private/constants';
import XUIIllustration from '../XUIIllustration';
import { storiesWithKnobsKindName, storiesWithVariationsKindName, variations } from './variations';

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.add('Playground', () => {
  const alt = text('alt', 'Child drops ice cream from cone while walking');
  const height = text('height');
  const padding = text('padding');
  const size = select('size', ['', ...Object.keys(sizeClasses)], '');
  const src = text(
    'src',
    'https://edge.xero.com/illustration/child-spilling-ice-cream-01/child-spilling-ice-cream-01.svg',
  );
  const style = object('style');

  return (
    <div style={{ maxWidth: '600px' }}>
      <XUIIllustration
        alt={alt}
        height={height}
        padding={padding}
        size={size}
        src={src}
        style={style}
      />
    </div>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;

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
