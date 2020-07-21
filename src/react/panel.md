<div class="xui-margin-vertical">
	<a href="../section-components-displayingdata-panel.html" isDocLink>Panels in the XUI Documentation</a>
</div>

Panels are top-level containers for grouping page content. XUIPanel can optionally contain XUIPanelHeading, XUIPanelFooter, and/or XUIPanelSection (which can have its own header). XUIPanel will also accept content designated as a sidebar.

#### Default Panel

```jsx harmony
import { XUIPanel } from '@xero/xui/react/panel';

<XUIPanel className="xui-padding-small">
  <p className="xui-padding-horizontal-small">
    You can create a new bill from here or email an attachment to yourorg-987654321@xero.com to
    generate it automatically.
  </p>
</XUIPanel>;
```

#### Panel with Sections

```jsx harmony
import { XUIPanel, XUIPanelSection } from '@xero/xui/react/panel';

<XUIPanel>
  <XUIPanelSection heading="Organisation Settings" className="xui-padding-large">
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
import { XUIPanel, XUIPanelSection, XUIPanelHeading, XUIPanelFooter } from '@xero/xui/react/panel';
import XUIActions from '@xero/xui/react/actions';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';
import XUIButton from '@xero/xui/react/button';

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
  <XUIPicklist secondaryProps={{ role: 'menu' }}>
    <XUIPickitem id="panelpi1" ariaRole="menuitem">
      Bills
    </XUIPickitem>
    <XUIPickitem id="panelpi2" ariaRole="menuitem" isSelected>
      Invoices
    </XUIPickitem>
    <XUIPickitem id="panelpi3" ariaRole="menuitem">
      Contacts
    </XUIPickitem>
  </XUIPicklist>
);

<XUIPanel heading={heading} footer={footer} sidebar={exampleNav}>
  <XUIPanelSection className="xui-padding-large">
    <p>Manage your invoices from this area.</p>
  </XUIPanelSection>
</XUIPanel>;
```
