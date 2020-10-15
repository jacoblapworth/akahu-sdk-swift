<div class="xui-margin-vertical">
		<a href="../section-components-displayingdata-table.html" isDocLink>Table component in the XUI Documentation</a>
</div>

The Table scaffold is a convenient way to lay out data sets with an _accessible_ and _responsive_ design mindset.

The scaffold is broken up into three key components.<br />`import XUITable, { XUITableColumn, XUITableCell } from '@xero/xui/react/table';`

## Basic

The bare minimum _Table_ component requires a data schema and a basic _Column / Cell_ combination.

The `data` prop requires an object with **unique** keys that differentiate each row.

Each _Cell_ inside the _Column_ `body` prop is a function that passes through each row’s `data` independently so you can cherry pick the relevant content for a particular _Cell_.

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';

const data = {
  abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99 }
};

<Table
  data={data}
  loaderAriaLabel="Loading more data"
  emptyMessage="Nothing to show here"
  checkOneRowAriaLabel="Select row"
  checkAllRowsAriaLabel="Select all rows"
  overflowMenuTitle="More row options"
  caption="List of fruits with color and price per kg"
>
  <Column head={<Cell>Fruit</Cell>} body={({ fruit }) => <Cell>{fruit}</Cell>} />

  <Column head={<Cell>Color</Cell>} body={({ color }) => <Cell>{color}</Cell>} />

  <Column head={<Cell>Price / kg</Cell>} body={({ price }) => <Cell>{`$${price}`}</Cell>} />
</Table>;
```

If there is no _JSX_ supplied to **any** _Column_ `head` prop the _Table_ `<th />` _Cells_ will **not** be rendered.

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';

const data = {
  abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99 }
};

<Table
  data={data}
  loaderAriaLabel="Loading more data"
  emptyMessage="Nothing to show here"
  checkOneRowAriaLabel="Select row"
  checkAllRowsAriaLabel="Select all rows"
  overflowMenuTitle="More row options"
  caption="List of fruits with color and price per kg"
>
  <Column body={({ fruit }) => <Cell>{fruit}</Cell>} />
  <Column body={({ color }) => <Cell>{color}</Cell>} />
  <Column body={({ price }) => <Cell>{`$${price}`}</Cell>} />
</Table>;
```

## Responsive

The `isResponsive` tag allows the _Table_ to become horizontally scrollable when the amount of _Column_ content causes an overflow.

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';

const data = {
  abc123: {
    fruit: 'Banana',
    color: 'Yellow',
    price: 2.99,
    purchased: 'John Smith',
    ordered: 1519865730672,
    delivered: 1520124930672,
    quantity: 128,
    address: '1 Watt St, Parnell, Auckland, 1052',
    paid: true
  }
};

<Table
  data={data}
  isResponsive
  loaderAriaLabel="Loading more data"
  emptyMessage="Nothing to show here"
  checkOneRowAriaLabel="Select row"
  checkAllRowsAriaLabel="Select all rows"
  overflowMenuTitle="More row options"
  caption="List of fruits with color and purchase information"
>
  <Column head={<Cell>Fruit</Cell>} body={({ fruit }) => <Cell>{fruit}</Cell>} />

  <Column head={<Cell>Color</Cell>} body={({ color }) => <Cell>{color}</Cell>} />

  <Column
    head={<Cell>Ordered On</Cell>}
    body={({ ordered }) => <Cell>{new Date(ordered).toDateString()}</Cell>}
  />

  <Column
    head={<Cell>Delivered On</Cell>}
    body={({ delivered }) => <Cell>{new Date(delivered).toDateString()}</Cell>}
  />

  <Column head={<Cell>Sent To</Cell>} body={({ address }) => <Cell>{address}</Cell>} />

  <Column
    head={<Cell>Quantity</Cell>}
    body={({ quantity }) => <Cell>{`x${quantity} units`}</Cell>}
  />

  <Column head={<Cell>Purchased By</Cell>} body={({ purchased }) => <Cell>{purchased}</Cell>} />

  <Column head={<Cell>Price / kg</Cell>} body={({ price }) => <Cell>{`$${price}`}</Cell>} />

  <Column
    head={<Cell>Total Cost</Cell>}
    body={({ price, quantity }) => <Cell>{`$${price * quantity}`}</Cell>}
  />

  <Column head={<Cell>Paid</Cell>} body={({ paid }) => <Cell>{paid ? 'Yes' : 'No'}</Cell>} />
