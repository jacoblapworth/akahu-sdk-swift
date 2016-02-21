import 'babel-core/external-helpers.js';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import XUISwitch from '../../src/XUISwitch.js';

const SwitchModel = (checked, disabled) => ({disabled, checked});

class FakeApp extends Component {

	constructor() {
		super();

		this.state = {
			// Sets default disabled for this switch example
			switch1 : new SwitchModel(true, false),
			switch2 : new SwitchModel(false, false),
			switch3 : new SwitchModel(true, true),
			switch4 : new SwitchModel(false, false)
		};
	}

	handleSwitch(thisSwitch, event) {

		const checked = !this.state[thisSwitch].checked;

		this.setState({
			[thisSwitch] : {
				checked
			}
		}, () => {
			if (thisSwitch === 'switch4') {

				const newState = {...this.state};

				newState.switch1.disabled = checked;
				newState.switch2.disabled = checked;
				newState.switch3.disabled = checked;

				this.setState(newState);
			}
		});
	}

	render() {

		console.log(this.state);
		const { switch1, switch2, switch3, switch4 } = this.state;

		return (

			<div>
				<XUISwitch
					checked={switch1.checked}
					disabled={switch1.disabled}
					onChange={this.handleSwitch.bind(this, 'switch1')}
					value='someValue'
					name='someName'></XUISwitch>
				<XUISwitch
					checked={switch2.checked}
					disabled={switch2.disabled}
					onChange={this.handleSwitch.bind(this, 'switch2')}
					value='someValue'
					name='someName'></XUISwitch>
				<XUISwitch
					checked={switch3.checked}
					disabled={switch3.disabled}
					onChange={this.handleSwitch.bind(this, 'switch3')}
					value='someValue'
					name='someName'></XUISwitch>

				<h1>Disable all the things</h1>

				<XUISwitch
					checked={switch4.checked}
					disabled={switch4.disabled}
					onChange={this.handleSwitch.bind(this, 'switch4')}
					value='someValue'
					name='someName'></XUISwitch>
			</div>
		);
	}
}

(function() {

	ReactDOM.render(
		<FakeApp />,
		document.getElementById('app')
	);

})();
