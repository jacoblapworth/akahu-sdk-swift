import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIComposition7 from '../XUIComposition7';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIComposition7>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUIComposition7
				header={<div></div>}
				main={<div></div>}
				media={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUIComposition7
				header={<div></div>}
				main={<div></div>}
				media={<div></div>}
				>
				Hello
			</XUIComposition7>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('should include custom class and omit width-limiting class, if specified', () => {
		const wrapper = renderer.create(
			<XUIComposition7
				header={<div></div>}
				main={<div></div>}
				media={<div></div>}
				className="split-with-head"
				isInfinite={true}
				>
			</XUIComposition7>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
