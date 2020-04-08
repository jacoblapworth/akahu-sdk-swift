`XUIPopoverBody` is the only required subcomponent for the popover. Assistive technologies will use
the body as a description for the popover.

```js
import XUIPopover, { XUIPopoverBody } from './popover';

const ExampleComponent = () => {
  const triggerRef = React.useRef();

  return (
    <React.Fragment>
      <span
        aria-owns="popover-body-example"
        ref={triggerRef}
        style={{ display: 'inline-block', height: '120px' }}
      />
      <XUIPopover
        id="popover-body-example"
        onClickOutside={() => {
          // Close the popover
        }}
        preferredPosition="right"
        triggerRef={triggerRef}
      >
        <XUIPopoverBody>
          If a popover does not have a close button, then it should close when the user clicks
          outside the popover.
        </XUIPopoverBody>
      </XUIPopover>
    </React.Fragment>
  );
};

<ExampleComponent />;
```
