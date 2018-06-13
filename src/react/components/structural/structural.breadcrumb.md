<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-blobicon xui-blobicon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-compounds-navigation-breadcrumbs.html">Breadcrumb in the XUI Documentation</a>
</div>

`XUIBreadcrumb` creates a list of sequenced nav items from a provided array. It is most commonly found in place of a title in a `XUIPageHeader`. Items without a provided link will appear in a different color. The array can contain objects which will be used to generate anchor links, or HTML nodes which will have the `xui-breadcrumb--link` class added to them. As always, be mindful of accessibility concerns if using non-semantic elements for interactivity.

```
const XUIPageHeader = require('../structural/XUIPageHeader').default;
const XUIBreadcrumb = require('../structural/XUIBreadcrumb').default;

const breadcrumbLinks = [
	<span role="link" onClick={() => console.log('hello')} key="a">Elements</span>,
	{key: "b", label: "Identifiers", href: "#2"},
	{key: "c", label: "Avatar"}];
const builtBreadcrumb = <XUIBreadcrumb breadcrumbs={breadcrumbLinks}></XUIBreadcrumb>;

<XUIPageHeader breadcrumb={builtBreadcrumb}></XUIPageHeader>

```