</Table>;
```

## Truncation

Changes overflowing _Column_ content into a truncated _Column_ view if a reasonable amount of legibility can still be maintained.

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';

const data = {
  abc123: {
    fruit: 'Banana',
    color: 'Yellow',
    price: 2.99,
    purchased: 'John Smith',
    ordered: 1519865730672,
    delivered: 1520124930672,
    quantity: 128,
    address: '1 Watt St, Parnell, Auckland, 1052',
    paid: true
  }
};

<Table
  data={data}
  isResponsive
  isTruncated
  loaderAriaLabel="Loading more data"
  emptyMessage="Nothing to show here"
  checkOneRowAriaLabel="Select row"
  checkAllRowsAriaLabel="Select all rows"
  overflowMenuTitle="More row options"
  caption="List of fruits with color and purchase information"
>
  <Column head={<Cell>Fruit</Cell>} body={({ fruit }) => <Cell>{fruit}</Cell>} />

  <Column head={<Cell>Color</Cell>} body={({ color }) => <Cell>{color}</Cell>} />

  <Column
    head={<Cell>Ordered On</Cell>}
    body={({ ordered }) => <Cell>{new Date(ordered).toDateString()}</Cell>}
  />

  <Column
    head={<Cell>Delivered On</Cell>}
    body={({ delivered }) => <Cell>{new Date(delivered).toDateString()}</Cell>}
  />

  <Column head={<Cell>Sent To</Cell>} body={({ address }) => <Cell>{address}</Cell>} />

  <Column
    head={<Cell>Quantity</Cell>}
    body={({ quantity }) => <Cell>{`x${quantity} units`}</Cell>}
  />

  <Column head={<Cell>Purchased By</Cell>} body={({ purchased }) => <Cell>{purchased}</Cell>} />

  <Column head={<Cell>Price / kg</Cell>} body={({ price }) => <Cell>{`$${price}`}</Cell>} />

  <Column
    head={<Cell>Total Cost</Cell>}
    body={({ price, quantity }) => <Cell>{`$${price * quantity}`}</Cell>}
  />

  <Column head={<Cell>Paid</Cell>} body={({ paid }) => <Cell>{paid ? 'Yes' : 'No'}</Cell>} />
</Table>;
```

## Wrapping

Wrapping can be defined on a per _Cell_ basis using the `hasWrapping` prop. By default a _Cell_ is **not** multiline.

**Note:** If `isTruncated` is set, `hasWrapping` cannot be applied to a cell within the table. This is because with `isTruncated` enabled, cells within that table will always be displayed as a single line.

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';

const data = {
  abc123: {
    fruit: 'Banana',
    color: 'Yellow',
    description:
      'There was once a little banana, That lived in a grocery store, He loved to hang out with the other fruits, But mostly to explore.',
    price: 2.99
  }
};

<Table
  data={data}
  loaderAriaLabel="Loading more data"
  emptyMessage="Nothing to show here"
  checkOneRowAriaLabel="Select row"
  checkAllRowsAriaLabel="Select all rows"
  overflowMenuTitle="More row options"
  caption="List of fruits with color, price per kg and additional notes"
>
  <Column head={<Cell>Fruit</Cell>} body={({ fruit }) => <Cell>{fruit}</Cell>} />

  <Column head={<Cell>Color</Cell>} body={({ color }) => <Cell>{color}</Cell>} />

  <Column
    head={<Cell>Description</Cell>}
    body={({ description }) => <Cell hasWrapping>{description}</Cell>}
  />

  <Column head={<Cell>Price / kg</Cell>} body={({ price }) => <Cell>{`$${price}`}</Cell>} />
</Table>;
```

## Custom CSS Classes

Pass the `className` prop to the `<XUITable>` to add CSS classes to the outer most element of the the _Table_ scaffold.

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';

const data = {
  abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99 }
};
const node = document.createElement('style');

node.innerHTML = `
.xui-table-reactdocs-shadow {
	box-shadow: 0 0 0 1px rgba(50,70,90,0.2), 0 8px 16px 0 rgba(50,70,90,0.2);
}
`;
document.head.appendChild(node);

<Table
  data={data}
  className="xui-table-reactdocs-shadow"
  loaderAriaLabel="Loading more data"
  emptyMessage="Nothing to show here"
  checkOneRowAriaLabel="Select row"
  checkAllRowsAriaLabel="Select all rows"
  overflowMenuTitle="More row options"
  caption="List of fruits with color and price per kg"
>
  <Column head={<Cell>Fruit</Cell>} body={({ fruit }) => <Cell>{fruit}</Cell>} />

  <Column head={<Cell>Color</Cell>} body={({ color }) => <Cell>{color}</Cell>} />

  <Column head={<Cell>Price / kg</Cell>} body={({ price }) => <Cell>{`$${price}`}</Cell>} />
</Table>;
```

