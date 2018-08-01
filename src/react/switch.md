<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-blobicon xui-blobicon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-building-blocks-controls-switch.html">Switch in the XUI Documentation</a>
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
			isChecked: true,
		};
	}

	render() {
		return (
			<div>
				<h3>Click the switch</h3>
				<div className="xui-margin-bottom">
					<XUISwitch
						isChecked={this.state.isChecked}
						onChange={() => this.setState(prevState => ({ isChecked: !prevState.isChecked }))}
					>
						Enabled switch
					</XUISwitch>
				</div>
				<div>
					<XUISwitch
						isDisabled
						isChecked={this.state.isChecked}
						onChange={NOOP}
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
