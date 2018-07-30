import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import DropDown from '../DropDown';
import DropDownToggled from '../DropDownToggled';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import div from './helpers/container';
import uuidv4 from 'uuid/v4';

jest.mock('uuid/v4');
uuidv4.mockImplementation(() => 'testDropdownId');

Enzyme.configure({ adapter: new Adapter() });

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
	return mount(
		<DropDownToggled
			className="testClass"
			forceDesktop={true}
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
			expect(wrapper.instance().isDropDownOpen()).toBeFalsy();
		});

		it('renders the list open on click of the trigger', () => {
			wrapper.find('.xui-button').simulate('click');

			expect(wrapper.state('isHidden')).toBeFalsy();
		});

		it('accepts classNames for the wrapping div', () => {
			expect(wrapper.find('testClass')).toBeTruthy();
		});

		it('calls the onOpen prop after the list is open', () => {
			wrapper.find('.xui-button').simulate('click');

			expect(openCalled).toBeTruthy();
			expect(wrapper.instance().isDropDownOpen()).toBeTruthy();
		});

		it('calls the onClose prop after the list is closed', () => {
			wrapper.find('.xui-button').simulate('click');
			wrapper.find('.xui-button').simulate('click');

			expect(closeCalled).toBeTruthy();
		});

		// Failing to read state as it's out of scope when simulating the keyDown events
		it('opens the list when the down arrow is pressed from the trigger', () => {
			const trigger = wrapper.find('.xui-button');
			trigger.simulate('keyDown', { key: 'ArrowDown', keyCode: 40, which: 40 });

			expect(wrapper.instance().isDropDownOpen()).toBeTruthy();
		});
	});

	describe('dropdown rendered open', () => {
		let wrapper;
		beforeEach(() => {
			wrapper = getWrapper({ isHidden: false });
		});

		it('closes the list when the esc key is pressed', () => {
			expect(wrapper.instance().isDropDownOpen()).toBeTruthy();
			wrapper.find('.xui-button').simulate('keyDown', { keyCode: 9 });

			expect(wrapper.instance().isDropDownOpen()).toBeFalsy();
		});

		it('closes the list when the tab key is pressed', () => {
			expect(wrapper.instance().isDropDownOpen()).toBeTruthy();
			wrapper.find('.xui-button').simulate('keyDown', { keyCode: 27 });

			expect(wrapper.instance().isDropDownOpen()).toBeFalsy();
		});
	});

	it('should render a passed qaHook as an auotmation id', () => {
        const automationId = renderer.create(
			<DropDownToggled
				qaHook="ddt-example"
				trigger={getTrigger({qaHook: 'ddt-example--trigger'})}
				dropdown={getDropDown({ id: '1' })}
			/>
		);

        expect(automationId).toMatchSnapshot();
    });

	// These are skipped as enzyme cannot test shit rendered in portal.
	describe.skip('closeOnSelect', function () {
		it('closes the dropdown when the user selects something by default', function () {
			const wrapper = getWrapper({ isHidden: false });

			wrapper.closest('body').find('.xui-pickitem').first().simulate('click');

			expect(wrapper.node.isDropDownOpen()).toBeFalsy();
		});

		it('does not close the dropdown on select if closeOnSelect is set to false', function () {
			const wrapper = getWrapper({ isHidden: false, closeOnSelect: false });

			wrapper.find('.xui-pickitem').first().simulate('click');

			expect(wrapper.node.isDropDownOpen()).toBeTruthy();
		});
	});
});
