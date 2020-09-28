/* eslint-disable max-classes-per-file */
import React, { useState } from 'react';
import uuid from 'uuid/v4';
import {
  XUIEditableTable,
  XUIEditableTableHead,
  XUIEditableTableHeadingCell,
  XUIEditableTableRow,
} from '../../../editabletable';
import XUIEditableTableBody from '../XUIEditableTableBody';
import XUIEditableTableCellTextInput from '../XUIEditableTableCellTextInput';
import XUIEditableTableCellSelectBox from '../XUIEditableTableCellSelectBox';
import { TextHelpers, SelectBoxOption } from '../../../select-box';
import XUIButton from '../../../button';
import XUIActions from '../../../actions';

const SBCell = props => {
  const { isMultiSelect, rowIndex, onItemSelect, options, ...spreadProps } = props;
  const [selectedItems, setSelectedItems] = useState(props.selectedItems || []);

  const handleItemSelect = value => {
    if (isMultiSelect) {
      if (selectedItems.indexOf(value) > -1) {
        setSelectedItems(selectedItems.filter(item => item !== value));
      } else {
        setSelectedItems([...selectedItems, value]);
      }
    } else {
      setSelectedItems([value]);
    }
    // this should probably be a useEffect callback thinger.
    onItemSelect && onItemSelect();
  };

  return (
    <XUIEditableTableCellSelectBox
      buttonContent={TextHelpers.getText(selectedItems, '')}
      caretTitle="Toggle list"
      closeAfterSelection={!isMultiSelect}
      isMultiSelect={isMultiSelect}
      isTextTruncated={false}
      onSelect={handleItemSelect}
      {...spreadProps}
    >
      {options &&
        options.map((opt, idx) => {
          return (
            <SelectBoxOption
              id={opt}
              isSelected={selectedItems.indexOf(opt) >= 0}
              key={idx + opt + rowIndex}
              showCheckboxes={isMultiSelect}
              value={opt}
            >
              {opt}
            </SelectBoxOption>
          );
        })}
    </XUIEditableTableCellSelectBox>
  );
};

class EditableTableUserTest extends React.Component {
  blankItem = {
    Name: undefined,
    Bun: undefined,
    'Main filling': undefined,
    'Salad filling(s)': undefined,
    Sauce: undefined,
    'Order note': undefined,
    uid: uuid(),
  };

  state = {
    items: this.props.items || [{ ...this.blankItem }],
  };

  removeItem = id => {
    if (this.state.items.length === 1) {
      alert("Can't delete only item");
      return false;
    }
    this.setState(prevState => {
      const indexToRemove = prevState.items.findIndex(item => item.uid === id);
      prevState.items.splice(indexToRemove, 1);
      return {
        items: prevState.items,
      };
    });
  };

  addNewItem = () => {
    this.blankItem.uid = uuid();
    this.setState(prevState => ({
      items: [...prevState.items, { ...this.blankItem }],
    }));
  };

  updateItem = ({ id, item }) => {
    this.setState(prevState => {
      const indexToUpdate = prevState.items.findIndex(item => item.uid === id);
      prevState.items.splice(indexToUpdate, 1, item);
      return {
        items: prevState.items,
      };
    });
  };

  submitData = () => {
    this.setState({
      isSubmitting: true,
    });
    setTimeout(() => {
      this.setState({
        isSubmitting: false,
        recentSuccess: true,
      });
      setTimeout(() => {
        this.setState({
          recentSuccess: false,
        });
      }, 2500);
    }, 1500);
  };

