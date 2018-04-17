
<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-compounds-displayingdata-panel.html">Panels in the XUI Documentation</a>
</div>

Panels are top-level containers for grouping page content. XUIPanel can optionally contain XUIHeading, XUIFooter, and/or XUISection (which can have its own header). XUIPanel will also accept content designated as a sidebar.

#### Default Panel

```
const XUIPanel = require('../structural/XUIPanel').default;

<XUIPanel className="xui-padding-small">
	<p className="xui-padding-horizontal-small">You can create a new bill from here or email an attachment to yourorg-987654321@xero.com to generate it automatically.</p>
</XUIPanel>
```

#### Panel with Sections
```
const XUIPanel = require('../structural/XUIPanel').default;
const XUIPanelSection = require('../structural/XUIPanelSection').default;

<XUIPanel>
	<XUIPanelSection
		headerText="Organisation Settings"
		className="xui-padding-large"
	>
		<p>Settings allow you fine control over which members of your organisation can use different parts of Xero.</p>
	</XUIPanelSection>
	<XUIPanelSection className="xui-padding-large">
		<p>Or <a href="#">add new members</a> to your organisation.</p>
	</XUIPanelSection>
</XUIPanel>
```

#### Panel with Sidebar, Header, and Footer
```
const XUIPanel = require('../structural/XUIPanel').default;
const XUIPanelSection = require('../structural/XUIPanelSection').default;
const XUIPanelHeading = require('../structural/XUIPanelHeading').default;
const XUIPanelFooter = require('../structural/XUIPanelFooter').default;
const XUIPicklist = require('../picklist/Picklist').default;
const XUIPickitem = require('../picklist/Pickitem').default;
const XUIActions = require('../structural/XUIActions').default;
const XUIButton = require('../button/XUIButton').default;

const header = <XUIPanelHeading>Invoices</XUIPanelHeading>;
const footerActions = (
	<XUIActions
		isLinear
		primaryAction={<XUIButton key='one' variant="primary" size="small">Continue</XUIButton>}
		secondaryAction={<XUIButton key='two' size="small">Cancel</XUIButton>}
	/>
);
const footer = (
	<XUIPanelFooter className="xui-padding-small">{footerActions}</XUIPanelFooter>
);
const exampleNav = (
	<XUIPicklist>
		<XUIPickitem key="1" id="1">Bills</XUIPickitem>
		<XUIPickitem key="2" id="2" isSelected={true}>Invoices</XUIPickitem>
		<XUIPickitem key="3" id="3">Contacts</XUIPickitem>
	</XUIPicklist>
);

<XUIPanel
	header={header}
	footer={footer}
	sidebar={exampleNav}
>
		<XUIPanelSection
			className="xui-padding-large"
		>
			<p>Manage your invoices from this area.</p>
		</XUIPanelSection>
</XUIPanel>
```
