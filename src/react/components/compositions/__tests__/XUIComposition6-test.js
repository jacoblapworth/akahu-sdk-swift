import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIComposition6 from '../XUIComposition6';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIComposition6>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUIComposition6
				main={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUIComposition6
				main={<div></div>}
				>
				Hello
			</XUIComposition6>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('should include custom class and omit width-limiting class, if specified', () => {
		const wrapper = renderer.create(
			<XUIComposition6
				main={<div></div>}
				className="single-without-head"
				isInfinite={true}
				>
			</XUIComposition6>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
