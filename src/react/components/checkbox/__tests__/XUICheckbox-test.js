import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { nanoid } from 'nanoid';
import star from '@xero/xui-icon/icons/star';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUICheckbox from '../XUICheckbox';

import div from './helpers/container';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

const NOOP = () => {};

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testCheckboxId');

describe('XUICheckbox', function () {
  let wrapper;
  let input;
  //<use /> tags

  beforeEach(() => {
    wrapper = mount(
      <XUICheckbox onChange={NOOP} className="dogs-are-totes-patotes" qaHook="cheese-and-crackers">
        Howdy, folks!
      </XUICheckbox>,
    );
    input = wrapper.find('input');
  });

  it('should be of type checkbox', () => {
    expect(input.instance().type).toEqual('checkbox');
  });

  it('should have label text if provided', () => {
    expect(wrapper.find('label').text()).toEqual('Howdy, folks!');
  });

  it('should use additional classes on the root node if provided', () => {
    expect(wrapper.find('div').first().hasClass('dogs-are-totes-patotes')).toBeTruthy();
  });

  it('should be a small variant, if specified', () => {
    const component = renderer.create(
      <XUICheckbox onChange={NOOP} size="small">
        Howdy, folks!
      </XUICheckbox>,
    );

    expect(component).toMatchSnapshot();
  });

  it('should be a xsmall variant, if specified', () => {
    const component = renderer.create(
      <XUICheckbox onChange={NOOP} size="xsmall">
        Howdy, folks!
      </XUICheckbox>,
    );

    expect(component).toMatchSnapshot();
  });

  it('should have a qaHook as an automation id if provided', () => {
    const automationid = renderer.create(<XUICheckbox qaHook="test-checkbox" onChange={NOOP} />);

    expect(automationid).toMatchSnapshot();
  });

  it('should have a hidden label, if specified', () => {
    const hiddenLabel = renderer.create(
      <XUICheckbox onChange={NOOP} isLabelHidden>
        Hidden label
      </XUICheckbox>,
    );

    expect(hiddenLabel).toMatchSnapshot();
  });
  it('should have a visible label, if specified', () => {
    const visibleLabel = renderer.create(<XUICheckbox onChange={NOOP}>Visible label</XUICheckbox>);

    expect(visibleLabel).toMatchSnapshot();
  });

  it('should render with validation message', function () {
    const component = renderer.create(
      <XUICheckbox isInvalid validationMessage="Test validation" />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should be unchecked by default', () => {
    const wrapper = mount(<XUICheckbox onChange={NOOP} />);

    const node = wrapper.find('input').instance();
    expect(node.checked).toBeFalsy();
  });

  it('should be selected and disabled if isChecked and isDisabled are both true', () => {
    const wrapper = mount(<XUICheckbox onChange={NOOP} isChecked={true} isDisabled={true} />);

    const node = wrapper.find('input').instance();
    expect(node.checked).toBeTruthy();
    expect(node.disabled).toBeTruthy();
  });

  // TODO: re-enable this test after getting XUICheckbox to render as isIndeterminate on first render
  it.skip('should be indeterminate if isIndeterminate is true', () => {
    const wrapper = renderer.create(
      <XUICheckbox className="indeterminate" onChange={NOOP} isIndeterminate={true} />,
    );

    const input = wrapper.root.findByType('input');

    expect(input.props).toBeFalsy();
  });

  it('should update the indeterminate property when isIndeterminate changes state', () => {
    const wrapper = mount(
      <XUICheckbox className="indeterminate" onChange={NOOP} isIndeterminate={true} />,
      { attachTo: div },
    );

    //haven't been able to use wrapper.find as we need a true DOM representation to find the property.
    const node = document.querySelector('.indeterminate input');

    expect(node).toBeDefined();
    expect(node.indeterminate).toBeTruthy();

    wrapper.setProps({ isIndeterminate: false });

    expect(node.indeterminate).toBeFalsy();
  });

  it('should be required for form submission if isRequired is true', () => {
    const wrapper = mount(<XUICheckbox onChange={NOOP} isRequired={true} />);

    const node = wrapper.find('input');
    expect(node.props().required).toBeTruthy();
  });

  it('should use the xui-styledcheckboxradio-reverse class on the root node if isReversed is true', () => {
    const wrapper = mount(<XUICheckbox onChange={NOOP} isReversed={true} />);

    expect(wrapper.find('label').hasClass('xui-styledcheckboxradio-reversed')).toBeTruthy();
  });

  it('should have the correct name if one is provided', function () {
    const wrapper = mount(<XUICheckbox onChange={NOOP} name="Patrick" />);

    const node = wrapper.find('input');
    expect(node.props().name).toEqual('Patrick');
  });

  it('should call the provided onChange function every time the control changes state', () => {
    let toggle = false;
    const wrapper = mount(
      <XUICheckbox
        onChange={() => {
          toggle = !toggle;
        }}
      />,
    );

    const node = wrapper.find('input');

    node.simulate('change');
    expect(toggle).toBeTruthy();
    node.simulate('change');
    expect(toggle).toBeFalsy();
  });

  it('should have the correct value if one is provided', () => {
    const wrapper = mount(<XUICheckbox onChange={NOOP} value="64" />);
    expect(wrapper.find('input[type="checkbox"]').props().value).toEqual('64');
  });

  it('should allow setting a custom tabIndex on the input', () => {
    const wrapper = renderer.create(<XUICheckbox onChange={NOOP} tabIndex={-1} />);
    expect(wrapper.root.findByType('input').props.tabIndex).toEqual(-1);
  });

  it('should not display label if isLabelHidden is true', () => {
    const wrapper = mount(<XUICheckbox onChange={NOOP} isLabelHidden={true} />);
    const nodes = wrapper.find('span');

    expect(nodes.length).toBe(0);
  });

  it('should render with an icon when one is provided', () => {
    const icon = renderer.create(<XUICheckbox iconMain={star} onChange={NOOP} />);

    expect(icon).toMatchSnapshot();
  });

  it('should pass props to input node', function () {
    const component = mount(
      <XUICheckbox onChange={NOOP} value="2501" inputProps={{ autoComplete: 'on' }} />,
    );

    expect(
      component.find('input').getDOMNode().attributes.getNamedItem('autocomplete').value,
    ).toEqual('on');
  });

  it.skip('should pass accessibility testing', async () => {
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
