import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { axe, toHaveNoViolations } from 'jest-axe';
import { fireEvent, render, screen } from '@testing-library/react';
import NOOP from '../../helpers/noop';

import XUIEditableTableHeadingCell from '../XUIEditableTableHeadingCell';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIEditableTableCell />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableHeadingCell>XUIEditableTableHeadingCell</XUIEditableTableHeadingCell>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(<XUIEditableTableHeadingCell className="test-classname" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render with customized scope', () => {
    const wrapper = shallow(<XUIEditableTableHeadingCell scope="rowGroup" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <table>
        <thead>
          <tr>
            <XUIEditableTableHeadingCell>XUIEditableTableHeadingCell</XUIEditableTableHeadingCell>
          </tr>
        </thead>
      </table>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  test('renders end-aligned cells', () => {
    // Arrange
    render(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableHeadingCell qaHook="testId" inlineAlignment="end" />
          </tr>
        </tbody>
      </table>,
    );

    // Assert
    expect(screen.getByTestId('testId')).toHaveClass('xui-editabletableheadingcell-rightaligned');
  });

  it('should pass accessibility testing when sort is active', async () => {
    // Arrange
    const wrapper = mount(
      <table>
        <thead>
          <tr>
            <XUIEditableTableHeadingCell onSortChange={NOOP} isSortActive isSortAsc>
              XUIEditableTableHeadingCell
            </XUIEditableTableHeadingCell>
          </tr>
        </thead>
      </table>,
    );

    // Assert
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  test('clicking on a heading cell calls onSortChange', () => {
    // Arrange
    const mockOnSortChange = jest.fn();
    render(
      <table>
        <thead>
          <tr>
            <XUIEditableTableHeadingCell qaHook="testId" onSortChange={mockOnSortChange}>
              XUIEditableTableHeadingCell
            </XUIEditableTableHeadingCell>
          </tr>
        </thead>
      </table>,
    );

    // Act
    fireEvent.click(screen.getByTestId('testId'));

    expect(mockOnSortChange).toBeCalled();
  });

  test('pressing enter on a heading cell calls onSortChange', () => {
    // Arrange
    const mockOnSortChange = jest.fn();
    render(
      <table>
        <thead>
          <tr>
            <XUIEditableTableHeadingCell qaHook="testId" onSortChange={mockOnSortChange}>
              XUIEditableTableHeadingCell
            </XUIEditableTableHeadingCell>
          </tr>
        </thead>
      </table>,
    );

    // Act
    fireEvent.keyDown(screen.getByTestId('testId'), { key: 'Enter', code: 13 });

    // Assert
    expect(mockOnSortChange).toBeCalled();
  });

  test('pressing space on a heading cell calls onSortChange', () => {
    // Arrange
    const mockOnSortChange = jest.fn();
    render(
      <table>
        <thead>
          <tr>
            <XUIEditableTableHeadingCell qaHook="testId" onSortChange={mockOnSortChange}>
              XUIEditableTableHeadingCell
            </XUIEditableTableHeadingCell>
          </tr>
        </thead>
      </table>,
    );

    // Act
    fireEvent.keyDown(screen.getByTestId('testId'), { key: ' ', code: 32 });

    // Assert
    expect(mockOnSortChange).toBeCalled();
  });

  test('pressing tab on a heading cell does not call onSortChange', () => {
    // Arrange
    const mockOnSortChange = jest.fn();
    render(
      <table>
        <thead>
          <tr>
            <XUIEditableTableHeadingCell qaHook="testId" onSortChange={mockOnSortChange}>
              XUIEditableTableHeadingCell
            </XUIEditableTableHeadingCell>
          </tr>
        </thead>
      </table>,
    );

    // Act
    fireEvent.keyDown(screen.getByTestId('testId'), { key: 'Tab', code: 9 });

    // Assert
    expect(mockOnSortChange).toBeCalledTimes(0);
  });

  test('heading cell has button role', () => {
    // Arrange
    const mockOnSortChange = jest.fn();
    render(
      <table>
        <thead>
          <tr>
            <XUIEditableTableHeadingCell qaHook="testId" onSortChange={mockOnSortChange}>
              XUIEditableTableHeadingCell
            </XUIEditableTableHeadingCell>
          </tr>
        </thead>
      </table>,
    );

    // Assert
    expect(screen.getByTestId('testId')).toHaveAttribute('role', 'button');
  });
});
