import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { nanoid } from 'nanoid';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIButton from '../../button/XUIButton';
import XUIDateRangeInput from '../XUIDateRangeInput';
import wait from '../../../helpers/wait';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testDateinputId');

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
        inputLabel: 'End date',
        selectedDateDefaultValue: selectedEndDate,
      }}
      locale="en-NZ"
      nextButtonAriaLabel="Next month"
      prevButtonAriaLabel="Previous month"
      qaHook="test"
      startDateInputConfig={{
        displayedMonth: selectedStartDate,
        inputLabel: 'Start date',
        selectedDateDefaultValue: selectedStartDate,
      }}
    />
  );

  describe('New focus behaviour for XUIDateRangeInput with suggested dates', () => {
    test('pressing enter from the trigger opens the dropdown', () => {
      // Arrange
      render(createComponent({ suggestedDates: dateRangeInputSuggestedDates }));

      // Act
      userEvent.click(screen.getByTestId('test-daterangeinput-suggesteddates-trigger'));

      // Assert
      expect(
        screen.queryByTestId('test-daterangeinput-suggesteddates--positioning'),
      ).toBeInTheDocument();
    });

    test('tabbing from an open dropdown closes the dropdown and focuses the next element', async () => {
      // Arrange
      render(
        <>
          {createComponent({ suggestedDates: dateRangeInputSuggestedDates })}
          <XUIButton qaHook="nextElement">Next Element</XUIButton>
        </>,
      );

      // Act
      userEvent.click(screen.getByTestId('test-daterangeinput-suggesteddates-trigger'));
      await wait(100);
      userEvent.tab();

      // Assert
      expect(screen.getByTestId('nextElement')).toHaveFocus();
      // @TODO XUI-2882 Un-comment this line
      // expect(
      //   screen.queryByTestId('test-daterangeinput-suggesteddates--positioning'),
      // ).not.toBeInTheDocument();
    });

    test('shift tabbing from an open dropdown closes the dropdown and focuses the trigger', async () => {
      //Arrange
      render(createComponent({ suggestedDates: dateRangeInputSuggestedDates }));

      // Act
      userEvent.click(screen.getByTestId('test-daterangeinput-suggesteddates-trigger'));
      await wait(100);
      userEvent.tab({ shift: true });

      // Assert
      expect(screen.getByTestId('test-daterangeinput-suggesteddates-trigger')).toHaveFocus();
      // @TODO XUI-2882 Un-comment this line
      // expect(
      //   screen.queryByTestId('test-daterangeinput-suggesteddates--positioning'),
      // ).not.toBeInTheDocument();
    });
  });

  it('renders default component', () => {
    const inputEl = renderer.create(
      <XUIDateRangeInput
        suggestedDates={dateRangeInputSuggestedDates}
        endDateInputConfig={{
          inputLabel: 'End date',
        }}
        locale="en-NZ"
        nextButtonAriaLabel="Next month"
        prevButtonAriaLabel="Previous month"
        startDateInputConfig={{
          inputLabel: 'Start date',
        }}
      />,
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
          inputLabel: 'End date',
          selectedDateDefaultValue: selectedEndDate,
          onSelectDate: onSelectEndDate,
        }}
        locale="en-NZ"
        nextButtonAriaLabel="Next month"
        prevButtonAriaLabel="Previous month"
        qaHook={qaHook}
        startDateInputConfig={{
          displayedMonth: selectedStartDate,
          inputLabel: 'Start date',
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

    wrapper
      .find('[data-automationid="test-daterangeinput-suggesteddates"] button')
      .simulate('click');
    expect(wrapper.find('.xui-dropdown-is-open').length).toEqual(1);
  });

  it('should pass accessibility testing', async () => {
    // axe complains about repeated id but this only happens because we mock it - below code makes sure first 5 ids are 'unique'
    nanoid
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
