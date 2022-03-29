import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, text, number, select } from '@storybook/addon-knobs';

import XUIButton from '../XUIButton';
import XUIButtonGroup from '../XUIButtonGroup';
import XUIDropdown from '../../dropdown/XUIDropdown';
import XUIDropdownToggled from '../../dropdown/XUIDropdownToggled';
import XUIIconButton from '../XUIIconButton';
import XUIPickitem from '../../picklist/XUIPickitem';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUISecondaryButton from '../XUISecondaryButton';
import XUISplitButtonGroup from '../XUISplitButtonGroup';

import { flattenedIconList, flattenedIconMap } from '../../helpers/icons';
import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';
import addVariations from './util';

import {
  textButtonVariants,
  sizeClassNames,
  buttonTypes,
  widthClassNames,
  standardVariantClassNames,
} from '../private/constants';
import {
  colorClasses as iconColorClasses,
  rotationClasses as iconRotationClasses,
  wrapperSizeClasses as iconWrapperSizeClasses,
} from '../../icon/private/constants';

import {
  buttonStoriesWithKnobsKindName,
  buttonStoriesWithVariationsKindName,
  iconButtonStoriesWithKnobsKindName,
  iconButtonStoriesWithVariationsKindName,
  buttonGroupStoriesWithKnobsKindName,
  buttonGroupStoriesWithVariationsKindName,
  splitButtonGroupStoriesWithKnobsKindName,
  splitButtonGroupStoriesWithVariationsKindName,
  buttonVariations,
  iconButtonVariations,
  buttonGroupVariations,
  splitButtonGroupVariations,
} from './variations';

const buttonWrapperStyles = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '600px',
};

// Playgrounds
const buttonStoriesWithKnobs = storiesOf(buttonStoriesWithKnobsKindName, module);
buttonStoriesWithKnobs.addDecorator(centered);
buttonStoriesWithKnobs.add('Playground', () => {
  const iconList = ['', ...flattenedIconList];
  const buttonContent = text('Button content', 'Cancel');
  return (
    <div style={buttonWrapperStyles}>
      <XUIButton
        className={text('className', '')}
        fullWidth={select('fullWidth', Object.keys(widthClassNames), 'never')}
        hasCaret={boolean('hasCaret', false)}
        hasMinLoaderWidth={boolean('hasMinLoaderWidth', false)}
        href={text('href', '')}
        isDisabled={boolean('isDisabled', false)}
        isExternalLink={boolean('isExternalLink', false)}
        isGrouped={boolean('isGrouped', false)}
        isInverted={boolean('isInverted', false)}
        isLink={boolean('isLink', false)}
        isLoading={boolean('isLoading', false)}
        leftIcon={flattenedIconMap[select('leftIcon', iconList)]}
        loadingAriaLabel={text('loadingAriaLabel', 'Loading')}
        qaHook={text('qaHook', '')}
        rel={text('rel', '')}
        retainLayout={boolean('retainLayout', true)}
        rightIcon={flattenedIconMap[select('rightIcon', iconList)]}
        size={select('size', ['', ...Object.keys(sizeClassNames)])}
        tabIndex={number('tabIndex', 0)}
        target={text('target', '')}
        title={text('title', '')}
        type={select(
          'type',
          Object.keys(buttonTypes).map(type => buttonTypes[type]),
          'button',
        )}
        variant={select('variant', Object.keys(textButtonVariants), 'standard')}
      >
        {buttonContent}
      </XUIButton>
    </div>
  );
});

