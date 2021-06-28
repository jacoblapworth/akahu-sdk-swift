/* eslint-disable max-classes-per-file */
import React, { Component, PureComponent } from 'react';
import crossIcon from '@xero/xui-icon/icons/cross-small';

import {
  XUIEditableTableCellAutocompleter,
  XUIEditableTableCellReadOnly,
  XUIEditableTableCellSelectBox,
  XUIEditableTableCellTextInput,
} from '../../../editabletable';
import XUIButton, { XUIIconButton } from '../../../button';
import { XUISelectBoxOption } from '../../../selectbox';
import XUIPicklist, { XUIPickitem } from '../../../picklist';
import XUIAvatar from '../../../avatar';
import { XUIAutocompleterEmptyState } from '../../../autocompleter';
import { decorateSubStr, boldMatch } from '../../autocompleter/helpers/highlighting';
import { XUITextInputSideElement } from '../../../textinput';
import XUIPill from '../../../pill';
import people from '../../autocompleter/private/people';

const sampleReadOnly = (id, text, { inlineAlignment }, rowIndex) => (
  <XUIEditableTableCellReadOnly id={id} inlineAlignment={inlineAlignment} key={`${rowIndex}_${id}`}>
    {text}
  </XUIEditableTableCellReadOnly>
);

const sampleTextInput = (
  id,
  text,
  { isDisabled, inlineAlignment, isInvalid, isMultiline, validationMessage },
  rowIndex,
) => (
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

const sampleSelect = (id, text, settings) => (
  <XUIEditableTableCellSelectBox {...settings} buttonContent={text} id={id} key={id} label={text}>
    <XUISelectBoxOption id={`${id}_a`} key="a" value="Apple">
      Apple
    </XUISelectBoxOption>
    <XUISelectBoxOption id={`${id}_b`} key="b" value="Banana">
      Banana
    </XUISelectBoxOption>
    <XUISelectBoxOption id={`${id}_c`} key="c" value="Cucumber">
      Cucumber
    </XUISelectBoxOption>
  </XUIEditableTableCellSelectBox>
);

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
    this.setState(prevState => ({
      selectedPeopleIds: [...prevState.selectedPeopleIds, person],
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
        inputLabel="autocompleter"
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

const sampleAutocompleter = (id, text, settings, rowIndex) => (
  <AutoExample {...settings} index={id} key={id} placeholder={text} rowIndex={rowIndex} />
);

const generateCell = ({
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
  const cellIndex = cellsCount.toString();
  const derivedCellType =
    cellType === 'assorted' ? samples[columnIndex % samples.length] : cellType;
  const settings = {
    inlineAlignment,
    isDisabled,
    isInvalid,
    isMultiline: derivedCellType === 'textInputMultiline',
    isSingle: derivedCellType === 'autoCompleterSingle',
    validationMessage,
  };
  const text = (randomiseContent && texts[cellsCount % texts.length]) || derivedCellType;
  const cellGenerator = sampleTypes[derivedCellType];
  if (cellGenerator) {
    return cellGenerator(columnIndex.toString(), text, settings, rowIndex);
  }
};

const sampleTypes = {
  readOnly: sampleReadOnly,
  textInput: sampleTextInput,
  textInputMultiline: sampleTextInput,
  selectBox: sampleSelect,
  autoCompleterSingle: sampleAutocompleter,
  autoCompleterMulti: sampleAutocompleter,
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

export default generateCell;
