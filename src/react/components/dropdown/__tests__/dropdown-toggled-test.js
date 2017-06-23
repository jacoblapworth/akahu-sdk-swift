import React from 'react';
import { mount } from 'enzyme';
import { mock } from 'simple-mock';
import DropDown from '../DropDown';
import DropDownToggled from '../DropDownToggled';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import div from './helpers/container';

let openDropDownMock;
let triggerKeyDownHandlerMock;

let openCalled = false;
let closeCalled = false;

const getTrigger = (props) => <button {...props} className='xui-button xui-button-standard'>HOC Button</button>;
const getDropDown = (props) => {
	return (
		<DropDown
			{...props}
		>
			<Picklist>
				<Pickitem id="1">
					Im the whole shabang!
				</Pickitem>
				<Pickitem id="2">
					Earnings from Busking
				</Pickitem>
				<Pickitem id="3">
					Costs
				</Pickitem>
				<Pickitem id="4">
					Unnecessary Costs
				</Pickitem>
				<Pickitem id="5">
					Absolutely Necessary Costs
				</Pickitem>
			</Picklist>
		</DropDown>
	);
};

function getWrapper(props={}) {
	triggerKeyDownHandlerMock = mock(DropDownToggled.prototype, 'onTriggerKeyDown');
	openDropDownMock = mock(DropDownToggled.prototype, 'openDropDown');
	return mount(
		<DropDownToggled
			className="testClass"
			onOpen={() => openCalled = true}
			onClose={() => closeCalled = true}
			trigger={getTrigger()}
			dropdown={getDropDown()}
			{...props}
		/>,
		{
			attachTo: div
		}
	);
}

describe('<DropDownToggled />', () => {
	beforeEach(() => {
		openCalled = false;
		closeCalled = false;
	});

	describe('dropdown rendered closed', function () {
		let wrapper;
		beforeEach(function () {
			wrapper = getWrapper();
		});

		it('renders the list closed', () => {
			expect(wrapper.node.isDropDownOpen()).toBeFalsy();
			expect(document.body.getElementsByClassName('.xui-dropdown').length).toEqual(0);
		});

		it('renders the list open on click of the trigger', () => {
			wrapper.find('.xui-button').simulate('click');

			expect(openDropDownMock.callCount).toEqual(1);
			expect(wrapper.state('isHidden')).toBeFalsy();
		});

		it('accepts classNames for the wrapping div', () => {
			expect(wrapper.find('.dropdown-toggled-wrapper').hasClass('testClass')).toBeTruthy();
		});

		it('calls the onOpen prop after the list is open', () => {
			wrapper.find('.xui-button').simulate('click');

			expect(openCalled).toBeTruthy();
			expect(document.body.getElementsByClassName('xui-dropdown-layout')).toHaveLength(1);
		});

		it('calls the onClose prop after the list is closed', () => {
			wrapper.find('.xui-button').simulate('click');
			wrapper.find('.xui-button').simulate('click');
			//timeout is for animation to end.
			setTimeout(() => {
				expect(closeCalled).toBeTruthy();
			}, 1300);

			expect(document.body.getElementsByClassName('.xui-dropdown-layout')).toHaveLength(0);
		});

		//Failing to read state as it's out of scope when simulating the keyDown events
		it.skip('opens the list when the down arrow is pressed from the trigger', () => {
			const trigger = wrapper.find('.xui-button');
			trigger.simulate('keyDown', { key: 'ArrowDown', keyCode: 40, which: 40 });

			expect(triggerKeyDownHandlerMock.callCount).toEqual(1);
			expect(wrapper.node.isDropDownOpen()).toBeTruthy();
			expect(openDropDownMock.callCount).toEqual(1);
		});
	});

	describe('drodown rendered open', () => {
		let wrapper;
		beforeEach(() => {
			wrapper = getWrapper({ isHidden: false });
		});

		it('closes the list when the esc key is pressed', () => {
			expect(wrapper.node.isDropDownOpen()).toBeTruthy();
			wrapper.find('.xui-button').simulate('keyDown', { keyCode: 9 });

			//timeout is for animation to end.
			setTimeout(() => {
				expect(wrapper.node.isDropDownOpen()).toBeFalsey();
			}, 1300);
		});

		it('closes the list when the tab key is pressed', () => {
			expect(wrapper.node.isDropDownOpen()).toBeTruthy();
			wrapper.find('.xui-button').simulate('keyDown', { keyCode: 27 });

			//timeout is for animation to end.
			setTimeout(() => {
				expect(wrapper.node.isDropDownOpen()).toBeFalsey();
			}, 1300);
		});
	});

	//These are skipped as enzyme cannot test siblings.
	describe.skip('closeOnSelect', function () {
		it('closes the dropdown when the user selects something by default', function () {
			const wrapper = getWrapper({ isHidden: false });

			wrapper.closest(Pickitem).first().childAt(0).simulate('click');

			expect(wrapper.node.isDropDownOpen()).toBeFalsey();
		});

		it('does not close the dropdown on select if closeOnSelect is set to false', function () {
			const wrapper = getWrapper({ isHidden: false, closeOnSelect: false });

			wrapper.closest('.xui-pickitem').first().childAt(0).simulate('click');

			expect(wrapper.node.isDropDownOpen()).toBeTruthy();
		});
	});
});
