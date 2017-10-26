/* eslint-disable no-console */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import checked from '@xero/xui-icon/icons/checkbox-check';
import search from '@xero/xui-icon/icons/search';
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
	{ props: { id: uuidv4() }, text: 'a' },
	{ props: { id: uuidv4() }, text: 'b' },
	{ props: { id: uuidv4() }, text: 'c' },
	{ props: { id: uuidv4() }, text: 'd' },
	{ props: { id: uuidv4() }, text: 'e' },
	{ props: { id: uuidv4() }, text: 'f' },
	{ props: { id: uuidv4() }, text: 'g' },
	{ props: { id: uuidv4() }, text: 'h' },
	{ props: { id: uuidv4() }, text: 'i' },
	{ props: { id: uuidv4() }, text: 'j' },
	{ props: { id: uuidv4() }, text: 'k' },
	{ props: { id: uuidv4() }, text: 'l' },
	{ props: { id: uuidv4() }, text: 'm' },
	{ props: { id: uuidv4() }, text: 'n' },
	{ props: { id: uuidv4() }, text: 'o' },
	{ props: { id: uuidv4() }, text: 'p' },
	{ props: { id: uuidv4() }, text: 'q' },
	{ props: { id: uuidv4() }, text: 'r' },
	{ props: { id: uuidv4() }, text: 's' },
	{ props: { id: uuidv4() }, text: 't' },
	{ props: { id: uuidv4() }, text: 'u' },
	{ props: { id: uuidv4() }, text: 'v' },
	{ props: { id: uuidv4() }, text: 'w' },
	{ props: { id: uuidv4() }, text: 'x' },
	{ props: { id: uuidv4() }, text: 'y' },
	{ props: { id: uuidv4() }, text: 'z' },
];

const statefulMultiselectItems = [
	[
		{ props: { id: uuidv4(), className: 'item', disableSelectedStyles: true, multiselect: true }, text: 'Selectable Item 1' },
		{ props: { id: uuidv4(), disableSelectedStyles: true, multiselect: true }, text: 'Selectable Item 2' },
		{ props: { id: uuidv4(), disableSelectedStyles: true, multiselect: true }, text: 'Selectable Item 3' },
		{ props: { id: uuidv4(), disableSelectedStyles: true, multiselect: true }, text: 'Selectable Item 4' }
	],
	[
		{ props: { id: uuidv4(), disableSelectedStyles: true, multiselect: true }, text: 'Another Item 1' },
		{ props: { id: uuidv4(), disableSelectedStyles: true, multiselect: true }, text: 'Another Item 2' },
		{ props: { id: uuidv4(), disableSelectedStyles: true, multiselect: true }, text: 'Another Item 3' },
		{ props: { id: uuidv4(), disableSelectedStyles: true, multiselect: true }, text: 'Another Item 4' },
	],
];

class ToggledDropDown extends Component {
	constructor() {
		super();
		this.state = {
			selectedId: null,
			restrictFocus: true,
		};
	}
	onSelect = value => {
		this.setState({
			selectedId: value,
		});
	}
	toggleRestrictFocus = () => {
		this.setState(prevState => ({
			restrictFocus: !prevState.restrictFocus,
		}));
	}
	render() {
		const trigger = (
			<XUIButton type="button" onClick={() => {}} data-ref="toggled_trigger">
				{this.props.repositionOnScroll ? 'Fixed' : 'Trigger'} Button <XUIButtonCart />
			</XUIButton>
		);
		const dropdownFooter = (
			<DropDownFooter>
				<Picklist>
					<Pickitem id="restrict-focus-footer" onSelect={this.toggleRestrictFocus}>
						Restrict Focus is {this.state.restrictFocus.toString()}
					</Pickitem>
				</Picklist>
			</DropDownFooter>
		);
		const dropdown = (
			<DropDown
				ref={dd => this.dropdown = dd}
				onSelect={this.onSelect}
				footer={dropdownFooter}
				className="dropdown-toggle-wrapper"
				restrictFocus={this.state.restrictFocus}
			>
				<Picklist>
					{createItems(toggledItems, this.state.selectedId)}
				</Picklist>
			</DropDown>
		);
		return (
			<DropDownToggled
				className="exampleClass"
				onOpen={() => console.log('dropdown is open')}
				onClose={() => console.log('dropdown is closed')}
				trigger={trigger}
				dropdown={dropdown}
				onOpenAnimationEnd={() => console.log('open animation end')}
				onCloseAnimationEnd={() => console.log('close animation end')}
				repositionOnScroll={this.props.repositionOnScroll}
			/>
		);
	}
}

