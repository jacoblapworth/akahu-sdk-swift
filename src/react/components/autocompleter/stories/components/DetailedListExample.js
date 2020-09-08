import plusIcon from '@xero/xui-icon/icons/plus';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import XUIAvatar from '../../../avatar/XUIAvatar';
import DropDownFooter from '../../../dropdown/DropDownFooter';
import { sizeShift } from '../../../helpers/sizes';
import XUIIcon from '../../../icon/XUIIcon';
import Pickitem from '../../../picklist/Pickitem';
import Picklist from '../../../picklist/Picklist';
import { boldMatch, decorateSubStr } from '../../helpers/highlighting';
import peopleDataSet from '../../private/people';
import XUIAutocompleter from '../../XUIAutocompleter';
import XUIAutocompleterEmptyState from '../../XUIAutocompleterEmptyState';
import PillWrapper from './PillWrapper';

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
/**
 * Example to show how the children can be styled however and you also define your own search criteria.
 */
class DetailedListExample extends Component {
  state = {
    value: '',
    people: filterPeople(peopleDataSet, '', [peopleDataSet[0]]),
    selectedPeople: [peopleDataSet[0]],
    prevProps: this.props,
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

    if (!Array.isArray(people) || people.length <= 0) {
      return (
        <XUIAutocompleterEmptyState id="no_people">No People Found</XUIAutocompleterEmptyState>
      );
    }

    const items = people.map(item => {
      const secondaryContent = (
        <>
          {decorateSubStr(item.email, value || '', boldMatch)},{' '}
          {decorateSubStr(item.subtext, value || '', boldMatch)}
        </>
      );
      const headingContent = <>{decorateSubStr(item.name, value || '', boldMatch)}</>;
      return (
        <Pickitem
          headingElement={headingContent}
          id={item.id}
          isMultiline
          key={item.id}
          leftElement={
            <XUIAvatar imageUrl={item.avatar} size={sizeShift('medium', -1)} value={item.name} />
          }
          onSelect={() => this.selectPerson(item)}
          secondaryElement={secondaryContent}
          shouldTruncate
        />
      );
    });

    return <Picklist>{items}</Picklist>;
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

  componentDidUpdate(prevProps, prevState) {
    const { openDrawer } = this.props;

    if (this.props.openDrawer !== prevProps.openDrawer) {
      if (openDrawer) {
        this.completer.current.openDropDown();
      } else {
        this.completer.current.closeDropDown();
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { selectedPeople } = nextProps;

    if (nextProps !== prevState.prevProps) {
      if (typeof selectedPeople === 'number') {
        return {
          selectedPeople: peopleDataSet.slice(0, selectedPeople),
          prevProps: nextProps,
        };
      }
      return {
        selectedPeople: [],
        prevProps: nextProps,
      };
    }
    return null;
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
      inputId,
      inputProps,
    } = example.props;

    const footer = (
      <DropDownFooter
        pickItems={
          <Pickitem id="footerAction">
            <XUIIcon className="xui-margin-right-small" icon={plusIcon} isBoxed />
            Add New Person
          </Pickitem>
        }
      />
    );

    const dropdownFixedWidth = dropdownSize == null;

    return (
      <XUIAutocompleter
        closeOnTab={noDrawerFooter}
        disableWrapPills={disableWrapPills}
        dropdownFixedWidth={dropdownFixedWidth}
        dropdownSize={dropdownSize}
        footer={noDrawerFooter ? null : footer}
        hintMessage={hintMessage}
        inputId={inputId}
        inputLabel={this.props.inputLabel || 'Sample Autocompleter'}
        inputProps={inputProps}
        isDisabled={isDisabled}
        isInputLabelHidden={isInputLabelHidden === undefined ? true : isInputLabelHidden}
        isInvalid={isInvalid}
        loading={isLoading}
        loadingLabel="Loading"
        onBackspacePill={this.deleteLastPerson}
        onClose={() => this.onClose()}
        onSearch={example.onSearchChangeHandler}
        pills={this.renderPills(selectedPeople)}
        placeholder={placeholder}
        ref={this.completer}
        searchValue={value}
        validationMessage={validationMessage}
      >
        {example.getItems()}
      </XUIAutocompleter>
    );
  }
}

DetailedListExample.propTypes = {
  openDrawer: PropTypes.bool,
  selectedPeople: PropTypes.number,
};

export default DetailedListExample;
