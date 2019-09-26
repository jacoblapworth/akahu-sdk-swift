import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import TestScaffold from '../stories/stories';
import { variations } from '../stories/variations';
import uuidv4 from 'uuid/v4';

jest.mock('uuid/v4');
uuidv4.mockImplementation(() => 'testDropdownId');

Enzyme.configure({ adapter: new Adapter() });

describe('<XUITable />', () => {
  describe('emulate stories', () => {
    variations.forEach(({ storyKind, storyTitle, examples }) => {
      it(`should render scenario "${storyKind} ${storyTitle}" correctly`, () => {
        const Comparison = examples.map(TestScaffold);
        const component = renderer.create(<div>{Comparison}</div>);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
