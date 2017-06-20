/* eslint-disable no-console */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Guid from 'guid';
import checked from '@xero/xui-icon/icons/checkbox-check';
import XUIIcon from '../../icon/XUIIcon';
import DropDown from '../DropDown';
import DropDownToggled from '../DropDownToggled';
import DropDownHeader from '../DropDownHeader';
import DropDownFooter from '../DropDownFooter';
import NestedDropDown from '../NestedDropDown';
import DropDownPanel from '../DropDownPanel';
import XUIDatePicker from '../../datepicker/XUIDatePicker';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import XUIInput from '../../input/XUIInput';
import XUIButton from '../../button/XUIButton';
import XUIButtonCart from '../../button/XUIButtonCaret';

const isSelected = (item, selectedIds) => item.props.id === selectedIds || (!!selectedIds && selectedIds[item.props.id]);

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

const toggledItems = [
	{ props: { id: Guid.raw() }, text: 'a' },
	{ props: { id: Guid.raw() }, text: 'b' },
	{ props: { id: Guid.raw() }, text: 'c' },
	{ props: { id: Guid.raw() }, text: 'd' },
	{ props: { id: Guid.raw() }, text: 'e' },
	{ props: { id: Guid.raw() }, text: 'f' },
	{ props: { id: Guid.raw() }, text: 'g' },
	{ props: { id: Guid.raw() }, text: 'h' },
	{ props: { id: Guid.raw() }, text: 'i' },
	{ props: { id: Guid.raw() }, text: 'j' },
	{ props: { id: Guid.raw() }, text: 'k' },
	{ props: { id: Guid.raw() }, text: 'l' },
	{ props: { id: Guid.raw() }, text: 'm' },
	{ props: { id: Guid.raw() }, text: 'n' },
	{ props: { id: Guid.raw() }, text: 'o' },
	{ props: { id: Guid.raw() }, text: 'p' },
	{ props: { id: Guid.raw() }, text: 'q' },
	{ props: { id: Guid.raw() }, text: 'r' },
	{ props: { id: Guid.raw() }, text: 's' },
	{ props: { id: Guid.raw() }, text: 't' },
	{ props: { id: Guid.raw() }, text: 'u' },
	{ props: { id: Guid.raw() }, text: 'v' },
	{ props: { id: Guid.raw() }, text: 'w' },
	{ props: { id: Guid.raw() }, text: 'x' },
	{ props: { id: Guid.raw() }, text: 'y' },
	{ props: { id: Guid.raw() }, text: 'z' }
];

const statefulMultiselectItems = [
	[
		{ props: { id: Guid.raw(), className: 'item', disableSelectedStyles: true, multiselect: true }, text: 'Selectable Item 1' },
		{ props: { id: Guid.raw(), disableSelectedStyles: true, multiselect: true }, text: 'Selectable Item 2' },
		{ props: { id: Guid.raw(), disableSelectedStyles: true, multiselect: true }, text: 'Selectable Item 3' },
		{ props: { id: Guid.raw(), disableSelectedStyles: true, multiselect: true }, text: 'Selectable Item 4' }
	],
	[
		{ props: { id: Guid.raw(), disableSelectedStyles: true, multiselect: true }, text: 'Another Item 1' },
		{ props: { id: Guid.raw(), disableSelectedStyles: true, multiselect: true }, text: 'Another Item 2' },
		{ props: { id: Guid.raw(), disableSelectedStyles: true, multiselect: true }, text: 'Another Item 3' },
		{ props: { id: Guid.raw(), disableSelectedStyles: true, multiselect: true }, text: 'Another Item 4' }
	]
];

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
				Trigger Button <XUIButtonCart />
			</XUIButton>
		);
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
			<DropDown onSelect={this.onSelect} footer={dropdownFooter} className='dropdown-toggle-wrapper' ref={dd => this.dropdown = dd}>
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

