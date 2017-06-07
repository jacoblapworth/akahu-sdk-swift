import React from 'react';
import { mount, shallow } from 'enzyme';
import div from './helpers/container';
import Autocompleter from '../Autocompleter';
import Pill from '../../pill/XUIPill';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import XUILoader from '../../loader/XUILoader';

describe('Autocompleter', () => {
	let wrapper;
	let searched = false;
	beforeEach(() => {
		wrapper = mount(
			<Autocompleter
				onSearch={() => searched = true }
				placeholder="Search"
				searchValue='a'
				dropdownSize="medium"
				qaHook="baseAC"
			>
				<Picklist>
					<Pickitem id="item1">Item 1</Pickitem>
					<Pickitem id="item2">Item 2</Pickitem>
				</Picklist>
			</Autocompleter>, { attachTo: div }
		);
	});


	it('renders with medium sizing when declared', () => {
		expect(wrapper.find('.xui-dropdown-medium')).toBeDefined();
		expect(wrapper.find('.dropdown-toggled-wrapper').hasClass('xui-u-fullwidth')).toBeFalsy();
	});

	it('has data-automationid set on the input, list and container', () => {
		const input = wrapper.find('input[type="search"]');
		const container = wrapper.find('.ac-input-wrapper');

		expect(input.prop('data-automationid')).toEqual('baseAC-input');
		expect(container.prop('data-automationid')).toEqual('baseAC-input-container');
		expect(wrapper.instance().ddt.props.dropdown.props.qaHook).toEqual('baseAC-list');
	});

	it('inserts the searchValue inside the input', () => {
		expect(wrapper.find('input[type="search"]').node.value).toEqual('a')
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
			<Autocompleter
				searchValue='a'
				loading={true}
			>
				<Picklist>
					<Pickitem id="item1">Item 1</Pickitem>
				</Picklist>
			</Autocompleter>, {attachTo: div}
		);

		expect(wrapper.find(XUILoader)).toBeDefined();
		expect(wrapper.prop('loading')).toBeTruthy();
	});

	it('renders pills as children passed in through the pills prop', () => {
		const wrapper = mount(
			<Autocompleter
				pills={<Pill value="ABC" />}
			>
				<Picklist>
					<Pickitem id="item1">Item 1</Pickitem>
				</Picklist>
			</Autocompleter>, {attachTo: div}
		);

		expect(wrapper.find(Pill)).toBeDefined();
	});

	it('opens the dropdown when we trigger `openDropDown` and closes the dropdown when we trigger `closeDropDown`', (done) => {
		expect(wrapper.instance().ddt.state.isHidden).toBeTruthy();

		wrapper.instance().openDropDown();
		expect(wrapper.instance().ddt.state.isHidden).toBeFalsy()

		wrapper.instance().closeDropDown();
		setTimeout(() => {
			expect(wrapper.instance().ddt.state.isHidden).toBeTruthy();
			done();
		}, 100);
	});

	it('applies the xui-u-fullwidth class if no dropdownSize is provided in the component props', (done) => {
		const wrapper = mount(
			<Autocompleter>
				<Picklist>
					<Pickitem id="item1">Item 1</Pickitem>
				</Picklist>
			</Autocompleter>, {attachTo: div}
		);
		expect(wrapper.find('.dropdown-toggled-wrapper').hasClass('xui-u-fullwidth')).toBeTruthy();
	});
});