const iconButtonStoriesWithKnobs = storiesOf(iconButtonStoriesWithKnobsKindName, module);
iconButtonStoriesWithKnobs.addDecorator(centered);
iconButtonStoriesWithKnobs.add('Playground', () => (
  <div style={buttonWrapperStyles}>
    <XUIIconButton
      ariaLabel={text('ariaLabel', 'Close')}
      className={text('className', '')}
      description={text('description', '')}
      href={text('href', '')}
      icon={flattenedIconMap[select('icon', flattenedIconList, 'cross')]}
      iconColor={select('iconColor', ['', ...Object.keys(iconColorClasses)])}
      iconSize={select('iconSize', ['', ...Object.keys(iconWrapperSizeClasses)])}
      isDisabled={boolean('isDisabled', false)}
      isExternalLink={boolean('isExternalLink', false)}
      isInverted={boolean('isInverted', false)}
      isLink={boolean('isLink', false)}
      qaHook={text('qaHook', '')}
      rel={text('rel', '')}
      role={text('role', '')}
      rotation={select('rotation', ['', ...Object.keys(iconRotationClasses)], '')}
      size={select('size', ['', ...Object.keys(sizeClassNames)])}
      tabIndex={number('tabIndex', 0)}
      target={text('target', '')}
      title={text('title', '')}
      type={select(
        'type',
        Object.keys(buttonTypes).map(type => buttonTypes[type]),
        'button',
      )}
    />
  </div>
));

const buttonGroupStoriesWithKnobs = storiesOf(buttonGroupStoriesWithKnobsKindName, module);
buttonGroupStoriesWithKnobs.addDecorator(centered);
buttonGroupStoriesWithKnobs.add('Playground', () => (
  <div style={buttonWrapperStyles}>
    <XUIButtonGroup
      className={text('className', '')}
      qaHook={text('qaHook', '')}
      size={select('size', ['', ...Object.keys(sizeClassNames)])}
    >
      <XUIButton>Edit</XUIButton>
      <XUIButton>Save</XUIButton>
      <XUIButton>Submit</XUIButton>
    </XUIButtonGroup>
  </div>
));

const splitButtonGroupStoriesWithKnobs = storiesOf(
  splitButtonGroupStoriesWithKnobsKindName,
  module,
);
splitButtonGroupStoriesWithKnobs.addDecorator(centered);
splitButtonGroupStoriesWithKnobs.add('Playground', () => {
  const variant = select('variant', Object.keys(standardVariantClassNames), 'main');
  const isDisabled = boolean('isDisabled', false);

  return (
    <div style={buttonWrapperStyles}>
      <XUISplitButtonGroup
        className={text('className', '')}
        isDisabled={isDisabled}
        qaHook={text('qaHook', '')}
        size={select('size', ['', ...Object.keys(sizeClassNames)])}
        variant={variant}
      >
        <XUIButton>Save</XUIButton>
        <XUIDropdownToggled
          dropdown={
            <XUIDropdown hasFixedWidth size="small">
              <XUIPicklist>
                <XUIPickitem id="saveAndSend" key="saveAndSend" value="saveAndSend">
                  Save and send
                </XUIPickitem>
                <XUIPickitem id="saveAndPrint" key="saveAndPrint" value="saveAndPrint">
                  Save and print
                </XUIPickitem>
              </XUIPicklist>
            </XUIDropdown>
          }
          trigger={
            <XUISecondaryButton
              aria-label="Other actions"
              isDisabled={isDisabled}
              key="split"
              variant={variant}
            />
          }
        />
      </XUISplitButtonGroup>
    </div>
  );
});

// Variations
const buttonStoriesWithVariations = storiesOf(buttonStoriesWithVariationsKindName, module);
buttonStoriesWithVariations.addDecorator(centered);
addVariations(buttonVariations, buttonStoriesWithVariations);

const iconButtonStoriesWithVariations = storiesOf(iconButtonStoriesWithVariationsKindName, module);
iconButtonStoriesWithVariations.addDecorator(centered);
addVariations(iconButtonVariations, iconButtonStoriesWithVariations);

const buttonGroupStoriesWithVariations = storiesOf(
  buttonGroupStoriesWithVariationsKindName,
  module,
);
buttonGroupStoriesWithVariations.addDecorator(centered);
addVariations(buttonGroupVariations, buttonGroupStoriesWithVariations);

const splitButtonGroupStoriesWithVariations = storiesOf(
  splitButtonGroupStoriesWithVariationsKindName,
  module,
);
splitButtonGroupStoriesWithVariations.addDecorator(centered);
addVariations(splitButtonGroupVariations, splitButtonGroupStoriesWithVariations);
