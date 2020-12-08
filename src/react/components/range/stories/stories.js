// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, text, number, select } from '@storybook/addon-knobs';

// Components we need to test with
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIRange from '../XUIRange';

import { storiesWithVariationsKindName, variations } from './variations';
import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.add('Playground', () => {
  const showLeftElement = boolean('Show left element', true);
  const showRightElement = boolean('Show right element', true);

  return (
    <XUIRange
      isDisabled={boolean('isDisabled', false)}
      isInvalid={boolean('isInvalid', false)}
      label={text('label', 'Label for the select box')}
      leftElement={
        showLeftElement && (
          <XUIAvatar
            className="xui-margin-small"
            imageUrl="https://i.picsum.photos/id/1033/100/100.jpg?hmac=tomT-dDv5vivqHh5P2NCXMYcsD8G3D4-hAqxbdQ7O2c"
            value="left"
          />
        )
      }
      max={number('max', 100)}
      min={number('min', 0)}
      rightElement={
        showRightElement && (
          <XUIAvatar
            className="xui-margin-small"
            imageUrl="https://i.picsum.photos/id/1044/100/100.jpg?hmac=IGzsuFyCgR4u_DgqnNlOHxY-ThKh9C02XhZAqHyVy0Q"
            value="right"
          />
        )
      }
      size={select('size', ['medium', 'small', 'xsmall'], 'medium')}
      step={number('step', 0)}
      validationMessage={text('validationMessage', 'validation text')}
    />
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = {
      ...variation,
    };

    return <XUIRange {...variationMinusStoryDetails} label={variation.storyTitle} />;
  });
});
