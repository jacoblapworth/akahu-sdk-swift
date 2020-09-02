import React from 'react';

import plusIcon from '@xero/xui-icon/icons/plus';
import XUIButton from '../../../button/XUIButton';
import XUIButtonCaret from '../../../button/XUIButtonCaret';
import DropDownFooter from '../../../dropdown/DropDownFooter';
import XUIIcon from '../../../icon/XUIIcon';
import Pickitem from '../../../picklist/Pickitem';
import Picklist from '../../../picklist/Picklist';
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
    <Pickitem
      {...item.props}
      isSelected={isSelected(item, selectedId)}
      key={item.props.id}
      value={item.props.id}
    >
      {item.text}
    </Pickitem>
  );
}

class SecondarySearchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: SecondarySearchData,
      selectedItem: null,
    };
  }

  autocompleterRef = React.createRef();

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
    const { isClosed } = this.props;
    if (!isClosed) {
      this.autocompleterRef.current.openDropDown();
    }
  }

  render() {
    const { data, selectedItem } = this.state;
    const { trigger: propsTrigger, className } = this.props;

    const trigger = propsTrigger || (
      <XUIButton data-ref="toggled_trigger" fullWidth="small-down" onClick={() => {}} type="button">
        Toggle Me <XUIButtonCaret />
      </XUIButton>
    );

    const items =
      data.length > 0 ? (
        createItems(data, selectedItem)
      ) : (
        <XUIAutocompleterEmptyState>No results found</XUIAutocompleterEmptyState>
      );

    const footer = (
      <DropDownFooter
        pickItems={
          <Pickitem id="footerAction">
            <span>
              <XUIIcon className="xui-margin-right-small" icon={plusIcon} isBoxed />
              Add New Person
            </span>
          </Pickitem>
        }
      />
    );

    return (
      <div style={{ width: 'auto' }}>
        <XUIAutocompleterSecondarySearch
          className={className}
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
          <Picklist>{items}</Picklist>
        </XUIAutocompleterSecondarySearch>
      </div>
    );
  }
}

export default SecondarySearchExample;
