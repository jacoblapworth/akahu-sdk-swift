import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionMasterDetailSummary from '../XUICompositionMasterDetailSummary';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionMasterDetailSummary>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUICompositionMasterDetailSummary
				nav={<div></div>}
				summary={<div></div>}
				main={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUICompositionMasterDetailSummary
				nav={<div></div>}
				summary={<div></div>}
				main={<div></div>}
				>
				Hello
			</XUICompositionMasterDetailSummary>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
