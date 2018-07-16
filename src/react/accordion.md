<div class="xui-margin-vertical">
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
			<use xlink:href="#xui-icon-bookmark" role="presentation"/>
		</svg>
		<a href="../section-compounds-displayingdata-accordion.html">Accordion in the XUI Documentation</a>
</div>

## Example

```
const {
	default: XUIAccordion,
	XUIAccordionItem,
} = require('./accordion');
<XUIAccordion
	items={[
		{ id: 1, name: 'John Smith', content: 'Accountant' },
		{ id: 2, name: 'Barry Allen', content: 'Bookkeeper' },
		{ id: 3, name: 'Ernest Hemmingway', content: 'Contractor' }
	]}
	createItem={({name, content}) => (
		<XUIAccordionItem
			primaryHeading={name}
			onItemClick={({itemId, isOpen}) => console.log(`clicked! ${itemId} | ${isOpen}`)}>
			{content}
		</XUIAccordionItem>
	)}
/>
```