  render() {
    const {
      disableMainFilling,
      maxWidth,
      columnWidths = ['190px', '190px', '190px', '190px', '190px', 'auto'],
    } = this.props;
    return (
      <div
        style={{
          maxWidth: maxWidth || '1200px',
          width: '95vw',
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <XUIEditableTable
          className="xui-margin-bottom"
          columnWidths={columnWidths}
          rowOptions={{ isRemovable: true, removeButtonAriaLabel: 'Remove row' }}
        >
          <XUIEditableTableHead>
            <XUIEditableTableRow>
              {Object.keys(this.state.items[0]).map(
                (item, index) =>
                  item !== 'uid' && (
                    <XUIEditableTableHeadingCell key={index}>{item}</XUIEditableTableHeadingCell>
                  ),
              )}
            </XUIEditableTableRow>
          </XUIEditableTableHead>
          <XUIEditableTableBody>
            {this.state.items.map((item, index) => (
              <XUIEditableTableRow key={item.uid} onRemove={event => this.removeItem(item.uid)}>
                <XUIEditableTableCellTextInput
                  defaultValue={item.Name}
                  key={`${item.uid}_name`}
                  label="Name"
                />
                <SBCell
                  key={`${item.uid}_bun`}
                  label="Bun"
                  options={['Regular', 'Brioche', 'Gluten free', 'No bun']}
                  rowIndex={item.uid}
                  selectedItems={item.Bun}
                />
                <SBCell
                  isDisabled={disableMainFilling}
                  key={`${item.uid}_main`}
                  label="Main filling"
                  options={['Beef patty', 'Chicken', 'Vege patty']}
                  rowIndex={item.uid}
                  selectedItems={disableMainFilling ? 'Vege patty' : item['Main filling']}
                />
                <SBCell
                  isMultiSelect
                  key={`${item.uid}_salad`}
                  label="Salad filling(s)"
                  options={['Lettuce', 'Onion', 'Mushroom', 'Pickles']}
                  rowIndex={item.uid}
                  selectedItems={item['Salad filling(s)']}
                />
                <SBCell
                  key={`${item.uid}_sauce`}
                  label="Sauce"
                  options={['Tomato', 'Mayonnaise', 'Thousand Island', 'Aioli']}
                  rowIndex={item.uid}
                  selectedItems={item.Sauce}
                />
                <XUIEditableTableCellTextInput
                  defaultValue={item['Order note']}
                  isMultiline
                  key={`${item.uid}_note`}
                  label="Order note"
                  minRows={1}
                />
              </XUIEditableTableRow>
            ))}
          </XUIEditableTableBody>
        </XUIEditableTable>
        <XUIActions
          isLinear
          primaryAction={
            <XUIButton
              isLoading={this.state.isSubmitting}
              loadingLabel="Submitting"
              onClick={this.submitData}
              variant="primary"
            >
              {this.state.recentSuccess ? 'Thanks' : 'Submit'}
            </XUIButton>
          }
          secondaryAction={<XUIButton onClick={this.addNewItem}>Add row</XUIButton>}
        />
      </div>
    );
  }
}

const sandwichData = [
  {
    Name: 'Finn',
    Bun: 'Brioche',
    'Main filling': 'Beef patty',
    'Salad filling(s)': ['Lettuce', 'Onion', 'Mushroom', 'Pickles'],
    Sauce: 'Thousand Island',
    'Order note': 'Please add cheese',
    uid: uuid(),
  },
  {
    Name: 'Zac',
    Bun: 'Brioche',
    'Main filling': 'Beef patty',
    'Salad filling(s)': ['Lettuce', 'Onion', 'Pickles'],
    Sauce: 'Mayonnaise',
    'Order note': 'Can you please add extra sauce? Cheers',
    uid: uuid(),
  },
  {
    Name: 'Elise',
    Bun: 'Gluten free',
    'Main filling': 'Chicken',
    'Salad filling(s)': ['Lettuce', 'Mushroom', 'Pickles'],
    Sauce: 'Aioli',
    'Order note': undefined,
    uid: uuid(),
  },
  {
    Name: 'Sam',
    Bun: 'Regular',
    'Main filling': 'Vege patty',
    'Salad filling(s)': ['Onion', 'Mushroom'],
    Sauce: 'Tomato',
    'Order note': undefined,
    uid: uuid(),
  },
  {
    Name: 'Taylor',
    Bun: 'No bun',
    'Main filling': 'Vege patty',
    'Salad filling(s)': ['Lettuce'],
    Sauce: 'Mayonnaise',
    'Order note': 'Peanut allergy',
    uid: uuid(),
  },
];

export { EditableTableUserTest, sandwichData };
