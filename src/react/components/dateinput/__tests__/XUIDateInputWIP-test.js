import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { v4 as uuidv4 } from 'uuid';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIDateInputWIP from '../XUIDateInputWIP';

jest.mock('uuid');
uuidv4.mockImplementation(() => 'testDateinputId');

Enzyme.configure({ adapter: new Adapter() });

describe('XUIDateInput', () => {
  const convenienceDateResult = new Date(Date.UTC(2019, 0, 10));
  const dateInputConvenienceDates = [
    {
      id: 'jan2019',
      text: 'January 2019',
      getDate: () => {
        return convenienceDateResult;
      },
    },
  ];

  const selectedDate = new Date(Date.UTC(2020, 11, 15));
  const createComponent = props => (
    <XUIDateInputWIP
      onSelectDate={() => {}}
      {...props}
      displayedMonth={new Date(Date.UTC(2020, 10))}
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
      <XUIDateInputWIP
        displayedMonth={newSelectedDate}
        onSelectDate={onSelectDate}
        selectedDateValue={newSelectedDate}
      />,
    );

    wrapper.find('input').simulate('focus');
    wrapper.find('.xui-datepicker--day-selectable').first().simulate('click');

    expect(onSelectDate).toHaveBeenCalled();
  });

  it('uses convenience dates', () => {
    const wrapper = mount(
      createComponent({
        convenienceDates: dateInputConvenienceDates,
      }),
    );

    expect(wrapper.find('.xui-datepicker').length).toBe(0);

    wrapper.find('input').simulate('focus');

    expect(wrapper.find('.xui-datepicker').length).toBe(1);
    expect(wrapper.find('li#jan2019').length).toBe(1);
  });

  it('selects a convenience date', async () => {
    const onSelectProp = jest.fn();
    const wrapper = mount(
      createComponent({
        convenienceDates: dateInputConvenienceDates,
        onSelectDate: onSelectProp,
      }),
    );

    wrapper.find('input').simulate('focus');
    wrapper.find('li#jan2019 button').simulate('click');

    expect(onSelectProp).toHaveBeenCalledWith(convenienceDateResult);
  });

  it('selects a convenience date on an empty input', () => {
    const newSelectedDate = new Date(Date.UTC(2020, 0, 15));
    const onSelectProp = jest.fn();
    const wrapper = mount(
      <XUIDateInputWIP
        convenienceDates={dateInputConvenienceDates}
        displayedMonth={newSelectedDate}
        onSelectDate={onSelectProp}
      />,
    );

    expect(wrapper.find('input').instance().value).toBe('');

    wrapper.find('input').simulate('focus');
    wrapper.find('li#jan2019 button').simulate('click');

    expect(onSelectProp).toHaveBeenCalledWith(convenienceDateResult);

    const year = convenienceDateResult.toLocaleString('en-GB', {
      year: 'numeric',
    });
    const month = convenienceDateResult.toLocaleString('en-GB', {
      month: 'short',
    });
    const day = convenienceDateResult.toLocaleString('en-GB', {
      day: 'numeric',
    });

    expect(wrapper.find('input').instance().value).toBe(`${day} ${month} ${year}`);
  });
});
