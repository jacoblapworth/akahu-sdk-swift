import React from 'react';
import Enzyme, { mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import { nanoid } from 'nanoid';
import TestScaffold from '../stories/stories';
import { variations } from '../stories/variations';

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testDropdownId');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUITable />', () => {
  describe('emulate stories', () => {
    variations.forEach(({ storyKind, storyTitle, examples }) => {
      it(`should render scenario "${storyKind} ${storyTitle}" correctly`, () => {
        // Arrange
        const wrapper = render(<div>{examples.map(TestScaffold)}</div>);

        // Assert
        expect(toJson(wrapper)).toMatchSnapshot();
      });
    });
  });
  describe('unit tests', () => {
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

    it('should pass accessibility testing', async () => {
      const wrapper = mount(<TestScaffold {...settings} />);
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });

    it('should render QA hooks on various child elements, if provided', () => {
      const exampleTable = renderer.create(<TestScaffold {...settings} />);
      expect(exampleTable).toMatchSnapshot();
    });
  });
});
