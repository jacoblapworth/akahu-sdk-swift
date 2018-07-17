import React from 'react';
import XUIAccordion from '../XUIAccordion';
import XUIAccordionItem from '../XUIAccordionItem';
import { storiesOf } from '@storybook/react';
import {withKnobs, object, boolean, text, select, number, color} from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import { variations, storiesWithVariationsKindName } from './variations';
import {createArray} from '../../progressindicator/helpers/utilities';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIButton from '../../button/XUIButton';
import XUIContentBlock from '../../structural/XUIContentBlock';
import XUIContentBlockItem from '../../structural/XUIContentBlockItem';
import XUIIcon from '../../icon/XUIIcon';
import overflowPathData from '@xero/xui-icon/icons/overflow';
import notificationPathData from '@xero/xui-icon/icons/notification';
import copyPathData from '@xero/xui-icon/icons/copy';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);

storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
	const itemsTotal = number('Total items', 3, {max: 5}) || 0;
	const hasPrimaryHeading = boolean('Show primary heading', true);
	const hasSecondaryHeading = boolean('Show secondary heading', false);
	const hasLeftContent = boolean('Show left content', false);
	const hasPinnedValue = boolean('Show pinned value', false);
	const hasAction = boolean('Show action', false);
	const hasOverflow = boolean('Show overflow', false);
	const hasCustom = boolean('Show custom content', false);
	const hasOnItemClick = boolean('Has item click callback', false);
	const hasEmptyState = boolean('Show empty state', true);
	const onItemClick = ({id, isOpen}) => alert(`${isOpen ? 'Open' : 'Close'} accordion item #${id}`);
	const names = ['Earnest Borer', 'Brandy Lindgren', 'Armando Erdman', 'Maverick Hoeger', 'Kailey Hodkiewicz'];
	const addresses = ['410 Lorine Garden', '9973 Runolfsson Circles', '331 Kihn Plaza', '805 Tommie Canyon', '7368 Kovacek Pines']
	const items = createArray(itemsTotal).map((_, index) => ({
		id: index + 1,
		primaryHeading: hasPrimaryHeading && names[index],
		secondaryHeading: hasSecondaryHeading && addresses[index],
		leftContent: hasLeftContent && <XUIAvatar value={names[index]} className="xui-margin-right" />,
		pinnedValue: hasPinnedValue && <XUIButton size="small" variant="negative" className="xui-margin-right-small">Delete</XUIButton>,
		action: hasAction && <XUIButton size="small" className="xui-margin-right-small">Update</XUIButton>,
		onItemClick: hasOnItemClick ? onItemClick : undefined,
		overflow: hasOverflow && (
			<XUIButton variant="icon-large"><XUIIcon path={overflowPathData} title="Overflow menu"/></XUIButton>
		),
		custom: hasCustom && [
			<XUIButton key="0" variant="icon-large"><XUIIcon path={notificationPathData} title="Overflow menu"/></XUIButton>,
			<XUIButton key="1" variant="icon-large"><XUIIcon path={copyPathData} title="Overflow menu"/></XUIButton>
		],
	}));

	return (
		<div style={{width: '940px'}}>
			<XUIAccordion
				items={items}
				createItem={(item => (
					<XUIAccordionItem {...item}>{hasEmptyState && (
						<XUIContentBlock>
							{createArray(item.id).map((_, index) => (
								<XUIContentBlockItem
									key={index}
									primaryHeading={names[index]}
									overflow={<XUIButton variant="icon-large"><XUIIcon path={overflowPathData} title="Overflow menu"/></XUIButton>}
									pinnedValue={`${3 * item.id * index}:00`}
									href="#"
								/>
							))}
						</XUIContentBlock>
					)}</XUIAccordionItem>
				))}
			/>
		</div>
	);

});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(fn => <div style={{ maxWidth: '940px', margin: '100px auto'  }}>{fn()}</div>)

variations.forEach(variation => {
	const { storyTitle, storyKind, createItem, ...props } = variation; // eslint-disable-line no-unused-vars
	const Comparison = (
		<XUIAccordion
			{...props}
			createItem={(props => {
				const {children, ...item} = createItem(props);
				return <XUIAccordionItem {...item}>{children}</XUIAccordionItem>;
			})}
		/>
	);

	storiesWithVariations.add(storyTitle, () => Comparison);
});
