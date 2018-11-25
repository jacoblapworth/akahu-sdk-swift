import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionDetailSplit from '../XUICompositionDetailSplit';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionDetailSplit>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUICompositionDetailSplit
				main={<div></div>}
				media={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUICompositionDetailSplit
				main={<div></div>}
				media={<div></div>}
				>
				Hello
			</XUICompositionDetailSplit>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('should include custom class and omit width-limiting class, if specified', () => {
		const wrapper = renderer.create(
			<XUICompositionDetailSplit
				main={<div></div>}
				media={<div></div>}
				className="split-without-head"
				isInfinite={true}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
