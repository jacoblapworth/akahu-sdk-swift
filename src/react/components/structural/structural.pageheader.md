<div class="xui-margin-vertical">
	<a href="../section-compounds-navigation-page-header.html" isDocLink>Page Header in the XUI Documentation</a>
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
	<Picklist secondaryProps={{ role: 'menu' }}>
		<Pickitem ariaRole='menuitem' id="one">See all</Pickitem>
		<Pickitem ariaRole='menuitem' id="two" isSelected>Edit</Pickitem>
		<Pickitem ariaRole='menuitem' id="three" >Add</Pickitem>
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
