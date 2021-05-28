import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import XUIToastAction from '../XUIToastAction';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIToastAction />', () => {
  it('should render a passed qaHook as an automation id', () => {
    const toastAction = renderer.create(
      <XUIToastAction qaHook="toast-action">Action 1</XUIToastAction>,
    );

    expect(toastAction).toMatchSnapshot();
  });

  it("should render a custom href because it's a link", () => {
    const toastAction = renderer.create(
      <XUIToastAction href="https://www.xero.com">Action 1</XUIToastAction>,
    );

    expect(toastAction).toMatchSnapshot();
  });

  it('should be able to render custom class names', () => {
    const toastAction = renderer.create(
      <XUIToastAction className="custom-class">Action 1</XUIToastAction>,
    );

    expect(toastAction).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIToastAction>Action 1</XUIToastAction>);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
