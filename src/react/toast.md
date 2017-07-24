### XUI Docs

<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-toast.html#toast-2">Toasts in the XUI Documentation</a></span>
	</div>
</div>

### Example configurations

Standard toasts are given a layout class by default. The close button is added when a `onCloseClick` callback prop is added.

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

Single action toasts provide an additional call to action inside the toast.
```
const onToastClose = () => {alert( 'Single action toast closed' )};

<div>
	<XUIToast>
		<XUIToastMessage> Standard </XUIToastMessage>
		<XUIToastAction href="#"> Action </XUIToastAction>
	</XUIToast>
	<XUIToast onCloseClick={onToastClose}>
		<XUIToastMessage> Closable </XUIToastMessage>
		<XUIToastAction href="#"> Action </XUIToastAction>
	</XUIToast>
</div>
```

Multi action toasts can be wrapped in a `XUIToastActions` component to provide more than one call to action.
```
const onToastClose = () => {alert( 'Multi action toast closed' )};;

<div>
	<XUIToast>
		<XUIToastMessage> Standard </XUIToastMessage>
		<XUIToastActions>
			<XUIToastAction href="#"> Action One </XUIToastAction>
			<XUIToastAction href="#"> Action Two </XUIToastAction>
		</XUIToastActions>
	</XUIToast>
	<XUIToast onCloseClick={onToastClose}>
		<XUIToastMessage> Closable </XUIToastMessage>
		<XUIToastActions>
			<XUIToastAction href="#"> Action One </XUIToastAction>
			<XUIToastAction href="#"> Action Two </XUIToastAction>
		</XUIToastActions>
	</XUIToast>
</div>
```

### Toast positioning
Use `<XUIToastWrapper />` to position toast components at the bottom-left corner of the screen. This component will ensure consistent positioning if toast positioning changes in the future.

```jsx
<XUIToastWrapper>
    <XUIToast onCloseClick={()=>{})}>
        <XUIToastMessage> Wrapper Toast </XUIToastMessage>
    </XUIToast>
</XUIToastWrapper>
```
