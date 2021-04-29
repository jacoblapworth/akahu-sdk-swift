import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import { v4 as uuidv4 } from 'uuid';
import TestScaffold from '../stories/stories';
import { variations } from '../stories/variations';

jest.mock('uuid');
uuidv4.mockImplementation(() => 'testDropdownId');

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

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

    it('should render QA hooks on various child elements, if provided', () => {
      const exampleTable = renderer.create(<TestScaffold {...settings} />);
      expect(exampleTable).toMatchSnapshot();
    });

    it.skip('should pass accessibility testing', async () => {
      const wrapper = mount(<TestScaffold {...settings} />);
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
  });
});
