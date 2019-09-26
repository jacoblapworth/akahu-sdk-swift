// Libs
import React from 'react';

// Components we need to test with
import XUIRange from '../XUIRange';
import XUIAvatar from '../../avatar/XUIAvatar';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, number, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { storiesWithVariationsKindName, variations } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);

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
            imageUrl="https://xui.xero.com/static/xpert-avatar.png"
          />
        )
      }
      max={number('max', 100)}
      min={number('min', 0)}
      rightElement={
        showRightElement && (
          <XUIAvatar
            className="xui-margin-small"
            imageUrl="https://xui.xero.com/static/xpert-avatar.png"
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
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = {
      ...variation,
    };

    return <XUIRange {...variationMinusStoryDetails} label={variation.storyTitle} />;
  });
});
