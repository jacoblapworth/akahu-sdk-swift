import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIRolloverCheckbox from '../rolloverCheckbox';

Enzyme.configure({ adapter: new Adapter() });

const setup = (fn = renderer.create, props = {}) => {
  const onSelectSpy = jest.fn();

  const expected = fn(<XUIRolloverCheckbox onSelect={onSelectSpy} {...props} />);

  return {
    expected,
    onSelectSpy,
  };
};

describe('XUIRolloverCheckbox', () => {
  it('renders correctly', () => {
    const { expected } = setup();

    expect(expected).toMatchSnapshot();
  });

  it('include an automation-id', () => {
    const { expected } = setup(renderer.create, { qaHook: 'test-rollovercheckbox' });

    expect(expected).toMatchSnapshot();
  });

  it('allows for a user defined rollover component to be passed', () => {
    const { expected } = setup(renderer.create, {
      isCheckboxHidden: true,
      rolloverComponent: <div id="rolloverComponent" />,
    });

    expect(expected).toMatchSnapshot();
  });

  it("doesn't display the checkbox when it's set to hidden", () => {
    const { expected } = setup(renderer.create, {
      isCheckboxHidden: true,
      rolloverComponent: <div />,
    });

    expect(expected).toMatchSnapshot();
  });

  it("displays the checkbox when it's set to be shown", () => {
    const { expected } = setup(renderer.create, {
      isCheckboxHidden: false,
      rolloverComponent: <div />,
    });

    expect(expected).toMatchSnapshot();
  });

  it('renders checked when specified', () => {
    const { expected } = setup(renderer.create, { isChecked: true, rolloverComponent: <div /> });

    expect(expected).toMatchSnapshot();
  });

  it('renders unchecked when specified', () => {
    const { expected } = setup(renderer.create, { isChecked: false, rolloverComponent: <div /> });

    expect(expected).toMatchSnapshot();
  });

  it('renders an id on the root node when passed', () => {
    const { expected } = setup(renderer.create, { id: 'test-id', rolloverComponent: <div /> });

    expect(expected).toMatchSnapshot();
  });

  it('includes an aria-label, when provided', () => {
    const { expected } = setup(renderer.create, {
      label: 'Test label',
      rolloverComponent: <div />,
    });

    expect(expected).toMatchSnapshot();
  });

  describe('renders a variety of size checkboxes', () => {
    it('will be a small checkbox when passed in the checkboxSize prop', () => {
      const { expected } = setup(renderer.create, {
        checkboxSize: 'small',
        rolloverComponent: <div />,
      });

      expect(expected).toMatchSnapshot();
    });

    it('will be a medium checkbox when medium is set on the checkboxSize prop.', () => {
      const { expected } = setup(renderer.create, {
        checkboxSize: 'medium',
        rolloverComponent: <div />,
      });

      expect(expected).toMatchSnapshot();
    });

    it('will be a xsmall checkbox when passed in the checkboxSize prop', () => {
      const { expected } = setup(renderer.create, {
        checkboxSize: 'xsmall',
        rolloverComponent: <div />,
      });

      expect(expected).toMatchSnapshot();
    });
  });

  it('calls the onSelect spy when the checkbox is clicked', () => {
    const { expected, onSelectSpy } = setup(mount, {
      isCheckboxHidden: false,
      rolloverComponent: <div />,
    });

    expected.find('input').simulate('change');

    expect(onSelectSpy).toHaveBeenCalledTimes(1);
  });

  it('should save the focus state when the target element is in focus', () => {
    const { expected } = setup(mount, { isCheckboxHidden: false, rolloverComponent: <div /> });

    expected.find('.xui-rollovercheckbox--target').simulate('focus');

    expect(expected.state().hasFocus).toBeTruthy();
  });

  it('should save the focus state when the target element is blurred', () => {
    const { expected } = setup(mount, { isCheckboxHidden: false, rolloverComponent: <div /> });

    expected.find('.xui-rollovercheckbox--target').simulate('focus');
    expected.find('.xui-rollovercheckbox--target').simulate('blur');

    expect(expected.state().hasFocus).toBeFalsy();
  });

  it('should save the isMouseOver state when the target element mouse over event has fired', () => {
    const { expected } = setup(mount, { isCheckboxHidden: true, rolloverComponent: <div /> });

    expected.find('.xui-rollovercheckbox--target').simulate('mouseEnter');

    expect(expected.state().isMouseOver).toBeTruthy();
  });

  it('should save the isMouseOver state when the target element mouse leave event has fired', () => {
    const { expected } = setup(mount, { isCheckboxHidden: false, rolloverComponent: <div /> });

    expected.find('.xui-rollovercheckbox--target').simulate('mouseEnter');
    expected.find('.xui-rollovercheckbox--target').simulate('mouseLeave');

    expect(expected.state().isMouseOver).toBeFalsy();
  });

  it('should check the checkbox when the click method is triggered', () => {
    // Testing the actual click of the DOM element doesn't accurately reflect cross-browser behavior, anyway
    const { expected } = setup(mount, { isCheckboxHidden: false, rolloverComponent: <div /> });

    expected.instance().triggerCheckboxClick();

    //Using a ref check here as the snapshot doesn't represent a checked state of the input.
    expect(expected.instance()._checkbox._input.current.checked).toBeTruthy();
  });

  it('should render the disabled classes and a disabled checkbox when isDisabled prop is true', () => {
    const { expected } = setup(renderer.create, {
      isCheckboxHidden: false,
      isDisabled: true,
      rolloverComponent: <div />,
    });

    expect(expected).toMatchSnapshot();
  });

  it("shouldn't render the disabled classes or a disabled checkbox when isDisabled prop is false", () => {
    const { expected } = setup(renderer.create, {
      isCheckboxHidden: false,
      isDisabled: false,
      rolloverComponent: <div />,
    });

    expect(expected).toMatchSnapshot();
  });

  it("shouldn't render the disabled classes and a disabled checkbox by default", () => {
    const { expected } = setup(renderer.create, {
      isCheckboxHidden: false,
      rolloverComponent: <div />,
    });

    expect(expected).toMatchSnapshot();
  });
});
