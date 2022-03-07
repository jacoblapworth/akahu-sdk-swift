For buttons that only contain an icon, use `<XUIIconButton />`.

The `icon` and `ariaLabel` props are required when using this component.

Inverted style will be applied when `isInverted` prop is passed.

The `size` prop is used for the size classes of the iconButton, and the `iconSize` prop is used for the size classes of the icon.

```jsx harmony
import overflow from '@xero/xui-icon/icons/overflow';
import { XUIIconButton } from '@xero/xui/react/button';

import ExampleContainer from '../../docs/ExampleContainer';

const props = {
  ariaLabel: 'Overflow menu',
  icon: overflow
};

<div>
  <ExampleContainer className="xui-padding-xsmall">
    <XUIIconButton {...props} />
    <br />
    <XUIIconButton {...props} size="small" />
    <br />
    <XUIIconButton {...props} size="xsmall" />
  </ExampleContainer>

  <ExampleContainer className="xui-padding-xsmall" isInverted>
    <XUIIconButton {...props} isInverted />
    <br />
    <XUIIconButton {...props} isInverted size="small" />
    <br />
    <XUIIconButton {...props} isInverted size="xsmall" />
  </ExampleContainer>
</div>;
```
