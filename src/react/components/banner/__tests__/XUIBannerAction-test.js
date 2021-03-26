import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import XUIBannerAction from '../XUIBannerAction';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIBannerAction />', () => {
  it('should render as a button be default and includes no automation id', () => {
    const test = <XUIBannerAction>Action</XUIBannerAction>;

    const href = renderer.create(test);
    expect(href).toMatchSnapshot();

    const jestDom = shallow(test);
    expect(jestDom.childAt(0).props().isLink).toBeFalsy();
    expect(jestDom.props()['data-automationid']).toBe(undefined);
  });

  it('should render a passed qaHook as an auotmation id', () => {
    const qaHookValue = 'banner-action';
    const test = <XUIBannerAction qaHook={qaHookValue}>Action</XUIBannerAction>;

    const automationId = renderer.create(test);
    expect(automationId).toMatchSnapshot();

    const jestDom = shallow(test);
    expect(jestDom.props()['data-automationid']).toEqual(qaHookValue);
  });

  it('should render as a link if an href value is passed and isLink prop is true', () => {
    const test = (
      <XUIBannerAction href="http://xero.com" isLink={true}>
        Action
      </XUIBannerAction>
    );

    const href = renderer.create(test);
    expect(href).toMatchSnapshot();

    const jestDom = shallow(test);
    expect(jestDom.childAt(0).props().isLink).toBeTruthy();
  });

  it('should render custom classes on the button DOM node', () => {
    const className = 'example-class';
    const test = <XUIBannerAction className={className}>Action</XUIBannerAction>;

    const classes = renderer.create(test);
    expect(classes).toMatchSnapshot();

    const jestDom = shallow(test);
    expect(jestDom.childAt(0).props().className).toContain(className);
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <ul>
        <XUIBannerAction>Action</XUIBannerAction>
      </ul>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
