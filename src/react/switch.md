<div class="xui-margin-vertical">
	<a href="../section-building-blocks-controls-switch.html" isDocLink>Switch in the XUI Documentation</a>
</div>

`XUISwitch` uses an HTML checkbox under the hood and can be styled just as other control components.

## Example

```
const { PureComponent } = require('react');

const NOOP = () => {};

class Example extends PureComponent {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.state = {
			isSecondSwitchChecked: true,
		};
	}

	onChange() {
		this.setState(prevState => ({ isSecondSwitchChecked: !prevState.isSecondSwitchChecked }));
	}

	render() {
		return (
			<div>
				<h3>Click the switch</h3>
				<div className="xui-margin-bottom">
					<XUISwitch
						isDefaultChecked={true}
						onChange={this.onChange}
					>
						Enabled switch
					</XUISwitch>
				</div>
				<div>
					<XUISwitch
						isDisabled
						isChecked={this.state.isSecondSwitchChecked}
					>
						Disabled switch
					</XUISwitch>
				</div>
			</div>
		);
	}
}

<Example />
```
