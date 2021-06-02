// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, number, text, select, object } from '@storybook/addon-knobs';

// Components we need to test with
import XUIStepper from '../XUIStepper';

import {
  variations,
  storiesWithVariationsKindName,
  baseProps,
  storiesWithKnobsKindName,
} from './variations';
import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

const wrapperStyles = {
  background: 'white',
  padding: '50px',
};

const contentStyles = {
  padding: '20px 20px 200px',
  width: '100%',
};

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.add('Playground', () => {
  const layout = select('lockLayout', ['default', 'stacked', 'sidebar', 'inline']);
  return (
    <div style={wrapperStyles}>
      <XUIStepper
        currentStep={number('currentStep', 0)}
        hasStackedButtons={boolean('hasStackedButtons', false)}
        id={text('id', `myStepperId_${layout}`)}
        isTruncated={boolean('isTruncated', true)}
        lockLayout={layout}
        qaHook={text('qaHook', 'myStepperQaHook')}
        tabs={object('tabs', baseProps.tabs)}
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
