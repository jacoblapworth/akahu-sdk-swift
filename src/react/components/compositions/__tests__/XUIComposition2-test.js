import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIComposition2 from '../XUIComposition2';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIComposition2>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUIComposition2
				nav={<div></div>}
				summary={<div></div>}
				main={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUIComposition2
				nav={<div></div>}
				summary={<div></div>}
				main={<div></div>}
				>
				Hello
			</XUIComposition2>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
