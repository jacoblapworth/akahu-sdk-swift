<div class="xui-margin-vertical">
	<a href="../section-components-navigation-page-header.html" isDocLink>Page Header in the XUI Documentation</a>
</div>

The `XUIPageHeader` appears beneath the global header on a page. In a basic example, it is a white bar with a title. In more complex cases it could contain a [`XUIBreadcrumbTrail`](#xuibreadcrumbtrail), a [`Picklist`](#picklist) to present tabbed navigation, or a [`XUIActions`](#actions) component (and some combinations).

[Container Queries](#container-queries) could be used to detect the container size and adjust the layout of PageHeader responsively.

#### Examples

```jsx harmony
import { XUIPageHeader } from '@xero/xui/react/pageheader';

<XUIPageHeader title="Account Settings" />;
```

```jsx harmony
import { XUIPageHeader } from '@xero/xui/react/pageheader';
import Picklist, { Pickitem } from '@xero/xui/react/picklist';

const builtTabs = (
  <Picklist secondaryProps={{ role: 'menu' }}>
    <Pickitem ariaRole="menuitem" id="one">
      See all
    </Pickitem>
    <Pickitem ariaRole="menuitem" id="two" isSelected>
      Edit
    </Pickitem>
    <Pickitem ariaRole="menuitem" id="three">
      Add
    </Pickitem>
  </Picklist>
);

<XUIPageHeader title="Contacts" tabs={builtTabs} />;
```

For responsive support, there's a compact version for horizontal picklist which could be used in `tabs` of `XUIPageHeader`.

(Refer to the document for prop `swapAtBreakpoint` in the `Horizontal variant` section of [Picklist](#picklist).)

Try to resize: Click and drag the bottom right corner of the following container.

```jsx harmony
import { XUIPageHeader } from '@xero/xui/react/pageheader';
import Picklist, { Pickitem } from '@xero/xui/react/picklist';

const builtTabs = (
  <Picklist secondaryProps={{ role: 'menu' }} swapAtBreakpoint="small">
    <Pickitem ariaRole="menuitem" id="one">
      See all
    </Pickitem>
    <Pickitem ariaRole="menuitem" id="two" isSelected>
      Edit
    </Pickitem>
    <Pickitem ariaRole="menuitem" id="three">
      Add
    </Pickitem>
  </Picklist>
);
const wrapperStyles = {
  resize: 'horizontal',
  overflow: 'hidden'
};

<div className="xui-panel xui-padding-xsmall" style={wrapperStyles}>
  <XUIPageHeader title="Contacts" tabs={builtTabs} />
</div>;
```

```jsx harmony
import { XUIPageHeader } from '@xero/xui/react/pageheader';
import XUIActions from '@xero/xui/react/actions';
import XUIButton from '@xero/xui/react/button';

const builtActions = (
  <XUIActions
    primaryAction={
      <XUIButton key="one" variant="primary" size="small">
        Create
      </XUIButton>
    }
    secondaryAction={
      <XUIButton key="two" size="small">
        Discard
      </XUIButton>
    }
  />
);

<XUIPageHeader title="Create Invoice" actions={builtActions} />;
```

```jsx harmony
import { XUIPageHeader, XUIBreadcrumbTrail } from '@xero/xui/react/pageheader';
import XUIActions from '@xero/xui/react/actions';
import XUIButton from '@xero/xui/react/button';
import XUITag from '@xero/xui/react/tag';
import Picklist, { Pickitem } from '@xero/xui/react/picklist';

const builtActions = (
  <XUIActions
    primaryAction={
      <XUIButton key="one" variant="primary" size="small">
        Create
      </XUIButton>
    }
    secondaryAction={
      <XUIButton key="two" size="small">
        Discard
      </XUIButton>
    }
  />
);

const sampleBreadcrumb = [
  <span role="link" tabIndex="0" onClick={() => alert('hello')} onKeyDown={() => {}} key="1">
    Organisation settings
  </span>,
  { label: 'Edit organisation', href: '#2' }
];
const builtBreadcrumb = <XUIBreadcrumbTrail breadcrumbs={sampleBreadcrumb} />;

const builtTabs = (
  <Picklist secondaryProps={{ role: 'menu' }}>
    <Pickitem ariaRole="menuitem" id="one">
      See all
    </Pickitem>
    <Pickitem ariaRole="menuitem" id="two" isSelected>
      Edit
    </Pickitem>
    <Pickitem ariaRole="menuitem" id="three">
      Add
    </Pickitem>
  </Picklist>
);

<XUIPageHeader
  title="New member"
  secondary="Create a read-only member"
  tags={[
    <XUITag key="pending" size="small">
      Pending
    </XUITag>
  ]}
  actions={builtActions}
  breadcrumb={builtBreadcrumb}
  tabs={builtTabs}
/>;
```
