import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionDetailSummaryHeader from '../XUICompositionDetailSummaryHeader';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionDetailSummaryHeader>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUICompositionDetailSummaryHeader
				header={<div></div>}
				summary={<div></div>}
				detail={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUICompositionDetailSummaryHeader
				header={<div></div>}
				summary={<div></div>}
				detail={<div></div>}
				>
				Hello
			</XUICompositionDetailSummaryHeader>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('should include custom class and omit width-limiting class, if specified', () => {
		const wrapper = renderer.create(
			<XUICompositionDetailSummaryHeader
				header={<div></div>}
				summary={<div></div>}
				detail={<div></div>}
				className="summary-with-head"
				isInfinite={true}
				>
			</XUICompositionDetailSummaryHeader>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
