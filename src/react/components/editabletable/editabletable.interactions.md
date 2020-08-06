## Interactions

### Deleting rows

If you want to allow for a row to be deleted, pass `isRemovable` and a `removeButtonAriaLabel` to the parent `XUIEditableTable`’s `rowOptions` and add an `onRemove` handler to the corresponding `XUIEditableTableRow`.

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellReadOnly,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';

const data = [
  { fruit: 'Banana', colour: 'Yellow', price: 2.99 },
  { fruit: 'Orange', colour: 'Orange', price: 3.99 }
];
const onRemove = () => alert('Row deleted!');

<XUIEditableTable
  ariaLabel="List of fruits with colour and price per kg"
  rowOptions={{ isRemovable: true, removeButtonAriaLabel: 'Remove row' }}
>
  <XUIEditableTableHead>
    <XUIEditableTableRow>
      <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Colour</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
    </XUIEditableTableRow>
  </XUIEditableTableHead>
  <XUIEditableTableBody>
    {data.map((row, index) => (
      <XUIEditableTableRow key={index} onRemove={onRemove}>
        <XUIEditableTableCellReadOnly>{row.fruit}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.colour}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.price}</XUIEditableTableCellReadOnly>
      </XUIEditableTableRow>
    ))}
  </XUIEditableTableBody>
</XUIEditableTable>;
```

### Adding rows

For a table-affecting action like adding a row, use `XUIEditableTableFootAction` nested within `XUIEditableTableFoot`.

```jsx harmony
import uuid from 'uuid/v4';
import { useState } from 'react';
import {
  XUIEditableTable,
  XUIEditableTableRow,
  XUIEditableTableCellTextInput,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableBody,
  XUIEditableTableFoot,
  XUIEditableTableFootAction
} from '@xero/xui/react/editabletable';
const data = [
  { fruit: 'Banana', colour: 'Yellow', price: 2.99, uid: uuid() },
  { fruit: 'Orange', colour: 'Orange', price: 3.99, uid: uuid() }
];
const blankItem = { fruit: undefined, colour: undefined, price: undefined, isDisabled: true };
const Example = () => {
  const [tableData, setTableData] = useState(data);
  const addNewRow = () => {
    setTableData([...tableData, { ...blankItem, uid: uuid() }]);
  };
  return (
    <XUIEditableTable ariaLabel="List of fruits with colour and price per kg">
      <XUIEditableTableHead>
        <XUIEditableTableRow>
          <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell>Colour</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
        </XUIEditableTableRow>
      </XUIEditableTableHead>
      <XUIEditableTableBody>
        {tableData.map((row, index) => (
          <XUIEditableTableRow key={row.uid}>
            <XUIEditableTableCellTextInput defaultValue={row.fruit} key={`${row.uid}_fruit`} />
            <XUIEditableTableCellTextInput defaultValue={row.colour} key={`${row.uid}_colour`} />
            <XUIEditableTableCellTextInput defaultValue={row.price} key={`${row.uid}_price`} />
          </XUIEditableTableRow>
        ))}
      </XUIEditableTableBody>
      <XUIEditableTableFoot>
        <XUIEditableTableFootAction addButtonContent="Add new row" onAdd={addNewRow} />
      </XUIEditableTableFoot>
    </XUIEditableTable>
  );
};
<Example />;
```

## Adding new row on keyboard interactions

Adding new row can be also based on user's keyboard interaction and this pattern doesn't require pressing a button. A row is added after user starts typing into one of the cells in the last (initially empty) row.

```jsx harmony
import { useState } from 'react';
import uuid from 'uuid/v4';
import {
  XUIEditableTable,
  XUIEditableTableRow,
  XUIEditableTableCellTextInput,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableBody
} from '@xero/xui/react/editabletable';
import { isKeyArrow, isKeyFunctional } from '@xero/xui/react/helpers/reactKeyHandler';

const data = [
  { id: uuid(), fruit: 'Banana', color: 'Yellow', price: 2.99 },
  { id: uuid(), fruit: 'Orange', color: 'Orange', price: 3.99 }
];

const EditableNewRowOnKeyDownDemo = () => {
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
      const id = uuid();

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
    <XUIEditableTable ariaLabel="List of fruits with color and price per kg">
      <XUIEditableTableHead>
        <XUIEditableTableRow>
          <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell>Color</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
        </XUIEditableTableRow>
      </XUIEditableTableHead>
      <XUIEditableTableBody>
        {demoData.map(row => (
          <XUIEditableTableRow key={row.id}>
            <XUIEditableTableCellTextInput
              focusByDefault={row.id === focusId && 'fruit' === focusCell}
              value={row.fruit}
              onChange={event => inputOnChangeHandler(event, row.id, 'fruit')}
            />
            <XUIEditableTableCellTextInput
              focusByDefault={row.id === focusId && 'color' === focusCell}
              value={row.color}
              onChange={event => inputOnChangeHandler(event, row.id, 'color')}
            />
            <XUIEditableTableCellTextInput
              focusByDefault={row.id === focusId && 'price' === focusCell}
              value={row.price}
              onChange={event => inputOnChangeHandler(event, row.id, 'price')}
            />
          </XUIEditableTableRow>
        ))}
        {newEmptyRow()}
      </XUIEditableTableBody>
    </XUIEditableTable>
  );
};

