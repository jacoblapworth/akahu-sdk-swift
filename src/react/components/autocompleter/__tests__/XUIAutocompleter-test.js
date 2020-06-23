import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIAutocompleter from '../XUIAutocompleter';
import XUIPill from '../../pill/XUIPill';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import XUILoader from '../../loader/XUILoader';
import DropDownToggled from '../../dropdown/DropDownToggled';
import DropDownLayout from '../../dropdown/DropDownLayout';
import { v4 as uuidv4 } from 'uuid';
import { eventKeyValues } from '../../helpers/reactKeyHandler';
import wait from '../../../helpers/wait';

jest.mock('uuid');
uuidv4.mockImplementation(() => 'testAutocompleterId');
Enzyme.configure({ adapter: new Adapter() });

describe('XUIAutocompleter', () => {
  const createComponent = props => (
    <XUIAutocompleter dropdownSize="medium" forceDesktop {...props}>
      <Picklist>
        <Pickitem id="item1">Item 1</Pickitem>
        <Pickitem id="item2">Item 2</Pickitem>
      </Picklist>
    </XUIAutocompleter>
  );

  it('has data-automationid set on the input, list, dropdown and container', () => {
    const automationid = renderer.create(createComponent({ qaHook: 'baseAC' }));

    expect(automationid).toMatchSnapshot();
  });

  it('inserts the searchValue inside the input', () => {
    const inputEl = renderer.create(createComponent({ searchValue: 'a' }));

    expect(inputEl).toMatchSnapshot();
  });

  it('renders with the provided label', () => {
    const inputEl = renderer.create(createComponent({ inputLabel: 'Im a little label' }));

    expect(inputEl).toMatchSnapshot();
  });

  it('renders with a hidden label', () => {
    const inputEl = renderer.create(
      createComponent({ inputLabel: 'Im a little label', isInputLabelHidden: true }),
    );

    expect(inputEl).toMatchSnapshot();
  });

  it('fires the onSearch callback when the input value has changed immediately if the searchDebounceTimeout value is 0', () => {
    const onSearch = jest.fn();
    const searchComp = mount(createComponent({ onSearch, searchDebounceTimeout: 0 }));

    searchComp.find('input').simulate('change', {
      target: {
        value: 'a',
      },
    });

    expect(onSearch).toHaveBeenCalled();
  });

  it('fires the onSearch callback when the input value has changed after 200ms by default', async () => {
    // Arrange
    const onSearch = jest.fn();
    const searchComp = mount(createComponent({ onSearch }));

    // Act
    searchComp.find('input').simulate('change', {
      target: {
        value: 'a',
      },
    });

    // Assert
    await Promise.all([
      wait().then(() => expect(onSearch).not.toHaveBeenCalled()),
      wait(200).then(() => expect(onSearch).toHaveBeenCalled()),
    ]);
  });

  it('fires the onSearch callback when the input value has changed after the given searchDebounceTimeout value', async () => {
    // Arrange
    const onSearch = jest.fn();
    const testDebounceTimeout = 500;

    const searchComp = mount(
      createComponent({ onSearch, searchDebounceTimeout: testDebounceTimeout }),
    );

    // Act
    searchComp.find('input').simulate('change', {
      target: {
        value: 'a',
      },
    });

    // Assert

    await Promise.all([
      wait().then(() => expect(onSearch).not.toHaveBeenCalled()),
      wait(200).then(() => expect(onSearch).not.toHaveBeenCalled()),
      wait(testDebounceTimeout).then(() => expect(onSearch).toHaveBeenCalled()),
    ]);
  });

  it('renders with loading as false by default', () => {
    const wrapper = mount(createComponent({ onSearch: jest.fn() }));
    expect(wrapper.prop('loading')).toBeFalsy();
  });

  it('displays a XUILoader when loading is true', () => {
    const wrapper = mount(
      createComponent({ onSearch: jest.fn(), loading: true, loadingAriaLabel: '' }),
    );

    expect(wrapper.find(XUILoader)).toBeDefined();
    expect(wrapper.prop('loading')).toBeTruthy();
  });

  it('renders pills as children passed in through the pills prop', () => {
    const wrapper = mount(
      createComponent({
        onSearch: jest.fn(),
        searchValue: 'z',
        searchDebounceTimeout: 500,
        pills: <XUIPill value="ABC" />,
      }),
    );

    expect(wrapper.find(XUIPill)).toBeDefined();
  });

  it('opens the dropdown when we trigger `openDropDown` and closes the dropdown when we trigger `closeDropDown`', () => {
    const wrapper = mount(
      createComponent({
        onSearch: jest.fn(),
        searchValue: 'z',
        searchDebounceTimeout: 500,
      }),
    );
    expect(wrapper.instance().ddt.current.state.isHidden).toBeTruthy();

    wrapper.instance().openDropDown();
    expect(wrapper.instance().ddt.current.state.isHidden).toBeFalsy();

    wrapper.instance().closeDropDown();
    expect(wrapper.instance().ddt.current.state.isHidden).toBeTruthy();
  });

  it('sets the dropdown to match trigger width if no dropdownSize is provided in the component props', () => {
    const wrapper = mount(createComponent({ onSearch: jest.fn(), dropdownSize: null }));
    expect(wrapper.find(DropDownToggled).props().matchTriggerWidth).toBeTruthy();
  });

  it('when disableWrapPills prop is applied disable pillwrap class is applied', () => {
    const wrapper = mount(createComponent({ onSearch: jest.fn() }));
    expect(wrapper.find('.xui-autocompleter--trigger-nopillwrap').length).toEqual(0);

    const disableWrapPills = mount(
      createComponent({
        onSearch: jest.fn(),
        disableWrapPills: true,
        pills: [<XUIPill value="test" key="1" />],
      }),
    );
    expect(disableWrapPills.find('.xui-autocompleter--pills-nopillwrap').length).toEqual(1);
  });

  it('should not add padding classes to the input when pills prop is an empty array', () => {
    const classComp = renderer.create(createComponent({ pills: [] }));

    expect(classComp).toMatchSnapshot();
  });

  it('should render a class on the root node when passed in the className prop', () => {
    const classComp = renderer.create(createComponent({ className: 'test-class' }));

    expect(classComp).toMatchSnapshot();
  });

  it('should render a class on the input element when passed in the inputClassName prop', () => {
    const classComp = renderer.create(createComponent({ inputClassName: 'test-class' }));

    expect(classComp).toMatchSnapshot();
  });

  it('should render a class on the trigger element when passed in the triggerClassName prop', () => {
    const classComp = renderer.create(createComponent({ triggerClassName: 'test-class' }));

    expect(classComp).toMatchSnapshot();
  });

  it('should render an id on the root node when passed in the id prop', () => {
    const classComp = renderer.create(createComponent({ id: 'test-id' }));

    expect(classComp).toMatchSnapshot();
  });

  it('should render an id on the input when a value is passed to the inputId prop', () => {
    const inputId = renderer.create(createComponent({ inputId: 'test-inputId' }));

    expect(inputId).toMatchSnapshot();
  });

  it('should render a placeholder inside the input when passed in', () => {
    const comp = renderer.create(createComponent({ placeholder: 'Search' }));

    expect(comp).toMatchSnapshot();
  });

  it('should respect a max length of the input value when the maxLength has a value', () => {
    const maxLength = renderer.create(createComponent({ maxLength: 5, searchValue: '123456' }));

    expect(maxLength).toMatchSnapshot();
  });

  it('should render as disabled when isDisabled prop is true', () => {
    const disabled = renderer.create(createComponent({ isDisabled: true }));

    expect(disabled).toMatchSnapshot();
  });

  it("should ignore keyboard events for space as it's reserved for input interactions", () => {
    const comp = mount(createComponent({ onSearch: jest.fn() }));

    comp.find('input').simulate('keyDown', { key: eventKeyValues.space, keyCode: 32, which: 32 });

    expect(comp.instance().ddt.current.state.isHidden).toBeTruthy();
  });

  it("should ignore keyboard events for the left arrow as it's reserved for input interactions", () => {
    const comp = mount(createComponent({ onSearch: jest.fn() }));

    comp.find('input').simulate('keyDown', { key: eventKeyValues.left, keyCode: 37, which: 37 });

    expect(comp.instance().ddt.current.state.isHidden).toBeTruthy();
  });

  it("should ignore keyboard events for the right arrow as it's reserved for input interactions", () => {
    const comp = mount(createComponent({ onSearch: jest.fn() }));

    comp.find('input').simulate('keyDown', { key: eventKeyValues.right, keyCode: 39, which: 39 });

    expect(comp.instance().ddt.current.state.isHidden).toBeTruthy();
  });

  describe.skip('Dropdown + Portal skipped tests', () => {
    it("uses the correct size variant if one is defined and doesn't try match trigger width", () => {
      const wrapper = mount(createComponent({ onSearch: jest.fn() }));
      expect(wrapper.find(DropDownLayout).props().size).toBe('medium');
      expect(wrapper.find(DropDownToggled).props().matchTriggerWidth).toBeFalsy();
    });
  });

  it('flushes the debounce when enter or space is pressed', () => {
    // Arrange
    const wrapper = mount(createComponent({ onSearch: jest.fn() }));
    wrapper.instance().openDropDown();
    const spy = jest.spyOn(wrapper.instance(), 'flushDebounced');

    // Act
    wrapper.find('input').simulate('change', {
      target: {
        value: 'frida',
      },
    });
    wrapper
      .find('input')
      .simulate('keydown', { key: eventKeyValues.enter, keyCode: 13, which: 13 });

    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('makes sure that onSearch gets called before onOptionSelect', async () => {
    // Arrange
    const onSearch = jest.fn();
    const onOptionSelect = jest.fn();

    const wrapper = mount(
      createComponent({
        onSearch: onSearch,
        onOptionSelect,
      }),
    );
    const input = wrapper.find('input');

    // Act
    wrapper.instance().openDropDown();

    input.simulate('change', {
      target: {
        value: 'item2',
      },
    });

    input.simulate('keydown', { key: eventKeyValues.enter });

    /**
     * Why are we awaiting a 0ms timer?
     * Rationale: To ensure that the test assertion runs after all the required re-renders have taken placed.
     * Important: If jest.useFakeTimers() is used, this test must be placed in a separate describe test.
     */
    await wait();

    // Assert
    const onSearchInvocationOrder = onSearch.mock.invocationCallOrder[0];
    const onOptionSelectInvocationOrder = onOptionSelect.mock.invocationCallOrder[0];

    expect(onSearchInvocationOrder).toBeLessThan(onOptionSelectInvocationOrder);
  });

  it('should call provided custom onKeyDown callback if any key is pressed', () => {
    // Arrange
    const onKeyDownMock = jest.fn();
    const wrapper = mount(createComponent({ onSearch: jest.fn(), onKeyDown: onKeyDownMock }));
    wrapper.instance().openDropDown();

    // Act
    wrapper.find('input').simulate('keydown', { keyCode: 69, which: 69 });

    // Assert
    expect(onKeyDownMock).toHaveBeenCalled();
  });

  describe('when the enter key is pressed', () => {
    it('should call the custom onKeyDown callback when a custom onKeyDown callback is provided', () => {
      // Arrange
      const onKeyDownMock = jest.fn();
      const onSearchMock = jest.fn();
      const wrapper = mount(createComponent({ onSearch: onSearchMock, onKeyDown: onKeyDownMock }));
      const input = wrapper.find('input');
      wrapper.instance().openDropDown();

      // Act
      input.simulate('change', { target: { value: 'item2' } });
      input.simulate('keydown', { key: eventKeyValues.enter, keyCode: 13, which: 13 });

      // Assert
      expect(onKeyDownMock).toHaveBeenCalled();
    });

    it('should call the onSearch method when a custom onKeyDown callback is provided', () => {
      // Arrange
      const onKeyDownMock = jest.fn();
      const onSearchMock = jest.fn();
      const wrapper = mount(createComponent({ onSearch: onSearchMock, onKeyDown: onKeyDownMock }));
      const input = wrapper.find('input');
      wrapper.instance().openDropDown();

      // Act
      input.simulate('change', { target: { value: 'item2' } });
      input.simulate('keydown', { key: eventKeyValues.enter, keyCode: 13, which: 13 });

      // Assert
      expect(onSearchMock).toHaveBeenCalled();
    });

    it('should call the flushDebounced method when a custom onKeyDown callback is provided', () => {
      // Arrange
      const onKeyDownMock = jest.fn();
      const onSearchMock = jest.fn();
      const wrapper = mount(createComponent({ onSearch: onSearchMock, onKeyDown: onKeyDownMock }));
      const input = wrapper.find('input');
      const flushDebouncedSpy = jest.spyOn(wrapper.instance(), 'flushDebounced');
      wrapper.instance().openDropDown();

      // Act
      input.simulate('change', { target: { value: 'item2' } });
      input.simulate('keydown', { key: eventKeyValues.enter, keyCode: 13, which: 13 });

      // Assert
      expect(flushDebouncedSpy).toHaveBeenCalled();
    });
  });

  describe('when backspace is pressed', () => {
    it('should call provided custom onKeyDown callback when a custom onKeyDown callback is provided', () => {
      // Arrange
      const onKeyDownMock = jest.fn();
      const onBackspacePillMock = jest.fn();
      const wrapper = mount(
        createComponent({
          onSearch: jest.fn(),
          onKeyDown: onKeyDownMock,
          pills: <XUIPill value="ABC" />,
          onBackspacePill: onBackspacePillMock,
        }),
      );

      // Act
      wrapper
        .find('input')
        .simulate('keydown', { key: eventKeyValues.backspace, keyCode: 8, which: 8 });

      // Assert
      expect(onKeyDownMock).toHaveBeenCalled();
    });

    it('should call onBackspacePill method if backspace is pressed and pills are present and a custom onKeyDown callback is provided', () => {
      // Arrange
      const onKeyDownMock = jest.fn();
      const onBackspacePillMock = jest.fn();
      const wrapper = mount(
        createComponent({
          onSearch: jest.fn(),
          onKeyDown: onKeyDownMock,
          pills: <XUIPill value="ABC" />,
          onBackspacePill: onBackspacePillMock,
        }),
      );

      // Act
      wrapper
        .find('input')
        .simulate('keydown', { key: eventKeyValues.backspace, keyCode: 8, which: 8 });

      // Assert
      expect(onKeyDownMock).toHaveBeenCalled();
    });
  });
});
