`DropDownHeader` and `DropDownFooter` are used to add a fixed header and/or footer element to dropdowns. These elements don't scroll with the rest of the list, and are ignored by the default arrow key handlers. Add these components via the `header` and `footer` props in `DropDown`.

If you've included any actions in the header or footer, set the `closeOnTab` property of `DropDownToggled` to `false`, so users navigating by keyboard are able to access them.

```jsx
const DropDownToggled = require('./DropDownToggled').default;
const DropDownFooter = require('./DropDownFooter').default;
const Pickitem = require('../picklist/Pickitem').default;
const XUIIcon = require('../icon/XUIIcon').default;
const checked = require ( '@xero/xui-icon/icons/checkbox-check' ).default;
const searchPath = require ( '@xero/xui-icon/icons/search' ).default;
const plusIcon = require ( '@xero/xui-icon/icons/plus' ).default;
const { Component } = require ('react');

const items = ['Apricot', 'Banana', 'Cherry', 'Dragon Fruit', 'Eggplant', 'Fennel', 'Grapefruit', 'Honeydew', 'Iceberg Lettuce', 'Jackfruit', 'Kiwifruit', 'Lime','Mango', 'Nectarine', 'Orange', 'Pineapple', 'Quince', 'Rapberry', 'Starfruit', 'Tomato', 'Uglifruit', 'Valencia Orange', 'Watermelon', 'Xi gua','Yellow quash', 'Zucchini'].map( (text,id) => {
	return { id, text };
});

const getNumberOfTrueValues = items => Object.keys(items).filter(key => !!items[key]).length;

class XDD extends Component {
	constructor() {
		super();

		const selected = {};

		items.forEach(item => selected[item.id]=false);

		this.state = {
			items,
			search: '',
			selected,
			selectedCount: 0,
		};

		this.onApplyClick = this.onApplyClick.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.closeDropDown = this.closeDropDown.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onOpen = this.onOpen.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onSearchKeyDown = this.onSearchKeyDown.bind(this);
	}

	onSearch(event) {
		const val = event.target.value;
		this.setState({
			search: val,
			items: items.filter(item => item.text.toLowerCase().indexOf(val.toLowerCase()) > -1),
		});
	}

	onSearchKeyDown(event) {
		// Allow users to type spaces without selecting
		if (event.keyCode !== 32) {
			this.dropdown.onKeyDown(event);
		}
	}

	onSelect(value) {
		this.setState(state => ({
			selected: {
				...state.selected,
				[value]: !state.selected[value],
			},
		}));
	}

	closeDropDown() {
		this.ddt.closeDropDown();
	}

	onApplyClick() {
		this.setState(state => ({
			selectedCount: getNumberOfTrueValues(state.selected),
			previousSelected: null
		}));
		this.closeDropDown();
	}

	onClose() {
		this.setState(state => {
			const newSelected = state.previousSelected != null ? state.previousSelected : state.selected;
			return {
				selected: newSelected,
				previousSelected: null,
				selectedCount: getNumberOfTrueValues(newSelected),
				search: '',
				items: items
			};
		});
	}

	onOpen() {
		this.setState(state => ({
			previousSelected: state.selected
		}))
	}

	render() {
		const { items, search } = this.state;
		const dropdownHeader = (
			<DropDownHeader
				title="Select Fruit"
				onSecondaryButtonClick={this.closeDropDown}
				onPrimaryButtonClick={this.onApplyClick}
				primaryButtonContent="Apply"
				secondaryButtonContent="Cancel"
			>
				<XUITextInput
					ref={c => this.searchComponent = c}
					placeholder="Search"
					type="search"
					value={this.search}
					onKeyDown={this.onSearchKeyDown}
					onChange={this.onSearch}
					isBorderlessSolid
					fieldClassName="xui-u-fullwidth"
					leftElement={
						<XUITextInputSideElement type="icon">
							<XUIIcon icon={searchPath} isBoxed />
						</XUITextInputSideElement>
					}
				/>
			</DropDownHeader>
		);

		const dropdownFooter = (
			<DropDownFooter
				pickItems={(
					<Pickitem id="footerAction">
						<span>
							<XUIIcon
								isInline
								isBoxed
								icon={plusIcon}
								className="xui-margin-right-xsmall"
							/>
							Add New Fruit
							</span>
					</Pickitem>
				)} />
		);

		const trigger = (
			<XUIButton>
				{this.state.selectedCount > 0 ? `${this.state.selectedCount} items selected` : 'Toggle Button'}
				<XUIButtonCaret />
			</XUIButton>
		);
		const dropdown = (
			<DropDown
				ref={c => this.dropdown = c}
				onSelect={this.onSelect}
				header={dropdownHeader}
				footer={dropdownFooter}
				size="large"
				hasKeyboardEvents={false}
				fixedWidth
			>
				<Picklist>
					{items.map(item => (
						<Pickitem
							key={item.id}
							id={item.id}
							value={item.id}
							isSelected={this.state.selected[item.id]}
							isMultiselect
						>
							{item.text}
						</Pickitem>
					))}
				</Picklist>
			</DropDown>
		);
		return (
			<DropDownToggled
				ref={c => this.ddt = c}
				onOpenAnimationEnd={() => this.searchComponent.focus()}
				trigger={trigger}
				dropdown={dropdown}
				closeOnSelect={false}
				closeOnTab={false}
				onClose={this.onClose}
				onOpen={this.onOpen}
			/>
		);
	}
}
<XDD />
```
