import 'babel-core/external-helpers.js';
import React from 'react';
import XUIAvatar, { XUIAvatarGroup, XUIAvatarCounter, XUISimpleAvatar } from '../../index.js';
import { sizeClassNames, variantClassNames} from '../../src/constants.js';


import '../../bower_components/component-renderer/src/renderer.styles.scss';

import {default as RendererUtils} from 'component-renderer';

(function() {

	const avatarKeys = Object.keys(sizeClassNames);

	const avatarVariants = Object.keys(variantClassNames);

	const XUISimpleAvatarConfig = {
		componentName : 'XUISimpleAvatar',
		devReady : true,
		properties : [
			{
				name: 'className',
				type: 'text',
				default: null,
				description: 'Adds extra classes to the containing element'
			},
			{
				name: 'qaHook',
				type: 'text',
				default: null,
				description: 'Adds data-automationid attribute to the mask and the avatar'
			},
			{
				name: 'variant',
				type: 'enum',
				data: avatarVariants,
				default: avatarVariants[0],
				description: 'The avatar variant'
			},
			{
				name: 'value',
				type: 'text',
				default: 'User Xperience Engineering',
				description: 'The text to display in the avatar'
			},
			{
				name: 'imageUrl',
				type: 'text',
				default: null,
				description: 'the image the component should render. Initials rendered otherwise'
			},
			{
				name: 'size',
				type: 'enum',
				data: avatarKeys,
				default: avatarKeys[2],
				description: 'The size of this avatar. small, medium, large, or xlarge'
			},
			{
				name: 'identifier',
				type: 'text',
				default: 'purple',
				description: 'A unique string that will be used to generate the color of the avatar if color is not provided.'
			},
			{
				name: 'onError',
				type: 'function',
				default: function(){console.log('close requested')},
				description: 'Bind a function to fire on error(The test function for this showcase prints to the console)'
			},
		]
	};

	const XUIAvatarCounterConfig = {
		componentName : 'XUIAvatarCounter',
		devReady : true,
		properties : [
			{
				name: 'qaHook',
				type: 'text',
				default: null,
				description: 'Adds data-automationid attribute to the mask and the avatar'
			},
			{
				name: 'className',
				type: 'text',
				default: null,
				description: 'Adds extra classes to the containing element'
			},
			{
				name: 'count',
				type: 'string',
				default: '4',
				description: 'The count to display'
			},
			{
				name: 'size',
				type: 'enum',
				data: avatarKeys,
				default: avatarKeys[2],
				description: 'The size of this avatar. small, medium, large, or xlarge'
			},
		]
	};

	const XUIAvatarGroupConfig = {
		componentName : 'XUIAvatarGroup',
		devReady : true,
		properties : [
			{
				name: 'className',
				type: 'text',
				default: null,
				description: 'Adds extra classes to the containing element'
			},
			{
				name: 'qaHook',
				type: 'text',
				default: null,
				description: 'Adds data-automationid attribute to the mask and the avatar'
			},
			{
				name: 'children',
				type: 'text',
				default: 'Header Children go here',
				description: 'Add any component you want as children to the footer'
			},
			{
				name: 'size',
				type: 'enum',
				data: avatarKeys,
				default: avatarKeys[2],
				description: 'The size of this avatar. small, medium, large, or xlarge'
			},
			{
				name: 'maxAvatars',
				type: 'number',
				default: '5',
				description: 'The maximum number of avatars to show'
			}
		]
	};



	const XUIAvatarConfig = {
		componentName : 'XUIAvatar',
		devReady : true,
		properties : (() => {
			return [
				{
					name: 'onError',
					type: 'function',
					default: function(){console.log('close requested')},
					description: 'Bind a function to fire on error'
				},
				{
					name: 'value',
					type: 'string',
					default: 'Sarah is cool af',
					description: 'The text to display in the avatar'
				},

			]
		})()
	};

	const ExampleConfig = {
		componentName : 'Example',
		devReady : true,
		properties : [
			{
				name: 'onError',
				type: 'function',
				default: function(){},
				description: 'Bind a function to fire on error(The test function for this showcase prints to the console)'
			},
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
			return (
				<div>
					<XUIAvatar
					value="Gyro"
					size="xlarge"
					imageUrl="logo.png"
					/>

					<br />
					<br />

					<XUIAvatarGroup size="small" maxAvatars={3}>
						<XUIAvatar value="abcdefg" />
						<XUIAvatar value="1234" imageUrl="https://example.com/non-existent-url.png" />
						<XUIAvatar value="asdf" imageUrl="logo.png" />
					</XUIAvatarGroup>

					<br />

					<XUIAvatarGroup maxAvatars={2}>
						<XUIAvatar value="abcdefg" />
						<XUIAvatar value="1234" imageUrl="https://example.com/non-existent-url.png" />
						<XUIAvatar value="asdf" imageUrl="logo.png" />
					</XUIAvatarGroup>

					<br />

					<XUIAvatarGroup size="large" maxAvatars={1}>
						<XUIAvatar value="abcdefg" />
						<XUIAvatar value="1234" imageUrl="https://example.com/non-existent-url.png" />
						<XUIAvatar value="asdf" imageUrl="logo.png" />
					</XUIAvatarGroup>

				</div>

		)

		}

	}

	RendererUtils.init({
		components : {
			Example,
			XUIAvatar,
			XUIAvatarCounter,
			XUIAvatarGroup,
			XUISimpleAvatar
		},
		configs : {
			ExampleConfig,
			XUIAvatarConfig,
			XUIAvatarCounterConfig,
			XUIAvatarGroupConfig,
			XUISimpleAvatarConfig
		},
		defaultComponent : Example,
		defaultConfig: ExampleConfig
	});

})();
