<div class="xui-margin-vertical">
	<a isDocLink href="../section-components-collectinginput-autocompleter.html">Autocompleter in the XUI Documentation</a>
</div>
`XUIAutocompleter` is a component that composes many other components together. It's an input where users can type to filter a list of items to select.

Refer to the following sections of the XUI Documentation for more information about the components that make up a `XUIAutocompleter`.

##### Related Components

<div class="xui-margin-vertical">
	<div>
		<a href="#text-input" isDocLink>Text Input</a>
	</div>
	<div>
		<a href="#avatar" isDocLink>Avatar</a>
	</div>
	<div>
		<a href="#dropdown" isDocLink>Dropdown</a>
	</div>
	<div>
		<a href="#pill" isDocLink>Pill</a>
	</div>
	<div>
		<a href="#tag" isDocLink>Tag</a>
	</div>
</div>

## Examples

### Multi-select

`XUIAutocompleter` can be passed an array of pills to display to the left of the input. Each pill should have the `xui-autocompleter--pill` class applied to receive the correct padding. We recommend using `XUIAutocompleterEmptyState` for when no search results are returned.

You should add a callback to `onBackspacePill` which removes the last selected element. This will be called if the backspace key is pressed while the input is empty.

Also note that the `<XUIAutocompleterEmptyState>` component needs to be wrapped in a `<XUIPicklist>` component if you want to be able to access a header or footer with the keyboard.

Currently it's recommended that you do not pass in a `rightElement` prop while using wrapping pills. At certain widths, the right element may wrap down to the next row without the input, which doesn't display nicely.

```jsx harmony
import { useRef, useState } from 'react';

import XUIAutocompleter, {
  XUIAutocompleterEmptyState,
  boldMatch,
  decorateSubStr
} from '@xero/xui/react/autocompleter';
import XUIAvatar from '@xero/xui/react/avatar';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';
import XUIPill from '@xero/xui/react/pill';

const contacts = [
  {
    email: 'frida@gmail.com',
    id: 0,
    name: 'Frida'
  },
  {
    id: 1,
    email: 'fredgreen@gmail.com',
    name: 'Fred Green'
  },
  {
    email: 'peterparker@yahoo.com',
    id: 2,
    name: 'Peter Parker'
  },
  {
    email: 'davechang@xero.com',
    id: 3,
    name: 'Dave Chang'
  },
  {
    email: 'roy@roychoi.com',
    id: 4,
    name: 'Roy Choi'
  }
];

const Pills = ({ id, onDeleteClick }) => {
  return (
    <XUIPill
      className="xui-autocompleter--pill"
      deleteButtonLabel={`Delete ${contacts[id].name}`}
      key={id}
      onDeleteClick={() => {
        onDeleteClick(id);
      }}
      size="small"
      value={contacts[id].name}
    />
  );
};

const AutocompleterExample = () => {
  const [value, setValue] = useState('');
  const [selectedContactsIds, setSelectedContactsIds] = useState([0]);
  const [isInvalid, setIsInvalid] = useState(false);
  const autocompleter = useRef();

  const onSearchChangeHandler = value => {
    const invalidInput = !!value.match(/[\!\.\^%&#]/);
    if (invalidInput) {
      autocompleter.current.closeDropdown();
    } else {
      autocompleter.current.openDropdown();
    }
    setValue(value);
    setIsInvalid(invalidInput);
  };

  const deleteContact = idToRemove => {
    setSelectedContactsIds(previousState => {
      return [...previousState.filter(id => id !== idToRemove)];
    });
  };

  const deleteLastContact = () => {
    setSelectedContactsIds(previousState => {
      return [...previousState.slice(0, -1)];
    });
  };

  const selectContact = contact => {
    setSelectedContactsIds(previousState => {
      return [...previousState, contact];
    });
    setValue('');
  };

  const renderPills = selectedContactsIds => {
    return selectedContactsIds.map(id => <Pills id={id} key={id} onDeleteClick={deleteContact} />);
  };

  const unselectedContactsIds = contacts.filter(
    (contact, index) =>
      selectedContactsIds.indexOf(index) === -1 &&
      (contact.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        contact.email.toLowerCase().indexOf(value.toLowerCase()) > -1)
  );

  const dropdownContents =
    unselectedContactsIds.length === 0 ? (
      <XUIPicklist>
        <XUIAutocompleterEmptyState>No contacts found</XUIAutocompleterEmptyState>
      </XUIPicklist>
    ) : (
      <XUIPicklist>
        {unselectedContactsIds.map(contact => {
          const { email, id, name } = contact;

          const headingContent = decorateSubStr(name, value || '', boldMatch);
          const secondaryContent = decorateSubStr(email, value || '', boldMatch);

          return (
            <XUIPickitem
              headingElement={headingContent}
              id={id}
              isMultiline
              key={id}
              leftElement={<XUIAvatar size="small" value={name} />}
              onSelect={selectContact}
              secondaryElement={secondaryContent}
              shouldTruncate
              value={id}
            />
          );
        })}
      </XUIPicklist>
    );

  const validationMessage = isInvalid
    ? 'Special characters are not allowed'
    : 'Please select at least 1 contact';

  return (
    <XUIAutocompleter
      hintMessage="Contacts will receive a copy of the invoice"
      inputLabel="Contact(s)"
      isInvalid={(!value && !selectedContactsIds.length) || isInvalid}
      onBackspacePill={deleteLastContact}
      onSearch={onSearchChangeHandler}
      pills={renderPills(selectedContactsIds)}
      placeholder="Search contacts"
      ref={autocompleter}
      searchValue={value}
      validationMessage={validationMessage}
    >
      {dropdownContents}
    </XUIAutocompleter>
  );
};

<AutocompleterExample />;
```