Pass the `rowClassName` key in a row object of the `data` prop of `<XUITable>` to apply a custom class.

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';

const data = {
  abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99, rowClassName: 'xui-table-reactdocs-row' }
};
const node = document.createElement('style');

node.innerHTML = `
.xui-table-reactdocs-row {
  font-style: italic;
	font-weight: bold;
}
`;
document.head.appendChild(node);

<Table
  data={data}
  className="xui-table-reactdocs-shadow"
  caption="List of fruits with color and price per kg"
>
  <Column head={<Cell>Fruit</Cell>} body={({ fruit }) => <Cell>{fruit}</Cell>} />

  <Column head={<Cell>Color</Cell>} body={({ color }) => <Cell>{color}</Cell>} />

  <Column head={<Cell>Price / kg</Cell>} body={({ price }) => <Cell>{`$${price}`}</Cell>} />
</Table>;
```

Pass the `className` prop to the `<XUITableCell>` to add CSS classes to each _Cell_ on an individual basis.

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';

const data = {
  abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99, paid: true },
  def456: { fruit: 'Apple', color: 'Red', price: 3.49, paid: false }
};

<Table
  data={data}
  loaderAriaLabel="Loading more data"
  emptyMessage="Nothing to show here"
  checkOneRowAriaLabel="Select row"
  checkAllRowsAriaLabel="Select all rows"
  overflowMenuTitle="More row options"
  caption="List of fruits with color and price per kg"
>
  <Column head={<Cell>Fruit</Cell>} body={({ fruit }) => <Cell>{fruit}</Cell>} />

  <Column head={<Cell>Color</Cell>} body={({ color }) => <Cell>{color}</Cell>} />

  <Column
    head={<Cell className="xui-heading-large">Price / kg</Cell>}
    body={({ price, paid }) => (
      <Cell
        className={paid ? 'xui-textcolor-positive' : 'xui-textcolor-negative'}
      >{`$${price}`}</Cell>
    )}
  />
</Table>;
```

## Checkboxes

Prepend the table rows with a check box action with the `hasCheckbox` prop.

Each row's _Checked_ state is derived from checking for _"truthy"_ row key / value pairs in the `checkedIds` prop.

Each row's _Disabled_ state is derived from checking for _"truthy"_ row key / value pairs in the `disabledIds` prop.

**Note: Make sure the state of the _disbled_ checkbox will not be changed via the bulk-select. For reference, There's an example `onCheckAllToggle` callback function below.**

Interactions for the _"master"_ and _"single"_ checkbox toggles can be handled using the `onCheckAllToggle` and `onCheckOneToggle` props. If you provide these, you must also provide the corresponding `checkAllRowsAriaLabel` or `checkOneRowAriaLabel` for accessibility purposes.

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';

const data = {
  abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99 },
  def456: { fruit: 'Apple', color: 'Red', price: 3.49, paid: false },
  ghi789: { fruit: 'Cherry', color: 'Black', price: 4.21 }
};

