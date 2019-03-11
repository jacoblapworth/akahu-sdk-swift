Avatars can be collected into groups.

```jsx harmony
import XUIAvatar, { XUIAvatarGroup } from '../../avatar';

<XUIAvatarGroup>
	<XUIAvatar value="Bettong" />
	<XUIAvatar value="Bandicoot" />
	<XUIAvatar value="Quokka" />
	<XUIAvatar value="Wombat" />
	<XUIAvatar value="Pademelon" />
	<XUIAvatar value="Quoll" />
</XUIAvatarGroup>
```

Providing a `maxAvatars` prop will only show a maximum of that many avatar spaces. If there are more than the maximum, the final space will show an indication of how many further avatars are collected in the group.

Providing an `avatarSize` prop will override the sizing of any Avatar in the group.

```jsx harmony
import XUIAvatar, { XUIAvatarGroup } from '../../avatar';

<XUIAvatarGroup maxAvatars={4} avatarSize="large">
	<XUIAvatar value="Bandicoot" />
	<XUIAvatar size="small" value="Quokka" />
	<XUIAvatar size="xlarge" value="Wombat" />
	<XUIAvatar size="small" value="Bettong" />
	<XUIAvatar size="medium" value="Pademelon" />
	<XUIAvatar value="Quoll" />
</XUIAvatarGroup>
```
