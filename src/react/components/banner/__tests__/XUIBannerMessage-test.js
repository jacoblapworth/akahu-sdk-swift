import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIBannerMessage from '../XUIBannerMessage';

Enzyme.configure({ adapter: new Adapter() });

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
});
