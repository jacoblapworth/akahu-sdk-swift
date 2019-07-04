// Libs
import React from 'react';

// Components we need to test with
import XUIButton from '../XUIButton';
import XUIButtonCaret from '../XUIButtonCaret';
import XUIButtonGroup from '../XUIButtonGroup';
import XUISplitButton from '../XUISecondaryButton';
import XUISplitButtonGroup from '../XUISplitButtonGroup';
import XUIIcon from '../../icon/XUIIcon';
import DropDown from '../../dropdown/DropDown';
import DropDownToggled from '../../dropdown/DropDownToggled';
import view from '@xero/xui-icon/icons/view';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, number, select } from '@storybook/addon-knobs';
import centered from '../../../../../.storybook/xuiResponsiveCenter';

import { storiesWithVariationsKindName, variations } from './variations';
import {
  variantClassNames,
  sizeClassNames,
  buttonTypes,
  widthClassNames,
} from '../private/constants';

const dropdownWithTrigger = (
  <DropDownToggled
    trigger={<XUISplitButton key="split" variant="primary" aria-label="Other actions" />}
    dropdown={
      <DropDown>
        <p className="xui-padding-small">hello</p>
      </DropDown>
    }
  />
);

const buttonContents = {
  withCaret: ['Caret button', <XUIButtonCaret key="caret" />],
  asGroup: [<XUIButton key="one">One</XUIButton>, <XUIButton key="two">Two</XUIButton>],
  asMultiGroup: [
    <XUIButton key="one">Some significantly longer content in the first button</XUIButton>,
    <XUIButton key="two">Additional very long content in a second button</XUIButton>,
  ],
  asSplitGroup: [
    <XUIButton key="main">Main</XUIButton>,
    <XUISplitButton key="split" aria-label="Other actions" />,
  ],
  asSplitGroupMulti: [
    <XUIButton key="main">
      This is a bunch of multi line text to make sure the icon displays correctly
    </XUIButton>,
    <XUISplitButton key="split" aria-label="Other actions" />,
  ],
  asSplitGroupDropdown: [<XUIButton key="main">Main</XUIButton>, dropdownWithTrigger],
  icon: <XUIIcon icon={view} title="Preview" />,
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
  <div style={{ maxWidth: '600px' }}>
    <XUIButton
      className={text('className', '')}
      qaHook={text('qaHook', '')}
      isDisabled={boolean('isDisabled', false)}
      isExternalLink={boolean('isExternalLink', false)}
      isLoading={boolean('isLoading', false)}
      isGrouped={boolean('isGrouped', false)}
      variant={select('variant', Object.keys(variantClassNames), 'standard')}
      size={select('size', Object.keys(sizeClassNames))}
      fullWidth={select('fullWidth', Object.keys(widthClassNames), 'never')}
      isLink={boolean('isLink', false)}
      type={select('type', Object.keys(buttonTypes).map(type => buttonTypes[type]), 'button')}
      href={text('href', '')}
      rel={text('rel', '')}
      tabIndex={number('tabIndex', 0)}
      target={text('target', '')}
      title={text('title', '')}
      isInverted={boolean('isInverted', false)}
      retainLayout={boolean('retainLayout', true)}
      minLoaderWidth={boolean('minLoaderWidth', false)}
    >
      Test button
    </XUIButton>
  </div>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    const value =
      variationMinusStoryDetails.value || buttonContents[variationMinusStoryDetails.contentsKey];
    const componentType = variationMinusStoryDetails.componentType;
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;
    delete variationMinusStoryDetails.componentType;
    delete variationMinusStoryDetails.contentsKey;
    variationMinusStoryDetails.value = undefined;

    const width =
      !variationMinusStoryDetails.fullWidth || variationMinusStoryDetails.fullWidth === 'never'
        ? 'auto'
        : '';
    const ButtonWrapper = ({ children }) => (
      <div style={{ maxWidth: '600px', width }}>{children}</div>
    );

    let buttonContent = <XUIButton {...variationMinusStoryDetails}>{value}</XUIButton>;

    if (componentType === 'XUIButtonGroup') {
      buttonContent = <XUIButtonGroup {...variationMinusStoryDetails}>{value}</XUIButtonGroup>;
    }
    if (componentType === 'XUISplitButtonGroup') {
      buttonContent = (
        <div style={{ maxWidth: '150px' }}>
          <XUISplitButtonGroup {...variationMinusStoryDetails}>{value}</XUISplitButtonGroup>
        </div>
      );
    }
    return <ButtonWrapper>{buttonContent}</ButtonWrapper>;
  });
});
