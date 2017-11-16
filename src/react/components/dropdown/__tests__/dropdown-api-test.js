import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DropDown from '../DropDown';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import div from './helpers/container';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let click = false;
const setClick = () => click = true;

describe('<DropDown /> API Methods', () => {
	beforeEach(() => {
		click = false;
		wrapper = mount(
			<DropDown className="test">
				<Picklist>
					<Pickitem onClick={setClick} id="item1">Item 1</Pickitem>
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
					<Pickitem onClick={setClick} id="item1">Item 1</Pickitem>
					{undefined}
				</Picklist>
				<Picklist>
					<Pickitem onClick={setClick} id="item2">Item 2</Pickitem>
					{null}
				</Picklist>
			</DropDown>, {attachTo: div});

		expect(wrapper).toBeDefined();
	});

	it('fires the callback when you click on a pick item', () => {
		wrapper.find(Pickitem).find('button').simulate('click');
		expect(click).toBeTruthy();
	});
});
