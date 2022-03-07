<div class="xui-margin-vertical">
	<a href="../section-components-alerts-tooltip.html" isDocLink>Tooltip in the XUI Documentation</a>
</div>

`XUITooltip` provides additional information in-line with page elements.

## Examples

### Default tooltip

The default tooltip is triggered on mouseover, focus, or as part of a touch-press event chain, and will appear centered above the trigger, if enough space is available. It is intended to contain short text, but will wrap, if necessary.

**Note:** This component wraps the trigger component and the tooltip in an inline-block element for positioning purposes. It may be helpful to add `wrapperClassName` to apply styles that were directly affecting the trigger.

```jsx harmony
import info from '@xero/xui-icon/icons/info';
import { XUIIconButton } from '@xero/xui/react/button';
import XUITooltip from '@xero/xui/react/tooltip';

const triggerIcon = <XUIIconButton ariaLabel="More information about email address" icon={info} />;

<div>
  <XUITooltip trigger={triggerIcon}>
    Email address will be used to send e-invoices to your customer
  </XUITooltip>
</div>;
```

### Other settings

Min and max width of the tip, on-open and on-close hooks, the mix of triggering events, and preferred location of the tip are all available to be adjusted. The following is an example of a click-triggered tooltip. For focusable elements, `Enter` keyboard events will be treated as a click.

Do not use `triggerOnClick` if your trigger has it's own explicit `onClick` or `onKeyDown` props, as those handlers will take precedent, and `XUITooltip` will not open on click or keydown. The default `triggerOnHover` and `triggerOnFocus` behaviour is ideal for these cases, but the `onOpen` and `onClose` hooks are also available to handle events in a more custom way.

```jsx harmony
import XUITooltip from '@xero/xui/react/tooltip';

const handleOpen = () => {
  console.log('onOpen');
};

const inlineTrigger = (
  <span style={{ textDecoration: 'underline' }} tabIndex={0}>
    Australian business number (ABN)
  </span>
);

<p>
  Enter or update other basic information for your organisation such as
  <XUITooltip
    onOpen={handleOpen}
    preferredPosition="bottom-left"
    trigger={inlineTrigger}
    triggerOnClick={true}
    triggeronHover={false}
  >
    The 11-digit number that's issued by the ATO
  </XUITooltip>, address and organisation type.
</p>;
```

### Positioning

Position of the tooltip is expressed as a side of the trigger and alignment on that side, for example "right-top" would be on the right side of the trigger, with the top of the tip flush to the top of the trigger. You can also specify only a side, and the alignment will default to `center`.
If the tip won't fit in the preferred position, the following steps will be tried in this order:

- it will be flipped to the other side of the trigger
- its alignment will be adjusted to take advantage of the available space in the viewport
- it will be rotated to the perpendicular side (left/right to top/bottom or vice-versa)
- it will be placed below, as this is the best direction to expand the document, if no other option works

### Custom trigger components

XUITooltip is intended to work out of the box with XUI components and DOM elements. If you would like to use your own React component it's important to set the refs up correctly. Doing so will allow the tooltip to position itself correctly around the trigger.

#### Function components

Custom function components must [forward the ref to a DOM element](https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components).

```jsx harmony
import { forwardRef } from 'react';
import XUITooltip from '@xero/xui/react/tooltip';

const CustomFunctionComponent = forwardRef((props, ref) => {
  return (
    <span
      onBlur={() => {
        props.onBlur();
      }}
      onFocus={() => {
        props.onFocus();
      }}
      ref={ref}
      style={{ textDecoration: 'underline' }}
      tabIndex={0}
    >
      Australian business number (ABN)
    </span>
  );
});

<div>
  Enter or update other basic information for your organisation such as
  <XUITooltip trigger={<CustomFunctionComponent />}>
    The 11-digit number that's issued by the ATO
  </XUITooltip>, address and organisation type.
</div>;
```

#### Class components

Custom class components must have a ref to a DOM element that is exposed via a public `rootNode` property.

```jsx harmony
import { Component, createRef } from 'react';
import XUITooltip from '@xero/xui/react/tooltip';

class CustomClassComponent extends Component {
  constructor(props) {
    super(props);
    this.rootNode = createRef();
  }

  render() {
    return (
      <span
        onBlur={() => {
          this.props.onBlur();
        }}
        onFocus={() => {
          this.props.onFocus();
        }}
        ref={this.rootNode}
        style={{ textDecoration: 'underline' }}
        tabIndex={0}
      >
        Australian business number (ABN)
      </span>
    );
  }
}

<div>
  Enter or update other basic information for your organisation such as
  <XUITooltip trigger={<CustomClassComponent />}>
    The 11-digit number that's issued by the ATO
  </XUITooltip>, address and organisation type.
</div>;
```
