import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionSplit from '../XUICompositionSplit';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionSplit>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUICompositionSplit
				secondary={<div></div>}
				primary={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUICompositionSplit
				secondary={<div></div>}
				primary={<div></div>}
				>
				Hello
			</XUICompositionSplit>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('should include custom class and omit width-limiting class, if specified', () => {
		const wrapper = renderer.create(
			<XUICompositionSplit
				secondary={<div></div>}
				primary={<div></div>}
				className="split-without-head"
				isInfinite={true}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should include layout restriction class, if specified', () => {
		const wrapper = renderer.create(
			<XUICompositionSplit
				secondary={<div></div>}
				primary={<div></div>}
				retainWidth="small"
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
