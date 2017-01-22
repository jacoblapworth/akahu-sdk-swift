import 'babel-core/external-helpers.js';
import React from 'react';
import XUIButton, { XUIButtonCaret, XUIButtonGroup }  from '../../index.js';
import { sizeClassNames, variantClassNames, buttonHTMLTypes, buttonTypes } from '../../src/private/constants.js';

import '../../bower_components/component-renderer/src/renderer.styles.scss';

import {default as RendererUtils} from 'component-renderer';

(function() {

	const buttonVariants = Object.keys(variantClassNames);

	const buttonSize = Object.keys(sizeClassNames);

	const buttonHTMLType = Object.keys(buttonHTMLTypes);

	const buttonType = Object.keys(buttonTypes);

	const XUIButtonCaretConfig = {
		componentName : 'XUIButtonCaret',
		devReady : true,
		properties : [
			{
				name: 'isSelect',
				type: 'boolean',
				default: true,
				description: 'Signal if the caret has select styles'
			}
		]
	};

	const XUIButtonGroupConfig = {
		componentName : 'XUIButtonGroup',
		devReady : true,
		properties : [
			{
				name: 'children',
				type: 'text',
				default: 'Body Children go here',
				description: 'Add any component you want as children to the footer'
			}
		]
	};


	const XUIButtonConfig = {
		componentName : 'XUIButton',
		devReady : true,
		properties : (() => {
			return [
				{
					name: 'className',
					type: 'text',
					default: '',
					description: 'Additional classes to be put on the button'
				},
				{
					name: 'children',
					type: 'text',
					default: 'Children!',
					description: 'Some Children for the button'
				},
				{
					name: 'qaHook',
					type: 'text',
					default: null,
					description: 'Adds data-automationid attribute to the mask and the button'
				},
				{
					name: 'isDisabled',
					type: 'boolean',
					default: false,
					description: 'Determines if the button is disabled or not'
				},
				{
					name: 'isExternalLink',
					type: 'boolean',
					default: false,
					description: 'Should be used for links pointing at external sites'
				},
				{
					name: 'isLoading',
					type: 'boolean',
					default: false,
					description: 'If true, shows a loader inside the button and also disables the button to prevent clicking'
				},
				{
					name: 'isGrouped',
					type: 'boolean',
					default: false,
					description: 'If this button is part of a parent button group'
				},
				{
					name: 'onKeyDown',
					type: 'boolean',
					default: false,
					description: 'A keydown event handler for the button'
				},
				{
					name: 'onSecondaryKeyDown',
					type: 'boolean',
					default: false,
					description: 'A keydown event handler for the secondary button'
				},
				{
					name: 'onClick',
					type: 'function',
					default: function(){},
					description: 'Bind a function to fire when the button is clicked'
				},
				{
					name: 'onSecondaryClick',
					type: 'function',
					default: function(){},
					description: '	Bind a function to fire when the second button in a split button is clicked'
				},
				{
					name: 'variant',
					type: 'enum',
					data: buttonVariants,
					default: buttonVariants[0],
					description: 'The button variant'
				},
				{
					name: 'size',
					type: 'enum',
					data: buttonSize,
					default: buttonSize[2],
					description: 'The size of this Button. small, full-width, full-width-mobile'
				},
				{
					name: 'type',
					type: 'enum',
					data: buttonHTMLType,
					default: buttonHTMLType[0],
					description: 'The HTML type of this button. `button`, or `link`. Defaults to `button`'
				},
				{
					name: 'buttonType',
					type: 'enum',
					data: buttonType,
					default: buttonType[0],
					description: 'The type attribute of this button. `submit`, `button`, or `reset`. Defaults to `submit`'
				},
				{
					name: 'href',
					type: 'text',
					default: null,
					description: 'The `href` attribute to use on the anchor element (ignored unless `type` is `link`)'
				},
				{
					name: 'rel',
					type: 'text',
					default: null,
					description: 'The `rel` attribute to use on the anchor element (ignored unless `type` is `link`)'
				},
				{
					name: 'tabIndex',
					type: 'number',
					default: null,
					description: 'The HTML tabIndex property to put on the component'
				},
				{
					name: 'target',
					type: 'string',
					default: null,
					description: 'The `target` attribute to use on the anchor element (ignored unless `type` is `link`)'
				},
				{
					name: 'title',
					type: 'string',
					default: null,
					description: 'The `title` attribute for this button'
				},
				{
					name: 'split',
					type: 'boolean',
					default: null,
					description: 'Changes the button to a split button.'
				},
				{
					name: 'secondaryProps',
					type: 'object',
					default: null,
					description: ''
				}
			]
		})()
	};

	const ExampleConfig = {
		componentName : 'Example',
		devReady : true,
		properties : [...XUIButtonConfig.properties]
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
					<XUIButton
						isDisabled={false}
						onClick={this.handleClick}
						variant='primary'
						size='full-width'>Click me
					</XUIButton>
					<br/>
					<br/>
					<div className="testButtonContainer">
						<XUIButton>Default button</XUIButton>
						{" "}
						<XUIButton isDisabled>Default button (disabled)</XUIButton>
						{" "}
						<XUIButton isLoading>Default button (loading)</XUIButton>
						{" "}
						<XUIButton isLoading isDisabled>Default button (loading and disabled)</XUIButton>
					</div>
					<br/>
					<br/>
					<div className="testButtonContainer">
						<XUIButton variant="primary">Primary button</XUIButton>
						{" "}
						<XUIButton variant="primary" isDisabled>Primary button (disabled)</XUIButton>
						{" "}
						<XUIButton variant="primary" isLoading>Primary button (loading)</XUIButton>
						{" "}
						<XUIButton variant="primary" isLoading isDisabled>Primary button (loading and disabled)</XUIButton>
					</div>
					<br/>
					<br/>
					<div className="testButtonContainer">
						<XUIButton variant="create">Create button</XUIButton>
						{" "}
						<XUIButton variant="create" isDisabled>Create button (disabled)</XUIButton>
						{" "}
						<XUIButton variant="create" isLoading>Create button (loading)</XUIButton>
						{" "}
						<XUIButton variant="create" isLoading isDisabled>Create button (loading and disabled)</XUIButton>
					</div>
					<br/>
					<br/>
					<div className="testButtonContainer">
						<XUIButton variant="negative">Negative button</XUIButton>
						{" "}
						<XUIButton variant="negative" isDisabled>Negative button (disabled)</XUIButton>
						{" "}
						<XUIButton variant="negative" isLoading>Negative button (loading)</XUIButton>
						{" "}
						<XUIButton variant="negative" isLoading isDisabled>Negative button (loading and disabled)</XUIButton>
					</div>
				</div>
			)

		}

	}

	RendererUtils.init({
		components : {
			Example,
			XUIButton,
			XUIButtonCaret,
			XUIButtonGroup
		},
		configs : {
			ExampleConfig,
			XUIButtonConfig,
			XUIButtonCaretConfig,
			XUIButtonGroupConfig
		},
		defaultComponent : Example,
		defaultConfig: ExampleConfig
	});

})();
