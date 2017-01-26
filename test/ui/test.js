import 'babel-core/external-helpers.js';
import React from 'react';
import XUIToggle, {XUIToggleOption} from '../../index.js';

import '../../bower_components/component-renderer/src/renderer.styles.scss';

import RendererUtils from 'component-renderer'

const shared = {
	name: 'toggle-checkbox',
	onChange: () => {alert('Hello, World!')},
	type: 'checkbox'
};

(function() {

	const XUIToggleConfig = {
		componentName : 'XUIToggle',
		devReady : true,
		properties :  [
			{
				name: 'className',
				type: 'string',
				default: null,
				description: 'Additional classes to apply to the root node.'
			},
			{
				name: 'qaHook',
				type: 'string',
				default: null,
				description: 'The automation ID to apply to the root node.'
			},
			{
				name: 'color',
				type: 'string',
				default: 'standard',
				description: 'The color of the toggle, standard (default) Dark text on light backgroundinverted Light text on dark background (parent must use xui-text-inverted).'
			},
			{
				name: 'layout',
				type: 'string',
				default: 'fullwidth',
				description: 'The layout of the toggle, fullwidth (default) Suitable for mixed label content icon Suitable for icon toolbars only.'
			}
		]
	};

	const XUIToggleOptionConfig = {
		componentName : 'XUIToggle',
		devReady : true,
		properties :  [
			{
				name: 'className',
				type: 'string',
				default: null,
				description: 'Additional classes to apply to the root node.'
			},
			{
				name: 'qaHook',
				type: 'string',
				default: null,
				description: 'The automation ID to apply to the root node.'
			},
			{
				name: 'isChecked',
				type: 'boolean',
				default: true,
				description: 'The input is selected.'
			},
			{
				name: 'isDisabled',
				type: 'boolean',
				default: false,
				description: ' The input is disabled.'
			},
			{
				name: 'isRequired',
				type: 'string',
				default: 'yo',
				description: 'The input is required for form submission.'
			},
			{
				name: 'name',
				type: 'string',
				default: '',
				description: ' The name to use as a reference for the value.'
			},
			{
				name: 'onChange',
				type: 'function',
				default: function(){},
				description: 'The function to call when the control changes state.'
			},
			{
				name: 'type',
				type: 'string',
				default: 'radio',
				description: 'The type of the input: radio (default) or checkbox.'
			},
			{
				name: 'value',
				type: 'string',
				default: '',
				description: 'The value to return on form submission.'
			}
		]
	};

	const ExampleConfig = {
		componentName : 'Example',
		devReady : true,
		properties : [...XUIToggleConfig.properties]
	};

	class Example extends React.Component {

		constructor(props) {
			super(props);

			this.state = this.props;
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
			return (
				<div>
					<div className="xui-text-panelheading xui-margin-bottom">Checkbox toggle (inverted, fullwidth)</div>
					<div className="xui-panel xui-margin xui-padding xui-text-inverted">
						<XUIToggle color="inverted" layout="fullwidth">
							<XUIToggleOption {...Object.assign({}, shared, {isChecked: true})}>
								Checkbox<br/>Checkbox<br/>Checkbox<br/>
							</XUIToggleOption>
							<XUIToggleOption {...shared}>
								Pajamas
							</XUIToggleOption>
							<XUIToggleOption {...Object.assign({}, shared, {isDisabled: true})}>
								<svg className="xui-icon">
									<use xlinkHref="#xui-icon-desktop" role="presentation"></use>
								</svg>
								Disabled
							</XUIToggleOption>
							<XUIToggleOption {...Object.assign({}, shared, {isChecked: true, isDisabled: true})}>
								<svg className="xui-icon">
									<use xlinkHref="#xui-icon-desktop" role="presentation"></use>
								</svg>
								Checked and disabled
							</XUIToggleOption>
						</XUIToggle>
					</div>
				</div>
			)

		}

	}

	RendererUtils.init({
		components: {
			Example,
			XUIToggle,
			XUIToggleOption
		},
		configs: {
			ExampleConfig,
			XUIToggleConfig,
			XUIToggleOptionConfig
		},
		defaultComponent: Example,
		defaultConfig: ExampleConfig
	});

})();
