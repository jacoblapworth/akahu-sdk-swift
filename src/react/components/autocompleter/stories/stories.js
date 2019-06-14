// Libs
import React, { Component, PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

// Components we need to test with
import XUIAutocompleter from '../XUIAutocompleter';
import XUIAutocompleterEmptyState from '../XUIAutocompleterEmptyState';
import XUIAutocompleterSecondarySearch from '../XUIAutocompleterSecondarySearch';
import XUIButton from '../../button/XUIButton';
import XUIButtonCaret from '../../button/XUIButtonCaret';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import peopleDataSet from '../private/people';
import DropDownFooter from '../../dropdown/DropDownFooter';
import XUIIcon from '../../icon/XUIIcon';
import plusIcon from '@xero/xui-icon/icons/plus';
import XUIPill from '../../pill/XUIPill';
import XUIAvatar from '../../avatar/XUIAvatar';
import { decorateSubStr, boldMatch } from '../helpers/highlighting';
import { sizeShift } from '../../helpers/sizes';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select, number } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName, fixedWidthDropdownSizes } from './variations';

class PillWrapper extends PureComponent {
  deleteSelf = e => {
    this.props.onDeleteClick(this.props.id);
  };

  render() {
    const { id } = this.props;
    return (
      <XUIPill
        value={peopleDataSet[id].name}
        className="xui-autocompleter--pill"
        onDeleteClick={this.deleteSelf}
        key={id}
      />
    );
  }
}

const filterPeople = (data, value, peopleToExclude) =>
  data.filter(node => {
    const val = (value && value.toLowerCase()) || '';

    // You could use String.includes here, however you would need to add the polyfill for IE11 support.
    return (
      !peopleToExclude.find(person => person.id === node.id) &&
      (node.name.toLowerCase().indexOf(val) > -1 ||
        node.email.toLowerCase().indexOf(val) > -1 ||
        node.subtext.toLowerCase().indexOf(val) > -1)
    );
  });

// Example to show how the children can be styled however and you also define your own search criteria.
class DetailedListExample extends Component {
  state = {
    value: '',
    people: filterPeople(peopleDataSet, '', [peopleDataSet[0]]),
    selectedPeople: [peopleDataSet[0]],
  };
  completer = React.createRef();

  onSearchChangeHandler = value => {
    const example = this;
    example.completer.current.openDropDown();
    example.setState(prevState => ({
      value,
      people: filterPeople(peopleDataSet, value, prevState.selectedPeople),
    }));
  };

  deletePerson = id => {
    this.setState(prevState => {
      const selectedPeople = [...prevState.selectedPeople.filter(person => person.id !== id)];
      return {
        selectedPeople,
        people: filterPeople(peopleDataSet, prevState.value, selectedPeople),
      };
    });
  };

  deleteLastPerson = () => {
    const example = this;
    const { selectedPeople } = example.state;
    const lastSelectedPerson = selectedPeople[selectedPeople.length - 1];
    example.deletePerson(lastSelectedPerson.id);
  };

  selectPerson(person) {
    this.setState(prevState => {
      const selectedPeople = [...prevState.selectedPeople, person];
      return {
        value: null,
        selectedPeople,
        people: filterPeople(peopleDataSet, '', selectedPeople),
      };
    });
  }

  onClose() {
    this.setState({ value: null });
  }

  getItems() {
    const example = this;
    const { value, people } = example.state;
    const listSize = example.props.picklistSize || 'medium';

    if (!Array.isArray(people) || people.length <= 0) {
      return (
        <XUIAutocompleterEmptyState id="no_people">No People Found</XUIAutocompleterEmptyState>
      );
    }

    const items = people.map(item => {
      const secondaryContent = (
        <Fragment>
          {decorateSubStr(item.email, value || '', boldMatch)},{' '}
          {decorateSubStr(item.subtext, value || '', boldMatch)}
        </Fragment>
      );
      const headingContent = (
        <Fragment>{decorateSubStr(item.name, value || '', boldMatch)}</Fragment>
      );
      return (
        <Pickitem
          key={item.id}
          id={item.id}
          onSelect={() => this.selectPerson(item)}
          shouldTruncate
          leftElement={
            <XUIAvatar value={item.name} imageUrl={item.avatar} size={sizeShift(listSize, -1)} />
          }
          secondaryElement={secondaryContent}
          headingElement={headingContent}
          isMultiline
        />
      );
    });

    return <Picklist size={listSize}>{items}</Picklist>;
  }

