import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { nanoid } from 'nanoid';
import * as React from 'react';

import XUICheckbox from '../XUICheckbox';
import XUICheckboxRangeSelector from '../XUICheckboxRangeSelector';

jest.mock('nanoid');
const mockedNanoId = nanoid as jest.Mock<ReturnType<typeof nanoid>>;
mockedNanoId.mockImplementation(() => 'nanoid');

describe('<XUICheckboxRangeSelector />', () => {
  test('supports custom wrapping elements', () => {
    // Arrange
    const { container } = render(
      <XUICheckboxRangeSelector useCustomWrapper>
        {(onChange, wrapperRef) => (
          <div onChange={onChange} ref={wrapperRef}>
            <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
            <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
            <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
          </div>
        )}
      </XUICheckboxRangeSelector>,
    );

    // Act
    userEvent.click(screen.getByTestId('checkbox-1--input'));
    fireEvent.keyDown(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
    userEvent.click(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
    fireEvent.keyUp(screen.getByTestId('checkbox-3--input'), { shiftKey: false });

    // Assert
    expect(container).toMatchSnapshot();
    expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
    expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeTruthy();
    expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
  });

  describe('shift + click', () => {
    test('checks the checkboxes within the selected range (top to bottom)', () => {
      // Arrange
      render(
        <XUICheckboxRangeSelector>
          <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
          <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
          <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--input'));
      fireEvent.keyDown(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      userEvent.click(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      fireEvent.keyUp(screen.getByTestId('checkbox-3--input'), { shiftKey: false });

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('checks the checkboxes within the selected range (bottom to top)', () => {
      // Arrange
      render(
        <XUICheckboxRangeSelector>
          <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
          <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
          <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-3--input'));
      fireEvent.keyDown(screen.getByTestId('checkbox-1--input'), { shiftKey: true });
      userEvent.click(screen.getByTestId('checkbox-1--input'), { shiftKey: true });
      fireEvent.keyUp(screen.getByTestId('checkbox-1--input'), { shiftKey: false });

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('checks the checkboxes within the selected range when the label is clicked', () => {
      // Arrange
      render(
        <XUICheckboxRangeSelector>
          <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
          <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
          <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--checkbox'));
      fireEvent.keyDown(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      userEvent.click(screen.getByTestId('checkbox-3--checkbox'), { shiftKey: true });
      fireEvent.keyUp(screen.getByTestId('checkbox-3--input'), { shiftKey: false });

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('does not check checkboxes outside the selected range', () => {
      // Arrange
      render(
        <XUICheckboxRangeSelector>
          <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
          <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
          <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
          <XUICheckbox qaHook="checkbox-4">Checkbox 4</XUICheckbox>
          <XUICheckbox qaHook="checkbox-5">Checkbox 5</XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-2--input'));
      fireEvent.keyDown(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      userEvent.click(screen.getByTestId('checkbox-4--input'), { shiftKey: true });
      fireEvent.keyUp(screen.getByTestId('checkbox-3--input'), { shiftKey: false });

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeFalsy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-4--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-5--input') as HTMLInputElement).checked).toBeFalsy();
    });

    test('only checks checkboxes in the same range selection group', () => {
      // Arrange
      render(
        <XUICheckboxRangeSelector>
          <XUICheckbox qaHook="checkbox-1" rangeSelectionGroup="test">
            Checkbox 1
          </XUICheckbox>
          <XUICheckbox qaHook="checkbox-2" rangeSelectionGroup="test">
            Checkbox 2
          </XUICheckbox>
          <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
          <XUICheckbox qaHook="checkbox-4" rangeSelectionGroup="test">
            Checkbox 4
          </XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--input'));
      fireEvent.keyDown(screen.getByTestId('checkbox-4--input'), { shiftKey: true });
      userEvent.click(screen.getByTestId('checkbox-4--input'), { shiftKey: true });
      fireEvent.keyUp(screen.getByTestId('checkbox-4--input'), { shiftKey: false });

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeFalsy();
      expect((screen.getByTestId('checkbox-4--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('does not check any checkboxes unless there is a range to work with', () => {
      // Arrange
      render(
        <XUICheckboxRangeSelector>
          <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
          <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
          <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      fireEvent.keyDown(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      userEvent.click(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      fireEvent.keyUp(screen.getByTestId('checkbox-3--input'), { shiftKey: false });

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeFalsy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeFalsy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('clicking outside XUICheckboxRangeSelector clears the range', () => {
      // Arrange
      render(
        <div>
          <div data-automationid="outside-element" />
          <XUICheckboxRangeSelector>
            <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
            <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
            <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
          </XUICheckboxRangeSelector>
        </div>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--input'));
      userEvent.click(screen.getByTestId('outside-element'));
      fireEvent.keyDown(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      userEvent.click(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      fireEvent.keyUp(screen.getByTestId('checkbox-3--input'), { shiftKey: false });

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeFalsy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('XUICheckboxes with excludeFromRangeSelection are not checked', () => {
      // Arrange
      render(
        <XUICheckboxRangeSelector>
          <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
          <XUICheckbox excludeFromRangeSelection qaHook="checkbox-2">
            Checkbox 2
          </XUICheckbox>
          <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--input'));
      fireEvent.keyDown(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      userEvent.click(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      fireEvent.keyUp(screen.getByTestId('checkbox-3--input'), { shiftKey: false });

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeFalsy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('XUICheckboxes with excludeFromRangeSelection do not initiate a range selection', () => {
      // Arrange
      render(
        <XUICheckboxRangeSelector>
          <XUICheckbox excludeFromRangeSelection qaHook="checkbox-1">
            Checkbox 1
          </XUICheckbox>
          <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
          <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--input'));
      fireEvent.keyDown(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      userEvent.click(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      fireEvent.keyUp(screen.getByTestId('checkbox-3--input'), { shiftKey: false });

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeFalsy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('XUICheckboxes with excludeFromRangeSelection do not trigger a range selection', () => {
      // Arrange
      render(
        <XUICheckboxRangeSelector>
          <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
          <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
          <XUICheckbox excludeFromRangeSelection qaHook="checkbox-3">
            Checkbox 3
          </XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--input'));
      fireEvent.keyDown(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      userEvent.click(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      fireEvent.keyUp(screen.getByTestId('checkbox-3--input'), { shiftKey: false });

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeFalsy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('checks checkboxes based on DOM order not render order', () => {
      // Arrange
      const { rerender } = render(
        <XUICheckboxRangeSelector>
          <XUICheckbox key={0} qaHook="checkbox-1">
            Checkbox 1
          </XUICheckbox>
          <XUICheckbox key={2} qaHook="checkbox-3">
            Checkbox 3
          </XUICheckbox>
        </XUICheckboxRangeSelector>,
      );
      rerender(
        <XUICheckboxRangeSelector>
          <XUICheckbox key={0} qaHook="checkbox-1">
            Checkbox 1
          </XUICheckbox>
          <XUICheckbox key={1} qaHook="checkbox-2">
            Checkbox 2
          </XUICheckbox>
          <XUICheckbox key={2} qaHook="checkbox-3">
            Checkbox 3
          </XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--input'));
      fireEvent.keyDown(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      userEvent.click(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      fireEvent.keyUp(screen.getByTestId('checkbox-3--input'), { shiftKey: false });

      // Assert
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('range selection still works when implementors are updating their state incorrectly', () => {
      // Arrange
      const StatefulExample = () => {
        const [checkboxes, setCheckboxes] = React.useState([false, false, false]);

        const onChange = checkboxIndex => {
          const newCheckboxes = [...checkboxes];
          newCheckboxes[checkboxIndex] = !checkboxes[checkboxIndex];
          setCheckboxes(newCheckboxes);
        };

        return (
          <XUICheckboxRangeSelector>
            <XUICheckbox isChecked={checkboxes[0]} onChange={() => onChange(0)} qaHook="checkbox-1">
              Checkbox 1
            </XUICheckbox>
            <XUICheckbox isChecked={checkboxes[1]} onChange={() => onChange(1)} qaHook="checkbox-2">
              Checkbox 2
            </XUICheckbox>
            <XUICheckbox isChecked={checkboxes[2]} onChange={() => onChange(2)} qaHook="checkbox-3">
              Checkbox 3
            </XUICheckbox>
          </XUICheckboxRangeSelector>
        );
      };
      render(<StatefulExample />);

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--input'));
      fireEvent.keyDown(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      userEvent.click(screen.getByTestId('checkbox-3--input'), { shiftKey: true });
      fireEvent.keyUp(screen.getByTestId('checkbox-3--input'), { shiftKey: false });

      // Assert
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeTruthy();
    });
  });

  describe('shift + space', () => {
    test('checks the checkboxes within the selected range (top to bottom)', () => {
      // Arrange
      render(
        <XUICheckboxRangeSelector>
          <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
          <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
          <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--input'));
      userEvent.tab(); // checkbox-2
      userEvent.tab(); // checkbox-3
      userEvent.keyboard('{Shift>} {/Shift}');

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('checks the checkboxes within the selected range (bottom to top)', () => {
      // Arrange
      render(
        <XUICheckboxRangeSelector>
          <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
          <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
          <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-3--input'));
      userEvent.tab({ shift: true }); // checkbox-2
      userEvent.tab({ shift: true }); // checkbox-1
      userEvent.keyboard('{Shift>} {/Shift}');

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('does not select checkboxes outside the selected range', () => {
      // Arrange
      render(
        <XUICheckboxRangeSelector>
          <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
          <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
          <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
          <XUICheckbox qaHook="checkbox-4">Checkbox 4</XUICheckbox>
          <XUICheckbox qaHook="checkbox-5">Checkbox 5</XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-2--input'));
      userEvent.tab(); // checkbox-3
      userEvent.tab(); // checkbox-4
      userEvent.keyboard('{Shift>} {/Shift}');

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeFalsy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-4--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-5--input') as HTMLInputElement).checked).toBeFalsy();
    });

    test('only checks checkboxes in the same range selection group', () => {
      // Arrange
      render(
        <XUICheckboxRangeSelector>
          <XUICheckbox qaHook="checkbox-1" rangeSelectionGroup="test">
            Checkbox 1
          </XUICheckbox>
          <XUICheckbox qaHook="checkbox-2" rangeSelectionGroup="test">
            Checkbox 2
          </XUICheckbox>
          <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
          <XUICheckbox qaHook="checkbox-4" rangeSelectionGroup="test">
            Checkbox 4
          </XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--input'));
      userEvent.tab(); // checkbox-2
      userEvent.tab(); // checkbox-3
      userEvent.tab(); // checkbox-4
      userEvent.keyboard('{Shift>} {/Shift}');

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeFalsy();
      expect((screen.getByTestId('checkbox-4--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('does not check any checkboxes unless there is a range to work with', () => {
      // Arrange
      render(
        <div>
          <div data-automationid="outside-element" />
          <XUICheckboxRangeSelector>
            <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
            <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
            <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
          </XUICheckboxRangeSelector>
        </div>,
      );

      // Act
      userEvent.click(screen.getByTestId('outside-element'));
      userEvent.tab(); // checkbox-1
      userEvent.tab(); // checkbox-2
      userEvent.tab(); // checkbox-3
      userEvent.keyboard('{Shift>} {/Shift}');

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeFalsy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeFalsy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('focusing outside XUICheckboxRangeSelector clears the range', () => {
      // Arrange
      render(
        <div>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <div data-automationid="outside-element" tabIndex={0} />
          <XUICheckboxRangeSelector>
            <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
            <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
            <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
          </XUICheckboxRangeSelector>
        </div>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--input'));
      userEvent.tab({ shift: true }); // outside-element
      userEvent.tab(); // checkbox-1
      userEvent.tab(); // checkbox-2
      userEvent.tab(); // checkbox-3
      userEvent.keyboard('{Shift>} {/Shift}');

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeFalsy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('XUICheckboxes with excludeFromRangeSelection are not checked', () => {
      // Arrange
      render(
        <XUICheckboxRangeSelector>
          <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
          <XUICheckbox excludeFromRangeSelection qaHook="checkbox-2">
            Checkbox 2
          </XUICheckbox>
          <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--input'));
      userEvent.tab(); // checkbox-2
      userEvent.tab(); // checkbox-3
      userEvent.keyboard('{Shift>} {/Shift}');

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeFalsy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('XUICheckboxes with excludeFromRangeSelection do not initiate a range selection', () => {
      // Arrange
      render(
        <XUICheckboxRangeSelector>
          <XUICheckbox excludeFromRangeSelection qaHook="checkbox-1">
            Checkbox 1
          </XUICheckbox>
          <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
          <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--input'));
      userEvent.tab(); // checkbox-2
      userEvent.tab(); // checkbox-3
      userEvent.keyboard('{Shift>} {/Shift}');

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeFalsy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('XUICheckboxes with excludeFromRangeSelection do not trigger a range selection', () => {
      // Arrange
      render(
        <XUICheckboxRangeSelector>
          <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
          <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
          <XUICheckbox excludeFromRangeSelection qaHook="checkbox-3">
            Checkbox 3
          </XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--input'));
      userEvent.tab(); // checkbox-2
      userEvent.tab(); // checkbox-3
      userEvent.keyboard('{Shift>} {/Shift}');

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeFalsy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('checks checkboxes based on DOM order not render order', () => {
      // Arrange
      const { rerender } = render(
        <XUICheckboxRangeSelector>
          <XUICheckbox key={0} qaHook="checkbox-1">
            Checkbox 1
          </XUICheckbox>
          <XUICheckbox key={2} qaHook="checkbox-3">
            Checkbox 3
          </XUICheckbox>
        </XUICheckboxRangeSelector>,
      );
      rerender(
        <XUICheckboxRangeSelector>
          <XUICheckbox key={0} qaHook="checkbox-1">
            Checkbox 1
          </XUICheckbox>
          <XUICheckbox key={1} qaHook="checkbox-2">
            Checkbox 2
          </XUICheckbox>
          <XUICheckbox key={2} qaHook="checkbox-3">
            Checkbox 3
          </XUICheckbox>
        </XUICheckboxRangeSelector>,
      );

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--input'));
      userEvent.tab(); // checkbox-2
      userEvent.tab(); // checkbox-3
      userEvent.keyboard('{Shift>} {/Shift}');

      // Assert
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('supports custom events', async () => {
      // Arrange
      render(
        <div>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <div data-automationid="outside-element" tabIndex={0} />
          <XUICheckboxRangeSelector>
            <XUICheckbox qaHook="checkbox-1">Checkbox 1</XUICheckbox>
            <XUICheckbox qaHook="checkbox-2">Checkbox 2</XUICheckbox>
            <XUICheckbox qaHook="checkbox-3">Checkbox 3</XUICheckbox>
          </XUICheckboxRangeSelector>
        </div>,
      );

      // Act
      userEvent.click(screen.getByTestId('outside-element'));
      userEvent.tab(); // checkbox-1

      const customEvent = new CustomEvent('xui-checkbox-onChange', {
        bubbles: true,
        detail: { isTrusted: true },
      });
      screen.getByTestId('checkbox-1--input').dispatchEvent(customEvent);

      userEvent.tab(); // checkbox-2
      userEvent.tab(); // checkbox-3
      userEvent.keyboard('{Shift>} {/Shift}');

      // Assert
      expect((screen.getByTestId('checkbox-1--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeTruthy();
      expect((screen.getByTestId('checkbox-3--input') as HTMLInputElement).checked).toBeTruthy();
    });

    test('range selection still works when implementors are updating their state incorrectly', () => {
      // Arrange
      const StatefulExample = () => {
        const [checkboxes, setCheckboxes] = React.useState([false, false, false]);

        const onChange = checkboxIndex => {
          const newCheckboxes = [...checkboxes];
          newCheckboxes[checkboxIndex] = !checkboxes[checkboxIndex];
          setCheckboxes(newCheckboxes);
        };

        return (
          <XUICheckboxRangeSelector>
            <XUICheckbox isChecked={checkboxes[0]} onChange={() => onChange(0)} qaHook="checkbox-1">
              Checkbox 1
            </XUICheckbox>
            <XUICheckbox isChecked={checkboxes[1]} onChange={() => onChange(1)} qaHook="checkbox-2">
              Checkbox 2
            </XUICheckbox>
            <XUICheckbox isChecked={checkboxes[2]} onChange={() => onChange(2)} qaHook="checkbox-3">
              Checkbox 3
            </XUICheckbox>
          </XUICheckboxRangeSelector>
        );
      };
      render(<StatefulExample />);

      // Act
      userEvent.click(screen.getByTestId('checkbox-1--input'));
      userEvent.tab(); // checkbox-2
      userEvent.tab(); // checkbox-3
      userEvent.keyboard('{Shift>} {/Shift}');

      // Assert
      expect((screen.getByTestId('checkbox-2--input') as HTMLInputElement).checked).toBeTruthy();
    });
  });
});
