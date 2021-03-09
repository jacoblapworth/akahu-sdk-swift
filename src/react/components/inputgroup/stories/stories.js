// Libs
import React, { createRef } from 'react';

// Components we need to test with
import { storiesOf } from '@storybook/react';
import { boolean, select, text, number } from '@storybook/addon-knobs';
import facebookPath from '@xero/xui-icon/icons/social-facebook';
import XUITextInput, { XUITextInputSideElement } from '../../../textinput';
import XUIIcon from '../../../icon';
import XUIInputGroup from '../XUIInputGroup';
import XUIButton, { XUIButtonGroup } from '../../../button';
import defaultBreakpoints from '../../helpers/breakpoints';
import XUIDateInputWIP from '../../../dateinput';

// Story book things
import customCentered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { variations, storiesWithVariationsKindName } from './variations';
import { dateInputConvenienceDates } from '../../dateinput/stories/helpers/convenienceDates';

const singleDateProps = {
  inputLabel: 'Single date Date',
  closeOnSelect: true,
  isLabelHidden: true,
  isFieldLayout: false,
  selectedDateValue: new Date(2019, 11, 20),
  onSelectDate: () => {},
  convenienceDates: dateInputConvenienceDates,
};

const baseElements = {
  XUITextInput: props => (
    <XUITextInput
      isLabelHidden
      placeholder="XUITextInput"
      {...props}
      leftElement={props.hasSideElements && sideElement}
      rightElement={props.hasSideElements && sideElement}
    />
  ),
  XUIButton: ({ isLabelHidden, ...props }) => <XUIButton {...props} />,
  XUIButtonGroup: ({ isLabelHidden, ...props }) => (
    <XUIButtonGroup>
      <XUIButton key="a">Action 1</XUIButton>
      <XUIButton key="b">Action 2</XUIButton>
      <XUIButton key="c">Action 3</XUIButton>
    </XUIButtonGroup>
  ),
  XUIDateInput: props => <XUIDateInputWIP {...singleDateProps} {...props} />,
};

const storiesWithResponsiveAndKnobs = storiesOf(storiesWithVariationsKindName, module).addDecorator(
  customCentered,
);

storiesWithResponsiveAndKnobs.add('InputGroup Playground', () => {
  const type = select('input type', [...Object.keys(baseElements), 'randomise'], 'randomise');
  const inputsCount = number('input count', 3);
  const showSeparateLabels = boolean('individual labels', false);
  const validity = boolean('invalid', undefined);
  return (
    <XUIInputGroup
      columnWidths={text('grid column widths (space-separated)', '')}
      hintMessage={text('hintMessage', '')}
      isInvalid={validity}
      isLabelHidden={boolean('isLabelHidden', false)}
      label={text('label', 'Full name')}
      qaHook={text('qaHook', '')}
      swapAtBreakpoint={
        select('swapAtBreakpoint', [...Object.keys(defaultBreakpoints), ''], 'medium') || undefined
      }
      validationMessage={(validity && text('validationMessage', '')) || undefined}
    >
      {Array.from(Array(inputsCount).keys()).map((item, index) =>
        baseElements[
          type === 'randomise'
            ? Object.keys(baseElements)[
                Math.floor(Math.random() * (Object.keys(baseElements).length - 3))
              ]
            : type
        ]({
          label: type,
          children: type,
          key: index,
          isLabelHidden: !showSeparateLabels,
          isInvalid: validity,
        }),
      )}
    </XUIInputGroup>
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
      itemProps,
      groupProps,
      ...variationMinusStoryDetails
    } = props;
    return (
      <div style={{ madWidth: '98vw' }}>
        <XUIInputGroup label={storyTitle} {...groupProps}>
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
        </XUIInputGroup>
      </div>
    );
  });
});

const sideElement = (
  <XUITextInputSideElement backgroundColor="facebook" type="icon">
    <XUIIcon icon={facebookPath} isBoxed />
  </XUITextInputSideElement>
);
