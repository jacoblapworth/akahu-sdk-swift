// Libs
import React from 'react';

// Components we need to test with
import XUIButton from '../XUIButton';
import XUIButtonGroup from '../XUIButtonGroup';
import XUISplitButton from '../XUISecondaryButton';
import XUISplitButtonGroup from '../XUISplitButtonGroup';
import XUIIconButton from '../XUIIconButton';
import XUIDropDown from '../../dropdown/XUIDropDown';
import XUIDropDownToggled from '../../dropdown/XUIDropDownToggled';
import view from '@xero/xui-icon/icons/view';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, number, select } from '@storybook/addon-knobs';
import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { storiesWithVariationsKindName, variations } from './variations';
import {
  textButtonVariants,
  sizeClassNames,
  buttonTypes,
  widthClassNames,
} from '../private/constants';

const dropdownWithTrigger = (
  <XUIDropDownToggled
    dropdown={
      <XUIDropDown>
        <p className="xui-padding-small">hello</p>
      </XUIDropDown>
    }
    trigger={<XUISplitButton aria-label="Other actions" key="split" variant="primary" />}
  />
);

const buttonContents = {
  withCaret: ['Caret button'],
  withIcon: ['Icon in a button'],
  asGroup: [<XUIButton key="one">One</XUIButton>, <XUIButton key="two">Two</XUIButton>],
  asMultiGroup: [
    <XUIButton key="one">Some significantly longer content in the first button</XUIButton>,
    <XUIButton key="two">Additional very long content in a second button</XUIButton>,
  ],
  asSplitGroup: [
    <XUIButton key="main">Main</XUIButton>,
    <XUISplitButton aria-label="Other actions" key="split" />,
  ],
  asSplitGroupMulti: [
    <XUIButton key="main">
      This is a bunch of multi line text to make sure the icon displays correctly
    </XUIButton>,
    <XUISplitButton aria-label="Other actions" key="split" />,
  ],
  asSplitGroupDropdown: [<XUIButton key="main">Main</XUIButton>, dropdownWithTrigger],
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
  const hasLeftIcon = boolean('leftIcon', false);
  const hasRightIcon = boolean('rightIcon', false);
  const isIcon = boolean('is icon button', false);
  const Tag = isIcon ? XUIIconButton : XUIButton;
  return (
    <div style={{ maxWidth: '600px' }}>
      <Tag
        aria-label={isIcon ? 'View' : undefined}
        className={text('className', '')}
        fullWidth={select('fullWidth', Object.keys(widthClassNames), 'never')}
        hasCaret={boolean('hasCaret', false)}
        href={text('href', '')}
        icon={isIcon ? view : undefined}
        isDisabled={boolean('isDisabled', false)}
        isExternalLink={boolean('isExternalLink', false)}
        isGrouped={boolean('isGrouped', false)}
        isInverted={boolean('isInverted', false)}
        isLink={boolean('isLink', false)}
        isLoading={boolean('isLoading', false)}
        leftIcon={hasLeftIcon ? view : null}
        loadingAriaLabel={text('loadingAriaLabel', 'Loading')}
        minLoaderWidth={boolean('minLoaderWidth', false)}
        qaHook={text('qaHook', '')}
        rel={text('rel', '')}
        retainLayout={boolean('retainLayout', true)}
        rightIcon={hasRightIcon ? view : null}
        size={select('size', Object.keys(sizeClassNames))}
        tabIndex={number('tabIndex', 0)}
        target={text('target', '')}
        title={text('title', '')}
        type={select(
          'type',
          Object.keys(buttonTypes).map(type => buttonTypes[type]),
          'button',
        )}
        variant={!isIcon && select('variant', textButtonVariants, 'standard')}
      >
        {isIcon ? null : 'Test button'}
      </Tag>
    </div>
  );
});

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

    let buttonContent;

    switch (componentType) {
      case 'XUIButtonGroup':
        buttonContent = <XUIButtonGroup {...variationMinusStoryDetails}>{value}</XUIButtonGroup>;
        break;
      case 'XUISplitButtonGroup':
        buttonContent = (
          <div style={{ maxWidth: '150px' }}>
            <XUISplitButtonGroup {...variationMinusStoryDetails}>{value}</XUISplitButtonGroup>
          </div>
        );
        break;
      case 'XUIIconButton':
        buttonContent = (
          <XUIIconButton icon={view} {...variationMinusStoryDetails} ariaLabel="View" />
        );
        break;
      default:
        buttonContent = <XUIButton {...variationMinusStoryDetails}>{value}</XUIButton>;
    }
    return <ButtonWrapper>{buttonContent}</ButtonWrapper>;
  });
});
