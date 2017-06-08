import React from 'react';
import { mount } from 'enzyme';
import DropDown from '../DropDown.js';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import div from './helpers/container';

let wrapper;
let click = false;
const setClick = () => click = true;

describe('<DropDown /> API Methods', () => {
	beforeEach(() => {
		click = false;
		wrapper = mount(
			<DropDown className="test">
				<Picklist>
					<Pickitem onClick={setClick} id="2">Item 1</Pickitem>
				</Picklist>
			</DropDown>, {attachTo: div});
	});

	it('renders with the correct classes', () => {
		expect(wrapper.find('.xui-dropdown-layout')).toHaveLength(1);
	});

	it('handles an undefined or null menu item', () => {
		wrapper = mount(
			<DropDown>
				<Picklist>
					<Pickitem onClick={setClick} id="1">Item 1</Pickitem>
					{undefined}
				</Picklist>
				<Picklist>
					<Pickitem onClick={setClick} id="2">Item 2</Pickitem>
					{null}
				</Picklist>
			</DropDown>, {attachTo: div});

		expect(wrapper).toBeDefined();
	});

	it('fires the callback when you click on a pick item', () => {
		wrapper.find(Pickitem).first().childAt(0).simulate('click');
		expect(click).toBeTruthy();
	});
});
