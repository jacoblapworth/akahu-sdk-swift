// Libs
import React from 'react';
import info from '@xero/xui-icon/icons/info';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import logReadyState from '../../../stories/helpers/log-ready-state';

// Components we need to test with
import XUIButton, { XUIIconButton } from '../../../button';
import XUITextInput from '../../../textinput';
import XUIPopover, { XUIPopoverBody, XUIPopoverHeader, XUIPopoverFooter } from '../../../popover';

import { variations, storyKind, variationStoryKind } from './variations';

const buildTrigger = (
  triggerText = 'trigger',
  triggerType = 'button',
  ref,
  onClick,
  triggerStyle,
) => {
  if (triggerType === 'button') {
    return (
      <div style={triggerStyle}>
        <XUIButton onClick={onClick} ref={ref}>
          {triggerText}
        </XUIButton>
      </div>
    );
  }
  if (triggerType === 'icon-button') {
    return (
      <div style={triggerStyle}>
        <XUIIconButton ariaLabel="Trigger" icon={info} onClick={onClick} ref={ref} />
      </div>
    );
  }
  if (triggerType === 'input') {
    return (
      <div className="xui-u-fullwidth" ref={ref} style={triggerStyle}>
        <XUITextInput onClick={onClick} placeholder="Placeholder" />
      </div>
    );
  }
  if (triggerType === 'text') {
    return (
      <span onClick={onClick} ref={ref} style={triggerStyle}>
        {triggerText}
      </span>
    );
  }
};

const PopoverWithTrigger = ({
  closeOnClickOutside,
  triggerText,
  triggerType,
  triggerStyle,
  ...props
}) => {
  const ref = React.useRef();
  const [isOpen, setIsOpen] = React.useState(true);

  React.useEffect(() => {
    // Wait until the popover has its final position
    setTimeout(() => {
      logReadyState('xui-popover-ready-event');
    }, 100);
  });

  return (
    <div>
      {buildTrigger(triggerText, triggerType, ref, () => setIsOpen(true), triggerStyle)}
      {isOpen && (
        <XUIPopover
          id="test"
          {...props}
          onClickOutside={() => closeOnClickOutside && setIsOpen(false)}
          triggerRef={ref}
        >
          <XUIPopoverHeader
            closeButtonProps={{ ariaLabel: 'Close' }}
            onClose={() => setIsOpen(false)}
            title="Popover title"
          />
          <XUIPopoverBody>
            Popover content that is very long, so long in fact that this text will usually wrap in a
            popover.
          </XUIPopoverBody>
          <XUIPopoverFooter
            primaryAction={<XUIButton variant="primary">Primary</XUIButton>}
            secondaryAction={<XUIButton>Secondary</XUIButton>}
          />
        </XUIPopover>
      )}
    </div>
  );
};

const Playground = props => (
  <div
    style={{
      alignItems: 'center',
      justifyItems: 'center',
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      gridTemplateRows: 'auto 1fr auto',
      height: '100%',
      left: 0,
      padding: '20px',
      position: 'absolute',
      top: 0,
      width: '100%',
    }}
  >
    {Array.from(Array(9).keys()).map(i => (
      <PopoverWithTrigger id={i.toString()} key={`trigger-with-popover${i}`} {...props} />
    ))}
  </div>
);

const storiesWithKnobs = storiesOf(storyKind, module);
storiesWithKnobs.addParameters({ layout: 'centered' });
storiesWithKnobs.add('Playground', () => (
  <Playground
    closeOnClickOutside={boolean('Close on click outside', false)}
    preferredPosition={select('Popover position', ['bottom', 'left', 'right', 'top'], 'bottom')}
    triggerText={text('Trigger text', 'Trigger')}
    triggerType={select('Trigger type', ['button', 'icon-button', 'input', 'text'], 'button')}
    width={select('Popover width', ['small', 'medium', 'large'], 'medium')}
  />
));

const storiesWithVariations = storiesOf(variationStoryKind, module);
storiesWithVariations.addParameters({ layout: 'centered' });

variations.forEach(({ storyKind, storyTitle, subVariants, ...variation }) => {
  storiesWithVariations.add(storyTitle, () => <PopoverWithTrigger {...variation} />);
});
