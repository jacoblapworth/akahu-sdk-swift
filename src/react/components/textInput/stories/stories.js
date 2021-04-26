// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, object, text, select, number } from '@storybook/addon-knobs';

// Components we need to test with
import clearPath from '@xero/xui-icon/icons/clear';
import facebookPath from '@xero/xui-icon/icons/social-facebook';
import XUITextInput from '../XUITextInput';
import XUITextInputSideElement from '../XUITextInputSideElement';
import XUIIcon from '../../icon/XUIIcon';
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';

import customCentered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { storiesWithVariationsKindName, variations } from './variations';
import XUIPill from '../../pill/XUIPill';
import XUIAvatar from '../../avatar/XUIAvatar';
import { sizeShift } from '../../helpers/sizes';
import {
  isKeyArrow,
  isKeyClick,
  isKeyShiftTab,
  isKeySpacebar,
} from '../../helpers/reactKeyHandler';

const inputProps = {};
const logKeyEvent = event => {
  console.log({
    key: event.key,
    keyCode: event.keyCode,
    isKeyArrow: isKeyArrow(event),
    isKeyClick: isKeyClick(event),
    isKeySpacebar: isKeySpacebar(event),
    isKeyShiftTab: isKeyShiftTab(event),
  });
};

const TextInputWrapper = props => {
  const {
    label,
    inputProps,
    isBorderlessTransparent,
    isBorderlessSolid,
    isInvalid,
    validationMessage,
    hintMessage,
    leftElementType,
    rightElementType,
    leftElementAlignment,
    rightElementAlignment,
    placeholder,
    isDisabled,
    defaultValue,
    value,
    isMultiline,
    isValueReverseAligned,
    isLabelHidden,
    minRows,
    maxRows,
    rows,
    size,
    characterCounter,
  } = props;

  const makeSideElement = (sideElementType, sideElementAlignment) => {
    const childComponentSize = sizeShift(size, -1);
    switch (sideElementType) {
      case 'icon':
        return (
          <XUITextInputSideElement alignment={sideElementAlignment} type="icon">
            <XUIIcon icon={clearPath} isBoxed />
          </XUITextInputSideElement>
        );
      case 'icon button':
        return (
          <XUITextInputSideElement alignment={sideElementAlignment} type="icon">
            <XUIIconButton ariaLabel="Clear Path" icon={clearPath} size={size} />
          </XUITextInputSideElement>
        );
      case 'iconWithBackground':
        return (
          <XUITextInputSideElement
            alignment={sideElementAlignment}
            backgroundColor="facebook"
            type="icon"
          >
            <XUIIcon icon={facebookPath} isBoxed />
          </XUITextInputSideElement>
        );
      case 'text':
        return (
          <XUITextInputSideElement alignment="center" type="text">
            Test:
          </XUITextInputSideElement>
        );
      case 'button':
        return (
          childComponentSize !== '2xsmall' && (
            <XUITextInputSideElement alignment={sideElementAlignment} type="button">
              <XUIButton size={childComponentSize} variant="primary">
                Test
              </XUIButton>
            </XUITextInputSideElement>
          )
        );
      case 'pill':
        return (
          childComponentSize !== '2xsmall' && (
            <XUITextInputSideElement alignment={sideElementAlignment} type="pill">
              <XUIPill
                avatarProps={{
                  value: 'TP',
                }}
                size={childComponentSize}
                value="Test Person"
              />
            </XUITextInputSideElement>
          )
        );
      case 'avatar':
        return (
          <XUITextInputSideElement alignment={sideElementAlignment} type="avatar">
            <XUIAvatar size={childComponentSize} value="Test Person" />
          </XUITextInputSideElement>
        );
      case 'longText':
        return (
          <XUITextInputSideElement alignment="center" type="text">
            A longer text label in this space:
          </XUITextInputSideElement>
        );
      case 'longButton':
        return (
          childComponentSize !== '2xsmall' && (
            <XUITextInputSideElement alignment={sideElementAlignment} type="button">
              <XUIButton size={childComponentSize} variant="primary">
                Elaborate explanation for an onclick action
              </XUIButton>
            </XUITextInputSideElement>
          )
        );
      default:
        return null;
    }
  };

  return (
    <XUITextInput
      {...{
        label,
        inputProps,
        isBorderlessTransparent,
        isBorderlessSolid,
        isInvalid,
        validationMessage,
        hintMessage,
        placeholder,
        isDisabled,
        value,
        isMultiline,
        isValueReverseAligned,
        isLabelHidden,
        minRows,
        maxRows,
        rows,
        size,
      }}
      characterCounter={characterCounter}
      defaultValue={defaultValue || 'default Value'}
      isDisabled={isDisabled}
      isLabelHidden={isLabelHidden}
      isMultiline={isMultiline}
      isValueReverseAligned={isValueReverseAligned}
      leftElement={makeSideElement(leftElementType, leftElementAlignment)}
      maxRows={maxRows}
      minRows={minRows}
      onKeyDown={logKeyEvent}
      placeholder={placeholder}
      rightElement={makeSideElement(rightElementType, rightElementAlignment)}
      rows={rows}
      type="text"
      value={value}
    />
  );
};

