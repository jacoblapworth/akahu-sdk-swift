<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-building-blocks-page-header.html">Pageheader in the XUI Documentation</a>
</div>

The `XUIPageheader` appears beneath the global header on a page. In a basic example, it is a white bar with a title. In more complex cases it could contain a [`XUIBreadcrumb`](#xuibreadcrumb), a [`Picklist`](#picklist) to present tabbed navigation, or a [`XUIActions`](#actions) component (and some combinations).

#### Examples
```
const XUIPageheader = require('../structural/XUIPageheader').default;

<XUIPageheader title="Account Settings"></XUIPageheader>
```

```
const XUIPageheader = require('../structural/XUIPageheader').default;
const Picklist = require('../picklist/Picklist').default;
const Pickitem = require('../picklist/Pickitem').default;

const builtTabs = (
	<Picklist>
		<Pickitem id="one">See all</Pickitem>
		<Pickitem id="two" isSelected>Edit</Pickitem>
		<Pickitem id="three" >Add</Pickitem>
	</Picklist>
);

<XUIPageheader title="Contacts" tabs={builtTabs}></XUIPageheader>
```

```
const XUIPageheader = require('../structural/XUIPageheader').default;
const XUIActions = require('../structural/XUIActions').default;
const XUIButton = require('../button/XUIButton').default;

const builtActions = (
	<XUIActions
		primaryAction={<XUIButton key='one' variant="primary" size="small">Create</XUIButton>}
		secondaryAction={<XUIButton key='two' size="small">Discard</XUIButton>}
	/>
);

<XUIPageheader title="Create Invoice" actions={builtActions}></XUIPageheader>
```
