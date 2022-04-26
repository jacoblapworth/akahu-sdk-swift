Nested picklists are similar to a collapsable menu inside of the main list. To construct one, define your `XUINestedPicklist`(s) inside of a `XUINestedPicklistContainer`. The container acts as a wrapper for the lists and should also contain the `XUINestedPicklistTrigger`. This renders a button in either a nested or split style. Please see the basic example below of how to piece these components together.

##### Uncontrolled

By default, if you do not specify an `isOpen` prop in `XUINestedPicklistContainer`, the component will be initialised as a fully uncontrolled component. If you need to pass a default open value, please pass this as a `isDefaultOpen` prop.

```jsx harmony
import { useRef, useState } from 'react';
import XUIAvatar from '@xero/xui/react/avatar';
import XUIPicklist, {
  XUINestedPicklist,
  XUINestedPicklistContainer,
  XUINestedPicklistTrigger,
  XUIPickitem,
  XUIStatefulPicklist
} from '@xero/xui/react/picklist';

const NestedPicklistExample = () => {
  const [selectedItem, setSelectedItem] = useState();
  const trigger = useRef();

  const onOptionSelect = (value, item) => {
    setSelectedItem(item.props.id);
  };

  return (
    <XUIStatefulPicklist isFocusable onSelect={onOptionSelect}>
      <XUIPicklist>
        <XUINestedPicklistContainer id="clients">
          <XUINestedPicklistTrigger
            ariaLabel="Toggle clients list"
            id="clientsTrigger"
            ref={trigger}
          >
            Clients
          </XUINestedPicklistTrigger>
          <XUINestedPicklist>
            <XUIPickitem
              id="ac"
              isSelected={selectedItem === 'ac'}
              leftElement={<XUIAvatar size="small" value="Andy Colton" variant="business" />}
            >
              Andy Colton
            </XUIPickitem>
            <XUIPickitem
              id="jk"
              isSelected={selectedItem === 'jk'}
              leftElement={<XUIAvatar size="small" value="Jacob King" variant="business" />}
            >
              Jacob King
            </XUIPickitem>
            <XUIPickitem
              id="sk"
              isSelected={selectedItem === 'sk'}
              leftElement={<XUIAvatar size="small" value="Sue Kennedy" variant="business" />}
            >
              Sue Kennedy
            </XUIPickitem>
          </XUINestedPicklist>
        </XUINestedPicklistContainer>
      </XUIPicklist>
    </XUIStatefulPicklist>
  );
};

<NestedPicklistExample />;
```

```jsx harmony
import { useRef, useState } from 'react';
import XUIPicklist, {
  XUINestedPicklist,
  XUINestedPicklistContainer,
  XUINestedPicklistTrigger,
  XUIPickitem,
  XUIStatefulPicklist
} from '@xero/xui/react/picklist';

const options = ['Timothy Redmayne', 'Finn Kent', 'George Padnell'];
const values = object => Object.keys(object).reduce((values, key) => [...values, object[key]], []);

const isAllSelected = selectedItems => {
  const numberOfSelectedValues = values(selectedItems).filter(value => value).length;
  return numberOfSelectedValues === options.length;
};

const NestedPicklistExample = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [allItemsSelected, setAllItemsSelected] = useState(false);
  const trigger = useRef();

  const onOptionSelect = (value, item) => {
    let newSelectedItems = { ...selectedItems, [item.props.id]: !selectedItems[item.props.id] };

    if (item.props.id === 'staffTrigger') {
      newSelectedItems = options.reduce(
        (selectedItems, option) => ({ ...selectedItems, [option]: !allItemsSelected }),
        {}
      );
    }

    setSelectedItems(newSelectedItems);
    setAllItemsSelected(isAllSelected(newSelectedItems));
  };

  return (
    <XUIStatefulPicklist isFocusable onSelect={onOptionSelect}>
      <XUIPicklist isMultiselect>
        <XUINestedPicklistContainer id="staff">
          <XUIPickitem id="staffTrigger" isSelected={allItemsSelected} isSplit>
            Staff
          </XUIPickitem>
          <XUINestedPicklistTrigger ariaLabel="Toggle staff list" id="staffSplitTrigger" />
          <XUINestedPicklist>
            {options.map(option => (
              <XUIPickitem id={option} isSelected={selectedItems[option]} key={option}>
                {option}
              </XUIPickitem>
            ))}
          </XUINestedPicklist>
        </XUINestedPicklistContainer>
      </XUIPicklist>
    </XUIStatefulPicklist>
  );
};

<NestedPicklistExample />;
```

##### Controlled

To use the `XUINestedPicklistContainer` as a fully controlled component you can do so by providing and manipulating the `isOpen` prop.

If you pass in an `isOpen` prop and use this as a controlled component, be aware that the `XUINestedPicklistContainer`'s native events will be disabled. To control the native events you should implement `onOpen` and `onClose` callbacks.

```jsx harmony
import { useRef, useState } from 'react';
import XUIButton from '@xero/xui/react/button';
import XUIPicklist, {
  XUINestedPicklist,
  XUINestedPicklistContainer,
  XUINestedPicklistTrigger,
  XUIPickitem,
  XUIStatefulPicklist
} from '@xero/xui/react/picklist';

const NestedPicklistExample = () => {
  const [selectedItem, setSelectedItem] = useState('ac');
  const [picklistOpen, setPicklistOpen] = useState(true);
  const trigger = useRef();

  const onOptionSelect = (value, item) => {
    setSelectedItem(item.props.id);
  };

  return (
    <div>
      <XUIButton onClick={() => setPicklistOpen(!picklistOpen)}>Toggle client list</XUIButton>
      <XUIStatefulPicklist isFocusable onSelect={onOptionSelect}>
        <XUIPicklist>
          <XUINestedPicklistContainer
            id="clients2"
            isOpen={picklistOpen}
            onClose={() => setPicklistOpen(false)}
            onOpen={() => setPicklistOpen(true)}
          >
            <XUINestedPicklistTrigger
              ariaLabel="Toggle clients submenu"
              id="clientsTrigger2"
              ref={trigger}
            >
              Clients
            </XUINestedPicklistTrigger>
            <XUINestedPicklist>
              <XUIPickitem id="ac" isSelected={selectedItem === 'ac'}>
                Andy Colton
              </XUIPickitem>
              <XUIPickitem id="jk" isSelected={selectedItem === 'jk'}>
                Jacob King
              </XUIPickitem>
              <XUIPickitem id="sk" isSelected={selectedItem === 'sk'}>
                Sue Kennedy
              </XUIPickitem>
            </XUINestedPicklist>
          </XUINestedPicklistContainer>
        </XUIPicklist>
      </XUIStatefulPicklist>
    </div>
  );
};

<NestedPicklistExample />;
```

For more information about the functionality of the lists such as keyboard handling, selected and highlighted state management please see the [stateful picklist section above](#stateful-picklist).
