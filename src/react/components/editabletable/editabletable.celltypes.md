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

**Note:** Focusing a text input cell will highlight the contents by default.

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

A `XUIEditableTableCellSelectBox` requires at least one [`XUISelectBoxOption`](#select-box-option) to be passed as a child, just like a regular [`SelectBox`](#select-box).

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellSelectBox,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';
import { XUISelectBoxOption } from '@xero/xui/react/selectbox';

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
          <XUISelectBoxOption id={`${index}_a1`} key="a1" value="Orange">
            Orange
          </XUISelectBoxOption>
          <XUISelectBoxOption id={`${index}_a2`} key="a2" value="Banana">
            Banana
          </XUISelectBoxOption>
          <XUISelectBoxOption id={`${index}_a3`} key="a3" value="Lemon">
            Lemon
          </XUISelectBoxOption>
        </XUIEditableTableCellSelectBox>
        <XUIEditableTableCellSelectBox
          buttonContent={'Select colour'}
          id={`${index}_b`}
          label={'Select colour'}
          onChange={noop}
        >
          <XUISelectBoxOption id={`${index}_b1`} key="b1" value="Yellow">
            Yellow
          </XUISelectBoxOption>
          <XUISelectBoxOption id={`${index}_b2`} key="b2" value="Blue">
            Blue
          </XUISelectBoxOption>
          <XUISelectBoxOption id={`${index}_b3`} key="b3" value="Red">
            Red
          </XUISelectBoxOption>
        </XUIEditableTableCellSelectBox>
        <XUIEditableTableCellSelectBox
          buttonContent={'Select price / kg'}
          id={`${index}_c`}
          label={'Select price / kg'}
          onChange={noop}
        >
          <XUISelectBoxOption id={`${index}_c1`} key="c1" value="2.99">
            2.99
          </XUISelectBoxOption>
          <XUISelectBoxOption id={`${index}_c2`} key="c2" value="3.99">
            3.99
          </XUISelectBoxOption>
          <XUISelectBoxOption id={`${index}_c3`} key="c3" value="4.99">
            4.99
          </XUISelectBoxOption>
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

### Autocompleter secondary search cell

`XUIEditableTableCellAutocompleter` wraps a [`XUIAutocompleterSecondarySearch`](#autocompleter-secondary-search) with a built-in trigger, exposing its relevant props.

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellAutocompleterSecondarySearch,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';
import { XUIAutocompleterEmptyState } from '@xero/xui/react/autocompleter';
import { XUIPicklist, XUIPickitem } from '@xero/xui/react/picklist';

const noop = () => {};

const secondarySearchOptionsData = {
  fruit: [
    { props: { id: 'ss1' }, text: 'Orange' },
    { props: { id: 'ss2' }, text: 'Banana' },
    { props: { id: 'ss3' }, text: 'Lemon' }
  ],
  color: [
    { props: { id: 'ss4' }, text: 'Yellow' },
    { props: { id: 'ss5' }, text: 'Blue' },
    { props: { id: 'ss6' }, text: 'Red' }
  ],
  price: [
    { props: { id: 'ss7' }, text: 2.99 },
    { props: { id: 'ss8' }, text: 3.99 },
    { props: { id: 'ss9' }, text: 4.99 }
  ]
};

const isSelected = (item, selectedIds) =>
  item.props.id === selectedIds || (Boolean(selectedIds) && selectedIds[item.props.id]);

const createItems = (item, selectedId) => {
  if (Array.isArray(item)) {
    return item.map(i => createItems(i, selectedId));
  }

  return (
    <XUIPickitem
      {...item.props}
      isSelected={isSelected(item, selectedId)}
      key={item.props.id}
      value={item.props.id}
    >
      {item.text}
    </XUIPickitem>
  );
};

const SecondarySearchExample = ({ searchData, key, ...spreadProps }) => {
  const [data, setData] = React.useState(searchData);
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  const [value, setValue] = React.useState('');

  const onSearch = value => {
    const matchingData = searchData.filter(item =>
      String(item.text).toLowerCase().includes(value.toLowerCase())
    );

    setData(matchingData);
    setValue(value);
  };

  const onClose = () => {
    setData(searchData);
    setValue('');
  };

  const items =
    data.length > 0 ? (
      createItems(data, selectedItemId)
    ) : (
      <XUIAutocompleterEmptyState>No results found</XUIAutocompleterEmptyState>
    );

  const filteredSearchItem = searchData.filter(item => item.props.id === selectedItemId)[0];

  return (
    <XUIEditableTableCellAutocompleterSecondarySearch
      buttonContent={filteredSearchItem && filteredSearchItem.text}
      buttonContentPlaceholder="Search items"
      inputLabel="secondary search label"
      key={key}
      onClose={onClose}
      onOptionSelect={setSelectedItemId}
      onSearch={onSearch}
      searchValue={value}
      {...spreadProps}
    >
      <XUIPicklist>{items}</XUIPicklist>
    </XUIEditableTableCellAutocompleterSecondarySearch>
  );
};

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
      {Object.keys(secondarySearchOptionsData).map(key =>
        SecondarySearchExample({ searchData: secondarySearchOptionsData[key], key })
      )}
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
import archiveIcon from '@xero/xui-icon/icons/archive';

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
      <XUIEditableTableCellIconButton
        ariaLabel="Archive"
        iconReference={archiveIcon}
        onClick={() => alert('Banana has been archived')}
      />
    </XUIEditableTableRow>
  </XUIEditableTableBody>
</XUIEditableTable>;
```

### Creating a custom cell

You can create a custom editable table cell using `XUIEditableTableCell`. This component is used to build the various cell types offered by XUI, and can be used by you to create your own custom cell types too.

In the example below we use a `XUIEditableTableCell` to create an overflow menu using [`XUIDropdownToggled`](#dropdown-toggled) and [`XUIIconButton`](#icon-button).

```jsx harmony
import {
  XUIEditableTable,
  XUIEditableTableBody,
  XUIEditableTableCellReadOnly,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableCell,
  XUIEditableTableRow
} from '@xero/xui/react/editabletable';
import { XUIIconButton } from '@xero/xui/react/button';
import { XUIDropdown, XUIDropdownToggled } from '@xero/xui/react/dropdown';
import { XUIPicklist, XUIPickitem } from '@xero/xui/react/picklist';
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
      <XUIEditableTableCell>
        <XUIDropdownToggled
          trigger={<XUIIconButton ariaLabel="More options" icon={overflowIcon} />}
          dropdown={
            <XUIDropdown>
              <XUIPicklist>
                <XUIPickitem id="pay-for-bananas">Pay for Bananas</XUIPickitem>
              </XUIPicklist>
            </XUIDropdown>
          }
        />
      </XUIEditableTableCell>
    </XUIEditableTableRow>
  </XUIEditableTableBody>
</XUIEditableTable>;
```
