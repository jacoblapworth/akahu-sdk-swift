<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-compounds-navigation-breadcrumbs.html">Breadcrumb in the XUI Documentation</a>
</div>

`XUIBreadcrumb` creates a list of sequenced nav items from a provided array. It is most commonly found in place of a title in a `XUIPageHeader`. Items without a provided link will appear in a different color.

```
const XUIPageHeader = require('../structural/XUIPageHeader').default;
const XUIBreadcrumb = require('../structural/XUIBreadcrumb').default;

const breadcrumbLinks = [
	{key: "a", label: "Elements", href: "#1"},
	{key: "b", label: "Identifiers", href: "#2"},
	{key: "c", label: "Avatar"}];
const builtBreadcrumb = <XUIBreadcrumb breadcrumbs={breadcrumbLinks}></XUIBreadcrumb>;

<XUIPageHeader breadcrumb={builtBreadcrumb}></XUIPageHeader>

```
