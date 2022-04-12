<div class="xui-margin-vertical">
	<a href="../section-components-alerts-popover.html" isDocLink>Popover in the XUI Documentation</a>
</div>

`XUIPopover` provides additional information in line with page elements. It is useful for providing
information with interactive content, such as a link to another page or an onboarding sequence.

It's important to note that `XUIPopover` and the element it is attached to (the trigger)
have a few requirements.

1. The trigger must be a focusable element or contain a focusable element.
1. XUIPopover requires an `id` that must also be added as the `aria-owns` attribute for the trigger
   element. This helps assistive technologies understand where the popover is on the page.

## Examples

### Supporting information

Popovers can be used to provide supporting information to elements on the page without having an
impact on the underlying visual layout.

These popovers open and close when the user interacts with a trigger. They also close when the user
clicks outside the popover or presses the escape key.

Triggers that open a popover when clicked need to be given the `aria-haspopup` attribute to help
assistive technologies know that there is more content available

```js
import { useState, useRef } from 'react';
import info from '@xero/xui-icon/icons/info';
import { XUIIconButton } from '@xero/xui/react/button';
import XUIPopover, { XUIPopoverBody } from '@xero/xui/react/popover';

const PopoverExample = () => {
  const triggerRef = useRef();
  const [isPopoverOpen, setIsPopoverOpen] = useState();

  const closePopover = () => setIsPopoverOpen(false);
  const togglePopover = () => setIsPopoverOpen(!isPopoverOpen);

  return (
    <>
      <XUIIconButton
        aria-haspopup
        aria-owns={isPopoverOpen && 'informational-popover'}
        ariaLabel="More information"
        icon={info}
        onClick={togglePopover}
        ref={triggerRef}
      />

      {isPopoverOpen && (
        <XUIPopover
          id="informational-popover"
          onClickOutside={closePopover}
          preferredPosition="right"
          triggerRef={triggerRef}
        >
          <XUIPopoverBody>
            <p>
              The 30 most recent transactions, including the opening balance, adjustments, and
              transactions where this item is purchased or sold.
            </p>
            <p>
              To see all transactions, go to the
              <a href="">Inventory Item Details</a> report.
            </p>
          </XUIPopoverBody>
        </XUIPopover>
      )}
    </>
  );
};

<PopoverExample />;
```

### Onboarding

Popovers used for onboarding do not close when the user clicks outside the popover, instead they
include a way to explicitly dismiss the popover, using the popover's `onClickCloseButton` prop to
achieve this when the user clicks the close button or presses the escape key inside the popover.

Once an onboarding modal has been dismissed, it should not reappear when the user comes back to the
page.

