import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {
  DragDropContext as RBDDragDropContext,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';

import NOOP from '../../../../helpers/noop';
import { borderSpacing } from '../../constants';
import DragDropDraggingContext from '../contexts/DragDropDraggingContext';
import DragDropProvider from '../DragDropProvider';

Enzyme.configure({ adapter: new Adapter() });

describe('DragDropProvider', () => {
  describe("wrapping react-beautiful-dnd's DragDropContextProvider", () => {
    it('does not break onDragStart', () => {
      // Arrange
      const onDragStart = jest.fn();
      const expectedProps: [DropResult, ResponderProvided] = [
        {
          draggableId: '',
          source: { droppableId: '', index: 0 },
          reason: 'DROP',
          type: '',
          mode: 'FLUID',
        },
        { announce: NOOP },
      ];
      const wrapper = mount<React.ComponentProps<typeof DragDropProvider>>(
        <DragDropProvider onDragEnd={NOOP} onDragStart={onDragStart}>
          {null}
        </DragDropProvider>,
      );

      // Act
      try {
        /**
         * Calling onDragStart will throw an error because it cannot find a draggable, but we don't
         * care for this test.
         */
        wrapper.find(RBDDragDropContext).invoke('onDragStart')(...expectedProps);
        // eslint-disable-next-line no-empty
      } catch {}

      // Assert
      expect(onDragStart).toBeCalledWith(...expectedProps);
    });

    it('does not break onDragUpdate', () => {
      // Arrange
      const mockOnDragUpdate = jest.fn();
      const expectedProps: [DropResult, ResponderProvided] = [
        {
          draggableId: '',
          source: { droppableId: '', index: 0 },
          reason: 'DROP',
          type: '',
          mode: 'FLUID',
        },
        { announce: NOOP },
      ];
      const wrapper = mount<React.ComponentProps<typeof DragDropProvider>>(
        <DragDropProvider onDragEnd={NOOP} onDragUpdate={mockOnDragUpdate}>
          {null}
        </DragDropProvider>,
      );

      // Act
      wrapper.find(RBDDragDropContext).invoke('onDragUpdate')(...expectedProps);

      // Assert
      expect(mockOnDragUpdate).toBeCalledWith(...expectedProps);
    });

    it('does not break onDragEnd', () => {
      // Arrange
      const mockOnDragEnd = jest.fn();
      const expectedProps: [DropResult, ResponderProvided] = [
        {
          draggableId: '',
          source: { droppableId: '', index: 0 },
          reason: 'DROP',
          type: '',
          mode: 'FLUID',
        },
        { announce: NOOP },
      ];
      const wrapper = mount<React.ComponentProps<typeof DragDropProvider>>(
        <DragDropProvider onDragEnd={mockOnDragEnd}>{null}</DragDropProvider>,
      );

      // Act
      wrapper.find(RBDDragDropContext).invoke('onDragEnd')(...expectedProps);

      // Assert
      expect(mockOnDragEnd).toBeCalledWith(...expectedProps);
    });
  });

  describe('exposing information about the currently dragged row', () => {
    it("exposes the dragged row's index", () => {
      // Setup
      document.body.innerHTML = '<div></div>';

      // Arrange
      let providedIndex;
      const expectedIndex = 10;
      const draggableId = 'test-draggable';
      const wrapper = mount<React.ComponentProps<typeof DragDropProvider>>(
        <DragDropProvider onDragEnd={NOOP}>
          <DragDropDraggingContext.Consumer>
            {({ draggedRowIndex }) => {
              providedIndex = draggedRowIndex;

              return <div data-rbd-draggable-id={draggableId} />;
            }}
          </DragDropDraggingContext.Consumer>
        </DragDropProvider>,
        { attachTo: document.body.querySelector('div') },
      );

      // Act
      wrapper.find(RBDDragDropContext).invoke('onDragStart')(
        { draggableId, source: { droppableId: '', index: expectedIndex }, type: '', mode: 'FLUID' },
        null,
      );

      // Assert
      expect(providedIndex).toBe(expectedIndex);
    });

    it("exposes the dragged row's height", () => {
      // Setup
      document.body.innerHTML = '<div></div>';

      // Arrange
      let providedHeight;
      const rowHeight = 40;
      const expectedHeight = rowHeight - borderSpacing * 2;
      const draggableId = 'test-draggable';
      const wrapper = mount<React.ComponentProps<typeof DragDropProvider>>(
        <DragDropProvider onDragEnd={NOOP}>
          <DragDropDraggingContext.Consumer>
            {({ draggedRowHeight }) => {
              providedHeight = draggedRowHeight;

              return <div data-rbd-draggable-id={draggableId} />;
            }}
          </DragDropDraggingContext.Consumer>
        </DragDropProvider>,
        { attachTo: document.body.querySelector('div') },
      );

      // Act
      Object.defineProperty(
        document.querySelector(`[data-rbd-draggable-id="${draggableId}"]`),
        'clientHeight',
        {
          configurable: true,
          value: rowHeight,
        },
      );

      wrapper.find(RBDDragDropContext).invoke('onDragStart')(
        { draggableId, source: { droppableId: '', index: 0 }, type: '', mode: 'FLUID' },
        null,
      );

      // Assert
      expect(providedHeight).toBe(expectedHeight);
    });
  });

  describe('screen reader announcements', () => {
    it('reads out the dragStartMessage correctly', () => {
      // Setup
      document.body.innerHTML = '<div></div>';

      // Arrange
      const draggableIndex = 1;
      const expectedStartPosition = draggableIndex + 1;
      const expectedDragStartMessage = `Test drag start message. Start position: ${expectedStartPosition}`;
      const announce = jest.fn();
      const draggableId = 'test-draggable';
      const wrapper = mount<React.ComponentProps<typeof DragDropProvider>>(
        <DragDropProvider
          dragStartMessage={startPosition =>
            `Test drag start message. Start position: ${startPosition}`
          }
          onDragEnd={NOOP}
        >
          <DragDropDraggingContext.Consumer>
            {() => <div data-rbd-draggable-id={draggableId} />}
          </DragDropDraggingContext.Consumer>
        </DragDropProvider>,
        { attachTo: document.body.querySelector('div') },
      );

      // Act
      wrapper.find(RBDDragDropContext).invoke('onDragStart')(
        {
          draggableId,
          source: { droppableId: '', index: draggableIndex },
          type: '',
          mode: 'FLUID',
        },
        { announce },
      );

      // Assert
      expect(announce).toBeCalledWith(expectedDragStartMessage);
    });

    it('reads out the dragUpdateMessage correctly', () => {
      // Arrange
      const draggableIndex = 1;
      const destinationIndex = 10;
      const expectedStartPosition = draggableIndex + 1;
      const expectedEndPosition = destinationIndex + 1;
      const expectedDragUpdateMessage = `Test drag update message. From position ${expectedStartPosition} to ${expectedEndPosition}`;
      const announce = jest.fn();
      const wrapper = mount<React.ComponentProps<typeof DragDropProvider>>(
        <DragDropProvider
          dragUpdateMessage={(startPosition, endPosition) =>
            `Test drag update message. From position ${startPosition} to ${endPosition}`
          }
          onDragEnd={NOOP}
        >
          {null}
        </DragDropProvider>,
      );

      // Act
      wrapper.find(RBDDragDropContext).invoke('onDragUpdate')(
        {
          draggableId: '',
          source: { droppableId: '', index: draggableIndex },
          destination: { droppableId: '', index: destinationIndex },
          type: '',
          mode: 'FLUID',
        },
        { announce },
      );

      // Assert
      expect(announce).toBeCalledWith(expectedDragUpdateMessage);
    });

    it('reads out the dragOutsideMessage correctly', () => {
      // Arrange
      const draggableIndex = 1;
      const expectedStartPosition = draggableIndex + 1;
      const expectedDragOutsideMessage = `Test drag outside message. Start position: ${expectedStartPosition}`;
      const announce = jest.fn();
      const wrapper = mount<React.ComponentProps<typeof DragDropProvider>>(
        <DragDropProvider
          dragOutsideMessage={startPosition =>
            `Test drag outside message. Start position: ${startPosition}`
          }
          onDragEnd={NOOP}
        >
          {null}
        </DragDropProvider>,
      );

      // Act
      wrapper.find(RBDDragDropContext).invoke('onDragUpdate')(
        {
          draggableId: '',
          source: { droppableId: '', index: draggableIndex },
          type: '',
          mode: 'FLUID',
        },
        { announce },
      );

      // Assert
      expect(announce).toBeCalledWith(expectedDragOutsideMessage);
    });

    it('reads out the dropMessage correctly', () => {
      // Arrange
      const draggableIndex = 1;
      const destinationIndex = 10;
      const expectedStartPosition = draggableIndex + 1;
      const expectedEndPosition = destinationIndex + 1;
      const expectedDropMessage = `Test drop message. From position ${expectedStartPosition} to ${expectedEndPosition}`;
      const announce = jest.fn();
      const wrapper = mount<React.ComponentProps<typeof DragDropProvider>>(
        <DragDropProvider
          dropMessage={(startPosition, endPosition) =>
            `Test drop message. From position ${startPosition} to ${endPosition}`
          }
          onDragEnd={NOOP}
        >
          {null}
        </DragDropProvider>,
      );

      // Act
      wrapper.find(RBDDragDropContext).invoke('onDragEnd')(
        {
          draggableId: '',
          source: { droppableId: '', index: draggableIndex },
          destination: { droppableId: '', index: destinationIndex },
          reason: 'DROP',
          type: '',
          mode: 'FLUID',
        },
        { announce },
      );

      // Assert
      expect(announce).toBeCalledWith(expectedDropMessage);
    });

    it('reads out the dropFailedMessage correctly', () => {
      // Arrange
      const draggableIndex = 1;
      const expectedStartPosition = draggableIndex + 1;
      const expectedDropFailedMessage = `Test failed drop message. Start position: ${expectedStartPosition}`;
      const announce = jest.fn();
      const wrapper = mount<React.ComponentProps<typeof DragDropProvider>>(
        <DragDropProvider
          dropFailedMessage={startPosition =>
            `Test failed drop message. Start position: ${startPosition}`
          }
          onDragEnd={NOOP}
        >
          {null}
        </DragDropProvider>,
      );

      // Act
      wrapper.find(RBDDragDropContext).invoke('onDragEnd')(
        {
          draggableId: '',
          source: { droppableId: '', index: draggableIndex },
          reason: 'DROP',
          type: '',
          mode: 'FLUID',
        },
        { announce },
      );

      // Assert
      expect(announce).toBeCalledWith(expectedDropFailedMessage);
    });

    it('reads out the dragCancelledMessage correctly', () => {
      // Arrange
      const draggableIndex = 1;
      const expectedStartPosition = draggableIndex + 1;
      const expectedDragCancelledMessage = `Test cancelled drag message. Start position: ${expectedStartPosition}`;
      const announce = jest.fn();
      const wrapper = mount<React.ComponentProps<typeof DragDropProvider>>(
        <DragDropProvider
          dragCancelledMessage={startPosition =>
            `Test cancelled drag message. Start position: ${startPosition}`
          }
          onDragEnd={NOOP}
        >
          {null}
        </DragDropProvider>,
      );

      // Act
      wrapper.find(RBDDragDropContext).invoke('onDragEnd')(
        {
          draggableId: '',
          source: { droppableId: '', index: draggableIndex },
          reason: 'CANCEL',
          type: '',
          mode: 'FLUID',
        },
        { announce },
      );

      // Assert
      expect(announce).toBeCalledWith(expectedDragCancelledMessage);
    });
  });
});
