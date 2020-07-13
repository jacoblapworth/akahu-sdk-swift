<div class="xui-margin-vertical">
  <a href="../section-components-displayingdata-editabletable.html" isDocLink>Editable table in the XUI Documentation</a>
</div>

The Table scaffold is a convenient way to lay out data sets with an accessible and responsive design mindset.

The scaffold is broken up into a few key components that resemble HTML table structure.
`XUIEditableTable` is a component that encapsulates the whole table structure. Components corresponding to an HTML tag can be found below.

| HTML element | XUI editable table component   |
| ------------ | ------------------------------ |
| `table`      | `XUIEditableTable`             |
| `thead`      | `XUIEditableTableHead`         |
| `tfoot`      | `XUIEditableTableFoot`         |
| `tbody`      | `XUIEditableTableBody`         |
| `th`         | `XUIEditableTableHeadingCell`  |
| `tr`         | `XUIEditableTableRow`          |
| `td`         | `XUIEditableTableCellReadOnly` |

## Basic

The bare minimum table component requires a basic combination of `XUIEditableTable`, `XUIEditableTableBody` and `XUIEditableTableRow` with `XUIEditableTableCellReadOnly`.

Unlike `XUITable`, there is no `data` prop requirement for `XUIEditableTable`. In its most basic form, populate the cells with proper data, as shown in the example below.

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableRow,
  XUIEditableTableCellReadOnly,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableBody
} from '@xero/xui/react/editabletable';

const data = [
  { fruit: 'Banana', color: 'Yellow', price: 2.99 },
  { fruit: 'Orange', color: 'Orange', price: 3.99 }
];

<XUIEditableTable ariaLabel="List of fruits with color and price per kg">
  <XUIEditableTableHead>
    <XUIEditableTableRow>
      <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Color</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
    </XUIEditableTableRow>
  </XUIEditableTableHead>
  <XUIEditableTableBody>
    {data.map((row, index) => (
      <XUIEditableTableRow key={index}>
        <XUIEditableTableCellReadOnly>{row.fruit}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.color}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.price}</XUIEditableTableCellReadOnly>
      </XUIEditableTableRow>
    ))}
  </XUIEditableTableBody>
</XUIEditableTable>;
```

`XUIEditableTableHead` is optional. You can omit it to avoid rendering of the table `<thead />` header row.

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableRow,
  XUIEditableTableCellReadOnly,
  XUIEditableTableBody
} from '@xero/xui/react/editabletable';

const data = [
  { fruit: 'Banana', color: 'Yellow', price: 2.99 },
  { fruit: 'Orange', color: 'Orange', price: 3.99 }
];

<XUIEditableTable ariaLabel="List of fruits with color and price per kg">
  <XUIEditableTableBody>
    {data.map((row, index) => (
      <XUIEditableTableRow key={index}>
        <XUIEditableTableCellReadOnly>{row.fruit}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.color}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.price}</XUIEditableTableCellReadOnly>
      </XUIEditableTableRow>
    ))}
  </XUIEditableTableBody>
</XUIEditableTable>;
```

## Responsive

Currently in progress.

## Custom CSS Classes

Pass a `className` to any editable table component to add CSS classes.

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableRow,
  XUIEditableTableCellReadOnly,
  XUIEditableTableBody
} from '@xero/xui/react/editabletable';

const data = [{ fruit: 'Banana', color: 'Yellow', price: 2.99 }];

const node = document.createElement('style');

node.innerHTML = `
.xui-table-reactdocs-shadow {
  box-shadow: 0 0 0 1px rgba(50,70,90,0.2), 0 8px 16px 0 rgba(50,70,90,0.2);
}
.xui-table-reactdocs-smallcaps {
  font-variant: small-caps;
}
`;
document.head.appendChild(node);

<XUIEditableTable
  ariaLabel="List of fruits with color and price per kg"
  className="xui-table-reactdocs-shadow"
>
  <XUIEditableTableBody>
    {data.map((row, index) => (
      <XUIEditableTableRow key={index}>
        <XUIEditableTableCellReadOnly className="xui-table-reactdocs-smallcaps">
          {row.fruit}
        </XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.color}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.price}</XUIEditableTableCellReadOnly>
      </XUIEditableTableRow>
    ))}
  </XUIEditableTableBody>
