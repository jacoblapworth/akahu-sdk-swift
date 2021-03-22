import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import XUIToastMessage from '../XUIToastMessage';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIToastMessage />', () => {
  it('should render a passed qaHook as an automation id', () => {
    const toastMessage = renderer.create(
      <XUIToastMessage qaHook="toast-actions">Message Content</XUIToastMessage>,
    );

    expect(toastMessage).toMatchSnapshot();
  });

  it('should render a passed custom class', () => {
    const toastMessage = renderer.create(
      <XUIToastMessage className="custom-class">Message Content</XUIToastMessage>,
    );

    expect(toastMessage).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIToastMessage>Message Content</XUIToastMessage>);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