ToggledDropDown.propTypes = {
	repositionOnScroll: PropTypes.bool,
};

class ToggledNestedDropdown extends Component {
	constructor() {
		super();
		this.state = {
			selectedId: null,
			restrictToViewPort: true,
			setMaxHeight: true,
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
			selectedId: value,
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

	selectPanel(panelId) {
		const showingDatePicker = panelId === 'startDate';
		this.setState({
			currentPanel: panelId,
			restrictToViewPort: !showingDatePicker,
			setMaxHeight: !showingDatePicker,
		});
	}

	closeNestedDropDown() {
		this.dropDownToggle.closeDropDown();
	}

	resetCurrentPanel() {
		this.selectPanel('default');
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
			currentPanel,
			restrictToViewPort,
			setMaxHeight,
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
				size="large"
				onPanelSelect={this.selectPanel}
			>
				<DropDownPanel
					panelId="default"
					header={
						<DropDownHeader
							title="Filters"
						/>
					}
				>
					<Picklist>
						<Pickitem
							id="DatePickerOpen"
							onSelect={() => this.selectPanel('dateMenu')}
						>
							Date Selection
						</Pickitem>
						<Pickitem
							id="ClearDate"
							onSelect={() => this.clearDate()}
						>
							Clear filter
						</Pickitem>
					</Picklist>
					<Picklist>
						<div className="xui-heading-separator xui-padding-horizontal-large xui-padding-bottom-small">Multiple lists can be added</div>
						<Pickitem
							id="dog"
							onSelect={() => this.selectPanel('checkboxes')}
						>
							Checkboxes
						</Pickitem>
						<Pickitem
							id="schwifty">
							Real fake doors
						</Pickitem>
					</Picklist>
				</DropDownPanel>
				<DropDownPanel
					panelId="dateMenu"
					header={
						<DropDownHeader
							title="Date selection with a really long title"
							onBackButtonClick={() => this.selectPanel("default")}
						/>
					}
				>
					<Picklist>
						<Pickitem
							id="startDate"
							onSelect={() => this.selectPanel('startDate')}
						>
							Start date
						</Pickitem>
						<Pickitem id="endDate">
							Some other button
						</Pickitem>
					</Picklist>
				</DropDownPanel>
				<DropDownPanel
					panelId="checkboxes"
					onSelect={exampleUsage.onOptionSelect}
					header={
						<DropDownHeader
							title="Checkboxes!"
							onBackButtonClick={() => this.selectPanel("default")}
							onPrimaryButtonClick={this.closeNestedDropDown}
						/>
					}
				>
					<Picklist>
						{createItems(statefulMultiselectItems[0], exampleUsage.state.selectedItems)}
					</Picklist>
					<Picklist>
						{createItems(statefulMultiselectItems[1], exampleUsage.state.selectedItems)}
					</Picklist>
				</DropDownPanel>
				<DropDownPanel
					panelId="startDate"
					header={
						<DropDownHeader
							title="Date selection"
							onBackButtonClick={() => this.selectPanel("dateMenu")}
						/>
					}
				>
					<XUIDatePicker
						selectedDate={this.state.selectedDate}
						onSelectDate={this.onSelectDate}
						isCompact
					/>
				</DropDownPanel>
			</NestedDropDown>
		);
		return (
			<DropDownToggled
				className="exampleClass"
				onOpen={() => console.log('dropdown is open')}
				trigger={trigger}
				dropdown={dropdown}
				closeOnSelect={false}
				closeOnTab={false}
				setMaxHeight={setMaxHeight}
				restrictToViewPort={restrictToViewPort}
				ref={dt => this.dropDownToggle = dt}
				onCloseAnimationEnd={this.resetCurrentPanel}
			/>
		);
	}
}

class WithForm extends Component {
	state = {
		restrictFocus: true,
	}
	toggleRestrictFocus = () => {
		this.setState(prevState => ({
			restrictFocus: !prevState.restrictFocus,
		}));
	}
	render() {
		const trigger = (
			<XUIButton type="button" data-ref="toggled_trigger">
				Open Button <XUIButtonCart />
			</XUIButton>
		);
		const dropdown = (
			<DropDown size="large" fixedWidth>
				<form className="xui-padding">
					<XUIInput
						inputAttributes={{placeholder: "First input",}}
						containerClassName="xui-margin-bottom-small"
					/>
					<XUIInput
						inputAttributes={{placeholder: "Second input",}}
						containerClassName="xui-margin-bottom-small"
					/>
					<XUIInput
						inputAttributes={{placeholder: "Third input",}}
						containerClassName="xui-margin-bottom-small"
					/>
					<XUIButton type="button" onClick={this.toggleRestrictFocus}>
						Restrict Focus is {this.state.restrictFocus.toString()}
					</XUIButton>
				</form>
			</DropDown>
		);
		return <DropDownToggled trigger={trigger} dropdown={dropdown} closeOnTab={false} forceDesktop />;
	}
}

const checkIcon = <XUIIcon path={checked} inline={true} />;

class FullHeightToggledDropDown extends Component {
	constructor() {
		super();
		this.state = {
			selectedId: null,
			searchValue: '',
		};
		this.onSelect = this.onSelect.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onSearchKeyDown = this.onSearchKeyDown.bind(this);
	}
	onSearch(event) {
		this.setState({
			searchValue: event.target.value,
		});
	}
	onSearchKeyDown(event) {
		// Let users type a space without selecting
		if (event.keyCode !== 32) {
			this.dropdown.onKeyDown(event);
		}
	}
	onSelect(value) {
		this.setState({
			selectedId: value,
			searchValue: '',
		});
	}
	closeDropDown = () => {
		this._dropdownToggled.closeDropDown();
	}
	render() {
		const trigger = (
			<XUIButton type="button" data-ref="toggled_trigger">
				Open Button <XUIButtonCart />
			</XUIButton>
		);
		const dropdownHeader = (
			<DropDownHeader
				title="Full Height Responsive Example"
				onSecondaryButtonClick={this.closeDropDown}
				onPrimaryButtonClick={this.onSelect}
				displayPrimaryButton={true}
				primaryButtonContent={checkIcon}
				onlyShowForMobile
			>
				<XUIInput
					ref={c => this.searchComponent = c}
					type="search"
					value={this.state.searchValue}
					onChange={this.onSearch}
					onKeyDown={this.onSearchKeyDown}
					placeholder="Im a fake search box"
					className="xui-input-borderless xui-input-borderless-solid xui-u-fullwidth"
					containerClassName="xui-u-fullwidth"
					iconAttributes={{ path: search, position: 'left' }}
				/>
			</DropDownHeader>
		);
		const dropdownFooter = (
			<DropDownFooter>
				<Picklist>
					<Pickitem id="iamfooter">
						This is an example of a good footer
					</Pickitem>
				</Picklist>
			</DropDownFooter>
		);
		const dropdown = (
			<DropDown
				ref={c => this.dropdown = c}
				onSelect={this.onSelect}
				header={dropdownHeader}
				footer={dropdownFooter}
				restrictFocus={false}
				hasKeyboardEvents={false}
			>
				<Picklist>
					{createItems(toggledItems, this.state.selectedId)}
				</Picklist>
			</DropDown>
		);
		return (
			<DropDownToggled
				onOpenAnimationEnd={() => this.searchComponent.focus()}
				trigger={trigger}
				dropdown={dropdown}
				ref={c => this._dropdownToggled = c}
				closeOnTab={false}
			/>
		);
	}
}

const matchTriggerItems = [
	'short',
	'Something middle of the road',
	'ah tgeowautieawghiwe giuoawh tguiorewa hgurawioghawuio guwaieh ouiaw ',
];

class MatchTriggerWidth extends Component {
	state = {
		selected: null,
	}

