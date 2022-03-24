<div class="xui-margin-vertical">
	<a href="../section-components-navigation-breadcrumb-trail.html" isDocLink>Breadcrumb in the XUI Documentation</a>
</div>

`XUIBreadcrumbTrail` creates a list of sequenced nav items from a provided array. It is most commonly found in addition to a title in a `XUIPageHeader`. The array can contain objects used to generate anchor links, or it can contain HTML nodes which will have the `xui-breadcrumb--link` class added to them. As always, be mindful of accessibility concerns if using non-semantic elements for interactivity.

```jsx harmony
import XUIPageHeader, { XUIBreadcrumbTrail } from '@xero/xui/react/pageheader';

const handleClick = () => console.log('onClick');
const handleKeyDown = () => console.log('onKeyDown');

const breadcrumbLinks = [
  <span key="a" onClick={handleClick} onKeyDown={handleKeyDown} role="link" tabIndex={0}>
    Organisations
  </span>,
  { href: '#settings', key: 'b', label: 'Settings' },
  { href: '#permissions', key: 'c', label: 'Permissions' }
];

const builtBreadcrumb = <XUIBreadcrumbTrail breadcrumbs={breadcrumbLinks} />;

const wrapperStyles = {
  overflow: 'hidden',
  resize: 'horizontal'
};

<div className="xui-panel xui-padding-small" style={wrapperStyles}>
  <XUIPageHeader breadcrumb={builtBreadcrumb} title="Edit permissions" />
</div>;
```

`XUIBreadcrumbTrail` accepts a `swapAtBreakpoint`. If the PageHeader is narrower than the specified breakpoint and there are three or more breadcrumb items, breadcrumb items other than the last will appear in a dropdown. If the PageHeader is wider than the specified breakpoint or has fewer than three items, all items will appear fully expanded.

[Container Queries](#container-queries) are used here to detect the PageHeader size.

Try to resize: Click and drag the bottom right corner of the following container.

```jsx harmony
import XUIPageHeader, { XUIBreadcrumbTrail } from '@xero/xui/react/pageheader';

const handleClick = () => console.log('onClick');
const handleKeyDown = () => console.log('onKeyDown');

const breadcrumbLinks = [
  <span key="a" onClick={handleClick} onKeyDown={handleKeyDown} role="link" tabIndex={0}>
    Organisations
  </span>,
  { href: '#settings', key: 'b', label: 'Settings' },
  { href: '#permissions', key: 'c', label: 'Permissions' }
];

const builtBreadcrumb = (
  <XUIBreadcrumbTrail breadcrumbs={breadcrumbLinks} swapAtBreakpoint="small" />
);

const wrapperStyles = {
  overflow: 'hidden',
  resize: 'horizontal'
};

<div className="xui-panel xui-padding-small" style={wrapperStyles}>
  <XUIPageHeader breadcrumb={builtBreadcrumb} title="Edit permissions" />
</div>;
```
