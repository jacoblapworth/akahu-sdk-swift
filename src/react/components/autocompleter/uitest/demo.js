/*eslint-disable no-console */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import Autocompleter from '../Autocompleter';
import SecondarySearch from '../SecondarySearch';
import EmptyState from '../EmptyState';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIPill from '../../pill/XUIPill';
import XUIButton from '../../button/XUIButton';
import XUIButtonCaret from '../../button/XUIButtonCaret';
import fetchQuotes from '../private/fetchData';

import { boldMatch, decorateSubStr } from '../helpers/highlighting';

//Test data for second example
import people from '../private/people';

const filterPeopleByValue = (data, value, excludedItem) => {
	return data.filter(node => {
		const val = value.toLowerCase();

		//You could use String.includes here, however you would need to add the polyfill for IE11 support.
		return (!excludedItem || excludedItem.key !== node.id) && (node.name.toLowerCase().indexOf(val) > -1
		|| node.email.toLowerCase().indexOf(val) > -1
		|| node.subtext.toLowerCase().indexOf(val) > -1);
	});
};

(function() {
	const app = document.getElementById('app');

	/**
	 * A really rough example of how you can implement the loading of your data with the current API.
	 * Production code shouldn't include such a crude fetch implementation inside the component.
	 */
	class InteractiveExample extends Component {
		constructor() {
			super();
			const example = this;

			example.state= {
				loading: false,
				value: '',
				data:[]
			};

			example.onSearchChangeHandler = example.onSearchChangeHandler.bind(example);
			example.getData = debounce(example.getData.bind(example), 500);
		}

		componentDidMount() {
			this.setState({
				loading: true
			});
			this.getData();
		}

		onSearchChangeHandler(value) {
			const example = this;
			example.completer.openDropDown();
			example.setState({
				value: value,
				loading: true
			});
			example.getData(value);
		}

		onOptionSelectHandler(value) {
			this.setState({
				value: value
			});
		}

		getData(search) {
			const example = this;
			const requestTime = Date.now();
			const success = constructedData => {
				example.setState({
					loading: false,
					data: constructedData.map((msg, idx) => {
						return {
							id: idx.toString(),
							value: msg
						};
					})
				});
			};
			const failure = err => {
				console.warn(err);
				example.setState({
					loading: false,
					data: []
				});
			};

			fetchQuotes(requestTime, success, failure, search);
		}

		render() {
			const example = this;
			const { data, loading, value } = example.state;
			const noResults = <EmptyState id='no_quotes'>No Quotes Found</EmptyState>;
			function getItems(data) {
				if (Array.isArray(data) && data.length) {
					return data.map(item => (
						<Pickitem key={item.id} id={item.id} >
							<span>{decorateSubStr(item.value, value || '', boldMatch)}</span>
						</Pickitem>
					));
				}
				return noResults;
			}
			return (
				<div className="xui-panel xui-padding xui-margin-top">
					<div className="xui-text-panelheading xui-margin-bottom">Interactive Autocompleter</div>
					<p className='xui-text-label'>
						Includes loading a list of data...or trump quotes.
						Opens on focus of the Input.
						Has a max length of 10.
					</p>
					<Autocompleter
						ref={ac => this.completer = ac}
						loading={loading}
						onSearch={this.onSearchChangeHandler}
						placeholder="Search"
						maxLength={10}
						searchValue={value}
						qaHook="baseac"
						openOnFocus={true}
					>
						<Picklist onOptionSelect={ value => { example.setState({ value })} }>
							{getItems(data)}
						</Picklist>
					</Autocompleter>
				</div>
			);
		}

	}

	//Example to show how the children can be styled however and you also define your own search criteria.
	class DetailedListExample extends Component {
		constructor() {
			super();

			const example = this;

			example.state = {
				value: '',
				people: people,
				selectedItem: null
			};

			example.onSearchChangeHandler = example.onSearchChangeHandler.bind(example);
		}

		onSearchChangeHandler(value) {
			const example = this;
			const { selectedItem } = example.state;
			example.completer.openDropDown();
			example.setState({
				value: value,
				people: filterPeopleByValue(people, value, selectedItem)
			});
		}

		filterDataByValue(value){
			const people = people.filter(person => {
				return person.name.toLowerCase().includes(value.toLowerCase())
					|| person.email.toLowerCase().includes(value.toLowerCase())
					|| person.subtext.toLowerCase().includes(value.toLowerCase())
			});

			this.setState({
				loading: false,
				data: people
			});
		}

		getItems(){
			const example = this;
			const { value, people } = example.state;
			const noResults = <EmptyState id="no_people">No People Found</EmptyState>;

			if(!Array.isArray(people) || people.length <= 0){
				return noResults;
			}

			return people.map(item => (
				<Pickitem
					key={item.id}
					id={item.id}
					onSelect={(value, instance) => example.setState({value: item.name, selectedItem: instance})}>
					<div>
						<div>
							<XUIAvatar value={item.name} imageUrl={item.avatar}/>
							<span className="xui-margin-left-small">
											{decorateSubStr(item.name, value || '', boldMatch)}
										</span>
						</div>
						<div className="xui-text-secondary xui-margin-top-small">
							{decorateSubStr(item.email, value || '', boldMatch)},
							{decorateSubStr(item.subtext, value || '', boldMatch)}
						</div>
					</div>
				</Pickitem>
			));
		}

		render(){
			const example = this;
			const { value } = example.state;

			return (
				<div className="xui-panel xui-padding xui-margin-top">
					<div className="xui-text-panelheading xui-margin-bottom">Detailed List Autocompleter</div>
					<p className='xui-text-label'>
						You can define your own children so they can be displayed in more complex ways if needed. This uses static data to search over.
					</p>
					<Autocompleter
						ref={ac => example.completer = ac}
						onSearch={example.onSearchChangeHandler}
						placeholder="Search"
						searchValue={value}
						dropdownSize="large"
					>
						<Picklist>
							{example.getItems()}
						</Picklist>
					</Autocompleter>
				</div>
			)
		}
	}

	//Multiselect
	class MultiselectExample extends Component {
		constructor(){
			super();

			const example = this;
			example.state = {
				value: '',
				data: people,
				selectedItems: {}
			};

			example.onOptionSelect= example.onOptionSelect.bind(example);
			example.onSearchChangeHandler = example.onSearchChangeHandler.bind(example);
			example.onPillDelete = example.onPillDelete.bind(example);

		}

		onSearchChangeHandler(value) {
			const example = this;
			example.completer.openDropDown();
			example.setState({
				value: value,
				data: this.filterDataByValue(value)
			});
		}

		onOptionSelect(value, item) {
			const example = this;

			if(example.state.selectedItems[item.props.id]){
				example.removeSelectedItem(item)
			} else {
				example.addSelectedItem(item)
			}
		}

		removeSelectedItem(item){
			const { selectedItems } = this.state;
			const clonedSelectedItems = Object.assign({}, selectedItems);

			delete clonedSelectedItems[item.props.id];

			this.setState({
				selectedItems: clonedSelectedItems
			});
		}

		addSelectedItem(item){
			this.setState({
				selectedItems: {
					...this.state.selectedItems,
					[item.props.id] : item
				}
			});
		}

		filterDataByValue(value){
			if(!value){
				return people;
			}

			return people.filter(person => {
				return person.name.toLowerCase().includes(value.toLowerCase())
					|| person.email.toLowerCase().includes(value.toLowerCase())
					|| person.subtext.toLowerCase().includes(value.toLowerCase())
			});
		}

		onPillDelete(pill) {
			this.removeSelectedItem(pill);
		}

		getPills(){
			const example = this;
			const { selectedItems } = example.state;
			const findPerson = id => people.find(person => person.id === id);
			let pills = [];

			if(Object.keys(selectedItems).length) {
				for(const key in selectedItems) {
					const person = findPerson(key);
					pills.push(<XUIPill value={person.name} id={person.id} key={person.id} className="ac-pill" onDeleteClick={this.onPillDelete} />)
				}
			}

			return pills;
		}

		render() {
			const example = this;
			const { data, value, selectedItems } = example.state;
			const noResults = <EmptyState id="no_people_multi">No People Found</EmptyState>;
			function getItems(data) {
				if (Array.isArray(data) && data.length) {
					return data.map(item => {
						return (
							<Pickitem key={`multi-${item.id}`} id={item.id} multiselect={true} disableSelectedStyles={true} isSelected={!!selectedItems[item.id]} onSelect={example.onOptionSelect}>
								{decorateSubStr(item.name, value || '', boldMatch)}
							</Pickitem>
						)
					})
				}
				return noResults;
			}

			return (
				<div className="xui-panel xui-padding xui-margin-top">
					<div className="xui-text-panelheading xui-margin-bottom">Multiselect Autocompleter</div>
					<p className='xui-text-label'>
						Selecting Multiple items will be rendered inside Pills.
					</p>
					<Autocompleter
						ref={ac => example.completer = ac}
						onSearch={example.onSearchChangeHandler}
						onOptionSelect={example.onOptionSelectHandler}
						placeholder="Search"
						searchValue={value}
						dropdownSize="medium"
						closeOnSelect={false}
						pills={this.getPills()}
					>
						<Picklist>
							{getItems(data)}
						</Picklist>
					</Autocompleter>
				</div>
			);
		}
	}

const SecondarySearchData = [
	{ props: { id: 'ss1' }, text: "Cost" },
	{ props: { id: 'ss2' }, text: "More Costs" },
	{ props: { id: 'ss3' }, text: "No Costs" },
	{ props: { id: 'ss4' }, text: "Nothing about Cost" },
	{ props: { id: 'ss5' }, text: "Something Unrelated" },
	{ props: { id: 'ss6' }, text: "Random Item" },
	{ props: { id: 'ss7' }, text: "Coats" },
	{ props: { id: 'ss8' }, text: "Big Coat" },
]

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

class SecondarySearchExample extends Component {
	constructor() {
		super();

		const sse = this;

		sse.state = {
			data: SecondarySearchData,
			selectedItem: null,
			value: '',
		}

		sse.onSearch = sse.onSearch.bind(sse);
		sse.onOptionSelect = sse.onOptionSelect.bind(sse);
	}

	onOptionSelect(value) {
		this.setState({
			selectedItem: value
		});
	}

	onSearch(value) {
			const matchingData = SecondarySearchData.filter(item => item.text.toLowerCase().includes(value.toLowerCase()));

			this.setState({
				data: matchingData,
				value: value
			})
	}

	render() {
		const sse = this;
		const { value } = sse.state;

		const trigger = (
			<XUIButton type="button" onClick={() => {}} data-ref="toggled_trigger">
				Toggle Me <XUIButtonCaret />
			</XUIButton>
		);

		const items = sse.state.data.length > 0 ? createItems(sse.state.data, sse.state.selectedItem): (<EmptyState />);

		return (
			<div className="xui-panel xui-padding xui-margin-top">
				<div className="xui-text-panelheading xui-margin-bottom">Search is a secondary action in the Autocompleter</div>
				<p className='xui-text-label'>
					This autocompleter is triggered by a button.
				</p>
				<SecondarySearch
					trigger={trigger}
					onOptionSelect={sse.onOptionSelect}
					onSearch={sse.onSearch}
					searchValue={value}
					dropdownSize='medium'
					qaHook='secondary-search'
				>
					<Picklist>
						{items}
					</Picklist>
				</SecondarySearch>
			</div>)
	}
}

	/*eslint-enable no-console */

	ReactDOM.render(
		<div>
			<InteractiveExample />
			<DetailedListExample />
			<MultiselectExample />
			<SecondarySearchExample />
		</div>, app
	);
})();
