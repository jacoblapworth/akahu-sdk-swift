import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { nanoid } from 'nanoid';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIDateInput from '../XUIDateInput';

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

  it('should pass accessibility testing', async () => {
    const wrapper = mount(createComponent({ inputLabel: 'default label' }));
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