class ToggledNestedDropdown extends Component {
	constructor() {
		super();
		this.state = {
			selectedId: null,
			currentPanel: "default",
			selectedDate: null,
			selectedItems: {
				[statefulMultiselectItems[0][1].props.id]: true
			}
		};
		this.onSelect = this.onSelect.bind(this);
		this.clearDate = this.clearDate.bind(this);
		this.onSelectDate = this.onSelectDate.bind(this);
		this.selectPanel = this.selectPanel.bind(this);
		this.closeNestedDropDown = this.closeNestedDropDown.bind(this);
		this.resetCurrentPanel = this.resetCurrentPanel.bind(this);
		this.applyCheckboxes = this.applyCheckboxes.bind(this);
		this.onOptionSelect = this.onOptionSelect.bind(this);
	}

	onSelect(value) {
		this.setState({
			selectedId: value
		});
	}

	clearDate() {
		this.dropDownToggle.closeDropDown();
		this.setState({
			selectedDate: null
		});
	}

	onSelectDate(date) {
		this.dropDownToggle.closeDropDown();
		this.setState({
			selectedDate: date,
		});
	}

	selectPanel(panelName) {
		this.setState({
			currentPanel: panelName,
		});
	}

	closeNestedDropDown() {
		this.dropDownToggle.closeDropDown();
	}

	resetCurrentPanel() {
		this.setState({
			currentPanel: 'default'
		});
	}

	applyCheckboxes() {
		console.log("Checkboxes applied");
		this.closeNestedDropDown();
	}

	onOptionSelect(value, item){
		const exampleUsage = this;
		exampleUsage.setState({
			selectedItems: {
				...exampleUsage.state.selectedItems,
				[item.props.id]: !exampleUsage.state.selectedItems[item.props.id]
			}
		});
	}

	render() {
		const exampleUsage = this;
		const {
			selectedDate,
			currentPanel
		} = exampleUsage.state;
		const trigger = (
			<XUIButton variant="negative" onClick={() => {}} data-ref="toggled_trigger">
				{selectedDate ?
					selectedDate.toDateString() :
					<span>Nested Dropdown <XUIButtonCart /></span>}
			</XUIButton>
		);

		const dropdown = (
			<NestedDropDown
				onSelect={this.onSelect}
				className='dropdown-toggle-wrapper'
				currentPanel={currentPanel}
				size="xlarge"
				headingAttributes={{
					primaryButtonContent: 'Accept',
					onPrimaryButtonClick: exampleUsage.applyCheckboxes,
					displayPrimaryButton: currentPanel === 'checkboxes',
					secondaryButtonContent: 'Cancel',
					onSecondaryButtonClick: this.closeNestedDropDown
				}}
				onPanelSelect={panelName => this.selectPanel(panelName)}
			>
				<DropDownPanel
					panelName="default"
					panelHeading="Primary filters">
					<Picklist>
						<Pickitem
							id="DatePickerOpen"
							onSelect={()=>this.selectPanel('dateMenu')}>
							Date Selection
						</Pickitem>
						<Pickitem
							id="ClearDate"
							onSelect={()=>this.clearDate()}>
							Clear filter
						</Pickitem>
					</Picklist>
					<Picklist>
						<div className="xui-separator-title xui-padding-horizontal-large xui-padding-bottom-small">Multiple lists can be added</div>
						<Pickitem
							id="dog"
							onSelect={()=>this.selectPanel('checkboxes')}>
							Checkboxes
						</Pickitem>
						<Pickitem
							id="schwifty">
							Real fake doors
						</Pickitem>
					</Picklist>
				</DropDownPanel>
				<DropDownPanel
					panelName="dateMenu"
					parentPanel="default"
					panelHeading="Date selection with a really long title">
					<Picklist>
						<Pickitem
							id="startDate"
							onSelect={()=>this.selectPanel('startDate')}>
							Start date
						</Pickitem>
						<Pickitem
							id="endDate">
							Some other button
						</Pickitem>
					</Picklist>
				</DropDownPanel>
				<DropDownPanel
					panelName="checkboxes"
					parentPanel="default"
					panelHeading="Checkboxes!"
					onSelect={exampleUsage.onOptionSelect}>
					<Picklist>
						{createItems(statefulMultiselectItems[0], exampleUsage.state.selectedItems)}
					</Picklist>
					<Picklist>
						{createItems(statefulMultiselectItems[1], exampleUsage.state.selectedItems)}
					</Picklist>
				</DropDownPanel>
				<DropDownPanel
					panelName="startDate"
					parentPanel="dateMenu"
					panelHeading="Date selection">
					<XUIDatePicker
						selectedDate={this.state.selectedDate}
						onSelectDate={date => this.onSelectDate(date)}
					/>
				</DropDownPanel>
			</NestedDropDown>
		);
		return (
			<DropDownToggled
				className="exampleClass"
				onOpen={() => {console.log('dropdown is open')}}
				trigger={trigger}
				dropdown={dropdown}
				closeOnSelect={false}
				closeOnTab={false}
				ref={dt => this.dropDownToggle = dt}
				onCloseAnimationEnd={this.resetCurrentPanel}
			/>
		);
	}
}

