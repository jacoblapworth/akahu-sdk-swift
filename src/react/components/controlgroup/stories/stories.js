// Libs
import React from 'react';

// Components we need to test with
import { storiesOf } from '@storybook/react';
import { boolean, select, text, number } from '@storybook/addon-knobs';
import facebookPath from '@xero/xui-icon/icons/social-facebook';
import XUITextInput, { XUITextInputSideElement } from '../../../textinput';
import XUIIcon from '../../../icon';
import XUIControlGroup from '../XUIControlGroup';
import XUIButton, { XUIButtonGroup } from '../../../button';
import defaultBreakpoints from '../../helpers/breakpoints';
import DetailedListExample from '../../autocompleter/stories/components/DetailedListExample';
import LayoutSelect from '../../../stories/form-controls/form-layout1/select-box';
import { splitButtonExample } from '../../actions/stories/stories';
import XUIRadio from '../../../radio';
import XUICheckbox from '../../../checkbox';
import XUISwitch from '../../../switch';
import XUIDateInput from '../../../dateinput';

// Story book things
import customCentered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { variations, storiesWithVariationsKindName, storiesWithKnobsKindName } from './variations';
import { dateInputSuggestedDates } from '../../dateinput/stories/helpers/suggestedDates';

const singleDateProps = {
  inputLabel: 'Single date Date',
  closeOnSelect: true,
  isLabelHidden: true,
  isFieldLayout: false,
  selectedDateValue: new Date(2019, 11, 20),
  onSelectDate: () => {},
  suggestedDates: dateInputSuggestedDates,
  locale: 'en-nz',
  nextButtonAriaLabel: 'next',
  prevButtonAriaLabel: 'previous',
};

const baseElements = {
  XUITextInput: props => {
    const { hasSideElements, textInputSideLabel, ...spreadProps } = props;
    return (
      <XUITextInput
        isLabelHidden
        placeholder="XUITextInput"
        {...spreadProps}
        leftElement={(hasSideElements && sideElement) || (textInputSideLabel && sideElementLabel)}
        rightElement={hasSideElements && sideElement}
      />
    );
  },
  htmlInput: () => (
    <input className="xui-textinput xui-textinput--input" placeholder="HTML input" type="text" />
  ),
  htmlSelect: () => (
    <div className="xui-select">
      <select aria-label="Select format" className="xui-select--control">
        <option>PDF</option>
        <option>CSV</option>
        <option selected>HTML select</option>
      </select>
      <svg
        className="xui-icon xui-select--caret"
        focusable="false"
        height="6"
        role="presentation"
        viewBox="0 0 10 6"
        width="10"
      >
        <path d="M0 0l5 5 5-5z" />
      </svg>
    </div>
  ),
  XUIAutoCompleter: props => (
    <DetailedListExample
      inputLabel={props.label}
      isInputLabelHidden={props.isLabelHidden}
      placeholder="XUIAutoCompleter"
      selectedPeople={1}
      {...props}
    />
  ),
  XUISelectBox: props => (
    <LayoutSelect isLabelHidden title="XUISelectBox" {...props}>
      {['', 'ANZ', 'ASB', 'Kiwi Bank', 'Westpac']}
    </LayoutSelect>
  ),
  XUIButton: ({ isLabelHidden, ...props }) => <XUIButton {...props} />,
  XUISplitButton: props => splitButtonExample(true, props),
  XUIButtonGroup: ({ isLabelHidden, ...props }) => (
    <XUIButtonGroup>
      <XUIButton isDisabled={props.isDisabled} key="a">
        Action 1
      </XUIButton>
      <XUIButton isDisabled={props.isDisabled} key="b">
        Action 2
      </XUIButton>
      <XUIButton isDisabled={props.isDisabled} key="c">
        Action 3
      </XUIButton>
    </XUIButtonGroup>
  ),
  XUIDateInput: props => {
    const { label, ...spreadProps } = props;
    const className =
      ((props.hintMessage || props.validationMessage) && 'xui-field-layout') || undefined;
    return <XUIDateInput className={className} {...singleDateProps} {...spreadProps} />;
  },
  XUIRadio: props => <XUIRadio {...props} isLabelHidden={false} />,
  XUICheckbox: props => <XUICheckbox {...props} isLabelHidden={false} />,
  XUISwitch: props => <XUISwitch {...props} isLabelHidden={false} />,
};

