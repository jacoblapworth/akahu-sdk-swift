import 'babel-core/external-helpers.js';
import React from 'react';
import XUIButton, { XUIButtonCaret, XUIButtonGroup }  from '../../index.js';
import { sizeClassNames, variantClassNames, buttonHTMLTypes, buttonTypes } from '../../src/private/constants.js';
import { ensureIconBlobOnPage } from 'xui-icon';

import '../../bower_components/component-renderer/src/renderer.styles.scss';

import RendererUtils from 'component-renderer'

(function() {

	const buttonVariants = Object.keys(variantClassNames);

	const buttonSize = Object.keys(sizeClassNames);

	const buttonHTMLType = Object.keys(buttonHTMLTypes);

	const buttonType = Object.keys(buttonTypes);


	const XUIButtonConfig = {
		componentName : 'XUIButton',
		devReady : true,
		properties : (() => {
			return [
				{
					name: 'className',
					type: 'string',
					default: '',
					description: 'Additional classes to be put on the button'
				},
				{
					name: 'children',
					type: 'string',
					default: 'Children!',
					description: 'Some Children for the button'
				},
				{
					name: 'qaHook',
					type: 'string',
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
					type: 'string',
					default: null,
					description: 'The `href` attribute to use on the anchor element (ignored unless `type` is `link`)'
				},
				{
					name: 'rel',
					type: 'string',
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
		properties : [
			{
				name: 'children',
				type: 'string',
				default: '',
				description: 'Some Children for the button'
			},
			{
				name: 'isDisabled',
				type: 'boolean',
				default: false,
				description: 'Determines if the button is disabled or not'
			},
			{
				name: 'isLoading',
				type: 'boolean',
				default: false,
				description: 'If true, shows a loader inside the button and also disables the button to prevent clicking'
			},
			{
				name: 'useCaret',
				type: 'boolean',
				default: false,
				description: 'If true, shows Caret Icon'
			}

		]
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
			const caret = this.props.useCaret ? <XUIButtonCaret/> : null;
			return (
				<div>
					<XUIButton isDisabled={this.props.isDisabled} isLoading={this.props.isLoading}>Default button {caret}</XUIButton>

					<br />
					<br />

					<XUIButton variant="primary" isDisabled={this.props.isDisabled} isLoading={this.props.isLoading}>Primary button {caret}</XUIButton>

					<br />
					<br />

					<XUIButton variant="create" isDisabled={this.props.isDisabled} isLoading={this.props.isLoading}>Create button {caret}</XUIButton>

					<br />
					<br />

					<XUIButton variant="negative" isDisabled={this.props.isDisabled} isLoading={this.props.isLoading} >Negative button</XUIButton>

					<br />
					<br />

					<XUIButtonGroup>
						{['One', 'Two', 'Three'].map((x, key) => (
							<XUIButton variant="standard" isDisabled={this.props.isDisabled} key={key}>Grouped Button{x}</XUIButton>
						))}
					</XUIButtonGroup>

					<br />
					<br />

					<XUIButton variant="link" isDisabled={this.props.isDisabled}>Link button</XUIButton>

				</div>
			)

		}

	}

	RendererUtils.init({
		components: {
			Example,
			XUIButton
		},
		configs: {
			ExampleConfig,
			XUIButtonConfig
		},
		defaultComponent: Example,
		defaultConfig: ExampleConfig
	});

})();
