import React from 'react';
import Enzyme, { render, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import XUIToggleOption from '../XUIToggleOption';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid');
uuidv4.mockImplementation(() => 'testToggleId');

Enzyme.configure({ adapter: new Adapter() });

describe('XUIToggleOption', function () {
  // children property (label text)
  it('should have label text if provided', function () {
    const wrapper = renderer.create(
      <XUIToggleOption onChange={() => {}}>Howdy, folks!</XUIToggleOption>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  // className property (additional classes)
  it('should use additional classes on the root node if provided', function () {
    const c = 'dogs-are-totes-patotes';
    const wrapper = mount(<XUIToggleOption onChange={() => {}} className={c} />);
    expect(wrapper.hasClass(c)).toBeTruthy();
  });

  // qaHook property
  it('should have a qaHook on the root node if provided', function () {
    const qaHook = 'cheese-and-crackers';
    const wrapper = renderer.create(<XUIToggleOption onChange={() => {}} qaHook={qaHook} />);
    expect(wrapper).toMatchSnapshot();
  });

  // Unchecked
  it('should be unchecked by default', function () {
    const wrapper = mount(<XUIToggleOption onChange={() => {}} />);
    expect(wrapper.find('input[checked]')).toHaveLength(0);
  });

  // isChecked property
  it('should be selected if isChecked is true', function () {
    const wrapper = mount(<XUIToggleOption isChecked onChange={() => {}} />);
    expect(wrapper.find('input[checked]')).toHaveLength(1);
  });

  // isDisabled property
  it('should be disabled if isDisabled is true', function () {
    const wrapper = mount(<XUIToggleOption isDisabled onChange={() => {}} />);
    expect(wrapper.find('input[disabled]')).toHaveLength(1);
    expect(wrapper.find('.xui-toggle-is-disabled')).toHaveLength(1);
  });

  // isChecked and isDisabled properties
  it('should be selected and disabled if isChecked and isDisabled are both true', function () {
    const wrapper = mount(<XUIToggleOption isDisabled isChecked onChange={() => {}} />);
    expect(wrapper.find('input[disabled]')).toHaveLength(1);
    expect(wrapper.find('input[checked]')).toHaveLength(1);
    expect(wrapper.find('.xui-toggle-is-disabled')).toHaveLength(1);
  });

  // isRequired property
  it('should be required for form submission if isRequired is true', function () {
    const wrapper = mount(<XUIToggleOption isRequired onChange={() => {}} />);
    expect(wrapper.find('input[required]')).toHaveLength(1);
  });

  // name property
  it('should have the correct name if one is provided', function () {
    const wrapper = mount(<XUIToggleOption name="patrick" onChange={() => {}} />);
    expect(wrapper.find('input[name="patrick"]')).toHaveLength(1);
  });

  // onChange property
  it('should call the provided onChange function every time the control changes state', function () {
    const onChange = jest.fn();
    const wrapper = mount(<XUIToggleOption onChange={onChange} />);
    const node = wrapper.find('input').first();
    node.simulate('change');
    node.simulate('change');
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  // type default
  it('should be of type radio by default', function () {
    const wrapper = mount(<XUIToggleOption onChange={() => {}} />);
    expect(wrapper.find('input').first().prop('type')).toEqual('radio');
  });

  // type radio
  it('should be of type radio if defined', function () {
    const wrapper = mount(<XUIToggleOption type="radio" onChange={() => {}} />);
    expect(wrapper.find('input').first().prop('type')).toEqual('radio');
  });

  // type checkbox
  it('should be of type checkbox if defined', function () {
    const wrapper = mount(<XUIToggleOption type="checkbox" onChange={() => {}} />);
    expect(wrapper.find('input').first().prop('type')).toEqual('checkbox');
  });

  // value property
  it('should have the correct value if one is provided', function () {
    const wrapper = mount(<XUIToggleOption value="64" onChange={() => {}} />);
    expect(wrapper.find('input').first().prop('value')).toEqual('64');
  });
});
