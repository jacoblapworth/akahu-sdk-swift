A Switch uses an HTML checkbox under the hood.

<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-switch.html#switch">Switch in the XUI Documentation</a></span>
	</div>
</div>

```
const { PureComponent } = require('react');

const NOOP = () => {};

class Example extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			checked: true,
		};
	}

	render() {
		return (
			<div>
				<h3>Click the switch</h3>
				<div className="xui-margin-bottom">
					<XUISwitch checked={this.state.checked} onChange={() => this.setState(prevState => ({ checked: !prevState.checked }))} />
				</div>
				<div>
					<XUISwitch disabled checked={this.state.checked} onChange={NOOP} />
				</div>
			</div>
		);
	}
}

<Example />
```
