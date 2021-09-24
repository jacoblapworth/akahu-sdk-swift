## Custom CSS classes

You can pass a `className` directly to most editable table components to add CSS classes.

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

<XUIEditableTable
  ariaLabel="List of fruits with colour and price per kg"
  className="xui-margin-3xlarge"
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
      <XUIEditableTableRow key={index}>
        <XUIEditableTableCellReadOnly>{row.fruit}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.colour}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.price}</XUIEditableTableCellReadOnly>
      </XUIEditableTableRow>
    ))}
  </XUIEditableTableBody>
</XUIEditableTable>;
```

Editable table cell types wrap a basic `XUIEditableTableCell` component. You can pass a `className` directly to `XUIEditableTableCell`; but if you want to apply a class name to `XUIEditableTableCellReadOnly`, `XUIEditableTableCellTextInput`, etc., you’ll need to pass the `className` inside a `cellProps` object.

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

const node = document.createElement('style');

node.innerHTML = `
.xui-table-reactdocs-bold {
  font-weight: bold;
}
`;
document.head.appendChild(node);

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
        <XUIEditableTableCellReadOnly cellProps={{ className: 'xui-table-reactdocs-bold' }}>
          {row.fruit}
        </XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.colour}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.price}</XUIEditableTableCellReadOnly>
      </XUIEditableTableRow>
    ))}
  </XUIEditableTableBody>
</XUIEditableTable>;
```

## Custom column width

`XUIEditableTable` has the `columnWidths` property which accepts an array of desired column widths. If using pixel values, we recommend setting at least one column to "auto" and setting a minWidth on the table itself, to avoid excess shrinkage.
Alternatively, you can specify widths on the cells in the first row (this may be the header cells). This is helpful if you expect the columns to change and would prefer not to maintain the ordered array.

When calculating a table `maxWidth` to match the sum of explicit column widths, include space for 1px cell borders. Otherwise, the widths of the cell borders will cause the table to overflow horizontally, and you will see the scroll-indicator overlay shadow

When passing `minWidth` together with `columnWidths` as pixel values (without an `auto` sized column), make sure that `minWidth` doesn't exceed the sum of all the column widths. If it does, utility button columns (like delete or drag and drop) will stretch and lose proper size.

### Custom widths with responsive behaviour

To use custom column widths in the table while maintaining some responsive behaviour, use the [container query](#container-queries) or [resize observer](#resize-observers) APIs.

The resize observer API can be used to programmatically adjust the `columnWidths` object, while the container query API can be used to adjust the `columnWidths` object according to the default breakpoints and/or breakpoints you define yourself.

See the code snippet below for an example of the container query API.

Try to resize: Click and drag the bottom right corner of the following container.

```jsx harmony
import React from 'react';
import useContainerQuery from '@xero/xui/react/helpers/useContainerQuery';
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellReadOnly,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';

const wrapperStyles = {
  resize: 'horizontal',
  overflow: 'hidden'
};

const ResponsiveColumnWidthsExample = () => {
  const { isWidthAboveBreakpoint, observedElementRef } = useContainerQuery();

  let columnWidths = ['33%', '33%', '33%'];

  // start with larger breakpoints for the shortest code path
  if (isWidthAboveBreakpoint('small')) {
    columnWidths = ['40%', '20%', '20%'];
  } else if (isWidthAboveBreakpoint('xsmall')) {
    columnWidths = ['20%', '60%', '20%'];
  }

  return (
    <div style={wrapperStyles} ref={observedElementRef}>
      <XUIEditableTable ariaLabel="List of fruits" columnWidths={columnWidths} minWidth="250px">
        <XUIEditableTableBody>
          <XUIEditableTableRow>
            <XUIEditableTableCellReadOnly>Banana</XUIEditableTableCellReadOnly>
            <XUIEditableTableCellReadOnly>Orange</XUIEditableTableCellReadOnly>
            <XUIEditableTableCellReadOnly>Apple</XUIEditableTableCellReadOnly>
          </XUIEditableTableRow>
        </XUIEditableTableBody>
      </XUIEditableTable>
    </div>
  );
};

<ResponsiveColumnWidthsExample />;
```
