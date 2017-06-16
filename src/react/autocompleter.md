```
const { boldMatch, decorateSubStr } = require('./components/autocompleter/helpers/highlighting');
const { Component } = require('react');
const people  = require('./components/autocompleter/private/people').default;

console.log(people);

const filterPeopleByValue = (data, value, excludedItem) => {
	return data.filter(node => {
		const val = value.toLowerCase();

		//You could use String.includes here, however you would need to add the polyfill for IE11 support.
		return (!excludedItem || excludedItem.key !== node.id) && (node.name.toLowerCase().indexOf(val) > -1
		|| node.email.toLowerCase().indexOf(val) > -1
		|| node.subtext.toLowerCase().indexOf(val) > -1);
	});
};

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
			)
		}
	}

<DetailedListExample />
```
