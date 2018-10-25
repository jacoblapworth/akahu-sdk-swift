import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIComposition8 from '../XUIComposition8';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIComposition8>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUIComposition8
				main={<div></div>}
				media={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUIComposition8
				main={<div></div>}
				media={<div></div>}
				>
				Hello
			</XUIComposition8>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('should include custom class and omit width-limiting class, if specified', () => {
		const wrapper = renderer.create(
			<XUIComposition8
				main={<div></div>}
				media={<div></div>}
				className="split-without-head"
				isInfinite={true}
				>
			</XUIComposition8>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
