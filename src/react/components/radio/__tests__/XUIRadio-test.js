import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import { nanoid } from 'nanoid';
import star from '@xero/xui-icon/icons/star';
import XUIRadio from '../XUIRadio';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

const NOOP = () => {};

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testRadioId');

describe('XUIRadio', () => {
  // type radio
  it('should be of type radio', () => {
    const component = shallow(<XUIRadio onChange={NOOP} />);

    expect(component.find('input').prop('type')).toEqual('radio');
  });

  // styled div for html radio
  it('should contain a styled div, by default', () => {
    const component = shallow(<XUIRadio onChange={NOOP} />);

    expect(component.find('div').hasClass('xui-styledcheckboxradio--radio')).toBeTruthy();
  });

  // children property (label text)
  it('should have label text if provided', () => {
    const component = renderer.create(<XUIRadio onChange={NOOP}>Howdy, folks!</XUIRadio>);

    expect(component).toMatchSnapshot();
  });

  // className property (additional classes)
  it('should use additional classes on the root node if provided', () => {
    const component = mount(<XUIRadio onChange={NOOP} className="dogs-are-totes-patotes" />);

    expect(component.find('div').first().hasClass('dogs-are-totes-patotes')).toBeTruthy();
  });

  it('should be a small variant, if specified', () => {
    const component = renderer.create(
      <XUIRadio onChange={NOOP} size="small">
        Howdy, folks!
      </XUIRadio>,
    );

    expect(component).toMatchSnapshot();
  });

  it('should be a xsmall variant, if specified', () => {
    const component = renderer.create(
      <XUIRadio onChange={NOOP} size="xsmall">
        Howdy, folks!
      </XUIRadio>,
    );

    expect(component).toMatchSnapshot();
  });

  // qaHook property
  it('should have a qaHook on the root node if provided', () => {
    const component = renderer.create(<XUIRadio onChange={NOOP} qaHook="cheese-and-crackers" />);

    expect(component).toMatchSnapshot();
  });

  it('should have a hidden label, if specified', () => {
    const hiddenLabel = renderer.create(
      <XUIRadio onChange={NOOP} isLabelHidden>
        Hidden label
      </XUIRadio>,
    );

    expect(hiddenLabel).toMatchSnapshot();
  });

  it('should render with an icon when one is provided', () => {
    const icon = renderer.create(<XUIRadio iconMain={star} onChange={NOOP} />);

    expect(icon).toMatchSnapshot();
  });

  it('should render with validation message', function () {
    const component = renderer.create(<XUIRadio isInvalid validationMessage="Test validation" />);

    expect(component).toMatchSnapshot();
  });

  // Unchecked
  it('should be unchecked by default', function () {
    const component = shallow(<XUIRadio onChange={NOOP} />);

    expect(component.html()).not.toContain('checked');
  });

  // isChecked property
  it('should be selected if isChecked is true', function () {
    const component = shallow(<XUIRadio onChange={NOOP} isChecked={true} />);

    expect(component.html()).toContain('checked');
  });

  // isDisabled property
  it('should be disabled if isDisabled is true', function () {
    const component = shallow(<XUIRadio onChange={NOOP} isDisabled={true} />);

    expect(component.html()).toContain('disabled');
  });

  // isChecked and isDisabled properties
  it('should be selected and disabled if isChecked and isDisabled are both true', function () {
    const component = shallow(<XUIRadio onChange={NOOP} isChecked={true} isDisabled={true} />);

    expect(component.html()).toContain('disabled');
    expect(component.html()).toContain('checked');
  });

  // isRequired property
  it('should be required for form submission if isRequired is true', function () {
    const component = shallow(<XUIRadio onChange={NOOP} isRequired={true} />);

    expect(component.html()).toContain('required');
  });

  // isReversed property
  it('should use the xui-styledcheckboxradio-reverse class on the root node if isReversed is true', function () {
    const component = mount(<XUIRadio onChange={NOOP} isReversed={true} />);

    expect(component.find('label').hasClass('xui-styledcheckboxradio-reversed')).toBeTruthy();
  });

  // name property
  it('should have the correct name if one is provided', function () {
    const component = shallow(<XUIRadio onChange={NOOP} name="Patrick" />);

    expect(component.childAt(0).prop('name')).toEqual('Patrick');
  });

  // onChange property
  it('should call the provided onChange function every time the control changes state', function () {
    const callback = jest.fn();
    const component = shallow(<XUIRadio onChange={callback} />);

    component.find('input').simulate('change');
    expect(callback.mock.calls.length).toEqual(1);
  });

  // value property
  it('should have the correct value if one is provided', function () {
    const component = shallow(<XUIRadio onChange={NOOP} value="64" />);

    expect(component.childAt(0).prop('value')).toEqual('64');
  });

  // inputProps property
  it('should pass props to input node', function () {
    const component = mount(
      <XUIRadio onChange={NOOP} value="2501" inputProps={{ autoComplete: 'off' }} />,
    );

    expect(
      component.find('input').getDOMNode().attributes.getNamedItem('autocomplete').value,
    ).toEqual('off');
  });

  it.skip('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIRadio onChange={NOOP} />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
