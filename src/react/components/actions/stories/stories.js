// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';

// Components we need to test with
import XUIActions from '../XUIActions';
import XUIButton from '../../button/XUIButton';
import XUISplitButtonGroup from '../../button/XUISplitButtonGroup';
import XUISecondaryButton from '../../button/XUISecondaryButton';
import XUIPanel from '../../panel/XUIPanel';
import XUIDropdown from '../../dropdown/XUIDropdown';
import XUIDropdownToggled from '../../dropdown/XUIDropdownToggled';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIPickitem from '../../picklist/XUIPickitem';

import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { storiesWithKnobsKindName, storiesWithVariationsKindName, variations } from './variations';

const splitButtonExample = hasDropdown => (
  <XUISplitButtonGroup variant="primary">
    <XUIButton>Split action</XUIButton>
    {hasDropdown ? (
      <XUIDropdownToggled
        dropdown={
          <XUIDropdown hasFixedWidth size="small">
            <XUIPicklist>
              <XUIPickitem id="aa" key="aa" value="aa">
                Option 1
              </XUIPickitem>
              <XUIPickitem id="bb" key="bb" value="bb">
                Option 2
              </XUIPickitem>
            </XUIPicklist>
          </XUIDropdown>
        }
        trigger={<XUISecondaryButton aria-label="Other actions" key="split" variant="primary" />}
      />
    ) : (
      <XUISecondaryButton aria-label="Other actions" key="split" variant="primary" />
    )}
  </XUISplitButtonGroup>
);

const simpleButton = (
  <XUIButton href="https://www.xero.com" variant="primary">
    Xero
  </XUIButton>
);

const sampleActions = ({ isLinear, actionsCount, hasLayout, hasSplitButton, hasDropdown }) => (
  <XUIActions
    hasLayout={hasLayout}
    isLinear={isLinear}
    primaryAction={hasSplitButton ? splitButtonExample(hasDropdown) : simpleButton}
    secondaryAction={
      (actionsCount > 1 && <XUIButton href="https://xui.xero.com">XUI</XUIButton>) || null
    }
  />
);

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
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
      hasSplitButton,
      hasDropdown,
      ...variationMinusStoryDetails
    } = variation;

    return (
      <XUIPanel className="xui-padding">
        {sampleActions({ isLinear, actionsCount, hasSplitButton, hasDropdown })}
      </XUIPanel>
    );
  });
});