class Demo extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      checkedIds: { abc123: true, def456: false, ghi789: true },
      disabledIds: { ghi789: true }
    };
    this.handleCheckAllToggle = this.handleCheckAllToggle.bind(this);
    this.handleCheckOneToggle = this.handleCheckOneToggle.bind(this);
  }

  handleCheckAllToggle() {
    const { checkedIds, disabledIds } = this.state;
    const dataKeys = Object.keys(data);
    let totalData = dataKeys.length;
    const keepCheckedIds = {};
    const keepUncheckedIds = {};
    let totalChecked = Object.keys(checkedIds).reduce(
      (acc, key) => (checkedIds[key] ? acc + 1 : acc),
      0
    );
    Object.keys(disabledIds).forEach(key => {
      if (checkedIds[key]) {
        keepCheckedIds[key] = true;
      } else {
        keepUncheckedIds[key] = true;
        totalChecked++;
      }
    });
    if (totalData === totalChecked) {
      this.setState({ checkedIds: { ...keepCheckedIds } });
    } else {
      this.setState({
        checkedIds: dataKeys.reduce((acc, key) => ({ ...acc, [key]: !keepUncheckedIds[key] }), {})
      });
    }
  }

  handleCheckOneToggle(event, _id) {
    const { checkedIds } = this.state;
    const isChecked = Boolean(checkedIds[_id]);
    this.setState(() => ({ checkedIds: { ...checkedIds, [_id]: !isChecked } }));
  }

  render() {
    return (
      <Table
        data={data}
        hasCheckbox
        checkedIds={this.state.checkedIds}
        disabledIds={this.state.disabledIds}
        onCheckAllToggle={this.handleCheckAllToggle}
        onCheckOneToggle={this.handleCheckOneToggle}
        loaderAriaLabel="Loading more data"
        emptyMessage="Nothing to show here"
        checkOneRowAriaLabel="Select row"
        checkAllRowsAriaLabel="Select all rows"
        overflowMenuTitle="More row options"
        caption="List of fruits with color, price per kg and checkboxes"
      >
        <Column head={<Cell>Fruit</Cell>} body={({ fruit }) => <Cell>{fruit}</Cell>} />

        <Column head={<Cell>Color</Cell>} body={({ color }) => <Cell>{color}</Cell>} />

        <Column head={<Cell>Price / kg</Cell>} body={({ price }) => <Cell>{`$${price}`}</Cell>} />
      </Table>
    );
  }
}

<Demo />;
```

## Overflow Menu

You can append a menu to a table row by adding `hasOverflowMenu` and providing a `createOverflowMenu` function. The menu will not be rendered if you don’t provide these; however, if you do, you must also provide an `overflowMenuTitle` for accessibility purposes.

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';
import { XUIPickitem } from '@xero/xui/react/picklist';

const data = {
  abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99, paid: true },
  def456: { fruit: 'Apple', color: 'Red', price: 3.49, paid: false }
};

<Table
  data={data}
  hasOverflowMenu
  createOverflowMenu={({ fruit, paid }) =>
    !paid && [
      <XUIPickitem key="0" id="0" onClick={() => alert(`Pay for ${fruit}s`)}>
        Pay for {fruit}s
      </XUIPickitem>
    ]
  }
  loaderAriaLabel="Loading more data"
  emptyMessage="Nothing to show here"
  checkOneRowAriaLabel="Select row"
  checkAllRowsAriaLabel="Select all rows"
  overflowMenuTitle="More row options"
  caption="List of fruits with color, price per kg and additional options"
>
  <Column head={<Cell>Fruit</Cell>} body={({ fruit }) => <Cell>{fruit}</Cell>} />

  <Column head={<Cell>Color</Cell>} body={({ color }) => <Cell>{color}</Cell>} />

  <Column head={<Cell>Price / kg</Cell>} body={({ price }) => <Cell>{`$${price}`}</Cell>} />
</Table>;
```

## Pinned Actions

If an **action** column is **active** in the _Table_ it can be pinned to the relevant side of the scaffold.

- **Checkboxes** are pinned to the left of the scaffold by using the `hasPinnedFirstColumn` prop.
- **Overflow Menu** are pinned to the right of the scaffold by using the `hasPinnedLastColumn` prop.

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';
import { XUIPickitem } from '@xero/xui/react/picklist';
const data = {
  abc123: {
    fruit: 'Banana',
    color: 'Yellow',
    price: 2.99,
    purchased: 'John Smith',
    ordered: 1519865730672,
    delivered: 1520124930672,
    quantity: 128,
    address: '1 Watt St, Parnell, Auckland, 1052',
    paid: true
  }
};