  componentDidMount() {
    const { openDrawer, selectedPeople } = this.props;

    if (openDrawer) {
      this.completer.current.openDropDown();
    }

    if (selectedPeople != null && typeof selectedPeople === 'number') {
      this.setState({
        selectedPeople: peopleDataSet.slice(0, selectedPeople),
      });
    } else {
      this.setState({
        selectedPeople: [],
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { openDrawer, selectedPeople } = nextProps;

    if (openDrawer) {
      this.completer.current.openDropDown();
    } else {
      this.completer.current.closeDropDown();
    }

    if (selectedPeople != null && typeof selectedPeople === 'number') {
      this.setState({
        selectedPeople: peopleDataSet.slice(0, selectedPeople),
      });
    } else {
      this.setState({
        selectedPeople: [],
      });
    }
  }

  renderPills(selectedPeople) {
    return selectedPeople.map(person => (
      <PillWrapper id={person.id} key={person.id} onDeleteClick={this.deletePerson} />
    ));
  }

  render() {
    const example = this;
    const { value, selectedPeople } = example.state;
    const {
      isLoading,
      placeholder,
      dropdownSize,
      isDisabled,
      noDrawerFooter,
      disableWrapPills,
      isInvalid,
      validationMessage,
      hintMessage,
      isInputLabelHidden,
      inputSize,
      picklistSize,
      inputId,
      inputProps,
    } = example.props;

    const footer = (
      <DropDownFooter
        pickItems={
          <Pickitem id="footerAction">
            <XUIIcon icon={plusIcon} isBoxed className="xui-margin-right-small" />
            Add New Person
          </Pickitem>
        }
      />
    );

    const dropdownFixedWidth = dropdownSize == null;

    return (
      <XUIAutocompleter
        ref={this.completer}
        onSearch={example.onSearchChangeHandler}
        placeholder={placeholder}
        searchValue={value}
        dropdownFixedWidth={dropdownFixedWidth}
        footer={noDrawerFooter ? null : footer}
        closeOnTab={noDrawerFooter}
        onClose={() => this.onClose()}
        onBackspacePill={this.deleteLastPerson}
        loading={isLoading}
        dropdownSize={dropdownSize}
        isDisabled={isDisabled}
        inputLabel="Sample Autocompleter"
        disableWrapPills={disableWrapPills}
        isInputLabelHidden={isInputLabelHidden === undefined ? true : isInputLabelHidden}
        isInvalid={isInvalid}
        validationMessage={validationMessage}
        hintMessage={hintMessage}
        pills={this.renderPills(selectedPeople)}
        inputSize={inputSize}
        inputId={inputId}
        inputProps={inputProps}
      >
        {example.getItems()}
      </XUIAutocompleter>
    );
  }
}

DetailedListExample.propTypes = {
  openDrawer: PropTypes.bool,
  selectedPeople: PropTypes.number,
  inputSize: PropTypes.oneOf(['small', 'medium']),
  picklistSize: PropTypes.oneOf(['small', 'xsmall', 'medium']),
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
  const userSelectedPerson = select(
    'Select a person',
    peopleDataSet.map(person => person.name),
    'Frida',
  );
  // People are picked from the list with a slice, now, so index + 1.
  const selectedPerson = peopleDataSet.findIndex(i => i.name === userSelectedPerson) + 1;

  const fullSize = boolean('Match dropdown width', true);
  const userSelectedSize = fullSize
    ? ''
    : select('Dropdown size', fixedWidthDropdownSizes, 'small');

  const containerWidth = `${number('Container width', 500)}px`;

  return (
    <div style={{ width: containerWidth }}>
      <DetailedListExample
        openDrawer={boolean('Drawer open', false)}
        placeholder={text('Placeholder', '')}
        selectedPeople={selectedPerson}
        isDisabled={boolean('Disabled', false)}
        isInvalid={boolean('Invalid', false)}
        validationMessage={text('validation msg', '')}
        hintMessage={text('hint msg', '')}
        dropdownSize={userSelectedSize || undefined}
        inputSize={select('input size', ['medium', 'small'], 'medium')}
        picklistSize={select('picklist size', ['small', 'xsmall', 'medium'], 'medium')}
        isInputLabelHidden={boolean('Hide label', false)}
      />
    </div>
  );
});

const isSelected = (item, selectedIds) =>
  item.props.id === selectedIds || (!!selectedIds && selectedIds[item.props.id]);

function createItems(item, selectedId) {
  if (Array.isArray(item)) {
    return item.map(i => createItems(i, selectedId));
  }

  return (
    <Pickitem
      {...item.props}
      value={item.props.id}
      key={item.props.id}
      isSelected={isSelected(item, selectedId)}
    >
      {item.text}
    </Pickitem>
  );
}

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
    this.autocompleterRef.current.openDropDown();
  }

  render() {
    const { data } = this.state;

    const trigger = (
      <XUIButton type="button" onClick={() => {}} data-ref="toggled_trigger">
        Toggle Me <XUIButtonCaret />
      </XUIButton>
    );

    const items =
      data.length > 0 ? createItems(data, this.state.selectedItem) : <XUIAutocompleterEmptyState />;

    const footer = (
      <DropDownFooter
        pickItems={
          <Pickitem id="footerAction">
            <span>
              <XUIIcon icon={plusIcon} isBoxed className="xui-margin-right-small" />
              Add New Person
            </span>
          </Pickitem>
        }
      />
    );

    return (
      <div>
        <XUIAutocompleterSecondarySearch
          trigger={trigger}
          onOptionSelect={this.onOptionSelect}
          onSearch={this.onSearch}
          dropdownSize="medium"
          inputLabel="secondary search label"
          isInputLabelHidden
          qaHook="secondary-search"
          closeOnTab={false}
          footer={footer}
          ref={this.autocompleterRef}
          inputId="secondary_input_id"
        >
          <Picklist>{items}</Picklist>
        </XUIAutocompleterSecondarySearch>
      </div>
    );
  }
}

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    variationMinusStoryDetails.storyKind = undefined;
    variationMinusStoryDetails.storyTitle = undefined;
    variationMinusStoryDetails.storyType = undefined;

    if (variation.storyType === 'XUIAutocompleterSecondarySearch') {
      return <SecondarySearchExample />;
    }

    return (
      <div style={{ width: '500px' }}>
        <DetailedListExample {...variationMinusStoryDetails} />
      </div>
    );
  });
});
