### Toast Actions

A wrapper to provide the default layout of toast actions. Managed internally by default in the newer api using `primaryAction` and `secondaryAction` on the `<XUIToast />` component.


### Toast Action

Actions are used in place of regular buttons

Option 1 : Wrapper is applied automatically
```
const XUIToastAction = require('./XUIToastAction').default;
const onToastClose = () => {alert( 'Single action toast closed' )};

<div>
	<XUIToast
		message="Option 1"
		qaHook="toast-example"
		onCloseClick={onToastClose}
		primaryAction={
			<XUIToastAction href="#" qaHook="toast-example--action">
				Action 1
			</XUIToastAction>
		}
		secondaryAction={
			<XUIToastAction href="#" qaHook="toast-example--action-2">
				Action 2
			</XUIToastAction>
		} />
</div>
```

Option 2 : (Deprecated) Use it manually
```
const XUIToastAction = require('./XUIToastAction').default;
const onToastClose = () => {alert( 'Single action toast closed' )};

<div>
	<XUIToast qaHook="toast-example" onCloseClick={onToastClose}>
		<XUIToastMessage>Message</XUIToastMessage>
		<XUIToastActions>
			<XUIToastAction href="#" qaHook="toast-example--action">
				Action 1
			</XUIToastAction>
			<XUIToastAction href="#" qaHook="toast-example--action- 2">
				Action 2
			</XUIToastAction>
		</XUIToastActions>
	</XUIToast>
</div>
```

Option 3 : Applied automatically when using actions prop
```
const XUIToastAction = require('./XUIToastAction').default;
const onToastClose = () => {alert( 'Single action toast closed' )};

<div>
	<XUIToast
		qaHook="toast-example"
		onCloseClick={onToastClose}
		actions={[
			<XUIToastAction
				href="#"
				qaHook="toast-example--action"
				key="action-1">
				Action 1
			</XUIToastAction>,
			<XUIToastAction
				href="#"
				qaHook="toast-example--action-2"
				key="action-2">
				Action 2
			</XUIToastAction>
		]}>
		<XUIToastMessage>Message</XUIToastMessage>
	</XUIToast>
</div>
```
