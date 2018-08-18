<div class="xui-margin-vertical">
		<a href="../section-compounds-displayingdata-table.html" isDocLink>Table component in the XUI Documentation</a>
</div>

The Table scaffold is a convent way to layout data sets with an *accessible* and *responsive design* mindset.

The scaffold is broken up into three key components.<br />`import XUITable, { XUITableColumn, XUITableCell } from '@xero/xui/react/table';`

## Basic

The bare minimum *Table* component requires a data schema and a basic *Column* / *Cell* combination.

The `data` prop requires an object with **unique** keys that differentiate each row.

Each *Cell* inside the *Column* `body` prop is a function that passes through each rows `data` independently so you can cheery pick the relevant content for a particular *Cell*.

```
const {
	default: Table,
	XUITableColumn: Column,
	XUITableCell: Cell,
} = require('./table');

<Table data={ {
	abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99 }
} }>

	<Column
		head={ <Cell>Fruit</Cell> }
		body={ ({ fruit }) => <Cell>{ fruit }</Cell> }
	/>

	<Column
		head={ <Cell>Color</Cell> }
		body={ ({ color }) => <Cell>{ color }</Cell> }
	/>

	<Column
		head={ <Cell>Price / kg</Cell> }
		body={ ({ price }) => <Cell>{`$${price}`}</Cell> }
	/>

</Table>
```

If there is no *JSX* supplied to **any** *Column* `head` prop the *Table* `<th />` *Cells* will **not** be rendered.

```
const {
	default: Table,
	XUITableColumn: Column,
	XUITableCell: Cell,
} = require('./table');

<Table data={ {
	abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99 }
} }>
	<Column body={ ({ fruit }) => <Cell>{ fruit }</Cell> } />
	<Column body={ ({ color }) => <Cell>{ color }</Cell> } />
	<Column body={ ({ price }) => <Cell>{`$${price}`}</Cell> } />
</Table>
```

## Responsive

The `isResponsive` tag allows the *Table* to become horizontally scrollable when the amount of *Column* content causes an overflow.

```
const {
	default: Table,
	XUITableColumn: Column,
	XUITableCell: Cell,
} = require('./table');

<Table
	data={ {
		abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99, purchased: 'John Smith', ordered: 1519865730672, delivered: 1520124930672, quantity: 128, address: '1 Watt St, Parnell, Auckland, 1052', paid: true }
	} }
	isResponsive>

	<Column
		head={ <Cell>Fruit</Cell> }
		body={ ({ fruit }) => <Cell>{ fruit }</Cell> }
	/>

	<Column
		head={ <Cell>Color</Cell> }
		body={ ({ color }) => <Cell>{ color }</Cell> }
	/>

	<Column
		head={ <Cell>Ordered On</Cell> }
		body={ ({ ordered }) => <Cell>{ new Date(ordered).toDateString() }</Cell> }
	/>

	<Column
		head={ <Cell>Delivered On</Cell> }
		body={ ({ delivered }) => <Cell>{ new Date(delivered).toDateString() }</Cell> }
	/>

	<Column
		head={ <Cell>Sent To</Cell> }
		body={ ({ address }) => <Cell>{ address }</Cell> }
	/>

	<Column
		head={ <Cell>Quantity</Cell> }
		body={ ({ quantity }) => <Cell>{`x${quantity} units`}</Cell> }
	/>

	<Column
		head={ <Cell>Purchased By</Cell> }
		body={ ({ purchased }) => <Cell>{ purchased }</Cell> }
	/>

	<Column
		head={ <Cell>Price / kg</Cell> }
		body={ ({ price }) => <Cell>{`$${price}`}</Cell> }
	/>

	<Column
		head={ <Cell>Total Cost</Cell> }
		body={ ({ price, quantity }) => <Cell>{`$${price * quantity}`}</Cell> }
	/>

	<Column
		head={ <Cell>Paid</Cell> }
		body={ ({ paid }) => <Cell>{ paid ? 'Yes' : 'No' }</Cell> }
	/>

</Table>
```

