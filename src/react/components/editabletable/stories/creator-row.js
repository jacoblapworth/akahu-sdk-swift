import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { isKeyArrow, isKeyFunctional } from '../../helpers/reactKeyHandler';
import XUIEditableTable from '../XUIEditableTable';
import XUIEditableTableRow from '../XUIEditableTableRow';
import XUIEditableTableHead from '../XUIEditableTableHead';
import XUIEditableTableHeadingCell from '../XUIEditableTableHeadingCell';
import XUIEditableTableBody from '../XUIEditableTableBody';
import XUIEditableTableFoot from '../XUIEditableTableFoot';
import XUIEditableTableCellTextInput from '../XUIEditableTableCellTextInput';

const data = [
  { id: nanoid(10), fruit: 'Banana', color: 'Yellow', price: '2.99' },
  { id: nanoid(10), fruit: 'Orange', color: 'Orange', price: '3.99' },
];

const EditableTableCreatorRowExample = () => {
  const [demoData, setDemoData] = useState(data);
  const [focusId, setFocusId] = useState(null);
  const [focusCell, setFocusCell] = useState(null);

  /**
   * Manages your dataset updates when users interact with the table.
   */
  const inputOnChangeHandler = (event, id, updateKey) => {
    setDemoData([
      ...demoData.map(item => {
        if (item.id === id) {
          return {
            ...item,
            [updateKey]: event.target.value,
          };
        }

        return item;
      }),
    ]);
  };

  /**
   * Function triggered for onKeyUp event in the empty row. It should handle adding data typed by a user to your data set that is used to render table rows.
   * Remember to clear an input because the focus will be transitioned to the newly generated row for the data set.
   */
  const newRowHandler = (event, source) => {
    if (!isKeyFunctional(event) && !isKeyArrow(event)) {
      const id = nanoid(10);

      setDemoData([
        ...demoData,
        {
          id,
          [source]: event.target.value,
        },
      ]);

      setFocusId(id);
      setFocusCell(source);

      event.target.value = '';
    }
  };

  /**
   * This is a blueprint row that will always be empty. Once user starts typing, newRowHandler() will be triggered
   * that will add the new data to your dataset and will cause component rendering with a new row and focus.
   */
  const newEmptyRow = () => (
    <XUIEditableTableRow>
      <XUIEditableTableCellTextInput
        labelId="heading-1"
        onKeyUp={event => newRowHandler(event, 'fruit')}
        placeholder="Add item"
      />
      <XUIEditableTableCellTextInput
        labelId="heading-2"
        onKeyUp={event => newRowHandler(event, 'color')}
      />
      <XUIEditableTableCellTextInput
        labelId="heading-3"
        onKeyUp={event => newRowHandler(event, 'price')}
      />
    </XUIEditableTableRow>
  );

  return (
    <XUIEditableTable
      ariaLabel="List of fruits with color and price per kg"
      dndDragCancelledMessage={startPosition =>
        `Movement cancelled. The item has returned to its starting position of ${startPosition}.`
      }
      dndDragOutsideMessage={() => 'You are currently not dragging over a droppable area.'}
      dndDragStartMessage={startPosition => `You have lifted an item in position ${startPosition}.`}
      dndDragUpdateMessage={(startPosition, endPosition) =>
        `You have moved the item from position ${startPosition} to position ${endPosition}.`
      }
      dndDropFailedMessage={startPosition =>
        `The item has been dropped while not over a droppable area. The item has returned to its starting position of ${startPosition}.`
      }
      dndDropMessage={(startPosition, endPosition) =>
        `You have dropped the item. It has moved from position ${startPosition} to ${endPosition}.`
      }
      dndInstructions="Press Space bar or Enter to start a drag. When dragging you can use the arrow keys to move the item around and escape to cancel. Ensure your screen reader is in focus mode or to use your pass through key."
      onReorderRow={(startIndex, destinationIndex) => {
        const newRows = [...demoData];
        const rowToReorder = newRows.splice(startIndex, 1)[0];
        newRows.splice(destinationIndex, 0, rowToReorder);
        setDemoData(newRows);
      }}
      rowOptions={{ dragButtonAriaLabel: 'Drag row', isDraggable: true }}
    >
      <XUIEditableTableHead>
        <XUIEditableTableRow>
          <XUIEditableTableHeadingCell id="heading-1">Fruit</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell id="heading-2">Color</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell id="heading-3">Price / kg</XUIEditableTableHeadingCell>
        </XUIEditableTableRow>
      </XUIEditableTableHead>
      <XUIEditableTableBody>
        <>
          {demoData.map((row, index) => (
            <XUIEditableTableRow index={index} key={row.id}>
              <XUIEditableTableCellTextInput
                focusOnMount={row.id === focusId && focusCell === 'fruit'}
                key={`${row.id}-1`}
                labelId="heading-1"
                onChange={event => inputOnChangeHandler(event, row.id, 'fruit')}
                value={row.fruit}
              />
              <XUIEditableTableCellTextInput
                focusOnMount={row.id === focusId && focusCell === 'color'}
                key={`${row.id}-2`}
                labelId="heading-2"
                onChange={event => inputOnChangeHandler(event, row.id, 'color')}
                value={row.color}
              />
              <XUIEditableTableCellTextInput
                focusOnMount={row.id === focusId && focusCell === 'price'}
                key={`${row.id}-3`}
                labelId="heading-3"
                onChange={event => inputOnChangeHandler(event, row.id, 'price')}
                value={row.price}
              />
            </XUIEditableTableRow>
          ))}
        </>
      </XUIEditableTableBody>
      <XUIEditableTableFoot>{newEmptyRow()}</XUIEditableTableFoot>
    </XUIEditableTable>
  );
};

export default EditableTableCreatorRowExample;
