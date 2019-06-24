// Libs
import React from 'react';

// Components we need to test with
import XUIToggle from '../XUIToggle';
import XUIToggleOption from '../XUIToggleOption';
import { colorMap } from '../private/constants';
import NOOP from '../../helpers/noop';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import centered from '../../../../../.storybook/xuiResponsiveCenter';

import ExampleContainer from '../../../docs/ExampleContainer';

import { storiesWithVariationsKindName, variations } from './variations';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
const toggleOptions = [
  {
    isChecked: true,
    name: 'tg1',
    value: 'toggle1',
  },
  {
    isDisabled: true,
    name: 'tg1',
    value: 'toggle2',
  },
  {
    name: 'tg1',
    value: 'toggle3',
  },
];
storiesWithKnobs.add('Playground', () => (
  <div style={{ width: '500px' }}>
    <XUIToggle
      color={select('color', Object.keys(colorMap), 'standard')}
      layout={boolean('full-width?', false) ? 'fullwidth' : undefined}
      size={boolean('small?', false) ? 'small' : undefined}
      label={text('label', 'Toggle label')}
      isLabelHidden={boolean('isLabelHidden', false)}
      isFieldLayout={boolean('isFieldLayout', true)}
      isInvalid={boolean('isInvalid', false)}
      validationMessage={text('validationMessage', '')}
      hintMessage={text('hintMessage', '')}
    >
      {buildOptions(toggleOptions)}
    </XUIToggle>
  </div>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    const { options } = variationMinusStoryDetails;
    delete variationMinusStoryDetails.options;
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;
    const attrs = {
      isInverted: variationMinusStoryDetails.color === 'inverted',
      style: { maxWidth: '500px' },
    };
    return (
      <ExampleContainer {...attrs}>
        <XUIToggle {...variationMinusStoryDetails}>{buildOptions(options)}</XUIToggle>
      </ExampleContainer>
    );
  });
});

const buildOptions = options =>
  options.map((option, index) => {
    option.onChange = NOOP;
    return (
      <XUIToggleOption key={index} {...option}>
        {option.value}
      </XUIToggleOption>
    );
  });
