// Libs
import React from 'react';

// Components we need to test with
import XUILoader from '../XUILoader';
import { sizeClassNames } from '../private/constants';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import ExampleContainer from '../../../docs/ExampleContainer';

import { variations, storiesWithVariationsKindName } from './variations';

const sizes = Object.keys(sizeClassNames);

const getContainerStyle = isRequired =>
  isRequired ? { position: 'relative', height: '40px', width: '100px' } : {};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);

storiesWithKnobs.add('Playground', () => {
  const size = select('size', sizes, sizes[0]);

  const defaultLayout = boolean('default layout', true);
  const retainLayout = boolean('retain layout', true);
  const isStatic = boolean('static animations', false) ? 'xui-loader-static' : null;

  const attrs = {
    className: 'xui-background-white',
    isInverted: boolean('is inverted', false),
    style: getContainerStyle(!defaultLayout),
  };

  return (
    <ExampleContainer {...attrs}>
      <XUILoader
        defaultLayout={defaultLayout}
        size={size}
        isInverted={attrs.isInverted}
        retainLayout={retainLayout}
        className={isStatic}
      />
    </ExampleContainer>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;

    const hasContainerStyle =
      variationMinusStoryDetails.retainLayout || variationMinusStoryDetails.defaultLayout === false;

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
              className="xui-loader-static"
            />
          ))}
        </div>
      );
    } else {
      example = <XUILoader {...variationMinusStoryDetails} className="xui-loader-static" />;
    }
    return <ExampleContainer {...attrs}>{example}</ExampleContainer>;
  });
});
