import 'babel-core/external-helpers.js';
import React from 'react';
import XUITextArea from '../../src/XUITextArea.js';
import '../../bower_components/component-renderer/src/renderer.styles.scss';
import RendererUtils from 'component-renderer'

const NOOP = () => {};

(function() {

	const XUITextAreaConfig = {
		componentName : 'XUITextArea',
		devReady : true,
		properties : [
			{
				name: 'isDisabled',
				type: 'boolean',
				default: false,
				description: 'Whether the input should be disabled.'
			},
			{
				name: 'rows',
				type: 'number',
				default: 3,
				description: 'The number of lines the input should display without scrolling'
			},
			{
				name: 'minRows',
				type: 'number',
				default: 2,
				description: 'The minimum number of rows for the text area should make space for.'
			},
			{
				name: 'maxRows',
				type: 'number',
				default: 10,
				description: 'The maximum number of rows for the text area to expand to.'
			},
			{
				name: 'manualResize',
				type: 'boolean',
				default: false,
				description: 'Whether the user should be able to manually resize the field.'
			},
			{
				name: 'readOnly',
				type: 'boolean',
				default: false,
				description: 'Whether the text input should be read-only.'
			},
			{
				name: 'defaultValue',
				type: 'string',
				default: 'Sarah is the bomb.com',
				description: 'The initial value of the input.'
			},
			{
				name: 'maxCharacters',
				type: 'number',
				default: 500,
				description: 'The maximum number of characters for the text area, if given a value, a character counter and validation will be added.'
			},
			{
				name: 'isInvalid',
				type: 'boolean',
				default: false,
				description: 'Whether the text area should have error state invalid styling.'
			},
			{
				name: 'validationMessage',
				type: 'string',
				default: '',
				description: 'Validation message to show'
			},
			{
				name: 'hintMessage',
				type: 'string',
				default: '',
				description: 'Explanatory message to show'
			},
			{
				name: 'defaultLayout',
				type: 'boolean',
				default: true,
				description: 'Whether default field layout should be applied to the container.'
			},
			{
				name: 'fieldClassName',
				type: 'string',
				default: null,
				description: 'Additional class(es) to add to the wrapping div.'
			},
			{
				name: 'id',
				type: 'string',
				default: null,
				description: 'ID to be set for the textarea.'
			},
			{
				name: 'onChange',
				type: 'function',
				default: NOOP,
				description: 'Function to execute when the inputs value has been changed.'
			},
			{
				name: 'textareaRef',
				type: 'function',
				default: NOOP,
				description: 'Function to add a reference to the textarea element'
			},
			{
				name: 'className',
				type: 'string',
				default: null,
				description: 'Additional classes to be added to the stringarea itself.'
			},
			{
				name: 'qaHook',
				type: 'string',
				default: 'xui-textarea',
				description: ' QA hook for testing.'
			},
			{
				name: 'children',
				type: 'string',
				default: null,
				description: 'Optional children to be rendered by the component (i.e. a label).'
			}
		]
	};

	const ExampleConfig = {
		componentName : 'Example',
		devReady : true
	};

	const Example = () => (
		<div>
			<XUITextArea
				minRows={2}
				maxRows={5}
				maxCharacters={2000}>
				<label className="xui-text-label xui-fieldlabel-layout">This textarea auto-resizes</label>
			</XUITextArea>
			<XUITextArea
				rows={3}
				defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin posuere neque eget purus placerat feugiat. Proin et tortor bibendum, commodo eros ut, lobortis lorem. In ut orci ipsum. Vivamus eget pretium mauris, eu tempus velit. Etiam dolor nunc, tincidunt eget ex in, gravida varius est. Nullam vitae pretium leo. Curabitur eros odio, bibendum at diam quis, facilisis tincidunt quam. Morbi a mollis nulla. In velit leo, condimentum ac scelerisque nec, tincidunt sit amet odio. Proin posuere neque eget purus placerat feugiat. Proin et tortor bibendum, commodo eros ut, lobortis lorem. In ut orci ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed posuere pulvinar nisl, eget fringilla arcu iaculis in. Etiam mauris ante, euismod ac ligula faucibus, varius auctor eros odio, est.  Morbi a mollis nulla. In velit leo, condimentum ac scelerisque nec, tincidunt sit amet odio. Proin posuere neque eget purus placerat feugiat. Proin et tortor bibendum, commodo eros ut, lobortis lorem. In ut orci ipsum. Curabitur eros odio,tincidunt non ipsum quis ieros odio, imperdiet. Proin et tortor bibendum, commodo eros ut, lobortis lorem.">
				<label className="xui-text-label xui-fieldlabel-layout">This textarea has a fixed height</label>
			</XUITextArea>
			<XUITextArea
				rows={3}
				isDisabled
				defaultValue="This textarea has no label and is disabled">
			</XUITextArea>
		</div>
	);


	RendererUtils.init({
		components: {
			Example,
			XUITextArea
		},
		configs: {
			ExampleConfig,
			XUITextAreaConfig
		},
		defaultComponent: Example,
		defaultConfig: ExampleConfig
	});

})();
