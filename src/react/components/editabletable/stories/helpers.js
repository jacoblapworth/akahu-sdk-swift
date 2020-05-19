import React, { Component, PureComponent, Fragment } from 'react';

import {
  XUIEditableTableCellAutocompleter,
  XUIEditableTableCellReadOnly,
  XUIEditableTableCellSecondarySearch,
  XUIEditableTableCellSelectBox,
  XUIEditableTableCellTextInput,
} from '../../../editabletable';
import XUIButton, { XUIIconButton } from '../../../button';
import { SelectBoxOption } from '../../../select-box';
import Picklist, { Pickitem } from '../../../picklist';
import XUIAvatar from '../../../avatar';
import { XUIAutocompleterEmptyState } from '../../../autocompleter';
import { decorateSubStr, boldMatch } from '../../autocompleter/helpers/highlighting';
import { XUITextInputSideElement } from '../../../textinput';
import XUIPill from '../../../pill';
import crossIcon from '@xero/xui-icon/icons/cross-small';

import people from '../../autocompleter/private/people';

const sampleReadOnly = (id, text, settings) => (
  <XUIEditableTableCellReadOnly {...settings} id={id} key={id}>
    {text}
  </XUIEditableTableCellReadOnly>
);

const sampleTextInput = (id, text, settings) => (
  <XUIEditableTableCellTextInput {...settings} defaultValue={text} id={id} key={id} minRows={1} />
);

const sampleSecondary = (id, text, settings) => (
  <XUIEditableTableCellSecondarySearch
    {...settings}
    id={id}
    key={id}
    onSearch={() => console.log('onSearch fired!')}
    trigger={<XUIButton>{text}</XUIButton>}
  >
    <Picklist>
      <Pickitem id="pi1" primaryElement="Item content" />
      <Pickitem id="pi2" primaryElement="Item two" />
    </Picklist>
  </XUIEditableTableCellSecondarySearch>
);

const sampleSelect = (id, text, settings) => (
  <XUIEditableTableCellSelectBox {...settings} buttonContent={text} id={id} key={id} label={text}>
    <SelectBoxOption id={`${id}_a`} key="a" value="Apple">
      Apple
    </SelectBoxOption>
    <SelectBoxOption id={`${id}_b`} key="b" value="Banana">
      Banana
    </SelectBoxOption>
    <SelectBoxOption id={`${id}_c`} key="c" value="Cucumber">
      Cucumber
    </SelectBoxOption>
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
      this.completer.current.closeDropDown();
    } else {
      this.completer.current.openDropDown();
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
        <Picklist>
          <XUIAutocompleterEmptyState id="no_people">No People Found</XUIAutocompleterEmptyState>
        </Picklist>
      ) : (
        <Picklist>
          {unselectedPeopleIds.map(person => {
            const secondaryContent = (
              <Fragment>
                {decorateSubStr(person.email, value || '', boldMatch)},{' '}
                {decorateSubStr(person.subtext, value || '', boldMatch)}
              </Fragment>
            );
            const headingContent = (
              <Fragment>{decorateSubStr(person.name, value || '', boldMatch)}</Fragment>
            );
            return (
              <Pickitem
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
        </Picklist>
      );
    return (
      <XUIEditableTableCellAutocompleter
        inputLabel="autocompleter"
        isInputLabelHidden
        isInvalid={this.state.isInvalid}
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

const sampleAutocompleter = (id, text, settings) => (
  <AutoExample {...settings} index={id} key={id} placeholder={text} />
);

const generateCell = ({
  cellsCount,
  cellType,
  columnIndex,
  randomiseContent,
  isDisabled,
  isInvalid,
  validationMessage,
}) => {
  const cellIndex = cellsCount.toString();
  const derivedCellType =
    cellType === 'assorted' ? samples[columnIndex % samples.length] : cellType;
  const settings = {
    isDisabled,
    isInvalid,
    isMultiline: derivedCellType === 'textInputMultiline',
    isSingle: derivedCellType === 'autoCompleterSingle',
    validationMessage,
  };
  const text = (randomiseContent && texts[cellsCount % texts.length]) || derivedCellType;
  const cellGenerator = sampleTypes[derivedCellType];
  if (cellGenerator) {
    return cellGenerator(cellIndex, text, settings);
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
