## Footer

### Adding Rows

#### Footer Action

For a table-affecting action like adding a row, use `XUIEditableTableFootAction` nested within `XUIEditableTableFoot`.

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellTextInput,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableFoot,
  XUIEditableTableFootAction,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';

const addNewRow = () => console.log('Add row');

<XUIEditableTable ariaLabel="Invoice">
  <XUIEditableTableHead>
    <XUIEditableTableRow>
      <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Colour</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
    </XUIEditableTableRow>
  </XUIEditableTableHead>
  <XUIEditableTableBody>
    <XUIEditableTableRow>
      <XUIEditableTableCellTextInput defaultValue="Banana" />
      <XUIEditableTableCellTextInput defaultValue="Yellow" />
      <XUIEditableTableCellTextInput defaultValue="2.99" />
    </XUIEditableTableRow>
  </XUIEditableTableBody>
  <XUIEditableTableFoot>
    <XUIEditableTableFootAction addButtonContent="Add new row" onAdd={addNewRow} />
  </XUIEditableTableFoot>
</XUIEditableTable>;
```

#### Pinned Row

You can additionally have a pinned row (e.g. a creator row) within a footer element, using a `XUIEditableTableRow` within `XUIEditableTableFoot`.
This can be used to create a row with only keyboard interaction, creating a row after the user starts typing into one of the cells in the last (initially empty) row.

**Note:** Pinned rows used in combination with footer actions should always be placed above the actions, within the same `XUIEditableTableFoot`.

```jsx harmony
import { useState } from 'react';
import { nanoid } from 'nanoid';
import {
  XUIEditableTable,
  XUIEditableTableRow,
  XUIEditableTableCellTextInput,
  XUIEditableTableFoot,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableBody
} from '@xero/xui/react/editabletable';
import { isKeyArrow, isKeyFunctional } from '@xero/xui/react/helpers/reactKeyHandler';

const data = [
  { id: nanoid(10), fruit: 'Banana', color: 'Yellow', price: '2.99' },
  { id: nanoid(10), fruit: 'Orange', color: 'Orange', price: '3.99' }
];

const EditableCreatorRowDemo = () => {
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
            [updateKey]: event.target.value
          };
        }

        return item;
      })
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
          [source]: event.target.value
        }
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
  const newEmptyRow = () => {
    return (
      <XUIEditableTableRow>
        <XUIEditableTableCellTextInput
          onKeyUp={event => newRowHandler(event, 'fruit')}
          placeholder={'Add item'}
        />
        <XUIEditableTableCellTextInput onKeyUp={event => newRowHandler(event, 'color')} />
        <XUIEditableTableCellTextInput onKeyUp={event => newRowHandler(event, 'price')} />
      </XUIEditableTableRow>
    );
  };

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
          <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell>Color</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
        </XUIEditableTableRow>
      </XUIEditableTableHead>
      <XUIEditableTableBody>
        <>
          {demoData.map((row, index) => (
            <XUIEditableTableRow index={index} key={row.id}>
              <XUIEditableTableCellTextInput
                focusOnMount={row.id === focusId && 'fruit' === focusCell}
                value={row.fruit}
                onChange={event => inputOnChangeHandler(event, row.id, 'fruit')}
              />
              <XUIEditableTableCellTextInput
                focusOnMount={row.id === focusId && 'color' === focusCell}
                value={row.color}
                onChange={event => inputOnChangeHandler(event, row.id, 'color')}
              />
              <XUIEditableTableCellTextInput
                focusOnMount={row.id === focusId && 'price' === focusCell}
                value={row.price}
                onChange={event => inputOnChangeHandler(event, row.id, 'price')}
              />
            </XUIEditableTableRow>
          ))}
        </>
      </XUIEditableTableBody>
      <XUIEditableTableFoot>{newEmptyRow()}</XUIEditableTableFoot>
    </XUIEditableTable>
  );
};

<EditableCreatorRowDemo />;
```