```js
import { useRef, useState } from 'react';
import XUIButton from '@xero/xui/react/button';
import XUIIllustration from '@xero/xui/react/illustration';
import XUIPopover, {
  XUIPopoverBody,
  XUIPopoverFooter,
  XUIPopoverHeader
} from '@xero/xui/react/popover';
import XUISwitch from '@xero/xui/react/switch';

const PopoverExample = () => {
  // Pre-load illustration
  const img = new Image();
  img.src = 'https://edge.xero.com/illustration/contacts-on-mobile-01/contacts-on-mobile-01.svg';

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [step, setStep] = useState(0);

  const trigger1Ref = useRef();
  const trigger2Ref = useRef();
  const trigger3Ref = useRef();

  const closePopover = () => setIsPopoverOpen(false);
  const togglePopover = () => setIsPopoverOpen(!isPopoverOpen);

  const steps = [
    {
      content: (
        <>
          <XUIPopoverHeader
            closeButtonProps={{ ariaLabel: 'Close' }}
            subtitle="1/3"
            title="Find your contacts"
          />
          <XUIPopoverBody>
            View your contacts by customers or suppliers, or create custom contact groups to suit
            your needs
          </XUIPopoverBody>
          <XUIPopoverFooter
            primaryAction={
              <XUIButton onClick={() => setStep(1)} variant="main">
                Next
              </XUIButton>
            }
          />
        </>
      ),
      preferredPosition: 'left',
      triggerRef: trigger1Ref
    },
    {
      content: (
        <>
          <XUIPopoverHeader
            closeButtonProps={{ ariaLabel: 'Close' }}
            subtitle="2/3"
            title="Import and export contacts"
          />
          <XUIPopoverBody>
            Import your contacts from another system, or export your Xero contacts and add them to
            your preferred CRM
          </XUIPopoverBody>
          <XUIPopoverFooter
            primaryAction={
              <XUIButton onClick={() => setStep(2)} variant="main">
                Next
              </XUIButton>
            }
            secondaryAction={<XUIButton onClick={() => setStep(0)}>Previous</XUIButton>}
          />
        </>
      ),
      preferredPosition: 'top',
      triggerRef: trigger2Ref
    },
    {
      content: (
        <>
          <XUIPopoverHeader
            closeButtonProps={{ ariaLabel: 'Close' }}
            subtitle="3/3"
            title="Manage your contacts"
          />
          <XUIPopoverBody>
            Carry out common tasks on individual contacts, such as edit, archive or adding to custom
            groups
            <XUIIllustration size="small" src={img.src} />
          </XUIPopoverBody>
          <XUIPopoverFooter
            primaryAction={
              <XUIButton onClick={closePopover} variant="main">
                Close
              </XUIButton>
            }
            secondaryAction={<XUIButton onClick={() => setStep(1)}>Previous</XUIButton>}
          />
        </>
      ),
      preferredPosition: 'top',
      triggerRef: trigger3Ref
    }
  ];

  return (
    <>
      <XUISwitch
        className="xui-margin-bottom-large"
        isChecked={isPopoverOpen}
        onChange={() => {
          setStep(0);
          setIsPopoverOpen(!isPopoverOpen);
        }}
      >
        View onboarding steps
      </XUISwitch>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          justifyItems: 'center'
        }}
      >
        <XUIButton
          aria-owns={isPopoverOpen && step === 0 && 'onboarding-popover'}
          ref={steps[0].triggerRef}
        >
          View contacts
        </XUIButton>
        <XUIButton
          aria-owns={isPopoverOpen && step === 1 && 'onboarding-popover'}
          ref={steps[1].triggerRef}
        >
          Import contacts
        </XUIButton>
        <XUIButton
          aria-owns={isPopoverOpen && step === 2 && 'onboarding-popover'}
          ref={steps[2].triggerRef}
        >
          Manage contacts
        </XUIButton>
      </div>
      {isPopoverOpen && (
        <XUIPopover
          id="onboarding-popover"
          preferredPosition={steps[step].preferredPosition}
          triggerRef={steps[step].triggerRef}
          onClickCloseButton={closePopover}
        >
          {steps[step].content}
        </XUIPopover>
      )}
    </>
  );
};

<PopoverExample />;
```

### Custom trigger components

XUIPopover is intended to work out of the box with interactive XUI components and DOM elements. If
you would like to use your own React component it's important to set up the refs correctly. Doing so
will allow XUIPopover to position itself correctly around the custom trigger.

#### Function components

Custom function components must [forward the ref to a DOM element](https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components).

```js
import { forwardRef, useRef } from 'react';
import XUIPopover, { XUIPopoverBody } from '@xero/xui/react/popover';

const CustomTriggerComponent = forwardRef((props, ref) => {
  return (
    <h3 ref={ref} style={{ display: 'inline' }}>
      Profit margin
    </h3>
  );
});

const PopoverExample = () => {
  const triggerRef = useRef();

  return (
    <div style={{ height: '160px' }}>
      <CustomTriggerComponent ref={triggerRef} />
      <XUIPopover id="custom-class-component-popover" triggerRef={triggerRef}>
        <XUIPopoverBody>
          The percentage of a project's income that's profit. The higher the profit margin, the more
          cost-effective a project is.
        </XUIPopoverBody>
      </XUIPopover>
    </div>
  );
};

<PopoverExample />;
```

#### Class components

Custom class components must have a ref to a DOM element that is exposed via a public `rootNode` property.

```js
import { Component, createRef, useRef } from 'react';
import XUIPopover, { XUIPopoverBody } from '@xero/xui/react/popover';

class CustomTriggerComponent extends Component {
  constructor(props) {
    super(props);
    this.rootNode = createRef();
  }

  render() {
    return (
      <h3 ref={this.rootNode} style={{ display: 'inline' }}>
        Profit margin
      </h3>
    );
  }
}

const PopoverExample = () => {
  const triggerRef = useRef();

  return (
    <div style={{ height: '160px' }}>
      <CustomTriggerComponent ref={triggerRef} />
      <XUIPopover id="custom-class-component-popover" triggerRef={triggerRef}>
        <XUIPopoverBody>
          The percentage of a project's income that's profit. The higher the profit margin, the more
          cost-effective a project is.
        </XUIPopoverBody>
      </XUIPopover>
    </div>
  );
};

<PopoverExample />;
```
