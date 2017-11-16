import React from 'react';
import SelectBox from '../SelectBox';
import SelectBoxOption from '../SelectBoxOption';
import { then } from './helpers';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import qaHooks from '../qaHooks';

Enzyme.configure({ adapter: new Adapter() });

describe('SelectBox', function () {
	const options = ['Santa Cruz', 'Transition', 'Lapierre', 'Surly', 'Kona'];
	let select;
	let wasSelected = false;

	beforeEach(function () {
		select = mount(
			<SelectBox
				label="Test Select Box"
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
				label="Does not have children"
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

	describe('qaHook/Automation IDs are added correctly', () => {
		const qaHook = 'testQaHook';
		const noop = () => {};
		const select = mount(
			<SelectBox
				label='QA Hook test'
				qaHook={qaHook}
				name="Test"
				type="search"
				onInputChange={noop}
				onInputBlur={noop}
				buttonContent="test"
				buttonClasses="blah"
				forceDesktop
			>
				<SelectBoxOption id="sample" key="sample" onSelect={noop} value="Sample value">A sample option</SelectBoxOption>
			</SelectBox>
		);


		const nodeAutoId = select.getDOMNode().getAttribute('data-automationid');
		const buttonAutoId = select.find('button.blah').first().prop('data-automationid');

		expect(nodeAutoId).toEqual(qaHook);
		expect(buttonAutoId).toEqual(`${qaHook}-${qaHooks.button}`);
	});
});