## Truncation

Changes overflowing *Column* content into a truncated *Column* view if a reasonable amount of legibility can still be maintained.

```
const {
	default: Table,
	XUITableColumn: Column,
	XUITableCell: Cell,
} = require('./table');

<Table
	data={ {
		abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99, purchased: 'John Smith', ordered: 1519865730672, delivered: 1520124930672, quantity: 128, address: '1 Watt St, Parnell, Auckland, 1052', paid: true }
	} }
	isResponsive
	isTruncated>

	<Column
		head={ <Cell>Fruit</Cell> }
		body={ ({ fruit }) => <Cell>{ fruit }</Cell> }
	/>

	<Column
		head={ <Cell>Color</Cell> }
		body={ ({ color }) => <Cell>{ color }</Cell> }
	/>

	<Column
		head={ <Cell>Ordered On</Cell> }
		body={ ({ ordered }) => <Cell>{ new Date(ordered).toDateString() }</Cell> }
	/>

	<Column
		head={ <Cell>Delivered On</Cell> }
		body={ ({ delivered }) => <Cell>{ new Date(delivered).toDateString() }</Cell> }
	/>

	<Column
		head={ <Cell>Sent To</Cell> }
		body={ ({ address }) => <Cell>{ address }</Cell> }
	/>

	<Column
		head={ <Cell>Quantity</Cell> }
		body={ ({ quantity }) => <Cell>{`x${quantity} units`}</Cell> }
	/>

	<Column
		head={ <Cell>Purchased By</Cell> }
		body={ ({ purchased }) => <Cell>{ purchased }</Cell> }
	/>

	<Column
		head={ <Cell>Price / kg</Cell> }
		body={ ({ price }) => <Cell>{`$${price}`}</Cell> }
	/>

	<Column
		head={ <Cell>Total Cost</Cell> }
		body={ ({ price, quantity }) => <Cell>{`$${price * quantity}`}</Cell> }
	/>

	<Column
		head={ <Cell>Paid</Cell> }
		body={ ({ paid }) => <Cell>{ paid ? 'Yes' : 'No' }</Cell> }
	/>

</Table>
```

## Wrapping

Wrapping can be defined on a per *Cell* basis using the `hasWrapping` prop. By default a *Cell* is **not** multiline.

**Note:** Wrapping will revert to a single line format when `isTruncated` or a row has an interaction created from `onRowClick`.

```
const {
	default: Table,
	XUITableColumn: Column,
	XUITableCell: Cell,
} = require('./table');

<Table
	data={ {
		abc123: { fruit: 'Banana', color: 'Yellow', description: 'There was once a little banana, That lived in a grocery store, He loved to hang out with the other fruits, But mostly to explore.', price: 2.99 }
	} }>

	<Column
		head={ <Cell>Fruit</Cell> }
		body={ ({ fruit }) => <Cell>{ fruit }</Cell> }
	/>

	<Column
		head={ <Cell>Color</Cell> }
		body={ ({ color }) => <Cell>{ color }</Cell> }
	/>

	<Column
		head={ <Cell>Description</Cell> }
		body={ ({ description }) => <Cell hasWrapping>{ description }</Cell> }
	/>

	<Column
		head={ <Cell>Price / kg</Cell> }
		body={ ({ price }) => <Cell>{`$${price}`}</Cell> }
	/>

</Table>
```

## Custom CSS Classes

Pass the `className` prop to the `<XUITable>` to add CSS classes to the outer most element of the the *Table* scaffold.

