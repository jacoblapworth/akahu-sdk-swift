Although not a required child of `Picklist`s, `Pickitem`s are the standard wrapper for children inside a `Picklist`. They seamlessly work with the keyboard handling of a `StatefulPickilist` and provide the standard XUI layout needed.

`Pickitem`s support many kinds of content. `PicklistHeader` and `PicklistDivider` can be used as siblings of `Pickitem`s.

```jsx harmony
import Picklist, { Pickitem, PicklistHeader, PicklistDivider } from '../../picklist';
import XUIIcon from '../../icon';
import XUIAvatar from '../../avatar';
import search from '@xero/xui-icon/icons/search';

<div>
	<Picklist>
		<PicklistHeader id="pi-header">Design</PicklistHeader>
		<Pickitem
			id="pi1"
			rightElement={<XUIIcon icon={search} />}
			leftElement={<XUIAvatar value="Alena Woo" size="small" />}
			pinnedElement="42"
			secondaryElement="#beautiful #human"
		>
			Alena Woo
		</Pickitem>
	</Picklist>
	<Picklist size="small">
		<Pickitem id="pi3">Zac Sanderson-Harris</Pickitem>
		<Pickitem id="pi4" isInvalid>Isaac Minogue</Pickitem>
		<PicklistDivider />
		<Pickitem
			id="pi2"
			shouldTruncate
			leftElement={<XUIAvatar value="Jannyne Perez" size="xsmall" />}
			secondaryElement="jannyne.perez@xero.com"
			headingElement="Jannyne Perez"
			isMultiline
		/>
	</Picklist>
	<Picklist isMultiselect>
		<Pickitem id="pi5" isDisabled>Katie McCoy</Pickitem>
		<Pickitem id="pi6" isSelected>Brock Abernathy</Pickitem>
	</Picklist>
</div>
```
