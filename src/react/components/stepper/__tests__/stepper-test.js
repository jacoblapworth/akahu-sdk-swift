import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import toJson from 'enzyme-to-json';
import XUIStepper from '../XUIStepper';
import { variations } from '../stories/variations';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIStepper />', () => {
  it.skip('should pass accessibility testing', async () => {
    const tabs = [{ name: 'Tab 1' }, { name: 'Tab 2' }];
    const wrapper = mount(<XUIStepper currentStep={0} id="test-stepper" tabs={tabs} />);

    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  describe('emulate stories', () => {
    variations.forEach(({ storyKind, storyTitle, ...props }) => {
      it(`should render scenario "${storyKind} ${storyTitle}" correctly`, () => {
        const component = mount(<XUIStepper {...props} />);

        expect(toJson(component)).toMatchSnapshot();
      });
    });
  });
});