```
const {
	default: Table,
	XUITableColumn: Column,
	XUITableCell: Cell,
} = require('./table');

const node = document.createElement('style');

node.innerHTML = (`
.xui-table-reactdocs-shadow {
	box-shadow: 0 0 0 1px rgba(50,70,90,0.2), 0 8px 16px 0 rgba(50,70,90,0.2);
}
`);
document.head.appendChild(node);

<Table
	data={ {
		abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99 }
	} }
	className="xui-table-reactdocs-shadow">

	<Column
		head={ <Cell>Fruit</Cell> }
		body={ ({ fruit }) => <Cell>{ fruit }</Cell> }
	/>

	<Column
		head={ <Cell>Color</Cell> }
		body={ ({ color }) => <Cell>{ color }</Cell> }
	/>

	<Column
		head={ <Cell>Price / kg</Cell> }
		body={ ({ price }) => <Cell>{`$${price}`}</Cell> }
	/>

</Table>
```

Pass the `className` prop to the `<XUITableCell>` to add CSS classes to each *Cell* on an individual basis.

```
const {
	default: Table,
	XUITableColumn: Column,
	XUITableCell: Cell,
} = require('./table');

<Table
	data={ {
		abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99, paid: true },
		def456: { fruit: 'Apple', color: 'Red', price: 3.49, paid: false }
	} }>

	<Column
		head={ <Cell>Fruit</Cell> }
		body={ ({ fruit }) => <Cell>{ fruit }</Cell> }
	/>

	<Column
		head={ <Cell>Color</Cell> }
		body={ ({ color }) => <Cell>{ color }</Cell> }
	/>

	<Column
		head={ <Cell className="xui-heading-large">Price / kg</Cell> }
		body={ ({ price, paid }) => <Cell className={ paid ? 'xui-textcolor-positive' : 'xui-textcolor-negative'}>{`$${price}`}</Cell> }
	/>

</Table>
```

## Checkboxes

Prepend the table rows with a check box action with the `hasCheckbox` prop.

Each rows *Checked* state is derived from checking for *"truthy"* row key / value pairs in the `checkedIds` prop.

Interactions for the *"master"* and *"single"* checkbox toggles can be handled using the `onCheckAllToggle` and `onCheckOneToggle` props.

```
const {
	default: Table,
	XUITableColumn: Column,
	XUITableCell: Cell,
} = require('./table');

class Demo extends React.Component {

	constructor() {
		super();
		this.state = { checkedIds: { abc123: true, def456: false } };
		this.handleCheckAllToggle = this.handleCheckAllToggle.bind(this);
		this.handleCheckOneToggle = this.handleCheckOneToggle.bind(this);
	}

	handleCheckAllToggle() {
		const { checkedIds } = this.state;
		const { data } = this.props;
		const dataKeys = Object.keys(data);
		const totalData = dataKeys.length;
		const totalChecked = Object.keys(checkedIds).reduce((acc, key) => (checkedIds[key] ? acc + 1 : acc), 0);
		if (totalData === totalChecked) {
			this.setState({ checkedIds: {} });
		} else {
			this.setState({ checkedIds: dataKeys.reduce((acc, key) => ({ ...acc, [key]: true }), {}) });
		}
	};

	handleCheckOneToggle(event, _id) {
		const { checkedIds } = this.state;
		const isChecked = Boolean(checkedIds[_id]);
		this.setState(() => ({ checkedIds: { ...checkedIds, [_id]: !isChecked } }));
	};

	render() {
		return (
			<Table
				data={ this.props.data }
				hasCheckbox
				checkedIds={ this.state.checkedIds }
				onCheckAllToggle={ this.handleCheckAllToggle }
				onCheckOneToggle={ this.handleCheckOneToggle }>

				<Column
					head={ <Cell>Fruit</Cell> }
					body={ ({ fruit }) => <Cell>{ fruit }</Cell> }
				/>

				<Column
					head={ <Cell>Color</Cell> }
					body={ ({ color }) => <Cell>{ color }</Cell> }
				/>

				<Column
					head={ <Cell>Price / kg</Cell> }
					body={ ({ price }) => <Cell>{`$${price}`}</Cell> }
				/>

			</Table>
		);
	}
}

<Demo data={ {
	abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99 },
	def456: { fruit: 'Apple', color: 'Red', price: 3.49, paid: false }
} }/>
```

## Overflow Menu

Append the table rows with a XUI *Overflow Menu* action with the `hasOverflowMenu` prop.

