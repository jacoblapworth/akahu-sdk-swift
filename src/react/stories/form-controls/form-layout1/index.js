// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Story book things
import { storiesOf } from '@storybook/react';

// Components we need to test with
import arrow from '@xero/xui-icon/icons/arrow';
import XUIDropdown, { XUIDropdownToggled } from '../../../dropdown';
import XUIPicklist, { XUIPickitem } from '../../../picklist';
import XUIButton from '../../../button';
import XUITextInput from '../../../textinput';
import XUICheckbox, { XUICheckboxGroup } from '../../../checkbox';
import XUIRadio, { XUIRadioGroup } from '../../../radio';
import XUISwitch from '../../../switch';
import XUIToggle, { XUIToggleOption } from '../../../toggle';
import XUIAutocompleter, { XUIAutocompleterEmptyState } from '../../../autocompleter';
import people from '../../../components/autocompleter/private/people';
import XUIAvatar from '../../../avatar';
import { decorateSubStr, boldMatch } from '../../../components/autocompleter/helpers/highlighting';
import XUIPill from '../../../pill';
import XUITag from '../../../tag';
import XUIIcon from '../../../icon';

// Private modules
import Form from '../helpers/form';
import XUIInputGroup from '../../../components/inputgroup/XUIInputGroup';
import LayoutSelect from './select-box';
import PanelSection from './panel-section';

import { storyNames, compositionKind } from '../tests';

const NOOP = () => {};

const test = storiesOf(compositionKind, module);

const inputMap = {
  ah: 'account-holder',
  ird: 'ird-number',
  bank: 'bank-account',
  bankChoice: 'select-one-bank',
  nameFirst: 'name-first',
  nameMiddle: 'name-middle',
  nameLast: 'name-last',
  foodType: 'food-type',
  foodName: 'food-name',
  autoResize: 'auto-resize',
  whatCity: 'what-city',
  whatColour: 'what-colour',
  whatColour2: 'what-colour2',
  people: 'chosen-people',
  whatBird: 'what-bird',
  thingOn: 'thing-on',
};

const filterPeople = (data, value, peopleToExclude) =>
  data.filter(node => {
    const val = value.toLowerCase();

    // You could use String.includes here, however you would need to add the polyfill for IE11 support.
    return (
      !peopleToExclude.find(person => person.id === node.id) &&
      (node.name.toLowerCase().indexOf(val) > -1 ||
        node.email.toLowerCase().indexOf(val) > -1 ||
        node.subtext.toLowerCase().indexOf(val) > -1)
    );
  });