</XUIEditableTable>;
```

## Header / Footer

You can assemble the header area of a table by using `XUIEditableTableHead` and `XUIEditableTableRow` with `XUIEditableTableHeadingCell`.
The same applies to the footer and `XUIEditableTableFoot` with `XUIEditableTableRow` and `XUIEditableTableHeadingCell`.

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableRow,
  XUIEditableTableCellReadOnly,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableBody,
  XUIEditableTableFoot
} from '@xero/xui/react/editabletable';

const data = [
  { fruit: 'Banana', color: 'Yellow', price: 2.99 },
  { fruit: 'Orange', color: 'Orange', price: 3.99 }
];

<XUIEditableTable ariaLabel="List of fruits with color and price per kg">
  <XUIEditableTableHead>
    <XUIEditableTableRow>
      <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Color</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
    </XUIEditableTableRow>
  </XUIEditableTableHead>
  <XUIEditableTableBody>
    {data.map((row, index) => (
      <XUIEditableTableRow key={index}>
        <XUIEditableTableCellReadOnly>{row.fruit}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.color}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.price}</XUIEditableTableCellReadOnly>
      </XUIEditableTableRow>
    ))}
  </XUIEditableTableBody>
  <XUIEditableTableFoot>
    <XUIEditableTableRow>
      <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Color</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
    </XUIEditableTableRow>
  </XUIEditableTableFoot>
</XUIEditableTable>;
```

## Interactions

### Deleting rows

If you want to allow for a row to be deleted, you need to pass an `onRemove` handler to the corresponding `XUIEditableTableRow`, and also `isRemovable` to `rowOptions` inside the parent `XUIEditableTable`.

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableRow,
  XUIEditableTableCellReadOnly,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableBody
} from '@xero/xui/react/editabletable';

const data = [
  { fruit: 'Banana', color: 'Yellow', price: 2.99 },
  { fruit: 'Orange', color: 'Orange', price: 3.99 }
];

<XUIEditableTable
  ariaLabel="List of fruits with color and price per kg"
  rowOptions={{ isRemovable: true, removeButtonAriaLabel: 'Remove row' }}
>
  <XUIEditableTableHead>
    <XUIEditableTableRow>
      <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Color</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
    </XUIEditableTableRow>
  </XUIEditableTableHead>
  <XUIEditableTableBody>
    {data.map((row, index) => (
      <XUIEditableTableRow key={index} onRemove={() => console.log('remove me')}>
        <XUIEditableTableCellReadOnly>{row.fruit}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.color}</XUIEditableTableCellReadOnly>
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
    { fruit: 'Apple', color: 'Red', price: 2.99 },
    { fruit: 'Banana', color: 'Yellow', price: 2.99 },
    { fruit: 'Cucumber', color: 'Green', price: 4.99 }
  ]);

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
      dndInstructions="Press space bar to start a drag. When dragging you can use the arrow keys to move the item around and escape to cancel. Ensure your screen reader is in focus mode or forms mode."
      onReorderRow={(startIndex, destinationIndex) => {
        const newRows = [...rows];
        const rowToReorder = newRows.splice(startIndex, 1)[0];
        newRows.splice(destinationIndex, 0, rowToReorder);

        setRows(newRows);
      }}
      rowOptions={{ dragHandleAriaLabel: 'Remove row', isDraggable: true }}
    >
      <XUIEditableTableHead>
        <XUIEditableTableRow>
          <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell>Color</XUIEditableTableHeadingCell>
          <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
        </XUIEditableTableRow>
      </XUIEditableTableHead>
      <XUIEditableTableBody>
        {rows.map((row, index) => (
          <XUIEditableTableRow index={index} key={index} onRemove={() => console.log('remove me')}>
            <XUIEditableTableCellReadOnly>{row.fruit}</XUIEditableTableCellReadOnly>
            <XUIEditableTableCellReadOnly>{row.color}</XUIEditableTableCellReadOnly>
            <XUIEditableTableCellReadOnly>{row.price}</XUIEditableTableCellReadOnly>
          </XUIEditableTableRow>
        ))}
      </XUIEditableTableBody>
    </XUIEditableTable>
  );
};

<DragAndDropExample />;
```

## Cell types

In order to build a row you can put any of the following cell types into `XUIEditableTableRow`.

### XUIEditableTableCellTextInput

This is a basic cell that allows editing its content and behaves like an input.

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableRow,
  XUIEditableTableCellReadOnly,
  XUIEditableTableCellTextInput,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableBody
} from '@xero/xui/react/editabletable';

const data = [
  { fruit: 'Banana', color: 'Yellow', price: 2.99 },
  { fruit: 'Orange', color: 'Orange', price: 3.99 }
];

<XUIEditableTable ariaLabel="List of fruits with color and price per kg">
  <XUIEditableTableHead>
    <XUIEditableTableRow>
      <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Color</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
    </XUIEditableTableRow>
  </XUIEditableTableHead>
  <XUIEditableTableBody>
    {data.map((row, index) => (
      <XUIEditableTableRow key={index}>
        <XUIEditableTableCellReadOnly>{row.fruit}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellTextInput defaultValue={row.color} />
        <XUIEditableTableCellReadOnly>{row.price}</XUIEditableTableCellReadOnly>
      </XUIEditableTableRow>
    ))}
  </XUIEditableTableBody>
</XUIEditableTable>;
```

