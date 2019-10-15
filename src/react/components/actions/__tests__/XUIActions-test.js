import React from 'react';
import XUIButton from '../../button/XUIButton';
import XUIActions from '../XUIActions';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUI Actions/>', () => {
  const qaHook = 'qaHook';
  const primary = <XUIButton>Primary</XUIButton>;
  const secondary = <XUIButton>Secondary</XUIButton>;

  it('renders the simplest actions with no extra settings passed', () => {
    const testActions = renderer.create(
      <XUIActions primary={primary} secondary={secondary}>
        Testing 💩
      </XUIActions>,
    );
    expect(testActions).toMatchSnapshot();
  });
  it('renders extra actions classes that are passed in', () => {
    const wrapper = mount(<XUIActions primary={primary} className="testClass" />);
    const tag = wrapper.find(XUIActions);
    expect(tag.hasClass('testClass')).toEqual(true);
  });
  it('renders actions as a linear type layout', () => {
    const wrapper = mount(<XUIActions primary={primary} secondary={secondary} isLinear={true} />);
    expect(wrapper.find('.xui-actions-linear').length).toBe(1);
  });
  it('renders actions without default layout', () => {
    const wrapper = mount(<XUIActions primary={primary} hasLayout={false} />);
    expect(wrapper.find('.xui-actions-layout').length).toBe(0);
  });
  it('renders actions in a different tag, if supplied', () => {
    const wrapper = mount(<XUIActions primary={primary} tagName="header" />);
    const tag = wrapper.find(XUIActions);
    expect(tag.childAt(0).type()).toEqual('header');
  });
  it('renders actions with automation id when qaHook prop is passed in', () => {
    const wrapper = renderer.create(<XUIActions primary={primary} qaHook={qaHook} />);
    expect(wrapper).toMatchSnapshot();
  });
});