test.add(storyNames.formLayout, () => {
  class Page extends React.PureComponent {
    constructor() {
      super();

      this.state = {
        selectedPeople: [],
        value: '',
        people: [],
        foodType: '',
      };

      this.logForm = this.logForm.bind(this);

      // Autocompleter
      this.onSearchChangeHandler = this.onSearchChangeHandler.bind(this);
      this.closeAutoCompleter = this.closeAutoCompleter.bind(this);
      this.selectPerson = this.selectPerson.bind(this);
      this.deletePerson = this.deletePerson.bind(this);
      this.getItems = this.getItems.bind(this);

      this._form = React.createRef();
      this._autocompleter = React.createRef();
    }

    logForm() {
      const { selectedPeople: people, foodType } = this.state;
      const data = { ...this._form.current?.getInputs(), people, foodType };
      console.log(data); // eslint-disable-line
    }

    onSearchChangeHandler(value) {
      this._autocompleter.current?.openDropdown();
      this.setState(prevState => ({
        value,
        people: filterPeople(people, value, prevState.selectedPeople),
      }));
    }

    selectPerson(person) {
      this.setState(prevState => {
        const selectedPeople = [...prevState.selectedPeople, person];
        return {
          value: '',
          selectedPeople,
          people: filterPeople(people, '', selectedPeople),
        };
      });
    }

    deletePerson(id) {
      this.setState(prevState => {
        const selectedPeople = [...prevState.selectedPeople].filter(person => person.id !== id);
        return {
          selectedPeople,
          people: filterPeople(people, prevState.value, selectedPeople),
        };
      });
    }

    closeAutoCompleter() {
      this.setState({ value: '' });
    }

    getItems() {
      const { value, people } = this.state;

      if (!Array.isArray(people) || people.length <= 0) {
        return (
          <XUIAutocompleterEmptyState id="no_people">No People Found</XUIAutocompleterEmptyState>
        );
      }

      const items = people.map(item => (
        <XUIPickitem id={item.id} key={item.id} onSelect={() => this.selectPerson(item)}>
          <div className="xui-u-flex">
            <XUIAvatar imageUrl={item.avatar} value={item.name} />
            <div className="xui-u-grow xui-padding-left">
              <div className="xui-heading-item xui-text-truncated">
                {decorateSubStr(item.name, value || '', boldMatch)}
              </div>
              <div className="xui-text-secondary xui-text-truncated">
                {decorateSubStr(item.email, value || '', boldMatch)},{' '}
                {decorateSubStr(item.subtext, value || '', boldMatch)}
              </div>
            </div>
          </div>
        </XUIPickitem>
      ));

      return <XUIPicklist>{items}</XUIPicklist>;
    }

    render() {
      const { value, selectedPeople, foodType } = this.state;

      const { banks } = this.props;

      return (
        <div className="capture xui-panel xui-page-width-standard xui-margin-vertical-xlarge">
          <Form noLayout ref={this._form}>
            <header className="xui-panel--header xui-padding-horizontal-small xui-u-flex xui-u-flex-align-center">
              <div className="xui-panel--heading xui-margin-left-small">
                All major inputs in various formats
              </div>
            </header>

            <PanelSection className="xui-padding-vertical" formLayout headerContent="Inputs">
              <XUITextInput
                id={inputMap.ah}
                isFieldLayout
                label="Account Holder"
                name={inputMap.ah}
              />

              <XUITextInput
                hintMessage="Found on the top of your IR3 statement"
                inputProps={{
                  name: inputMap.ird,
                  id: inputMap.ird,
                }}
                isFieldLayout
                label="IRD Number"
              />

              <XUITextInput
                defaultValue="A very invalid message"
                inputProps={{
                  name: inputMap.bank,
                  id: inputMap.bank,
                }}
                isFieldLayout
                isInvalid
                label="Bank account number"
                validationMessage="Well, it's not right is it"
              />

              <XUIInputGroup isFieldLayout label="Your name">
                <XUITextInput
                  inputProps={{ name: inputMap.nameFirst, id: inputMap.nameFirst }}
                  isLabelHidden
                  label="First name"
                />
                <XUITextInput
                  inputProps={{ name: inputMap.nameMiddle, id: inputMap.nameMiddle }}
                  isLabelHidden
                  label="Middle name"
                />
                <XUITextInput
                  inputProps={{ name: inputMap.nameLast, id: inputMap.nameLast }}
                  isLabelHidden
                  label="Last name"
                />
              </XUIInputGroup>

              <XUIInputGroup
                columnWidths="max-content minmax(150px, 1fr)"
                isFieldLayout
                label="Choose a Food"
              >
                <XUIDropdownToggled
                  dropdown={
                    <XUIDropdown onSelect={value => this.setState({ foodType: value })}>
                      <XUIPicklist>
                        {['Vegetable', 'Fruit', 'Meat'].map((title, key) => (
                          <XUIPickitem
                            id={`${inputMap.foodType}-${title}`}
                            isSelected={title === foodType}
                            key={key}
                            value={title}
                          >
                            {title}
                          </XUIPickitem>
                        ))}
                      </XUIPicklist>
                    </XUIDropdown>
                  }
                  onOpen={() => {}}
                  trigger={<XUIButton hasCaret>{foodType || 'Food Type'}</XUIButton>}
                />
                <XUITextInput
                  inputProps={{
                    name: inputMap.foodName,
                    id: inputMap.foodName,
                  }}
                  isLabelHidden
                  label="Input label"
                />
              </XUIInputGroup>

              <XUITextInput
                inputProps={{
                  name: inputMap.autoResize,
                  id: inputMap.autoResize,
                }}
                isFieldLayout
                isMultiline
                label="This textarea auto-resizes"
                maxRows={5}
                minRows={2}
              />
            </PanelSection>

            <PanelSection className="xui-padding-vertical" formLayout headerContent="Selects">
              <LayoutSelect
                htmlFor={inputMap.bankChoice}
                id={inputMap.bankChoice}
                isFieldLayout
                label="Please select a bank"
                name={inputMap.bankChoice}
                onSelect={NOOP}
                title="Choose a bank"
              >
                {banks}
              </LayoutSelect>

              <XUIAutocompleter
                className="xui-field-layout"
                dropdownHasFixedWidth
                id={inputMap.people}
                inputLabel="Add people"
                name={inputMap.people}
                onClose={this.closeAutoCompleter}
                onSearch={this.onSearchChangeHandler}
                pills={selectedPeople.map(person => (
                  <XUIPill
                    className="xui-autocompleter--pill"
                    deleteButtonLabel="Delete"
                    key={person.id}
                    onDeleteClick={() => this.deletePerson(person.id)}
                    value={person.name}
                  />
                ))}
                placeholder="Search"
                ref={this._autocompleter}
                searchValue={value}
              >
                {this.getItems()}
              </XUIAutocompleter>
            </PanelSection>

            <PanelSection
              className="xui-padding-vertical"
              formLayout
              headerContent="Radios and Checkboxes"
            >
              <XUIRadioGroup isFieldLayout isLockedVertical label="Choose a city">
                {['Wellington', 'Canberra', 'Washington D.C', 'Carthage'].map(label => (
                  <XUIRadio
                    id={`${inputMap.whatCity}-${label}`} // Had to add this to the component, it didn't exist before
                    key={label}
                    name={inputMap.whatCity}
                    value={label}
                  >
                    {label}
                  </XUIRadio>
                ))}
              </XUIRadioGroup>

              <XUICheckboxGroup isFieldLayout isLockedVertical label="Favourite Birds">
                {['Tūī', 'Pīwakawaka', 'Ruru', 'Moa'].map(label => (
                  <XUICheckbox
                    id={`${inputMap.whatBird}-${label}`} // Had to add this to the component, it didn't exist before
                    key={label}
                    name={`${inputMap.whatBird}-${label}`}
                    value={label}
                  >
                    {label}
                  </XUICheckbox>
                ))}
              </XUICheckboxGroup>

              <XUIToggle className="xui-field-layout" label="Choose one colour" layout="fullwidth">
                {['Red', 'Blue', 'Green', 'Yellow'].map(label => (
                  <XUIToggleOption
                    id={`${inputMap.whatColour}-${label}`} // Had to add this to the component, it didn't exist before
                    key={label}
                    name={inputMap.whatColour}
                    onChange={NOOP}
                    type="radio"
                    value={label}
                  >
                    {label}
                  </XUIToggleOption>
                ))}
              </XUIToggle>

              <XUIToggle
                className="xui-field-layout"
                label="Choose many colours"
                layout="fullwidth"
              >
                {['Red', 'Blue', 'Green', 'Yellow'].map(label => (
                  <XUIToggleOption
                    id={`${inputMap.whatColour2}-${label}`} // Had to add this to the component, it didn't exist before
                    key={label}
                    name={`${inputMap.whatColour2}-${label}`}
                    onChange={() => {}}
                    type="checkbox"
                    value={label}
                  >
                    {label}
                  </XUIToggleOption>
                ))}
              </XUIToggle>
            </PanelSection>

            <PanelSection className="xui-padding-vertical" formLayout headerContent="Switches">
              <XUISwitch
                isReversed
                labelId={inputMap.thingOn}
                name={inputMap.thingOn}
                onChange={NOOP}
              >
                Is the thing on
              </XUISwitch>
            </PanelSection>

            <footer className="xui-panel--footer xui-actions xui-actions-layout xui-padding-large xui-u-flex-align-center">
              <p className="xui-margin-right xui-margin-vertical-none">
                The results of the form are published as an object to the <XUITag>console</XUITag>{' '}
                when you click this button <XUIIcon icon={arrow} rotation="270" />
              </p>
              <XUIButton onClick={this.logForm} variant="primary">
                Submit
              </XUIButton>
            </footer>
          </Form>
        </div>
      );
    }
  }
  Page.propTypes = {
    banks: PropTypes.array,
  };

  return <Page banks={['', 'ANZ', 'ASB', 'Kiwi Bank', 'Westpac']} />;
});