#### Validation with autocompleter input

Since the input triggering the dropdown could potentially be invalid (eg., the input includes forbidden characters), you may wish to close the dropdown panel at validation time, to ensure any messaging is visible to the user. This is included in the above example, in `onSearchChangeHandler`.

### Multi-select without wrapping pills

By default the pills and search bar will wrap inside the `XUIAutocompleter` input container. To disable this, set `disableWrapPills` to true.

```jsx harmony
import { useRef, useState } from 'react';

import XUIAutocompleter, {
  XUIAutocompleterEmptyState,
  boldMatch,
  decorateSubStr
} from '@xero/xui/react/autocompleter';
import XUIAvatar from '@xero/xui/react/avatar';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';
import XUIPill from '@xero/xui/react/pill';

const contacts = [
  {
    email: 'frida@gmail.com',
    id: 0,
    name: 'Frida'
  },
  {
    id: 1,
    email: 'fredgreen@gmail.com',
    name: 'Fred Green'
  },
  {
    email: 'peterparker@yahoo.com',
    id: 2,
    name: 'Peter Parker'
  },
  {
    email: 'davechang@xero.com',
    id: 3,
    name: 'Dave Chang'
  },
  {
    email: 'roy@roychoi.com',
    id: 4,
    name: 'Roy Choi'
  }
];

const Pills = ({ id, onDeleteClick }) => {
  return (
    <XUIPill
      className="xui-autocompleter--pill"
      deleteButtonLabel={`Delete ${contacts[id].name}`}
      key={id}
      onDeleteClick={() => {
        onDeleteClick(id);
      }}
      size="small"
      value={contacts[id].name}
    />
  );
};

const AutocompleterExample = () => {
  const [value, setValue] = useState('');
  const [selectedContactsIds, setSelectedContactsIds] = useState([0]);
  const autocompleter = useRef();

  const onSearchChangeHandler = value => {
    autocompleter.current.openDropdown();
    setValue(value);
  };

  const deleteContact = idToRemove => {
    setSelectedContactsIds(previousState => {
      return [...previousState.filter(id => id !== idToRemove)];
    });
  };

  const deleteLastContact = () => {
    setSelectedContactsIds(previousState => {
      return [...previousState.slice(0, -1)];
    });
  };

  const selectContact = contact => {
    setSelectedContactsIds(previousState => {
      return [...previousState, contact];
    });
    setValue('');
  };

  const renderPills = selectedContactsIds => {
    return selectedContactsIds.map(id => <Pills id={id} key={id} onDeleteClick={deleteContact} />);
  };

  const unselectedContactsIds = contacts.filter(
    (contact, index) =>
      selectedContactsIds.indexOf(index) === -1 &&
      (contact.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        contact.email.toLowerCase().indexOf(value.toLowerCase()) > -1)
  );

  const dropdownContents =
    unselectedContactsIds.length === 0 ? (
      <XUIPicklist>
        <XUIAutocompleterEmptyState>No contacts found</XUIAutocompleterEmptyState>
      </XUIPicklist>
    ) : (
      <XUIPicklist>
        {unselectedContactsIds.map(contact => {
          const { email, id, name } = contact;

          const headingContent = decorateSubStr(name, value || '', boldMatch);
          const secondaryContent = decorateSubStr(email, value || '', boldMatch);

          return (
            <XUIPickitem
              headingElement={headingContent}
              id={id}
              isMultiline
              key={id}
              leftElement={<XUIAvatar size="small" value={name} />}
              onSelect={selectContact}
              secondaryElement={secondaryContent}
              shouldTruncate
              value={id}
            />
          );
        })}
      </XUIPicklist>
    );

  return (
    <XUIAutocompleter
      disableWrapPills
      inputLabel="Contact(s)"
      onBackspacePill={deleteLastContact}
      onSearch={onSearchChangeHandler}
      pills={renderPills(selectedContactsIds)}
      placeholder="Search contacts"
      ref={autocompleter}
      searchValue={value}
    >
      {dropdownContents}
    </XUIAutocompleter>
  );
};

<AutocompleterExample />;
```

