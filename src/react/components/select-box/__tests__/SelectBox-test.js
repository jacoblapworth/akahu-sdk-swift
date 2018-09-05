import React from 'react';
import SelectBox from '../SelectBox';
import SelectBoxOption from '../SelectBoxOption';
import { then } from './helpers';
import Enzyme, { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import uuidv4 from 'uuid/v4';

jest.mock('uuid/v4');
uuidv4.mockImplementation(() => 'testDropdownId');

Enzyme.configure({ adapter: new Adapter() });

describe('SelectBox', function () {
	const options = ['Santa Cruz', 'Transition', 'Lapierre', 'Surly', 'Kona'];
	let select;
	let wasSelected = false;

	beforeEach(function () {
		select = mount(
			<SelectBox
				labelText="Test Select Box"
				value={options[0]}
				name="Test"
				buttonContent={options[0]}
				buttonClasses="blah"
				forceDesktop
			>
				{options.map((opt, idx) => {
					return (
						<SelectBoxOption
							id={opt}
							key={opt + idx}
							selected={opt === options[0]}
							onSelect={() => {wasSelected = true}}
							value={opt}
							showCheckboxes={true}
							truncatedText={true}
						>
							{opt}
						</SelectBoxOption>
					);
				})}
			</SelectBox>
		);
	});

	it('should place the defaultValue as the initial input value', function () {
		// Have to remove the title of the SVG used to show the down arrow icon
		const buttonValue = select.find('button').first().text().replace('Toggle List', '');
		expect(buttonValue).toEqual(options[0]);
	});

	it('should open the dropdown on click of the button when it has children', function () {
		select.find('button.blah').first().simulate('click');
		expect(select.instance().isDropDownOpen()).toBeTruthy();
	});

	it('should not open the dropdown on click of the button when it does not have children', function () {
		select = mount(
			<SelectBox
				value="Test"
				labelText="Does not have children"
				name="Test"
				buttonContent="test"
				buttonClasses="blah"
				isOpen={false}
				forceDesktop
			>
			</SelectBox>
		);

		select.find('button.blah').first().simulate('click');
		expect(select.instance().isDropDownOpen()).toBeFalsy();
	});

	it('should not open the dropdown on click if the control is disabled', function () {
		select = mount(
			<SelectBox
				labelText='test'
				buttonContent="test"
				buttonClasses="blah"
				isOpen={false}
				forceDesktop
				isDisabled
			>
				<SelectBoxOption id='1' value='A sample option' label='test'>A sample option</SelectBoxOption>
			</SelectBox>
		);

		select.find('button.blah').first().simulate('click');
		expect(select.instance().isDropDownOpen()).toBeFalsy();
	});

	it('should call onSelect on click of option', function () {

		then(() => select.find('.xui-pickitem').first().simulate('click'))
		.then(() => {
			expect(wasSelected).toBeTruthy();
		});
	});

	it('should open the dropdown on arrowDown', function() {
		select.find('button.blah').first().simulate('keydown', {
			key: 'down arrow',
			keyCode: 40,
			which: 40
		});

		expect(select.instance().isDropDownOpen()).toBeTruthy();
	});

	it('should render the appropriate automation id\'s when a qaHook is provided', () => {
		const select = renderer.create(
			<SelectBox
				qaHook='test-selectbox'
				labelText='test'
				buttonContent="test"
				id='testThisSelect'
				forceDesktop
			>
				<SelectBoxOption id='1' value='A sample option' label='test' qaHook='test-selectboxoption'>A sample option</SelectBoxOption>
			</SelectBox>
		);

		expect(select).toMatchSnapshot();
	});

	it('should render the trigger in a disabled state if `isDisabled` is set', () => {
		const select = renderer.create(
			<SelectBox
				labelText='test'
				buttonContent="test"
				forceDesktop
				isDisabled
			>
				<SelectBoxOption id='1' value='A sample option' label='test'>A sample option</SelectBoxOption>
			</SelectBox>
		);

		expect(select).toMatchSnapshot();
	});
});
