import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import { nanoid } from 'nanoid';
import accessibility from '@xero/xui-icon/icons/accessibility';
import XUIButton from '../../button/XUIButton';
import XUITextInput from '../XUITextInput';
import XUITextInputSideElement from '../XUITextInputSideElement';
import XUIIcon from '../../icon/XUIIcon';
import XUIPill from '../../pill/XUIPill';
import XUIInnerPill from '../../pill/XUIInnerPill';
import NOOP from '../../helpers/noop';
import { sizeShift } from '../../helpers/sizes';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testGeneratedId');

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUITextInput>', () => {
  it('XUITextInput and XUITextInputSideElement should pass accessibility testing', async () => {
    const sideElement = (
      <XUITextInputSideElement type="icon">
        <XUIIcon icon={accessibility} isBoxed />
      </XUITextInputSideElement>
    );
    const wrapper = mount(<XUITextInput label="Text input" leftElement={sideElement} />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
  it('SideElement label should pass accessibility testing', async () => {
    const sideElement = <XUITextInputSideElement type="text">Test:</XUITextInputSideElement>;
    const wrapper = mount(<XUITextInput leftElement={sideElement} />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  describe('General Functionality', () => {
    let wrapper;
    const className = 'containerClassName';
    const qaHook = 'test-input';

    beforeEach(() => {
      wrapper = mount(<XUITextInput qaHook={qaHook} />);
    });

    it('should render', () => {
      expect(wrapper).toBeDefined();
    });

    it('should have a qahook on the input and wrapper', () => {
      const automationId = renderer.create(<XUITextInput qaHook="input-test" />);
      expect(automationId).toMatchSnapshot();
    });

    it('should default to no icon', () => {
      expect(wrapper.find('XUIIcon')).toHaveLength(0);
    });
  });

  describe('Text-only input', () => {
    let wrapper;
    let input;
    const className = 'someClassName';
    const qaHook = 'givenQAHook';

    beforeEach(() => {
      wrapper = mount(
        <XUITextInput
          aria-haspopup
          className={className}
          onChange={NOOP}
          placeholder="This is an input"
          qaHook={qaHook}
          style={{ backgroundColor: 'darkred' }}
        />,
      );

      input = wrapper.find('input');
    });

    it('renders input', () => {
      expect(input).toHaveLength(1);
    });

    it("doesn't have inline styles", () => {
      expect(input.props().styles).toBeUndefined();
    });

    it('has a qaHook', () => {
      const automationid = renderer.create(<XUITextInput qaHook={qaHook} />);

      expect(automationid).toMatchSnapshot();
    });

    it('has disabled styling', () => {
      const disabled = renderer.create(<XUITextInput isDisabled />);

      expect(disabled).toMatchSnapshot();
    });

    it('is input value reverse-aligned', () => {
      const reverseAligned = renderer.create(<XUITextInput isValueReverseAligned />);

      expect(reverseAligned).toMatchSnapshot();
    });

    it('is multiline', () => {
      const multiline = mount(<XUITextInput isMultiline maxRows={10} />);

      expect(multiline.state().maxHeight).toEqual(199);
    });

    it('is passed className', () => {
      expect(wrapper.hasClass(className)).toBeTruthy();
    });

    it('is passed placeholder property', () => {
      expect(input.prop('placeholder')).toBeDefined();
    });

    it('is passed placeholder property value', () => {
      expect(input.prop('placeholder')).toEqual(expect.stringContaining('This is an input'));
    });

    it('renders the field layout class when isFieldLayout is true', () => {
      wrapper = mount(<XUITextInput isFieldLayout />);

      expect(wrapper.find('.xui-field-layout')).toHaveLength(1);
    });

    it('renders with a label when one is provided', () => {
      wrapper = renderer.create(<XUITextInput label="test" labelId="testLabel" />);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders with a hidden label when one is provided', () => {
      wrapper = renderer.create(<XUITextInput isLabelHidden label="test" />);
      expect(wrapper).toMatchSnapshot();
    });

    it('includes custom classes on the correct nodes', () => {
      wrapper = renderer.create(
        <XUITextInput
          containerClassName="custom-container-class"
          fieldClassName="custom-field-class"
          inputClassName="custom-input-class"
          label="test"
          labelClassName="custom-label-class"
          labelId="testLabel"
        />,
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('maps the type prop to the input element', () => {
      wrapper = mount(<XUITextInput type="number" />);

      expect(wrapper.find('input[type="number"]')).toHaveLength(1);
    });

    it('maps the defaultValue prop to the input element', () => {
      wrapper = mount(<XUITextInput defaultValue="hello" />);

      expect(wrapper.find('input[defaultValue="hello"]')).toHaveLength(1);
    });

    it('sets the resize none class based on options passed in', () => {
      wrapper = renderer.create(<XUITextInput isMultiline />);

      expect(wrapper).toMatchSnapshot();
    });

    it('forces resize visible class based on options passed in', () => {
      wrapper = renderer.create(<XUITextInput isManuallyResizable isMultiline />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Validation and hints', () => {
    it('renders with the correct class on the input if isInvalid=true', () => {
      const wrapper = mount(<XUITextInput isInvalid onChange={NOOP} />);

      expect(wrapper.find('.xui-textinput-is-invalid').length).toBe(1);
    });

    it('renders with a hint message if one is provided and the input is valid', () => {
      const wrapper = renderer.create(
        <XUITextInput
          hintMessage="Boo"
          labelId="newTest"
          onChange={NOOP}
          validationMessage="Wut?"
        />,
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('renders invalid textinputs with an error message correctly', () => {
      const wrapper = renderer.create(
        <XUITextInput isInvalid labelId="newTest" onChange={NOOP} validationMessage="Boo" />,
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('renders with the validation message if isInvalid=true and both a hint message and a validation message are present', () => {
      const msg = 'Boo';
      const wrapper = mount(
        <XUITextInput hintMessage="Hai" isInvalid onChange={NOOP} validationMessage={msg} />,
      );

      const validationEl = wrapper.find('.xui-validation');
      expect(validationEl.text()).toEqual(msg);
    });

    it('renders with the hint message if isInvalid=true and only a hint message is present', () => {
      const msg = 'Hai';
      const wrapper = mount(<XUITextInput hintMessage={msg} isInvalid onChange={NOOP} />);

      const validationEl = wrapper.find('.xui-validation');
      expect(validationEl.text()).toEqual(msg);
    });

    it('renders with the correct class on the validation element if isInvalid=true and no validation message is present', () => {
      const wrapper = mount(<XUITextInput hintMessage="Hai" isInvalid onChange={NOOP} />);

      expect(wrapper.find('.xui-textinput-is-invalid')).toHaveLength(1);

      const validationEl = wrapper.find('.xui-validation');
      expect(validationEl.hasClass('xui-validation-is-invalid')).toBeFalsy();
    });
  });

  describe('Side elements', () => {
    it('should render side elements correctly', () => {
      const sideElement = (
        <XUITextInputSideElement type="icon">
          <XUIIcon icon={accessibility} isBoxed />
        </XUITextInputSideElement>
      );
      const wrapper = renderer.create(
        <div>
          <XUITextInput leftElement={sideElement} />
          <XUITextInput rightElement={sideElement} />
          <XUITextInput leftElement={sideElement} rightElement={sideElement} />
        </div>,
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should render side elements as labels when text type and no other label provided', () => {
      const sideElement = (
        <XUITextInputSideElement type="text">First name:</XUITextInputSideElement>
      );
      const wrapper = renderer.create(
        <div>
          <XUITextInput leftElement={sideElement} />
          <XUITextInput rightElement={sideElement} />
          <XUITextInput leftElement={sideElement} rightElement={sideElement} />
        </div>,
      );
      expect(wrapper).toMatchSnapshot();
    });

    test('input is focused when side element (text) is clicked', () => {
      const sideElement = (
        <XUITextInputSideElement type="text" qaHook="test-text">
          First name:
        </XUITextInputSideElement>
      );

      render(<XUITextInput qaHook="test-input" leftElement={sideElement} />);

      fireEvent.click(screen.getByTestId('test-text'));

      expect(screen.getByTestId('test-input')).toHaveClass('xui-textinput-focus');
    });

    test('input should not be focused when side element (button) is clicked', () => {
      const sideElement = (
        <XUITextInputSideElement type="button">
          <XUIButton qaHook="test-button">Test button</XUIButton>
        </XUITextInputSideElement>
      );

      render(<XUITextInput qaHook="test-input" leftElement={sideElement} />);

      fireEvent.click(screen.getByTestId('test-button'));

      expect(screen.getByTestId('test-input')).not.toHaveClass('xui-textinput-focus');
    });
  });

  describe('Borderless variants', () => {
    it('should render with transparent borderless classes when isBorderlessTransparent is set to true', () => {
      const wrapper = mount(
        <XUITextInput hintMessage="Hai" isBorderlessTransparent onChange={NOOP} />,
      );

      expect(wrapper.find('.xui-textinput-borderless-transparent')).toHaveLength(1);
    });

    it('should render with transparent borderless classes when isBorderlessTransparent and inInverted are set to true', () => {
      const wrapper = mount(
        <XUITextInput hintMessage="Hai" isBorderlessTransparent isInverted onChange={NOOP} />,
      );

      expect(wrapper.find('.xui-textinput-borderless-transparent')).toHaveLength(1);
      expect(wrapper.find('.xui-textinput-borderless-inverted')).toHaveLength(1);
    });

    it('should render with solid borderless classes when isBorderlessSolid is set to true', () => {
      const wrapper = mount(<XUITextInput hintMessage="Hai" isBorderlessSolid onChange={NOOP} />);

      expect(wrapper.find('.xui-textinput-borderless-solid')).toHaveLength(1);
    });

    it('should render with solid borderless classes when isBorderlessSolid and inInverted are set to true', () => {
      const wrapper = mount(
        <XUITextInput hintMessage="Hai" isBorderlessSolid isInverted onChange={NOOP} />,
      );

      expect(wrapper.find('.xui-textinput-borderless-solid')).toHaveLength(1);
      expect(wrapper.find('.xui-textinput-borderless-inverted')).toHaveLength(1);
    });
  });

  describe('Size of child elements', () => {
    const size = 'medium';
    it(`when size is set to ${size}, pills have a size of ${sizeShift(size, -1)}`, () => {
      const wrapper = mount(<XUITextInput leftElement={<XUIPill value="ABC" />} size={size} />);

      expect(wrapper.find(XUIInnerPill).props().size).toBe(sizeShift(size, -1));
    });
  });

  describe('events', () => {
    it('should set internal focused state when focused', () => {
      const wrapper = mount(<XUITextInput />);

      wrapper.find('input').simulate('focus');

      expect(wrapper.state().hasFocus).toBeTruthy();
    });

    it('should call the passed onFocus handler when focused', () => {
      const onFocus = jest.fn();
      const wrapper = mount(<XUITextInput onFocus={onFocus} />);

      wrapper.find('input').simulate('focus');

      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('should set internal focused state to false when blurred', () => {
      const wrapper = mount(<XUITextInput />);

      wrapper.find('input').simulate('focus');
      wrapper.find('input').simulate('blur');

      expect(wrapper.state().hasFocus).toBeFalsy();
    });

    it('should call the passed onBlur handler when blurred', () => {
      const onBlur = jest.fn();
      const wrapper = mount(<XUITextInput onBlur={onBlur} />);

      wrapper.find('input').simulate('blur');

      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('calls onChange when input changes', () => {
      const onChange = jest.fn();
      const wrapper = mount(<XUITextInput onChange={onChange} />);

      wrapper.find('input').simulate('change');
      expect(onChange.mock.calls.length).toBeGreaterThan(0);
    });

    test('calls onChange when input changes', () => {
      const onClick = jest.fn();

      render(<XUITextInput qaHook="test-input" onClick={onClick} />);

      fireEvent.click(screen.getByTestId('test-input'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('inside XUIEditableTable', () => {
    it('has a class indicating it is inside an editable table', () => {
      const automationId = 'text-input';
      const wrapper = mount(<XUITextInput qaHook={automationId} _useCellStyling />);

      const { classList } = wrapper.find(`[data-automationid="${automationId}"]`).getDOMNode();

      expect(classList.contains('xui-textinput-cell')).toBeTruthy();
    });
  });
});

describe('TextInput with Character counter', () => {
  const characterCounterConfig = {
    maxCharCount: 10,
    validationMessage: 'Character validation failed!',
  };

  test('renders correctly when current input length is over the specified maximum length', () => {
    const { container } = render(
      <XUITextInput
        onChange={NOOP}
        value="Lorem ipsum"
        qaHook="test-id"
        characterCounter={characterCounterConfig}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly when current input length is under the specified maximum length', () => {
    const { container } = render(
      <XUITextInput
        onChange={NOOP}
        value="Lorem ips"
        qaHook="test-id"
        characterCounter={characterCounterConfig}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders without character counter where under showing threshold', () => {
    render(
      <XUITextInput
        onChange={NOOP}
        value="L"
        qaHook="test-id"
        characterCounter={characterCounterConfig}
      />,
    );

    expect(screen.queryByTestId('test-id--character-counter')).toBe(null);
  });

  test('renders with character counter where value is an empty string and is within the showing threshold', () => {
    const { container } = render(
      <XUITextInput
        onChange={NOOP}
        value=""
        qaHook="test-id"
        characterCounter={{ ...characterCounterConfig, maxCharCount: 1 }}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders with character counter where defaultValue is an empty string and is within the showing threshold', () => {
    const { container } = render(
      <XUITextInput
        onChange={NOOP}
        defaultValue=""
        qaHook="test-id"
        characterCounter={{ ...characterCounterConfig, maxCharCount: 1 }}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
