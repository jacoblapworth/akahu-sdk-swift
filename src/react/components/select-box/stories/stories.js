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
import centered from '@storybook/addon-centered';

import { variantClassNames } from '../../button/private/constants';
import { storiesWithVariationsKindName, variations } from './variations';
import { LongListLongItems, AddIdPropsToTextList } from '../../helpers/list';

function createItems(settings) {
	const { items, size, suffix } = settings;
	if (Array.isArray(items)) {
		return items.map(i => createItems({ items: i, size }));
	}
	items.props.id += (suffix || '');
	return (
		<SelectBoxOption
			{...items.props}
			value={items.props.id}
			key={items.props.id}
			size={size}
		>
			{items.text}
		</SelectBoxOption>
	);
}

const toggledItems = AddIdPropsToTextList(LongListLongItems);

const button = <span className="xui-u-flex"><XUIIcon icon={education} className="xui-margin-right-xsmall" />Choose a classic book</span>;

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
	const size = select('size', ['standard', 'small', 'xsmall', 'full-width', 'full-width-mobile'], "full-width");
	const listItemSize = select('list item size', [null, 'standard', 'small', 'xsmall']);
	return (
		<SelectBox
			label={text('label', 'Label for the select box')}
			isLabelHidden={boolean('isLabelHidden', false)}
			buttonClasses={text('buttonClasses', '')}
			containerClasses={text('containerClasses', '')}
			dropDownClasses={text('dropDownClasses', '')}
			inputGroupClasses={text('inputGroupClasses', '')}
			buttonVariant={select('buttonVariant', ['none', ...Object.keys(variantClassNames)], 'none') === 'none' ?
				undefined :
				select('buttonVariant', ['none', ...Object.keys(variantClassNames)], 'none')}
			isTextTruncated={boolean('isTextTruncated', false)}
			matchTriggerWidth={boolean('matchTriggerWidth', true)}
			forceDesktop={boolean('forceDesktop', true)}
			defaultLayout={boolean('defaultLayout', true)}
			isDisabled={boolean('isDisabled', false)}
			isInvalid={boolean('isInvalid', false)}
			validationMessage={text('validationMessage', '')}
			hintMessage={text('hintMessage', '')}
			buttonContent={
				<span className="xui-u-flex">
					<XUIIcon icon={education} className="xui-margin-right-xsmall" />
					{text('placeholder text', 'Choose a classic book')}
				</span>
			}
			size={size}
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
			items.forEach(i => i.props.truncatedText = true);
		}
		const listItemSize = variationMinusStoryDetails.listItemSize;
		delete variationMinusStoryDetails.listItemSize;
		delete variationMinusStoryDetails.items;
		delete variationMinusStoryDetails.storyKind;
		delete variationMinusStoryDetails.storyTitle;

		return (
			<SelectBox
				{...variationMinusStoryDetails}
				label={variation.storyTitle}
			>
				{createItems({ items, size: listItemSize })}
			</SelectBox>
		);
	});
});
