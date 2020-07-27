## Validation

Validating table data is notoriously tricky due to the confined spacing in a cell and the amount of data that can be presented in a table. XUI provides the properties `isInvalid` and `validationMessage` to display validation status on both a cell level and a table level.

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
  {
    fruit: {
      data: 'Banana'
    },
    colour: {
      data: 'Yellow'
    },
    price: {
      data: 2.99
    }
  },
  {
    fruit: {
      data: 'Orange'
    },
    colour: {
      data: 'Purple',
      isInvalid: true,
      validationMessage: 'Please choose an available colour'
    },
    price: {
      data: 3.99
    }
  }
];

<XUIEditableTable
  ariaLabel="List of fruits with colour and price per kg"
  isInvalid={true}
  validationMessage="1 of the table cells has invalid data entered"
>
  <XUIEditableTableHead>
    <XUIEditableTableRow>
      <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Colour</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
    </XUIEditableTableRow>
  </XUIEditableTableHead>
  <XUIEditableTableBody>
    {data.map((row, index) => {
      const { fruit, colour, price } = row;

      return (
        <XUIEditableTableRow key={index} onRemove={() => console.log('remove me')}>
          <XUIEditableTableCellReadOnly>{fruit.data}</XUIEditableTableCellReadOnly>
          <XUIEditableTableCellTextInput
            defaultValue={colour.data}
            isInvalid={colour.isInvalid}
            validationMessage={colour.validationMessage}
          ></XUIEditableTableCellTextInput>
          <XUIEditableTableCellReadOnly>{price.data}</XUIEditableTableCellReadOnly>
        </XUIEditableTableRow>
      );
    })}
  </XUIEditableTableBody>
</XUIEditableTable>;
```
