<div class="xui-margin-vertical">
	<a href="../section-components-navigation-page-header.html" isDocLink>Page Header in the XUI Documentation</a>
</div>

The `XUIPageHeader` appears beneath the global header on a page. In a basic example, it is a white bar with a title. In more complex cases it could contain a [`XUIBreadcrumbTrail`](#xuibreadcrumbtrail), a [`Picklist`](#picklist) to present tabbed navigation, or a [`XUIActions`](#actions) component (and some combinations).

#### Examples

```jsx harmony
import { XUIPageHeader } from './pageheader';

<XUIPageHeader title="Account Settings" />;
```

```jsx harmony
import { XUIPageHeader } from './pageheader';
import Picklist, { Pickitem } from './picklist';

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

```jsx harmony
import { XUIPageHeader } from './pageheader';
import XUIActions from './actions';
import XUIButton from './button';

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
import { XUIPageHeader, XUIBreadcrumbTrail } from './pageheader';
import XUIActions from './actions';
import XUIButton from './button';
import XUITag from './tag';
import Picklist, { Pickitem } from './picklist';

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
