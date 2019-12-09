For buttons that only contain an icon, use `<XUIIconButton />`.

The `icon` and `ariaLabel` props are required when using this component.

Inverted style will be applied when `isInverted` prop is passed.

The `size` prop is used for the size classes of the iconButton, and the `iconSize` prop is used for the size classes of the icon.

```jsx harmony
import { XUIIconButton } from '../../button';
import ExampleContainer from '../../docs/ExampleContainer';
import overflowIcon from '@xero/xui-icon/icons/overflow';

const props = {
  icon: overflowIcon,
  ariaLabel: 'Dots menu',
  className: 'xui-margin-right'
};

<div>
  <ExampleContainer className="xui-padding-xsmall">
    <XUIIconButton {...props} />
    <XUIIconButton {...props} size="small" />
    <XUIIconButton {...props} size="xsmall" />
  </ExampleContainer>
  <ExampleContainer className="xui-padding-xsmall" isInverted>
    <XUIIconButton {...props} isInverted />
    <XUIIconButton {...props} size="small" isInverted />
    <XUIIconButton {...props} size="xsmall" isInverted />
  </ExampleContainer>
</div>;
```
