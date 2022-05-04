/* eslint-disable max-classes-per-file */
import React, { Component, PureComponent } from 'react';
import crossIcon from '@xero/xui-icon/icons/cross-small';
import plusIcon from '@xero/xui-icon/icons/plus';

import { nanoid } from 'nanoid';
import { XUIDropdownFooter } from '../../../dropdown';
import XUIIcon from '../../../icon';
import {
  XUIEditableTableCellAutocompleter,
  XUIEditableTableCellAutocompleterSecondarySearch,
  XUIEditableTableCellReadOnly,
  XUIEditableTableCellSelectBox,
  XUIEditableTableCellTextInput,
} from '../../../editabletable';
import { XUIIconButton } from '../../../button';
import { XUISelectBoxOption } from '../../../selectbox';
import XUIPicklist, { XUIPickitem } from '../../../picklist';
import XUIAvatar from '../../../avatar';
import { XUIAutocompleterEmptyState } from '../../../autocompleter';
import { decorateSubStr, boldMatch } from '../../autocompleter/helpers/highlighting';
import { XUITextInputSideElement } from '../../../textinput';
import XUIPill from '../../../pill';
import people from '../../autocompleter/private/people';

export const sampleText = {
  readOnly: '15% GST on income',
  singleLine: 'Golf balls - white 9 pack',
  multiLine: '9-pack of Bridgestone white golf balls.',
  header: ['Item', 'Description', 'Tax rate', 'Account', 'Vendor', 'Contact', 'Region'],
  select: ['Sales', 'Other revenue', 'Interest income'],
};

const sampleReadOnly = (id, text, { inlineAlignment }, rowIndex) => (
  <XUIEditableTableCellReadOnly id={id} inlineAlignment={inlineAlignment} key={`${rowIndex}_${id}`}>
    {text || sampleText.readOnly}
  </XUIEditableTableCellReadOnly>
);

const sampleTextInput = (
  id,
  text,
  { isDisabled, inlineAlignment, isInvalid, isMultiline, validationMessage },
  rowIndex,
) => {
  if (!text) {
    text = isMultiline ? sampleText.multiLine : sampleText.singleLine;
  }

  return (
    <XUIEditableTableCellTextInput
      defaultValue={text}
      id={id}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isMultiline={isMultiline}
      isValueReverseAligned={inlineAlignment === 'end'}
      key={`${rowIndex}_${id}`}
      minRows={1}
      validationMessage={validationMessage}
    />
  );
};

const sampleSelect = (id, text = 'Select', settings) => {
  const { select } = sampleText;

  return (
    <XUIEditableTableCellSelectBox {...settings} buttonContent={text} id={id} key={id} label={text}>
      <XUISelectBoxOption id={`${id}_a`} key="a" value={select[0]}>
        {select[0]}
      </XUISelectBoxOption>
      <XUISelectBoxOption id={`${id}_b`} key="b" value={select[1]}>
        {select[1]}
      </XUISelectBoxOption>
      <XUISelectBoxOption id={`${id}_c`} key="c" value={select[2]}>
        {select[2]}
      </XUISelectBoxOption>
    </XUIEditableTableCellSelectBox>
  );
};

const filterPeople = (peopleToSearch, value, idsToExclude) => {
  const val = value.toLowerCase();
  return peopleToSearch.filter(
    (person, index) =>
      idsToExclude.indexOf(index) === -1 &&
      (person.name.toLowerCase().indexOf(val) > -1 ||
        person.email.toLowerCase().indexOf(val) > -1 ||
        person.subtext.toLowerCase().indexOf(val) > -1),
  );
};

class PillWrapper extends PureComponent {
  constructor(...args) {
    super(...args);
    this.deleteSelf = this.deleteSelf.bind(this);
  }

  deleteSelf() {
    this.props.onDeleteClick(this.props.id);
  }

  render() {
    const { id } = this.props;
    return (
      <XUIPill
        className="xui-autocompleter--pill"
        deleteButtonLabel="Delete"
        key={id}
        onDeleteClick={this.deleteSelf}
        size="small"
        value={people[id].name}
      />
    );
  }
}

