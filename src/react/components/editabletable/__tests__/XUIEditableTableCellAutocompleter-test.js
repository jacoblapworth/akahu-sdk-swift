import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { nanoid } from 'nanoid';
import { axe, toHaveNoViolations } from 'jest-axe';

import XUIAutocompleter from '../../autocompleter/XUIAutocompleter';
import XUIEditableTableCell from '../XUIEditableTableCell';
import XUIEditableTableCellControl from '../XUIEditableTableCellControl';
import XUIEditableTableCellAutocompleter from '../XUIEditableTableCellAutocompleter';
import wait from '../../../helpers/wait';

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testGeneratedId');

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIEditableTableCellAutocompleter />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<XUIEditableTableCellAutocompleter onSearch={() => {}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // prettier-ignore
  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr><XUIEditableTableCellAutocompleter inputLabel="Autocompleter cell" onSearch={() => {}} /></tr>
        </tbody>
      </table>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  describe('focusing', () => {
    it('lets XUIEditableTableCellControl know when the input is focused', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellAutocompleter onSearch={() => {}} />
            </tr>
          </tbody>
        </table>,
      );

      // Act
      wrapper.find('input').simulate('focus');

      // Assert
      expect(wrapper.find(XUIEditableTableCellControl).prop('isFocused')).toBeTruthy();
    });

    it('lets XUIEditableTableCellControl know when the input is blurred', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellAutocompleter onSearch={() => {}} />
            </tr>
          </tbody>
        </table>,
      );

      // Act
      wrapper.find('input').simulate('focus');
      wrapper.find('input').simulate('blur');

      // Assert
      expect(wrapper.find(XUIEditableTableCellControl).prop('isFocused')).toBeFalsy();
    });

    it('lets XUIEditableTableCellControl know when the input is disabled', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellAutocompleter onSearch={() => {}} isDisabled />
            </tr>
          </tbody>
        </table>,
      );

      // Assert
      expect(wrapper.find(XUIEditableTableCellControl).prop('isDisabled')).toBeTruthy();
    });

    it('lets XUIEditableTableCellControl know when the input is invalid', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellAutocompleter onSearch={() => {}} isInvalid />
            </tr>
          </tbody>
        </table>,
      );

      // Assert
      expect(wrapper.find(XUIEditableTableCellControl).prop('isInvalid')).toBeTruthy();
    });

    it('lets XUIEditableTableCellControl know when the input has a validation message', () => {
      // Arrange
      const expectedMessage = 'Test validation message';
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellAutocompleter
                onSearch={() => {}}
                validationMessage={expectedMessage}
              />
            </tr>
          </tbody>
        </table>,
      );

      // Assert
      expect(wrapper.find(XUIEditableTableCellControl).prop('validationMessage')).toBe(
        expectedMessage,
      );
    });
  });

  it('spreads cellProps onto the table cell', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellAutocompleter cellProps={{ width: '100px' }} onSearch={() => {}} />
          </tr>
        </tbody>
      </table>,
    );
    expect(wrapper.find(XUIEditableTableCell).getDOMNode().getAttribute('width')).toBe('100px');
  });

  it('spreads the rest of the props onto XUIEditableTableCellAutocompleter', () => {
    const spreadProps = {
      id: 'testId',
      onSearch: () => {},
      isDisabled: true,
    };

    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellAutocompleter {...spreadProps} />
          </tr>
        </tbody>
      </table>,
    );
    expect(wrapper.find(XUIAutocompleter).props()).toMatchObject(spreadProps);
  });

  it('fires the onOpen and onClose handlers when the top-level methods are fired', () => {
    const onOpenMock = jest.fn();
    const onCloseMock = jest.fn();
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellAutocompleter
              onClose={onCloseMock}
              onOpen={onOpenMock}
              onSearch={() => {}}
            />
          </tr>
        </tbody>
      </table>,
    );

    const cellAuto = wrapper.find(XUIEditableTableCellAutocompleter);
    cellAuto.instance().openDropdown();
    expect(onOpenMock).toHaveBeenCalledTimes(1);

    cellAuto.instance().closeDropdown();
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('autocompleter does not close its dropdown when clicking inside the table cell', () => {
    // Arrange
    const onOpenMock = jest.fn();
    const onCloseMock = jest.fn();
    render(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellAutocompleter
              cellProps={{ qaHook: 'test-autocompleter-cell' }}
              onClose={onCloseMock}
              onOpen={onOpenMock}
              onSearch={() => {}}
              openOnFocus
              qaHook="test-autocompleter-input"
            />
          </tr>
        </tbody>
      </table>,
    );

    // Act
    userEvent.click(screen.getByTestId('test-autocompleter-input'));
    userEvent.click(screen.getByTestId('test-autocompleter-cell'));

    // Assert
    expect(onOpenMock).toHaveBeenCalled();
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  test('autocompleter is focused onMouseDown inside the table cell', async () => {
    // Arrange
    const onFocusMock = jest.fn();
    render(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellAutocompleter
              cellProps={{ qaHook: 'test-autocompleter-cell' }}
              inputProps={{ onFocus: onFocusMock }}
              onSearch={() => {}}
              openOnFocus
            />
          </tr>
        </tbody>
      </table>,
    );

    // Act
    fireEvent.mouseDown(screen.getByTestId('test-autocompleter-cell'));

    await wait();

    // Assert
    expect(onFocusMock).toHaveBeenCalled();
  });

  test('autocompleter is focused onMouseDown inside the table cell even when another autocompleter dropdown is already open', async () => {
    // Arrange
    const onFocusMock = jest.fn();
    render(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellAutocompleter
              cellProps={{ qaHook: 'test-autocompleter-cell-1' }}
              inputProps={{ onFocus: onFocusMock }}
              onSearch={() => {}}
              openOnFocus
              qaHook="test-autocompleter-input-1"
            />
            <XUIEditableTableCellAutocompleter
              cellProps={{ qaHook: 'test-autocompleter-cell-2' }}
              inputProps={{ onFocus: onFocusMock }}
              onSearch={() => {}}
              openOnFocus
              qaHook="test-autocompleter-input-2"
            />
          </tr>
        </tbody>
      </table>,
    );

    // Act
    userEvent.click(screen.getByTestId('test-autocompleter-cell-1'));
    fireEvent.mouseDown(screen.getByTestId('test-autocompleter-cell-2'));

    await wait();

    // Assert
    expect(screen.getByTestId('test-autocompleter-input-2--input')).toBe(document.activeElement);
  });

  test('autocompleter does not loose focus when clicking inside the table cell', () => {
    // Arrange
    const onBlurMock = jest.fn();
    render(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellAutocompleter
              cellProps={{ qaHook: 'test-autocompleter-cell' }}
              inputProps={{ onBlur: onBlurMock }}
              onSearch={() => {}}
              openOnFocus
              qaHook="test-autocompleter-input"
            />
          </tr>
        </tbody>
      </table>,
    );

    // Act
    userEvent.click(screen.getByTestId('test-autocompleter-input'));
    userEvent.click(screen.getByTestId('test-autocompleter-cell'));

    // Assert
    expect(onBlurMock).not.toHaveBeenCalled();
  });

  test('autocompleter closes its dropdown when the user is interacting with the validation message', () => {
    // Arrange
    const onOpenMock = jest.fn();
    const onCloseMock = jest.fn();
    render(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellAutocompleter
              isInvalid
              onClose={onCloseMock}
              onOpen={onOpenMock}
              onSearch={() => {}}
              openOnFocus
              qaHook="test-autocompleter-input"
              validationMessage="Test validation message"
            />
          </tr>
        </tbody>
      </table>,
    );

    // Act
    userEvent.click(screen.getByTestId('test-autocompleter-input'));
    userEvent.click(screen.getByText('Test validation message'));

    // Assert
    expect(onOpenMock).toHaveBeenCalled();
    expect(onCloseMock).toHaveBeenCalled();
  });
});