TextInputWrapper.defaultProps = {
  size: 'medium',
};

TextInputWrapper.propTypes = {
  defaultValue: PropTypes.string,
  hintMessage: PropTypes.string,
  inputProps: PropTypes.object,
  isBorderlessSolid: PropTypes.bool,
  isBorderlessTransparent: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isInvalid: PropTypes.bool,
  isLabelHidden: PropTypes.bool,
  isMultiline: PropTypes.bool,
  isValueReverseAligned: PropTypes.bool,
  label: PropTypes.node,
  leftElementAlignment: PropTypes.oneOf(['top', 'center', 'bottom']),
  leftElementType: PropTypes.oneOf([
    'icon',
    'iconWithBackground',
    'button',
    'text',
    'pill',
    'avatar',
    'icon button',
    'longText',
    'longButton',
  ]),
  maxRows: PropTypes.number,
  minRows: PropTypes.number,
  placeholder: PropTypes.string,
  rightElementAlignment: PropTypes.oneOf(['top', 'center', 'bottom']),
  rightElementType: PropTypes.oneOf([
    'icon',
    'iconWithBackground',
    'button',
    'text',
    'pill',
    'avatar',
    'icon button',
    'longText',
    'longButton',
  ]),
  rows: PropTypes.number,
  size: PropTypes.oneOf(['medium', 'small', 'xsmall']),
  validationMessage: PropTypes.string,
  value: PropTypes.string,
};

const elementTypeOptions = [null, 'icon', 'iconWithBackground', 'button', 'text', 'pill', 'avatar'];

const elementAlignmentOptions = ['top', 'center', 'bottom'];

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);

storiesWithKnobs.add('Playground', () => (
  <TextInputWrapper
    hintMessage={text('hint message', '')}
    inputProps={object('input props', inputProps)}
    isBorderlessSolid={boolean('is borderless solid', false)}
    isBorderlessTransparent={boolean('is borderless transparent', false)}
    isDisabled={boolean('is disabled', false)}
    isInvalid={boolean('is invalid', false)}
    isLabelHidden={boolean('is label hidden', false)}
    isMultiline={boolean('is multiline', false)}
    isValueReverseAligned={boolean('is input reverse aligned', false)}
    label={text('label text', 'Test label')}
    leftElementAlignment={select(
      'left side element vertical alignment',
      elementAlignmentOptions,
      'top',
    )}
    leftElementType={select('left side element type', elementTypeOptions)}
    maxRows={number('max height of multiline input in rows', 0) || undefined}
    minRows={number('min height of multiline input in rows', 0) || undefined}
    placeholder={text('placeholder', 'placeholder text')}
    rightElementAlignment={select(
      'right side element vertical alignment',
      elementAlignmentOptions,
      'top',
    )}
    rightElementType={select('right side element type', elementTypeOptions)}
    rows={number('set height of multiline input in rows', 0) || undefined}
    size={select('size', ['medium', 'small', 'xsmall'], 'medium')}
    validationMessage={text('validation message', '')}
    value={text('value')}
  />
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  const decorator = variation.customDecorator ? { decorators: [customCentered] } : {};

  storiesWithVariations.add(
    variation.storyTitle,
    () => {
      const variationMinusStoryDetails = { ...variation };
      delete variationMinusStoryDetails.storyKind;
      delete variationMinusStoryDetails.storyTitle;
      delete variationMinusStoryDetails.customDecorator;
      if (
        !variationMinusStoryDetails.label &&
        variationMinusStoryDetails.leftElementType !== 'text' &&
        variationMinusStoryDetails.rightElementType !== 'text'
      ) {
        variationMinusStoryDetails.label = 'Test label';
        variationMinusStoryDetails.isLabelHidden = true;
      }
      if (variationMinusStoryDetails.noDefault) {
        delete variationMinusStoryDetails.noDefault;
        return <XUITextInput {...variationMinusStoryDetails} type="text" />;
      }

      return <TextInputWrapper {...variationMinusStoryDetails} />;
    },
    decorator,
  );
});
