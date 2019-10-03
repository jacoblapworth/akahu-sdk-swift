import React from 'react';
import XUITag from '../XUITag';
import { variants, sizes } from '../private/constants';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUITag/>', () => {
  it('renders with just the base class when no variant is passed in', () => {
    const wrapper = mount(<XUITag>Testing 💩</XUITag>);
    const tag = wrapper.find('span');
    expect(tag.at(0).hasClass('xui-tag')).toBeTruthy();
    expect(tag.at(1).hasClass('xui-tagcontent')).toBeTruthy();
    Object.keys(variants)
      .map(key => variants[key])
      .forEach(variantClass => expect(tag.at(0).hasClass(variantClass)).toEqual(false));
    expect(tag.at(1).text()).toEqual('Testing 💩');
  });

  it('renders with the correct variant classes', () => {
    Object.keys(variants).forEach(variant => {
      const wrapper = mount(<XUITag variant={variant}>Testing 💩</XUITag>);
      const tag = wrapper.find('.xui-tag');
      if (variants[variant]) {
        expect(tag.hasClass(variants[variant])).toEqual(true);
      }
    });
  });

  it('renders with the correct size classes', () => {
    Object.keys(sizes).forEach(size => {
      const wrapper = mount(<XUITag size={size}>Testing 💩</XUITag>);
      const tag = wrapper.find('.xui-tag');
      if (sizes[size]) {
        expect(tag.hasClass(sizes[size])).toEqual(true);
      }
    });
  });

  it('renders classes that are passed in', () => {
    const wrapper = mount(<XUITag className="testClass">Testing 💩</XUITag>);
    const tag = wrapper.find(XUITag);
    expect(tag.hasClass('testClass')).toEqual(true);
  });

  it('renders a qaHook when passed in', () => {
    const automationid = renderer.create(
      <XUITag qaHook="schwifty" id="test">
        Testing 💩
      </XUITag>,
    );
    expect(automationid).toMatchSnapshot();
  });
});