class WithForm extends Component {
	render() {
		const trigger = (
			<XUIButton type="button" onClick={() => {}} data-ref="toggled_trigger">
				Open Button <XUIButtonCart />
			</XUIButton>
		);
		const dropdown = (
			<DropDown>
				<form className="xui-padding">
					<div><label htmlFor="a">First: </label><input type="text" /></div>
					<div><label htmlFor="b">Second: </label><input type="text" /></div>
					<div><label htmlFor="c">Third: </label><input type="text" /></div>
				</form>
			</DropDown>
		);
		return <DropDownToggled trigger={trigger} dropdown={dropdown} closeOnTab={false} />;
	}
}

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
				Open Button <XUIButtonCart />
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

ReactDOM.render(
	<div className="xui-form-layout">
		<div className="xui-margin-bottom-large xui-panel xui-padding">
			<div className="xui-text-panelheading xui-margin-bottom">Toggled Dropdown</div>
			<p className='xui-text-label'>A simple dropdown containing a picklist.</p>
			<p className='xui-text-label'>The dropdown can be opened on click, or by pressing enter, space, or down arrow while the trigger has focus.</p>
			<p className='xui-text-label'>StatefulPicklist is applied as a wrapper for keyboard nav functionality.</p>
			{<ToggledDropDown />}
		</div>
		<div className="xui-margin-bottom-large xui-panel xui-padding">
			<div className="xui-text-panelheading xui-margin-bottom">Full Height Toggled Dropdown</div>
			<p className='xui-text-label'>The dropdown can be controlled as the above example. An additional header is present to give context and further close options.</p>
			{<FullHeightToggledDropDown />}
		</div>
		<div className="xui-margin-bottom-large xui-panel xui-padding">
			<div className="xui-text-panelheading xui-margin-bottom">Nested Dropdown</div>
			<p className="xui-text-label">This dropdown contains multiple panels that can be switched between to provide nesting. It contains examples of Datepickers and checkboxes that can be placed in a dropdown.</p>
			<p className="xui-text-label">A header is applied to nested dropdowns to allow navigation back to parent panels, and display the name of the current panel.</p>
			{<ToggledNestedDropdown />}
		</div>
		<div className="xui-margin-bottom-large xui-margin-top xui-panel xui-padding">
			<div className="xui-text-panelheading xui-margin-bottom">Simple Dropdown Styling</div>
			<p className='xui-text-label'>
				Presentational only applies XUI classes but not logic.
			</p>
			<Picklist>
				<Pickitem id="plain1">I literally come with nothing, I am just here to look pretty</Pickitem>
				<Pickitem id="plain2">Next Item</Pickitem>
				<Pickitem id="plain3" isSelected={true}>Another Item</Pickitem>
				<Pickitem id="plain4" href="http://xero.com">A Fourth Item</Pickitem>
				<Pickitem id="plain5">Last Item</Pickitem>
			</Picklist>
		</div>
		<div className="xui-margin-bottom-large xui-margin-top xui-panel xui-padding">
			<div className="xui-text-panelheading xui-margin-bottom">Dropdown with a Form Inside</div>
			<p className='xui-text-label'>
				Simple test case for putting a form in a dropdown
			</p>
			<WithForm />
		</div>
	</div>,
	document.getElementById('app')
);