const storiesWithResponsiveAndKnobs = storiesOf(storiesWithKnobsKindName, module).addDecorator(
  customCentered,
);

storiesWithResponsiveAndKnobs.add('ControlGroup Playground', () => {
  const type = select('input type', [...Object.keys(baseElements), 'randomise'], 'randomise');
  const inputsCount = number('input count', 3);
  const showSeparateLabels = boolean('individual labels', false);
  const showSeparateValidation = boolean('individual validation', false);
  const validity = boolean('invalid (group-level)', undefined);
  const disabled = boolean('disabled (group-level)', undefined);
  const randomiseState = boolean('randomise interactive states?', undefined);
  const textInputSideLabel = boolean('TextInput sideElement label?', undefined);
  return (
    <XUIControlGroup
      columnWidths={text('grid column widths (space-separated)', '')}
      hintMessage={text('hintMessage (group-level)', '')}
      isFieldLayout={boolean('isFieldLayout (group-level)', true)}
      isInvalid={validity}
      isLabelHidden={boolean('isLabelHidden (group-level)', false)}
      label={text('label (group-level)', 'Full name')}
      qaHook={text('qaHook', '')}
      swapAtBreakpoint={
        select('swapAtBreakpoint', [...Object.keys(defaultBreakpoints), ''], 'medium') || undefined
      }
      validationMessage={(validity && text('validationMessage (group-level)', '')) || ''}
    >
      {Array.from(Array(inputsCount).keys()).map((item, index) => {
        const isOneInvalid =
          randomiseState || showSeparateValidation
            ? !!Math.floor(Math.random() * 2) || validity
            : validity;
        const isOneDisabled = randomiseState
          ? !!Math.floor(Math.random() * 2) || disabled
          : disabled;
        const isOneHint = Math.floor(Math.random() * 3);
        const elementType =
          type === 'randomise'
            ? Object.keys(baseElements)[
                Math.floor(Math.random() * (Object.keys(baseElements).length - 3))
              ]
            : type;
        const isMultiline = elementType === 'XUITextInput' && !!Math.floor(Math.random() * 2);
        return baseElements[elementType]({
          children: elementType,
          isFieldLayout: !!isOneHint && elementType !== 'XUIDateInput',
          isMultiline: isMultiline || undefined,
          rows: (isMultiline && Math.floor(Math.random() * 2) + 2) || undefined,
          hintMessage:
            (isOneHint === 2 && 'Short hint here') ||
            (isOneHint && 'Longer hint message that could wrap lines goes in this spot here') ||
            undefined,
          isDisabled: isOneDisabled,
          isInvalid: isOneInvalid,
          isLabelHidden: !showSeparateLabels,
          key: `item_${index}`,
          label: textInputSideLabel
            ? undefined
            : (Math.floor(Math.random() * 2) && `${elementType}`) ||
              `${elementType} label that is much longer and could potentially break across multiple lines`,
          textInputSideLabel,
          validationMessage:
            (isOneHint === 2 && 'Short validation message') ||
            (isOneHint &&
              'This is a much longer validation message that could potentially break across multiple lines') ||
            undefined,
        });
      })}
    </XUIControlGroup>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module).addDecorator(
  customCentered,
);
variations.forEach(variation => {
  const { storyTitle, storyKind, ...props } = variation;

  storiesWithVariations.add(storyTitle, () => {
    const {
      viewports,
      childContent,
      type = 'XUITextInput',
      wrapperStyle = {},
      itemProps,
      groupProps,
      ...variationMinusStoryDetails
    } = props;
    return (
      <div style={wrapperStyle}>
        <XUIControlGroup label={storyTitle} {...groupProps}>
          {baseElements[type]({
            label: 'First',
            children: 'First',
            ...(itemProps && itemProps[0]),
          })}
          {baseElements[type]({
            label: 'Middle',
            children: 'Middle',
            ...(itemProps && itemProps[1]),
          })}
          {baseElements[type]({
            label: 'Last',
            children: 'Last',
            ...(itemProps && itemProps[2]),
          })}
        </XUIControlGroup>
      </div>
    );
  });
});

const sideElement = (
  <XUITextInputSideElement backgroundColor="facebook" type="icon">
    <XUIIcon icon={facebookPath} isBoxed />
  </XUITextInputSideElement>
);
const sideElementLabel = <XUITextInputSideElement type="text">SideLabel:</XUITextInputSideElement>;
