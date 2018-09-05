// Libs
import React from 'react';

// Components we need to test with
import XUIPicklist from '../Picklist';
import XUIPickitem from '../Pickitem';
import StatefulPicklist from '../StatefulPicklist';
import NestedPicklistContainer from '../NestedPicklistContainer';
import NestedPicklistTrigger from '../NestedPicklistTrigger';
import NestedPicklist from '../NestedPicklist';
import XUIIcon from '../../icon/XUIIcon';
import view from '@xero/xui-icon/icons/view';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { storiesWithVariationsKindName, variations } from './variations';

const itemLabels = [
	'Hello, I am an item',
	'Short item',
	'This item will be a bit longer and just fine!',
];

const buildItemsFromSettings = function (settings, listIndex, componentType) {
	const listItems = [];
	settings.forEach((item, itemIndex) => {
		const unique = `${listIndex}-${itemIndex}`;
		const role = componentType == 'StatefulPicklist' ? 'treeitem' : undefined;
		listItems.push(<XUIPickitem key={unique} id={unique} ariaRole={role} {...item}>
			{item.value || itemLabels[itemIndex % itemLabels.length]}
		</XUIPickitem>);
	});
	return listItems;
};

const buildLists = function (lists, componentType) {
	const builtLists = [];
	lists.forEach((list, index) => {
		const listObj = { ...list };
		const listItems = buildItemsFromSettings(listObj.items, index, componentType);
		delete listObj.items;
		const secProps = {
			role: componentType != 'StatefulPicklist' ? 'listbox' : 'tree',
		};
		if (componentType === 'NestedPicklist') {
			builtLists.push(<NestedPicklist key={index} secondaryProps={secProps} {...listObj}>{listItems}</NestedPicklist>);
		} else {
			builtLists.push(<XUIPicklist key={index} secondaryProps={secProps} {...listObj}>{listItems}</XUIPicklist>);
		}
	});
	return builtLists;
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
	<XUIPicklist
		defaultLayout={boolean('defaultLayout', true)}
		isHorizontal={boolean('isHorizontal', false)}
		secondaryProps={{ role: 'listbox' }}
	>
		<XUIPickitem
			key="1"
			id="1"
			isSelected={boolean('first item isSelected', false)}
			isDisabled={boolean('first item isDisabled', false)}
		>Item number 1
		</XUIPickitem>
		<XUIPickitem key="2" id="2">Item two is a rather long so we can see what that does</XUIPickitem>
		<XUIPickitem key="3" id="3">Item 3 is medium length</XUIPickitem>
	</XUIPicklist>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	const {
		storyTitle,
		lists,
		componentType,
		isOpen,
		markup,
		...variationMinusStoryDetails
	} = variation;

	storiesWithVariations.add(storyTitle, () => {
		if (componentType === 'markupOnly') {
			return <div className="xui-panel" style={{ width: '500px' }} dangerouslySetInnerHTML={{ __html: markup }} />;
		} else if (componentType === 'XUIIcon') {
			return (
				<div className="xui-panel" style={{ width: '500px' }}>
					<ul className="xui-picklist xui-picklist-layout" role="tree">
						<li className="xui-pickitem" role="treeitem">
							<XUIIcon icon={view} className="xui-pickitem--icon" isBoxed />
							<span className="xui-pickitem--body">
								<span className="xui-pickitem--text">Create new</span>
							</span>
						</li>
					</ul>
				</div>
			);
		}
		const listComponents = buildLists(lists, componentType);

		if (componentType === 'StatefulPicklist') {
			return (
				<StatefulPicklist {...variationMinusStoryDetails}>
					{listComponents}
				</StatefulPicklist>
			);
		} else if (componentType === 'NestedPicklist') {
			return (
				<XUIPicklist {...variationMinusStoryDetails}>
					<NestedPicklistContainer id="nested" isOpen={isOpen}>
						<NestedPicklistTrigger id="nestedTrigger">Nested list</NestedPicklistTrigger>
						{listComponents[0]}
					</NestedPicklistContainer>
					<NestedPicklistContainer id="split" isOpen={isOpen}>
						<XUIPickitem id="splitTrigger" isSplit isMultiselect>Split nested list</XUIPickitem>
						<NestedPicklistTrigger id="nestedSplit" />
						{listComponents[1]}
					</NestedPicklistContainer>
				</XUIPicklist>
			);
		}
		return listComponents;
	});
});
