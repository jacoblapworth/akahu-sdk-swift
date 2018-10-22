import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIComposition1 from '../XUIComposition1';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIComposition1>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUIComposition1
				header={<div></div>}
				nav={<div></div>}
				summary={<div></div>}
				main={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUIComposition1
				header={<div></div>}
				nav={<div></div>}
				summary={<div></div>}
				main={<div></div>}
				>
				Hello
			</XUIComposition1>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
