`DropDownHeader` and `DropDownFooter` are used to add a fixed header and/or footer element to dropdowns. These elements don't scroll with the rest of the list, and are ignored by the default arrow key handlers. Add these components via the `header` and `footer` props in `DropDown`.

If you've included any actions in the header or footer, set the `closeOnTab` property of `DropDownToggled` to `false`, so users navigating by keyboard are able to access them.

```jsx harmony
import { Component } from 'react';
import DropDown, { DropDownToggled, DropDownHeader, DropDownFooter } from '../../dropdown';
import XUITextInput, { XUITextInputSideElement } from '../../textinput';
import Picklist, { Pickitem } from '../../picklist';
import XUIButton, { XUIButtonCaret } from '../../button';
import XUIIcon from '../../icon';
import { isKeySpacebar } from '../../helpers/reactKeyHandler';
import searchPath from '@xero/xui-icon/icons/search';
import plusIcon from '@xero/xui-icon/icons/plus';

const items = [
  'Apricot',
  'Banana',
  'Cherry',
  'Dragon Fruit',
  'Eggplant',
  'Fennel',
  'Grapefruit',
  'Honeydew',
  'Iceberg Lettuce',
  'Jackfruit',
  'Kiwifruit',
  'Lime',
  'Mango',
  'Nectarine',
  'Orange',
  'Pineapple',
  'Quince',
  'Rapberry',
  'Starfruit',
  'Tomato',
  'Uglifruit',
  'Valencia Orange',
  'Watermelon',
  'Xi gua',
  'Yellow quash',
  'Zucchini'
].map((text, id) => {
  return { id, text };
});

const getNumberOfTrueValues = items => Object.keys(items).filter(key => !!items[key]).length;

class XDD extends Component {
  constructor(...args) {
    super(...args);

    const selected = {};

    items.forEach(item => (selected[item.id] = false));

    this.state = {
      items,
      search: '',
      selected,
      selectedCount: 0
    };

    this.onApplyClick = this.onApplyClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.closeDropDown = this.closeDropDown.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSearchKeyDown = this.onSearchKeyDown.bind(this);
    this.focusInput = this.focusInput.bind(this);

    this.ddt = React.createRef();
    this.dropdown = React.createRef();
  }

  onSearch(event) {
    const val = event.target.value;
    this.setState({
      search: val,
      items: items.filter(item => item.text.toLowerCase().indexOf(val.toLowerCase()) > -1)
    });
  }

  onSearchKeyDown(event) {
    // Allow users to type spaces without selecting
    if (!isKeySpacebar(event)) {
      this.dropdown.current && this.dropdown.current.onKeyDown(event);
    }
  }

  onSelect(value) {
    this.setState(state => ({
      selected: {
        ...state.selected,
        [value]: !state.selected[value]
      }
    }));
  }

  closeDropDown() {
    this.ddt.current.closeDropDown();
  }

  onApplyClick() {
    this.setState(state => ({
      selectedCount: getNumberOfTrueValues(state.selected),
      previousSelected: null
    }));
    this.closeDropDown();
  }

  onClose() {
    this.setState(state => {
      const newSelected = state.previousSelected != null ? state.previousSelected : state.selected;
      return {
        selected: newSelected,
        previousSelected: null,
        selectedCount: getNumberOfTrueValues(newSelected),
        search: '',
        items: items
      };
    });
  }

  onOpen() {
    this.setState(state => ({
      previousSelected: state.selected
    }));
  }

  focusInput() {
    this.input && this.input.focus();
  }

  render() {
    const { items, search } = this.state;
    const dropdownHeader = (
      <DropDownHeader
        title="Select Fruit"
        onSecondaryButtonClick={this.closeDropDown}
        onPrimaryButtonClick={this.onApplyClick}
        primaryButtonContent="Apply"
        secondaryButtonContent="Cancel"
      >
        <XUITextInput
          inputRef={i => (this.input = i)}
          placeholder="Search"
          type="search"
          value={search}
          onKeyDown={this.onSearchKeyDown}
          onChange={this.onSearch}
          isBorderlessSolid
          fieldClassName="xui-u-fullwidth"
          leftElement={
            <XUITextInputSideElement type="icon">
              <XUIIcon icon={searchPath} isBoxed />
            </XUITextInputSideElement>
          }
        />
      </DropDownHeader>
    );

    const dropdownFooter = (
      <DropDownFooter
        pickItems={
          <Pickitem id="footerAction">
            <span>
              <XUIIcon isInline isBoxed icon={plusIcon} className="xui-margin-right-xsmall" />
              Add New Fruit
            </span>
          </Pickitem>
        }
      />
    );

    const trigger = (
      <XUIButton>
        {this.state.selectedCount > 0
          ? `${this.state.selectedCount} items selected`
          : 'Toggle Button'}
        <XUIButtonCaret />
      </XUIButton>
    );
    const dropdown = (
      <DropDown
        ref={this.dropdown}
        onSelect={this.onSelect}
        header={dropdownHeader}
        footer={dropdownFooter}
        size="large"
        hasKeyboardEvents={false}
        fixedWidth
      >
        <Picklist>
          {items.map(item => (
            <Pickitem
              key={item.id}
              id={item.id}
              value={item.id}
              isSelected={this.state.selected[item.id]}
              isMultiselect
            >
              {item.text}
            </Pickitem>
          ))}
        </Picklist>
      </DropDown>
    );
    return (
      <DropDownToggled
        ref={this.ddt}
        onOpenAnimationEnd={this.focusInput}
        trigger={trigger}
        dropdown={dropdown}
        closeOnSelect={false}
        closeOnTab={false}
        onClose={this.onClose}
        onOpen={this.onOpen}
      />
    );
  }
}
<XDD />;
```
