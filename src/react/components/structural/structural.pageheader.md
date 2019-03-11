<div class="xui-margin-vertical">
	<a href="../section-compounds-navigation-page-header.html" isDocLink>Page Header in the XUI Documentation</a>
</div>

The `XUIPageHeader` appears beneath the global header on a page. In a basic example, it is a white bar with a title. In more complex cases it could contain a [`XUIBreadcrumb`](#xuibreadcrumb), a [`Picklist`](#picklist) to present tabbed navigation, or a [`XUIActions`](#actions) component (and some combinations).

#### Examples

```jsx harmony
import { XUIPageHeader } from '../../structural';

<XUIPageHeader title="Account Settings"></XUIPageHeader>
```

```jsx harmony
import { XUIPageHeader } from '../../structural';
import Picklist, { Pickitem } from '../../picklist';

const builtTabs = (
	<Picklist secondaryProps={{ role: 'menu' }}>
		<Pickitem ariaRole='menuitem' id="one">See all</Pickitem>
		<Pickitem ariaRole='menuitem' id="two" isSelected>Edit</Pickitem>
		<Pickitem ariaRole='menuitem' id="three" >Add</Pickitem>
	</Picklist>
);

<XUIPageHeader title="Contacts" tabs={builtTabs}></XUIPageHeader>
```

```jsx harmony
import { XUIPageHeader, XUIActions } from '../../structural';
import XUIButton from '../../button';

const builtActions = (
	<XUIActions
		primaryAction={<XUIButton key='one' variant="primary" size="small">Create</XUIButton>}
		secondaryAction={<XUIButton key='two' size="small">Discard</XUIButton>}
	/>
);

<XUIPageHeader title="Create Invoice" actions={builtActions}></XUIPageHeader>
```
