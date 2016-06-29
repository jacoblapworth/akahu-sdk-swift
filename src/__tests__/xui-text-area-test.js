import { assert, expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import XUITextArea from '../XUITextArea.js';
import CSSClasses from 'xui-css-classes';

const TestUtils = React.addons.TestUtils;

let component = {};
let changed = false;

// Note: The height change functionality of this component has not been tested due to the styling issues that come with headless browsers. Height tested at any size will come up as
// 0 or auto, so cannot be tested.
describe('XUITextArea basic functionality:', () => {
	beforeEach(() => {
		const changeHandler = function(){
			changed = true;
		};

		component = TestUtils.renderIntoDocument(
			<XUITextArea
				className='test-hello-world'
				fieldClassName='classyMcClassFace'
				onChange={changeHandler}
				qaHook={'xui-input'}
				maxCharacters={10}
				/>
		);
	});

	it('should call onChange when the value of the input changes', () => {
		const domNode = ReactDOM.findDOMNode(component).lastChild;
		TestUtils.Simulate.change(domNode, { target: { value: 'a' }});
		expect(changed).to.be.true;
	});

	it('should apply className and fieldClassName props to the textarea and containing div', () => {
		const domNode = ReactDOM.findDOMNode(component);
		expect(domNode.getAttribute('class')).to.contain('classyMcClassFace');
		expect(domNode.lastChild.getAttribute('class')).to.contain('test-hello-world')
	});
});



describe('XUITextArea additional functionality:', () => {
	it('should apply error styling if maxCharacters is exceeded', () => {
		component = TestUtils.renderIntoDocument(
			<div>
				<XUITextArea
					qaHook={'xui-input'}
					maxCharacters={10}
					defaultValue={'12345678910'}
					/>
				<XUITextArea
					qaHook={'xui-input'}
					maxCharacters={10}
					defaultValue={'123456789'}
					/>
			</div>
		);
		const invalidNode = ReactDOM.findDOMNode(component).firstChild.lastChild;
		const validNode = ReactDOM.findDOMNode(component).lastChild.lastChild;
		expect(invalidNode.getAttribute('class')).to.contain(CSSClasses.Form.Input.IS_INVALID);
		expect(validNode.getAttribute('class')).to.not.contain(CSSClasses.Form.Input.IS_INVALID);
	});

	it('should update the counter when text is entered', () => {
		component = TestUtils.renderIntoDocument(
			<div>
				<XUITextArea
					qaHook={'xui-input'}
					maxCharacters={10}
					/>
				<XUITextArea
					qaHook={'xui-input'}
					maxCharacters={10}
					defaultValue={'a'}
					/>
			</div>
		);
		const firstField = ReactDOM.findDOMNode(component).firstChild;
		const secondField = ReactDOM.findDOMNode(component).lastChild;
		const firstCounter = firstField.getElementsByClassName('xui-margin-auto-top')[0];
		const secondCounter = secondField.getElementsByClassName('xui-margin-auto-top')[0];
		expect(firstCounter.innerText).to.equal('10');
		expect(secondCounter.innerText).to.equal('9');
	});
});