class Demo extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { checkedIds: {} };
    this.handleCheckAllToggle = this.handleCheckAllToggle.bind(this);
    this.handleCheckOneToggle = this.handleCheckOneToggle.bind(this);
  }

  handleCheckAllToggle() {
    const { checkedIds } = this.state;
    const dataKeys = Object.keys(data);
    const totalData = dataKeys.length;
    const totalChecked = Object.keys(checkedIds).reduce(
      (acc, key) => (checkedIds[key] ? acc + 1 : acc),
      0
    );
    if (totalData === totalChecked) {
      this.setState({ checkedIds: {} });
    } else {
      this.setState({ checkedIds: dataKeys.reduce((acc, key) => ({ ...acc, [key]: true }), {}) });
    }
  }

  handleCheckOneToggle(event, _id) {
    const { checkedIds } = this.state;
    const isChecked = Boolean(checkedIds[_id]);
    this.setState(() => ({ checkedIds: { ...checkedIds, [_id]: !isChecked } }));
  }

  render() {
    return (
      <Table
        data={data}
        isResponsive
        hasPinnedFirstColumn
        hasPinnedLastColumn
        hasCheckbox
        checkedIds={this.state.checkedIds}
        onCheckAllToggle={this.handleCheckAllToggle}
        onCheckOneToggle={this.handleCheckOneToggle}
        hasOverflowMenu
        createOverflowMenu={() => [
          <XUIPickitem key="0" id="0" onClick={() => {}}>
            Edit
          </XUIPickitem>
        ]}
        loaderAriaLabel="Loading more data"
        emptyMessage="Nothing to show here"
        checkOneRowAriaLabel="Select row"
        checkAllRowsAriaLabel="Select all rows"
        overflowMenuTitle="More row options"
        caption="List of fruits with color and purchase information"
      >
        <Column head={<Cell>Fruit</Cell>} body={({ fruit }) => <Cell>{fruit}</Cell>} />

        <Column head={<Cell>Color</Cell>} body={({ color }) => <Cell>{color}</Cell>} />

        <Column
          head={<Cell>Ordered On</Cell>}
          body={({ ordered }) => <Cell>{new Date(ordered).toDateString()}</Cell>}
        />

        <Column
          head={<Cell>Delivered On</Cell>}
          body={({ delivered }) => <Cell>{new Date(delivered).toDateString()}</Cell>}
        />

        <Column head={<Cell>Sent To</Cell>} body={({ address }) => <Cell>{address}</Cell>} />

        <Column
          head={<Cell>Quantity</Cell>}
          body={({ quantity }) => <Cell>{`x${quantity} units`}</Cell>}
        />

        <Column
          head={<Cell>Purchased By</Cell>}
          body={({ purchased }) => <Cell>{purchased}</Cell>}
        />

        <Column head={<Cell>Price / kg</Cell>} body={({ price }) => <Cell>{`$${price}`}</Cell>} />

        <Column
          head={<Cell>Total Cost</Cell>}
          body={({ price, quantity }) => <Cell>{`$${price * quantity}`}</Cell>}
        />

        <Column head={<Cell>Paid</Cell>} body={({ paid }) => <Cell>{paid ? 'Yes' : 'No'}</Cell>} />
      </Table>
    );
  }
}

