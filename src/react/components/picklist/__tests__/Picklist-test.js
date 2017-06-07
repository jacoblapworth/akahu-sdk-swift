import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Picklist from '../Picklist';
import div from './helpers/container';

describe('< Picklist />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(
			<Picklist><li>Yo</li></Picklist>,
		{attachTo: div});
	});

	it('should render with a class of `xui-picklist`', () => {
		expect(wrapper).to.exist;
		expect(wrapper.find('ul').hasClass('xui-picklist')).to.be.true;
	});
});
