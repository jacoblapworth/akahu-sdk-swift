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
				nav={<div></div>}
				summary={<div></div>}
				main={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUICompositionMasterDetailSummaryHeader
				header={<div></div>}
				nav={<div></div>}
				summary={<div></div>}
				main={<div></div>}
				>
				Hello
			</XUICompositionMasterDetailSummaryHeader>
		);
		expect(wrapper).toMatchSnapshot();
	});
});