<Demo />;
```

## Sorting

Convert _Column_ `head` cells into buttons with sorting functionality by introducing the following props.

- `sortKey` affiliates a `head` _Cell_ with a key value in the `data` schema.
- `activeSortKey` determines which `sortKey` should be used to sort the _Table_ rows.
- `isSortAsc` defines the sort order to be _ascending_ / _descending_.

### Custom sorting

By default sorting is determined by a generic [sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) function. This provides basic alphabetical and numerical ordering out of the box.

By supplying the `customSort` prop you can create your own custom sort system. In this example we are sorting the `tags` column based on the length of the supplied array in each row.

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';
import XUITag from '@xero/xui/react/tag';

const data = {
  abc123: {
    fruit: 'Banana',
    color: 'Yellow',
    tags: [
      { name: 'Foo', variant: 'positive' },
      { name: 'Bar', variant: 'warning' },
      { name: 'Baz', variant: 'negative' }
    ],
    price: 2.99
  },
  def456: {
    fruit: 'Apple',
    color: 'Red',
    tags: [
      { name: 'Foo', variant: 'positive' },
      { name: 'Bar', variant: 'warning' }
    ],
    price: 3.49
  },
  ghi789: {
    fruit: 'Carrot',
    color: 'Orange',
    tags: [{ name: 'Foo', variant: 'positive' }],
    price: 1.49
  }
};

class Demo extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { activeSortKey: 'fruit', isSortAsc: true };
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange(newKey) {
    const { activeSortKey: oldKey, isSortAsc: oldIsAsc } = this.state;
    const newIsAsc = oldKey === newKey ? !oldIsAsc : true;
    this.setState({ activeSortKey: newKey, isSortAsc: newIsAsc });
  }

  handleTagSort(items, isAsc) {
    const comparison = isAsc
      ? (a, b) => a.tags.length > b.tags.length
      : (a, b) => a.tags.length < b.tags.length;
    return items.sort((a, b) => (comparison(a, b) ? 1 : -1));
  }

  render() {
    const { activeSortKey, isSortAsc } = this.state;
    return (
      <Table
        data={data}
        activeSortKey={activeSortKey}
        isSortAsc={isSortAsc}
        onSortChange={this.handleSortChange}
        customSort={activeSortKey === 'tags' ? this.handleTagSort : null}
        loaderAriaLabel="Loading more data"
        emptyMessage="Nothing to show here"
        checkOneRowAriaLabel="Select row"
        checkAllRowsAriaLabel="Select all rows"
        overflowMenuTitle="More row options"
        caption="List of fruits with tags and sorting"
      >
        <Column
          head={<Cell sortKey="fruit">Fruit</Cell>}
          body={({ fruit }) => <Cell>{fruit}</Cell>}
        />

        <Column
          head={<Cell sortKey="color">Color</Cell>}
          body={({ color }) => <Cell>{color}</Cell>}
        />

        <Column
          head={<Cell sortKey="tags">Tags</Cell>}
          body={({ tags }) => (
            <Cell>
              {tags.map(({ name, variant }, index) => (
                <XUITag key={index} className="xui-margin-right-xsmall" variant={variant}>
                  {name}
                </XUITag>
              ))}
            </Cell>
          )}
        />

        <Column
          head={<Cell sortKey="price">Price / kg</Cell>}
          body={({ price }) => <Cell>{`$${price}`}</Cell>}
        />
      </Table>
    );
  }
}

<Demo />;
```

## Header / Footer

Inject custom _JSX_ into the header and footer area of the _Table_ with the `header` and `footer` props.

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';

const data = {
  abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99 }
};
const Appendage = ({ children }) => (
  <div
    className="xui-heading xui-textcolor-inverted xui-padding-vertical-large xui-padding-horizontal-small"
    style={{ background: 'darkslategray' }}
  >
    {children}
  </div>
);

<Table
  data={data}
  header={<Appendage>Header</Appendage>}
  footer={<Appendage>Footer</Appendage>}
  loaderAriaLabel="Loading more data"
  emptyMessage="Nothing to show here"
  checkOneRowAriaLabel="Select row"
  checkAllRowsAriaLabel="Select all rows"
  overflowMenuTitle="More row options"
  caption="List of fruits with color and price per kg"
>
  <Column head={<Cell>Fruit</Cell>} body={({ fruit }) => <Cell>{fruit}</Cell>} />

  <Column head={<Cell>Color</Cell>} body={({ color }) => <Cell>{color}</Cell>} />

  <Column head={<Cell>Price / kg</Cell>} body={({ price }) => <Cell>{`$${price}`}</Cell>} />
</Table>;
```

## Loader

Appends a `<XUILoader />` after the last _Row_ in the _Table_ with the `isLoading` prop. If you provide this prop, you must also provide a `loaderAriaLabel` for accessibility purposes.

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';

const data = {
  abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99 }
};

<Table
  data={data}
  isLoading
  loaderAriaLabel="Loading more data"
  emptyMessage="Nothing to show here"
  checkOneRowAriaLabel="Select row"
  checkAllRowsAriaLabel="Select all rows"
  overflowMenuTitle="More row options"
  caption="List of fruits with color and price per kg"
>
  <Column head={<Cell>Fruit</Cell>} body={({ fruit }) => <Cell>{fruit}</Cell>} />

  <Column head={<Cell>Color</Cell>} body={({ color }) => <Cell>{color}</Cell>} />

  <Column head={<Cell>Price / kg</Cell>} body={({ price }) => <Cell>{`$${price}`}</Cell>} />
</Table>;
```

## Interactions

Add _Cell_ and row interactions using the `onCellClick` and `onRowClick` props.

The `onRowClick` prop works in conjunction with the `shouldRowClick` prop to determine if the current row should have a click the click handler applied to it.

**Note:**

