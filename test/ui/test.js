import 'babel-core/external-helpers.js';
import React from 'react';
import XUISwitch from '../../src/XUISwitch.js';

import '../../bower_components/component-renderer/src/renderer.styles.scss';

import {default as RendererUtils} from 'component-renderer';

const SwitchModel = (checked, disabled) => ({disabled, checked});

(function() {

	const XUISwitchConfig = {
		componentName : 'XUISwitch',
		devReady : true,
		properties : [
			{
				name: 'disabled',
				type: 'boolean',
				default: false,
				description: 'Sets the switch to enabled or disabled'
			},
			{
				name: 'checked',
				type: 'boolean',
				default: false,
				description: 'Sets the switch to be checked or unchecked (on or off)'
			},
			{
				name: 'onChange',
				type: 'function',
				default: function(){},
				description: 'Bind a function to fire when the Switch state changes'
			},
			{
				name: 'value',
				type: 'text',
				default: '',
				description: 'Optional value for the input'
			},
			{
				name: 'name',
				type: 'text',
				default: '',
				description: 'Optional name for the input'
			}
		]
	};



	const ExampleConfig = {
		componentName : 'Example',
		devReady : true,
		properties : [...XUISwitchConfig.properties]
	};

	class Example extends React.Component {

		constructor(props) {
			super(props);

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

		componentDidUpdate(prevProps) {
			Object.keys(prevProps).forEach(propName => {
				if (this.props[propName] !== prevProps[propName]) {
					this.setState({
						[propName]: this.props[propName]
					});
				}
			});
		}

		render () {
			const { switch1, switch2, switch3 } = this.state;
			return (
				<div>
					<XUISwitch
						checked={switch1.checked}
						disabled={switch1.disabled}
						onChange={this.handleSwitch.bind(this, 'switch1')}
						value='someValue'
						name='someName'/>
					<XUISwitch
						checked={switch2.checked}
						disabled={switch2.disabled}
						onChange={this.handleSwitch.bind(this, 'switch2')}
						value='someValue'
						name='someName'/>
					<XUISwitch
						checked={switch3.checked}
						disabled={switch3.disabled}
						onChange={this.handleSwitch.bind(this, 'switch3')}
						value='someValue'
						name='someName'/>
				</div>
			)

		}

	}

	RendererUtils.init({
		components : {
			Example,
			XUISwitch
		},
		configs : {
			ExampleConfig,
			XUISwitchConfig
		},
		defaultComponent : Example,
		defaultConfig: ExampleConfig
	});

})();