	onSelect = value => this.setState({ selected: value })

	render() {
		const { selected } = this.state;
		const buttonText = selected == null ? 'Select Something' : selected;
		const trigger = (
			<XUIButton>
				{buttonText}
				<XUIButtonCart />
			</XUIButton>
		);
		const dropdown = (
			<DropDown onSelect={this.onSelect}>
				<Picklist>
					{matchTriggerItems.map(item => (
						<Pickitem
							key={item}
							id={item}
							value={item}
							isSelected={selected === item}
						>
							{item}
						</Pickitem>
					))}
				</Picklist>
			</DropDown>
		);
		return (
			<DropDownToggled
				trigger={trigger}
				dropdown={dropdown}
				matchTriggerWidth
			/>
		);
	}
}

class ForceStatefulPicklist extends Component {
	state = {
		list: toggledItems,
		valueTrigger: '',
	}

	onSelect = value => {
		console.log('DropDrown item selected...', value);
	}

	onSelectFooter = () => {
		console.log('DropDrownFooter item selected...');
	}

	onChangeTrigger = event => {
		const { dd, ddt } = this;
		const isOpen = ddt && ddt.isDropDownOpen();

		this.setState({ valueTrigger: event.target.value }, () => {
			// the callback here is important, because we need to
			// update the StatefulPicklist AFTER the re-render of
			// the change from the trigger value
			const firstResultsFiltered = this.getListFiltered()[0];

			if (!isOpen && this.state.valueTrigger !== '') {
				ddt.openDropDown();
			}

			// here is why we're using the callback fn in setState;
			// StatefulPicklist keeps the current highlightedElement
			// in internal state, and it DOESN'T reset it after mount;
			// the `componentDidUpdate` call's `.highlightInitial()` but
			// `this.getHighlighted()` will always return the last highlighted
			// item, even if the item isn't in the scrollView or in the Picklist
			// tree, because the StatefulPicklist doesn't know/check if the children
			// has changed or not, so here, we're manually doing the same work
			// as `.highlightInitial()` when the List is filtered and there's
			// different results
			if (firstResultsFiltered && dd && dd.panel && dd.panel.list) {
				dd.panel.list.highlightItem({
					props: {
						id: firstResultsFiltered.props.id,
						value: firstResultsFiltered,
						onSelect: this.onSelect,
					},
				})
			}
		})
	}

