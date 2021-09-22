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
      dndInstructions="Press Space bar or Enter to start a drag. When dragging you can use the arrow keys to move the item around and escape to cancel. Ensure your screen reader is in focus mode or to use your pass through key."
      onReorderRow={(startIndex, destinationIndex) => {
        const newRows = [...rows];
        const rowToReorder = newRows.splice(startIndex, 1)[0];
        newRows.splice(destinationIndex, 0, rowToReorder);

        setRows(newRows);
      }}
      rowOptions={{ dragButtonAriaLabel: 'Drag row', isDraggable: true }}
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
import { nanoid } from 'nanoid';
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellTextInput,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';

const DisableControlsExample = () => {
  const [rows, setRows] = React.useState([{ id: nanoid(10), fruit: '', colour: '', price: '' }]);

  const onInputChange = (value, id, key) => {
    setRows(rows.map(row => (id === row.id ? { ...row, [key]: value } : row)));
  };

  return (
    <XUIEditableTable
      ariaLabel="List of fruits with colour and price per kg"
      dndDragCancelledMessage={() => 'Movement cancelled.'}
      dndDragOutsideMessage={() => 'You are currently not dragging over a droppable area.'}
      dndDragStartMessage={() => 'You have lifted an item.'}
      dndDragUpdateMessage={() => 'You have moved the item.'}
      dndDropFailedMessage={() => 'The item has been dropped while not over a droppable area.'}
      dndDropMessage={() => 'You have dropped the item.'}
      dndInstructions="Press Space bar or Enter to start a drag."
      onReorderRow={() => {}}
      rowOptions={{
        isDraggable: true,
        isRemovable: true,
        dragButtonAriaLabel: 'Drag row',
        removeButtonAriaLabel: 'Remove row'
      }}
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
                label="input"
                onChange={e => onInputChange(e.target.value, row.id, 'fruit')}
              >
                {row.fruit}
              </XUIEditableTableCellTextInput>
              <XUIEditableTableCellTextInput
                label="input"
                onChange={e => onInputChange(e.target.value, row.id, 'colour')}
              >
                {row.colour}
              </XUIEditableTableCellTextInput>
              <XUIEditableTableCellTextInput
                label="input"
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
import { nanoid } from 'nanoid';
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellIconButton,
  XUIEditableTableCellTextInput,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';
import archiveIcon from '@xero/xui-icon/icons/archive';

const DisableControlsExample = () => {
  const [rows, setRows] = React.useState([{ id: nanoid(), fruit: '', colour: '', price: '' }]);

  const onInputChange = (value, id, key) => {
    setRows(rows.map(row => (id === row.id ? { ...row, [key]: value } : row)));
  };

  return (
    <XUIEditableTable
      ariaLabel="List of fruits with colour and price per kg"
      dndDragCancelledMessage={() => 'Movement cancelled.'}
      dndDragOutsideMessage={() => 'You are currently not dragging over a droppable area.'}
      dndDragStartMessage={() => 'You have lifted an item.'}
      dndDragUpdateMessage={() => 'You have moved the item.'}
      dndDropFailedMessage={() => 'The item has been dropped while not over a droppable area.'}
      dndDropMessage={() => 'You have dropped the item.'}
      dndInstructions="Press Space bar or Enter to start a drag."
      onReorderRow={() => {}}
      rowOptions={{ isDraggable: true, dragButtonAriaLabel: 'Drag row' }}
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
                label="input"
                onChange={e => onInputChange(e.target.value, row.id, 'fruit')}
              >
                {row.fruit}
              </XUIEditableTableCellTextInput>
              <XUIEditableTableCellTextInput
                label="input"
                onChange={e => onInputChange(e.target.value, row.id, 'colour')}
              >
                {row.colour}
              </XUIEditableTableCellTextInput>
              <XUIEditableTableCellTextInput
                label="input"
                onChange={e => onInputChange(e.target.value, row.id, 'price')}
              >
                {row.price}
              </XUIEditableTableCellTextInput>
              <XUIEditableTableCellIconButton
                iconReference={archiveIcon}
                isDisabled={isControlsDisabled}
                ariaLabel="Archive"
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

The `hiddenColumns` API is optimal for very large tables, in which re-rendering all the rows and cells is not desired, and the order of columns is not expected to change. For best performance in these cases, cells should be [memoized](https://reactjs.org/docs/react-api.html#reactmemo) to reduce unnecessary renders. For more details, check [XUI Performance tips](https://xui.xero.com/latest/section-getting-started-performance.html#getting-started-performance-3-1).

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
      <XUIEditableTable
        ariaLabel="List of fruits with colour and price per kg"
        hiddenColumns={hiddenColumns}
      >
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
