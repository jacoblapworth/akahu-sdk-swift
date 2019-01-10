import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionSplitHeader from '../XUICompositionSplitHeader';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionSplitHeader>', () => {

	it('renders basic example', () => {
		const wrapper = renderer.create(
			<XUICompositionSplitHeader
				header={<div></div>}
				secondary={<div></div>}
				primary={<div></div>}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should do nothing with children', () => {
		const wrapper = renderer.create(
			<XUICompositionSplitHeader
				header={<div></div>}
				secondary={<div></div>}
				primary={<div></div>}
				>
				Hello
			</XUICompositionSplitHeader>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it('should include custom class and omit width-limiting class, if specified', () => {
		const wrapper = renderer.create(
			<XUICompositionSplitHeader
				header={<div></div>}
				secondary={<div></div>}
				primary={<div></div>}
				className="split-with-head"
				isInfinite={true}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('should include layout restriction class, if specified', () => {
		const wrapper = renderer.create(
			<XUICompositionSplitHeader
				header={<div></div>}
				secondary={<div></div>}
				primary={<div></div>}
				retainWidth="small"
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
