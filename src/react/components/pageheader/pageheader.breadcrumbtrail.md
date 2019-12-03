<div class="xui-margin-vertical">
	<a href="../section-components-navigation-breadcrumb-trail.html" isDocLink>Breadcrumb in the XUI Documentation</a>
</div>

`XUIBreadcrumbTrail` creates a list of sequenced nav items from a provided array. It is most commonly found in addition to a title in a `XUIPageHeader`. The array can contain objects used to generate anchor links, or it can contain HTML nodes which will have the `xui-breadcrumb--link` class added to them. As always, be mindful of accessibility concerns if using non-semantic elements for interactivity.

```jsx harmony
import { XUIPageHeader, XUIBreadcrumbTrail } from '../../pageheader';

const logHi = () => console.log('hello');

const breadcrumbLinks = [
  <span tabIndex={0} role="link" onClick={logHi} key="a">
    Elements
  </span>,
  { key: 'b', label: 'Identifiers', href: '#breadcrumb' },
  { key: 'c', label: 'Avatar', href: '#breadcrumb2' }
];
const builtBreadcrumb = <XUIBreadcrumbTrail breadcrumbs={breadcrumbLinks} />;

const wrapperStyles = {
  resize: 'horizontal',
  overflow: 'hidden'
};

<div className="xui-panel xui-padding-small" style={wrapperStyles}>
  <XUIPageHeader breadcrumb={builtBreadcrumb} title="Update your account" />
</div>;
```

`XUIBreadcrumbTrail` accepts a `swapAtBreakpoint`. If the PageHeader is narrower than the specified breakpoint and there are three or more breadcrumb items, breadcrumb items other than the last will appear in a dropdown. If the PageHeader is wider than the specified breakpoint or has fewer than three items, all items will appear fully expanded.

Try to resize: Click and drag the bottom right corner of the following container.

```jsx harmony
import { XUIPageHeader, XUIBreadcrumbTrail } from '../../pageheader';

const logHi = () => console.log('hello');

const breadcrumbLinks = [
  <span tabIndex={0} role="link" onClick={logHi} key="a">
    Elements
  </span>,
  { key: 'b', label: 'Identifiers', href: '#breadcrumb' },
  { key: 'c', label: 'Avatar', href: '#breadcrumb2' }
];
const builtBreadcrumb = (
  <XUIBreadcrumbTrail breadcrumbs={breadcrumbLinks} swapAtBreakpoint="small" />
);

const wrapperStyles = {
  resize: 'horizontal',
  overflow: 'hidden'
};
<div className="xui-panel xui-padding-small" style={wrapperStyles}>
  <XUIPageHeader breadcrumb={builtBreadcrumb} title="Update your account" />
</div>;
```
