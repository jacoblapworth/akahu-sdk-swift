<div class="xui-margin-vertical">
	<a href="../section-components-displayingdata-panel.html" isDocLink>Panels in the XUI Documentation</a>
</div>

Panels are top-level containers for grouping page content. XUIPanel can optionally contain XUIPanelHeading, XUIPanelFooter, and/or XUIPanelSection (which can have its own header). XUIPanel will also accept content designated as a sidebar.

#### Default Panel

```jsx harmony
import XUIActions from '@xero/xui/react/actions';
import XUIButton from '@xero/xui/react/button';
import XUIIcon from '@xero/xui/react/icon';
import XUIPanel from '@xero/xui/react/panel';
import external from '@xero/xui-icon/icons/external';

<XUIPanel className="xui-padding-large">
  <p>
    Xero has a new VAT return that's compatible with Making Tax Digital (MTD). MTD allows you to
    easily review and submit VAT returns directly to HMRC.
  </p>
  <p>
    Most businesses registered for VAT will have been notified by HMRC if they need to start
    submitting VAT returns using MTD Compatible software. If you don't set up MTD for VAT now, you
    can still do VAT returns and set up MTD for VAT later.
  </p>
  <p>
    <a href="#mtd">
      Learn more about MTD for VAT <XUIIcon icon={external} />
    </a>
  </p>
  <XUIActions
    className="xui-padding-top"
    primaryAction={<XUIButton variant="main">Set up MTD for VAT in Xero</XUIButton>}
    secondaryAction={<XUIButton>Go to VAT returns without MTD</XUIButton>}
  />
</XUIPanel>;
```

#### Panel with Sections

```jsx harmony
import XUIButton from '@xero/xui/react/button';
import XUIDateInput from '@xero/xui/react/dateinput';
import XUIPanel, { XUIPanelSection } from '@xero/xui/react/panel';
import XUITextInput from '@xero/xui/react/textinput';

<XUIPanel>
  <XUIPanelSection
    className="xui-padding-large"
    headerClassName="xui-margin-bottom"
    heading="Personal details"
  >
    <form className="xui-form-layout">
      <XUITextInput isFieldLayout label="Name" />
      <XUITextInput isFieldLayout label="Email" type="email" />
    </form>
  </XUIPanelSection>
  <XUIPanelSection
    className="xui-padding-large"
    headerClassName="xui-margin-bottom"
    heading="Employment information"
  >
    <form className="xui-form-layout">
      <XUIDateInput
        inputLabel="Start date"
        isFieldLayout
        locale="en-NZ"
        nextButtonAriaLabel="Next month"
        prevButtonAriaLabel="Previous month"
      />
    </form>
  </XUIPanelSection>
</XUIPanel>;
```

#### Panel with Sidebar, Heading, and Footer

```jsx harmony
import XUIActions from '@xero/xui/react/actions';
import XUIButton from '@xero/xui/react/button';
import XUIPanel, { XUIPanelFooter, XUIPanelHeading, XUIPanelSection } from '@xero/xui/react/panel';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';
import XUITextInput from '@xero/xui/react/textinput';
import plus from '@xero/xui-icon/icons/plus';

const heading = <XUIPanelHeading>Payment information</XUIPanelHeading>;

const footer = (
  <XUIPanelFooter className="xui-padding-large">
    <XUIActions primaryAction={<XUIButton variant="main">Save</XUIButton>} />
  </XUIPanelFooter>
);

const sidebar = (
  <XUIPicklist secondaryProps={{ role: 'menu' }}>
    <XUIPickitem ariaRole="menuitem" id="personal-details">
      Personal details
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="employment-information">
      Employment information
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="payment-information" isSelected>
      Payment information
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="payslips">
      Payslips
    </XUIPickitem>
  </XUIPicklist>
);

<XUIPanel footer={footer} heading={heading} sidebar={sidebar}>
  <XUIPanelSection
    className="xui-padding-large"
    headerClassName="xui-text-align-left xui-form-layout xui-padding-vertical"
    heading="Primary bank account"
  >
    <form className="xui-form-layout">
      <XUITextInput defaultValue="Jane Smith" isFieldLayout label="Account name" />
      <XUITextInput defaultValue="06-0705-0201419-000" isFieldLayout label="Account number" />
    </form>
  </XUIPanelSection>
</XUIPanel>;
```
