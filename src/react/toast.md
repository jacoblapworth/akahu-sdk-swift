### XUI Docs

<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-toast.html#toast-2">Toasts in the XUI Documentation</a></span>
	</div>
</div>

## Examples

### Default Layout

`XUIToast` is given a layout class by default with no actionable buttons. The close button is only added when a `onCloseClick` callback prop is added.

```
const onToastClose = () => {alert( 'Standard toast closed' )};

<div>
	<XUIToast>
		<XUIToastMessage> System Message </XUIToastMessage>
	</XUIToast>
	<XUIToast onCloseClick={onToastClose}>
		<XUIToastMessage> Standard </XUIToastMessage>
	</XUIToast>
</div>
```

### Toast Positioning

Use `XUIToastWrapper` to position toast components at the bottom-left corner of the screen. This component will ensure consistent positioning if toast positioning changes in the future.

```jsx
const NOOP = () => {};

<XUIToastWrapper>
    <XUIToast onCloseClick={NOOP}>
        <XUIToastMessage> Wrapper Toast </XUIToastMessage>
    </XUIToast>
</XUIToastWrapper>
```
