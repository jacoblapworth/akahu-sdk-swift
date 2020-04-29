`XUIPopoverHeader` is an optional component that can be used to display a title, subtitle, and close
button. Assistive technologies will use the title as a label for the popover.

```js
import XUIPopover, { XUIPopoverBody, XUIPopoverHeader } from './popover';

const ExampleComponent = () => {
  const triggerRef = React.useRef();

  return (
    <React.Fragment>
      <span
        aria-owns="popover-header-example"
        ref={triggerRef}
        style={{ display: 'inline-block', height: '160px' }}
      />
      <XUIPopover id="popover-header-example" preferredPosition="right" triggerRef={triggerRef}>
        <XUIPopoverHeader
          closeButtonProps={{ ariaLabel: 'Close' }}
          onClose={() => {
            // Close the popover
          }}
          title="Popover title"
          subtitle="Step 1/3"
        />
        <XUIPopoverBody>
          Use the title to summarize the popover, and use the body to explain the details.
        </XUIPopoverBody>
      </XUIPopover>
    </React.Fragment>
  );
};

<ExampleComponent />;
```
