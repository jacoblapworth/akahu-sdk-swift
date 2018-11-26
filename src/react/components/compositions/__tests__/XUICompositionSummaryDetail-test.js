import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionSummaryDetail from '../XUICompositionSummaryDetail';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionSummaryDetail>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUICompositionSummaryDetail
				summary={<div></div>}
				main={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUICompositionSummaryDetail
				summary={<div></div>}
				main={<div></div>}
				>
				Hello
			</XUICompositionSummaryDetail>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('should include custom class and omit width-limiting class, if specified', () => {
		const wrapper = renderer.create(
			<XUICompositionSummaryDetail
				summary={<div></div>}
				main={<div></div>}
				className="summary-without-head"
				isInfinite={true}
				>
			</XUICompositionSummaryDetail>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
