// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';

// Components we need to test with
import education from '@xero/xui-icon/icons/education';
import XUISelectBox from '../XUISelectBox';
import XUISelectBoxOption from '../XUISelectBoxOption';
import XUIIcon from '../../icon/XUIIcon';

import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

import { textButtonVariants } from '../../button/private/constants';
import { storiesWithVariationsKindName, variations } from './variations';
import { LongListLongItems, AddIdPropsToTextList } from '../../helpers/list';

function createItems(settings) {
  const { items, suffix } = settings;
  if (Array.isArray(items)) {
    return items.map(i => createItems({ items: i }));
  }
  items.props.id += suffix || '';
  return (
    <XUISelectBoxOption {...items.props} key={items.props.id} value={items.props.id}>
      {items.text}
    </XUISelectBoxOption>
  );
}

const toggledItems = AddIdPropsToTextList(LongListLongItems);

const button = (
  <span className="xui-u-flex">
    <XUIIcon className="xui-margin-right-xsmall" icon={education} />
    Choose a classic book
  </span>
);

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.add('Playground', () => {
  const size = select('size', ['medium', 'small', 'xsmall']);
  const fullWidth = select('fullWidth', ['always', 'small-down', 'never']);
  return (
    <XUISelectBox
      buttonClasses={text('buttonClasses', '')}
      buttonContent={
        <span className="xui-u-flex">
          <XUIIcon className="xui-margin-right-xsmall" icon={education} />
          {text('placeholder text', 'Choose a classic book')}
        </span>
      }
      buttonVariant={
        select('buttonVariant', ['none', ...Object.keys(textButtonVariants)], 'none') === 'none'
          ? undefined
          : select('buttonVariant', ['none', ...Object.keys(textButtonVariants)], 'none')
      }
      caretTitle={text('caretTitle', 'Toggle list')}
      containerClasses={text('containerClasses', '')}
      defaultLayout={boolean('defaultLayout', true)}
      dropDownClasses={text('dropDownClasses', '')}
      forceDesktop={boolean('forceDesktop', true)}
      fullWidth={fullWidth}
      hintMessage={text('hintMessage', '')}
      inputGroupClasses={text('inputGroupClasses', '')}
      isDisabled={boolean('isDisabled', false)}
      isInvalid={boolean('isInvalid', false)}
      isLabelHidden={boolean('isLabelHidden', false)}
      isTextTruncated={boolean('isTextTruncated', false)}
      label={text('label', 'Label for the select box')}
      matchTriggerWidth={boolean('matchTriggerWidth', true)}
      size={size}
      validationMessage={text('validationMessage', '')}
    >
      {createItems({ items: toggledItems })}
    </XUISelectBox>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = {
      isOpen: true,
      buttonContent: button,
      ...variation,
    };
    const items = variationMinusStoryDetails.items || toggledItems;
    if (variationMinusStoryDetails.isTextTruncated) {
      items.forEach(i => (i.props.truncatedText = true));
    }
    delete variationMinusStoryDetails.items;
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;
    const display = variationMinusStoryDetails.fullWidth === 'never' ? 'flex' : '';

    return (
      <div style={{ maxWidth: '600px', display }}>
        <XUISelectBox
          {...variationMinusStoryDetails}
          caretTitle="Toggle list"
          containerClasses={`xui-margin-horizontal-auto ${variation.containerClasses}`}
          label={variation.storyTitle}
        >
          {createItems({ items })}
        </XUISelectBox>
      </div>
    );
  });
});