### Single-select

When using `XUIAutocompleter` for selecting a single option, use the `leftElement` and `rightElement` props for adding information and options about the selected item and leave the `pills` prop empty.

```jsx harmony
import { useRef, useState } from 'react';
import crossIcon from '@xero/xui-icon/icons/cross-small';

import XUIAutocompleter, {
  XUIAutocompleterEmptyState,
  boldMatch,
  decorateSubStr
} from '@xero/xui/react/autocompleter';
import XUIAvatar from '@xero/xui/react/avatar';
import { XUIIconButton } from '@xero/xui/react/button';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';
import { XUITextInputSideElement } from '@xero/xui/react/textinput';

const contacts = [
  {
    email: 'frida@gmail.com',
    id: 0,
    name: 'Frida'
  },
  {
    id: 1,
    email: 'fredgreen@gmail.com',
    name: 'Fred Green'
  },
  {
    email: 'peterparker@yahoo.com',
    id: 2,
    name: 'Peter Parker'
  },
  {
    email: 'davechang@xero.com',
    id: 3,
    name: 'Dave Chang'
  },
  {
    email: 'roy@roychoi.com',
    id: 4,
    name: 'Roy Choi'
  }
];

const AutocompleterExample = () => {
  const [value, setValue] = useState(contacts[0].name);
  const [selectedContactId, setSelectedContactId] = useState([0]);
  const autocompleter = useRef();

  const onSearchChangeHandler = value => {
    autocompleter.current.openDropdown();

    const valueMatchesSelectedContact =
      selectedContactId != null && value === contacts[selectedContactId].name;

    setValue(value);

    valueMatchesSelectedContact
      ? setSelectedContactId(selectedContactId)
      : setSelectedContactId(null);
  };

  const selectContact = selectedContactId => {
    setSelectedContactId(selectedContactId);
    selectedContactId !== null ? setValue(contacts[selectedContactId].name) : setValue('');
  };

  const clearSelection = () => {
    selectContact(null);
  };

  const searchResults = contacts.filter(
    contact =>
      contact.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      contact.email.toLowerCase().indexOf(value.toLowerCase()) > -1
  );

  const dropdownContents =
    searchResults.length === 0 ? (
      <XUIPicklist>
        <XUIAutocompleterEmptyState>No contacts found</XUIAutocompleterEmptyState>
      </XUIPicklist>
    ) : (
      <XUIPicklist>
        {searchResults.map(contact => {
          const { email, id, name } = contact;

          const headingContent = decorateSubStr(name, value || '', boldMatch);
          const secondaryContent = decorateSubStr(email, value || '', boldMatch);
          return (
            <XUIPickitem
              headingElement={headingContent}
              id={id}
              isMultiline
              key={id}
              leftElement={<XUIAvatar size="small" value={name} />}
              onSelect={() => selectContact(id)}
              secondaryElement={secondaryContent}
              shouldTruncate
              value={id}
            />
          );
        })}
      </XUIPicklist>
    );

  const leftElement = selectedContactId != null && (
    <XUITextInputSideElement type="avatar">
      <XUIAvatar size="small" value={contacts[selectedContactId].name} />
    </XUITextInputSideElement>
  );

  const rightElement = selectedContactId != null && (
    <XUITextInputSideElement type="icon">
      <XUIIconButton ariaLabel="Clear selection" icon={crossIcon} onClick={clearSelection} />
    </XUITextInputSideElement>
  );

  return (
    <XUIAutocompleter
      inputLabel="Contact"
      leftElement={leftElement}
      onSearch={onSearchChangeHandler}
      placeholder="Search contacts"
      ref={autocompleter}
      rightElement={rightElement}
      searchValue={value}
    >
      {dropdownContents}
    </XUIAutocompleter>
  );
};

<AutocompleterExample />;
```

