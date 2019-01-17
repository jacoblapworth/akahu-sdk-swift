import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionDetail from '../XUICompositionDetail';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionDetail>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUICompositionDetail
				detail={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUICompositionDetail
				detail={<div></div>}
				>
				Hello
			</XUICompositionDetail>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should include custom class and omit width-limiting class, if specified', () => {
		const wrapper = renderer.create(
			<XUICompositionDetail
				detail={<div></div>}
				className="single-without-head"
				isInfinite={true}
				>
			</XUICompositionDetail>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
