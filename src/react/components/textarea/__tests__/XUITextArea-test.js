import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUITextArea from '../XUITextArea';

Enzyme.configure({ adapter: new Adapter() });

let wrapper = {};
let changed = false;

// Note: The height change functionality of this component has not been tested due to the styling issues that come with headless browsers. Height tested at any size will come up as
// 0 or auto, so cannot be tested.
describe('XUITextArea basic functionality:', () => {
	beforeEach(() => {
		const changeHandler = () => {
			changed = true;
		};

		wrapper = mount(
			<XUITextArea
				className="classyMcClassFace"
				fieldClassName="fieldClassyMcClassFace"
				onChange={changeHandler}
				qaHook="xui-input"
				maxCharacters={10}
			/>
		);
	});

	it('should call onChange when the value of the input changes', () => {
		const inputNode = wrapper.find('.xui-input').first();
		inputNode.simulate('change');
		expect(changed).toBeTruthy();
	});

	it('should apply className and fieldClassName props to the textarea and containing div', () => {
		const fieldNode = wrapper.find('.xui-field-layout').first();
		expect(fieldNode.hasClass('fieldClassyMcClassFace')).toBeTruthy();
		const inputNode = wrapper.find('.xui-input').first();
		expect(inputNode.hasClass('classyMcClassFace')).toBeTruthy();
	});
});

describe('XUITextArea additional functionality:', () => {

	it('should apply error styling if maxCharacters is exceeded', () => {

		wrapper = mount(
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

		const invalidNode = wrapper.find('.textarea-1').first();
		const validNode = wrapper.find('.textarea-2').first();
		expect(invalidNode.html().includes('xui-input-is-invalid')).toBeTruthy();
		expect(validNode.html().includes('xui-input-is-invalid')).toBeFalsy();
	});

	it('should update the counter when text is entered', () => {

		wrapper = mount(
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

		const firstField = wrapper.find('.field-1').first();
		const secondField = wrapper.find('.field-2').first();
		const firstCounter = firstField.find('.xui-margin-top-auto').first();
		const secondCounter = secondField.find('.xui-margin-top-auto').first();
		expect(firstCounter.text()).toEqual(expect.stringContaining('10'));
		expect(secondCounter.text()).toEqual(expect.stringContaining('9'));
	});

	it('should pass back a reference to the inner textarea element to the textareaRef callback', () => {

		let textAreaNode = null;

		const textareaRef = (node) => {
			textAreaNode = node;
		};

		wrapper = mount(
			<XUITextArea
				textareaRef={textareaRef}
				fieldClassName="field-1"
				qaHook="xui-input"
				maxCharacters={10}
			/>
		);

		expect(textAreaNode.getAttribute('class')).toEqual(expect.stringContaining('xui-input'));
	});

	it('should render an automation id when a qaHook is passed', () => {
		const automationid = renderer.create(<XUITextArea qaHook={'textarea-test'}/>);

		expect(automationid).toMatchSnapshot();
	})
});
