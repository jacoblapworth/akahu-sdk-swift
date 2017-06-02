import { expect } from 'chai';
import React from 'react';
import XUITextArea from '../XUITextArea.js';

const TestUtils = React.addons.TestUtils;

let component = {};
let changed = false;

// Note: The height change functionality of this component has not been tested due to the styling issues that come with headless browsers. Height tested at any size will come up as
// 0 or auto, so cannot be tested.
describe('XUITextArea basic functionality:', () => {
	beforeEach(() => {
		const changeHandler = () => {
			changed = true;
		};

		component = TestUtils.renderIntoDocument(
			<div>
				<XUITextArea
					className="classyMcClassFace"
					fieldClassName="fieldClassyMcClassFace"
					onChange={changeHandler}
					qaHook="xui-input"
					maxCharacters={10}
					/>
			</div>
		);
	});

	it('should call onChange when the value of the input changes', () => {
		const inputNode = component.querySelector('.xui-input');
		TestUtils.Simulate.change(inputNode);
		expect(changed).to.be.true;
	});

	it('should apply className and fieldClassName props to the textarea and containing div', () => {
		const fieldNode = component.querySelector('.xui-field-layout');
		expect(fieldNode.getAttribute('class')).to.contain('fieldClassyMcClassFace');
		const inputNode = component.querySelector('.xui-input');
		expect(inputNode.getAttribute('class')).to.contain('classyMcClassFace')
	});
});

describe('XUITextArea additional functionality:', () => {

	it('should apply error styling if maxCharacters is exceeded', () => {

		component = TestUtils.renderIntoDocument(
			<div>
				<XUITextArea
					className="textarea-1"
					qaHook="xui-input"
					maxCharacters={10}
					defaultValue="12345678910"
					/>
				<XUITextArea
					className="textarea-2"
					qaHook="xui-input"
					maxCharacters={10}
					defaultValue="123456789"
					/>
			</div>
		);

		const invalidNode = component.querySelector('.textarea-1');
		const validNode = component.querySelector('.textarea-2');
		expect(invalidNode.getAttribute('class')).to.contain('xui-input-is-invalid');
		expect(validNode.getAttribute('class')).to.not.contain('xui-input-is-invalid');
	});

	it('should update the counter when text is entered', () => {

		component = TestUtils.renderIntoDocument(
			<div>
				<XUITextArea
					fieldClassName="field-1"
					qaHook="xui-input"
					maxCharacters={10}
					/>
				<XUITextArea
					fieldClassName="field-2"
					qaHook="xui-input"
					maxCharacters={10}
					defaultValue="a"
					/>
			</div>
		);

		const firstField = component.querySelector('.field-1');
		const secondField = component.querySelector('.field-2');
		const firstCounter = firstField.getElementsByClassName('xui-margin-auto-top')[0];
		const secondCounter = secondField.getElementsByClassName('xui-margin-auto-top')[0];
		expect(firstCounter.innerText).to.equal('10');
		expect(secondCounter.innerText).to.equal('9');
	});

	it('should pass back a reference to the inner textarea element to the textareaRef callback', () => {

		let textAreaNode = null;

		const textareaRef = (node) => {
			textAreaNode = node;
		};

		component = TestUtils.renderIntoDocument(
			<XUITextArea
				textareaRef={textareaRef}
				fieldClassName="field-1"
				qaHook="xui-input"
				maxCharacters={10}
			/>
		);

		expect(textAreaNode.getAttribute('class')).to.contain('xui-input');
	})
});