Each row can generate a unique set of menu items by supplying the `createOverflowMenu` prop.

**Note:** If there are no menu items are generated the *Overflow Menu* will not be rendered for that row.

```
const {
	default: Table,
	XUITableColumn: Column,
	XUITableCell: Cell,
} = require('./table');
const { Pickitem } = require ( './picklist.js' );

<Table data={ {
	abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99, paid: true },
	def456: { fruit: 'Apple', color: 'Red', price: 3.49, paid: false }
} }
hasOverflowMenu
createOverflowMenu={ ({ fruit, paid }) => !paid && ([
	<Pickitem
		key="0"
		id="0"
		onClick={ () => alert(`Pay for ${fruit}s`) }>
		Pay for {fruit}'s
	</Pickitem>
]) }>

	<Column
		head={ <Cell>Fruit</Cell> }
		body={ ({ fruit }) => <Cell>{ fruit }</Cell> }
	/>

	<Column
		head={ <Cell>Color</Cell> }
		body={ ({ color }) => <Cell>{ color }</Cell> }
	/>

	<Column
		head={ <Cell>Price / kg</Cell> }
		body={ ({ price }) => <Cell>{`$${price}`}</Cell> }
	/>

</Table>
```

## Pinned Actions

If an **action** column is **active** in the *Table* it can be pinned to the relevant side of the scaffold.

+ **Checkboxes** are pinned to the left of the scaffold by using the `hasPinnedFirstColumn` prop.
+ **Overflow Menu** are pinned to the right of the scaffold by using the `hasPinnedLastColumn` prop.

```
const {
	default: Table,
	XUITableColumn: Column,
	XUITableCell: Cell,
} = require('./table');
const { Pickitem } = require ( './picklist.js' );
const XUIButton = require('./button').default;
const XUIIcon = require('./icon').default;
const tickIcon = require('@xero/xui-icon/icons/checkbox-check').default;

class Demo extends React.Component {

	constructor() {
		super();
		this.state = { checkedIds: {} };
		this.handleCheckAllToggle = this.handleCheckAllToggle.bind(this);
		this.handleCheckOneToggle = this.handleCheckOneToggle.bind(this);
	}

	handleCheckAllToggle() {
		const { checkedIds } = this.state;
		const { data } = this.props;
		const dataKeys = Object.keys(data);
		const totalData = dataKeys.length;
		const totalChecked = Object.keys(checkedIds).reduce((acc, key) => (checkedIds[key] ? acc + 1 : acc), 0);
		if (totalData === totalChecked) {
			this.setState({ checkedIds: {} });
		} else {
			this.setState({ checkedIds: dataKeys.reduce((acc, key) => ({ ...acc, [key]: true }), {}) });
		}
	};

	handleCheckOneToggle(event, _id) {
		const { checkedIds } = this.state;
		const isChecked = Boolean(checkedIds[_id]);
		this.setState(() => ({ checkedIds: { ...checkedIds, [_id]: !isChecked } }));
	};

	render() {
		return (
			<Table
				data={ this.props.data }
				isResponsive
				hasPinnedFirstColumn
				hasPinnedLastColumn
				hasCheckbox
				checkedIds={ this.state.checkedIds }
				onCheckAllToggle={ this.handleCheckAllToggle }
				onCheckOneToggle={ this.handleCheckOneToggle }
				shouldRowClick={ ({ fruit }) => (fruit === 'Banana') }
				onRowClick={ (event, { fruit }) => alert(`You clicked the ${fruit} row`) }
				hasOverflowMenu
				createOverflowMenu={ ({fruit}) => ([
					<Pickitem
						key="0"
						id="0"
						onClick={ () => alert(`Edit ${fruit}`) }>
						{`Edit ${fruit}`}
					</Pickitem>
				]) }>

				<Column
					head={ <Cell>Fruit</Cell> }
					body={ ({ fruit }) => <Cell>{ fruit }</Cell> }
				/>

				<Column
					head={ <Cell>Color</Cell> }
					body={ ({ color }) => <Cell>{ color }</Cell> }
				/>

				<Column
					head={ <Cell>Ordered On</Cell> }
					body={ ({ ordered }) => <Cell>{ new Date(ordered).toDateString() }</Cell> }
				/>

				<Column
					head={ <Cell>Delivered On</Cell> }
					body={ ({ delivered }) => <Cell>{ new Date(delivered).toDateString() }</Cell> }
				/>

				<Column
					head={ <Cell>Sent To</Cell> }
					body={ ({ address }) => <Cell>{ address }</Cell> }
				/>

				<Column
					head={ <Cell>Quantity</Cell> }
					body={ ({ quantity }) => <Cell>{`x${quantity} units`}</Cell> }
				/>

				<Column
					head={ <Cell>Purchased By</Cell> }
					body={ ({ purchased }) => <Cell>{ purchased }</Cell> }
				/>

				<Column
					head={ <Cell>Price / kg</Cell> }
					body={ ({ price }) => (
						<Cell onCellClick={ () => alert(`You clicked $${price}`) }>
							{`$${price}`}
							<XUIButton
								title="select"
								className="xui-margin-left"
								size="small"
								onClick={event => event.stopPropagation()}
								onKeyDown={event => event.stopPropagation()}
								onPointerOver={event => event.stopPropagation()}>
								<XUIIcon icon={tickIcon} />
							</XUIButton>
						</Cell>
					) }
				/>

				<Column
					head={ <Cell>Total Cost</Cell> }
					body={ ({ price, quantity }) => <Cell>{`$${price * quantity}`}</Cell> }
				/>

				<Column
					head={ <Cell>Paid</Cell> }
					body={ ({ paid }) => <Cell>{ paid ? 'Yes' : 'No' }</Cell> }
				/>

			</Table>
		);
	}
}

<Demo data={ {
	abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99, purchased: 'John Smith', ordered: 1519865730672, delivered: 1520124930672, quantity: 128, address: '1 Watt St, Parnell, Auckland, 1052', paid: true },
	def456: { fruit: 'Apple', color: 'Red', price: 3.49, purchased: 'Jane Doe', ordered: 7645456634323, delivered: 7645456634323, quantity: 45, address: '19-23 Taranaki St, Te Aro, Wellington, 6011', paid: false }
} }/>
```

