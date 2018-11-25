import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionSummaryDetailHeader from '../XUICompositionSummaryDetailHeader';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionSummaryDetailHeader>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUICompositionSummaryDetailHeader
				header={<div></div>}
				summary={<div></div>}
				main={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUICompositionSummaryDetailHeader
				header={<div></div>}
				summary={<div></div>}
				main={<div></div>}
				>
				Hello
			</XUICompositionSummaryDetailHeader>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('should include custom class and omit width-limiting class, if specified', () => {
		const wrapper = renderer.create(
			<XUICompositionSummaryDetailHeader
				header={<div></div>}
				summary={<div></div>}
				main={<div></div>}
				className="summary-with-head"
				isInfinite={true}
				>
			</XUICompositionSummaryDetailHeader>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