	onKeyDownTrigger = event => {
		const { dd, ddt } = this;
		const isOpen = ddt && ddt.isDropDownOpen();

		if (isOpen) {
			dd.onKeyDown(event);
		}
	}

	getListFiltered = () => {
		const includeText = ({ text }) => text.includes(this.state.valueTrigger);
		const listFiltered = this.state.list.filter(includeText);
		return listFiltered;
	}

	createItems = results => results.map(item => {
		return React.createElement(Pickitem, {
			...item.props,
			onSelect: this.onSelect,
			value: item.props.id,
			key: item.props.id,
		}, item.text);
	})

	render() {
		const resultsFiltered = this.getListFiltered();
		const trigger = (
			<XUIInput
				inputAttributes={{
					placeholder: "Filter your results",
					onKeyDown: this.onKeyDownTrigger,
					value: this.state.valueTrigger
				}}
				onChange={this.onChangeTrigger}
				containerClassName="xui-margin-bottom-small"
			/>
		);
		// The ID in the Pickitem here is REALLY important
		// Because is used by StatefulPicklist in `.findItemById` method
		// Without the ID here, onSelect doesn't work
		const dropdownFooter = (
			<DropDownFooter>
				<Picklist>
					<Pickitem id="DropDownFooter-IdIsRequired" onSelect={this.onSelectFooter}>
						Some action in DropDownFooter
					</Pickitem>
				</Picklist>
			</DropDownFooter>
		);
		const dropdown = (
			<DropDown
				// Make DropDownPanel to always render StatefulPicklist
				forceStatefulPicklist
				footer={dropdownFooter}
				// do not force the focus in the List
				hasKeyboardEvents={false}
				// Using Input as trigger, we need to allow the user to
				// use ArrowLeft, ArrowRight and SpaceBar as normal typing
				// experience, that's why we're disabling it here
				ignoreKeyboardEvents={[32, 37, 39]}
				ref={dd => this.dd = dd}
				restrictFocus={false}
			>
				<Picklist
					// Remove the extra space in the top when there's no results
					defaultLayout={resultsFiltered.length > 0}
				>
					{this.createItems(resultsFiltered)}
				</Picklist>
			</DropDown>
		);
		return (
			<DropDownToggled
				dropdown={dropdown}
				ref={ddt => this.ddt = ddt}
				trigger={trigger}
				triggerClickAction="none"
			/>
		);
	}
}

ReactDOM.render(
	<div className="xui-form-layout">
		<div style={{ position: 'fixed', right: 0, top: '20px' }}>
			{<ToggledDropDown repositionOnScroll />}
		</div>
		<div className="xui-margin-bottom-large xui-panel xui-padding">
			<div className="xui-heading-panel xui-margin-bottom">Toggled Dropdown</div>
			<p className='xui-text-label'>A simple dropdown containing a picklist.</p>
			<p className='xui-text-label'>The dropdown can be opened on click, or by pressing enter, space, or down arrow while the trigger has focus.</p>
			<p className='xui-text-label'>StatefulPicklist is applied as a wrapper for keyboard nav functionality.</p>
			{<ToggledDropDown />}
		</div>
		<div className="xui-margin-bottom-large xui-panel xui-padding">
			<div className="xui-heading-panel xui-margin-bottom">Full Height Toggled Dropdown</div>
			<p className='xui-text-label'>The dropdown can be controlled as the above example. An additional header is present to give context and further close options.</p>
			{<FullHeightToggledDropDown />}
		</div>
		<div className="xui-margin-bottom-large xui-panel xui-padding">
			<div className="xui-heading-panel xui-margin-bottom">Nested Dropdown</div>
			<p className="xui-text-label">This dropdown contains multiple panels that can be switched between to provide nesting. It contains examples of Datepickers and checkboxes that can be placed in a dropdown.</p>
			<p className="xui-text-label">A header is applied to nested dropdowns to allow navigation back to parent panels, and display the name of the current panel.</p>
			{<ToggledNestedDropdown />}
		</div>
		<div className="xui-margin-bottom-large xui-margin-top xui-panel xui-padding">
			<div className="xui-heading-panel xui-margin-bottom">Simple Dropdown Styling</div>
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
			<div className="xui-heading-panel xui-margin-bottom">Desktop Dropdown with a Form Inside</div>
			<p className='xui-text-label'>
				Simple test case for putting a form in a dropdown.  Also has the <strong>forceDesktop</strong>
				flag set to true.
			</p>
			<WithForm />
		</div>
		<div className="xui-margin-bottom-large xui-margin-top xui-panel xui-padding">
			<div className="xui-heading-panel xui-margin-bottom">Dropdown width matches trigger width</div>
			<p className='xui-text-label'>
				Making sure that the &ldquo;matchTriggerWidth&rdquo; prop works
			</p>
			<MatchTriggerWidth />
		</div>
		<div className="xui-margin-bottom-large xui-margin-top xui-panel xui-padding">
			<div className="xui-heading xui-margin-bottom">Dropdown with no results but footer action</div>
			<p className='xui-text-label'>
				Based on XUI Design Patterns, when we have a Footer inside the DropdDown, you can reach it via keyboard, even if there is no results in your list.
			</p>
			<ForceStatefulPicklist />
		</div>
	</div>,
	document.getElementById('app')
);