## Sorting

Convert *Column* `head` cells into buttons with sorting functionality by introducing the following props.

+ `sortKey` affiliates a `head` *Cell* with a key value in the `data` schema.
+ `activeSortKey` determines which `sortKey` should be used to sort the *Table* rows.
+ `isSortAsc` defines the sort order to be *ascending* / *descending*.

### Custom sorting

By default sorting is determined by a generic [sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) function. This provides basic alphabetical and numerical ordering out of the box.

By supplying the `customSort` prop you can create your own custom sort system. In this example we are sorting the `tags` column based on the length of the supplied array in each row.

```
const {
	default: Table,
	XUITableColumn: Column,
	XUITableCell: Cell,
} = require('./table');

class Demo extends React.Component {

	constructor() {
		super();
		this.state = { activeSortKey: 'fruit', isSortAsc: true };
		this.handleSortChange = this.handleSortChange.bind(this);
	}

	handleSortChange(newKey) {
		const { activeSortKey: oldKey, isSortAsc: oldIsAsc } = this.state;
		const newIsAsc = oldKey === newKey ? !oldIsAsc : true;
		this.setState({ activeSortKey: newKey, isSortAsc: newIsAsc });
	};

	handleTagSort(data, isAsc) {
		const comparison = isAsc
			? (a, b) => a.tags.length > b.tags.length
			: (a, b) => a.tags.length < b.tags.length;
		return data.sort((a, b) => comparison(a, b) ? 1 : -1);
	}

	render() {
		const { activeSortKey, isSortAsc } = this.state;
		return (
			<Table
				data={ this.props.data }
				activeSortKey={ activeSortKey }
				isSortAsc={ isSortAsc }
				onSortChange={ this.handleSortChange }
				customSort={ activeSortKey === 'tags' ? this.handleTagSort : null }>

				<Column
					head={ <Cell sortKey="fruit">Fruit</Cell> }
					body={ ({ fruit }) => <Cell>{ fruit }</Cell> }
				/>

				<Column
					head={ <Cell sortKey="color">Color</Cell> }
					body={ ({ color }) => <Cell>{ color }</Cell> }
				/>

				<Column
					head={ <Cell sortKey="tags">Tags</Cell> }
					body={ ({ tags }) => (
						<Cell>
							{ tags.map(({ name, variant }, index) => (
								<XUITag
									key={ index }
									className="xui-margin-right-xsmall"
									variant={ variant }>
									{ name }
								</XUITag>
							)) }
						</Cell>
					) }
				/>

				<Column
					head={ <Cell sortKey="price">Price / kg</Cell> }
					body={ ({ price }) => <Cell>{`$${price}`}</Cell> }
				/>

			</Table>
		);
	}
}

<Demo data={ {
	abc123: { fruit: 'Banana', color: 'Yellow', tags: [{ name: 'Foo', variant: 'positive' }, { name: 'Bar', variant: 'warning' }, { name: 'Baz', variant: 'negative' }], price: 2.99 },
	def456: { fruit: 'Apple', color: 'Red', tags: [{ name: 'Foo', variant: 'positive' }, { name: 'Bar', variant: 'warning' }], price: 3.49 },
	ghi789: { fruit: 'Carrot', color: 'Orange', tags: [{ name: 'Foo', variant: 'positive' }], price: 1.49 },
} }/>
```

