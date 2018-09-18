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

		this.state = {
			secondSwitch: true,
		};
	}

	render() {
		return (
			<div>
				<h3>Click the switch</h3>
				<div className="xui-margin-bottom">
					<XUISwitch
						isChecked
						onChange={() => this.setState(prevState => ({ secondSwitch: !prevState.secondSwitch }))}
					>
						Enabled switch
					</XUISwitch>
				</div>
				<div>
					<XUISwitch
						isDisabled
						isChecked={this.state.secondSwitch}
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
