### Toast Positioning

Use `XUIToastWrapper` to position toast components at the bottom-left corner of the screen. This component will ensure consistent positioning of the toast at all times.

```
const  { PureComponent } = require ( 'react' );

class Example extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			toasts: []
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
			const toastNumber = prevState.toastNumber + 1;
			return {
				toasts: [
					...prevState.toasts,
					`Toast number ${prevState.toasts.length + 1}`
				]
			}
		});
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
