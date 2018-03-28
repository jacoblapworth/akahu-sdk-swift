import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import TestScaffold from '../stories/stories';
import { variations } from '../stories/variations';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUITable />', () => {
	describe('emulate stories', () => {
		variations.forEach(({ storyKind, storyTitle, examples }) => {
			it(`should render scenario "${storyKind} ${storyTitle}" correctly`, () => {
				const Comparison = examples.map(TestScaffold);
				const component = mount(<div>{ Comparison }</div>);

				expect(toJson(component)).toMatchSnapshot();
			});
		});
	});
});
