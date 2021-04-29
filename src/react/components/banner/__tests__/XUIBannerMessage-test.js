import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIBannerMessage from '../XUIBannerMessage';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIBannerMessage />', () => {
  it('should render and includes no automation id by default', () => {
    const test = (
      <XUIBannerMessage>
        <span>Message Content</span>
      </XUIBannerMessage>
    );

    const href = renderer.create(test);
    expect(href).toMatchSnapshot();

    const jestDom = shallow(test);
    expect(jestDom.props()['data-automationid']).toBe(undefined);
  });

  it('should render a passed qaHook as an auotmation id', () => {
    const automationId = renderer.create(
      <XUIBannerMessage qaHook="banner-action">
        <span>Message Content</span>
      </XUIBannerMessage>,
    );

    expect(automationId).toMatchSnapshot();
  });

  it('should render custom classes on the root p DOM node', () => {
    const className = 'example-class';
    const test = (
      <XUIBannerMessage className={className}>
        <span>Message Content</span>
      </XUIBannerMessage>
    );

    const classes = renderer.create(test);
    expect(classes).toMatchSnapshot();

    const jestDom = shallow(test);
    expect(jestDom.props().className).toContain(className);
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUIBannerMessage>
        <span>Message Content</span>
      </XUIBannerMessage>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
