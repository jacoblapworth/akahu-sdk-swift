import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import XUIStepper from '../XUIStepper';
import { variations } from '../stories/variations';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIStepper />', () => {
  describe('emulate stories', () => {
    variations.forEach(({ storyKind, storyTitle, ...props }) => {
      it(`should render scenario "${storyKind} ${storyTitle}" correctly`, () => {
        const component = mount(<XUIStepper {...props} />);

        expect(toJson(component)).toMatchSnapshot();
      });
    });
  });
});
