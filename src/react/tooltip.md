<div class="xui-margin-vertical">
	<a href="../section-building-blocks-alerts-tooltip.html" isDocLink>Tooltip in the XUI Documentation</a>
</div>

`XUITooltip` provides additional information in-line with page elements.

## Examples

### Default tooltip

The default tooltip is triggered on mouseover, and will appear centered above the trigger, if enough space is available. It is intended to contain short text, but will wrap, if necessary.

**Note:** This component wraps the trigger component and the tooltip in an inline-block element for positioning purposes. It may be helpful to add `wrapperClassName` to apply styles that were directly affecting the trigger.

```js

const XUIButton = require('./components/button/XUIButton.js').default;
const XUIIcon = require('./components/icon/XUIIcon.js').default;
const info = require('@xero/xui-icon/icons/info').default;

const createTriggerIcon = () => {
	return <XUIButton variant="icon" aria-label="More info"><XUIIcon icon={info} /></XUIButton>;
};
const createTriggerButton = () => {
	return <XUIButton size="full-width">A button</XUIButton>;
};
<div>
	<XUITooltip trigger={createTriggerIcon()}>Tooltip with all default behavior</XUITooltip>
	<XUITooltip trigger={createTriggerButton()}>Another tooltip with all default behavior</XUITooltip>
</div>

```
### Other settings

Min and max width of the tip, on-open and on-close hooks, the mix of triggering events, and preferred location of the tip are all available to be adjusted. The following is an example of a click-triggered tooltip. For focusable elements, `Enter` keyboard events will be treated as a click.

Do not use `triggerOnClick` if your trigger has it's own explicit `onClick` or `onKeyDown` props, as those handlers will take precedent, and `XUITooltip` will not open on click or keydown. The default `triggerOnHover` behaviour is ideal for these cases, but the `onOpen` and `onClose` hooks are also available to handle events in a more custom way.

```
const createTriggerLink = () => {
	return (
		<XUIButton
			isLink
			variant="unstyled"
			href="#"
			style={{textDecoration: "underline"}}
		>
			look at what we have
		</XUIButton>
	);
};
const props = {
	preferredPosition: "bottom-left",
    triggerOnClick: true,
    triggerOnHover: false,
    onOpen: () => {console.log('opening');}
};
<p>So often we avoid running water, and running water is a lot of fun. Isn&apos;t that fantastic? You can just push a little tree out of your brush like that. Look around, <XUITooltip trigger={createTriggerLink()} {...props}>Here is a tip on an inline trigger</XUITooltip>. Beauty is everywhere, you only have to look to see it.</p>

```

### Positioning

Position of the tooltip is expressed as a side of the trigger and alignment on that side, for example "right-top" would be on the right side of the trigger, with the top of the tip flush to the top of the trigger. You can also specify only a side, and the alignment will default to `center`.
If the tip won't fit in the preferred position, the following steps will be tried in this order:
* it will be flipped to the other side of the trigger
* its alignment will be adjusted to take advantage of the available space in the viewport
* it will be rotated to the perpendicular side (left/right to top/bottom or vice-versa)
* it will be placed below, as this is the best direction to expand the document, if no other option works
