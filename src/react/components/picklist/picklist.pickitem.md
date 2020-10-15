Although not a required child of `XUIPicklist`s, `XUIPickitem`s are the standard wrapper for children inside a `XUIPicklist`. They seamlessly work with the keyboard handling of a `XUIStatefulPicklist` and provide the standard XUI layout needed.

`XUIPickitem`s support many kinds of content. `XUIPicklistHeader` and `XUIPicklistDivider` can be used as siblings of `XUIPickitem`s.

```jsx harmony
import XUIPicklist, {
  XUIPickitem,
  XUIPicklistHeader,
  XUIPicklistDivider
} from '@xero/xui/react/picklist';
import XUIIcon from '@xero/xui/react/icon';
import XUIAvatar from '@xero/xui/react/avatar';
import search from '@xero/xui-icon/icons/search';

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
  <XUIPicklist isMultiselect>
    <XUIPickitem id="pi5" isDisabled>
      Jannyne Perez
    </XUIPickitem>
    <XUIPickitem id="pi6" isSelected>
      Brock Abernethy
    </XUIPickitem>
  </XUIPicklist>
</div>;
```
