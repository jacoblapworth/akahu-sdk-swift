import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIComposition5 from '../XUIComposition5';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIComposition5>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUIComposition5
				header={<div></div>}
				main={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUIComposition5
				header={<div></div>}
				main={<div></div>}
				>
				Hello
			</XUIComposition5>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('should include custom class and omit width-limiting class, if specified', () => {
		const wrapper = renderer.create(
			<XUIComposition5
				header={<div></div>}
				main={<div></div>}
				className="single-with-head"
				isInfinite={true}
				>
			</XUIComposition5>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
