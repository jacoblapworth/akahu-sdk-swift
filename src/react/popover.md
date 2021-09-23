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

These popovers should open and close when the user interacts with a trigger. They should also close
when the user clicks outside the popover.

Triggers that open a popover when clicked need to be given the `aria-haspopup` attribute to help
assistive technologies know that there is more content available

```js
import XUIButton from './button';
import XUIPopover, { XUIPopoverBody } from './popover';

const ExampleComponent = () => {
  const triggerRef = React.useRef();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState();

  const closePopover = () => setIsPopoverOpen(false);
  const openPopover = () => setIsPopoverOpen(true);
  const togglePopover = () => setIsPopoverOpen(!isPopoverOpen);

  return (
    <React.Fragment>
      <XUIButton
        aria-haspopup
        aria-owns={isPopoverOpen && 'informational-popover'}
        onClick={togglePopover}
        ref={triggerRef}
      >
        Toggle a popover
      </XUIButton>
      {isPopoverOpen && (
        <XUIPopover
          id="informational-popover"
          onClickOutside={closePopover}
          preferredPosition="right"
          triggerRef={triggerRef}
        >
          <XUIPopoverBody>
            This popover can be opened and closed by clicking the trigger, and can be closed by
            clicking outside the popover.
            <a href="#popover">Popovers with interactive content</a> are also accessible via the keyboard.
          </XUIPopoverBody>
        </XUIPopover>
      )}
    </React.Fragment>
  );
};

<ExampleComponent />;
```

### Onboarding

Popovers used for onboarding should not close when the user clicks outside the popover, instead they
should include a way to explicitly dismiss the popover. The example below makes use of
`XUIPopoverHeader`'s close button to achieve this.

Once an onboarding modal has been dismissed, it should not reappear when the user comes back to the
page.

```js
import XUIButton from './button';
import XUISwitch from './switch';
import XUIIllustration from './illustration';
import XUIPopover, { XUIPopoverBody, XUIPopoverFooter, XUIPopoverHeader } from './popover';

const ExampleComponent = () => {
  // Pre-load illustration
  const img = new Image();
  img.src =
    'https://edge.xero.com/illustration/scene/detectives-power_plug-01/detectives-power_plug-01.svg';

  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);

  const trigger1Ref = React.useRef();
  const trigger2Ref = React.useRef();
  const trigger3Ref = React.useRef();

  const steps = [
    {
      preferredPosition: 'left',
      triggerRef: trigger1Ref,
      content: (
        <React.Fragment>
          <XUIPopoverHeader
            closeButtonProps={{ ariaLabel: 'Close', onClick: () => setIsPopoverOpen(false) }}
            subtitle="Step 1/3"
            title="Welcome to Doc Packs"
          />
          <XUIPopoverBody>
            Here is some copy on some new feature. Do this new thing and then you can do another
            thing.
          </XUIPopoverBody>
          <XUIPopoverFooter
            primaryAction={
              <XUIButton onClick={() => setStep(1)} variant="main">
                Next
              </XUIButton>
            }
          />
        </React.Fragment>
      )
    },
    {
      preferredPosition: 'top',
      triggerRef: trigger2Ref,
      content: (
        <React.Fragment>
          <XUIPopoverHeader
            closeButtonProps={{ ariaLabel: 'Close', onClick: () => setIsPopoverOpen(false) }}
            subtitle="Step 2/3"
            title="Sign document"
          />
          <XUIPopoverBody>
            Here is some copy on some new feature. Do this new thing and then you can do another
            thing.
          </XUIPopoverBody>
          <XUIPopoverFooter
            primaryAction={
              <XUIButton onClick={() => setStep(2)} variant="main">
                Next
              </XUIButton>
            }
            secondaryAction={<XUIButton onClick={() => setStep(0)}>Previous</XUIButton>}
          />
        </React.Fragment>
      )
    },
    {
      triggerRef: trigger3Ref,
      content: (
        <React.Fragment>
          <XUIPopoverHeader
            closeButtonProps={{ ariaLabel: 'Close', onClick: () => setIsPopoverOpen(false) }}
            subtitle="Step 3/3"
            title="Connect to E-Sign"
          />
          <XUIPopoverBody>
            Here is some copy on some new feature. This is the last thing to do.
            <XUIIllustration size="small" src={img.src} />
          </XUIPopoverBody>
          <XUIPopoverFooter
            primaryAction={
              <XUIButton onClick={() => setIsPopoverOpen(false)} variant="main">
                Done
              </XUIButton>
            }
            secondaryAction={<XUIButton onClick={() => setStep(1)}>Previous</XUIButton>}
          />
        </React.Fragment>
      )
    }
  ];

  return (
    <React.Fragment>
      <XUISwitch
        className="xui-margin-bottom-large"
        isChecked={isPopoverOpen}
        onChange={() => {
          setStep(0);
          setIsPopoverOpen(!isPopoverOpen);
        }}
      >
        Onboarding
      </XUISwitch>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', justifyItems: 'center' }}
      >
        <XUIButton
          aria-owns={isPopoverOpen && step === 0 && 'onboarding-popover'}
          ref={steps[0].triggerRef}
        >
          First step
        </XUIButton>
        <XUIButton
          aria-owns={isPopoverOpen && step === 1 && 'onboarding-popover'}
          ref={steps[1].triggerRef}
        >
          Second step
        </XUIButton>
        <XUIButton
          aria-owns={isPopoverOpen && step === 2 && 'onboarding-popover'}
          ref={steps[2].triggerRef}
        >
          Third step
        </XUIButton>
      </div>
      {isPopoverOpen && (
        <XUIPopover
          id="onboarding-popover"
          preferredPosition={steps[step].preferredPosition}
          triggerRef={steps[step].triggerRef}
        >
          {steps[step].content}
        </XUIPopover>
      )}
    </React.Fragment>
  );
};

<ExampleComponent />;
```

### Custom trigger components

XUIPopover is intended to work out of the box with interactive XUI components and DOM elements. If
you would like to use your own React component it's important to set up the refs correctly. Doing so
will allow XUIPopover to position itself correctly around the custom trigger.

#### Function components

Custom function components must [forward the ref to a DOM element](https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components).

```js
import XUIPopover, { XUIPopoverBody } from './popover';

const CustomTriggerComponent = React.forwardRef((props, ref) => {
  return <span ref={ref}>This is a custom function component</span>;
});

const ExampleComponent = () => {
  const triggerRef = React.useRef();

  return (
    <div style={{ height: '120px' }}>
      <CustomTriggerComponent ref={triggerRef} />
      <XUIPopover id="custom-class-component-popover" triggerRef={triggerRef}>
        <XUIPopoverBody>
          This popover is making use of the trigger's forwarded ref to position itself.
        </XUIPopoverBody>
      </XUIPopover>
    </div>
  );
};

<ExampleComponent />;
```

#### Class components

Custom class components must have a ref to a DOM element that is exposed via a public `rootNode` property.

```js
import XUIPopover, { XUIPopoverBody } from './popover';

class CustomTriggerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.rootNode = React.createRef();
  }

  render() {
    return <span ref={this.rootNode}>This is a custom class component.</span>;
  }
}

const ExampleComponent = () => {
  const triggerRef = React.useRef();

  return (
    <div style={{ height: '120px' }}>
      <CustomTriggerComponent ref={triggerRef} />
      <XUIPopover id="custom-class-component-popover" triggerRef={triggerRef}>
        <XUIPopoverBody>
          This popover is making use of the trigger's rootNode property to position itself.
        </XUIPopoverBody>
      </XUIPopover>
    </div>
  );
};

<ExampleComponent />;
```
