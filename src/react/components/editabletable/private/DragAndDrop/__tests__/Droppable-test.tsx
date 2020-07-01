import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { DragDropContext, Droppable as RBDDroppable } from 'react-beautiful-dnd';

import NOOP from '../../../../helpers/noop';
import Droppable from '../Droppable';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('uuid/v4', () => jest.fn(() => '123'));

describe('Droppable', () => {
  it('generates a droppableId if one is not provided', () => {
    // Arrange
    const wrapper = mount(
      <DragDropContext onDragEnd={NOOP}>
        <Droppable>{provided => <div ref={provided.innerRef} />}</Droppable>
      </DragDropContext>,
    );

    // Assert
    expect(wrapper.find(RBDDroppable).prop('droppableId')).toBe('123');
  });

  it('uses the provided droppableId if one is provided', () => {
    // Arrange
    const droppableId = '321';
    const wrapper = mount(
      <DragDropContext onDragEnd={NOOP}>
        <Droppable droppableId={droppableId}>
          {provided => <div ref={provided.innerRef} />}
        </Droppable>
      </DragDropContext>,
    );

    // Assert
    expect(wrapper.find(RBDDroppable).prop('droppableId')).toBe(droppableId);
  });
});
