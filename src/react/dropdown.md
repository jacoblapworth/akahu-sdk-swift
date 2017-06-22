Responsive Dropdown component enabling users to select one or more items from a list. Supports custom children eg datepicker component, select lists.

### Related Components

* [Select Box](#select-box)
* [Autocompleter](#autocompleter)

#### Toggled Dropdown
A simple dropdown containing a picklist.
The dropdown can be opened on click, or by pressing enter, space, or down arrow while the trigger has focus.
StatefulPicklist is applied as a wrapper for keyboard nav functionality.
```
const checked = require ( '@xero/xui-icon/icons/checkbox-check' ).default;
const isSelected = (item, selectedIds) => item.props.id === selectedIds || (!!selectedIds && selectedIds[item.props.id]);
const { Component } = require ('react');

function createItems(items, selectedId) {
	if (Array.isArray(items)) {
		return items.map(i => createItems(i, selectedId));
	}
	return React.createElement(Pickitem, {
		...items.props,
		value: items.props.id,
		key: items.props.id,
		isSelected: isSelected(items, selectedId)
	}, items.text);
}

const toggledItems = [ 'Apricot', 'Banana', 'Cherry', 'Dragon Fruit', 'Eggplant', 'Fennel', 'Grape Fruit', 'Honeydew', 'Iceberg Lettuce', 'Jakefruit', 'Kiwi Fruit', 'Lime','Mango', 'Nectarine', 'Orange', 'Pineapple', 'Quince', 'Rapberry', 'Starfruit', 'Tmato', 'Ugl Fruit', 'ValenciaOrange', 'Watermelon', 'Xigua','Yellow quash', 'Zuchini'].map( (text,id)=> {	return { props: {id: id }, text: text }});

class ToggledDropDown extends Component {
	constructor() {
		super();
		this.state = {
			selectedId: null
		};
		this.onSelect = this.onSelect.bind(this);
	}
	onSelect(value) {
		this.setState({
			selectedId: value
		});
	}
	render() {
		const trigger = (
			<XUIButton type="button" onClick={() => {}} data-ref="toggled_trigger">
				Trigger Button <XUIButtonCaret />
			</XUIButton>
		);
		const dropdown = (
			<DropDown onSelect={this.onSelect} className='dropdown-toggle-wrapper' ref={dd => this.dropdown = dd}>
				<Picklist>
					{createItems(toggledItems, this.state.selectedId)}
				</Picklist>
			</DropDown>
		);
		return (
			<DropDownToggled
				className="exampleClass"
				onOpen={() => {console.log('dropdown is open')}}
				trigger={trigger}
				dropdown={dropdown}
			/>
		);
	}
}
<ToggledDropDown />
```

#### With Header and Footer

```
const checked = require ( '@xero/xui-icon/icons/checkbox-check' ).default;
const isSelected = (item, selectedIds) => item.props.id === selectedIds || (!!selectedIds && selectedIds[item.props.id]);
const { Component } = require ('react');

function createItems(items, selectedId) {
	if (Array.isArray(items)) {
		return items.map(i => createItems(i, selectedId));
	}
	return React.createElement(Pickitem, {
		...items.props,
		value: items.props.id,
		key: items.props.id,
		isSelected: isSelected(items, selectedId)
	}, items.text);
}

toggledItems = [ 'Apricot', 'Banana', 'Cherry', 'Dragon Fruit', 'Eggplant', 'Fennel', 'Grape Fruit', 'Honeydew', 'Iceberg Lettuce', 'Jakefruit', 'Kiwi Fruit', 'Lime','Mango', 'Nectarine', 'Orange', 'Pineapple', 'Quince', 'Rapberry', 'Starfruit', 'Tmato', 'Ugl Fruit', 'ValenciaOrange', 'Watermelon', 'Xigua','Yellow quash', 'Zuchini'].map( (text,id)=> {	return { props: {id: id }, text: text }});

class XDD extends Component {
	constructor() {
		super();
		this.state = {
			selectedId: null
		};
		this.onSelect = this.onSelect.bind(this);
	}
	onSelect(value) {
		this.setState({
			selectedId: value
		});
	}

	render() {
		const dropdownHeader = <DropDownHeader
			title="Filter Those states:"
			onSecondaryButtonClick={() => this._dropdownToggled.closeDropDown()}
			onPrimaryButtonClick={this.onSelect}
			displayPrimaryButton={true}
			primaryButtonContent={<XUIIcon path={checked} inline={true}/>}
		>
			<div>
				<XUIInput className="xui-u-fullwidth"
					type="search"
					placeholder="Im a fake search box"
				/>
			</div>
		</DropDownHeader>;

		const dropdownFooter = (<DropDownFooter><Picklist>
			<Pickitem id="footerAction">+ Add New Field</Pickitem>
			</Picklist>
		</DropDownFooter>);

		const trigger = (
			<XUIButton type="button" onClick={() => {}} data-ref="toggled_trigger">
				Trigger Button <XUIButtonCaret />
			</XUIButton>
		);
		const dropdown = (
			<DropDown onSelect={this.onSelect} className='dropdown-toggle-wrapper' ref={dd => this.dropdown = dd} header={dropdownHeader} footer={dropdownFooter}>
				<Picklist>
					{createItems(toggledItems, this.state.selectedId)}
				</Picklist>
			</DropDown>
		);
		return (
			<DropDownToggled
				className="exampleClass"
				onOpen={() => {console.log('dropdown is open')}}
				trigger={trigger}
				dropdown={dropdown}
			/>
		);
	}
}
<XDD />
```


### Dropdown with date
```
const XUIDatePicker = require('./datepicker').default;
const PropTypes = require('prop-types');

const today = new Date();
const lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7);
const nextMonth = new Date();
nextMonth.setMonth(nextMonth.getMonth() + 1);

class ExamplePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: null
    };

		this.onSelectDate = newDate => {
				this.setState({
					selectedDate: newDate
				});
		}
  }

  render() {
    const calendarProps = {
      displayedMonth: today,
      onSelectDate: this.onSelectDate,
    };
		calendarProps.selectedDate = this.state.selectedDate;
    return (
      <div>
        <XUIDatePicker {...calendarProps} />
      </div>
    );
  }
}



		const trigger = (
			<XUIButton type="button" onClick={() => {}} data-ref="toggled_trigger">
				Open DropDown with date <XUIButtonCaret />
			</XUIButton>
		);
		const dropdown = (
			<DropDown onSelect={this.onSelect} className='dropdown-toggle-wrapper' ref={dd => this.dropdown = dd} >

					 <ExamplePicker />

			</DropDown>
		);


					<DropDownToggled
				className="exampleClass"
				onOpen={() => {console.log('dropdown is open')}}
				trigger={trigger}
				dropdown={dropdown}
			/>

```

### Nested DropDown

```
```

```js
class FullHeightToggledDropDown extends Component {
	constructor() {
		super();
		this.state = {
			selectedId: null
		};
		this.onSelect = this.onSelect.bind(this);
	}
	onSelect(value) {
		this.setState({
			selectedId: value
		});
	}
	render() {
		const trigger = (
			<XUIButton type="button" onClick={() => {}} data-ref="toggled_trigger">
				Open Button <XUIButtonCaret />
			</XUIButton>
		);
		const dropdownHeader = <DropDownHeader
			title="Full Height Responsive Example"
			onSecondaryButtonClick={() => this._dropdownToggled.closeDropDown()}
			onPrimaryButtonClick={this.onSelect}
			displayPrimaryButton={true}
			primaryButtonContent={<XUIIcon path={checked} inline={true}/>}
		>
			<div>
				<XUIInput
					type="search"
					placeholder="Im a fake search box"
				/>
			</div>
		</DropDownHeader>;
		const dropdownFooter = (
			<DropDownFooter>
				<div className="xui-padding-horizontal xui-pading-vertical-xsmall">
					<XUIButton
						variant="link"
						className="xui-margin-xsmall-vertical">
						This is an example of a good footer
					</XUIButton>
				</div>
			</DropDownFooter>
		);
		const dropdown = (
			<DropDown
				onSelect={this.onSelect}
				header={dropdownHeader}
				footer={dropdownFooter}>
				<Picklist>
					{createItems(toggledItems, this.state.selectedId)}
				</Picklist>
			</DropDown>
		);
		return (
			<DropDownToggled
				onOpen={() => console.log('dropdown is open.')}
				trigger={trigger}
				dropdown={dropdown}
				ref={c => this._dropdownToggled = c}
			/>
		);
	}
}




<div className="xui-margin-bottom-large xui-panel xui-padding">
	<div className="xui-text-panelheading xui-margin-bottom">Full Height Toggled Dropdown</div>
	<p className='xui-text-label'>The dropdown can be controlled as the above example. An additional header is present to give context and further close options.</p>
	{<FullHeightToggledDropDown />}
</div>

```
