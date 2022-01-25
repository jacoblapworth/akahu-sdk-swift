import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { nanoid } from 'nanoid';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIButton from '../../button/XUIButton';
import XUIDateInput from '../XUIDateInput';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testDateinputId');

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('XUIDateInput', () => {
  const suggestedDateResult = new Date(Date.UTC(2019, 0, 10));
  const dateInputSuggestedDates = [
    {
      id: 'jan2019',
      text: 'January 2019',
      getDate: () => {
        return suggestedDateResult;
      },
    },
  ];

  const selectedDate = new Date(Date.UTC(2020, 11, 15));
  const createComponent = props => (
    <XUIDateInput
      onSelectDate={() => {}}
      {...props}
      displayedMonth={new Date(Date.UTC(2020, 10))}
      inputLabel="Date"
      locale="en-NZ"
      nextButtonAriaLabel="Next month"
      prevButtonAriaLabel="Previous month"
      selectedDateValue={selectedDate}
    />
  );

  it('renders default component', () => {
    const inputEl = renderer.create(createComponent());
    expect(inputEl).toMatchSnapshot();
  });

  it('inserts selected date value', () => {
    const newSelectedDate = new Date(Date.UTC(2020, 11, 18));
    const inputEl = renderer.create(createComponent({ selectedDateValue: newSelectedDate }));
    expect(inputEl).toMatchSnapshot();
  });

  it('triggers selected date', () => {
    const onSelectDate = jest.fn();
    const newSelectedDate = new Date(Date.UTC(2020, 11, 18));
    const wrapper = mount(
      <XUIDateInput
        displayedMonth={newSelectedDate}
        inputLabel="Date"
        locale="en-NZ"
        nextButtonAriaLabel="Next month"
        onSelectDate={onSelectDate}
        prevButtonAriaLabel="Previous month"
        selectedDateValue={newSelectedDate}
      />,
    );

    wrapper.find('input').simulate('click');
    wrapper.find('.xui-datepicker--day-selectable').first().simulate('click');

    expect(onSelectDate).toHaveBeenCalled();
  });

  it('triggers validation callback on invalid dates', () => {
    const onSelectDate = jest.fn();
    const onValidationFailed = jest.fn();

    const newSelectedDate = new Date(Date.UTC(2020, 11, 18));
    const wrapper = mount(
      <XUIDateInput
        displayedMonth={newSelectedDate}
        inputLabel="Date"
        locale="en-NZ"
        nextButtonAriaLabel="Next month"
        onSelectDate={onSelectDate}
        onValidationFailed={onValidationFailed}
        prevButtonAriaLabel="Previous month"
        selectedDateValue={newSelectedDate}
      />,
    );

    wrapper.find('input').simulate('change', { target: { value: 'not a valid date!' } });
    wrapper.find('input').simulate('blur');

    expect(onValidationFailed).toHaveBeenCalledWith('not a valid date!');
  });

  it('uses suggested dates', () => {
    const wrapper = mount(
      createComponent({
        suggestedDates: dateInputSuggestedDates,
      }),
    );

    expect(wrapper.find('.xui-datepicker').length).toBe(0);

    wrapper.find('input').simulate('click');

    expect(wrapper.find('.xui-datepicker').length).toBe(1);
    expect(wrapper.find('li#jan2019').length).toBe(1);
  });

  it('selects a suggested date', async () => {
    const onSelectProp = jest.fn();
    const wrapper = mount(
      createComponent({
        suggestedDates: dateInputSuggestedDates,
        onSelectDate: onSelectProp,
      }),
    );

    wrapper.find('input').simulate('click');
    wrapper.find('li#jan2019 button').simulate('click');

    expect(onSelectProp).toHaveBeenCalledWith(suggestedDateResult);
  });

  it('selects a suggested date on an empty input', () => {
    const newSelectedDate = new Date(Date.UTC(2020, 0, 15));
    const onSelectProp = jest.fn();
    const wrapper = mount(
      <XUIDateInput
        displayedMonth={newSelectedDate}
        inputLabel="Date"
        locale="en-NZ"
        nextButtonAriaLabel="Next month"
        onSelectDate={onSelectProp}
        prevButtonAriaLabel="Previous month"
        suggestedDates={dateInputSuggestedDates}
      />,
    );

    expect(wrapper.find('input').instance().value).toBe('');

    wrapper.find('input').simulate('click');
    wrapper.find('li#jan2019 button').simulate('click');

    expect(onSelectProp).toHaveBeenCalledWith(suggestedDateResult);

    const year = suggestedDateResult.toLocaleString('en-GB', {
      year: 'numeric',
    });
    const month = suggestedDateResult.toLocaleString('en-GB', {
      month: 'short',
    });
    const day = suggestedDateResult.toLocaleString('en-GB', {
      day: 'numeric',
    });

    expect(wrapper.find('input').instance().value).toBe(`${day} ${month} ${year}`);
  });

  test('Parses dates correctly for the en-US locale', () => {
    // Arrange
    const onSelectDate = jest.fn();
    render(
      <XUIDateInput
        inputLabel="Date"
        locale="en-US"
        nextButtonAriaLabel="Next month"
        onSelectDate={onSelectDate}
        prevButtonAriaLabel="Previous month"
      ></XUIDateInput>,
    );

    const inputNode = screen.getByLabelText('Date');

    // Act
    userEvent.type(inputNode, '01/12/2022{enter}');

    // Assert
    expect(inputNode.value).toBe('Jan 12, 2022');
  });

  test('Parses dates correctly for the en-NZ locale', () => {
    // Arrange
    const onSelectDate = jest.fn();
    render(
      <XUIDateInput
        inputLabel="Date"
        locale="en-NZ"
        nextButtonAriaLabel="Next month"
        onSelectDate={onSelectDate}
        prevButtonAriaLabel="Previous month"
      ></XUIDateInput>,
    );

    const inputNode = screen.getByLabelText('Date');

    // Act
    userEvent.type(inputNode, '01/12/2022{enter}');

    // Assert
    expect(inputNode.value).toBe('1 Dec 2022');
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(createComponent({ inputLabel: 'default label' }));
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  describe('Focus behaviour for XUIDateInput', () => {
    afterEach(() => {
      document.body.innerHTML = '';
    });

    describe('Without suggested dates', () => {
      test('focusing the trigger opens the datepicker, and leaves focus on the input', () => {
        // Arrange
        render(createComponent({ qaHook: 'test' }));

        // Act
        userEvent.click(screen.getByTestId('test-dateinput-dateinputitem--input--input'));

        // Assert
        expect(screen.queryByTestId('test-dateinput-dateinputitem-datepicker')).toBeInTheDocument();
        expect(screen.getByTestId('test-dateinput-dateinputitem--input--input')).toHaveFocus();
      });

      test('tabbing from an open datepicker closes the dropdown focuses the next element', () => {
        // Arrange
        render(
          <>
            {createComponent({ qaHook: 'test' })}
            <XUIButton qaHook="nextElement">Next Element</XUIButton>
          </>,
        );

        // XUIDateInput renders the datepicker in a `XUINestedDropdown`
        // The visibility of the non-visible panel is controlled by a CSS class which sets 'display:none'
        // The test file only has access to the class name, not the CSS
        // So we are adding this here to prevent the hidden panel from showing up in the DOM
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `.xui-dropdown-nested-is-hidden {display: none;}`;
        document.body.appendChild(styleElement);

        // Act
        const input = screen.getByTestId('test-dateinput-dateinputitem--input--input');
        userEvent.type(input, '{arrowDown}');
        userEvent.tab();

        // Assert
        expect(screen.getByTestId('nextElement')).toHaveFocus();
        expect(
          screen.queryByTestId('test-dateinput-dateinputitem-datepicker'),
        ).not.toBeInTheDocument();
      });

      test('shift tabbing through the datepicker closes the dropdown and focuses the input', () => {
        // Arrange
        render(createComponent({ qaHook: 'test' }));

        // Act
        const input = screen.getByTestId('test-dateinput-dateinputitem--input--input');
        userEvent.click(input);
        userEvent.type(input, '{arrowDown}');
        userEvent.tab();

        // We shift tab 5 times here as focus is initially placed on a date in the datepicker dropdown
        // These shift tabs navigate us back to the first focusable element in the dropdown, and then
        // back to the input
        userEvent.tab({ shift: true });
        userEvent.tab({ shift: true });
        userEvent.tab({ shift: true });
        userEvent.tab({ shift: true });
        userEvent.tab({ shift: true });

        // Assert
        expect(screen.getByTestId('test-dateinput-dateinputitem--input--input')).toHaveFocus();
        expect(
          screen.queryByTestId('test-dateinput-dateinputitem-datepicker'),
        ).not.toBeInTheDocument();
      });
    });

    describe('With suggested dates', () => {
      test('focusing the trigger opens the dropdown, and leaves focus on the input', () => {
        // Arrange
        render(createComponent({ qaHook: 'test', suggestedDates: dateInputSuggestedDates }));

        // Act
        userEvent.click(screen.getByTestId('test-dateinput-dateinputitem--input--input'));

        // Assert
        expect(screen.queryByTestId('test-dateinput-dateinputitem-datepicker')).toBeInTheDocument();
        expect(screen.getByTestId('test-dateinput-dateinputitem--input--input')).toHaveFocus();
      });

      test('tabbing from an open dropdown focuses the dropdown footer', () => {
        // Arrange
        render(createComponent({ qaHook: 'test', suggestedDates: dateInputSuggestedDates }));

        // Act
        const input = screen.getByTestId('test-dateinput-dateinputitem--input--input');
        // @TODO XUI-2898 Remove the line below once this ticket has been completed
        userEvent.type(input, '{arrowDown}');
        userEvent.tab();

        // Assert
        expect(
          screen.getByTestId('test-dateinput-dateinputitem-suggesteddates--footer--body'),
        ).toHaveFocus();
      });

      test('tabbing from the dropdown footer closes the dropdown and focuses the next element', () => {
        // Arrange
        render(
          <>
            {createComponent({ qaHook: 'test', suggestedDates: dateInputSuggestedDates })}
            <XUIButton qaHook="nextElement">Next Element</XUIButton>
          </>,
        );

        // Act
        const input = screen.getByTestId('test-dateinput-dateinputitem--input--input');
        // @TODO XUI-2898 Remove the line below once this ticket has been completed
        userEvent.type(input, '{arrowDown}');
        userEvent.tab();
        userEvent.tab();

        // Assert
        expect(screen.getByTestId('nextElement')).toHaveFocus();
        expect(
          screen.queryByTestId('test-dateinput-dateinputitem-datepicker'),
        ).not.toBeInTheDocument();
      });

      test('shift tabbing from the dropdown footer closes the dropdown and focuses the input', () => {
        // Arrange
        render(createComponent({ qaHook: 'test', suggestedDates: dateInputSuggestedDates }));

        // XUIDateInput renders the suggested dates dropdown and datepicker in a `XUINestedDropdown`
        // The visibility of the non-visible panel is controlled by a CSS class which sets 'display:none'
        // The test file only has access to the class name, not the CSS
        // So we are adding this here to prevent the hidden panel from showing up in the DOM
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `.xui-dropdown-nested-is-hidden {display: none;}`;
        document.body.appendChild(styleElement);

        // Act
        const input = screen.getByTestId('test-dateinput-dateinputitem--input--input');
        userEvent.click(input);
        // @TODO XUI-2898 Remove the line below once this ticket has been completed
        userEvent.type(input, '{arrowDown}');
        userEvent.tab();
        userEvent.tab({ shift: true });

        // Assert
        expect(screen.getByTestId('test-dateinput-dateinputitem--input--input')).toHaveFocus();
        expect(
          screen.queryByTestId('test-dateinput-dateinputitem-datepicker'),
        ).not.toBeInTheDocument();
      });
    });
  });
});
