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
