import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import div from './helpers/container';
import XUIAutocompleter from '../XUIAutocompleter';
import Pill from '../../pill/XUIPill';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import XUILoader from '../../loader/XUILoader';
import DropDownToggled from '../../dropdown/DropDownToggled';
import DropDownLayout from '../../dropdown/DropDownLayout';

Enzyme.configure({ adapter: new Adapter() });

describe('XUIAutocompleter', () => {
	let wrapper;
	let searched = false;
	beforeEach(() => {
		wrapper = mount(
			<XUIAutocompleter
				onSearch={() => searched = true }
				placeholder="Search"
				searchValue="a"
				dropdownSize="medium"
				qaHook="baseAC"
				forceDesktop
			>
				<Picklist>
					<Pickitem id="item1">Item 1</Pickitem>
					<Pickitem id="item2">Item 2</Pickitem>
				</Picklist>
			</XUIAutocompleter>, { attachTo: div }
		);
	});

	it('has data-automationid set on the input, list and container', () => {
		expect(wrapper.find({'data-automationid':'baseAC-input'})).toHaveLength(1);
		expect(wrapper.find({'data-automationid':'baseAC-input--container'})).toHaveLength(1);
		expect(wrapper.instance().ddt.props.dropdown.props.qaHook).toEqual('baseAC-list');
	});

	it('inserts the searchValue inside the input', () => {
		expect(wrapper.find('input[type="search"]').instance().value).toEqual('a')
	});

	it('fires the onSearch callback when the input value has changed', () => {
		expect(searched).toBeFalsy();

		wrapper.find('input[type="search"]').simulate('change', {
			target: {
				value: 'a'
			}
		});

		expect(searched).toBeTruthy();
	});

	it('renders with loading as false by default', () => {
		expect(wrapper.prop('loading')).toBeFalsy();
	});

	it('displays a XUILoader when loading is true', () => {
		const wrapper = mount(
			<XUIAutocompleter
				searchValue="a"
				loading
				forceDesktop
			>
				<Picklist>
					<Pickitem id="item1">Item 1</Pickitem>
				</Picklist>
			</XUIAutocompleter>, {attachTo: div}
		);

		expect(wrapper.find(XUILoader)).toBeDefined();
		expect(wrapper.prop('loading')).toBeTruthy();
	});

	it('renders pills as children passed in through the pills prop', () => {
		const wrapper = mount(
			<XUIAutocompleter
				pills={<Pill value="ABC" />}
				forceDesktop
			>
				<Picklist>
					<Pickitem id="item1">Item 1</Pickitem>
				</Picklist>
			</XUIAutocompleter>, {attachTo: div}
		);

		expect(wrapper.find(Pill)).toBeDefined();
	});

	it('opens the dropdown when we trigger `openDropDown` and closes the dropdown when we trigger `closeDropDown`', () => {
		expect(wrapper.instance().ddt.state.isHidden).toBeTruthy();

		wrapper.instance().openDropDown();
		expect(wrapper.instance().ddt.state.isHidden).toBeFalsy()

		wrapper.instance().closeDropDown();
		expect(wrapper.instance().ddt.state.isHidden).toBeTruthy();
	});

	it('sets the dropdown to match trigger width if no dropdownSize is provided in the component props', () => {
		const wrapper = mount(
			<XUIAutocompleter forceDesktop>
				<Picklist>
					<Pickitem id="item1">Item 1</Pickitem>
				</Picklist>
			</XUIAutocompleter>, {attachTo: div}
		);
		expect(wrapper.find(DropDownToggled).props().matchTriggerWidth).toBeTruthy();
	});

	it('when disableWrapPill prop is applied adds a pillwrap class, but not by default', () => {
		expect(wrapper.find('.xui-autocompleter--trigger-pillwrap')).toBeDefined();

		const disableWrapPills = mount(
			<XUIAutocompleter disableWrapPills>
				<Picklist>
					<Pickitem id="item1">Item 1</Pickitem>
				</Picklist>
			</XUIAutocompleter>, {attachTo: div}
		);
		expect(disableWrapPills.find('.xui-autocompleter--trigger').hasClass('xui-autocompleter--trigger-pillwrap')).toBeFalsy();
	});

	describe.skip('Dropdown + Portal skipped tests', () => {
		it('uses the correct size variant if one is defined and doesn\'t try match trigger width', () => {
			expect(wrapper.find(DropDownLayout).props().size).toBe('medium');
			expect(wrapper.find(DropDownToggled).props().matchTriggerWidth).toBeFalsy();
		});
	});


});
