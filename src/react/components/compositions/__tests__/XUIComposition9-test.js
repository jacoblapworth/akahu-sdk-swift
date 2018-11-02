import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIComposition9 from '../XUIComposition9';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIComposition9>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUIComposition9
				header={<div></div>}
				nav={<div></div>}
				main={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUIComposition9
				header={<div></div>}
				nav={<div></div>}
				main={<div></div>}
				>
				Hello
			</XUIComposition9>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
