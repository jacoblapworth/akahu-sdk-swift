`XUIPopoverFooter` is an optional component that can be used to display actions for a popover.

```js
import XUIButton from './button';
import XUIPopover, { XUIPopoverBody, XUIPopoverFooter } from './popover';

const ExampleComponent = () => {
  const triggerRef = React.useRef();

  return (
    <React.Fragment>
      <span
        aria-owns="popover-footer-example"
        ref={triggerRef}
        style={{ display: 'inline-block', height: '140px' }}
      />
      <XUIPopover id="popover-footer-example" preferredPosition="right" triggerRef={triggerRef}>
        <XUIPopoverBody>Popovers can also be closed by an action button.</XUIPopoverBody>
        <XUIPopoverFooter
          primaryAction={
            <XUIButton
              onClick={() => {
                // Close the popover
              }}
              variant="primary"
            >
              Done
            </XUIButton>
          }
        />
      </XUIPopover>
    </React.Fragment>
  );
};

<ExampleComponent />;
```
