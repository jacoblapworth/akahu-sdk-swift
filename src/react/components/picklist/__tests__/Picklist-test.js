import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Picklist from '../Picklist';
import div from './helpers/container';

Enzyme.configure({ adapter: new Adapter() });

describe('< Picklist />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(
			<Picklist><li>Yo</li></Picklist>,
		{attachTo: div});
	});

	it('should render with a class of `xui-picklist`', () => {
		expect(wrapper).toBeDefined();
		expect(wrapper.find('ul').hasClass('xui-picklist')).toBeTruthy();
	});
});
