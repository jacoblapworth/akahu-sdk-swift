import React from 'react';

import plusIcon from '@xero/xui-icon/icons/plus';
import XUIButton from '../../../button/XUIButton';
import XUIDropdownFooter from '../../../dropdown/XUIDropdownFooter';
import XUIIcon from '../../../icon/XUIIcon';
import XUIPickitem from '../../../picklist/XUIPickitem';
import XUIPicklist from '../../../picklist/XUIPicklist';
import XUIAutocompleterEmptyState from '../../XUIAutocompleterEmptyState';
import XUIAutocompleterSecondarySearch from '../../XUIAutocompleterSecondarySearch';

const SecondarySearchData = [
  { props: { id: 'ss1' }, text: 'Cost' },
  { props: { id: 'ss2' }, text: 'More Costs' },
  { props: { id: 'ss3' }, text: 'No Costs' },
  { props: { id: 'ss4' }, text: 'Nothing about Cost' },
  { props: { id: 'ss5' }, text: 'Something Unrelated' },
  { props: { id: 'ss6' }, text: 'Random Item' },
  { props: { id: 'ss7' }, text: 'Coats' },
  { props: { id: 'ss8' }, text: 'Big Coat' },
];

const isSelected = (item, selectedIds) =>
  item.props.id === selectedIds || (!!selectedIds && selectedIds[item.props.id]);

function createItems(item, selectedId) {
  if (Array.isArray(item)) {
    return item.map(i => createItems(i, selectedId));
  }

  return (
    <XUIPickitem
      {...item.props}
      isSelected={isSelected(item, selectedId)}
      key={item.props.id}
      value={item.props.id}
    >
      {item.text}
    </XUIPickitem>
  );
}

class SecondarySearchExample extends React.Component {
  autocompleterRef = React.createRef();

  state = {
    data: SecondarySearchData,
    selectedItem: null,
  };

  onOptionSelect = value => {
    this.setState({
      selectedItem: value,
    });
  };

  onSearch = value => {
    const matchingData = SecondarySearchData.filter(item =>
      item.text.toLowerCase().includes(value.toLowerCase()),
    );

    this.setState({
      data: matchingData,
    });
  };

  componentDidMount() {
    if (!this.props.isClosed) {
      this.autocompleterRef.current.openDropdown();
    }
  }

  render() {
    const { data } = this.state;

    const trigger = this.props.trigger || (
      <XUIButton
        data-ref="toggled_trigger"
        fullWidth="small-down"
        hasCaret
        onClick={() => {}}
        type="button"
      >
        Toggle Me
      </XUIButton>
    );

    const items =
      data.length > 0 ? (
        createItems(data, this.state.selectedItem)
      ) : (
        <XUIAutocompleterEmptyState>No results found</XUIAutocompleterEmptyState>
      );

    const footer = (
      <XUIDropdownFooter
        pickItems={
          <XUIPickitem
            id="footerAction"
            leftElement={<XUIIcon className="xui-margin-right-small" icon={plusIcon} />}
          >
            Add New Person
          </XUIPickitem>
        }
      />
    );

    return (
      <div style={{ width: 'auto' }}>
        <XUIAutocompleterSecondarySearch
          className={this.props.className}
          closeOnTab={false}
          dropdownSize="medium"
          footer={footer}
          inputId="secondary_input_id"
          inputLabel="secondary search label"
          isInputLabelHidden
          onOptionSelect={this.onOptionSelect}
          onSearch={this.onSearch}
          qaHook="secondary-search"
          ref={this.autocompleterRef}
          trigger={trigger}
        >
          <XUIPicklist>{items}</XUIPicklist>
        </XUIAutocompleterSecondarySearch>
      </div>
    );
  }
}

export default SecondarySearchExample;
