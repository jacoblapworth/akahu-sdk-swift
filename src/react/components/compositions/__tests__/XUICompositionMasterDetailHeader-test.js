import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionMasterDetailHeader from '../XUICompositionMasterDetailHeader';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionMasterDetailHeader>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUICompositionMasterDetailHeader
				header={<div></div>}
				master={<div></div>}
				detail={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUICompositionMasterDetailHeader
				header={<div></div>}
				master={<div></div>}
				detail={<div></div>}
				>
				Hello
			</XUICompositionMasterDetailHeader>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
