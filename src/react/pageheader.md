<div class="xui-margin-vertical">
	<a href="../section-components-navigation-page-header.html" isDocLink>Page Header in the XUI Documentation</a>
</div>

The `XUIPageHeader` appears beneath the global header on a page. In a basic example, it is a white bar with a title. In more complex cases it could contain a [`XUIBreadcrumbTrail`](#xuibreadcrumbtrail), a [`XUIPicklist`](#picklist) to present tabbed navigation, or a [`XUIActions`](#actions) component (and some combinations).

[Container Queries](#container-queries) could be used to detect the container size and adjust the layout of PageHeader responsively.

#### Examples

```jsx harmony
import XUIPageHeader from '@xero/xui/react/pageheader';

<XUIPageHeader title="Account settings" />;
```

```jsx harmony
import XUIPageHeader from '@xero/xui/react/pageheader';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';

const builtTabs = (
  <XUIPicklist secondaryProps={{ role: 'menu' }}>
    <XUIPickitem ariaRole="menuitem" id="all-1">
      All
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="customers-1" isSelected>
      Customers
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="suppliers-1">
      Suppliers
    </XUIPickitem>
  </XUIPicklist>
);

<XUIPageHeader tabs={builtTabs} title="Contacts" />;
```

For responsive support, there's a compact version for horizontal picklist which could be used in `tabs` of `XUIPageHeader`.

(Refer to the document for prop `swapAtBreakpoint` in the `Horizontal variant` section of [Picklist](#picklist).)

Try to resize: Click and drag the bottom right corner of the following container.

```jsx harmony
import XUIPageHeader from '@xero/xui/react/pageheader';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';

const builtTabs = (
  <XUIPicklist secondaryProps={{ role: 'menu' }} swapAtBreakpoint="small">
    <XUIPickitem ariaRole="menuitem" id="all-2">
      All
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="customers-2" isSelected>
      Customers
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="suppliers-2">
      Suppliers
    </XUIPickitem>
  </XUIPicklist>
);

const wrapperStyles = {
  overflow: 'hidden',
  resize: 'horizontal'
};

<div className="xui-panel xui-padding-xsmall" style={wrapperStyles}>
  <XUIPageHeader tabs={builtTabs} title="Contacts" />
</div>;
```

```jsx harmony
import overflow from '@xero/xui-icon/icons/overflow';
import XUIActions from '@xero/xui/react/actions';
import XUIButton, { XUIIconButton } from '@xero/xui/react/button';
import XUIPageHeader from '@xero/xui/react/pageheader';

const builtActions = (
  <XUIActions
    hasLayout={false}
    primaryAction={<XUIIconButton icon={overflow} key="moreOptions" ariaLabel="More options" />}
    secondaryAction={
      <XUIButton key="newContact" size="small" variant="create">
        New contact
      </XUIButton>
    }
  />
);

<XUIPageHeader actions={builtActions} title="Contacts" />;
```

```jsx harmony
import XUIActions from '@xero/xui/react/actions';
import XUIButton from '@xero/xui/react/button';
import XUIPageHeader, { XUIBreadcrumbTrail } from '@xero/xui/react/pageheader';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';
import XUITag from '@xero/xui/react/tag';

const builtActions = (
  <XUIActions
    hasLayout={false}
    primaryAction={
      <XUIButton key="create" size="small" variant="create">
        Create
      </XUIButton>
    }
    secondaryAction={
      <XUIButton key="discard" size="small">
        Discard
      </XUIButton>
    }
  />
);

const breadcrumbLinks = [
  { href: '#organisation-settings', key: '1', label: 'Organisation settings' },
  { href: '#edit-organisation', key: '2', label: 'Edit organisation' }
];
const builtBreadcrumb = <XUIBreadcrumbTrail breadcrumbs={breadcrumbLinks} />;

const builtTabs = (
  <XUIPicklist secondaryProps={{ role: 'menu' }}>
    <XUIPickitem ariaRole="menuitem" id="seeAll">
      See all
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="edit" isSelected>
      Edit
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="add">
      Add
    </XUIPickitem>
  </XUIPicklist>
);

<XUIPageHeader
  actions={builtActions}
  breadcrumb={builtBreadcrumb}
  secondary="Cherise Tan"
  supplementary="Saved"
  tabs={builtTabs}
  tags={[
    <XUITag key="pending" size="small">
      Pending
    </XUITag>
  ]}
  title="New member"
/>;
```
