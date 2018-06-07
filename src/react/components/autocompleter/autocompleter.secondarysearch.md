
This component behaves similarly to an autocompleter, except that it is triggered by a button instead of an input. The input is a secondary interaction, focused by default when the DropDown opens. The `SecondarySearch` component is a separate component to the `Autocompleter` but share similar APIs.

```
const { boldMatch, decorateSubStr } = require('./helpers/highlighting');
const Pickitem = require('../picklist/Pickitem').default;
const DropDownFooter = require('../dropdown/DropDownFooter').default;
const XUIIcon = require('../icon/XUIIcon').default;
const plusIcon = require ( '@xero/xui-icon/icons/plus' ).default;

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

class SecondarySearchExample extends React.Component {
	constructor() {
		super(this.props);

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

	onClose(){
		this.setState({
			value: '',
			data: SecondarySearchData
		})
	}

	render() {
		const sse = this;
		const { value, data } = sse.state;

		const trigger = (
			<XUIButton type="button" onClick={() => {}} data-ref="toggled_trigger">
				Toggle Me <XUIButtonCaret />
			</XUIButton>
		);

		const items = data.length > 0 ? createItems(data, sse.state.selectedItem): (<XUIAutocompleterEmptyState />);

		const footer = (
			<DropDownFooter>
				<Picklist>
					<Pickitem id="footerAction">
						<span>
							<XUIIcon
								isInline
								path={plusIcon}
								className="xui-margin-right-xsmall"
							/>
							Add New Person
						</span>
					</Pickitem>
				</Picklist>
			</DropDownFooter>
		);

		return (
			<div>
				<XUIAutocompleterSecondarySearch
					trigger={trigger}
					onOptionSelect={sse.onOptionSelect}
					onSearch={sse.onSearch}
					searchValue={value}
					dropdownSize='medium'
					inputLabelText='secondary search label'
					isInputLabelHidden
					qaHook='secondary-search'
					footer={footer}
					onClose={() => this.onClose()}
				>
					<Picklist>
						{items}
					</Picklist>
				</XUIAutocompleterSecondarySearch>
			</div>
		)
	}
}

<SecondarySearchExample />
```