### XUIEditableTableCellSelectBox

A `XUIEditableTableCellSelectBox` needs at least one [SelectBoxOption](#select-box-option), just like a regular [SelectBox](#select-box).

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableRow,
  XUIEditableTableCellReadOnly,
  XUIEditableTableCellSelectBox,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableBody
} from '@xero/xui/react/editabletable';
import { SelectBoxOption } from '@xero/xui/react/select-box';

const data = [{ fruit: 'Orange', color: 'Orange', price: 3.99 }];

<XUIEditableTable ariaLabel="List of fruits with color and price per kg">
  <XUIEditableTableHead>
    <XUIEditableTableRow>
      <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Color</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
    </XUIEditableTableRow>
  </XUIEditableTableHead>
  <XUIEditableTableBody>
    {data.map((row, index) => (
      <XUIEditableTableRow key={index}>
        <XUIEditableTableCellReadOnly>{row.fruit}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellSelectBox buttonContent={'Color'} id={`${index}`} label={'Color'}>
          <SelectBoxOption id={`${index}_a`} key="a" value="Yellow">
            Yellow
          </SelectBoxOption>
          <SelectBoxOption id={`${index}_b`} key="b" value="Blue">
            Blue
          </SelectBoxOption>
          <SelectBoxOption id={`${index}_c`} key="c" value="Red">
            Red
          </SelectBoxOption>
        </XUIEditableTableCellSelectBox>
        <XUIEditableTableCellReadOnly>{row.price}</XUIEditableTableCellReadOnly>
      </XUIEditableTableRow>
    ))}
  </XUIEditableTableBody>
</XUIEditableTable>;
```

### Secondary Search

`XUIEditableTableCellSecondarySearch` uses [XUIAutocompleterSecondarySearch](#autocompleter-secondary-search) and uses the same API. Example below illustrates how to use it with a `XUIButton` and a `Picklist` with one or more `Pickitems`.

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableRow,
  XUIEditableTableCellReadOnly,
  XUIEditableTableCellSecondarySearch,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableBody
} from '@xero/xui/react/editabletable';
import XUIButton from '@xero/xui/react/button';
import Picklist, { Pickitem } from '@xero/xui/react/picklist';

const data = [{ fruit: 'Orange', color: 'Orange', price: 3.99 }];

<XUIEditableTable ariaLabel="List of fruits with color and price per kg">
  <XUIEditableTableHead>
    <XUIEditableTableRow>
      <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Color</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
    </XUIEditableTableRow>
  </XUIEditableTableHead>
  <XUIEditableTableBody>
    {data.map((row, index) => (
      <XUIEditableTableRow key={index}>
        <XUIEditableTableCellReadOnly>{row.fruit}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellSecondarySearch
          id={`${index}`}
          onSearch={() => console.log('Secondary Search onSearch triggered.')}
          trigger={<XUIButton>Color</XUIButton>}
        >
          <Picklist>
            <Pickitem id="pi1" primaryElement="Red" />
            <Pickitem id="pi2" primaryElement="Blue" />
          </Picklist>
        </XUIEditableTableCellSecondarySearch>
        <XUIEditableTableCellReadOnly>{row.price}</XUIEditableTableCellReadOnly>
      </XUIEditableTableRow>
    ))}
  </XUIEditableTableBody>
</XUIEditableTable>;
```

### XUIEditableTableCellReadOnly

The editable table component provides a standard `XUIEditableTableCellReadOnly` table cell that doesn't allow any user interaction. Read-only cells offer visual styles different to interactive cells.

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableRow,
  XUIEditableTableCellReadOnly,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableBody
} from '@xero/xui/react/editabletable';

const data = [{ fruit: 'Orange', color: 'Orange', price: 3.99 }];

<XUIEditableTable ariaLabel="List of fruits with color and price per kg">
  <XUIEditableTableHead>
    <XUIEditableTableRow>
      <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Color</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
    </XUIEditableTableRow>
  </XUIEditableTableHead>
  <XUIEditableTableBody>
    {data.map((row, index) => (
      <XUIEditableTableRow key={index}>
        <XUIEditableTableCellReadOnly>{row.fruit}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.color}</XUIEditableTableCellReadOnly>
        <XUIEditableTableCellReadOnly>{row.price}</XUIEditableTableCellReadOnly>
      </XUIEditableTableRow>
    ))}
  </XUIEditableTableBody>
</XUIEditableTable>;
```

### Heading cell

Heading cells generate a `<th>` and should be used to label the data in a related column
or row. They are non-interactive, at this time.
