import 'babel-core/external-helpers.js';

import React from 'react';
import ReactDOM from 'react-dom';
import XUITextArea from '../../src/XUITextArea.js';

(function() {
	/*eslint no-console: 0*/
	var onChange = function(msg){
		console.log('oh I made a change from: ' + msg);
	};

	ReactDOM.render(
		<div className='xui-page-width-standard xui-panel xui-padding xui-margin-top'>
			<div className="xui-form-layout">
				<XUITextArea qaHook={'firstTextArea'} minRows={1} maxRows={4} maxCharacters={2000} placeholder="Type and watch me grow!" id="field1">
					<label className="xui-text-label" htmlFor="field1">This textarea has a label and a maximum number of 2000 characters</label>
				</XUITextArea>
				<XUITextArea qaHook={'secondTextArea'} minRows={2} maxRows={6} maxCharacters={2000} defaultValue="💩" id="field2">
					<label className="xui-text-label" htmlFor="field2">These fields count emojis properly</label>
				</XUITextArea>
				<XUITextArea rows={3} maxCharacters={400}
					defaultValue="Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit nisi, pretium ut lacinia in, elementum id enim." >
					<label className="xui-text-label">{"This textarea has a set number of 3 rows and has exceeded it's size limit"}</label>
				</XUITextArea>
				<XUITextArea rows={2} defaultValue="This one has a default value and is readonly" readOnly={true} onChange={onChange} />
				<XUITextArea minRows={5}
					ariaLabelledBy="test-text-label-1"
					manualResize={true}
					defaultValue="Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit nisi, pretium ut lacinia in, elementum id enim." >
					<label className="xui-text-label">This text area has no maximum number of rows, and no character limit</label>
				</XUITextArea>
			</div>
		</div>, document.getElementById('app')
	);
})();
