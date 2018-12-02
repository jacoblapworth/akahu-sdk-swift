<div class="xui-margin-vertical">
	<a href="../section-compounds-navigation-breadcrumbs.html" isDocLink>Breadcrumb in the XUI Documentation</a>
</div>

`XUIBreadcrumb` creates a list of sequenced nav items from a provided array. It is most commonly found in place of a title in a `XUIPageHeader`. Items without a provided link will appear in a different color. The array can contain objects which will be used to generate anchor links, or HTML nodes which will have the `xui-breadcrumb--link` class added to them. As always, be mindful of accessibility concerns if using non-semantic elements for interactivity.

```
const XUIPageHeader = require('../structural/XUIPageHeader').default;
const XUIBreadcrumb = require('../structural/XUIBreadcrumb').default;

const logHi = () => console.log('hello');

const breadcrumbLinks = [
	<span tabIndex={0} role="link" onClick={logHi} key="a">Elements</span>,
	{key: "b", label: "Identifiers", href: "#breadcrumb"},
	{key: "c", label: "Avatar"}];
const builtBreadcrumb = <XUIBreadcrumb breadcrumbs={breadcrumbLinks}></XUIBreadcrumb>;

<XUIPageHeader breadcrumb={builtBreadcrumb}></XUIPageHeader>

```
