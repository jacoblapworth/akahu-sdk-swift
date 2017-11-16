import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
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

	it('should render a automation id when a qaHook is passed in', () => {
		const automationId = renderer.create(<Picklist qaHook='picklist-example'><li>Yo</li></Picklist>);

		expect(automationId).toMatchSnapshot();
	})
});
