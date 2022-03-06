`XUIPopoverFooter` is an optional component that can be used to display actions for a popover.

```js
import { useRef, useState } from 'react';
import info from '@xero/xui-icon/icons/info';
import XUIButton, { XUIIconButton } from '@xero/xui/react/button';
import XUIPopover, { XUIPopoverBody, XUIPopoverFooter } from '@xero/xui/react/popover';

const PopoverExample = () => {
  const triggerRef = useRef();
  const [isPopoverOpen, setIsPopoverOpen] = useState(true);

  const closePopover = () => setIsPopoverOpen(false);
  const togglePopover = () => setIsPopoverOpen(!isPopoverOpen);

  return (
    <div style={{ alignItems: 'center', display: 'flex', height: '180px' }}>
      <XUIIconButton
        aria-haspopup
        aria-owns={isPopoverOpen && 'popover-footer-example'}
        icon={info}
        onClick={togglePopover}
        ref={triggerRef}
      />
      {isPopoverOpen && (
        <XUIPopover id="popover-footer-example" preferredPosition="right" triggerRef={triggerRef}>
          <XUIPopoverBody>
            The percentage of a project's income that's profit. The higher the profit margin, the
            more cost-effective a project is.
          </XUIPopoverBody>
          <XUIPopoverFooter
            primaryAction={
              <XUIButton onClick={closePopover} variant="main">
                Close
              </XUIButton>
            }
          />
        </XUIPopover>
      )}
    </div>
  );
};

<PopoverExample />;
```
