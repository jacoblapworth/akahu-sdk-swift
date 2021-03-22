import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { nanoid } from 'nanoid';
import { axe, toHaveNoViolations } from 'jest-axe';

import XUIEditableTable from '../XUIEditableTable';
import XUIEditableTableRow from '../XUIEditableTableRow';
import XUIEditableTableBody from '../XUIEditableTableBody';
import XUIEditableTableHead from '../XUIEditableTableHead';
import XUIEditableTableHeadingCell from '../XUIEditableTableHeadingCell';
import Draggable from '../private/DragAndDrop/Draggable';
import NOOP from '../../helpers/noop';
import XUIEditableTableContext from '../contexts/XUIEditableTableContext';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testRowId');

jest.mock('../private/DragAndDrop/Draggable');
Draggable.mockImplementation(({ children }) => children());

describe('<XUIEditableTableRow />', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <XUIEditableTableRow>
            <td>XUIEditableTableRow</td>
          </XUIEditableTableRow>
        </tbody>
      </table>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <XUIEditableTableRow className="test-classname" />
        </tbody>
      </table>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <table>
        <tbody>
          <XUIEditableTableRow className="test-classname" />
        </tbody>
      </table>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  describe('removable row', () => {
    it('renders a remove button for rows in the body', () => {
      // Arrange
      const wrapper = mount(
        <XUIEditableTable rowOptions={{ isRemovable: true, removeButtonAriaLabel: 'Remove row' }}>
          <XUIEditableTableBody>
            <XUIEditableTableRow qaHook="test-row" />
          </XUIEditableTableBody>
        </XUIEditableTable>,
      );

      // Assert
      expect(wrapper.find('[data-automationid="test-row--button-remove"]').length).toBe(1);
    });

    it('renders a blank table cell for rows in the head', () => {
      // Arrange
      const wrapper = mount(
        <XUIEditableTable rowOptions={{ isRemovable: true, removeButtonAriaLabel: 'Remove row' }}>
          <XUIEditableTableHead>
            <XUIEditableTableRow qaHook="test-row" />
          </XUIEditableTableHead>
        </XUIEditableTable>,
      );

      // Assert
      expect(wrapper.find(XUIEditableTableHeadingCell).length).toBe(1);
    });

    it('calls the onRemove callback when the remove button is clicked', () => {
      // Arrange
      const onRemoveMock = jest.fn();
      const wrapper = mount(
        <XUIEditableTable rowOptions={{ isRemovable: true, removeButtonAriaLabel: 'Remove row' }}>
          <XUIEditableTableBody>
            <XUIEditableTableRow onRemove={onRemoveMock} qaHook="test-row" />
          </XUIEditableTableBody>
        </XUIEditableTable>,
      );

      // Act
      wrapper.find('[data-automationid="test-row--button-remove"]').simulate('click');

      // Assert
      expect(onRemoveMock).toBeCalled();
    });

    it('should disable the remove icon when `disableRowControls` prop is true', () => {
      const wrapper = mount(
        <XUIEditableTable rowOptions={{ isRemovable: true, removeButtonAriaLabel: 'Remove row' }}>
          <XUIEditableTableBody>
            <XUIEditableTableRow qaHook="test-row" disableRowControls />
          </XUIEditableTableBody>
        </XUIEditableTable>,
      );

      expect(
        wrapper
          .find('[data-automationid="test-row--button-remove"]')
          .hasClass('xui-button-is-disabled'),
      ).toBeTruthy();
    });
  });

  describe('non-removable row', () => {
    it('does not render a remove button for rows in the body', () => {
      // Arrange
      const wrapper = mount(
        <XUIEditableTable rowOptions={{ isRemovable: false }}>
          <XUIEditableTableBody>
            <XUIEditableTableRow qaHook="test-row" />
          </XUIEditableTableBody>
        </XUIEditableTable>,
      );

      // Assert
      expect(wrapper.find('[data-automationid="test-row--button-remove"]').length).toBe(0);
    });

    it('does not render a blank table cell for rows in the head', () => {
      // Arrange
      const wrapper = mount(
        <XUIEditableTable rowOptions={{ isRemovable: false }}>
          <XUIEditableTableHead>
            <XUIEditableTableRow qaHook="test-row" />
          </XUIEditableTableHead>
        </XUIEditableTable>,
      );

      // Assert
      expect(wrapper.find(XUIEditableTableHeadingCell).length).toBe(0);
    });
  });

  describe('draggable row', () => {
    it('renders a drag button for rows in the body', () => {
      // Arrange
      const wrapper = mount(
        <XUIEditableTable
          dndDragCancelledMessage={NOOP}
          dndDragOutsideMessage={NOOP}
          dndDragStartMessage={NOOP}
          dndDragUpdateMessage={NOOP}
          dndDropFailedMessage={NOOP}
          dndDropMessage={NOOP}
          dndInstructions=""
          onReorderRow={NOOP}
          rowOptions={{ isDraggable: true, dragButtonAriaLabel: 'Drag row' }}
        >
          <XUIEditableTableBody>
            <XUIEditableTableRow qaHook="test-row" />
          </XUIEditableTableBody>
        </XUIEditableTable>,
      );

      // Assert
      expect(wrapper.find('[data-automationid="test-row--button-drag"]').length).toBe(1);
    });

    it('renders a blank table cell for rows in the head', () => {
      // Arrange
      const wrapper = mount(
        <XUIEditableTable
          dndDragCancelledMessage={NOOP}
          dndDragOutsideMessage={NOOP}
          dndDragStartMessage={NOOP}
          dndDragUpdateMessage={NOOP}
          dndDropFailedMessage={NOOP}
          dndDropMessage={NOOP}
          dndInstructions=""
          onReorderRow={NOOP}
          rowOptions={{ isDraggable: true, dragButtonAriaLabel: 'Drag row' }}
        >
          <XUIEditableTableHead>
            <XUIEditableTableRow qaHook="test-row" />
          </XUIEditableTableHead>
        </XUIEditableTable>,
      );

      // Assert
      expect(wrapper.find(XUIEditableTableHeadingCell).length).toBe(1);
    });

    it('spreads provided.draggableProps onto the table row', () => {
      // Arrange
      const draggableProps = { test: 'test' };
      Draggable.mockImplementation(({ children }) => children({ draggableProps }));

      const wrapper = mount(
        <table>
          <tbody>
            <XUIEditableTableRow qaHook="test-row">
              <td>XUIEditableTableRow</td>
            </XUIEditableTableRow>
          </tbody>
        </table>,
      );

      // Assert
      expect(wrapper.find('[data-automationid="test-row"]').props().test).toStrictEqual(
        draggableProps.test,
      );
    });

    it('spreads provided.dragHandleProps onto the drag cell', () => {
      // Arrange
      const dragHandleProps = { test: 'test' };
      Draggable.mockImplementation(({ children }) => children({ dragHandleProps }));

      const wrapper = mount(
        <XUIEditableTableContext.Provider
          value={{
            dragAndDrop: { dragHandleDescribedBy: '' },
            rowOptions: { dragButtonAriaLabel: '', isDraggable: true },
          }}
        >
          <table>
            <tbody>
              <XUIEditableTableRow qaHook="test-row">
                <td>XUIEditableTableRow</td>
              </XUIEditableTableRow>
            </tbody>
          </table>
        </XUIEditableTableContext.Provider>,
      );

      // Assert
      expect(wrapper.find('[data-automationid="test-row--cell-drag"]').props().test).toStrictEqual(
        dragHandleProps.test,
      );
    });

    it('merges props.style with provided.draggableProps.style', () => {
      // Arrange
      const providedDraggablePropsStyle = { background: 'purple' };
      const propsStyle = { color: 'purple' };
      const expectedStyle = { ...providedDraggablePropsStyle, ...propsStyle };

      Draggable.mockImplementation(({ children }) =>
        children({
          draggableProps: { style: providedDraggablePropsStyle },
        }),
      );

      const wrapper = mount(
        <table>
          <tbody>
            <XUIEditableTableRow style={propsStyle} qaHook="test-row">
              <td>XUIEditableTableRow</td>
            </XUIEditableTableRow>
          </tbody>
        </table>,
      );

      // Assert
      expect(wrapper.find('[data-automationid="test-row"]').prop('style')).toStrictEqual(
        expectedStyle,
      );
    });

    it('should disable the drag icon when `disableRowControls` prop is true', () => {
      const wrapper = mount(
        <XUIEditableTable
          dndDragCancelledMessage={NOOP}
          dndDragOutsideMessage={NOOP}
          dndDragStartMessage={NOOP}
          dndDragUpdateMessage={NOOP}
          dndDropFailedMessage={NOOP}
          dndDropMessage={NOOP}
          dndInstructions=""
          onReorderRow={NOOP}
          rowOptions={{ isDraggable: true, dragButtonAriaLabel: 'Drag row' }}
        >
          <XUIEditableTableBody>
            <XUIEditableTableRow disableRowControls qaHook="test-row" />
          </XUIEditableTableBody>
        </XUIEditableTable>,
      );

      expect(
        wrapper
          .find('[data-automationid="test-row--button-drag"]')
          .hasClass('xui-button-is-disabled'),
      ).toBeTruthy();
    });

    it('disables dragging when `disableRowControls` prop is true', () => {
      const wrapper = mount(
        <XUIEditableTable
          dndDragCancelledMessage={NOOP}
          dndDragOutsideMessage={NOOP}
          dndDragStartMessage={NOOP}
          dndDragUpdateMessage={NOOP}
          dndDropFailedMessage={NOOP}
          dndDropMessage={NOOP}
          dndInstructions=""
          onReorderRow={NOOP}
          rowOptions={{ isDraggable: true, dragButtonAriaLabel: 'Drag row' }}
        >
          <XUIEditableTableBody>
            <XUIEditableTableRow disableRowControls qaHook="test-row" />
          </XUIEditableTableBody>
        </XUIEditableTable>,
      );

      expect(wrapper.find(Draggable).prop('isDragDisabled')).toBeTruthy();
    });
  });

  describe('non-draggable row', () => {
    it('does not render a drag button for rows in the body', () => {
      // Arrange
      const wrapper = mount(
        <XUIEditableTable rowOptions={{ isDraggable: false }}>
          <XUIEditableTableBody>
            <XUIEditableTableRow qaHook="test-row" />
          </XUIEditableTableBody>
        </XUIEditableTable>,
      );

      // Assert
      expect(wrapper.find('[data-automationid="test-row--button-drag"]').length).toBe(0);
    });

    it('does not render a blank table cell for rows in the head', () => {
      // Arrange
      const wrapper = mount(
        <XUIEditableTable rowOptions={{ isDraggable: false }}>
          <XUIEditableTableHead>
            <XUIEditableTableRow qaHook="test-row" />
          </XUIEditableTableHead>
        </XUIEditableTable>,
      );

      // Assert
      expect(wrapper.find(XUIEditableTableHeadingCell).length).toBe(0);
    });
  });
});
