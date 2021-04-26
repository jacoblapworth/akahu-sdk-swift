import React from 'react';
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
      locale="en"
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
    const wrapper = renderIntoDocument(
      <XUIDateInputItem
        inputLabel="Date"
        locale="en"
        nextButtonAriaLabel="Next month"
        onSelectDate={() => {}}
        prevButtonAriaLabel="Previous month"
        selectedDate={selectedDate}
      />,
    );

    wrapper.inputRef.current.focus();
    expect(wrapper.inputRef.current).toEqual(document.activeElement);
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
});