- A _Cell_ interaction will be ** overridden** if its parent row has an interaction on it (**not** nesting links inside links). This can be seen in the below example where the _"Banana"_ row has no _Cell_ interactions even though they were requested.
- You can nest interaction items (`<button />`, `<a />`) inside of a cell and ignore the generic cell states (e.g `:hover`). Just make sure you `stopPropagation` on the nested interaction elements _(see example below)_.

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';
import XUIButton from '@xero/xui/react/button';
import XUIIcon from '@xero/xui/react/icon';
import tickIcon from '@xero/xui-icon/icons/checkbox-check';

const handleCellClick = ({ price }) => alert(`You clicked $${price}`);
const data = {
  abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99 },
  def456: { fruit: 'Apple', color: 'Red', price: 3.49 }
};

<Table
  data={data}
  shouldRowClick={({ fruit }) => fruit === 'Banana'}
  onRowClick={(event, { fruit }) => alert(`You clicked the ${fruit} row`)}
  loaderAriaLabel="Loading more data"
  emptyMessage="Nothing to show here"
  checkOneRowAriaLabel="Select row"
  checkAllRowsAriaLabel="Select all rows"
  overflowMenuTitle="More row options"
  caption="List of fruits with color and price per kg"
>
  <Column
    head={<Cell>Fruit</Cell>}
    body={({ fruit }) => <Cell onCellClick={() => alert(`You clicked ${fruit}`)}>{fruit}</Cell>}
  />

  <Column
    head={<Cell>Color</Cell>}
    body={({ color }) => (
      <Cell onCellClick={() => alert(`You clicked ${color}`)}>
        {color},
        <a
          href="#"
          className="xui-text-link"
          onClick={event => event.stopPropagation()}
          onKeyDown={event => event.stopPropagation()}
          onPointerOver={event => event.stopPropagation()}
        >
          more
        </a>
      </Cell>
    )}
  />

  <Column
    head={<Cell>Price / kg</Cell>}
    body={({ price }) => (
      <Cell onCellClick={handleCellClick}>
        {`$${price}`}
        <XUIButton
          title="select"
          className="xui-margin-left"
          size="small"
          onClick={event => event.stopPropagation()}
          onKeyDown={event => event.stopPropagation()}
          onPointerOver={event => event.stopPropagation()}
        >
          <XUIIcon icon={tickIcon} />
        </XUIButton>
      </Cell>
    )}
  />
</Table>;
```

## Empty State

If no data is supplied to `<XUITable />` then the _empty state_ component will be rendered instead. In that case, you must provide an `emptyMessage` or replace the entire empty state component by providing your own `emptyStateComponent`.

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';

const data = {};

<Table
  data={data}
  emptyMessage="There are no fruit results"
  loaderAriaLabel="Loading more data"
  emptyMessage="Nothing to show here"
  checkOneRowAriaLabel="Select row"
  checkAllRowsAriaLabel="Select all rows"
  overflowMenuTitle="More row options"
  caption="List of fruits with color and price per kg"
>
  <Column head={<Cell>Fruit</Cell>} body={({ fruit }) => <Cell>{fruit}</Cell>} />

  <Column head={<Cell>Color</Cell>} body={({ color }) => <Cell>{color}</Cell>} />

  <Column head={<Cell>Price / kg</Cell>} body={({ price }) => <Cell>{`$${price}`}</Cell>} />
</Table>;
```

```jsx harmony
import Table, { XUITableColumn as Column, XUITableCell as Cell } from '@xero/xui/react/table';

const data = {};
const emptyStateComponent = (
  <div
    className="xui-heading xui-textcolor-inverted xui-padding-vertical-large xui-padding-horizontal-small"
    style={{ background: 'darkslategray' }}
  >
    No fruit found... "Orange" you going to search again?
  </div>
);

<Table
  data={data}
  emptyStateComponent={emptyStateComponent}
  loaderAriaLabel="Loading more data"
  emptyMessage="Nothing to show here"
  checkOneRowAriaLabel="Select row"
  checkAllRowsAriaLabel="Select all rows"
  overflowMenuTitle="More row options"
  caption="List of fruits with color and price per kg"
>
  <Column head={<Cell>Fruit</Cell>} body={({ fruit }) => <Cell>{fruit}</Cell>} />

  <Column head={<Cell>Color</Cell>} body={({ color }) => <Cell>{color}</Cell>} />

  <Column head={<Cell>Price / kg</Cell>} body={({ price }) => <Cell>{`$${price}`}</Cell>} />
</Table>;
```
