import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIDatePicker from '../XUIDatePicker';
import { DateUtils } from 'react-day-picker';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

const MockXUIDatePicker = props => <XUIDatePicker onSelectDate={() => {}} {...props} />;
const setup = (props = {}) => {
  return mount(MockXUIDatePicker(props));
};
describe('<XUIDatePicker />', () => {
  it('displays calendar with currentMonth state to displayedMonth prop value', () => {
    // Arrange
    const wrapper = setup({ displayedMonth: new Date(2018, 10) });

    // Act
    const currentMonth = wrapper.state().currentMonth;
    const result = DateUtils.isSameMonth(currentMonth, new Date(2018, 10));

    // Assert
    expect(result).toBe(true);
  });

  it('calls onMonthChange method when month is changed', () => {
    // Arrange
    const onMonthChangeMock = jest.fn();

    const wrapper = setup({
      displayedMonth: new Date(2017, 10),
      onMonthChange: onMonthChangeMock,
    });

    // Act
    wrapper.instance().onMonthChange(new Date(2020, 11));

    // Assert
    expect(onMonthChangeMock).toBeCalled();
  });

  it('does not call onMonthChange method when month is changed to same month', () => {
    // Arrange
    const onMonthChangeMock = jest.fn();
    const wrapper = setup({
      displayedMonth: new Date(2018, 10),
      onMonthChange: onMonthChangeMock,
    });

    // Act
    wrapper.instance().onMonthChange(new Date(2018, 10));

    // Assert
    expect(onMonthChangeMock).not.toBeCalled();
  });

  it('updates currentMonth state when displayedMonth prop changed', () => {
    // Arrange
    const wrapper = setup({
      displayedMonth: new Date(2018, 10),
    });

    // Act
    wrapper.setProps({ displayedMonth: new Date(2010, 2) });

    // wrapper.instance().onMonthChange(new Date(2010, 2));
    const monthState = wrapper.state().currentMonth;

    // Assert
    expect(monthState.getFullYear()).toBe(2010);
    expect(monthState.getMonth()).toBe(2);
  });

  it('updates currentMonth state when user programmatically changes month', () => {
    // Arrange
    const wrapper = setup({
      displayedMonth: new Date(2018, 10),
    });

    // Act
    wrapper.instance().onMonthChange(new Date(2010, 2));
    const monthState = wrapper.state().currentMonth;

    // Assert
    expect(monthState.getFullYear()).toBe(2010);
    expect(monthState.getMonth()).toBe(2);
  });

  it('should pass accessibility testing', async () => {
    const results = await axe(setup().html());
    expect(results).toHaveNoViolations();
  });
});
