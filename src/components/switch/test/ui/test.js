import 'babel-core/external-helpers.js';
import XUISwitch from '../../src/XUISwitch.js';
import '../../bower_components/component-renderer/src/renderer.styles.scss';
import RendererUtils from 'component-renderer'

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
				default: true,
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
				type: 'string',
				default: null,
				description: 'Optional value for the input'
			},
			{
				name: 'name',
				type: 'string',
				default: null,
				description: 'Optional name for the input'
			}
		]
	};

	RendererUtils.init({
		components: {
			XUISwitch
		},
		configs: {
			XUISwitchConfig
		},
		defaultComponent: XUISwitch,
		defaultConfig: XUISwitchConfig
	});

})();
