import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionDetailHeader from '../XUICompositionDetailHeader';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionDetailHeader>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUICompositionDetailHeader
				header={<div></div>}
				main={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUICompositionDetailHeader
				header={<div></div>}
				main={<div></div>}
				>
				Hello
			</XUICompositionDetailHeader>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('should include custom class and omit width-limiting class, if specified', () => {
		const wrapper = renderer.create(
			<XUICompositionDetailHeader
				header={<div></div>}
				main={<div></div>}
				className="single-with-head"
				isInfinite={true}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