class AutoExample extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      value: '',
      selectedPeopleIds: people[this.props.index] ? [this.props.index] : [],
    };

    this.clearSelection = this.clearSelection.bind(this);
    this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.deleteLastPerson = this.deleteLastPerson.bind(this);
    this.selectPerson = this.selectPerson.bind(this);
    this.completer = React.createRef();
  }

  onSearchChangeHandler(value) {
    const invalidInput = !!value.match(/[!.^%&#]/);
    if (invalidInput) {
      this.completer.current.closeDropdown();
    } else {
      this.completer.current.openDropdown();
    }
    this.setState({
      value,
      isInvalid: invalidInput,
    });
  }

  clearSelection() {
    this.setState(prevState => ({
      selectedPeopleIds: [],
    }));
  }

  deletePerson(idToRemove) {
    this.setState(prevState => ({
      selectedPeopleIds: [...prevState.selectedPeopleIds.filter(id => id !== idToRemove)],
    }));
  }

  deleteLastPerson() {
    this.setState(prevState => ({
      selectedPeopleIds: [...prevState.selectedPeopleIds.slice(0, -1)],
    }));
  }

  selectPerson(person) {
    const { isSingle } = this.props;
    this.setState(prevState => ({
      selectedPeopleIds: isSingle ? [person] : [...prevState.selectedPeopleIds, person],
      value: '',
    }));
  }

  renderPills(selectedPeopleIds) {
    return selectedPeopleIds.map(id => (
      <PillWrapper id={id} key={id} onDeleteClick={this.deletePerson} />
    ));
  }

  render() {
    const { value, selectedPeopleIds } = this.state;
    const unselectedPeopleIds = filterPeople(people, value, selectedPeopleIds);
    const { isSingle, ...spreadProps } = this.props;

    const leftElement = isSingle
      ? selectedPeopleIds[0] != null && (
          <XUITextInputSideElement type="avatar">
            <XUIAvatar
              imageUrl={people[selectedPeopleIds[0]].avatar}
              size="small"
              value={people[selectedPeopleIds[0]].name}
            />
          </XUITextInputSideElement>
        )
      : undefined;
    const rightElement =
      isSingle && !this.props.isDisabled
        ? selectedPeopleIds[0] != null && (
            <XUITextInputSideElement type="icon">
              <XUIIconButton ariaLabel="Clear" icon={crossIcon} onClick={this.clearSelection} />
            </XUITextInputSideElement>
          )
        : undefined;

    const dropdownContents =
      unselectedPeopleIds.length === 0 ? (
        <XUIPicklist>
          <XUIAutocompleterEmptyState id="no_people">No People Found</XUIAutocompleterEmptyState>
        </XUIPicklist>
      ) : (
        <XUIPicklist>
          {unselectedPeopleIds.map(person => {
            const secondaryContent = (
              <>
                {decorateSubStr(person.email, value || '', boldMatch)},{' '}
                {decorateSubStr(person.subtext, value || '', boldMatch)}
              </>
            );
            const headingContent = <>{decorateSubStr(person.name, value || '', boldMatch)}</>;
            return (
              <XUIPickitem
                headingElement={headingContent}
                id={person.id}
                isMultiline
                key={person.id}
                leftElement={
                  <XUIAvatar imageUrl={person.avatar} size="small" value={person.name} />
                }
                onSelect={this.selectPerson}
                secondaryElement={secondaryContent}
                shouldTruncate
                value={person.id}
              />
            );
          })}
        </XUIPicklist>
      );

    return (
      <XUIEditableTableCellAutocompleter
        isInputLabelHidden
        isInvalid={this.state.isInvalid}
        key={`${this.props.rowIndex}_${this.props.index}`}
        leftElement={leftElement}
        onBackspacePill={this.deleteLastPerson}
        onSearch={this.onSearchChangeHandler}
        openOnFocus
        pills={(!isSingle && this.renderPills(selectedPeopleIds)) || undefined}
        ref={this.completer}
        rightElement={rightElement}
        searchValue={isSingle ? selectedPeopleIds[0] && people[selectedPeopleIds[0]].name : value}
        {...spreadProps}
      >
        {dropdownContents}
      </XUIEditableTableCellAutocompleter>
    );
  }
}

const sampleAutocompleter = (id, text, settings, rowIndex) => {
  const label = settings.isSingle ? 'Select vendor' : 'Select contact';

  return (
    <AutoExample
      {...settings}
      index={id}
      inputLabel={text || label}
      key={id}
      placeholder={text || label}
      rowIndex={rowIndex}
    />
  );
};

const SecondarySearchData = [
  { props: { id: 'ss1' }, text: 'North' },
  { props: { id: 'ss2' }, text: 'Northeast' },
  { props: { id: 'ss3' }, text: 'East' },
  { props: { id: 'ss4' }, text: 'Southeast' },
  { props: { id: 'ss5' }, text: 'South' },
  { props: { id: 'ss6' }, text: 'Southwest' },
  { props: { id: 'ss7' }, text: 'West' },
  { props: { id: 'ss8' }, text: 'Northwest' },
  { props: { id: 'ss9' }, text: 'Central' },
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
  constructor(props) {
    super(props);
    this.state = {
      data: SecondarySearchData,
      selectedItemId: null,
      value: '',
      buttonContent: props.hasSelectedOption ? SecondarySearchData[1].text : '',
    };
  }

  onOptionSelect = (value, item) => {
    this.setState({
      selectedItemId: value,
      buttonContent: SecondarySearchData.filter(item => item.props.id === value)[0]?.text,
    });
  };

  onSearch = value => {
    const matchingData = SecondarySearchData.filter(item =>
      item.text.toLowerCase().includes(value.toLowerCase()),
    );

    this.setState({
      data: matchingData,
      value,
    });
  };

  onClose = () => {
    this.setState({
      value: '',
      data: SecondarySearchData,
    });
  };

  render() {
    const { value, data, selectedItemId } = this.state;
    const { hasSelectedOption, index, rowIndex, ...spreadProps } = this.props;

    const items =
      data.length > 0 ? (
        createItems(data, selectedItemId)
      ) : (
        <XUIAutocompleterEmptyState>No results found</XUIAutocompleterEmptyState>
      );

    const footer = (
      <XUIDropdownFooter
        pickItems={
          <XUIPickitem
            id="footerAction"
            leftElement={<XUIIcon className="xui-margin-right-xsmall" icon={plusIcon} />}
          >
            Add new region
          </XUIPickitem>
        }
      />
    );

    return (
      <XUIEditableTableCellAutocompleterSecondarySearch
        buttonContent={this.state.buttonContent}
        buttonContentPlaceholder="Search regions"
        footer={footer}
        inputLabel="Secondary search label"
        key={`${rowIndex}_${index}`}
        onOptionSelect={this.onOptionSelect}
        onSearch={this.onSearch}
        searchValue={value}
        {...spreadProps}
      >
        <XUIPicklist>{items}</XUIPicklist>
      </XUIEditableTableCellAutocompleterSecondarySearch>
    );
  }
}

const sampleSecondarySearch = (id, text, settings, rowIndex) => (
  <SecondarySearchExample
    {...settings}
    hasSelectedOption={rowIndex > 1}
    index={id}
    rowIndex={rowIndex}
  />
);

export const generateCell = ({
  cellsCount,
  cellType,
  columnIndex,
  inlineAlignment,
  isDisabled,
  isInvalid,
  randomiseContent,
  rowIndex,
  validationMessage,
}) => {
  const derivedCellType =
    cellType === 'assorted' ? samples[columnIndex % samples.length] : cellType;
  const settings = {
    key: nanoid(),
    inlineAlignment,
    isDisabled,
    isInvalid,
    isMultiline: derivedCellType === 'textInputMultiline',
    isSingle: derivedCellType === 'autoCompleterSingle',
    validationMessage,
  };
  const text = randomiseContent ? texts[cellsCount % texts.length] : undefined;
  const cellGenerator = sampleTypes[derivedCellType];
  if (cellGenerator) {
    return cellGenerator(columnIndex.toString(), text, settings, rowIndex);
  }
};

const sampleTypes = {
  textInput: sampleTextInput,
  textInputMultiline: sampleTextInput,
  readOnly: sampleReadOnly,
  selectBox: sampleSelect,
  autoCompleterSingle: sampleAutocompleter,
  autoCompleterMulti: sampleAutocompleter,
  secondarySearch: sampleSecondarySearch,
};
const samples = Object.keys(sampleTypes);

const texts = [
  'Sample text',
  '.',
  'User organisation settings',
  // 'https://docs.google.com/document/d/1IrcerSo_0gmzzlcugsH4tBqsrlDaNXUuub_YubQ9M3Y/edit',
  'Your name here',
  'X e r o',
];
