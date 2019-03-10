### Toast Positioning & Timeouts

Use `XUIToastWrapper` to position toast components at the bottom-left corner of the screen. This component will ensure consistent positioning of the toast at all times.

This example of `XUIToastWrapper` defines a `timeoutToast` method to dismiss the toast after 10 seconds. It shows a maximum of 2 toasts at a time. It also uses the `onMouseOver` and `onMouseLeave` methods of `XUIToast` to keep the toast open if it is hovered over (or if the user focuses an element inside the toast), and close it 10 seconds after the cursor leaves.

Make sure to give users enough time to trigger toast actions via keyboard navigation. If the inability to trigger an action is detrimental to the user, you should consider not using any timeout at all and instead relying on an action to close the toast.

```js
import { PureComponent } from 'react';
import XUIToast, { XUIToastWrapper, XUIToastMessage } from '../../toast';
import XUIButton from '../../button';

const TOAST_TIMEOUT = 10000;
const MAX_TOASTS = 2;

class Example extends PureComponent {
	constructor(...args) {
		super(...args);

		this._toastCounter = 0;

		this.state = {
			toasts: [],
			timerHandles: []
		};
		this.removeToast = this.removeToast.bind(this);
		this.addToast = this.addToast.bind(this);
		this.addToastTimeout = this.addToastTimeout.bind(this);
		this.stopToastTimeout = this.stopToastTimeout.bind(this);
		this.timeoutToast = this.timeoutToast.bind(this);
	}

	removeToast(toastToRemove) {
		this.setState(prevState => ({
			toasts: prevState.toasts.filter(toast => toast !== toastToRemove)
		}));
	}

	addToast() {
		this.setState(prevState => {
			const toastName = `Toast number ${++this._toastCounter}`;
			const handles = {
				...prevState.timerHandles,
				[toastName]: this.timeoutToast(toastName, TOAST_TIMEOUT)
			};

			return {
				toasts: [...prevState.toasts.slice(-MAX_TOASTS + 1), toastName],
				timerHandles: handles
			};
		});
	}

	addToastTimeout(toastToClose) {
		const handle = setTimeout(() => this.removeToast(toastToClose), TOAST_TIMEOUT)
		this.setState(prevState => {
			const handles = {
				...prevState.timerHandles,
				[toastToClose]: handle
			};
			return {
				timerHandles: handles
			};
		});
	}

	timeoutToast(toastToClose, delay) {
		return setTimeout(() => this.removeToast(toastToClose), delay);
	}

	stopToastTimeout(toast){
		clearTimeout(this.state.timerHandles[toast]);
	}

	render() {
		return (
			<div>
				<XUIButton onClick={this.addToast}>Add a toast</XUIButton>
				<XUIToastWrapper>
					{
						this.state.toasts.map((toast, idx) =>
							<XUIToast
								onCloseClick={() => this.removeToast(toast)}
								key={idx}
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
