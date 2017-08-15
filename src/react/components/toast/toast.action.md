### Single Action

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
### Multi Action

Multi action toasts can be wrapped in a `XUIToastActions` component to provide more than one call to action. The message inside the `Toast` can also wrap larger descriptions, however this should be avoided if possible.
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
		<XUIToastMessage> Avoid long descriptions. However, it's helpful to know that text does wrap by default. </XUIToastMessage>
		<XUIToastActions>
			<XUIToastAction href="#"> Action One </XUIToastAction>
			<XUIToastAction href="#"> Action Two </XUIToastAction>
		</XUIToastActions>
	</XUIToast>
</div>
```
