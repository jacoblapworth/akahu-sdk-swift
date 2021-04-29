import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIBannerMessageDetail from '../XUIBannerMessageDetail';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIBannerMessageDetail />', () => {
  it('should render and includes no automation id by default', () => {
    const test = <XUIBannerMessageDetail messageDetails={['a', 'b']} />;

    const href = renderer.create(test);
    expect(href).toMatchSnapshot();

    const jestDom = shallow(test);
    expect(jestDom.props()['data-automationid']).toBe(undefined);
  });

  it('should render a passed qaHook as an auotmation id', () => {
    const automationId = renderer.create(
      <XUIBannerMessageDetail qaHook="banner-messagedetail" messageDetails={['a', 'b', 'c']} />,
    );

    expect(automationId).toMatchSnapshot();
  });

  it('should render custom classes on the root p DOM node', () => {
    const className = 'example-class';
    const test = <XUIBannerMessageDetail className={className} messageDetails={['a', 'b']} />;

    const classes = renderer.create(test);
    expect(classes).toMatchSnapshot();

    const jestDom = shallow(test);
    expect(jestDom.props().className).toContain(className);
  });

  it('should map the list of mesage details to list elements', () => {
    const test = <XUIBannerMessageDetail messageDetails={['a', 'b', 'c']} />;

    const messageDeatils = renderer.create(test);
    expect(messageDeatils).toMatchSnapshot();

    const jestDom = shallow(test);
    expect(jestDom.childAt(0).type()).toEqual('li');
    expect(jestDom.html()).toContain('<li>b</li>');
    expect(jestDom.children().length).toEqual(3);
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIBannerMessageDetail messageDetails={['a', 'b']} />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
