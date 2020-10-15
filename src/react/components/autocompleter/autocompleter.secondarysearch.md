This component behaves similarly to an autocompleter, except that it is triggered by a button instead of an input. The input is a secondary interaction, focused by default when the dropdown opens. The secondary search component is a separate component to the autocompleter but share similar APIs.

```jsx harmony
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';
import {
  XUIAutocompleterSecondarySearch,
  XUIAutocompleterEmptyState
} from '@xero/xui/react/autocompleter';
import { XUIDropdownFooter } from '@xero/xui/react/dropdown';
import XUIButton from '@xero/xui/react/button';
import XUIIcon from '@xero/xui/react/icon';
import plusIcon from '@xero/xui-icon/icons/plus';

const SecondarySearchData = [
  { props: { id: 'ss1' }, text: 'Cost' },
  { props: { id: 'ss2' }, text: 'More Costs' },
  { props: { id: 'ss3' }, text: 'No Costs' },
  { props: { id: 'ss4' }, text: 'Nothing about Cost' },
  { props: { id: 'ss5' }, text: 'Something Unrelated' },
  { props: { id: 'ss6' }, text: 'Random Item' },
  { props: { id: 'ss7' }, text: 'Coats' },
  { props: { id: 'ss8' }, text: 'Big Coat' }
];

const isSelected = (item, selectedIds) =>
  item.props.id === selectedIds || (!!selectedIds && selectedIds[item.props.id]);

const noop = () => {};

function createItems(item, selectedId) {
  if (Array.isArray(item)) {
    return item.map(i => createItems(i, selectedId));
  }

  return (
    <XUIPickitem
      {...item.props}
      value={item.props.id}
      key={item.props.id}
      isSelected={isSelected(item, selectedId)}
    >
      {item.text}
    </XUIPickitem>
  );
}

class SecondarySearchExample extends React.Component {
  constructor(...args) {
    super(...args);

    const sse = this;

    sse.state = {
      data: SecondarySearchData,
      selectedItem: null,
      value: ''
    };

    sse.onSearch = sse.onSearch.bind(sse);
    sse.onClose = sse.onClose.bind(sse);
    sse.onOptionSelect = sse.onOptionSelect.bind(sse);
  }

  onOptionSelect(value) {
    this.setState({
      selectedItem: value
    });
  }

  onSearch(value) {
    const matchingData = SecondarySearchData.filter(item =>
      item.text.toLowerCase().includes(value.toLowerCase())
    );

    this.setState({
      data: matchingData,
      value: value
    });
  }

  onClose() {
    this.setState({
      value: '',
      data: SecondarySearchData
    });
  }

  render() {
    const sse = this;
    const { value, data } = sse.state;

    const trigger = (
      <XUIButton type="button" hasCaret onClick={noop} data-ref="toggled_trigger">
        Toggle Me
      </XUIButton>
    );

    const items =
      data.length > 0 ? (
        createItems(data, sse.state.selectedItem)
      ) : (
        <XUIAutocompleterEmptyState>No results found</XUIAutocompleterEmptyState>
      );

    const footer = (
      <XUIDropdownFooter
        pickItems={
          <XUIPickitem
            id="footerAction"
            leftElement={<XUIIcon icon={plusIcon} className="xui-margin-right-xsmall" />}
          >
            Add New Person
          </XUIPickitem>
        }
      />
    );

    return (
      <div>
        <XUIAutocompleterSecondarySearch
          trigger={trigger}
          onOptionSelect={sse.onOptionSelect}
          onSearch={sse.onSearch}
          searchValue={value}
          dropdownSize="small"
          inputLabel="secondary search label"
          isInputLabelHidden
          qaHook="secondary-search"
          footer={footer}
          closeOnTab={false}
          onClose={this.onClose}
        >
          <XUIPicklist>{items}</XUIPicklist>
        </XUIAutocompleterSecondarySearch>
      </div>
    );
  }
}

<SecondarySearchExample />;
```
