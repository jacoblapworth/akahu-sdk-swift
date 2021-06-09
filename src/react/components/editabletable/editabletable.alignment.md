## Alignment

All cells of the editable table align left by default. We recommend aligning numbers, including currency to the right. The `inlineAlignment` prop can be used on `XUIEditableTableHeadingCell`, `XUIEditableTableCellReadOnly` and `XUIEditableTableCellTextInput` to change the text alignment.

**Note:** Cells in a column must be aligned consistently with each other, including the heading cell.

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellReadOnly,
  XUIEditableTableCellTextInput,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';

const data = [
  { fruit: 'Banana', colour: 'Yellow', price: 2.99 },
  { fruit: 'Orange', colour: 'Orange', price: 3.99 }
];

<XUIEditableTable
  ariaLabel="List of fruits with colour and price per kg"
  rowOptions={{
    isDraggable: false,
    removeButtonAriaLabel: 'Remove row',
    dragButtonAriaLabel: 'Reorder row'
  }}
>
  <XUIEditableTableHead>
    <XUIEditableTableRow>
      <XUIEditableTableHeadingCell inlineAlignment="end">Fruit</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell inlineAlignment="end">Colour</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell inlineAlignment="end">Price / kg</XUIEditableTableHeadingCell>
    </XUIEditableTableRow>
  </XUIEditableTableHead>
  <XUIEditableTableBody>
    {data.map((row, index) => (
      <XUIEditableTableRow key={index}>
        <XUIEditableTableCellReadOnly inlineAlignment="end">
          {row.fruit}
        </XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly inlineAlignment="end">
          {row.colour}
        </XUIEditableTableCellReadOnly>
        <XUIEditableTableCellTextInput isValueReverseAligned>
          {row.price}
        </XUIEditableTableCellTextInput>
      </XUIEditableTableRow>
    ))}
  </XUIEditableTableBody>
</XUIEditableTable>;
```