<EditableNewRowOnKeyDownDemo />;
```

### Dragging rows

To enable reordering table rows with drag and drop, follow these steps:

1. Add `isDraggable` and `dragHandleAriaLabel` to `XUIEditableTable`'s row options.
1. Add the `onReorderRow` prop to `XUIEditableTable`.
1. Add the `index` prop to `XUIEditableTableRow`.

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellReadOnly,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';

const DragAndDropExample = () => {
  const [rows, setRows] = React.useState([
    { fruit: 'Apple', colour: 'Red', price: 2.99 },
    { fruit: 'Banana', colour: 'Yellow', price: 2.99 },
    { fruit: 'Cucumber', colour: 'Green', price: 4.99 }
  ]);

  return (
    <XUIEditableTable
      ariaLabel="List of fruits with colour and price per kg"
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
      dndInstructions="Press space bar or enter to start a drag. When dragging you can use the arrow keys to move the item around and escape to cancel. Ensure your screen reader is in focus mode or forms mode."
      onReorderRow={(startIndex, destinationIndex) => {
        const newRows = [...rows];
        const rowToReorder = newRows.splice(startIndex, 1)[0];
        newRows.splice(destinationIndex, 0, rowToReorder);

        setRows(newRows);
      }}
      rowOptions={{ dragButtonAriaLabel: 'Remove row', isDraggable: true }}
    >
      <XUIEditableTableHead>
        <XUIEditableTableRow>
          <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell>Colour</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
        </XUIEditableTableRow>
      </XUIEditableTableHead>
      <XUIEditableTableBody>
        {rows.map((row, index) => (
          <XUIEditableTableRow index={index} key={index} onRemove={() => console.log('remove me')}>
            <XUIEditableTableCellReadOnly>{row.fruit}</XUIEditableTableCellReadOnly>
            <XUIEditableTableCellReadOnly>{row.colour}</XUIEditableTableCellReadOnly>
            <XUIEditableTableCellReadOnly>{row.price}</XUIEditableTableCellReadOnly>
          </XUIEditableTableRow>
        ))}
      </XUIEditableTableBody>
    </XUIEditableTable>
  );
};

<DragAndDropExample />;
```

### Disable controls

To disable built-in controls (including drag and remove icons) in a row, use prop `disableRowControls` of `XUIEditableTableRow`.

```jsx harmony
import uuid from 'uuid/v4';
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellTextInput,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';

const DisableControlsExample = () => {
  const [rows, setRows] = React.useState([{ id: uuid(), fruit: '', colour: '', price: '' }]);

  const onInputChange = (value, id, key) => {
    setRows(rows.map(row => (id === row.id ? { ...row, [key]: value } : row)));
  };

  return (
    <XUIEditableTable
      ariaLabel="List of fruits with colour and price per kg"
      rowOptions={{ isDraggable: true, isRemovable: true }}
    >
      <XUIEditableTableHead>
        <XUIEditableTableRow>
          <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell>Colour</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
        </XUIEditableTableRow>
      </XUIEditableTableHead>
      <XUIEditableTableBody>
        {rows.map((row, index) => {
          // If all of the inputs value of the row are empty, disable the controls
          const isControlsDisabled = Object.keys(row).every(key =>
            key === 'id' ? true : row[key] === ''
          );
          return (
            <XUIEditableTableRow
              index={index}
              key={row.id}
              onRemove={() => console.log('remove me')}
              disableRowControls={isControlsDisabled}
            >
              <XUIEditableTableCellTextInput
                onChange={e => onInputChange(e.target.value, row.id, 'fruit')}
              >
                {row.fruit}
              </XUIEditableTableCellTextInput>
              <XUIEditableTableCellTextInput
                onChange={e => onInputChange(e.target.value, row.id, 'colour')}
              >
                {row.colour}
              </XUIEditableTableCellTextInput>
              <XUIEditableTableCellTextInput
                onChange={e => onInputChange(e.target.value, row.id, 'price')}
              >
                {row.price}
              </XUIEditableTableCellTextInput>
            </XUIEditableTableRow>
          );
        })}
      </XUIEditableTableBody>
    </XUIEditableTable>
  );
};

<DisableControlsExample />;
```

