// Libs
import React from 'react';

// Components we need to test with
import XUIActions from '../XUIActions';
import XUIButton from '../../button/XUIButton';
import XUIPanel from '../../panel/XUIPanel';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { storiesWithVariationsKindName, variations } from './variations';

const sampleActions = ({ isLinear, actionsCount, hasLayout }) => (
  <XUIActions
    hasLayout={hasLayout}
    isLinear={isLinear}
    primaryAction={
      <XUIButton href="https://www.xero.com" variant="primary">
        Xero
      </XUIButton>
    }
    secondaryAction={actionsCount > 1 && <XUIButton href="https://xui.xero.com">XUI</XUIButton>}
  />
);

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.add('Playground', () => {
  const isLinear = boolean('isLinear?', false);
  const hasLayout = boolean('hasLayout?', true);
  const actionsCount = select('number of actions', [1, 2], 2);
  return (
    <XUIPanel className="xui-padding">
      {sampleActions({ isLinear, actionsCount, hasLayout })}
    </XUIPanel>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const {
      storyKind,
      storyTitle,
      isLinear,
      actionsCount,
      ...variationMinusStoryDetails
    } = variation;

    return <XUIPanel className="xui-padding">{sampleActions({ isLinear, actionsCount })}</XUIPanel>;
  });
});
