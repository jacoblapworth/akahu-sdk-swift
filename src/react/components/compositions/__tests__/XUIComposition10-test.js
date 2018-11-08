import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIComposition10 from '../XUIComposition10';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIComposition10>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUIComposition10
				nav={<div></div>}
				main={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUIComposition10
				nav={<div></div>}
				main={<div></div>}
				>
				Hello
			</XUIComposition10>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
