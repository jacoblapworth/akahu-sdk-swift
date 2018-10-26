import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIComposition4 from '../XUIComposition4';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIComposition4>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUIComposition4
				summary={<div></div>}
				main={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUIComposition4
				summary={<div></div>}
				main={<div></div>}
				>
				Hello
			</XUIComposition4>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('should include custom class and omit width-limiting class, if specified', () => {
		const wrapper = renderer.create(
			<XUIComposition4
				summary={<div></div>}
				main={<div></div>}
				className="summary-without-head"
				isInfinite={true}
				>
			</XUIComposition4>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
