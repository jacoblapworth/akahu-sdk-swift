import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { nanoid } from 'nanoid';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIDateRangeInputWIP from '../XUIDateRangeInputWIP';

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testDateinputId');

Enzyme.configure({ adapter: new Adapter() });

describe('XUIDateRangeInputWIP', () => {
  const convenienceDateStartResult = new Date(Date.UTC(2019, 0, 10));
  const convenienceDateEndResult = new Date(Date.UTC(2019, 1, 10));

  const dateRangeInputConvenienceDates = [
    {
      id: 'jan2019',
      text: 'January 2019',
      getStartDate: () => {
        return convenienceDateStartResult;
      },
      getEndDate: () => {
        return convenienceDateEndResult;
      },
    },
  ];

  const selectedStartDate = new Date(Date.UTC(1999, 5, 5));
  const selectedEndDate = new Date(Date.UTC(1999, 11, 15));

  const createComponent = props => (
    <XUIDateRangeInputWIP
      onSelectDate={() => {}}
      {...props}
      convenienceDates={dateRangeInputConvenienceDates}
      endDateInputConfig={{
        displayedMonth: selectedEndDate,
        selectedDateDefaultValue: selectedEndDate,
      }}
      qaHook="test"
      startDateInputConfig={{
        displayedMonth: selectedStartDate,
        selectedDateDefaultValue: selectedStartDate,
      }}
    />
  );

  it('renders default component', () => {
    const inputEl = renderer.create(
      <XUIDateRangeInputWIP convenienceDates={dateRangeInputConvenienceDates} />,
    );
    expect(inputEl).toMatchSnapshot();
  });

  it('renders component with specified dates', () => {
    const inputEl = renderer.create(createComponent());
    expect(inputEl).toMatchSnapshot();
  });

  it('triggers selected date', () => {
    const onSelectStartDate = jest.fn();
    const onSelectEndDate = jest.fn();
    const qaHook = 'test';
    const wrapper = mount(
      <XUIDateRangeInputWIP
        convenienceDates={dateRangeInputConvenienceDates}
        endDateInputConfig={{
          displayedMonth: selectedEndDate,
          selectedDateDefaultValue: selectedEndDate,
          onSelectDate: onSelectEndDate,
        }}
        qaHook={qaHook}
        startDateInputConfig={{
          displayedMonth: selectedStartDate,
          selectedDateDefaultValue: selectedStartDate,
          onSelectDate: onSelectStartDate,
        }}
      />,
    );
    wrapper
      .find(`[data-automationid="${qaHook}-daterangeinput-firstinput-dateinputitem--input"] input`)
      .simulate('focus');
    wrapper
      .find(
        `[data-automationid="${qaHook}-daterangeinput-firstinput-dateinputitem-dropdown"] .xui-datepicker--day-selectable`,
      )
      .first()
      .simulate('click');
    expect(onSelectStartDate).toHaveBeenCalled();

    wrapper
      .find(`[data-automationid="${qaHook}-daterangeinput-secondinput-dateinputitem--input"] input`)
      .simulate('focus');
    wrapper
      .find(
        `[data-automationid="${qaHook}-daterangeinput-secondinput-dateinputitem-dropdown"] .xui-datepicker--day-selectable`,
      )
      .first()
      .simulate('click');
    expect(onSelectEndDate).toHaveBeenCalled();
  });

  it('opens convenience date dropdown', () => {
    const wrapper = mount(createComponent());

    wrapper
      .find('[data-automationid="test-daterangeinput-conveniencedates"] button')
      .simulate('click');
    expect(wrapper.find('.xui-dropdown-is-open').length).toEqual(1);
  });
});
