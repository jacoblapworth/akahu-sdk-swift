## Pinned columns

If you need to persist the left or right columns to provide always-accessible actions for users, you can do this by supplying the `hasPinnedFirstColumn` or `hasPinnedLastColumn` props.

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

<div style={{ maxWidth: '500px', overflow: 'hidden' }}>
  <XUIEditableTable
    ariaLabel="List of fruits with colour and price per kg"
    columnWidths={['120px', '200px', '200px', '200px', '200px', '200px']}
    rowOptions={{
      isRemovable: true,
      isDraggable: false,
      removeButtonAriaLabel: 'Remove row',
      dragButtonAriaLabel: 'Reorder row'
    }}
    hasPinnedFirstColumn
    hasPinnedLastColumn
  >
    <XUIEditableTableHead>
      <XUIEditableTableRow>
        <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
        <XUIEditableTableHeadingCell>Colour</XUIEditableTableHeadingCell>
        <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
        <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
        <XUIEditableTableHeadingCell>Colour</XUIEditableTableHeadingCell>
        <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
      </XUIEditableTableRow>
    </XUIEditableTableHead>
    <XUIEditableTableBody>
      {data.map((row, index) => (
        <XUIEditableTableRow key={index}>
          <XUIEditableTableCellReadOnly>{row.fruit}</XUIEditableTableCellReadOnly>
          <XUIEditableTableCellReadOnly>{row.colour}</XUIEditableTableCellReadOnly>
          <XUIEditableTableCellReadOnly>{row.price}</XUIEditableTableCellReadOnly>
          <XUIEditableTableCellReadOnly>{row.fruit}</XUIEditableTableCellReadOnly>
          <XUIEditableTableCellReadOnly>{row.colour}</XUIEditableTableCellReadOnly>
          <XUIEditableTableCellReadOnly>{row.price}</XUIEditableTableCellReadOnly>
        </XUIEditableTableRow>
      ))}
    </XUIEditableTableBody>
  </XUIEditableTable>
</div>;
```