### Adding custom key down behaviour

Custom key down behaviours can be applied by providing a callback function to the `onKeyDown` prop.

Please note. This prop is not intended to give users the ability to disable or amend the default onKeyDown behaviours. If a custom function is provided, this will be called after the relevant default onKeyDown behaviour.

```jsx harmony
import { useRef, useState } from 'react';

import XUIAutocompleter, {
  XUIAutocompleterEmptyState,
  boldMatch,
  decorateSubStr
} from '@xero/xui/react/autocompleter';
import XUIAvatar from '@xero/xui/react/avatar';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';
import XUIPill from '@xero/xui/react/pill';

const contacts = [
  {
    email: 'frida@gmail.com',
    id: 0,
    name: 'Frida'
  },
  {
    id: 1,
    email: 'fredgreen@gmail.com',
    name: 'Fred Green'
  },
  {
    email: 'peterparker@yahoo.com',
    id: 2,
    name: 'Peter Parker'
  },
  {
    email: 'davechang@xero.com',
    id: 3,
    name: 'Dave Chang'
  },
  {
    email: 'roy@roychoi.com',
    id: 4,
    name: 'Roy Choi'
  }
];

const Pills = ({ id, onDeleteClick }) => {
  return (
    <XUIPill
      className="xui-autocompleter--pill"
      deleteButtonLabel={`Delete ${contacts[id].name}`}
      key={id}
      onDeleteClick={() => {
        onDeleteClick(id);
      }}
      size="small"
      value={contacts[id].name}
    />
  );
};

const AutocompleterExample = () => {
  const [value, setValue] = useState('');
  const [selectedContactsIds, setSelectedContactsIds] = useState([0]);
  const autocompleter = useRef();

  const onKeyDownHandler = event => {
    console.log('custom onKeyDown event');
  };

  const onSearchChangeHandler = value => {
    autocompleter.current.openDropdown();
    setValue(value);
  };

  const deleteContact = idToRemove => {
    setSelectedContactsIds(previousState => {
      return [...previousState.filter(id => id !== idToRemove)];
    });
  };

  const deleteLastContact = () => {
    setSelectedContactsIds(previousState => {
      return [...previousState.slice(0, -1)];
    });
  };

  const selectContact = contact => {
    setSelectedContactsIds(previousState => {
      return [...previousState, contact];
    });
    setValue('');
  };

  const renderPills = selectedContactsIds => {
    return selectedContactsIds.map(id => <Pills id={id} key={id} onDeleteClick={deleteContact} />);
  };

  const unselectedContactsIds = contacts.filter(
    (contact, index) =>
      selectedContactsIds.indexOf(index) === -1 &&
      (contact.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        contact.email.toLowerCase().indexOf(value.toLowerCase()) > -1)
  );

  const dropdownContents =
    unselectedContactsIds.length === 0 ? (
      <XUIPicklist>
        <XUIAutocompleterEmptyState>No contacts found</XUIAutocompleterEmptyState>
      </XUIPicklist>
    ) : (
      <XUIPicklist>
        {unselectedContactsIds.map(contact => {
          const { email, id, name } = contact;

          const headingContent = decorateSubStr(name, value || '', boldMatch);
          const secondaryContent = decorateSubStr(email, value || '', boldMatch);

          return (
            <XUIPickitem
              headingElement={headingContent}
              id={id}
              isMultiline
              key={id}
              leftElement={<XUIAvatar size="small" value={name} />}
              onSelect={selectContact}
              secondaryElement={secondaryContent}
              shouldTruncate
              value={id}
            />
          );
        })}
      </XUIPicklist>
    );

  return (
    <XUIAutocompleter
      closeOnSelect={false}
      closeOnTab={true}
      inputLabel="Contact(s)"
      onBackspacePill={deleteLastContact}
      onKeyDown={onKeyDownHandler}
      onSearch={onSearchChangeHandler}
      pills={renderPills(selectedContactsIds)}
      placeholder="Search contacts"
      ref={autocompleter}
      searchValue={value}
    >
      {dropdownContents}
    </XUIAutocompleter>
  );
};

<AutocompleterExample />;
```
