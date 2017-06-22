## Related

* [Checkbox](#checkbox)
* [Radio](#radio)

```
const { PureComponent } = require('react');

const NOOP = () => {};

class Example extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			a: false,
			b: true,
			c: false
		};
	}

	render() {
		return (
			<div className="xui-page-width-standard xui-margin-top">
				<div className="xui-margin-bottom-small">
					<XUISwitch checked={this.state.a} onChange={() => this.setState(prevState => ({ a: !prevState.a }))} />
				</div>
				<div className="xui-margin-bottom-small">
					<XUISwitch checked={this.state.b} onChange={() => this.setState(prevState => ({ b: !prevState.b }))} />
				</div>
				<div className="xui-margin-bottom-small">
					<XUISwitch checked={this.state.c} onChange={() => this.setState(prevState => ({ c: !prevState.c }))} />
				</div>
				<div className="xui-margin-bottom-small">
					<XUISwitch disabled onChange={NOOP} />Disabled
				</div>
				<div className="xui-margin-bottom-small">
					<XUISwitch disabled checked onChange={NOOP} />Disabled &amp; Checked
				</div>
			</div>
		);
	}
}

<Example />
```