## Header / Footer

Inject custom *JSX* into the header and footer area of the *Table* with the `header` and `footer` props.

```
const {
	default: Table,
	XUITableColumn: Column,
	XUITableCell: Cell,
} = require('./table');

const Appendage = ({ children }) => (
	<div
		className="xui-heading xui-textcolor-inverted xui-padding-vertical-large xui-padding-horizontal-small"
		style={ { background: 'darkslategray' } }>
		{ children }
	</div>
);

<Table
	data={ {
		abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99 }
	} }
	header={ <Appendage>Header</Appendage> }
	footer={ <Appendage>Footer</Appendage> }>

	<Column
		head={ <Cell>Fruit</Cell> }
		body={ ({ fruit }) => <Cell>{ fruit }</Cell> }
	/>

	<Column
		head={ <Cell>Color</Cell> }
		body={ ({ color }) => <Cell>{ color }</Cell> }
	/>

	<Column
		head={ <Cell>Price / kg</Cell> }
		body={ ({ price }) => <Cell>{`$${price}`}</Cell> }
	/>

</Table>
```

## Loader

Appends a `<XUILoader />` after the last *Row* in the *Table* with the `isLoading` prop.

```
const {
	default: Table,
	XUITableColumn: Column,
	XUITableCell: Cell,
} = require('./table');

<Table
	data={ {
		abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99 }
	} }
	isLoading>

	<Column
		head={ <Cell>Fruit</Cell> }
		body={ ({ fruit }) => <Cell>{ fruit }</Cell> }
	/>

	<Column
		head={ <Cell>Color</Cell> }
		body={ ({ color }) => <Cell>{ color }</Cell> }
	/>

	<Column
		head={ <Cell>Price / kg</Cell> }
		body={ ({ price }) => <Cell>{`$${price}`}</Cell> }
	/>

</Table>
```

## Interactions

Add *Cell* and row interactions using the `onCellClick` and `onRowClick` props.

The `onRowClick` prop works in conjunction with the `shouldRowClick` prop to determine if the current row should have a click the click handler applied to it.

**Note:**
+ A *Cell* interaction will be ** overridden** if its parent row has an interaction on it (**not** nesting links inside links). This can be seen in the below example where the *"Banana"* row has no *Cell* interactions even though they were requested.
+ You can nest interaction items (`<button />`, `<a />`) inside of a cell and ignore the generic cell states (e.g `:hover`). Just make sure you `stopPropagation` on the nested interaction elements _(see example below)_.

