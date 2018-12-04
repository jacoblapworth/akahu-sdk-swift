import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionMasterDetail from '../XUICompositionMasterDetail';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionMasterDetail>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUICompositionMasterDetail
				master={<div></div>}
				detail={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUICompositionMasterDetail
				master={<div></div>}
				detail={<div></div>}
				>
				Hello
			</XUICompositionMasterDetail>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
