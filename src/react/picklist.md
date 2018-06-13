<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-blobicon xui-blobicon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-compounds-displayingdata-picklist.html">Picklist in the XUI Documentation</a>
</div>

## What is a Picklist?

A set of components that brings in the XUI styles to render a list of items. `Picklist` and `Pickitems` are presentational components, and `StatefulPicklist` is a wrapper available to handle keyboard navigation.

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
