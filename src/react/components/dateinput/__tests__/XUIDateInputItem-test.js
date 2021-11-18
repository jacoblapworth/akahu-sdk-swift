import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import Enzyme, { mount } from 'enzyme';
import { nanoid } from 'nanoid';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIDateInputItem from '../private/XUIDateInputItem';

const { renderIntoDocument } = require('react-dom/test-utils');

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testDateinputId');

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('XUIDateInputItem', () => {
  const selectedDate = new Date(Date.UTC(2020, 11, 15));
  const createComponent = props => (
    <XUIDateInputItem
      inputLabel="Date"
      locale="en-NZ"
      nextButtonAriaLabel="Next month"
      onSelectDate={() => {}}
      prevButtonAriaLabel="Previous month"
      {...props}
      selectedDate={selectedDate}
    />
  );

  it('inserts selected date value', () => {
    const newSelectedDate = new Date(Date.UTC(2020, 11, 18));
    const inputEl = renderer.create(createComponent({ selectedDate: newSelectedDate }));
    expect(inputEl).toMatchSnapshot();
  });

  it('renders with the provided label', () => {
    const inputEl = renderer.create(createComponent({ inputLabel: 'Select date' }));
    expect(inputEl).toMatchSnapshot();
  });

  it('renders with a hint', () => {
    const inputEl = renderer.create(createComponent({ hintMessage: 'hint message' }));
    expect(inputEl).toMatchSnapshot();
  });

  it('renders with validation message', () => {
    const inputEl = renderer.create(
      createComponent({ isInvalid: true, validationMessage: 'validation message' }),
    );
    expect(inputEl).toMatchSnapshot();
  });

  it('renders disabled', () => {
    const inputEl = renderer.create(createComponent({ isDisabled: true }));
    expect(inputEl).toMatchSnapshot();
  });

  it('fires onInputChange callback when text input changed', () => {
    const onInputChange = jest.fn();
    const wrapper = mount(createComponent({ onInputChange }));

    wrapper.find('input').simulate('change', {
      target: {
        value: 'a',
      },
    });

    expect(onInputChange).toHaveBeenCalled();
  });

  it('adds CSS class passed as `triggerClassName`', () => {
    const wrapper = mount(createComponent({ triggerClassName: 'date-input-trigger' }));

    const inputEL = wrapper.find('.date-input-trigger');
    expect(inputEL.length).toEqual(1);
  });

  it('opens DatePicker after focusing the input', () => {
    const wrapper = mount(createComponent({ qaHook: 'date-input-test' }));
    const dropdownOpened = jest.spyOn(wrapper.instance().ddtRef.current, 'openDropdown');

    wrapper.find('input').simulate('click');

    expect(dropdownOpened).toHaveBeenCalled();
  });

  it('opens DatePicker after clicking the icon', () => {
    const wrapper = mount(createComponent({ qaHook: 'date-input-test' }));
    const dropdownOpened = jest.spyOn(wrapper.instance().ddtRef.current, 'openDropdown');

    wrapper.find('.xui-iconwrapper').simulate('click');
    expect(dropdownOpened).toHaveBeenCalled();
  });

  it('should call the passed onFocus handler when focused', () => {
    const dateInputRef = React.createRef();
    render(
      <XUIDateInputItem
        inputLabel="Date"
        locale="en-NZ"
        nextButtonAriaLabel="Next month"
        onSelectDate={() => {}}
        prevButtonAriaLabel="Previous month"
        ref={dateInputRef}
        selectedDate={selectedDate}
      />,
    );

    dateInputRef.current.inputRef.current.focus();
    expect(dateInputRef.current.inputRef.current).toEqual(document.activeElement);
  });

  it('Dropdown opening triggers input focus', () => {
    const wrapper = mount(createComponent({ triggerClassName: 'date-input-trigger' }));
    const dropdownOpened = jest.spyOn(wrapper.instance().ddtRef.current, 'openDropdown');

    wrapper.find('input').simulate('click');

    expect(dropdownOpened).toHaveBeenCalled();
  });

  it('accepts displayedMonth to change DatePicker initial display date', () => {
    const newSelectedDate = new Date(Date.UTC(2020, 1, 15));
    const wrapper = mount(
      createComponent({ selectedDate: newSelectedDate, displayedMonth: newSelectedDate }),
    );

    wrapper.find('input').simulate('click');
    expect(wrapper.find('.xui-datepicker').length).toBe(1);
    const calendarHeadingLabels = wrapper.find('.xui-datepicker--heading-dates label');
    expect(calendarHeadingLabels.length).toBe(2);
    expect(calendarHeadingLabels.first().text()).toEqual('February');
    expect(calendarHeadingLabels.at(1).text()).toEqual('2020');
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(createComponent({ inputLabel: 'default label' }));
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  test('when a user selects a date then clears the input and presses enter, the selected date should be null', () => {
    // Arrange
    const dateInputRef = React.createRef();
    const onSelectDateCallback = jest.fn();
    render(
      <XUIDateInputItem
        inputLabel="Date"
        locale="en-NZ"
        nextButtonAriaLabel="Next month"
        onSelectDate={onSelectDateCallback}
        prevButtonAriaLabel="Previous month"
        ref={dateInputRef}
        qaHook={'dateinputitem'}
      />,
    );

    const inputNode = screen.getByTestId('dateinputitem-dateinputitem--input--input');

    // Act
    userEvent.type(inputNode, 'Jan 1, 2001{enter}');
    expect(inputNode.value).toBe('Jan 1, 2001');
    userEvent.type(inputNode, '{del}{enter}');

    // Assert
    expect(inputNode.value).toBe('');
  });

  test('when a user selects a date then clears the input and presses enter, the user provided `onSelectDate` prop callback should be fired', () => {
    // Arrange
    const dateInputRef = React.createRef();
    const onSelectDateCallback = jest.fn();
    render(
      <XUIDateInputItem
        inputLabel="Date"
        locale="en-NZ"
        nextButtonAriaLabel="Next month"
        onSelectDate={onSelectDateCallback}
        prevButtonAriaLabel="Previous month"
        ref={dateInputRef}
        qaHook={'dateinputitem'}
      />,
    );

    const inputNode = screen.getByTestId('dateinputitem-dateinputitem--input--input');

    // Act
    userEvent.type(inputNode, 'Jan 1, 2001{enter}');
    expect(inputNode.value).toBe('Jan 1, 2001');
    userEvent.type(inputNode, '{del}{enter}');

    // Assert
    expect(onSelectDateCallback).toBeCalled();
  });
});
