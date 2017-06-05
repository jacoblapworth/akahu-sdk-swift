import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import XUIInput from '../XUIInput.js';
import accessibility from '@xero/xui-icon/icons/accessibility';

describe('<XUIInput>', () => {

	describe('General Functionality', () => {
		let wrapper;
		const className = 'containerClassName';
		const qaHook = 'test-input';

		beforeEach(() => {
			wrapper = mount(
				<XUIInput
					onChange={ () => true }
					qaHook={qaHook}
					className={className}
				/>
			);
		});

		it('should render', () => {
			expect(wrapper).to.exist;
		});

		it('should have a qahook on the input and wrapper', () => {
			const input = wrapper.find('input');
			expect(wrapper.html()).to.contain(`data-automationid="${qaHook}-container"`);
			expect(input.html()).to.contain(`data-automationid="${qaHook}"`);
		});

		it('should pass containerClassName to container element', () => {
			const input = wrapper.find('input');
			expect(input.props().className).to.contain(className);
		});

		it('should default to no icon', () => {
			expect(wrapper.find('XUIIcon')).to.have.length(0);
		});

	});

	describe('Line input', () => {
		let wrapper;
		let input;
		let changed;
		let className = 'someClassName';
		let qaHook = 'givenQAHook';
		let additionalAttrs = { placeholder : 'This is an input' };

		beforeEach(() => {
			wrapper= mount(
				<XUIInput
					className={ className }
					qaHook={ qaHook }
					onChange={ () => {changed = true} }
					style={ {'backgroundColor': 'darkred'} }
					aria-haspopup={true}
					inputAttributes={ additionalAttrs }
				/>
			);

			changed = false;
			input = wrapper.find('input');
		});

		it('renders input', () => {
			expect(input).to.have.length(1);
		});

		it('doesn\'t have inline styles', () => {
			expect(input.props().styles).to.be.undefined;
		});

		it('has a qaHook', () => {
			expect(input.html()).to.contain(`data-automationid="${qaHook}"`)
		});

		it('is passed className', () => {
			expect(input.hasClass(className)).to.be.true;
		});

		it('calls onChange when input changes', () => {
			input.simulate('change');
			expect(changed).to.equal(true);
		});

		it('is passed placeholder property', () => {
			expect(input.props().placeholder).to.exist;
		});

		it('is passed placeholder property value', () => {
			expect(input.props().placeholder).to.contain('This is an input');
		});

		it('should accept arbitrary props', () => {
			expect(input.props()['aria-haspopup']).to.be.true;
		});
	});

	describe('Icon', () => {

		it('only renders when iconAttributes.path prop present', () => {
			let wrapper = mount(
				<XUIInput
					onChange={ () => true }
					qaHook='test-input'
					iconAttributes={{color: 'red'}}
				/>
			);

			expect(wrapper.find('XUIIcon')).to.have.length(0);

			wrapper = mount(
				<XUIInput
					onChange={ () => true }
					qaHook='test-input'
					iconAttributes={{path: accessibility}}
				/>
			);

			expect(wrapper.find('XUIIcon')).to.have.length(1);
		});

		it('renders the position of icon as defined by the iconAttributes.position prop', () => {
			let wrapper = mount(
				<XUIInput
					onChange={ () => true }
					qaHook='test-input'
					iconAttributes={{path: accessibility, position: 'left'}}
				/>
			);

			expect(wrapper.find('XUIIcon').props().className).to.contain('xui-input--icon-left');

			wrapper = mount(
				<XUIInput
					onChange={ () => true }
					qaHook='test-input'
					iconAttributes={{path: accessibility, position: 'right'}}
				/>
			);

			expect(wrapper.find('XUIIcon').props().className).to.contain('xui-input--icon-right');
		});

		it('renders with input', () => {
			let wrapper = mount(
				<XUIInput
					onChange={ () => true }
					qaHook='test-input'
					iconAttributes={{path: accessibility}}
				/>
			);

			expect(wrapper.find('XUIIcon')).to.have.length(1);
		});

		it('renders the icon within a div with class xui-input-iconwrapper when the iconAttributes.wrapperColor prop is defined', () => {
			let wrapper = mount(
				<XUIInput
					onChange={ () => true }
					qaHook='test-input'
					iconAttributes={{path: accessibility, position: 'left', wrapperColor: 'facebook'}}
				/>
			);

			expect(wrapper.find('.xui-input--iconwrapper')).to.have.length(1);
		});
	});

	describe('Clear Button', () => {
		it('renders when the hasCloseButton property is defined, but is not visible if the input is empty', () => {
			let wrapper = mount(
				<XUIInput
					onChange={ () => true }
					hasClearButton={true}
					qaHook='test-input'
					iconAttributes={{path: accessibility, position: 'left', wrapperColor: 'facebook'}}
				/>
			);

			expect(wrapper.find('.xui-button-icon')).to.have.length(1);
			expect(wrapper.find('.xui-u-hidden')).to.have.length(1);
		});

		it('renders when the hasCloseButton property is defined and the input is not empty', () => {
			let wrapper = mount(
				<XUIInput
					onChange={ () => true }
					hasClearButton={true}
					inputAttributes={{defaultValue: "Some string"}}
					qaHook='test-input'
					iconAttributes={{path: accessibility, position: 'left', wrapperColor: 'facebook'}}
				/>
			);

			expect(wrapper.find('.xui-button-icon')).to.have.length(1);
			expect(wrapper.find('.xui-u-hidden')).to.have.length(0);
		});

		it('does not render when the hasCloseButton property is not defined', () => {
			let wrapper = mount(
				<XUIInput
					onChange={ () => true }
					qaHook='test-input'
					iconAttributes={{path: accessibility, position: 'left', wrapperColor: 'facebook'}}
				/>
			);

			expect(wrapper.find('.xui-button-icon')).to.have.length(0);
			expect(wrapper.find('.xui-u-hidden')).to.have.length(0);
		});

		it('fires onChange when the clear button is clicked', () => {
			let onChangeFired = false;
			let wrapper = mount(
				<XUIInput
					hasClearButton={true}
					inputAttributes={{defaultValue: "Some string", onChange: () => onChangeFired = true }}
					qaHook='test-input'
					iconAttributes={{path: accessibility, position: 'left', wrapperColor: 'facebook'}}
				/>
			);

			wrapper.find('.xui-button-icon').simulate('click');

			expect(onChangeFired).to.be.true;
		});
	});

	describe('Validation', () => {
		it('renders with the correct class on the input if isInvalid=true', () => {
			let wrapper = mount(
				<XUIInput
					onChange={ () => true }
					isInvalid={true}
				/>
			);

			const input = wrapper.find('input');
			expect(input.hasClass('xui-input-is-invalid')).to.be.true;
		});

		it('renders with a hint message if one is provided', () => {
			const msg = 'Boo';
			let wrapper = mount(
				<XUIInput
					onChange={ () => true }
					hintMessage={msg}
					validationMessage="Wut?"
				/>
			);

			const validationEl = wrapper.find('.xui-validation');
			expect(validationEl.text()).to.equal(msg);
		});

		it('renders with the correct class on the validation element if isInvalid=true and a validation message is present', () => {
			let wrapper = mount(
				<XUIInput
					onChange={ () => true }
					isInvalid={true}
					validationMessage="Boo"
					hintMessage="Hai"
				/>
			);

			const input = wrapper.find('input');
			expect(input.hasClass('xui-input-is-invalid')).to.be.true;

			const validationEl = wrapper.find('.xui-validation');
			expect(validationEl.hasClass('xui-validation-is-invalid')).to.be.true;
		});

		it('renders with the correct class on the validation element if isInvalid=true and no validation message is present', () => {
			let wrapper = mount(
				<XUIInput
					onChange={ () => true }
					isInvalid={true}
					hintMessage="Hai"
				/>
			);

			const input = wrapper.find('input');
			expect(input.hasClass('xui-input-is-invalid')).to.be.true;

			const validationEl = wrapper.find('.xui-validation');
			expect(validationEl.hasClass('xui-validation-is-invalid')).to.be.false;
		});
	});
});
