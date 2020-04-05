import React, { Component, PureComponent, Fragment } from 'react';

import {
  XUIEditableTableCellAutocompleter,
  XUIEditableTableCellReadOnly,
  XUIEditableTableCellSecondarySearch,
  XUIEditableTableCellSelectBox,
  XUIEditableTableCellTextInput,
} from '../../../editabletable';
import XUIButton from '../../button/XUIButton';
import SelectBoxOption from '../../select-box/SelectBoxOption';
import Picklist, { Pickitem } from '../../../picklist';
import XUIPill from '../../../pill';
import XUIAvatar from '../../../avatar';
import { XUIAutocompleterEmptyState } from '../../../autocompleter';
import { decorateSubStr, boldMatch } from '../../autocompleter/helpers/highlighting';

import people from '../../autocompleter/private/people';

const sampleReadOnly = (id, width, text) => (
  <XUIEditableTableCellReadOnly cellProps={{ width }} id={id} key={id}>
    {text}
  </XUIEditableTableCellReadOnly>
);

const sampleTextInput = (id, width, text) => (
  <XUIEditableTableCellTextInput
    cellProps={{ width }}
    defaultValue={text}
    id={id}
    isMultiline={!!(id % 2)}
    key={id}
    minRows={1}
  />
);

const sampleTextInputDisabled = (id, width, text) => (
  <XUIEditableTableCellTextInput
    cellProps={{ width }}
    defaultValue={text}
    id={id}
    isDisabled
    isMultiline={!!(id % 2)}
    key={id}
    minRows={1}
  />
);

const sampleSecondary = (id, width, text) => (
  <XUIEditableTableCellSecondarySearch
    cellProps={{ width }}
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

const sampleSecondaryDisabled = (id, width, text) => (
  <XUIEditableTableCellSecondarySearch
    cellProps={{ width }}
    id={id}
    key={id}
    onSearch={() => console.log('onSearch fired!')}
    trigger={<XUIButton isDisabled>{text}</XUIButton>}
  >
    <Picklist>
      <Pickitem id="pi1" primaryElement="Item content" />
      <Pickitem id="pi2" primaryElement="Item two" />
    </Picklist>
  </XUIEditableTableCellSecondarySearch>
);

const sampleSelect = (id, width, text) => (
  <XUIEditableTableCellSelectBox
    buttonContent={text}
    cellProps={{ width }}
    id={id}
    key={id}
    label={text}
  >
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

const sampleSelectDisabled = (id, width, text) => (
  <XUIEditableTableCellSelectBox
    buttonContent={text}
    cellProps={{ width }}
    id={id}
    isDisabled
    key={id}
    label={text}
  >
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

class WrapPillsExample extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      value: '',
      selectedPeopleIds: [this.props.index || null],
    };

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
        cellProps={{ width: this.props.width }}
        inputLabel="autocompleter"
        isDisabled={this.props.isDisabled}
        isInputLabelHidden
        isInvalid={this.state.isInvalid}
        onBackspacePill={this.deleteLastPerson}
        onSearch={this.onSearchChangeHandler}
        openOnFocus
        pills={this.renderPills(selectedPeopleIds)}
        placeholder={this.props.placeholder}
        ref={this.completer}
        searchValue={value}
      >
        {dropdownContents}
      </XUIEditableTableCellAutocompleter>
    );
  }
}

const sampleAutocompleter = (id, width, text) => (
  <WrapPillsExample index={id} placeholder={text} width={width} />
);

const sampleAutocompleterDisabled = (id, width, text) => (
  <WrapPillsExample index={id} isDisabled placeholder={text} width={width} />
);

const samples = [
  sampleReadOnly,
  sampleTextInput,
  sampleTextInput,
  sampleSecondary,
  sampleSelect,
  sampleAutocompleter,
  sampleTextInputDisabled,
  sampleSecondaryDisabled,
  sampleSelectDisabled,
  sampleAutocompleterDisabled,
];
const texts = [
  'Sample text',
  '.',
  'User organisation settings',
  // 'https://docs.google.com/document/d/1IrcerSo_0gmzzlcugsH4tBqsrlDaNXUuub_YubQ9M3Y/edit',
  'Your name here',
  'X e r o',
];
const widths = ['auto', '10px', '50px', '100px', '250px', '20%'];

export { samples, texts, widths };
