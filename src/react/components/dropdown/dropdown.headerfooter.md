`XUIDropdownHeader` and `XUIDropdownFooter` are used to add a fixed header and/or footer element to dropdowns. These elements don't scroll with the rest of the list, and are ignored by the default arrow key handlers. Add these components via the `header` and `footer` props in `XUIDropdown`.

If you've included any actions in the header or footer, set the `closeOnTab` property of `XUIDropdownToggled` to `false`, so users navigating by keyboard are able to access them.

```jsx harmony
import { useRef, useState } from 'react';
import searchPath from '@xero/xui-icon/icons/search';
import plusIcon from '@xero/xui-icon/icons/plus';

import XUIButton from '@xero/xui/react/button';
import XUIDropdown, {
  XUIDropdownToggled,
  XUIDropdownHeader,
  XUIDropdownFooter
} from '@xero/xui/react/dropdown';
import XUIIcon from '@xero/xui/react/icon';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';
import XUITextInput, { XUITextInputSideElement } from '@xero/xui/react/textinput';

const groups = ['Customers', 'Suppliers', 'Overseas clients'].map((text, id) => {
  return { id, text };
});

const getNumberOfTrueValues = items => Object.keys(items).filter(key => !!items[key]).length;

const DropdownHeaderFooterExample = () => {
  const [items, setItems] = useState(groups);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState({ 0: false, 1: false, 2: false });
  const [selectedCount, setSelectedCount] = useState(0);
  const [highlightedId, setHighlightedId] = useState(null);
  const [previousSelected, setPreviousSelected] = useState(null);

  const ddt = useRef();
  const dropdownRef = useRef();
  const input = useRef();
  const triggerRef = useRef();

  const onSearch = event => {
    const value = event.target.value;
    setSearch(value);
    setItems(groups.filter(group => group.text.toLowerCase().indexOf(value.toLowerCase()) > -1));
  };

  const onSearchKeyDown = event => {
    const isKeySpacebar = event => event.key === ' ';

    //Allow users to type spaces without selecting
    if (!isKeySpacebar(event)) {
      dropdownRef.current && dropdownRef.current.onKeyDown(event);
    }
  };

  const onSelect = value => {
    setSelected({ ...selected, [value]: !selected[value] });
  };

  const onHighlightChange = item => setHighlightedId(item.props.id);

  const closeDropdown = () => {
    ddt.current.closeDropdown();
    triggerRef.current.focus();
  };

  const onApplyClick = () => {
    setSelectedCount(getNumberOfTrueValues(selected));
    setPreviousSelected(null);
    closeDropdown();
  };

  const onClose = () => {
    const newSelected = previousSelected || selected;
    setSelected(newSelected);
    setPreviousSelected(null);
    setSelectedCount(getNumberOfTrueValues(newSelected));
    setSearch('');
    setItems(groups);
  };

  const onOpen = () => setPreviousSelected(selected);

  const focusInput = () => input.current && input.current.focus();

  const dropdownHeader = (
    <XUIDropdownHeader
      onPrimaryButtonClick={onApplyClick}
      onSecondaryButtonClick={closeDropdown}
      primaryButtonContent="Apply"
      secondaryButtonContent="Cancel"
      title="Add to group"
    >
      <XUITextInput
        fieldClassName="xui-u-fullwidth"
        inputProps={{
          'aria-activedescendant': highlightedId
        }}
        inputRef={input}
        isBorderlessSolid
        leftElement={
          <XUITextInputSideElement type="icon">
            <XUIIcon icon={searchPath} isBoxed />
          </XUITextInputSideElement>
        }
        onChange={onSearch}
        onKeyDown={onSearchKeyDown}
        placeholder="Search"
        type="search"
        value={search}
      />
    </XUIDropdownHeader>
  );

  const dropdownFooter = (
    <XUIDropdownFooter
      pickItems={
        <XUIPickitem
          id="footerAction"
          leftElement={<XUIIcon className="xui-margin-right-xsmall" icon={plusIcon} isInline />}
          onClick={() => console.log('New group - onClick')}
        >
          New group
        </XUIPickitem>
      }
    />
  );

  const trigger = (
    <XUIButton hasCaret ref={triggerRef}>
      {selectedCount > 0 ? `${selectedCount} groups selected` : 'Group'}
    </XUIButton>
  );

  const dropdown = (
    <XUIDropdown
      footer={dropdownFooter}
      hasFixedWidth
      hasKeyboardEvents={false}
      header={dropdownHeader}
      onHighlightChange={onHighlightChange}
      onSelect={onSelect}
      ref={dropdownRef}
      size="large"
    >
      <XUIPicklist>
        {items.map(item => {
          const { id, text } = item;

          return (
            <XUIPickitem id={id} isMultiselect isSelected={selected[id]} key={id} value={id}>
              {text}
            </XUIPickitem>
          );
        })}
      </XUIPicklist>
    </XUIDropdown>
  );

  return (
    <XUIDropdownToggled
      closeOnSelect={false}
      dropdown={dropdown}
      onClose={onClose}
      onOpen={onOpen}
      onOpenAnimationEnd={focusInput}
      ref={ddt}
      trigger={trigger}
      useNewFocusBehaviour
    />
  );
};

<DropdownHeaderFooterExample />;
```
