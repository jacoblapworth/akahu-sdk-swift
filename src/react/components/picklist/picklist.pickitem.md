Although not a required child of `XUIPicklist`s, `XUIPickitem`s are the standard wrapper for children inside a `XUIPicklist`. They seamlessly work with the keyboard handling of a `XUIStatefulPicklist` and provide the standard XUI layout needed.

`XUIPickitem`s support many kinds of content. `XUIPicklistHeader` and `XUIPicklistDivider` can be used as siblings of `XUIPickitem`s.

```jsx harmony
import { useState } from 'react';
import XUIPicklist, {
  XUIPickitem,
  XUIPicklistHeader,
  XUIPicklistDivider
} from '@xero/xui/react/picklist';
import XUIIcon from '@xero/xui/react/icon';
import XUIAvatar from '@xero/xui/react/avatar';
import search from '@xero/xui-icon/icons/search';

const items = [
  { id: 'corinne', text: 'Corinne Bowie' },
  { id: 'dion', text: 'Dion Wise' }
];

const MultiselectPickitemExample = () => {
  const [selected, setSelected] = useState({
    corinne: true,
    dion: false
  });

  const onSelect = id => {
    setSelected({ ...selected, [id]: !selected[id] });
  };

  const handleKeyDown = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(id);
    }
  };

  const selectedItems = items.filter(item => selected[item.id]).map(item => item.text);

  return (
    <XUIPicklist isMultiselect>
      {items.map(item => {
        const { id, text } = item;
        return (
          <XUIPickitem
            id={id}
            isSelected={selected[id]}
            key={id}
            onClick={() => onSelect(id)}
            onKeyDown={e => handleKeyDown(e, id)}
            value={id}
          >
            {text}
          </XUIPickitem>
        );
      })}
    </XUIPicklist>
  );
};

<div>
  <XUIPicklist>
    <XUIPicklistHeader id="pi-header">Design</XUIPicklistHeader>
    <XUIPickitem
      id="pi1"
      rightElement={<XUIIcon icon={search} />}
      leftElement={<XUIAvatar value="Finn Clark" size="small" />}
      pinnedElement="42"
      secondaryElement="#beautiful #human"
    >
      Finn Clark
    </XUIPickitem>
  </XUIPicklist>
  <XUIPicklist>
    <XUIPickitem id="pi3">Katie Macoy</XUIPickitem>
    <XUIPickitem id="pi4" isInvalid>
      Isaac Minogue
    </XUIPickitem>
    <XUIPicklistDivider />
    <XUIPickitem
      id="pi2"
      shouldTruncate
      leftElement={<XUIAvatar value="Zac Sanderson-Harris" size="small" />}
      secondaryElement="zac.sandersonharris@xero.com"
      headingElement="Zac Sanderson-Harris"
      isMultiline
    />
  </XUIPicklist>
  <MultiselectPickitemExample />
</div>;
```
