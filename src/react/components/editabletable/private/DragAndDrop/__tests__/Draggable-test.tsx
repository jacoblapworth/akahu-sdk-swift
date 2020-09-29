import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { DragDropContext, Draggable as RBDDraggable, Droppable } from 'react-beautiful-dnd';

import NOOP from '../../../../helpers/noop';
import { borderSpacing } from '../../constants';
import DragDropDraggingContext from '../contexts/DragDropDraggingContext';
import DroppableContext from '../contexts/DroppableContext';
import Draggable from '../Draggable';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('uuid/v4', () => jest.fn(() => '123'));

describe('Draggable', () => {
  describe('general changes the wrapper makes', () => {
    it('does not use RBDDraggable when `useDraggable` is falsey', () => {
      // Arrange
      const wrapper = mount(<Draggable useDraggable={false}>{() => null}</Draggable>);

      // Assert
      expect(wrapper.find(RBDDraggable).length).toBe(0);
    });

    it('generates a draggableId if one is not provided', () => {
      // Setup
      document.body.innerHTML = '<div></div>';

      // Arrange
      const wrapper = mount(
        <DragDropContext onDragEnd={NOOP}>
          <Droppable droppableId="test-droppable">
            {droppableProvided => (
              <div ref={droppableProvided.innerRef}>
                <Draggable index={0} useDraggable>
                  {provided => <div {...provided.dragHandleProps} ref={provided.innerRef} />}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>,
        { attachTo: document.body.querySelector('div') },
      );

      // Assert
      expect(wrapper.find(RBDDraggable).prop('draggableId')).toBe('123');
    });

    it('uses the provided draggableId if one is provided', () => {
      // Setup
      document.body.innerHTML = '<div></div>';

      // Arrange
      const draggableId = '321';
      const wrapper = mount(
        <DragDropContext onDragEnd={NOOP}>
          <Droppable droppableId="test-droppable">
            {droppableProvided => (
              <div ref={droppableProvided.innerRef}>
                <Draggable draggableId={draggableId} index={0} useDraggable>
                  {provided => <div {...provided.dragHandleProps} ref={provided.innerRef} />}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>,
        { attachTo: document.body.querySelector('div') },
      );

      // Assert
      expect(wrapper.find(RBDDraggable).prop('draggableId')).toBe(draggableId);
    });
  });

  describe('table-oriented changes the wrapper makes', () => {
    it('modifies the preview to look like the draggable will go back to its origin when it is dragged outside of the droppable', () => {
      // Setup
      document.body.innerHTML = '<div></div>';

      // Arrange
      const draggedRowHeight = 40;
      const wrapper = mount(
        <DragDropContext onDragEnd={NOOP}>
          <DragDropDraggingContext.Provider value={{ draggedRowIndex: 0, draggedRowHeight }}>
            <Droppable droppableId="test-droppable">
              {droppableProvided => (
                <DroppableContext.Provider value={{ isDraggingOver: false }}>
                  <div ref={droppableProvided.innerRef}>
                    <Draggable index={0} useDraggable>
                      {provided => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        />
                      )}
                    </Draggable>
                    <Draggable index={1} useDraggable>
                      {provided => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          data-automationid="test-draggable"
                          ref={provided.innerRef}
                        />
                      )}
                    </Draggable>
                  </div>
                </DroppableContext.Provider>
              )}
            </Droppable>
          </DragDropDraggingContext.Provider>
        </DragDropContext>,
        { attachTo: document.body.querySelector('div') },
      );

      // Act
      const { transform } = wrapper.find('[data-automationid="test-draggable"]').prop('style');

      // Assert
      expect(transform).toBe(`translate(0px, ${draggedRowHeight + borderSpacing}px)`);
    });
  });
});
