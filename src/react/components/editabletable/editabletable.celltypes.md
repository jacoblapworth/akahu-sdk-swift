## Cell types

In order to build a row, put any of the following cell types into `XUIEditableTableRow`:

### Heading cell

Heading cells generate a `<th>` and should be used to label the data in a related column or row. They are non-interactive at this time.

### Read-only cell

The editable table component provides a standard `XUIEditableTableCellReadOnly` table cell that doesn't allow any user interaction. Read-only cells offer visual styles different to interactive cells.

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellReadOnly,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';

const data = [{ fruit: 'Orange', colour: 'Orange', price: 3.99 }];

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

### Text input cell

This is a basic cell that allows editing its content and behaves like an input.

**Note:** Focusing a text input cell will highlight the contents by default for all supported input types. `<input type="number">` is not one of them – the methods `select` and `setSelectionRange` manipulate [properties that don’t exist on `<input type="number">`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement), so attempting to programmatically select the contents of a number input [will not work](https://confluence.teamxero.com/pages/viewpage.action?pageId=234466485) without a workaround.

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
        <XUIEditableTableCellTextInput defaultValue={String(row.fruit)} />
        <XUIEditableTableCellTextInput defaultValue={String(row.colour)} />
        <XUIEditableTableCellTextInput defaultValue={String(row.price)} />
      </XUIEditableTableRow>
    ))}
  </XUIEditableTableBody>
</XUIEditableTable>;
```

### Select box cell

A `XUIEditableTableCellSelectBox` requires at least one [`SelectBoxOption`](#select-box-option) to be passed as a child, just like a regular [`SelectBox`](#select-box).

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellSelectBox,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';
import { SelectBoxOption } from '@xero/xui/react/select-box';

const noop = () => {};
const data = [{ fruit: 'Orange', colour: 'Orange', price: 3.99 }];

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
        <XUIEditableTableCellSelectBox
          buttonContent={'Select fruit'}
          id={`${index}_a`}
          label={'Select fruit'}
          onChange={noop}
        >
          <SelectBoxOption id={`${index}_a1`} key="a1" value="Orange">
            Orange
          </SelectBoxOption>
          <SelectBoxOption id={`${index}_a2`} key="a2" value="Banana">
            Banana
          </SelectBoxOption>
          <SelectBoxOption id={`${index}_a3`} key="a3" value="Lemon">
            Lemon
          </SelectBoxOption>
        </XUIEditableTableCellSelectBox>
        <XUIEditableTableCellSelectBox
          buttonContent={'Select colour'}
          id={`${index}_b`}
          label={'Select colour'}
          onChange={noop}
        >
          <SelectBoxOption id={`${index}_b1`} key="b1" value="Yellow">
            Yellow
          </SelectBoxOption>
          <SelectBoxOption id={`${index}_b2`} key="b2" value="Blue">
            Blue
          </SelectBoxOption>
          <SelectBoxOption id={`${index}_b3`} key="b3" value="Red">
            Red
          </SelectBoxOption>
        </XUIEditableTableCellSelectBox>
        <XUIEditableTableCellSelectBox
          buttonContent={'Select price / kg'}
          id={`${index}_c`}
          label={'Select price / kg'}
          onChange={noop}
        >
          <SelectBoxOption id={`${index}_c1`} key="c1" value="2.99">
            2.99
          </SelectBoxOption>
          <SelectBoxOption id={`${index}_c2`} key="c2" value="3.99">
            3.99
          </SelectBoxOption>
          <SelectBoxOption id={`${index}_c3`} key="c3" value="4.99">
            4.99
          </SelectBoxOption>
        </XUIEditableTableCellSelectBox>
      </XUIEditableTableRow>
    ))}
  </XUIEditableTableBody>
</XUIEditableTable>;
```

### Autocompleter cell

`XUIEditableTableCellAutocompleter` wraps a [`XUIAutocompleter`](#autocompleter), exposing its relevant props.

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellAutocompleter,
  XUIEditableTableCellReadOnly,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';
import { XUIPill } from '@xero/xui/react/pill';

const noop = () => {};
const colours = [
  { colour: 'Yellow', id: 1 },
  { colour: 'Red', id: 2 }
];
const renderPill = pill => (
  <XUIPill
    value={pill.colour}
    className="xui-autocompleter--pill"
    onDeleteClick={noop}
    deleteButtonLabel="Delete"
    key={pill.id}
    size="small"
  />
);
const pills = colours.map(colour => renderPill(colour));

<XUIEditableTable ariaLabel="List of fruits with colour and price per kg">
  <XUIEditableTableHead>
    <XUIEditableTableRow>
      <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Colours</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
    </XUIEditableTableRow>
  </XUIEditableTableHead>
  <XUIEditableTableBody>
    <XUIEditableTableRow>
      <XUIEditableTableCellReadOnly>Banana</XUIEditableTableCellReadOnly>
      <XUIEditableTableCellAutocompleter
        inputLabel="autocompleter"
        isInputLabelHidden
        pills={pills}
        onSearch={() => {}}
      />
      <XUIEditableTableCellReadOnly>2.99</XUIEditableTableCellReadOnly>
    </XUIEditableTableRow>
  </XUIEditableTableBody>
</XUIEditableTable>;
```

### Icon button cell

Use `iconReference` to pass a `XUIIcon` to a `XUIEditableTableCellIconButton`. Don’t forget the `ariaLabel`!

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellReadOnly,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableCellIconButton,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';
import overflowIcon from '@xero/xui-icon/icons/overflow';

<XUIEditableTable
  ariaLabel="List of fruits with colour and price per kg"
  columnWidths={['auto', 'auto', 'auto', '40px']}
>
  <XUIEditableTableHead>
    <XUIEditableTableRow>
      <XUIEditableTableHeadingCell>Fruit</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Colour</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell>Price / kg</XUIEditableTableHeadingCell>
      <XUIEditableTableHeadingCell />
    </XUIEditableTableRow>
  </XUIEditableTableHead>
  <XUIEditableTableBody>
    <XUIEditableTableRow>
      <XUIEditableTableCellReadOnly>Banana</XUIEditableTableCellReadOnly>
      <XUIEditableTableCellReadOnly>Yellow</XUIEditableTableCellReadOnly>
      <XUIEditableTableCellReadOnly>2.99</XUIEditableTableCellReadOnly>
      <XUIEditableTableCellIconButton ariaLabel="More options" iconReference={overflowIcon} />
    </XUIEditableTableRow>
  </XUIEditableTableBody>
</XUIEditableTable>;
```
