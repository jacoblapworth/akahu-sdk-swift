// Libs
import React from 'react';

// Components we need to test with
import XUIStepper from '../XUIStepper';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text, select, object } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { variations, storiesWithVariationsKindName, baseProps } from './variations';

const wrapperStyles = {
  background: 'white',
  padding: '50px',
};

const contentStyles = {
  padding: '20px 20px 200px',
  width: '100%',
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);

storiesWithKnobs.add('Playground', () => {
  const layout = select('lockLayout', ['default', 'stacked', 'sidebar', 'inline']);
  return (
    <div style={wrapperStyles}>
      <XUIStepper
        id={text('id', `myStepperId_${layout}`)}
        qaHook={text('qaHook', 'myStepperQaHook')}
        currentStep={number('currentStep', 0)}
        hasStackedButtons={boolean('hasStackedButtons', false)}
        lockLayout={layout}
        tabs={object('tabs', baseProps.tabs)}
        isTruncated={boolean('isTruncated', true)}
      >
        <h3 style={contentStyles}>Content Area</h3>
      </XUIStepper>
    </div>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  const { storyTitle, storyKind, ...props } = variation;
  const width = props.lockLayout === 'stacked' ? '400px' : 'auto';
  const Comparison = (
    <div style={{ ...wrapperStyles, width }}>
      <XUIStepper {...props}>
        <h3 style={contentStyles}>Content Area</h3>
      </XUIStepper>
    </div>
  );

  storiesWithVariations.add(storyTitle, () => Comparison);
});
