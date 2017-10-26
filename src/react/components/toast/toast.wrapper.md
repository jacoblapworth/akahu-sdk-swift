### Toast Positioning

Use `XUIToastWrapper` to position toast components at the bottom-left corner of the screen. This component will ensure consistent positioning of the toast at all times.

This example of `XUIToastWrapper` defines a `timeoutToast` method to dismiss the toast after 2 seconds. It also uses the `onMouseOver` and `onMouseLeave` methods of `XUIToast` to keep the toast open if it is hovered over, and close it 2 seconds after the cursor leaves.

```
const  { PureComponent } = require ( 'react' );

class Example extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			toasts: [],
			timePeriod: 2000,
			timerHandles: []
		};
		this.removeToast = this.removeToast.bind(this);
		this.addToast = this.addToast.bind(this);
	}

	removeToast(toastToRemove) {
		this.setState(prevState => ({
			toasts: prevState.toasts.filter(toast => toast !== toastToRemove)
		}));
	}

	addToast() {
		this.setState(prevState => {
			const toastName = `Toast number ${prevState.toasts.length + 1}`
			const contents = [...prevState.toasts, toastName]
			const handles = {
				...prevState.timerHandles,
				[toastName]: this.timeoutToast(toastName, this.state.timePeriod)
			}

			 return {
				toasts: contents,
				timerHandles: handles
			}
		});
	}

	addToastTimeout(toastToClose) {
		const handle = setTimeout(() => this.removeToast(toastToClose), this.state.timePeriod)
		this.setState(prevState => {
			const handles = {
				...prevState.timerHandles,
				[toastToClose]: handle
			}
			return {
				timerHandles: handles
			}
		})
	}

	timeoutToast(toastToClose, delay) {
		return setTimeout(() => this.removeToast(toastToClose), delay)
	}

	stopToastTimeout(toast){
		clearTimeout(this.state.timerHandles[toast])
	}

	render() {
		return (
			<div>
				<XUIButton onClick={this.addToast}>Add a toast</XUIButton>
				<XUIToastWrapper>
					{
						this.state.toasts.map(toast =>
							<XUIToast
								onCloseClick={() => this.removeToast(toast)}
								key={toast}
								onMouseOver={() => this.stopToastTimeout(toast)}
								onMouseLeave={() => this.addToastTimeout(toast)}
							>
								<XUIToastMessage>
									{toast}
								</XUIToastMessage>
							</XUIToast>
						)
					}
				</XUIToastWrapper>
			</div>
		);
	}
}

<Example />
```
