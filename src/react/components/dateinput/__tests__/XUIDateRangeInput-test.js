import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { v4 as uuidv4 } from 'uuid';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIDateRangeInput from '../XUIDateRangeInput';

jest.mock('uuid');
uuidv4.mockImplementation(() => 'testDateinputId');

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('XUIDateRangeInput', () => {
  const suggestedDateStartResult = new Date(Date.UTC(2019, 0, 10));
  const suggestedDateEndResult = new Date(Date.UTC(2019, 1, 10));

  const dateRangeInputSuggestedDates = [
    {
      id: 'jan2019',
      text: 'January 2019',
      getStartDate: () => {
        return suggestedDateStartResult;
      },
      getEndDate: () => {
        return suggestedDateEndResult;
      },
    },
  ];

  const selectedStartDate = new Date(Date.UTC(1999, 5, 5));
  const selectedEndDate = new Date(Date.UTC(1999, 11, 15));

  const createComponent = props => (
    <XUIDateRangeInput
      onSelectDate={() => {}}
      {...props}
      endDateInputConfig={{
        displayedMonth: selectedEndDate,
        inputLabel: 'end label',
        selectedDateDefaultValue: selectedEndDate,
      }}
      startDateInputConfig={{
        displayedMonth: selectedStartDate,
        inputLabel: 'start label',
        selectedDateDefaultValue: selectedStartDate,
      }}
    />
  );

  it('renders default component', () => {
    const inputEl = renderer.create(
      <XUIDateRangeInput suggestedDates={dateRangeInputSuggestedDates} />,
    );
    expect(inputEl).toMatchSnapshot();
  });

  it('renders component with specified dates', () => {
    const inputEl = renderer.create(
      createComponent({ suggestedDates: dateRangeInputSuggestedDates }),
    );
    expect(inputEl).toMatchSnapshot();
  });

  it('triggers selected date', () => {
    const onSelectStartDate = jest.fn();
    const onSelectEndDate = jest.fn();
    const qaHook = 'test';
    const wrapper = mount(
      <XUIDateRangeInput
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
        suggestedDates={dateRangeInputSuggestedDates}
      />,
    );
    wrapper
      .find(`[data-automationid="${qaHook}-daterangeinput-firstinput-dateinputitem--input"] input`)
      .simulate('click');
    wrapper
      .find(
        `[data-automationid="${qaHook}-daterangeinput-firstinput-dateinputitem-dropdown"] .xui-datepicker--day-selectable`,
      )
      .first()
      .simulate('click');
    expect(onSelectStartDate).toHaveBeenCalled();

    wrapper
      .find(`[data-automationid="${qaHook}-daterangeinput-secondinput-dateinputitem--input"] input`)
      .simulate('click');
    wrapper
      .find(
        `[data-automationid="${qaHook}-daterangeinput-secondinput-dateinputitem-dropdown"] .xui-datepicker--day-selectable`,
      )
      .first()
      .simulate('click');
    expect(onSelectEndDate).toHaveBeenCalled();
  });

  it('opens suggested date dropdown', () => {
    const wrapper = mount(createComponent({ suggestedDates: dateRangeInputSuggestedDates }));

    wrapper.find('.xui-button--caret .xui-iconwrapper').simulate('click');
    expect(wrapper.find('.xui-dropdown-is-open').length).toEqual(1);
  });

  it('should pass accessibility testing', async () => {
    // axe complains about repeated id but this only happens because we mock it - below code makes sure first 5 ids are 'unique'
    uuidv4
      .mockImplementationOnce(() => 'testDateinputId1')
      .mockImplementationOnce(() => 'testDateinputId2')
      .mockImplementationOnce(() => 'testDateinputId3')
      .mockImplementationOnce(() => 'testDateinputId4')
      .mockImplementationOnce(() => 'testDateinputId5')
      .mockImplementationOnce(() => 'testDateinputId6');
    const wrapper = mount(createComponent());
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  // TODO: add extended axe test that covers the variant with suggested dates.
});
