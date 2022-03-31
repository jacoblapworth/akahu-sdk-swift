import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import ExampleContainer from '../../../docs/ExampleContainer';
import { sizeClassNames } from '../private/constants';
import XUILoader from '../XUILoader';
import { storiesWithKnobsKindName, storiesWithVariationsKindName, variations } from './variations';

const sizes = Object.keys(sizeClassNames);

const getContainerStyle = isRequired =>
  isRequired ? { position: 'relative', height: '40px', width: '100px' } : {};

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.addParameters({ layout: 'centered' });
storiesWithKnobs.add('Playground', () => {
  const isAnimated = boolean('Is animated', true) ? null : 'xui-loader-static';

  const ariaLabel = text('ariaLabel', 'Loading');
  const hasDefaultLayout = boolean('hasDefaultLayout', true);
  const isInverted = boolean('isInverted', false);
  const retainLayout = boolean('retainLayout', false);
  const size = select('size', sizes, sizes[2]);

  const attrs = {
    className: 'xui-background-white',
    isInverted,
    style: getContainerStyle(!hasDefaultLayout),
  };

  return (
    <ExampleContainer {...attrs}>
      <XUILoader
        ariaLabel={ariaLabel}
        className={isAnimated}
        hasDefaultLayout={hasDefaultLayout}
        isInverted={isInverted}
        retainLayout={retainLayout}
        size={size}
      />
    </ExampleContainer>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;

    const hasContainerStyle =
      variationMinusStoryDetails.retainLayout ||
      variationMinusStoryDetails.hasDefaultLayout === false;

    const attrs = {
      isInverted: variationMinusStoryDetails.isInverted,
      style: getContainerStyle(hasContainerStyle),
      className: 'xui-background-white',
    };

    let example;
    if (variationMinusStoryDetails.sizes) {
      const sizes = variationMinusStoryDetails.sizes;
      delete variationMinusStoryDetails.sizes;
      example = (
        <div>
          {sizes.map(size => (
            <XUILoader
              key={size}
              size={size}
              {...variationMinusStoryDetails}
              ariaLabel="Loading"
              className="xui-loader-static"
            />
          ))}
        </div>
      );
    } else {
      example = (
        <XUILoader
          {...variationMinusStoryDetails}
          ariaLabel="Loading"
          className="xui-loader-static"
        />
      );
    }
    return <ExampleContainer {...attrs}>{example}</ExampleContainer>;
  });
});
