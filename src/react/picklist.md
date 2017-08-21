<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-picklist.html#picklist">Picklist in the XUI Documentation</a></span>
	</div>
</div>

A set of components  to create a list of items otherwise known in XUI as a Picklist. The `Picklist` and `Pickitems` are presentational components with a `StatefulPicklist` wrapper available to handle keyboard navigation on its children.

### Is this just a Menu and MenuItems?
A menu is often in the context of a dropdown or navigational menu so to avoid that assumption
we've named this picklist, a list of things you can pick from. It's commonly used in the context of a sidebar,
navigation, filtering and dropdown.

## Examples

### Standard Picklist

```
const { Pickitem } = require ( './picklist.js' );
<Picklist>
	<Pickitem id="plain1" isSelected={true}>An empty item</Pickitem>
	<Pickitem id="plain2">Next Item</Pickitem>
	<Pickitem id="plain3">Another Item</Pickitem>
	<Pickitem id="plain4" href="http://xero.com">This is a link to xero.com</Pickitem>
	<Pickitem id="plain5">Last Item</Pickitem>
</Picklist>
```

### Horizontal variant

```
const { Pickitem } = require ( './picklist.js' );
<Picklist isHorizontal>
	<Pickitem id="plain1" isSelected shouldTruncate>
		Projects
	</Pickitem>
	<Pickitem id="plain2" shouldTruncate>
		Timesheets
	</Pickitem>
	<Pickitem id="plain3" shouldTruncate>
		Other things
	</Pickitem>
</Picklist>
```
