import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { nanoid } from 'nanoid';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIAutocompleter from '../XUIAutocompleter';
import XUIAutocompleterEmptyState from '../XUIAutocompleterEmptyState';
import XUIButton from '../../button/XUIButton';
import XUIPill from '../../pill/XUIPill';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIPickitem from '../../picklist/XUIPickitem';
import XUILoader from '../../loader/XUILoader';
import XUIDropdownToggled from '../../dropdown/XUIDropdownToggled';
import XUIDropdownLayout from '../../dropdown/XUIDropdownLayout';
import XUIDropdownFooter from '../../dropdown/XUIDropdownFooter';
import { eventKeyValues } from '../../helpers/reactKeyHandler';
import wait from '../../../helpers/wait';
import NOOP from '../../helpers/noop';

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testAutocompleterId');
Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('XUIAutocompleter', () => {
  const item1 = <XUIPickitem id="item1">Item 1</XUIPickitem>;
  const createComponent = props => (
    <XUIAutocompleter dropdownSize="medium" {...props}>
      <XUIPicklist>
        {item1}
        <XUIPickitem id="item2">Item 2</XUIPickitem>
      </XUIPicklist>
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

  it('renders with isLoading as false by default', () => {
    const wrapper = mount(createComponent({ onSearch: jest.fn() }));
    expect(wrapper.prop('isLoading')).toBeFalsy();
  });

  it('displays a XUILoader when isLoading is true', () => {
    const wrapper = mount(
      createComponent({ onSearch: jest.fn(), isLoading: true, loadingAriaLabel: '' }),
    );

    expect(wrapper.find(XUILoader)).toBeDefined();
    expect(wrapper.prop('isLoading')).toBeTruthy();
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

  it('opens the dropdown when we trigger `openDropdown` and closes the dropdown when we trigger `closeDropdown`', () => {
    const wrapper = mount(
      createComponent({
        onSearch: jest.fn(),
        searchValue: 'z',
        searchDebounceTimeout: 500,
      }),
    );
    expect(wrapper.instance().ddt.current.state.isHidden).toBeTruthy();

    wrapper.instance().openDropdown();
    expect(wrapper.instance().ddt.current.state.isHidden).toBeFalsy();

    wrapper.instance().closeDropdown();
    expect(wrapper.instance().ddt.current.state.isHidden).toBeTruthy();
  });

  it('sets the dropdown to match trigger width if no dropdownSize is provided in the component props', () => {
    const wrapper = mount(createComponent({ onSearch: jest.fn(), dropdownSize: null }));
    expect(wrapper.find(XUIDropdownToggled).props().matchTriggerWidth).toBeTruthy();
  });

  it('when disableWrapPills prop is applied disable pillwrap class is applied', () => {
    const wrapper = mount(createComponent({ onSearch: jest.fn() }));
    expect(wrapper.find('.xui-autocompleter--trigger-nopillwrap').length).toEqual(0);

    const disableWrapPills = mount(
      createComponent({
        onSearch: jest.fn(),
        disableWrapPills: true,
        pills: [<XUIPill key="1" value="test" />],
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
      expect(wrapper.find(XUIDropdownLayout).props().size).toBe('medium');
      expect(wrapper.find(XUIDropdownToggled).props().matchTriggerWidth).toBeFalsy();
    });
  });

  it('flushes the debounce when enter or space is pressed', () => {
    // Arrange
    const wrapper = mount(createComponent({ onSearch: jest.fn() }));
    wrapper.instance().openDropdown();
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

  it('makes sure that onOptionSelect is called and verify keyboard bindings', async () => {
    // Arrange
    const onOptionSelect = jest.fn();

    const wrapper = mount(
      createComponent({
        onSearch: jest.fn(),
        onOptionSelect,
      }),
    );
    const input = wrapper.find('input');

    // Act
    wrapper.instance().openDropdown();

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
    expect(onOptionSelect).toHaveBeenCalled();
  });

  it('makes sure that onSearch gets called before onOptionSelect', async () => {
    // Arrange
    const onSearch = jest.fn();
    const onOptionSelect = jest.fn();

    const wrapper = mount(
      createComponent({
        onSearch,
        onOptionSelect,
      }),
    );
    const input = wrapper.find('input');

    // Act
    wrapper.instance().openDropdown();

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
    wrapper.instance().openDropdown();

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
      wrapper.instance().openDropdown();

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
      wrapper.instance().openDropdown();

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
      wrapper.instance().openDropdown();

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

  it('adds aria-activedescendant to the input when pickitems are highlighted', async () => {
    // Arrange
    const onOptionSelect = jest.fn();

    const wrapper = mount(
      createComponent({
        onSearch: jest.fn(),
      }),
    );
    const input = wrapper.find('input');

    // Act
    wrapper.instance().openDropdown();
    wrapper.instance().highlightItem(item1);
    input.simulate('keydown', { key: eventKeyValues.down });

    /**
     * Why are we awaiting a 0ms timer?
     * Rationale: To ensure that the test assertion runs after all the required re-renders have taken placed.
     * Important: If jest.useFakeTimers() is used, this test must be placed in a separate describe test.
     */
    await wait();

    // Assert
    expect(wrapper.find('input').prop('aria-activedescendant')).toEqual('item1');
  });

  it('should pass accessibility testing', async () => {
    const onSearch = jest.fn();
    const component = mount(createComponent({ onSearch, inputLabel: 'Items' }));
    const results = await axe(component.html());
    expect(results).toHaveNoViolations();
  });

  it('should tab from trigger input to footer if prop `closeOnTab` is false', () => {
    // Arrange
    const onSearch = jest.fn();
    const footerComponent = (
      <XUIDropdownFooter
        pickItems={
          <XUIPickitem id="footer" className="footer">
            Footer
          </XUIPickitem>
        }
      />
    );
    const autocompleterComponent = createComponent({
      onSearch,
      footer: footerComponent,
      isLegacyDisplay: false,
    });

    render(autocompleterComponent);
    const input = screen.getByRole('textbox');
    const footer = screen.getByText('Footer').parentNode;

    // Act
    userEvent.type(input, 'a');
    userEvent.tab();

    // Assert
    expect(footer).toHaveFocus();
  });

  describe('when ESC is pressed', () => {
    it('while the the dropdown is open and focus is on trigger, dropdown should close', () => {
      // Arrange
      const onSearch = jest.fn();
      const onClose = jest.fn();
      const autocompleterRef = React.createRef();
      const autocompleterComponent = createComponent({
        onClose,
        onSearch,
        isLegacyDisplay: false,
        ref: autocompleterRef,
      });

      render(autocompleterComponent);
      const input = screen.getByRole('textbox');

      // Act
      userEvent.click(input);
      autocompleterRef.current.openDropdown();
      userEvent.keyboard('{esc}');

      // Assert
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('when down arrow is pressed', () => {
    test('empty dropdowns do not throw an error when attempting to highlight the first item', async () => {
      // Arrange
      const autocompleterRef = React.createRef();

      render(
        <XUIAutocompleter
          dropdownSize="medium"
          qaHook="testAutocompleter"
          onSearch={NOOP}
          ref={autocompleterRef}
        >
          <XUIPicklist>
            <XUIAutocompleterEmptyState qaHook="testAutocompleterEmptyState">
              Empty list
            </XUIAutocompleterEmptyState>
          </XUIPicklist>
        </XUIAutocompleter>,
      );
      const input = screen.getByTestId('testAutocompleter');

      // Act
      userEvent.click(input); // Focus autocompleter
      autocompleterRef.current.openDropdown(); // Open dropdown
      userEvent.keyboard('{arrowDown}'); // Focus first item

      /**
       * Why are we awaiting a 0ms timer? Rationale: To ensure that the test assertion runs after
       * all the required re-renders have taken placed. Important: If jest.useFakeTimers() is used,
       * this test must be placed in a separate describe test.
       */
      await wait();

      const dropdown = screen.getByTestId('testAutocompleterEmptyState');

      // Assert
      expect(dropdown).toBeInTheDocument();
    });
  });

  test('closes the dropdown when tabbing between cells', () => {
    // Arrange
    const onOpenMock = jest.fn();
    const onCloseMock = jest.fn();
    render(
      <div>
        <XUIAutocompleter
          onClose={onCloseMock}
          onOpen={onOpenMock}
          onSearch={() => {}}
          openOnFocus
          pills={
            <XUIPill
              value="Pill"
              onDeleteClick={() => {}}
              deleteButtonLabel="Delete"
              size="small"
            />
          }
          qaHook="test-autocompleter-1"
        />
        <XUIAutocompleter
          onClose={onCloseMock}
          onOpen={onOpenMock}
          onSearch={() => {}}
          openOnFocus
          pills={
            <XUIPill
              value="Pill"
              onDeleteClick={() => {}}
              deleteButtonLabel="Delete"
              size="small"
            />
          }
          qaHook="test-autocompleter-2"
        />
      </div>,
    );

    // Act
    userEvent.click(screen.getByTestId('test-autocompleter-1')); // test-autocompleter-1 input
    userEvent.tab(); // test-autocompleter-2 pill
    userEvent.tab(); // test-autocompleter-2 input

    // Assert
    expect(onOpenMock).toHaveBeenCalledTimes(2);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  describe('New focus behaviour', () => {
    describe('without a footer', () => {
      test('pressing the down arrow from the input trigger opens the dropdown, and leaves focus on the input', () => {
        // Arrange
        render(
          createComponent({
            onSearch: () => {},
            qaHook: 'autocompleter',
            useNewFocusBehaviour: true,
          }),
        );

        // Act
        const input = screen.getByTestId('autocompleter--input');
        userEvent.type(input, '{arrowDown}');

        // Assert
        expect(screen.queryByTestId('autocompleter--list')).toBeInTheDocument();
        expect(screen.getByTestId('autocompleter--input')).toHaveFocus();
      });

      test('tabbing from an open autocompleter closes the dropdown and focuses the next element', () => {
        // Arrange
        render(
          <>
            {createComponent({
              onSearch: () => {},
              qaHook: 'autocompleter',
              useNewFocusBehaviour: true,
            })}
            <XUIButton qaHook="nextElement">Next Element</XUIButton>
          </>,
        );

        // Act
        const input = screen.getByTestId('autocompleter--input');
        userEvent.type(input, '{arrowDown}');
        userEvent.tab();

        // Assert
        expect(screen.getByTestId('nextElement')).toHaveFocus();
        expect(screen.queryByTestId('autocompleter--list')).not.toBeInTheDocument();
      });

      test('shift tabbing from an open autocompleter closes the dropdown and focuses the previous element', () => {
        // Arrange
        render(
          <>
            <XUIButton qaHook="previousElement">Previous Element</XUIButton>
            {createComponent({
              onSearch: () => {},
              qaHook: 'autocompleter',
              useNewFocusBehaviour: true,
            })}
          </>,
        );

        // Act
        const input = screen.getByTestId('autocompleter--input');
        userEvent.type(input, '{arrowDown}');
        userEvent.tab({ shift: true });

        // // Assert
        expect(screen.getByTestId('previousElement')).toHaveFocus();
        expect(screen.queryByTestId('autocompleter--list')).not.toBeInTheDocument();
      });
    });

    describe('with a footer', () => {
      const footerComponent = (
        <XUIDropdownFooter
          pickItems={
            <XUIPickitem id="footer" qaHook="autocompleterFooter">
              Footer
            </XUIPickitem>
          }
        />
      );

      test('pressing the down arrow from the input trigger opens the dropdown, and leaves focus on the input', () => {
        // Arrange
        render(
          createComponent({
            footer: footerComponent,
            onSearch: () => {},
            qaHook: 'autocompleter',
            useNewFocusBehaviour: true,
          }),
        );

        // Act
        const input = screen.getByTestId('autocompleter--input');
        userEvent.type(input, '{arrowDown}');

        // Assert
        expect(screen.queryByTestId('autocompleter--list')).toBeInTheDocument();
        expect(screen.getByTestId('autocompleter--input')).toHaveFocus();
      });

      test('tabbing from an open autocompleter focuses the dropdown footer', () => {
        // Arrange
        render(
          createComponent({
            footer: footerComponent,
            onSearch: () => {},
            qaHook: 'autocompleter',
            useNewFocusBehaviour: true,
          }),
        );

        // Act
        const input = screen.getByTestId('autocompleter--input');
        userEvent.type(input, '{arrowDown}');
        userEvent.tab();

        // Assert
        expect(screen.getByTestId('autocompleterFooter--body')).toHaveFocus();
      });

      test('tabbing from an autocompleter footer closes the dropdown and focuses the next element', () => {
        // Arrange
        render(
          <>
            {createComponent({
              footer: footerComponent,
              onSearch: () => {},
              qaHook: 'autocompleter',
              useNewFocusBehaviour: true,
            })}
            <XUIButton qaHook="nextElement">Next Element</XUIButton>
          </>,
        );

        // Act
        const input = screen.getByTestId('autocompleter--input');
        userEvent.type(input, '{arrowDown}');
        userEvent.tab();
        userEvent.tab();

        // Assert
        expect(screen.getByTestId('nextElement')).toHaveFocus();
        expect(screen.queryByTestId('autocompleter--list')).not.toBeInTheDocument();
      });

      test('shift tabbing from an autocompleter footer closes the dropdown and focuses the trigger', () => {
        // Arrange
        render(
          createComponent({
            footer: footerComponent,
            onSearch: () => {},
            qaHook: 'autocompleter',
            useNewFocusBehaviour: true,
          }),
        );

        // Act
        const input = screen.getByTestId('autocompleter--input');
        userEvent.type(input, '{arrowDown}');
        userEvent.tab();
        userEvent.tab({ shift: true });

        // Assert
        expect(screen.getByTestId('autocompleter--input')).toHaveFocus();
        expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
      });
    });
  });

  describe('when passed an onBlur function via inputProps', () => {
    const onBlurMock = jest.fn();
    const topLevelOnBlurMock = jest.fn();
    const blurTestAutocompleter = hasTopLevelOnBlur => (
      <>
        <XUIAutocompleter
          dropdownSize="medium"
          inputProps={{ onBlur: onBlurMock }}
          onSearch={() => {}}
          openOnFocus
          qaHook="testAutocompleter"
          onBlur={hasTopLevelOnBlur ? topLevelOnBlurMock : undefined}
        >
          <XUIPicklist qaHook="blurTestDropDown">
            <XUIPickitem id="blurTestPickItem" qaHook="blurTestPickItem">
              Item
            </XUIPickitem>
          </XUIPicklist>
        </XUIAutocompleter>
        <div data-automationid="outside-autocompleter" />
      </>
    );
    it('should call the function if manually blurring off of the text input', () => {
      // Arrange
      onBlurMock.mockClear();
      render(blurTestAutocompleter());

      // Act
      const input = screen.getByTestId('testAutocompleter');
      userEvent.click(input); // Focus autocompleter

      const outsideAutocompleter = screen.getByTestId('outside-autocompleter');
      userEvent.click(outsideAutocompleter); // Manually click away from autocompleter

      // Assert
      expect(onBlurMock).toHaveBeenCalledTimes(1);
      expect(onBlurMock).not.toBeCalledWith(); // Checking it was called with something, the something should be a blur event, but those are difficult to mock
    });

    it('should not call the function if the dropdown closes due to a click inside the dropdown', () => {
      // Arrange
      onBlurMock.mockClear();
      render(blurTestAutocompleter());
      // Act
      const input = screen.getByTestId('testAutocompleter');
      userEvent.click(input); // Focus autocompleter
      const item = screen.getByTestId('blurTestPickItem');
      userEvent.click(item);

      // Assert
      expect(onBlurMock).not.toHaveBeenCalled();
      expect(screen.queryByTestId('blurTestDropDown')).toBeNull(); // Dropdown was closed
    });

    it('should not call the function if the dropdown closes due to a keyboard selection inside the dropdown', () => {
      // Arrange
      onBlurMock.mockClear();
      render(blurTestAutocompleter());
      // Act
      const input = screen.getByTestId('testAutocompleter');
      userEvent.click(input); // Focus autocompleter
      const item = screen.getByTestId('blurTestPickItem');
      userEvent.type(item, '{Enter}');

      // Assert
      expect(onBlurMock).not.toHaveBeenCalled();
      expect(screen.queryByTestId('blurTestDropDown')).toBeNull(); // Dropdown was closed
    });

    it('should not call an onBlur method passed as a prop directly onto the autocompleter', () => {
      // Arrange
      render(blurTestAutocompleter());
      // Act
      const input = screen.getByTestId('testAutocompleter');
      userEvent.click(input); // Focus autocompleter

      const outsideAutocompleter = screen.getByTestId('outside-autocompleter');
      userEvent.click(outsideAutocompleter); // Manually click away from autocompleter

      // Assert
      expect(topLevelOnBlurMock).not.toHaveBeenCalled();
    });
  });
});
