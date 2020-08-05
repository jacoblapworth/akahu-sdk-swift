## Responsive overflow

Try to ensure that the table container width fits inside the browser viewport to avoid visually clipping data unintentionally. If there is not enough space to see all table data in a row within a container, `XUIEditableTable` will add overflow styles for you.

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
    columnWidths={['200px', '200px', '200px', '200px', '200px', '200px']}
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
