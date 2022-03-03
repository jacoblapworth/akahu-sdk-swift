Avatars can be collected into groups.

```jsx harmony
import XUIAvatar, { XUIAvatarGroup } from '@xero/xui/react/avatar';

<XUIAvatarGroup>
  <XUIAvatar identifier="cta" value="Cherise Tan" />
  <XUIAvatar identifier="cbo" value="Corinne Bowie" />
  <XUIAvatar identifier="fcl" value="Finn Clark" />
  <XUIAvatar identifier="fco" value="Frank Congson" />
  <XUIAvatar identifier="npi" value="Nick Piesco" />
  <XUIAvatar identifier="sle" value="Sacha Lee" />
  <XUIAvatar identifier="san" value="Sam Annand" />
</XUIAvatarGroup>;
```

Providing a `maxAvatars` prop will only show a maximum of that many avatar spaces. If there are more than the maximum, the final space will show an indication of how many further avatars are collected in the group.

Providing an `avatarSize` prop will override the sizing of any Avatar in the group.

```jsx harmony
import XUIAvatar, { XUIAvatarGroup } from '@xero/xui/react/avatar';

<XUIAvatarGroup maxAvatars={4} avatarSize="large">
  <XUIAvatar identifier="cta" value="Cherise Tan" />
  <XUIAvatar identifier="cbo" size="small" value="Corinne Bowie" />
  <XUIAvatar identifier="fcl" size="xlarge" value="Finn Clark" />
  <XUIAvatar identifier="fco" size="small" value="Frank Congson" />
  <XUIAvatar identifier="npi" size="medium" value="Nick Piesco" />
  <XUIAvatar identifier="sle" size="large" value="Sam Annand" />
  <XUIAvatar identifier="san" value="Sacha Lee" />
</XUIAvatarGroup>;
```
