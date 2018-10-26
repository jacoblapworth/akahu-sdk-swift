import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIComposition3 from '../XUIComposition3';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIComposition3>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUIComposition3
				header={<div></div>}
				summary={<div></div>}
				main={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUIComposition3
				header={<div></div>}
				summary={<div></div>}
				main={<div></div>}
				>
				Hello
			</XUIComposition3>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('should include custom class and omit width-limiting class, if specified', () => {
		const wrapper = renderer.create(
			<XUIComposition3
				header={<div></div>}
				summary={<div></div>}
				main={<div></div>}
				className="summary-with-head"
				isInfinite={true}
				>
			</XUIComposition3>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