To disable custom controls, use prop `isDisabled` of the cell component.

```jsx harmony
import uuid from 'uuid/v4';
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellIconButton,
  XUIEditableTableCellTextInput,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';
import overflowIcon from '@xero/xui-icon/icons/overflow';

const DisableControlsExample = () => {
  const [rows, setRows] = React.useState([{ id: uuid(), fruit: '', colour: '', price: '' }]);

  const onInputChange = (value, id, key) => {
    setRows(rows.map(row => (id === row.id ? { ...row, [key]: value } : row)));
  };

  return (
    <XUIEditableTable
      ariaLabel="List of fruits with colour and price per kg"
      rowOptions={{ isDraggable: true }}
    >
      <XUIEditableTableHead>
        <XUIEditableTableRow>
          <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell>Colour</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell style={{ width: '40px' }} />
        </XUIEditableTableRow>
      </XUIEditableTableHead>
      <XUIEditableTableBody>
        {rows.map((row, index) => {
          // If all of the inputs of the row are empty, disable the controls
          const isControlsDisabled = Object.keys(row).every(key =>
            key === 'id' ? true : row[key] === ''
          );
          return (
            <XUIEditableTableRow index={index} key={row.id} disableRowControls={isControlsDisabled}>
              <XUIEditableTableCellTextInput
                onChange={e => onInputChange(e.target.value, row.id, 'fruit')}
              >
                {row.fruit}
              </XUIEditableTableCellTextInput>
              <XUIEditableTableCellTextInput
                onChange={e => onInputChange(e.target.value, row.id, 'colour')}
              >
                {row.colour}
              </XUIEditableTableCellTextInput>
              <XUIEditableTableCellTextInput
                onChange={e => onInputChange(e.target.value, row.id, 'price')}
              >
                {row.price}
              </XUIEditableTableCellTextInput>
              <XUIEditableTableCellIconButton
                iconReference={overflowIcon}
                isDisabled={isControlsDisabled}
              />
            </XUIEditableTableRow>
          );
        })}
      </XUIEditableTableBody>
    </XUIEditableTable>
  );
};

<DisableControlsExample />;
```

### Hiding and showing columns

There are several possible approaches for hiding and showing columns.

- Apply a className of `xui-editabletable--column-hidden` to the hidden cell(s) in each row.
- Selectively render `null` instead of the specified cells in each row.
- Using the XUIEditableTable `hiddenColumns` API

The `hiddenColumns` API is optimal for very large tables, in which re-rendering all the rows and cells is not desired, and the order of columns is not expected to change. For best performance in these cases, cells should be [memoized](https://reactjs.org/docs/react-api.html#reactmemo) to reduce unnecessary renders.

To use this feature, pass an array of column indexes that should be hidden (zero-based, inclusive of any controls, like drag and drop) to the `hiddenColumns` prop for `XUIEditableTable`

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellReadOnly,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';
import { XUIActions } from '@xero/xui/react/actions';

import ColumnHideSelect from './stories/column-hide-select';
const HideShowExample = () => {
  const [hiddenColumns, setHiddenColumns] = React.useState([]);

  handleColumnVisibility = selectedColumns => {
    setHiddenColumns(selectedColumns);
  };
  const data = [
    { Fruit: 'Banana', Colour: 'Yellow', 'Price / kg': 2.99 },
    { Fruit: 'Orange', Colour: 'Orange', 'Price / kg': 3.99 }
  ];
  const columns = Object.keys(data[0]);
  return (
    <>
      <XUIActions className="xui-margin-bottom">
        <ColumnHideSelect
          columns={columns}
          passedOnItemSelect={handleColumnVisibility}
          rowOptions={{}}
        />
      </XUIActions>
      <XUIEditableTable hiddenColumns={hiddenColumns}>
        <XUIEditableTableHead>
          <XUIEditableTableRow>
            {columns.map((item, index) => (
              <XUIEditableTableHeadingCell key={index}>{item}</XUIEditableTableHeadingCell>
            ))}
          </XUIEditableTableRow>
        </XUIEditableTableHead>
        <XUIEditableTableBody>
          {data.map((row, index) => (
            <XUIEditableTableRow key={index}>
              <XUIEditableTableCellReadOnly>{row.Fruit}</XUIEditableTableCellReadOnly>
              <XUIEditableTableCellReadOnly>{row.Colour}</XUIEditableTableCellReadOnly>
              <XUIEditableTableCellReadOnly>{row['Price / kg']}</XUIEditableTableCellReadOnly>
            </XUIEditableTableRow>
          ))}
        </XUIEditableTableBody>
      </XUIEditableTable>
    </>
  );
};

<HideShowExample />;
```
