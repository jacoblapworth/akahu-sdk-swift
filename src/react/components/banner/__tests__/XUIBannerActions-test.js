import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIBannerActions from '../XUIBannerActions';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIBannerAction />', () => {
  it('should render and includes no automation id by default', () => {
    const test = (
      <XUIBannerActions>
        <button>Action</button>
        <button>Action</button>
      </XUIBannerActions>
    );

    const href = renderer.create(test);
    expect(href).toMatchSnapshot();

    const jestDom = shallow(test);
    expect(jestDom.props()['data-automationid']).toBe(undefined);
  });

  it('should render a passed qaHook as an auotmation id', () => {
    const automationId = renderer.create(
      <XUIBannerActions qaHook="banner-action">
        <button>Action 1</button>
        <button>Action 2</button>
      </XUIBannerActions>,
    );

    expect(automationId).toMatchSnapshot();
  });

  it('should render custom classes on the root ul DOM node', () => {
    const className = 'example-class';
    const test = (
      <XUIBannerActions className={className}>
        <button>Action</button>
        <button>Action</button>
      </XUIBannerActions>
    );

    const classes = renderer.create(test);
    expect(classes).toMatchSnapshot();

    const jestDom = shallow(test);
    expect(jestDom.props().className).toContain(className);
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUIBannerActions>
        <li>Action 1</li>
        <li>Action 2</li>
      </XUIBannerActions>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
