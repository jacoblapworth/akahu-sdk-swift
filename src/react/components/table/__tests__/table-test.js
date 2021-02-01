import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { nanoid } from 'nanoid';
import TestScaffold from '../stories/stories';
import { variations } from '../stories/variations';

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testDropdownId');

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
  describe('unit tests', () => {
    it('should render QA hooks on various child elements, if provided', () => {
      const settings = {
        columns: 1,
        tableProps: {
          data: {
            0: { content: 'Apple' },
            1: { content: 'Carrot' },
          },
          qaHook: 'testTableHook',
          header: true,
          footer: true,
          hasCheckbox: true,
          onCheckAllToggle: () => {},
          onCheckOneToggle: () => {},
          hasOverflowMenu: true,
          createOverflowMenu: () => {},
        },
        cellHeadQaHook: 'cellHeadQaHook',
        cellBodyQaHook: 'cellBodyQaHook',
      };
      const exampleTable = renderer.create(<TestScaffold {...settings} />);
      expect(exampleTable).toMatchSnapshot();
    });
  });
});
