<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-blobicon xui-blobicon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-compounds-navigation-page-header.html">Page Header in the XUI Documentation</a>
</div>

The `XUIPageHeader` appears beneath the global header on a page. In a basic example, it is a white bar with a title. In more complex cases it could contain a [`XUIBreadcrumb`](#xuibreadcrumb), a [`Picklist`](#picklist) to present tabbed navigation, or a [`XUIActions`](#actions) component (and some combinations).

#### Examples
```
const XUIPageHeader = require('../structural/XUIPageHeader').default;

<XUIPageHeader title="Account Settings"></XUIPageHeader>
```

```
const XUIPageHeader = require('../structural/XUIPageHeader').default;
const Picklist = require('../picklist/Picklist').default;
const Pickitem = require('../picklist/Pickitem').default;

const builtTabs = (
	<Picklist>
		<Pickitem id="one">See all</Pickitem>
		<Pickitem id="two" isSelected>Edit</Pickitem>
		<Pickitem id="three" >Add</Pickitem>
	</Picklist>
);

<XUIPageHeader title="Contacts" tabs={builtTabs}></XUIPageHeader>
```

```
const XUIPageHeader = require('../structural/XUIPageHeader').default;
const XUIActions = require('../structural/XUIActions').default;
const XUIButton = require('../button/XUIButton').default;

const builtActions = (
	<XUIActions
		primaryAction={<XUIButton key='one' variant="primary" size="small">Create</XUIButton>}
		secondaryAction={<XUIButton key='two' size="small">Discard</XUIButton>}
	/>
);

<XUIPageHeader title="Create Invoice" actions={builtActions}></XUIPageHeader>
```
