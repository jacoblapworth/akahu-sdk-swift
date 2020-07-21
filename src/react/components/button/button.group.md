Buttons can be grouped together (e.g. if their actions are all related) by using a `<XUIButtonGroup>`.

To disable an entire button group, you must add the `isDisabled` prop to each button in the group, not to the `<XUIButtonGroup>` itself.

```jsx harmony
import XUIButton, { XUIButtonGroup } from '@xero/xui/react/button';

<XUIButtonGroup qaHook="numbered-buttongroup">
  <XUIButton>Action 1</XUIButton>
  <XUIButton>Action 2</XUIButton>
  <XUIButton>Action 3</XUIButton>
</XUIButtonGroup>;
```

To set the size of an entire button group, you can set the `size` prop on `<XUIButtonGroup>`.

```jsx harmony
import XUIButton, { XUIButtonGroup } from '@xero/xui/react/button';

<XUIButtonGroup qaHook="numbered-buttongroup" size="small">
  <XUIButton>Action 1</XUIButton>
  <XUIButton>Action 2</XUIButton>
  <XUIButton>Action 3</XUIButton>
</XUIButtonGroup>;
```
