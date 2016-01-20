import 'babel-core/external-helpers.js';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import XUISwitch from '../../src/XUISwitch.js';

class FakeApp extends Component {

	constructor() {
		super();

		this.state = {
			// Sets default disabled for this switch example
			switchEnabled : false
		};
	}

	handleSwitch(event) {
		console.log('Switch triggered', event, this.state.switchEnabled);

		const switchEnabled = !this.state.switchEnabled;

		this.setState({
			switchEnabled
		});
	}

	render() {
		return (
			<XUISwitch
				isEnabled={this.state.switchEnabled}
				onChange={this.handleSwitch.bind(this)}
				value='someValue'
				name='someName'></XUISwitch>
		);
	}
}

(function() {

	ReactDOM.render(
		<FakeApp />,
		document.getElementById('app')
	);

})();
