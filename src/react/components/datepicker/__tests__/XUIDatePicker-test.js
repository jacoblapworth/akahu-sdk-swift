import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import XUIDatePicker from '../XUIDatePicker';

expect.extend(toHaveNoViolations);

const MockXUIDatePicker = props => (
  <XUIDatePicker
    locale="en"
    nextButtonAriaLabel="Next month"
    onSelectDate={() => {}}
    prevButtonAriaLabel="Previous month"
    qaHook="datepicker"
    {...props}
  />
);

describe('<XUIDatePicker />', () => {
  test('initialises month and year selectors to correct values', () => {
    // Arrange
    render(MockXUIDatePicker({ displayedMonth: new Date(2018, 10) }));

    // Assert
    expect(screen.getByTestId('datepicker--monthselectorlabel')).toHaveTextContent('November');
    expect(screen.getByTestId('datepicker--yearselectorlabel')).toHaveTextContent('2018');
  });

  test('calls onMonthChange method with the correct value when month is changed', () => {
    // Arrange
    const onMonthChangeMock = jest.fn();

    render(
      MockXUIDatePicker({
        displayedMonth: new Date(2018, 10),
        onMonthChange: onMonthChangeMock,
      }),
    );

    // Act
    userEvent.selectOptions(screen.getByTestId('datepicker--monthselector'), '11');

    // Assert
    expect(onMonthChangeMock).toHaveBeenCalledWith(new Date(2018, 11));
  });

  test('does not call onMonthChange method when month is changed to same month', () => {
    // Arrange
    const onMonthChangeMock = jest.fn();

    render(
      MockXUIDatePicker({
        displayedMonth: new Date(2018, 10),
        onMonthChange: onMonthChangeMock,
      }),
    );

    // Act
    userEvent.selectOptions(screen.getByTestId('datepicker--monthselector'), '10');

    // Assert
    expect(onMonthChangeMock).not.toBeCalled();
  });

  test('calls onMonthChange method with the correct value when year is changed', () => {
    // Arrange
    const onMonthChangeMock = jest.fn();

    render(
      MockXUIDatePicker({
        displayedMonth: new Date(2018, 10),
        onMonthChange: onMonthChangeMock,
      }),
    );

    // Act
    userEvent.selectOptions(screen.getByTestId('datepicker--yearselector'), '2019');

    // Assert
    expect(onMonthChangeMock).toHaveBeenCalledWith(new Date(2019, 10));
  });

  test('does not call onMonthChange method when year is changed to same year', () => {
    // Arrange
    const onMonthChangeMock = jest.fn();

    render(
      MockXUIDatePicker({
        displayedMonth: new Date(2018, 10),
        onMonthChange: onMonthChangeMock,
      }),
    );

    // Act
    userEvent.selectOptions(screen.getByTestId('datepicker--yearselector'), '2018');

    // Assert
    expect(onMonthChangeMock).not.toBeCalled();
  });

  test('localises month name correctly given a locale', () => {
    // Arrange
    render(MockXUIDatePicker({ displayedMonth: new Date(2018, 0), locale: 'de' }));

    // Assert
    expect(screen.getByTestId('datepicker--monthselectorlabel')).toHaveTextContent('Januar');
  });

  test('localises day names correctly given a locale', () => {
    // Arrange
    render(MockXUIDatePicker({ displayedMonth: new Date(2018, 0), locale: 'de' }));

    // Assert
    expect(screen.getByTitle('Montag')).toHaveClass('xui-datepicker--weekday');
  });

  test('uses first day of week based on locale', () => {
    // Arrange
    render(MockXUIDatePicker({ displayedMonth: new Date(2018, 0), locale: 'de' }));

    // Assert
    expect(screen.queryAllByRole('columnheader')[0]).toHaveTextContent('M');
  });

  test('uses first day of week from props if one is passed in', () => {
    // Arrange
    render(MockXUIDatePicker({ displayedMonth: new Date(2018, 0), firstDayOfWeek: 1 }));

    // Assert
    expect(screen.queryAllByRole('columnheader')[0]).toHaveTextContent('M');
  });

  test('uses direction based on locale', () => {
    // Arrange
    render(MockXUIDatePicker({ displayedMonth: new Date(2018, 0), locale: 'ar' }));

    // Assert
    expect(screen.getByTestId('datepicker--heading-dates').childNodes[0]).toHaveClass(
      'xui-datepicker--heading-year',
    );
  });

  test('should pass accessibility testing', async () => {
    // Arrange
    render(MockXUIDatePicker());

    const results = await axe(screen.getByTestId('datepicker'));

    // Assert
    expect(results).toHaveNoViolations();
  });
});