```
const {
	default: Table,
	XUITableColumn: Column,
	XUITableCell: Cell,
} = require('./table');
const XUIButton = require('./button').default;
const XUIIcon = require('./icon').default;
const tickIcon = require('@xero/xui-icon/icons/checkbox-check').default;
const handleCellClick = ({price}) => alert(`You clicked $${price}`);

<Table
	data={ {
		abc123: { fruit: 'Banana', color: 'Yellow', price: 2.99 },
		def456: { fruit: 'Apple', color: 'Red', price: 3.49 }
	} }
	shouldRowClick={ ({ fruit }) => (fruit === 'Banana') }
	onRowClick={ (event, { fruit }) => alert(`You clicked the ${fruit} row`) }>

	<Column
		head={ <Cell>Fruit</Cell> }
		body={ ({ fruit }) => <Cell onCellClick={ () => alert(`You clicked ${fruit}`) }>{ fruit }</Cell> }
	/>

	<Column
		head={ <Cell>Color</Cell> }
		body={ ({ color }) => (
			<Cell onCellClick={ () => alert(`You clicked ${color}`) }>
				{ color },
				<a
					href="#"
					className="xui-text-link"
					onClick={event => event.stopPropagation()}
					onKeyDown={event => event.stopPropagation()}
					onPointerOver={event => event.stopPropagation()}>
					more
				</a>
			</Cell>
		) }
	/>

	<Column
		head={ <Cell>Price / kg</Cell> }
		body={ ({ price }) => (
			<Cell onCellClick={handleCellClick}>
				{`$${price}`}
				<XUIButton
					title="select"
					className="xui-margin-left"
					size="small"
					onClick={event => event.stopPropagation()}
					onKeyDown={event => event.stopPropagation()}
					onPointerOver={event => event.stopPropagation()}>
					<XUIIcon icon={tickIcon} />
				</XUIButton>
			</Cell>
		) }
	/>

</Table>
```

## Empty State

When there is no data in which to generate *Rows* as part of the table `<tbody />` a **default** *"Empty State"* is shown.

You can customise the default message with the `emptyMessage` prop.

```
const {
	default: Table,
	XUITableColumn: Column,
	XUITableCell: Cell,
} = require('./table');

<Table
	data={ {} }
	emptyMessage="There are no fruit results">

	<Column
		head={ <Cell>Fruit</Cell> }
		body={ ({ fruit }) => <Cell>{ fruit }</Cell> }
	/>

	<Column
		head={ <Cell>Color</Cell> }
		body={ ({ color }) => <Cell>{ color }</Cell> }
	/>

	<Column
		head={ <Cell>Price / kg</Cell> }
		body={ ({ price }) => <Cell>{`$${price}`}</Cell> }
	/>

</Table>
```

Alternatively you can supply a completely new empty state node to replace the default aesthetic with the `emptyStateComponent` prop.

```
const {
	default: Table,
	XUITableColumn: Column,
	XUITableCell: Cell,
} = require('./table');

const emptyStateComponent = (
	<div
		className="xui-heading xui-textcolor-inverted xui-padding-vertical-large xui-padding-horizontal-small"
		style={ { background: 'darkslategray' } }>
		No fruit found... "Orange" you going to search again?
	</div>
);

<Table
	data={ {} }
	emptyStateComponent={emptyStateComponent}>

	<Column
		head={ <Cell>Fruit</Cell> }
		body={ ({ fruit }) => <Cell>{ fruit }</Cell> }
	/>

	<Column
		head={ <Cell>Color</Cell> }
		body={ ({ color }) => <Cell>{ color }</Cell> }
	/>

	<Column
		head={ <Cell>Price / kg</Cell> }
		body={ ({ price }) => <Cell>{`$${price}`}</Cell> }
	/>

</Table>
```
