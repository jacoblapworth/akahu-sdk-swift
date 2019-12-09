<div class="xui-margin-vertical">
	<a href="../section-components-displayingdata-panel.html" isDocLink>Panels in the XUI Documentation</a>
</div>

Panels are top-level containers for grouping page content. XUIPanel can optionally contain XUIPanelHeading, XUIPanelFooter, and/or XUIPanelSection (which can have its own header). XUIPanel will also accept content designated as a sidebar.

#### Default Panel

```jsx harmony
import { XUIPanel } from './panel';

<XUIPanel className="xui-padding-small">
  <p className="xui-padding-horizontal-small">
    You can create a new bill from here or email an attachment to yourorg-987654321@xero.com to
    generate it automatically.
  </p>
</XUIPanel>;
```

#### Panel with Sections

```jsx harmony
import { XUIPanel, XUIPanelSection } from './panel';

<XUIPanel>
  <XUIPanelSection headerText="Organisation Settings" className="xui-padding-large">
    <p>
      Settings allow you fine control over which members of your organisation can use different
      parts of Xero.
    </p>
  </XUIPanelSection>
  <XUIPanelSection className="xui-padding-large">
    <p>
      Or <a href="#">add new members</a> to your organisation.
    </p>
  </XUIPanelSection>
</XUIPanel>;
```

#### Panel with Sidebar, Heading, and Footer

```jsx harmony
import { XUIPanel, XUIPanelSection, XUIPanelHeading, XUIPanelFooter } from './panel';
import XUIActions from './actions';
import Picklist, { Pickitem } from './picklist';
import XUIButton from './button';

const heading = <XUIPanelHeading>Invoices</XUIPanelHeading>;
const footerActions = (
  <XUIActions
    isLinear
    primaryAction={
      <XUIButton key="one" variant="primary" size="small">
        Continue
      </XUIButton>
    }
    secondaryAction={
      <XUIButton key="two" size="small">
        Cancel
      </XUIButton>
    }
  />
);
const footer = <XUIPanelFooter className="xui-padding-small">{footerActions}</XUIPanelFooter>;
const exampleNav = (
  <Picklist secondaryProps={{ role: 'menu' }}>
    <Pickitem id="panelpi1" ariaRole="menuitem">
      Bills
    </Pickitem>
    <Pickitem id="panelpi2" ariaRole="menuitem" isSelected>
      Invoices
    </Pickitem>
    <Pickitem id="panelpi3" ariaRole="menuitem">
      Contacts
    </Pickitem>
  </Picklist>
);

<XUIPanel heading={heading} footer={footer} sidebar={exampleNav}>
  <XUIPanelSection className="xui-padding-large">
    <p>Manage your invoices from this area.</p>
  </XUIPanelSection>
</XUIPanel>;
```
