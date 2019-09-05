<div class="xui-margin-vertical">
	<a href="../section-compounds-navigation-breadcrumbs.html" isDocLink>Breadcrumb in the XUI Documentation</a>
</div>

`XUIBreadcrumb` creates a list of sequenced nav items from a provided array. It is most commonly found in addition to a title in a `XUIPageHeader`. The array can contain objects used to generate anchor links, or it can contain HTML nodes which will have the `xui-breadcrumb--link` class added to them. As always, be mindful of accessibility concerns if using non-semantic elements for interactivity.

```jsx harmony
import { XUIPageHeader, XUIBreadcrumb } from '../../structural';

const logHi = () => console.log('hello');

const breadcrumbLinks = [
  <span tabIndex={0} role="link" onClick={logHi} key="a">
    Elements
  </span>,
  { key: 'b', label: 'Identifiers', href: '#breadcrumb' },
  { key: 'c', label: 'Avatar', href: '#breadcrumb2' }
];
const builtBreadcrumb = <XUIBreadcrumb breadcrumbs={breadcrumbLinks} />;

<XUIPageHeader breadcrumb={builtBreadcrumb} title="Update your account" />;
```
