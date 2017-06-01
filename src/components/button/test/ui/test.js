import React, {PropTypes} from 'react';
import XUIButton, { XUIButtonCaret }  from '../../index.js';
import { SizeClassNames, VariantClassNames, ButtonTypes } from '../../src/private/constants.js';
import { ensureIconBlobOnPage } from 'xui-icon';
import { ButtonDefaultProps } from '../../src/private/propTypes';
import '../../bower_components/component-renderer/src/renderer.styles.scss';
import RendererUtils from 'component-renderer'

const NOOP = () => {};
const keys = Object.keys;

(function() {

	const XUIButtonConfig = {
		componentName : 'XUIButton',
		devReady : true,
		properties : [
			{
				name: 'className',
				type: 'string',
				default: ButtonDefaultProps.className,
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
				default: ButtonDefaultProps.qaHook,
				description: 'Adds data-automationid attribute to the mask and the button'
			},
			{
				name: 'isLink',
				type: 'boolean',
				default: ButtonDefaultProps.isLink,
				description: 'Whether or not to render this button using an <a> tag'
			},
			{
				name: 'isDisabled',
				type: 'boolean',
				default: ButtonDefaultProps.isDisabled,
				description: 'Determines if the button is disabled or not'
			},
			{
				name: 'isExternalLink',
				type: 'boolean',
				default: ButtonDefaultProps.isExternalLink,
				description: 'Should be used for links pointing at external sites'
			},
			{
				name: 'isLoading',
				type: 'boolean',
				default: ButtonDefaultProps.isLoading,
				description: 'If true, shows a loader inside the button and also disables the button to prevent clicking'
			},
			{
				name: 'isGrouped',
				type: 'boolean',
				default: ButtonDefaultProps.isGrouped,
				description: 'If this button is part of a parent button group'
			},
			{
				name: 'onKeyDown',
				type: 'function',
				default: NOOP,
				description: 'A keydown event handler for the button'
			},
			{
				name: 'onClick',
				type: 'function',
				default: NOOP,
				description: 'Bind a function to fire when the button is clicked'
			},
			{
				name: 'variant',
				type: 'enum',
				data: keys(VariantClassNames),
				default: ButtonDefaultProps.variant,
				description: 'The button variant'
			},
			{
				name: 'size',
				type: 'enum',
				data: keys(SizeClassNames),
				default: ButtonDefaultProps.size,
				description: 'The size of this Button. ' + Object.keys(VariantClassNames).join(', ')
			},
			{
				name: 'type',
				type: 'enum',
				data: keys(ButtonTypes),
				default: ButtonDefaultProps.type,
				description: 'The HTML type property of this button.'
			},
			{
				name: 'href',
				type: 'string',
				default: ButtonDefaultProps.href,
				description: 'The `href` attribute to use on the anchor element (ignored unless `isLink` is `true`)'
			},
			{
				name: 'rel',
				type: 'string',
				default: ButtonDefaultProps.rel,
				description: 'The `rel` attribute to use on the anchor element (ignored unless `isLink` is `true`)'
			},
			{
				name: 'tabIndex',
				type: 'number',
				default: ButtonDefaultProps.tabIndex,
				description: 'The HTML tabIndex property to put on the component'
			},
			{
				name: 'target',
				type: 'string',
				default: ButtonDefaultProps.target,
				description: 'The `target` attribute to use on the anchor element (ignored unless `isLink` is `true`)'
			},
			{
				name: 'title',
				type: 'string',
				default: ButtonDefaultProps.title,
				description: 'The `title` attribute for this button'
			}
		]
	};

	const ExampleConfig = {
		componentName : 'Example',
		devReady : true,
		properties : [
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

		render() {
			const caret = this.state.useCaret ? <XUIButtonCaret/> : null;
			const { isDisabled, isLoading } = this.state;
			return (
				<div>
					<XUIButton
						isDisabled={isDisabled}
						isLoading={isLoading}
					>
						Default button {caret}
					</XUIButton>

					<br />
					<br />
					{Object.keys(VariantClassNames).map(variant => {
						return [
							<br key={variant + '1'} />,
							<br key={variant + '2'} />,
							<XUIButton
								key={variant}
								variant={variant}
								isDisabled={isDisabled}
								isLoading={isLoading}
							>
								{variant} button {caret}
							</XUIButton>
						];
					})}
				</div>
			)
		}
	}

	Example.propTypes = {
		isDisabled: PropTypes.bool,
		isLoading: PropTypes.bool,
		useCaret: PropTypes.bool
	};
	Example.defaultProps = {
		isDisabled: false,
		isLoading: false,
		useCaret: false
	};

	ensureIconBlobOnPage();
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
