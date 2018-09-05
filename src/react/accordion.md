<div class="xui-margin-vertical">
		<a href="../section-compounds-displayingdata-accordion.html" isDocLink>Accordion in the XUI Documentation</a>
</div>

Accordions are used to display a vertically expandable & collapsible list that reveals and hides additional content

The _Accordion_ is broken up into two key components `import XUIAccordion, { XUIAccordionItem } from '@xero/xui/react/accordion';`.



## Basic

The bare minimum _Accordion_ composition can be achieved with the `items` and `createItem` prop.

+ `items` represents the generic data structure of each _Accordion_ item.
+ `createItem` returns a `<XUIAccordionItem />` that represents a single _item_ from the `items` prop.

**Note:** Each item needs a unique `id`. By default an object _key_ named `id` is looked up in each item however you can specify a new key if there is a more relevant unique identifier using the prop `idKey`.

```
const {
	default: XUIAccordion,
	XUIAccordionItem,
} = require('./accordion');
<XUIAccordion
	items={[
		{ id: 1, name: 'John Smith', content: 'Accountant' },
		{ id: 2, name: 'Barry Allen', content: 'Bookkeeper' },
		{ id: 3, name: 'Ernest Hemmingway' }
	]}
	createItem={({ name, content }) => (
		<XUIAccordionItem
			primaryHeading={name}
			onItemClick={({id, isOpen}) => console.log(`clicked! ${id} | ${isOpen}`)}>
			{ content &&  <div className="xui-padding-horizontal-large xui-padding-vertical-4xlarge">{content}</div> }
		</XUIAccordionItem>
	)}
/>
```

## Accordion Item

The `<XUIAccordionItem />` can take a variety of props that can inject content into the layout (`primaryHeading`, `secondaryHeading`, `leftContent`, `pinnedValue`, `action`, `overflow`, `custom`).

You can also supply an `onItemClick` prop that returns the entire item from the items array in addition to an `isOpen` boolean representing the items toggled state.

**Note:** if you are adding a `<button />` type element as content remember to [`stopPropagation`](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) so the event does not bubble up and trigger the _Accordion_ _expand_ / _collapse_ toggle accidentally.

```
const {
	default: XUIAccordion,
	XUIAccordionItem,
} = require('./accordion');
const itemStyle = { background: 'lightgray', border: '1px solid darkgray', padding: '4px', outline: '1px solid gray' };
<XUIAccordion
	items={[{ id: 1 }]}
	createItem={() => (
		<XUIAccordionItem
			primaryHeading={<div style={itemStyle}>Primary Heading</div>}
			secondaryHeading={<div style={itemStyle}>Secondary Heading</div>}
			leftContent={<div style={itemStyle}>Left Content</div>}
			pinnedValue={<div style={itemStyle}>Pinned Value</div>}
			action={<div style={itemStyle}>Action</div>}
			overflow={<div style={itemStyle}>Overflow</div>}
			custom={<div style={itemStyle}>Custom Content</div>}
			onItemClick={({isOpen}) => alert(`${isOpen ? 'Open' : 'Close'} example item`)}
		/>
	)}
/>
```

## Empty State

If no `children` content is supplied to a `<XUIAccordionItem />` then the _empty state_ component will be rendered instead.

There is a default design that can be overridden or completely replaced (`emptyMessage`, `emptyIcon`, `emptyStateComponent`).

```
const {
	default: XUIAccordion,
	XUIAccordionItem,
} = require('./accordion');
const starIconPath = require ('@xero/xui-icon/icons/star').default;
const XUIAvatar = require('./avatar').default;
const XUIButton = require('./button').default;
const XUIIcon = require('./icon').default;
const icon = require('@xero/xui-icon/icons/overflow').default;
<div>
	<XUIAccordion
		className="xui-margin-bottom-large"
		items={[{ id: 1 }]}
		createItem={({ name }) => <XUIAccordionItem primaryHeading="Default empty state" />}
	/>
	<XUIAccordion
		className="xui-margin-bottom-large"
		emptyIcon={starIconPath}
		emptyMessage="Custom empty state message"
		items={[{ id: 1 }]}
		createItem={({ name }) => <XUIAccordionItem primaryHeading="Custom empty state" />}
	/>
	<XUIAccordion
		emptyStateComponent={(
			<div
				className="xui-heading xui-textcolor-inverted xui-padding-vertical-large xui-text-align-center"
				style={ { background: 'darkgray' } }>
				Replace empty state component
			</div>
		)}
		items={[{ id: 1 }]}
		createItem={({ name }) => <XUIAccordionItem primaryHeading="Replace empty state" />}
	/>
</div>
```

## Example

You can nest other XUI component inside the `<XUIAccordionItem />` _(such as `<XUIContentBlock />`)_ to create robust compositions.

```
const {
	default: XUIAccordion,
	XUIAccordionItem,
} = require('./accordion');
const { XUIContentBlock, XUIContentBlockItem } = require('./structural.js');
const { default: XUIAvatar } = require('./avatar.js');
const { default: XUIButton } = require('./button.js');
const { default: XUIIcon } = require('./icon.js');
const { default: overflowPathData } = require('@xero/xui-icon/icons/overflow');
<XUIAccordion
	idKey="name"
	items={[
		{
			name: 'John Smith',
			contacts: [
				{ contact: 'Peggy Olsen', minutes: '00:20' },
				{ contact: 'Pete Campbell', minutes: '15:30' }
			]
		}
	]}
	createItem={({ name, contacts }) => (
		<XUIAccordionItem
			primaryHeading={name}
			leftContent={<XUIAvatar value={name} className="xui-margin-right"/>}
			overflow={<XUIButton variant="icon"><XUIIcon icon={overflowPathData} title="Overflow menu"/></XUIButton>}
			action={(
				<XUIButton
					size="small"
					className="xui-margin-right-small"
					onClick={event => {
						event.stopPropagation();
						alert('Clicked update button');
					}}>Update</XUIButton>
			)}>
				<XUIContentBlock>
					{ contacts.map(({contact, minutes}) => (
						<XUIContentBlockItem
							key={contact}
							primaryHeading={contact}
							pinnedValue={minutes}
							href="#"
						/>
					)) }
				</XUIContentBlock>
		</XUIAccordionItem>
	)}
/>
```
