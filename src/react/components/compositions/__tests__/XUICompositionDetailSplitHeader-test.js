import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionDetailSplitHeader from '../XUICompositionDetailSplitHeader';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionDetailSplitHeader>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUICompositionDetailSplitHeader
				header={<div></div>}
				main={<div></div>}
				media={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUICompositionDetailSplitHeader
				header={<div></div>}
				main={<div></div>}
				media={<div></div>}
				>
				Hello
			</XUICompositionDetailSplitHeader>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('should include custom class and omit width-limiting class, if specified', () => {
		const wrapper = renderer.create(
			<XUICompositionDetailSplitHeader
				header={<div></div>}
				main={<div></div>}
				media={<div></div>}
				className="split-with-head"
				isInfinite={true}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
