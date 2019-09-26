// Libs
import React from 'react';

// Components we need to test with
import SelectBox from '../SelectBox';
import SelectBoxOption from '../SelectBoxOption';
import XUIIcon from '../../icon/XUIIcon';
import education from '@xero/xui-icon/icons/education';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import centered from '../../../../../.storybook/xuiResponsiveCenter';

import { variantClassNames } from '../../button/private/constants';
import { storiesWithVariationsKindName, variations } from './variations';
import { LongListLongItems, AddIdPropsToTextList } from '../../helpers/list';

function createItems(settings) {
  const { items, size, suffix } = settings;
  if (Array.isArray(items)) {
    return items.map(i => createItems({ items: i, size }));
  }
  items.props.id += suffix || '';
  return (
    <SelectBoxOption {...items.props} key={items.props.id} size={size} value={items.props.id}>
      {items.text}
    </SelectBoxOption>
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
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
  const size = select('size', ['medium', 'small', 'xsmall']);
  const listItemSize = select('list item size', [null, 'medium', 'small', 'xsmall']);
  const fullWidth = select('fullWidth', ['always', 'small-down', 'never']);
  return (
    <SelectBox
      buttonClasses={text('buttonClasses', '')}
      buttonContent={
        <span className="xui-u-flex">
          <XUIIcon className="xui-margin-right-xsmall" icon={education} />
          {text('placeholder text', 'Choose a classic book')}
        </span>
      }
      buttonVariant={
        select('buttonVariant', ['none', ...Object.keys(variantClassNames)], 'none') === 'none'
          ? undefined
          : select('buttonVariant', ['none', ...Object.keys(variantClassNames)], 'none')
      }
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
      {createItems({ items: toggledItems, size: listItemSize })}
    </SelectBox>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

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
    const listItemSize = variationMinusStoryDetails.listItemSize;
    delete variationMinusStoryDetails.listItemSize;
    delete variationMinusStoryDetails.items;
    delete variationMinusStoryDetails.storyKind;
    delete variationMinusStoryDetails.storyTitle;
    const display = variationMinusStoryDetails.fullWidth === 'never' ? 'flex' : '';

    return (
      <div style={{ maxWidth: '600px', display }}>
        <SelectBox
          {...variationMinusStoryDetails}
          containerClasses={`xui-margin-horizontal-auto ${variation.containerClasses}`}
          label={variation.storyTitle}
        >
          {createItems({ items, size: listItemSize })}
        </SelectBox>
      </div>
    );
  });
});
