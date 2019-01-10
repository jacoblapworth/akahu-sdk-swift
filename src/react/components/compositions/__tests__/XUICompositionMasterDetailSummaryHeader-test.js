import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionMasterDetailSummaryHeader from '../XUICompositionMasterDetailSummaryHeader';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionMasterDetailSummaryHeader>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUICompositionMasterDetailSummaryHeader
				header={<div></div>}
				master={<div></div>}
				summary={<div></div>}
				detail={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUICompositionMasterDetailSummaryHeader
				header={<div></div>}
				master={<div></div>}
				summary={<div></div>}
				detail={<div></div>}
				>
				Hello
			</XUICompositionMasterDetailSummaryHeader>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should include layout restriction class for medium, if specified', () => {
		const wrapper = renderer.create(
			<XUICompositionMasterDetailSummaryHeader
				header={<div></div>}
				master={<div></div>}
				summary={<div></div>}
				detail={<div></div>}
				retainWidth="medium"
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should include layout restriction class for small, if specified', () => {
		const wrapper = renderer.create(
			<XUICompositionMasterDetailSummaryHeader
				header={<div></div>}
				master={<div></div>}
				summary={<div></div>}
				detail={<div></div>}
				retainWidth="small"
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
