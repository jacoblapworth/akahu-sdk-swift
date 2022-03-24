This component behaves similarly to an autocompleter, except that it is triggered by a button instead of an input. The input is a secondary interaction, focused by default when the dropdown opens. The secondary search component is a separate component to the autocompleter but share similar APIs.

```jsx harmony
import { useState } from 'react';
import plus from '@xero/xui-icon/icons/plus';

import {
  XUIAutocompleterEmptyState,
  XUIAutocompleterSecondarySearch
} from '@xero/xui/react/autocompleter';
import XUIAvatar from '@xero/xui/react/avatar';
import XUIButton from '@xero/xui/react/button';
import { XUIDropdownFooter } from '@xero/xui/react/dropdown';
import XUIIcon from '@xero/xui/react/icon';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';

const projects = [
  { contact: 'Abby & Wells', id: 'ss1', text: 'Website redesign' },
  { contact: 'Eastside Club', id: 'ss2', text: 'Website IA' },
  { contact: 'Luna Cafe', id: 'ss3', text: 'Brochure design' },
  { contact: 'Rite Agency', id: 'ss4', text: 'Ad campaign' }
];

const isSelected = (item, selectedIds) =>
  item.id === selectedIds || (!!selectedIds && selectedIds[item.id]);

const createItems = (item, selectedId) => {
  if (Array.isArray(item)) {
    return item.map(i => createItems(i, selectedId));
  }

  const { contact, id, text } = item;

  return (
    <XUIPickitem
      id={id}
      isSelected={isSelected(item, selectedId)}
      key={id}
      leftElement={<XUIAvatar size="small" value={contact} variant="business" />}
      value={item}
    >
      {text}
    </XUIPickitem>
  );
};

const AutocompleterSecondarySearchExample = () => {
  const [data, setData] = useState(projects);
  const [selectedItem, setSelectedItem] = useState(null);
  const [value, setValue] = useState('');

  const onOptionSelect = item => {
    setSelectedItem(item);
  };

  const onSearch = value => {
    const matchingData = projects.filter(item =>
      item.text.toLowerCase().includes(value.toLowerCase())
    );

    setData(matchingData);
    setValue(value);
  };

  const onClose = () => {
    setValue('');
    setData(projects);
  };

  const trigger = <XUIButton hasCaret>{selectedItem ? selectedItem.text : 'Project'}</XUIButton>;

  const items =
    data.length > 0 ? (
      createItems(data, selectedItem)
    ) : (
      <XUIAutocompleterEmptyState>No projects found</XUIAutocompleterEmptyState>
    );

  const footer = (
    <XUIDropdownFooter
      pickItems={
        <XUIPickitem
          id="footerAction"
          leftElement={<XUIIcon className="xui-margin-right-xsmall" icon={plus} />}
          onClick={() => console.log('Add new project - onClick')}
        >
          Add new project
        </XUIPickitem>
      }
    />
  );

  return (
    <div>
      <XUIAutocompleterSecondarySearch
        dropdownSize="medium"
        footer={footer}
        inputLabel="Search projects"
        isInputLabelHidden
        onClose={onClose}
        onOptionSelect={onOptionSelect}
        onSearch={onSearch}
        placeholder="Search projects"
        searchValue={value}
        trigger={trigger}
        useNewFocusBehaviour
      >
        <XUIPicklist>{items}</XUIPicklist>
      </XUIAutocompleterSecondarySearch>
    </div>
  );
};

<AutocompleterSecondarySearchExample />;
```
