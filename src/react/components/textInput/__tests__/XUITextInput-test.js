import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUITextInput from '../XUITextInput';
import XUITextInputSideElement from '../XUITextInputSideElement';
import XUIIcon from '../../icon/XUIIcon';
import accessibility from '@xero/xui-icon/icons/accessibility';
import NOOP from '../../helpers/noop';
import uuidv4 from 'uuid/v4';

jest.mock('uuid/v4');
uuidv4.mockImplementation(() => 'testGeneratedId');

Enzyme.configure({ adapter: new Adapter() });

describe('<XUITextInput>', () => {

	describe('General Functionality', () => {
		let wrapper;
		const className = 'containerClassName';
		const qaHook = 'test-input';

		beforeEach(() => {
			wrapper = mount(
				<XUITextInput
					qaHook={qaHook}
				/>
			);
		});

		it('should render', () => {
			expect(wrapper).toBeDefined();
		});

		it('should have a qahook on the input and wrapper', () => {
			const automationId = renderer.create(
				<XUITextInput qaHook="input-test" />
			);
			expect(automationId).toMatchSnapshot();
		});

		it('should default to no icon', () => {
			expect(wrapper.find('XUIIcon')).toHaveLength(0);
		});

	});

	describe('Text-only input', () => {
		let wrapper;
		let input;
		let className = 'someClassName';
		let qaHook = 'givenQAHook';

		beforeEach(() => {
			wrapper= mount(
				<XUITextInput
					className={ className }
					qaHook={ qaHook }
					onChange={ NOOP }
					style={ {backgroundColor: 'darkred'} }
					aria-haspopup={ true }
					placeholder='This is an input'
				/>
			);

			input = wrapper.find('input');
		});

		it('renders input', () => {
			expect(input).toHaveLength(1);
		});

		it('doesn\'t have inline styles', () => {
			expect(input.props().styles).toBeUndefined();
		});

		it('has a qaHook', () => {
			const automationid = renderer.create(<XUITextInput qaHook={qaHook} />);

			expect(automationid).toMatchSnapshot();
		});

		it('has disabled styling', () => {
			const disabled = renderer.create(<XUITextInput isDisabled />);

			expect(disabled).toMatchSnapshot();
		});

		it('is multiline', () => {
			const multiline = mount(<XUITextInput isMultiline maxRows={10} />);

			expect(multiline.state().maxHeight).toEqual(199);
		});

		it('is passed className', () => {
			expect(wrapper.hasClass(className)).toBeTruthy();
		});

		it('is passed placeholder property', () => {
			expect(input.prop('placeholder')).toBeDefined();
		});

		it('is passed placeholder property value', () => {
			expect(input.prop('placeholder')).toEqual(expect.stringContaining('This is an input'));
		});

		it('renders the field layout class when isFieldLayout is true', () => {
			const wrapper= mount(<XUITextInput isFieldLayout={true} />);

			expect(wrapper.find('.xui-field-layout')).toHaveLength(1);
		});

		it('renders with a label when one is provided', () => {
			const wrapper = renderer.create(<XUITextInput label="test" labelId="testLabel" />);
			expect(wrapper).toMatchSnapshot();
		})

		it('renders with a hidden label when one is provided', () => {
			const wrapper = renderer.create(<XUITextInput label="test" isLabelHidden />);
			expect(wrapper).toMatchSnapshot();
		})

		it('includes custom classes on the correct nodes', () => {
			const wrapper = renderer.create(
				<XUITextInput
					fieldClassName="custom-field-class"
					containerClassName="custom-container-class"
					inputClassName="custom-input-class"
					labelClassName="custom-label-class"
					label="test"
					labelId="testLabel"
				/>);

			expect(wrapper).toMatchSnapshot();
		});

		it('maps the type prop to the input element', () => {
			const wrapper = mount(<XUITextInput type='number' />);

			expect(wrapper.find('input[type="number"]')).toHaveLength(1);
		});

		it('maps the defaultValue prop to the input element', () => {
			const wrapper = mount(<XUITextInput defaultValue='hello' />);

			expect(wrapper.find('input[defaultValue="hello"]')).toHaveLength(1);
		});

		it('sets the resize none class based on options passed in', () => {
			const wrapper = renderer.create(
				<XUITextInput isMultiline/>
			);

			expect(wrapper).toMatchSnapshot();
		});

		it('forces resize visible class based on options passed in', () => {
			const wrapper = renderer.create(
				<XUITextInput isMultiline isManuallyResizable/>
			);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Validation and hints', () => {
		it('renders with the correct class on the input if isInvalid=true', () => {
			const wrapper = mount(
				<XUITextInput
					onChange={ NOOP }
					isInvalid={ true }
				/>
			);

			expect(wrapper.find('.xui-textinput-is-invalid').length).toBe(1);
		});

		it('renders with a hint message if one is provided and the input is valid', () => {
			const wrapper = renderer.create(
				<XUITextInput
					onChange={ NOOP }
					hintMessage="Boo"
					validationMessage="Wut?"
					labelId="newTest"
				/>
			);

			expect(wrapper).toMatchSnapshot();
		});

		it('renders invalid textinputs with an error message correctly', () => {
			const wrapper = renderer.create(
				<XUITextInput
					onChange={ NOOP }
					isInvalid={ true }
					validationMessage="Boo"
					labelId="newTest"
				/>
			);

			expect(wrapper).toMatchSnapshot();
		});

		it('renders with the validation message if isInvalid=true and both a hint message and a validation message are present', () => {
			const msg = "Boo";
			const wrapper = mount(
				<XUITextInput
					onChange={ NOOP }
					isInvalid={ true }
					validationMessage={ msg }
					hintMessage="Hai"
				/>
			);

			const validationEl = wrapper.find('.xui-validation');
			expect(validationEl.text()).toEqual(msg);
		});

		it('renders with the hint message if isInvalid=true and only a hint message is present', () => {
			const msg = "Hai";
			const wrapper = mount(
				<XUITextInput
					onChange={ NOOP }
					isInvalid={ true }
					hintMessage={ msg }
				/>
			);

			const validationEl = wrapper.find('.xui-validation');
			expect(validationEl.text()).toEqual(msg);
		});

		it('renders with the correct class on the validation element if isInvalid=true and no validation message is present', () => {
			const wrapper = mount(
				<XUITextInput
					onChange={ NOOP }
					isInvalid={ true }
					hintMessage="Hai"
				/>
			);

			expect(wrapper.find('.xui-textinput-is-invalid')).toHaveLength(1);

			const validationEl = wrapper.find('.xui-validation');
			expect(validationEl.hasClass('xui-validation-is-invalid')).toBeFalsy();
		});
	});

	describe('Side elements', () => {

		it('should render side elements correctly', () => {
			const sideElement = (
				<XUITextInputSideElement type="icon">
					<XUIIcon icon={accessibility} isBoxed />
				</XUITextInputSideElement>
			);
			const wrapper = renderer.create(
				<div>
					<XUITextInput leftElement={sideElement}/>
					<XUITextInput rightElement={sideElement}/>
					<XUITextInput leftElement={sideElement} rightElement={sideElement} />
				</div>
			);
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Borderless variants', () => {
		it('should render with transparent borderless classes when isBorderlessTransparent is set to true', () => {
			const wrapper = mount(
				<XUITextInput
					onChange={ NOOP }
					isBorderlessTransparent={true}
					hintMessage="Hai"
				/>
			);

			expect(wrapper.find('.xui-textinput-borderless-transparent')).toHaveLength(1);
		});

		it('should render with transparent borderless classes when isBorderlessTransparent and inInverted are set to true', () => {
			const wrapper = mount(
				<XUITextInput
					onChange={ NOOP }
					isBorderlessTransparent={true}
					isInverted={true}
					hintMessage="Hai"
				/>
			);

		expect(wrapper.find('.xui-textinput-borderless-transparent')).toHaveLength(1);
		expect(wrapper.find('.xui-textinput-borderless-inverted')).toHaveLength(1);
		});

		it('should render with solid borderless classes when isBorderlessSolid is set to true', () => {
			const wrapper = mount(
				<XUITextInput
					onChange={ NOOP }
					isBorderlessSolid={true}
					hintMessage="Hai"
				/>
			);

			expect(wrapper.find('.xui-textinput-borderless-solid')).toHaveLength(1);
		});

		it('should render with solid borderless classes when isBorderlessSolid and inInverted are set to true', () => {
			const wrapper = mount(
				<XUITextInput
					onChange={ NOOP }
					isBorderlessSolid={true}
					isInverted={true}
					hintMessage="Hai"
				/>
			);

			expect(wrapper.find('.xui-textinput-borderless-solid')).toHaveLength(1);
			expect(wrapper.find('.xui-textinput-borderless-inverted')).toHaveLength(1);
		});
	});

	describe('events', () => {
		it('should set internal focused state when focused', () => {
			const wrapper = mount(<XUITextInput />);

			wrapper.find('input').simulate('focus');

			expect(wrapper.state().hasFocus).toBeTruthy();
		});

		it('should call the passed onFocus handler when focused', () => {
			const onFocus = jest.fn();
			const wrapper = mount(<XUITextInput onFocus={onFocus}/>);

			wrapper.find('input').simulate('focus');

			expect(onFocus.mock.calls.length).toBeGreaterThan(0);
		});

		it('should set internal focused state to false when blurred', () => {
			const wrapper = mount(<XUITextInput />);

			wrapper.find('input').simulate('focus');
			wrapper.find('input').simulate('blur');

			expect(wrapper.state().hasFocus).toBeFalsy();
		});

		it('should call the passed onBlur handler when blurred', () => {
			const onBlur = jest.fn();
			const wrapper = mount(<XUITextInput onBlur={onBlur}/>);

			wrapper.find('input').simulate('blur');

			expect(onBlur.mock.calls.length).toBeGreaterThan(0);
		});

		it('calls onChange when input changes', () => {
			const onChange = jest.fn();
			const wrapper = mount(<XUITextInput onChange={onChange}/>);

			wrapper.find('input').simulate('change');
			expect(onChange.mock.calls.length).toBeGreaterThan(0);
		});
	});
});
