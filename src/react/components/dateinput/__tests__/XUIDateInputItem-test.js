import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { v4 as uuidv4 } from 'uuid';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIDateInputItem from '../private/XUIDateInputItem';

jest.mock('uuid');
uuidv4.mockImplementation(() => 'testDateinputId');
Enzyme.configure({ adapter: new Adapter() });

describe('XUIDateInput', () => {
  describe('Single DateInput', () => {
    const selectedDate = new Date(2020, 11, 15);
    const createComponent = props => (
      <XUIDateInputItem onSelectDate={() => {}} {...props} selectedDateValue={selectedDate} />
    );

    it.skip('inserts selected date value', () => {
      const newSelectedDate = new Date(2020, 11, 18);
      const inputEl = renderer.create(createComponent({ selectedDateValue: newSelectedDate }));
      expect(inputEl).toMatchSnapshot();
    });

    it.skip('renders with the provided hint label', () => {
      const inputEl = renderer.create(createComponent({ inputLabel: 'hint message' }));
      expect(inputEl).toMatchSnapshot();
    });

    it.skip('renders with validation message', () => {
      const inputEl = renderer.create(createComponent({ inputLabel: 'hint message' }));
      expect(inputEl).toMatchSnapshot();
    });

    it.skip('renders disabled', () => {
      const inputEl = renderer.create(createComponent({ isDisabled: true }));
      expect(inputEl).toMatchSnapshot();
    });

    it.skip('fires onInputChange callback when text input changed', () => {
      const onInputChange = jest.fn();
      const wrapper = mount(createComponent({ onInputChange }));

      wrapper.find('input').simulate('change', {
        target: {
          value: 'a',
        },
      });

      expect(onInputChange).toHaveBeenCalled();
    });

    it.skip('Dropdown opening triggers input focus', () => {
      const wrapper = mount(createComponent({ triggerClassName: 'date-input-trigger' }));
      const onInputFocusSpy = jest.spyOn(wrapper.instance(), 'onInputFocus');
      const dropdownOpened = jest.spyOn(wrapper.instance().ddtRef.current, 'openDropdown');

      const inputEL = wrapper.find('.date-input-trigger');

      expect(onInputFocusSpy).toHaveBeenCalled();
      expect(dropdownOpened).toHaveBeenCalled();
    });
  });

  describe('Date range Dateinput', () => {
    it('', () => {});
  });
});
