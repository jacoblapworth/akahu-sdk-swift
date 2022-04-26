Although not a required child of `XUIPicklist`s, `XUIPickitem`s are the standard wrapper for children inside a `XUIPicklist`. They seamlessly work with the keyboard handling of a `XUIStatefulPicklist` and provide the standard XUI layout needed.

`XUIPickitem`s support many kinds of content. `XUIPicklistHeader` and `XUIPicklistDivider` can be used as siblings of `XUIPickitem`s.

```jsx harmony
import { useState } from 'react';
import XUIPicklist, { XUIPickitem, XUIPicklistHeader } from '@xero/xui/react/picklist';

const items = [
  { id: 'accountingBasis', text: 'Accounting basis' },
  { id: 'accountCodes', text: 'Account codes' }
];

const MultiselectPickitemExample = () => {
  const [selected, setSelected] = useState({
    accountingBasis: true,
    accountCodes: false,
    decimals: false
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

  return (
    <div className="xui-panel" style={{ width: '300px' }}>
      <XUIPicklist isMultiselect>
        <XUIPicklistHeader>Show</XUIPicklistHeader>
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
    </div>
  );
};

<MultiselectPickitemExample />;
```

```jsx harmony
import { useState } from 'react';
import XUIIcon from '@xero/xui/react/icon';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';
import deposit from '@xero/xui-icon/icons/deposit';
import quote from '@xero/xui-icon/icons/quote';

<div className="xui-panel" style={{ width: '300px' }}>
  <XUIPicklist>
    <XUIPickitem id="pi1" leftElement={<XUIIcon icon={deposit} />}>
      Deposit
    </XUIPickitem>
    <XUIPickitem id="pi2" isDisabled leftElement={<XUIIcon icon={quote} />}>
      Quote
    </XUIPickitem>
  </XUIPicklist>
</div>;
```

```jsx harmony
import { useState } from 'react';
import XUIPicklist, {
  XUIPickitem,
  XUIPicklistHeader,
  XUIPicklistDivider
} from '@xero/xui/react/picklist';
import XUIAvatar from '@xero/xui/react/avatar';

<div className="xui-panel" style={{ width: '400px' }}>
  <XUIPicklist>
    <XUIPicklistHeader>Recent</XUIPicklistHeader>
    <XUIPickitem
      id="nc"
      leftElement={<XUIAvatar size="small" value="Nicole Campbell" />}
      pinnedElement="50.0"
      secondaryElement="Admin"
    >
      Nicole Campbell
    </XUIPickitem>
    <XUIPicklistDivider />
    <XUIPicklistHeader>Suggested</XUIPicklistHeader>
    <XUIPickitem
      headingElement="Rosie Cook"
      id="rc"
      isMultiline
      leftElement={<XUIAvatar size="small" value="Rosie Cook" />}
      pinnedElement="60.0"
      secondaryElement="rosie.cook@xero.com"
      shouldTruncate
    />
    <XUIPickitem
      headingElement="Michael Lane"
      id="ml"
      isMultiline
      leftElement={<XUIAvatar size="small" value="Michael Lane" />}
      pinnedElement="50.0"
      secondaryElement="michael.lane@xero.com"
      shouldTruncate
    />
  </XUIPicklist>
</div>;
```
