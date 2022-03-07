`XUIPopoverBody` is the only required subcomponent for the popover. Assistive technologies will use
the body as a description for the popover. If a popover does not have a close button, then it should close when the user clicks outside the popover.

```js
import { useRef, useState } from 'react';
import info from '@xero/xui-icon/icons/info';
import { XUIIconButton } from '@xero/xui/react/button';
import XUIPopover, { XUIPopoverBody } from '@xero/xui/react/popover';

const PopoverExample = () => {
  const triggerRef = useRef();
  const [isPopoverOpen, setIsPopoverOpen] = useState(true);

  const togglePopover = () => setIsPopoverOpen(!isPopoverOpen);

  return (
    <div style={{ alignItems: 'center', display: 'flex', height: '100px' }}>
      <XUIIconButton
        aria-haspopup
        aria-owns={isPopoverOpen && 'popover-body-example'}
        ariaLabel="More information"
        icon={info}
        onClick={togglePopover}
        ref={triggerRef}
      />
      {isPopoverOpen && (
        <XUIPopover
          id="popover-body-example"
          onClickOutside={() => {
            // Close the popover
          }}
          preferredPosition="right"
          triggerRef={triggerRef}
        >
          <XUIPopoverBody>
            To better understand and visualise your profit and loss in Projects, setup your
            <a href="">staff cost rates</a>
          </XUIPopoverBody>
        </XUIPopover>
      )}
    </div>
  );
};

<PopoverExample />;
```
