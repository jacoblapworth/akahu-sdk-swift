<div class="xui-margin-vertical">
  <a href="../section-components-displayingdata-editabletable.html" isDocLink>Editable table in the XUI Documentation</a>
</div>

Editable tables are used to display sets of static or interactive data in a way that’s easy for the user to scan, organise, and manipulate.

Unlike `XUITable`, there is no `data` prop requirement for `XUIEditableTable`. Editable tables are structured much like their HTML equivalents using the following basic components:

| HTML element | XUI editable table component  |
| ------------ | ----------------------------- |
| `table`      | `XUIEditableTable`            |
| `thead`      | `XUIEditableTableHead`        |
| `tfoot`      | `XUIEditableTableFoot`        |
| `tbody`      | `XUIEditableTableBody`        |
| `th`         | `XUIEditableTableHeadingCell` |
| `tr`         | `XUIEditableTableRow`         |
| `td`         | `XUIEditableTableCell`        |

## Basic

The bare minimum table component requires `XUIEditableTable`, `XUIEditableTableBody`, and at least one `XUIEditableTableRow` with at least one `XUIEditableTableCell` type.

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

<XUIEditableTable ariaLabel="List of fruits with colour and price per kg">
  <XUIEditableTableHead>
    <XUIEditableTableRow>
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
      </XUIEditableTableRow>
    ))}
  </XUIEditableTableBody>
</XUIEditableTable>;
```
