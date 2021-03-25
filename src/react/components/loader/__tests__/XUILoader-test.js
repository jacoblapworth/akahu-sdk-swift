import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import XUILoader from '../XUILoader';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('XUILoader', function () {
  it('should render with an aria label describing its purpose', function () {
    const testString = 'Something is loading, please wait';
    const wrapper = mount(<XUILoader ariaLabel={testString} />);
    expect(wrapper.getDOMNode().getAttribute('aria-label')).toEqual(testString);
  });

  it('should add extra classes when defined', function () {
    const testClass = 'test-class';
    const wrapper = mount(
      <XUILoader className={testClass} ariaLabel="Something is loading, please wait" />,
    );
    expect(wrapper.getDOMNode().classList.contains(testClass)).toBeTruthy();
  });

  it('should add the layout class by default', function () {
    const testClass = 'test-class';
    const wrapper = mount(
      <XUILoader className={testClass} ariaLabel="Something is loading, please wait" />,
    );
    expect(wrapper.getDOMNode().classList.contains('xui-loader-layout')).toBeTruthy();
  });

  it('should not add the layout class if `defaultLayout` is set to `false`', function () {
    const wrapper = mount(
      <XUILoader defaultLayout={false} ariaLabel="Something is loading, please wait" />,
    );
    expect(wrapper.getDOMNode().classList.contains('xui-loader-layout')).toBeFalsy();
  });

  it('should add appropriate size classes', function () {
    const wrapper = renderer.create(
      <div>
        <XUILoader ariaLabel="Something is loading, please wait" />
        <XUILoader size="small" ariaLabel="Something is loading, please wait" />
        <XUILoader size="xsmall" ariaLabel="Something is loading, please wait" />
      </div>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should add the inverted class if `isInverted` is set to `true`', () => {
    const wrapper = mount(
      <XUILoader isInverted={true} ariaLabel="Something is loading, please wait" />,
    );

    expect(wrapper.getDOMNode().classList.contains('xui-loader-inverted')).toBeTruthy();
  });

  it('should add the retain layout class if `retainLayout` is set to `true`', function () {
    const wrapper = mount(
      <XUILoader retainLayout={true} ariaLabel="Something is loading, please wait" />,
    );
    expect(wrapper.getDOMNode().classList.contains('xui-loader-retain-layout')).toBeTruthy();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUILoader ariaLabel="Something is loading, please wait" />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
