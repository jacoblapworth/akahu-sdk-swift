`XUIPopoverHeader` is an optional component that can be used to display a title, subtitle, and close
button. Assistive technologies will use the title as a label for the popover.

```js
import { useRef, useState } from 'react';
import info from '@xero/xui-icon/icons/info';
import XUIButton, { XUIIconButton } from '@xero/xui/react/button';
import XUIPopover, {
  XUIPopoverBody,
  XUIPopoverFooter,
  XUIPopoverHeader
} from '@xero/xui/react/popover';

const PopoverExample = () => {
  const triggerRef = useRef();
  const [isPopoverOpen, setIsPopoverOpen] = useState(true);

  const closePopover = () => setIsPopoverOpen(false);
  const togglePopover = () => setIsPopoverOpen(!isPopoverOpen);

  return (
    <div style={{ alignItems: 'center', display: 'flex', height: '220px' }}>
      <XUIIconButton
        aria-haspopup
        aria-owns={isPopoverOpen && 'popover-header-example'}
        ariaLabel="More information"
        icon={info}
        onClick={togglePopover}
        ref={triggerRef}
      />
      {isPopoverOpen && (
        <XUIPopover id="popover-header-example" preferredPosition="right" triggerRef={triggerRef}>
          <XUIPopoverHeader
            closeButtonProps={{ ariaLabel: 'Close' }}
            onClose={closePopover}
            subtitle="1/3"
            title="Find your contacts"
          />
          <XUIPopoverBody>
            View your contacts by customers or suppliers, or create custom contact groups to suit
            your needs
          </XUIPopoverBody>
          <XUIPopoverFooter
            primaryAction={
              <XUIButton onClick={() => console.log('onClick')} variant="main">
                Next
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
