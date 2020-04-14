// Libs
import React from 'react';
import info from '@xero/xui-icon/icons/info';

// Components we need to test with
import XUIButton, { XUIIconButton } from '../../../button';
import XUITextInput from '../../../textinput';
import XUIPopover, { XUIPopoverBody, XUIPopoverHeader, XUIPopoverFooter } from '../../../popover';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

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

  return (
    <div>
      {buildTrigger(triggerText, triggerType, ref, () => setIsOpen(true), triggerStyle)}
      {isOpen && (
        <XUIPopover
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

const Playground = props => {
  return (
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
};

const storiesWithKnobs = storiesOf(storyKind, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
  return (
    <Playground
      closeOnClickOutside={boolean('Close on click outside', false)}
      preferredPosition={select('Popover position', ['bottom', 'left', 'right', 'top'], 'bottom')}
      triggerText={text('Trigger text', 'Trigger')}
      triggerType={select('Trigger type', ['button', 'icon-button', 'input', 'text'], 'button')}
      width={select('Popover width', ['small', 'medium', 'large'], 'medium')}
    />
  );
});

const storiesWithVariations = storiesOf(variationStoryKind, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(({ storyKind, storyTitle, subVariants, ...variation }) => {
  storiesWithVariations.add(storyTitle, () => <PopoverWithTrigger {...variation} />);
});
